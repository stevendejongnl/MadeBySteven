import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchGitHubUser, getAvatarUrl } from '../../services/github-api.js';
import { profileCardStyles } from './profile-card.style.js';

interface GitHubUserCard {
  login: string
  avatar_url: string
}

@customElement('mbs-profile-card')
export class MbsProfileCard extends LitElement {
  static override styles = profileCardStyles;

  @state() private user: GitHubUserCard | null = null;

  @state() private loading: boolean = true;

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadUserData();
  }

  private async loadUserData(): Promise<void> {
    try {
      const userData = await fetchGitHubUser('stevendejongnl');
      this.user = {
        login: userData.login,
        avatar_url: userData.avatar_url,
      };
      this.loading = false;
      this.requestUpdate();
    } catch (error) {
      console.error('Failed to load user data:', error);
      this.loading = false;
      this.requestUpdate();
    }
  }

  private getDisplayAvatar(): string {
    if (!this.user) return '';
    const userForAvatar = {
      login: this.user.login,
      avatar_url: this.user.avatar_url,
    };
    return getAvatarUrl(userForAvatar);
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="profile-card">
          <div class="avatar loading"></div>
          <div class="username">Loading...</div>
        </div>
      `;
    }

    if (!this.user) {
      return html`
        <div class="profile-card">
          <div class="avatar">SD</div>
          <div class="username">@stevendejongnl</div>
        </div>
      `;
    }

    return html`
      <div class="profile-card">
        <img
          src="${this.getDisplayAvatar()}"
          alt="GitHub Avatar"
          class="avatar"
          @error="${(e: Event) => {
            const img = e.target as HTMLImageElement;
            if (!img.src.startsWith('data:') && this.user) {
              console.warn('Failed to load avatar from GitHub, using fallback SVG');
              img.src = getAvatarUrl(this.user, true);
            }
          }}"
        />
        <a href="https://github.com/${this.user.login}" class="username">
          @${this.user.login}
        </a>
        <a href="https://github.com/${this.user.login}" class="profile-link">
          View Profile →
        </a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mbs-profile-card': MbsProfileCard
  }
}
