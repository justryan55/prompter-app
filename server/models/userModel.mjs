import { Schema, mongoose } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    myCircle: [{ type: String }]
  },
  { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

export default userModel
