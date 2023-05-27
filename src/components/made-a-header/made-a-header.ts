import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-a-header.style.js'

@customElement('made-a-header')
export class MadeAHeader extends LitElement {
  static override styles = style

  override render() {
    return html`
      <header class="made-a-header">
        <slot part="base"></slot>
      </header>
    `
  }
}
