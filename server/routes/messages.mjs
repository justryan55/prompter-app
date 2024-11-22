import express from 'express'
import mongoose from 'mongoose'

import userModel from '../models/userModel.mjs'

const router = express.Router()

router.post('/:userId/:connectionId/new-message', async (req, res) => {
  try {
    const payload = req.body
    const { userId, connectionId } = req.params

    const user = await userModel.findById(userId)
    const connection = await userModel.findById(connectionId)

    const sentMessage = {
      sender: {
        userId: payload.sender.userId,
        firstName: payload.sender.firstName,
        lastName: payload.sender.lastName
      },
      receiver: payload.receiver,
      prompt: payload.prompt,
      message: payload.message,
      responses: [],
      explicitId: user.lastPromptId.toString(),
      // explicitId: new mongoose.Types.ObjectId(),
      connectionId: connection.id
    }

    const receivingMessage = {
      ...sentMessage,
      connectionId: userId
    }

    user.messages.push(sentMessage)
    connection.messages.push(receivingMessage)

    const today = new Date()
    const lastAction = user.lastActionDate

    const diff = lastAction ? Math.floor((today - new Date(lastAction)) / (1000 * 60 * 60 * 24)) : 0

    if (diff > 1) {
      user.streakCount = 1
    }
    if (diff === 0 || diff === 1) {
      user.streakCount += 1
    }

    user.lastActionDate = today

    await user.save()
    await connection.save()

    return res.status(200).json({
      success: true,
      message: payload.message
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:userId/fetchMessages/:messageId', async (req, res) => {
  try {
    const { messageId, userId } = req.params

    const user = await userModel.findById(userId)

    const currentUserMessage = user.messages.find((msg) => msg.explicitId === messageId)

    if (!currentUserMessage) {
      return res.status(404).json({
        success: true,
        message: 'Message not found'
      })
    }
    const connection = await userModel.findById(currentUserMessage.connectionId)

    // const connectionMessage = connection.messages.find((msg) => console.log(msg.id))

    const connectionMessage = connection.messages.find((msg) => msg.explicitId === messageId)

    const messages = user.messages

    const message = messages.map((message) => {
      if (messageId === message.explicitId) {
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

    const currentUserMessage = user.messages.find((msg) => msg.explicitId === messageId)
    const connection = await userModel.findById(currentUserMessage.connectionId)

    const connectionMessage = connection.messages.find((msg) => msg.explicitId === messageId)

    // const connectionMessage = connection.messages.find((msg) => msg.id === messageId)
    // console.log(connectionMessage)

    if (!currentUserMessage || !connectionMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    await userModel.updateOne(
      { _id: userId, 'messages.explicitId': messageId },
      { $push: { 'messages.$.responses': payload } }
    )

    await userModel.updateOne(
      { _id: currentUserMessage.connectionId, 'messages.explicitId': messageId },
      { $push: { 'messages.$.responses': payload } }
    )

    // currentUserMessage.responses.push(payload)
    // connectionMessage.responses.push(payload)
    // await user.save()
    // await connection.save()

    return res.status(200).json({
      success: true,
      message: currentUserMessage
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:userId/:connectionId/fetchDailyPromptMessageId', async (req, res) => {
  try {
    const { userId, connectionId } = req.params

    const user = await userModel.findById(userId)

    if (!user.messages || user.messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No messages found for this user'
      })
    }

    const messageId = user.messages.find((msg) => msg.explicitId === user.lastPromptId.toString())

    if (!messageId) {
      return res.status(404).json({
        success: false,
        message: 'There are no messages associated with this prompt'
      })
    }

    if (messageId) {
      return res.status(200).json({
        success: true,
        message: messageId
      })
    }
  } catch (err) {
    console.log(err)
  }
})

router.delete(`/:userId/:messageId/deleteMessage`, async (req, res) => {
  try {
    const { userId, messageId } = req.params

    const user = await userModel.findById(userId)

    const message = user.messages.find((msg) => msg.explicitId === messageId)

    console.log(message)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'There is no message associated with that ID'
      })
    }

    message.isDeleted = true
    message.deletedAt = new Date()

    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Message deleted'
    })
  } catch (err) {
    console.log(err)
  }
})

export default router
