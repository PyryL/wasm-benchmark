const { describe, test, expect } = require('@playwright/test')

describe('benchmarks', () => {
  test('fibonacci works', async ({ page }) => {
    await page.goto('/')

    const jsResult = page.getByTestId('fibonacci-js-cell').first()
    const rustResult = page.getByTestId('fibonacci-rust-cell').first()

    await expect(jsResult).toBeVisible()
    await expect(rustResult).toBeVisible()

    await page.getByTestId('fibonacci-run-btn').first().click()

    expect(await jsResult.textContent()).toEqual('Running...')
    expect(await rustResult.textContent()).toEqual('Running...')

    await page.locator('data-testid=fibonacci-rust-cell', { hasNotText: 'Running...' }).waitFor()

    expect(await jsResult.textContent()).toMatch(/\d+ ms/)
    expect(await rustResult.textContent()).toMatch(/\d+ ms/)
  })

  test('matrix multiplication works', async ({ page }) => {
    await page.goto('/')

    const jsResult = page.getByTestId('matrix-multiplication-js-cell').first()
    const rustResult = page.getByTestId('matrix-multiplication-rust-cell').first()

    await expect(jsResult).toBeVisible()
    await expect(rustResult).toBeVisible()

    await page.getByTestId('matrix-multiplication-run-btn').first().click()

    expect(await jsResult.textContent()).toEqual('Running...')
    expect(await rustResult.textContent()).toEqual('Running...')

    await page.locator('data-testid=matrix-multiplication-rust-cell', { hasNotText: 'Running...' }).waitFor()

    expect(await jsResult.textContent()).toMatch(/\d+ ms/)
    expect(await rustResult.textContent()).toMatch(/\d+ ms/)
  })

  test('primality works', async ({ page }) => {
    await page.goto('/')

    const jsResult = page.getByTestId('primality-js-cell').first()
    const rustResult = page.getByTestId('primality-rust-cell').first()

    await expect(jsResult).toBeVisible()
    await expect(rustResult).toBeVisible()

    await page.getByTestId('primality-run-btn').first().click()

    expect(await jsResult.textContent()).toEqual('Running...')
    expect(await rustResult.textContent()).toEqual('Running...')

    await page.locator('data-testid=primality-rust-cell', { hasNotText: 'Running...' }).waitFor()

    expect(await jsResult.textContent()).toMatch(/\d+ ms/)
    expect(await rustResult.textContent()).toMatch(/\d+ ms/)
  })
})
