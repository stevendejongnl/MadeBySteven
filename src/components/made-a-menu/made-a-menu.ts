import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-a-menu.style.js'

@customElement('made-a-menu')
export class MadeAMenu extends LitElement {
  static override styles = style

  override render() {
    return html`
      <nav class="made-a-menu">
        <slot part="base"></slot>
      </nav>
    `
  }
}
