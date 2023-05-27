import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-by-steven.style.js'

@customElement('made-by-steven')
export class MadeBySteven extends LitElement {
  static override styles = style

  override render() {
    return html`
      <main class="made-by-steven">
        <slot part="base"></slot>
      </main>
    `;
  }
}
