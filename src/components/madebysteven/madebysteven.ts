import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './madebysteven.styles.js'

@customElement('made-by-steven')
export class MadeBySteven extends LitElement {
  static override styles = styles

  override render() {
    return html`<main>
      <mbs-header></mbs-header>
      <mbs-content></mbs-content>
      <mbs-footer></mbs-footer>
    </main>`
  }
}
