const mongoose = require('mongoose')
require('dotenv').config()

const Temple = require('./models/Temple')
const templeData = require('./data/templeData')

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Temple.deleteMany()

    await Temple.insertMany(templeData)

    console.log('9 temples added successfully')

    await mongoose.connection.close()
  } catch (error) {
    console.error('Seeding failed:', error.message)
  }
}

seedDatabase()