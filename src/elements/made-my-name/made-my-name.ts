import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-my-name.style.js'

@customElement('made-my-name')
export class MadeMyName extends LitElement {
  static override styles = style

  override render() {
    return html`
      <div class="made-my-name" part="base">
        <slot></slot>
      </div>
      
      <div class="made-my-slogan" part="made-my-slogan">
        <slot name="made-my-slogan"></slot>
      </div>
    `
  }
}
