const mongoose = require('mongoose')

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deity: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    history: {
      type: String,
    },
    rituals: {
      type: String,
    },
    darshan: {
      type: String,
    },
    festivals: {
      type: String,
    },
    guidelines: {
      type: String,
    },
    dressCode: {
      type: String,
    },
    accommodation: {
      type: String,
    },
    transport: {
      type: String,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Temple', templeSchema)