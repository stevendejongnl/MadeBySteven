import { LitElement } from 'lit';
import { Repository } from '../made-a-github-repository/made-a-github-repository.interface.js';
export declare class MadeAGithubOverview extends LitElement {
    static styles: import("lit").CSSResult;
    firstUpdated(): Promise<void>;
    private _repositories;
    get repositories(): Repository[];
    fetchRepositories(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
