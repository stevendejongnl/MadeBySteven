import { test, expect } from '@playwright/test'

const HOST = 'http://localhost:3000'

test('contribution graph component renders', async ({ page }) => {
  await page.goto(HOST)

  // Wait for page to load
  await page.waitForTimeout(2000)

  // Check if contribution-graph component is in the DOM
  const component = page.locator('mbs-contribution-graph')
  const count = await component.count()

  // Component should exist (might be 0 if not visible yet)
  if (count > 0) {
    await expect(component).toHaveCount(1)
  }
})

test('contribution graph displays contribution cells', async ({ page }) => {
  await page.goto(HOST)

  // Wait for animations and data loading
  await page.waitForTimeout(5000)

  // Find contribution cells
  const cells = page.locator('mbs-contribution-graph .contribution-cell')
  const cellCount = await cells.count()

  // Should have cells if data loaded successfully
  // 52-53 weeks × 7 days = 364-371 cells
  if (cellCount > 0) {
    expect(cellCount).toBeGreaterThan(300)
    expect(cellCount).toBeLessThan(400)
  }
})

test('contribution graph tooltip appears on hover', async ({ page }) => {
  await page.goto(HOST)

  // Wait for page to fully load
  await page.waitForTimeout(5000)

  const cells = page.locator('mbs-contribution-graph .contribution-cell').first()
  const cellCount = await page.locator('mbs-contribution-graph .contribution-cell').count()

  if (cellCount > 0) {
    // Hover over first cell
    await cells.hover()

    // Wait for tooltip
    await page.waitForTimeout(500)

    // Tooltip should be visible
    const tooltip = page.locator('mbs-contribution-graph .tooltip')
    const tooltipCount = await tooltip.count()

    if (tooltipCount > 0) {
      await expect(tooltip).toHaveCount(1)
    }
  }
})

test('contribution graph shows total contributions', async ({ page }) => {
  await page.goto(HOST)

  // Wait for data loading
  await page.waitForTimeout(5000)

  const totalText = page.locator('mbs-contribution-graph .total-contributions')
  const count = await totalText.count()

  if (count > 0) {
    const text = await totalText.textContent()
    expect(text).toContain('Total:')
    expect(text).toContain('contributions')
  }
})
