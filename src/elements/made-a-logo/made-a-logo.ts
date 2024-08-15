import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

// import {style} from './made-a-logo.style.js'

@customElement('made-a-logo')
export class MadeALogo extends LitElement {
  // static override styles = style

  override render() {
    return html`
      <img class="made-a-logo" src="" />
    `
  }
}
