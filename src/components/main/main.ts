import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './main.style.js'

@customElement('mbs-main')
export class MbsMain extends LitElement {
  static override styles = styles

  override render() {
    return html`
      <main>
        <mbs-suggestions></mbs-suggestions>
      </main>
    `
  }
}
