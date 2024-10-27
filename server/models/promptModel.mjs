import mongoose, { Schema } from 'mongoose'

const promptSchema = new Schema(
  {
    text: { type: String, required: true }
  },
  { timestamps: true }
)

const promptModel = mongoose.model('Prompt', promptSchema)

export default promptModel
