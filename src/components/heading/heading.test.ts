import { test, expect, Page } from '@playwright/test'

const HOST = 'http://localhost:3000'

async function assertFullTextShouldNotBePresent(page: Page) {
  return await expect(page.locator('header')).not.toContainText('Made by Steven')
}

async function assertWaitForFullTextToBeWritten(page: Page) {
  const fullText = 'Made by Steven'
  const calculatedTime = (150 * fullText.length) + 1000 // 150ms per character + 1 second for the final blink
  const header = page.locator('header .name')
  await expect(header).toContainText('Made by Steven', { timeout: calculatedTime })
}

test('header types out text with blinking cursor', async ({ page }) => {
  await page.goto(HOST)

  await assertFullTextShouldNotBePresent(page)
  await assertWaitForFullTextToBeWritten(page)
})