var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from './made-my-slogan.style.js';
export let MadeMySlogan = class MadeMySlogan extends LitElement {
    render() {
        return html `
      <div class="made-my-slogan" part="base">
        <slot></slot>
      </div>
    `;
    }
};
MadeMySlogan.styles = style;
MadeMySlogan = __decorate([
    customElement('made-my-slogan')
], MadeMySlogan);
//# sourceMappingURL=made-my-slogan.js.map