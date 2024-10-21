import express from 'express'
import userModel from '../models/userModel.mjs'

const router = express.Router()

router.get('/:userId/search', async (req, res) => {
  try {
    const searchValue = req.query.query
    const userId = req.params.userId

    const user = await userModel.findById(userId)
    const connection = await userModel.findOne({ email: searchValue })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There are no users associated with that email address.'
      })
    }

    if (user) {
      if (user.myCircle.some((person) => person.id === connection.id)) {
        return res.status(200).json({
          success: true,
          message: {
            firstName: connection.firstName,
            lastName: connection.lastName,
            email: connection.email,
            userId: connection.id,
            connected: true
          }
        })
      }

      if (!user.myCircle.some((person) => person.id === connection.id)) {
        return res.status(200).json({
          success: true,
          message: {
            firstName: connection.firstName,
            lastName: connection.lastName,
            email: connection.email,
            userId: connection.id,
            connected: false
          }
        })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'An error occurred on the server'
    })
  }
})

router.post(`/:userId/:connectionUserId/toggle-connection`, async (req, res) => {
  try {
    const { userId, connectionUserId } = req.params

    const currentUser = await userModel.findById(userId)
    const connection = await userModel.findById(connectionUserId)

    if (!currentUser || !connection) {
      return res.status(404).json({
        success: true,
        message: 'User or connection not found'
      })
    }

    const isConnected = currentUser.myCircle.some((user) => user.id === connectionUserId)

    if (isConnected) {
      await userModel.findOneAndUpdate(
        {
          _id: userId
        },
        { $pull: { myCircle: { id: connectionUserId } } },
        { new: true }
      )
      return res.status(200).json({
        success: true,
        message: 'Removed connection'
      })
    }

    if (!isConnected) {
      await userModel.findOneAndUpdate(
        {
          _id: userId
        },
        {
          $addToSet: {
            myCircle: {
              id: connectionUserId,
              firstName: connection.firstName,
              lastName: connection.lastName,
              connnected: true
            }
          }
        },
        { new: true }
      )
      return res.status(200).json({
        success: true,
        message: 'Added connection'
      })
    }
  } catch (err) {
    console.log(err)
  }
})

export default router
