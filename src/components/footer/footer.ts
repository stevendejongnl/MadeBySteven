import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './footer.styles.js'

@customElement('mbs-footer')
export class MBSFooter extends LitElement {
  static override styles = styles

  override render() {
    return html`<footer>
      <h1>Made by Steven</h1>
    </footer>`
  }
}
