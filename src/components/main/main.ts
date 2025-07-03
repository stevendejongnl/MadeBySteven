import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './main.style.js'

@customElement('mbs-main')
export class MbsMain extends LitElement {
  static override styles = styles

  private currentPage: string = 'home'

  private detectPage() {
    const path = window.location.pathname
    if (path === '/' || path === '/home') return 'home'
    if (path === '/projects') return 'projects'
    if (path === '/about') return 'about'
    if (path === '/contact') return 'contact'
    return 'home'
  }

  private renderPage() {
    switch (this.currentPage) {
      case 'projects':
        return html`<mbs-projects-page></mbs-projects-page>`
      case 'about':
        return html`<mbs-about-page></mbs-about-page>`
      case 'contact':
        return html`<mbs-contact-page></mbs-contact-page>`
      default:
        return html`<mbs-home-page></mbs-home-page>`
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    this.currentPage = this.detectPage()
    this.addEventListener('suggestions-finished', this.handleSuggestionsFinished as EventListener)
  }

  private handleSuggestionsFinished = () => {
    this.currentPage = this.detectPage()
    this.requestUpdate()
  }

  override render() {
    return html`
      <main>
        <mbs-suggestions></mbs-suggestions>
        ${this.renderPage()}
      </main>
    `
  }
}
