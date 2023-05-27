import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-my-slogan.style.js'

@customElement('made-my-slogan')
export class MadeMySlogan extends LitElement {
  static override styles = style

  override render() {
    return html`
      <slot part="base"></slot>
    `
  }
}
