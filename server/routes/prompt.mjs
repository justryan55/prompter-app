import express from 'express'

const router = express.Router()

router.get(`/:userId/fetchPrompt`, async (req, res) => {
  try {
    const userId = req.params.userId

    return res.status(200).json({
      prompt: '',
      recipient: ''
    })
    console.log(userId)
  } catch (err) {
    console.log(err)
  }
})

export default router
