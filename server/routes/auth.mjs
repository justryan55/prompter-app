import express from 'express'
import userModel from '../models/userModel.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists'
      })
    }

    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: 'You must enter a first name'
      })
    }

    if (!lastName) {
      return res.status(400).json({
        success: false,
        message: 'You must enter a last name'
      })
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'You must enter an email address'
      })
    }

    if (!password || password.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'You must enter a valid password that is greater than 5 characters'
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      })
    } else {
      await newUser.save()
      return res.status(200).json({
        success: true,
        message: 'User created'
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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user associated with that email address'
      })
    }

    if (user.isDeleted) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deleted and cannot be used to log in.'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      })
    }

    const secretKey = process.env.SECRET_KEY

    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      myCircle: user.myCircle
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1d' })
    res.status(200).json({
      message: 'User is logged in',
      token: token
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
