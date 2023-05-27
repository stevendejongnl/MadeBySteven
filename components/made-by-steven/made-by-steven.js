var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from './made-by-steven.style.js';
let MadeBySteven = class MadeBySteven extends LitElement {
    render() {
        return html `
      <main class="made-by-steven">
        <slot part="base"></slot>
      </main>
    `;
    }
};
MadeBySteven.styles = style;
MadeBySteven = __decorate([
    customElement('made-by-steven')
], MadeBySteven);
export { MadeBySteven };
