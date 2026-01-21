import { test, expect } from '@playwright/test'

const HOST = 'http://localhost:3000'

test('home page renders and types title', async ({ page }) => {
  await page.goto(HOST)

  // Wait for home page component
  await page.waitForSelector('mbs-home-page')

  // Check title appears character-by-character
  // Timing: 50ms per char * 14 chars ('MADE BY STEVEN') + buffer
  const homePageH1 = page.locator('mbs-home-page h1')
  await expect(homePageH1).toContainText('MADE BY STEVEN', {
    timeout: 1000 + 50 * 14
  })
})

test('home page renders all components', async ({ page }) => {
  await page.goto(HOST)

  // Wait for animations to complete
  // Title: 50ms * 14 chars = 700ms
  // Then 200ms delay before profile/skills shown
  // Then skills animation + 200ms = ~2s total
  await page.waitForTimeout(2500)

  // Verify all main components are present
  await expect(page.locator('mbs-profile-card')).toBeVisible()
  await expect(page.locator('mbs-skills-list')).toBeVisible()
  await expect(page.locator('mbs-stats-bar')).toBeVisible()
})
