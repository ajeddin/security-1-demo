const express = require('express')
const cors = require('cors')
const {createMessages} = require('./controllers/messageController')
const app = express()
app.use(express.json())
app.use(cors())

app.listen(4004, () => console.log('Jamming 4004'))

app.post('/api/messages/',createMessages)

