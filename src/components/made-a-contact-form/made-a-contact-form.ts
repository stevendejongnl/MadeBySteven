import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {style} from './made-a-contact-form.style.js'

@customElement('made-a-contact-form')
export class MadeAContactForm extends LitElement {
  static override styles = style


  override render() {
    return html`
      <section class="made-a-contact-form" part="base">
        <slot></slot>
      </section>
    `
  }
}
