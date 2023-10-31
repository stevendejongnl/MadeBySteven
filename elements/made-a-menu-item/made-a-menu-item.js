var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './made-a-menu-item.style.js';
export let MadeAMenuItem = class MadeAMenuItem extends LitElement {
    constructor() {
        super(...arguments);
        this.url = '';
    }
    render() {
        return html `
      <a href=${this.url} part="base">
          <slot></slot>
      </a>
    `;
    }
};
MadeAMenuItem.styles = style;
__decorate([
    property({ type: String })
], MadeAMenuItem.prototype, "url", void 0);
MadeAMenuItem = __decorate([
    customElement('made-a-menu-item')
], MadeAMenuItem);
//# sourceMappingURL=made-a-menu-item.js.map