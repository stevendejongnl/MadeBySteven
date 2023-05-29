import {expect, fixture, html} from '@open-wc/testing'

import { MadeBySteven } from './made-by-steven.js'
import './made-by-steven.js'

const getPart = (element: Element, partName = 'base'): Element => {
  const host = element.shadowRoot || element
  const part = host.querySelector(`[part="${partName}"]`)

  if (part === null) {
    throw new Error(`Part '${partName}' not found.`)
  }

  return part
}

describe('Made by Steven', () => {
  let component: MadeBySteven
  let part: Element
  beforeEach(async () => {
    component = await fixture(html`<made-by-steven>Content Yo!</made-by-steven>`)
    part = getPart(component)
  })
  it('renders', () => expect(component).to.be.instanceOf(MadeBySteven))
  it('renders  slotted content', () => expectMadeByStevenContentDidRender(part))
})

const expectMadeByStevenContentDidRender = (part: Element): void => {
  console.log(part)
  console.log(part.textContent)
  const [slottedContent] = part.querySelector('slot')!.assignedNodes()
  expect(slottedContent!.textContent).to.equal('Content Yo!')
}
