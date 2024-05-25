const { describe, test, expect } = require('@playwright/test')

describe('frontpage', () => {
  test('loads frontpage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Rust WebAssembly benchmark')).toBeVisible()
    await expect(page.getByText(/Copyright .+ 2024.* Pyry Lahtinen/)).toBeVisible()
  })
})
