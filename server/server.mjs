import express from 'express'
import auth from '../server/routes/auth.mjs'
import connections from '../server/routes/connections.mjs'
import user from '../server/routes/user.mjs'
import messages from '../server/routes/messages.mjs'
import prompt from '../server/routes/prompt.mjs'

import cors from 'cors'
import connectDatabase from './config/db.mjs'

const app = express()
const port = 3000

connectDatabase()
app.use(express.json())
app.use(cors())
app.use('/api/auth', auth)
app.use('/api/', connections)
app.use('/api', user)
app.use('/api', messages)
app.use('/api', prompt)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
