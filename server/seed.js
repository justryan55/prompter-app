import mongoose from 'mongoose'
import connectDatabase from './config/db.mjs'
import fs from 'fs'
import Prompt from './models/promptModel.mjs'
connectDatabase()

async function seedDatabase() {
  try {
    const data = fs.readFileSync('prompts.txt', 'utf-8')
    const prompts = data.split('\n').filter((prompt) => prompt.trim() !== '')
    const promptDocuments = prompts.map((promptText) => ({ text: promptText }))
    await Prompt.insertMany(promptDocuments)
    console.log('Database seeded successfully')
    mongoose.connection.close()
  } catch (err) {
    console.log('Error seeding database:', error)
    mongoose.connection.close()
  }
}

seedDatabase()
