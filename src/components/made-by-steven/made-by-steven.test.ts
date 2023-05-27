import {expect, fixture, html} from '@open-wc/testing'

import { MadeBySteven } from './made-by-steven.js'

describe('Made by Steven', () => {
  let component: MadeBySteven
  beforeEach(async () => {
    component = await fixture(html`<made-by-steven>Content Yo!</made-by-steven>`)
  })
  it('renders', () => expectMadeByStevenContentDidRender(component))
})

const expectMadeByStevenContentDidRender = (component: MadeBySteven): void => {
  const content = (component.shadowRoot || component).querySelector('[part="base"]')?.textContent

  console.log((component.shadowRoot))
  console.log((component.shadowRoot?.querySelector('[part="base"]')))

  console.log(content)

  expect(content).to.equal('Content Yo!')
}
