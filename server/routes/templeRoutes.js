const express = require('express')
const mongoose = require('mongoose')
const Temple = require('../models/Temple')
const verifyAdmin = require('../middleware/authMiddleware')

const router = express.Router()

// Get all approved temples for public visitors
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find({
  $or: [
    { approvalStatus: 'approved' },
    { approvalStatus: { $exists: false } },
  ],
}).sort({ createdAt: -1 })

    res.json(temples)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch temples',
    })
  }
})

// Get all temples for admin approval management
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 })
    res.json(temples)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch admin temples',
    })
  }
})

// Approve, reject, or return a temple to pending status
router.patch('/:id/approval', verifyAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid temple ID',
      })
    }

    const { approvalStatus } = req.body

    if (!['approved', 'rejected', 'pending'].includes(approvalStatus)) {
      return res.status(400).json({
        message: 'Invalid approval status',
      })
    }

    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus,
        approvedBy: req.admin.id,
      },
      { new: true, runValidators: true }
    )

    if (!temple) {
      return res.status(404).json({
        message: 'Temple not found',
      })
    }

    res.json({
      message: `Temple ${approvalStatus} successfully`,
      temple,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update approval status',
    })
  }
})

// Get one approved temple for public visitors
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid temple ID',
      })
    }

    const temple = await Temple.findOne({
      _id: req.params.id,
      approvalStatus: 'approved',
    })

    if (!temple) {
      return res.status(404).json({
        message: 'Temple not found',
      })
    }

    res.json(temple)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch temple',
    })
  }
})

// Add new temple
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const templeData = {
      ...req.body,
      approvalStatus: 'pending',
      approvedBy: undefined,
    }

    const temple = await Temple.create(templeData)

    res.status(201).json(temple)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create temple',
    })
  }
})

// Update temple
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid temple ID',
      })
    }

    const updateData = { ...req.body }

    // Approval status must be changed through the approval route
    delete updateData.approvalStatus
    delete updateData.approvedBy

    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!temple) {
      return res.status(404).json({
        message: 'Temple not found',
      })
    }

    res.json(temple)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update temple',
    })
  }
})

// Delete temple
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid temple ID',
      })
    }

    const temple = await Temple.findByIdAndDelete(req.params.id)

    if (!temple) {
      return res.status(404).json({
        message: 'Temple not found',
      })
    }

    res.json({
      message: 'Temple deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete temple',
    })
  }
})

module.exports = router