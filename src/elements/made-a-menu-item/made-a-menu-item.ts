import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

// import {style} from './made-a-menu-item.style.js'

@customElement('made-a-menu-item')
export class MadeAMenuItem extends LitElement {
  // static override styles = style

  override render() {
    return html`
      <a href="/item">
          <slot part="base"></slot>
      </a>
    `
  }
}
