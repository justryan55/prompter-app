import { Schema, mongoose } from 'mongoose'

const messageSchema = new Schema(
  {
    sender: [{ type: String }],
    prompt: { type: String },
    message: { type: Object }
  },
  { timestamps: true }
)

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    myCircle: [{ type: Object }],
    messages: { type: [messageSchema], default: [] }
  },
  { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

export default userModel
