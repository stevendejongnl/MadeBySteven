import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { terminalHeaderStyles } from './terminal-header.style.js';

interface Tab {
  label: string
  path: string
}

@customElement('mbs-terminal-header')
export class MbsTerminalHeader extends LitElement {
  static override styles = terminalHeaderStyles;

  @state() private currentPath: string = '/';

  private tabs: Tab[] = [
    { label: 'About', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.updatePath();
    window.addEventListener('popstate', () => this.updatePath());
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('popstate', () => this.updatePath());
  }

  private updatePath(): void {
    this.currentPath = window.location.pathname;
  }

  private isActiveTab(path: string): boolean {
    const normalizedCurrent = this.currentPath === '/' ? '/' : this.currentPath;
    const normalizedPath = path === '/' ? '/' : path;
    return normalizedCurrent === normalizedPath;
  }

  override render() {
    return html`
      <div class="header-container">
        <div class="traffic-lights">
          <div class="traffic-light red"></div>
          <div class="traffic-light yellow"></div>
          <div class="traffic-light green"></div>
        </div>

        <div class="tabs-container">
          ${this.tabs.map(
            tab => html`
              <a
                href="${tab.path}"
                class="tab ${this.isActiveTab(tab.path) ? 'active' : ''}"
                @click="${(e: MouseEvent) => this.handleTabClick(e, tab.path)}"
              >
                [ ${tab.label} ]
              </a>
            `
          )}
        </div>

        <div class="spacer"></div>
      </div>
    `;
  }

  private handleTabClick(e: MouseEvent, path: string): void {
    e.preventDefault();
    window.history.pushState(null, '', path);
    this.updatePath();
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mbs-terminal-header': MbsTerminalHeader
  }
}
