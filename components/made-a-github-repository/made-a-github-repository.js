var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './made-a-github-repository.style.js';
export let MadeAGithubRepository = class MadeAGithubRepository extends LitElement {
    async firstUpdated() {
        const languages = this.getLanguagesFromLocalStorage();
        if (languages) {
            this._languages = languages;
            this.requestUpdate();
        }
        else {
            await this.fetchLanguages();
        }
    }
    get languages() {
        return this._languages;
    }
    async fetchLanguages() {
        if (this.repository?.languages_url) {
            try {
                const response = await fetch(this.repository.languages_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch languages');
                }
                const languages = await response.json();
                this._languages = languages;
                this.saveLanguagesToLocalStorage(languages);
                this.requestUpdate();
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    saveLanguagesToLocalStorage(languages) {
        const storageKey = `languages_${this.repository?.name}`;
        const storageValue = JSON.stringify({
            data: languages,
            expiration: Date.now() + 24 * 60 * 60 * 1000 // Vervaldatum na 24 uur (in milliseconden)
        });
        localStorage.setItem(storageKey, storageValue);
    }
    getLanguagesFromLocalStorage() {
        const storageKey = `languages_${this.repository?.name}`;
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
            const languagesData = JSON.parse(storageValue);
            if (this.isLanguagesExpired(languagesData)) {
                localStorage.removeItem(storageKey);
                return null;
            }
            return languagesData.data;
        }
        return null;
    }
    isLanguagesExpired(languagesData) {
        const expiration = languagesData.expiration;
        return Date.now() > expiration;
    }
    constructor() {
        super();
        this._languages = {};
        this.repository = null;
    }
    render() {
        return html `
      <article class="made-a-github-repository" part="base">
        <a class="title" target="_blank" href="${this.repository?.html_url}">
          ${this.repository?.name}
        </a>
        <div class="description">
          <p>${this.repository?.description}</p>
        </div>
        <footer>
          <ul class="languages">
            ${Object.entries(this.languages).map(([language]) => html `
              <li>${language}</li>
            `)}
          </ul>
          <div class="stars">
            ${this.repository?.stargazers_count || null}
          </div>
        </footer>
      </article>
    `;
    }
};
MadeAGithubRepository.styles = style;
__decorate([
    property({ type: Object })
], MadeAGithubRepository.prototype, "repository", void 0);
MadeAGithubRepository = __decorate([
    customElement('made-a-github-repository')
], MadeAGithubRepository);
//# sourceMappingURL=made-a-github-repository.js.map