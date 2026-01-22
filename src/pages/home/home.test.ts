import { test, expect } from '@playwright/test'

const HOST = 'http://localhost:3000'

test('home page renders and loads successfully', async ({ page }) => {
  await page.goto(HOST)

  // Wait for home page component to be in DOM
  const homePage = page.locator('mbs-home-page')
  await homePage.waitFor({ state: 'attached', timeout: 10000 })

  // Component should exist
  await expect(homePage).toHaveCount(1)
})

test('home page completes animations', async ({ page }) => {
  await page.goto(HOST)

  // Wait for home page component to be in DOM
  const homePage = page.locator('mbs-home-page')
  await homePage.waitFor({ state: 'attached', timeout: 10000 })

  // Wait for animations to complete (should not throw)
  // Title: 50ms * 14 chars = 700ms
  // Then 200ms delay before profile/skills shown
  // Then skills animation + 200ms = ~2.2s total, doubled for safety
  await page.waitForTimeout(5000)

  // Home page component should still exist after animations
  await expect(homePage).toHaveCount(1)
})
