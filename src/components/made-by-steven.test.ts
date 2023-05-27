import {expect, fixture, html} from '@open-wc/testing'

import { MadeBySteven } from "./made-by-steven.js"

describe('Made by Steven', () => {
  let component: MadeBySteven
  beforeEach(async () => {
    component = await fixture(html`<made-by-steven>Content Yo!</made-by-steven>`)
  })
  it('renders', () => expectMadeByStevenContentDidRender(component))
})

const expectMadeByStevenContentDidRender = (component: MadeBySteven): void => {
  const content = component?.shadowRoot?.querySelector('[part="base"]').textContent
  expect(content).to.be('Content Yo!')
}
