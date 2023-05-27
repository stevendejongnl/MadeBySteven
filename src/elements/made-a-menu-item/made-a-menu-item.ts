import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {style} from './made-a-menu-item.style.js'

@customElement('made-a-menu-item')
export class MadeAMenuItem extends LitElement {
  static override styles = style

  @property({ type: String })
  url = ''

  override render() {
    return html`
      <a href=${this.url}>
          <slot part="base"></slot>
      </a>
    `
  }
}
