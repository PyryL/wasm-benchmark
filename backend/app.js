const express = require('express')
const path = require('node:path')

const app = express()

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors')
  app.use(cors())
}

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/api/ping', (req, res) => {
  res.send('pong')
})

module.exports = app
