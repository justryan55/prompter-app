import express from 'express'
import userModel from '../models/userModel.mjs'

const router = express.Router()

router.get('/getCurrentUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await userModel.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Unable to find user.'
      })
    }

    return res.status(200).json({
      success: true,
      message: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        myCircle: user.myCircle,
        messages: user.messages
      }
    })
  } catch (err) {
    console.log(err)
  }
})

export default router
