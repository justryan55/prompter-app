import express from 'express'
import auth from '../server/routes/auth.mjs'
import connections from '../server/routes/connections.mjs'

import cors from 'cors'
import connectDatabase from './config/db.mjs'

const app = express()
const port = 3000

connectDatabase()
app.use(express.json())
app.use(cors())
app.use('/api/auth', auth)
app.use('/api/', connections)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
