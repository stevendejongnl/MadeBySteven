import { LitElement } from 'lit';
import { Languages, Repository } from './made-a-github-repository.interface.js';
export declare class MadeAGithubRepository extends LitElement {
    static styles: import("lit").CSSResult;
    repository: Repository | null;
    firstUpdated(): Promise<void>;
    private _languages;
    get languages(): Languages;
    fetchLanguages(): Promise<void>;
    private saveLanguagesToLocalStorage;
    private getLanguagesFromLocalStorage;
    private isLanguagesExpired;
    constructor();
    render(): import("lit").TemplateResult<1>;
}
