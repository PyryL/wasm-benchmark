import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const pingApi = async () => {
  console.log('api url', `${BASE_URL}/ping`)
  const result = await axios.get(`${BASE_URL}/ping`)
  return result.data
}

/**
 * Send the benchmark result to the server.
 * @param {string} benchmarkName Name of the benchmark.
 * @param {number} jsResult JavaScript benchmark result in milliseconds.
 * @param {number} rustResult Rust benchmark result in milliseconds.
 * @param {string} browserInfo Context information about the browser.
 */
export const reportBenchmarkResult = async (benchmarkName, jsResult, rustResult, browserInfo) => {
  const payload = { benchmarkName, jsResult, rustResult, browserInfo }
  try {
    await axios.post(`${BASE_URL}/benchmarks`, payload)
  } catch (err) {
    console.error(err)
  }
}
