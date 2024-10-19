import express from 'express'
import userModel from '../models/userModel.mjs'

const router = express.Router()

router.get('/:userId/search', async (req, res) => {
  try {
    const searchValue = req.query.query
    const userId = req.params.userId

    const user = await userModel.findOne({ email: searchValue })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There are no users associated with that email address.'
      })
    }

    if (user) {
      if (user.myCircle.includes(userId)) {
        return res.status(200).json({
          success: true,
          message: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.id,
            connected: true
          }
        })
      }

      if (!user.myCircle.includes(userId)) {
        return res.status(200).json({
          success: true,
          message: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.id,
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

router.post(`/:userId/:userIdToAdd/add-connection`, async (req, res) => {
  try {
    const { userId, userIdToAdd } = req.params
    const userToAdd = await userModel.findOne({ _id: userIdToAdd })

    if (!userToAdd) {
      return res.status(404).json({ message: 'User to add not found' })
    }

    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          myCircle: {
            id: userIdToAdd,
            firstName: userToAdd.firstName,
            lastName: userToAdd.lastName
          }
        }
      },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There are no users associated with that email address.'
      })
    }

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Added new connection'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'An error occurred on the server'
    })
  }
})

router.post(`/:userId/:userIdToRemove/remove-connection`, async (req, res) => {
  try {
    const { userId, userIdToRemove } = req.params

    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { myCircle: userIdToRemove } },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There are no users associated with that email address.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Removed connection'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'An error occurred on the server'
    })
  }
})

export default router
