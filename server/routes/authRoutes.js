const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const router = express.Router()

// Admin Registration — disabled for public access
router.post('/register', (req, res) => {
  return res.status(403).json({
    message: 'Public admin registration is disabled',
  })
})

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    })

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'Authentication configuration error',
      })
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
    })
  }
})

module.exports = router