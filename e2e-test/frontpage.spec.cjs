const { describe, test, expect } = require('@playwright/test')

describe('frontpage', () => {
  test('loads frontpage', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'Run benchmark' })).toBeDefined()
    await expect(page.getByText('Rust WebAssembly benchmark')).toBeDefined()
  })
})
