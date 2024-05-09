const { describe, test, expect } = require('@playwright/test')

describe('frontpage', () => {
  test('loads frontpage', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Run benchmark')).toBeDefined()
    await expect(page.getByText('Rust WebAssembly result:')).toBeDefined()
  })
})
