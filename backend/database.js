const { Client } = require('pg')

const client = new Client(process.env.DATABASE_URL)
client.connect()

/**
 * Save benchmark result to database.
 * @param {string} benchmarkName Name of the benchmark.
 * @param {number} jsResult JavaScript benchmark result in milliseconds.
 * @param {number} rustResult Rust benchmark result in milliseconds.
 * @param {string} browserInfo Context information about the browser.
 */
const insertBenchmark = async (benchmarkName, jsResult, rustResult, browserInfo) => {
  await client.query(
    'INSERT INTO Benchmarks (benchmark_name, js_result, rust_result, browser_info) \
    VALUES ($1::text, $2::int, $3::int, $4::text)',
    [benchmarkName, jsResult, rustResult, browserInfo]
  )
}

module.exports = {
  insertBenchmark,
}
