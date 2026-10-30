const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const templeRoutes = require('./routes/templeRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/temples', templeRoutes)
app.use('/api/auth', authRoutes)  

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
  })

app.get('/', (req, res) => {
  res.json({
    message: 'India Temple Heritage API is running',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})