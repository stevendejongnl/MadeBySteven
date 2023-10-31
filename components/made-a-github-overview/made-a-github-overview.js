var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from './made-a-github-overview.style.js';
const github_url = 'https://github.com/stevendejongnl';
const github_api = 'https://api.github.com/users/stevendejongnl';
export let MadeAGithubOverview = class MadeAGithubOverview extends LitElement {
    constructor() {
        super(...arguments);
        this._repositories = [];
    }
    async firstUpdated() {
        const repositories = this.getRepositoriesFromLocalStorage();
        if (repositories) {
            this._repositories = repositories;
            this.requestUpdate();
        }
        else {
            await this.fetchRepositories();
        }
    }
    get repositories() {
        return this._repositories;
    }
    async fetchRepositories() {
        try {
            const response = await fetch(`${github_api}/repos`);
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            const repositories = await response.json().then((data) => data.sort((a, b) => {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }));
            this._repositories = repositories;
            this.saveRepositoriesToLocalStorage(repositories);
            this.requestUpdate();
        }
        catch (error) {
            console.error(error);
        }
    }
    saveRepositoriesToLocalStorage(repositories) {
        const storageKey = 'repositories';
        const storageValue = JSON.stringify({
            data: repositories,
            expiration: Date.now() + 24 * 60 * 60 * 1000 // Vervaldatum na 24 uur (in milliseconden)
        });
        localStorage.setItem(storageKey, storageValue);
    }
    getRepositoriesFromLocalStorage() {
        const storageKey = 'repositories';
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
            const repositoriesData = JSON.parse(storageValue);
            if (this.isRepositoriesExpired(repositoriesData)) {
                localStorage.removeItem(storageKey);
                return null;
            }
            return repositoriesData.data;
        }
        return null;
    }
    isRepositoriesExpired(repositoriesData) {
        const expiration = repositoriesData.expiration;
        return Date.now() > expiration;
    }
    render() {
        return html `
      <section class="made-a-github-overview">
        <header>
          <a href="${github_url}" target="_blank">
            GitHub Projects
          </a>
        </header>
        ${this.repositories.map((repository) => html `<made-a-github-repository part="base" .repository="${repository}"></made-a-github-repository>`)}
      </section>
    `;
    }
};
MadeAGithubOverview.styles = style;
MadeAGithubOverview = __decorate([
    customElement('made-a-github-overview')
], MadeAGithubOverview);
//# sourceMappingURL=made-a-github-overview.js.map