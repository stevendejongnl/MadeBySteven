import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mbs-home-page')
export class MbsHomePage extends LitElement {
  override render() {
    return html`
      <section>
        <h1>Hello!</h1>
      </section>
    `
  }
}