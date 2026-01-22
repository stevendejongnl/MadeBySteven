import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { fetchGitHubUser, fetchGitHubStats } from '../../services/github-api.js';
import { statsBarStyles } from './stats-bar.style.js';

interface Stats {
  contributions: number
  repos: number
  followers: number
}

@customElement('mbs-stats-bar')
export class MbsStatsBar extends LitElement {
  static override styles = statsBarStyles;

  @state() private stats: Stats = { contributions: 0, repos: 0, followers: 0 };

  @state() private loading: boolean = true;

  @state() private isSmallDevice: boolean = window.innerWidth <= 768;

  private dataLoaded: boolean = false;

  private _skillsFinished: boolean = false;

  private resizeListener = () => {
    this.isSmallDevice = window.innerWidth <= 768;
  };

  @property()
  get skillsFinished(): boolean {
    return this._skillsFinished;
  }

  set skillsFinished(value: boolean) {
    this._skillsFinished = value;
    this.updateLoading();
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadStats();
    window.addEventListener('resize', this.resizeListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeListener);
  }

  private async loadStats(): Promise<void> {
    try {
      const [user, contributions] = await Promise.all([
        fetchGitHubUser(),
        fetchGitHubStats(),
      ]);

      this.stats = {
        contributions,
        repos: user.public_repos,
        followers: user.followers,
      };

      this.dataLoaded = true;
      this.updateLoading();
    } catch (error) {
      console.error('Failed to load stats:', error);
      this.dataLoaded = true;
      this.updateLoading();
    }
  }

  private updateLoading(): void {
    // Show loading until both data is loaded AND skills are finished
    this.loading = !(this.dataLoaded && this.skillsFinished);
  }

  override render() {
    return html`
      <div class="status-bar">
        ${!this.isSmallDevice
          ? html`
              <div class="stats-content ${this.loading ? 'hidden' : ''}">
                <div class="stat-item">
                  <span class="stat-label">Contributions:</span>
                  <span class="stat-value">${this.stats.contributions}</span>
                </div>

                <div class="stat-separator">|</div>

                <div class="stat-item">
                  <span class="stat-label">Public Repos:</span>
                  <span class="stat-value">${this.stats.repos}</span>
                </div>

                <div class="stat-separator">|</div>

                <div class="stat-item">
                  <span class="stat-label">Followers:</span>
                  <span class="stat-value">${this.stats.followers}</span>
                </div>
              </div>
            `
          : ''}

        <div class="status-item ${this.loading ? 'loading' : ''}">
          <span class="stat-label">Status:</span>
          <span class="stat-value">${this.loading ? 'Loading...' : 'Ready ⚡'}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mbs-stats-bar': MbsStatsBar
  }
}
