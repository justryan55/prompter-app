import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'

configDotenv()

const mongoDB = process.env.MONGO_URL

const connectDatabase = async () => {
  try {
    const connectDB = await mongoose.connect(mongoDB)
    if (connectDB) {
      console.log('Connected to database')
    } else {
      console.log('Error connecting to database')
    }
  } catch (err) {
    console.log(err)
  }
}

export default connectDatabase
