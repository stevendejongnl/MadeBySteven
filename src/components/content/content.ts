import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './content.styles.js'

@customElement('mbs-content')
export class MBSContent extends LitElement {
  static override styles = styles

  override render() {
    return html`<section>
      <mbs-github-repositories></mbs-github-repositories>
    </section>`
  }
}
