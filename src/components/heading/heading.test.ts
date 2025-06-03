import { test, expect, Page } from '@playwright/test'

const HOST = 'http://localhost:3000'

async function assertFullTextShouldNotBePresent(page: Page) {
  return await expect(page.locator('header')).not.toContainText('Made by Steven')
}

async function assertVisibleAndBlinkingCursorWhileTyping(page: Page) {
  const cursor = page.locator('header .cursor')
  await expect(cursor).toBeVisible()
  await expect(cursor).toHaveText('|')
}

async function assertWaitForFullTextToBeWritten(page: Page) {
  const fullText = 'Made by Steven'
  const calculatedTime = 150 * (fullText.length + 5)
  const header = page.locator('header .name')
  await expect(header).toContainText('Made by Steven', { timeout: calculatedTime })
}

async function assertCursorIsStillBlinkingAfterFullText(page: Page) {
  const cursor = page.locator('header .cursor')
  await expect(cursor).toBeVisible()
  await expect(cursor).toHaveText('|')
}

test('header types out text with blinking cursor', async ({ page }) => {
  await page.goto(HOST)

  await assertFullTextShouldNotBePresent(page)
  await assertVisibleAndBlinkingCursorWhileTyping(page)
  await assertWaitForFullTextToBeWritten(page)
  await assertCursorIsStillBlinkingAfterFullText(page)
})