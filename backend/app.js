const express = require('express')
const path = require('node:path')
const { insertBenchmark } = require('./database')

const app = express()

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors')
  app.use(cors())
}

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/api/ping', (req, res) => {
  res.send('pong')
})

app.post('/api/benchmarks', express.json(), async (req, res) => {
  const { benchmarkName, jsResult, rustResult, browserInfo } = req.body

  try {
    await insertBenchmark(benchmarkName, jsResult, rustResult, browserInfo)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }

  res.sendStatus(200)
})

module.exports = app
