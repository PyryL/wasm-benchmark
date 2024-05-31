const { describe, test, expect } = require('@playwright/test')
const { client } = require('../backend/database')

/**
 * @param {import('@playwright/test').Page} page 
 * @param {string} testName 
 */
const testBenchmark = async (page, testName) => {
  await page.goto('/')

  const button = page.getByTestId(`${testName}-run-btn`).first()
  const jsResult = page.getByTestId(`${testName}-js`).first()
  const rustResult = page.getByTestId(`${testName}-rust`).first()

  await expect(jsResult).not.toBeAttached()
  await expect(rustResult).not.toBeAttached()

  await expect(button).toHaveText('Run benchmark')
  await button.click()
  await expect(button).toHaveText('Running...')

  await expect(jsResult).toBeAttached()
  await expect(rustResult).toBeAttached()

  const apiRequest = page.waitForResponse(/\/api\/benchmarks$/)

  await page.locator(
    `data-testid=${testName}-run-btn`,
    { hasNotText: 'Running...' }
  ).waitFor({ timeout: 10000 })

  expect(await jsResult.textContent()).toMatch(/\d+ ms/)
  expect(await rustResult.textContent()).toMatch(/\d+ ms/)

  await expect(button).toHaveText('Rerun')

  await apiRequest

  const databaseResult = await client.query('SELECT * FROM Benchmarks')
  expect(databaseResult.rowCount).toBe(1)
  expect(databaseResult.rows[0].benchmark_name).toBe(testName)
  expect(databaseResult.rows[0].js_result).toBeGreaterThan(0)
  expect(databaseResult.rows[0].js_result).toBeLessThan(8000)
  expect(databaseResult.rows[0].rust_result).toBeGreaterThan(0)
  expect(databaseResult.rows[0].rust_result).toBeLessThan(8000)
  expect(Date.now() - databaseResult.rows[0].created_at).toBeGreaterThan(0)
  expect(Date.now() - databaseResult.rows[0].created_at).toBeLessThan(5000)
}

describe('benchmarks', () => {
  test.beforeEach(async () => {
    await client.query('TRUNCATE TABLE Benchmarks')
  })

  test('fibonacci works', async ({ page }) => {
    await testBenchmark(page, 'fibonacci')
  })

  test('matrix multiplication works', async ({ page }) => {
    await testBenchmark(page, 'matmul')
  })

  test('primality works', async ({ page }) => {
    await testBenchmark(page, 'primality')
  })
})
