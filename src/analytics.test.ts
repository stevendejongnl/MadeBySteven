import { test, expect } from '@playwright/test'

const HOST = 'http://localhost:3000'

interface MtmEntry {
  event: string
  eventCategory?: string
  eventAction?: string
  eventName?: string
}

declare global {
  interface Window {
    _mtm?: MtmEntry[]
  }
}

test('tracks a pageview on initial load', async ({ page }) => {
  await page.goto(HOST)
  await expect.poll(() => page.evaluate(() => window._mtm ?? [])).toContainEqual(
    expect.objectContaining({ event: 'mbsPageView' }),
  )
})

test('tracks a Project/link_click event when a project link is clicked', async ({ page }) => {
  await page.goto(HOST)
  const printFilesLink = page.getByRole('link', { name: /Print Files/ })
  await printFilesLink.waitFor({ state: 'visible', timeout: 10000 })

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    printFilesLink.click(),
  ])
  await popup.close()

  const events = await page.evaluate(() => window._mtm ?? [])
  expect(events).toContainEqual(expect.objectContaining({
    event: 'mbsEvent', eventCategory: 'Project', eventAction: 'link_click', eventName: 'Print Files',
  }))
})
