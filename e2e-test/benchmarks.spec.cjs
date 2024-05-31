const { describe, test, expect } = require('@playwright/test')

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

  await page.locator(
    `data-testid=${testName}-run-btn`,
    { hasNotText: 'Running...' }
  ).waitFor({ timeout: 10000 })

  expect(await jsResult.textContent()).toMatch(/\d+ ms/)
  expect(await rustResult.textContent()).toMatch(/\d+ ms/)

  await expect(button).toHaveText('Rerun')
}

describe('benchmarks', () => {
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
