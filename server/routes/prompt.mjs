import express from 'express'
import promptModel from '../models/promptModel.mjs'
import userModel from '../models/userModel.mjs'

const router = express.Router()

router.get(`/:userId/fetchPrompt`, async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const now = new Date()
    const lastPromptSentAt = user.lastPromptSentAt

    if (lastPromptSentAt && now - lastPromptSentAt < 24 * 60 * 60 * 1000) {
      const savedPrompt = await promptModel.findById(user.lastPromptId)
      const recipientId = user.lastRecipientId
      const recipient = user.myCircle.find((person) => person.id === recipientId)

      if (savedPrompt && recipient) {
        const recipientName = recipient.firstName + ' ' + recipient.lastName

        const promptWithRecipient = savedPrompt.text.replace(
          /\[Friend\/Family Member\]/,
          recipientName
        )

        return res.status(200).json({
          success: true,
          promptId: user.lastPromptId.toString(),
          prompt: promptWithRecipient,
          recipient: recipientName,
          recipientId: recipient.id
        })
      }
    }

    if (user.myCircle.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'You currently have no connections in your circle'
      })
    }

    const randomIndex = Math.floor(Math.random() * user.myCircle.length)
    const recipient = user.myCircle[randomIndex]

    const prompt = await promptModel.aggregate([{ $sample: { size: 1 } }])
    const recipientName = recipient.firstName + ' ' + recipient.lastName

    const promptWithRecipient = prompt[0].text.replace(/\[Friend\/Family Member\]/, recipientName)
    const promptObjectId = prompt[0]._id
    const id = promptObjectId.toString()

    delete recipient.messages

    user.lastPromptId = prompt[0]._id
    user.lastRecipientId = recipient.id
    user.lastPromptSentAt = now
    await user.save()

    return res.status(200).json({
      success: true,
      promptId: id,
      prompt: promptWithRecipient,
      recipient: recipientName,
      recipientId: recipient.id
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the prompt.'
    })
  }
})

export default router
