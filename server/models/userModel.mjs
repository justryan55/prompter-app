import { Schema, mongoose } from 'mongoose'

const messageSchema = new Schema(
  {
    explicitId: { type: String },
    sender: {
      userId: { type: String },
      firstName: { type: String },
      lastName: { type: String }
    },
    prompt: { type: String },
    message: { type: Object },
    responses: [{ type: Object }],
    connectionId: { type: String },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
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
    messages: { type: [messageSchema], default: [] },
    lastPromptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', default: null },
    lastRecipientId: { type: String, default: null },
    lastPromptSentAt: { type: Date, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true }
)

userSchema.index({ email: 1, isDeleted: 1 }, { unique: true })

const userModel = mongoose.model('User', userSchema)

export default userModel
