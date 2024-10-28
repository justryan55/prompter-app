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
      message: payload.message
    }

    user.messages.push(message)
    connection.messages.push(message)

    await user.save()
    await connection.save()

    return res.status(200).json({
      success: true,
      message: 'Prompt response sent'
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
