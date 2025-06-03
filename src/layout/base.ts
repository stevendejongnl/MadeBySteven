import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './base.style.js'

@customElement('mbs-layout-base')
export class MbsLayoutBase extends LitElement {
  static override styles = styles

  override render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `
  }
}