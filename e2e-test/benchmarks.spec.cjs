const { describe, test, expect } = require('@playwright/test')

describe('benchmarks', () => {
  test('fibonacci works', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Rust WebAssembly result: -').first()).toBeVisible()

    await page.getByText('Run benchmark').first().click()

    await expect(page.getByText('Rust WebAssembly result: ...').first()).toBeVisible()

    await expect(page.getByText(/Rust WebAssembly result: \d+ ms/).first()).toBeVisible()

    await expect(page.getByText(/Javascript result: \d+ ms/).first()).toBeVisible()
  })
})
