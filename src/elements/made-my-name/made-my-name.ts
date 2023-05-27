import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

// import {style} from './made-a-menu-item.style.js'

@customElement('made-my-name')
export class MadeMyName extends LitElement {
  // static override styles = style

  override render() {
    return html`
      <slot part="base"></slot>
    `
  }
}
