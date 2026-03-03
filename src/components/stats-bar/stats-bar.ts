import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { fetchGitHubUser, fetchAggregatedStats } from '../../services/github-api.js';
import { statsBarStyles } from './stats-bar.style.js';

interface Stats {
  contributions: number
  repos: number
  followers: number
  contributionTooltip: string
  total_stars: number
  top_language: string | null
  years_active: number
}

@customElement('mbs-stats-bar')
export class MbsStatsBar extends LitElement {
  static override styles = statsBarStyles;

  @state() private stats: Stats = { contributions: 0, repos: 0, followers: 0, contributionTooltip: '', total_stars: 0, top_language: null, years_active: 0 };

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
      const [user, aggregatedStats] = await Promise.all([
        fetchGitHubUser(),
        fetchAggregatedStats(),
      ]);

      const breakdown = aggregatedStats.source_breakdown;
      const tooltip = `GitHub: ${breakdown.github} | GitLab: ${breakdown.gitlab}`;

      this.stats = {
        contributions: aggregatedStats.total_contributions,
        repos: user.public_repos,
        followers: user.followers,
        contributionTooltip: tooltip,
        total_stars: user.total_stars,
        top_language: user.top_language,
        years_active: user.years_active,
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
                  <span class="stat-value" title="${this.stats.contributionTooltip}">${this.stats.contributions}</span>
                </div>

                <div class="stat-separator">|</div>

                <div class="stat-item">
                  <span class="stat-label">Repos:</span>
                  <span class="stat-value">${this.stats.repos}</span>
                </div>

                <div class="stat-separator">|</div>

                <div class="stat-item">
                  <span class="stat-label">Stars:</span>
                  <span class="stat-value">${this.stats.total_stars}</span>
                </div>

                <div class="stat-separator">|</div>

                <div class="stat-item">
                  <span class="stat-label">Followers:</span>
                  <span class="stat-value">${this.stats.followers}</span>
                </div>

                ${this.stats.top_language ? html`
                  <div class="stat-separator">|</div>
                  <div class="stat-item">
                    <span class="stat-value stat-lang">${this.stats.top_language}</span>
                  </div>
                ` : ''}

                ${this.stats.years_active > 0 ? html`
                  <div class="stat-separator">|</div>
                  <div class="stat-item">
                    <span class="stat-label">Since</span>
                    <span class="stat-value">${new Date().getFullYear() - this.stats.years_active}</span>
                  </div>
                ` : ''}
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
