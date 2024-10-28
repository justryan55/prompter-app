import express from 'express'
import userModel from '../models/userModel.mjs'

const router = express.Router()

router.post('/:userId/:connectionId/new-message', async (req, res) => {
  try {
    const payload = req.body
    const { userId, connectionId } = req.params

    const user = await userModel.findById(userId)
    const connection = await userModel.findById(connectionId)

    const message = {
      sender: [payload.sender.userId, payload.sender.firstName, payload.sender.lastName],
      prompt: payload.prompt,
      message: payload.message,
      responses: []
    }

    user.messages.push(message)
    connection.messages.push(message)
    await user.save()
    await connection.save()

    const messageId = user.messages[user.messages.length - 1].id

    return res.status(200).json({
      success: true,
      message: payload.message,
      messageId: messageId
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:userId/messages/:messageId', async (req, res) => {
  try {
    const { messageId, userId } = req.params

    const user = await userModel.findById(userId)

    const messages = user.messages

    const message = messages.map((message) => {
      if (messageId === message.id) {
        return res.status(200).json({
          success: true,
          message: message
        })
      }
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/:userId/messages/:messageId/add-response', async (req, res) => {
  try {
    const { messageId, userId } = req.params
    const payload = req.body
    const user = await userModel.findById(userId)

    const message = user.messages.find((msg) => msg.id === messageId)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    console.log(message.responses)

    message.responses.push(payload)
    await user.save()

    return res.status(200).json({
      success: true,
      message: message
    })
  } catch (err) {
    console.log(err)
  }
})

// router.get('/:userId/fetchMessages', async (req, res) => {
//   try {
//     const { userId } = req.params

//     const user = await userModel.findById(userId)

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'No user found'
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: user.messages
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })

export default router
