import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('made-by-steven')
export class MadeBySteven extends LitElement {
  override render() {
    return html`<p>Made by Steven</p>`
  }
}
