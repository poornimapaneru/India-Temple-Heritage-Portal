const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dns = require('dns')

require('dotenv').config()

// Configure Google DNS for MongoDB connection
dns.setServers(['8.8.8.8', '8.8.4.4'])

const templeRoutes = require('./routes/templeRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/temples', templeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
  })

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: 'India Temple Heritage API is running',
  })
})

// Server Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})