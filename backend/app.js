const express = require('express')
const path = require('node:path')

const app = express()

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/api', (req, res) => {
  res.send('hello world')
})

module.exports = app
