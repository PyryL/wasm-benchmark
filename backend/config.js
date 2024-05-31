require('dotenv').config()

const isE2ETest = process.env.E2ETEST == '1'

const isProduction = process.env.NODE_ENV !== 'development' && !isE2ETest

const databaseUrl = isE2ETest ? process.env.E2E_DATABASE_URL : process.env.DATABASE_URL

module.exports = {
  isE2ETest,
  isProduction,
  databaseUrl,
}
