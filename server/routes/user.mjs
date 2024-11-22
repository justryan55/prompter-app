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

router.delete(`/:userId/deleteAccount`, async (req, res) => {
  try {
    const { userId } = req.params

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        succes: false,
        message: 'User not found'
      })
    }

    user.isDeleted = true
    user.deletedAt = new Date()
    user.email = `${user.email}_deleted_${Date.now()}`

    await user.save()

    return res.status(200).json({
      success: true,
      message: 'User deleted'
    })
  } catch (err) {
    console.log(err)
  }
})

export default router
