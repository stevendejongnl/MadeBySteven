(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lit'), require('lit/decorators.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lit', 'lit/decorators.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MadeBySteven = {}, global.lit, global.decorators_js));
})(this, (function (exports, lit, decorators_js) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    const style = lit.css `
  .made-by-steven {
    display: grid;
    width: 100vw;
    height: 100vh;
    background-color: #2E3440;
  }
`;

    exports.MadeBySteven = class MadeBySteven extends lit.LitElement {
        render() {
            return lit.html `
      <main class="made-by-steven">
        <slot part="base"></slot>
      </main>
    `;
        }
    };
    exports.MadeBySteven.styles = style;
    exports.MadeBySteven = __decorate([
        decorators_js.customElement('made-by-steven')
    ], exports.MadeBySteven);

    // import {style} from './made-a-menu.style.js'
    exports.MadeAHeader = class MadeAHeader extends lit.LitElement {
        // static override styles = style
        render() {
            return lit.html `
      <header class="made-a-header">
        <slot part="base"></slot>
      </header>
    `;
        }
    };
    exports.MadeAHeader = __decorate([
        decorators_js.customElement('made-a-header')
    ], exports.MadeAHeader);

    // import {style} from './made-a-menu.style.js'
    exports.MadeAMenu = class MadeAMenu extends lit.LitElement {
        // static override styles = style
        render() {
            return lit.html `
      <nav class="made-a-menu">
        <slot part="base"></slot>
      </nav>
    `;
        }
    };
    exports.MadeAMenu = __decorate([
        decorators_js.customElement('made-a-menu')
    ], exports.MadeAMenu);

    // import {style} from './made-a-logo.style.js'
    exports.MadeALogo = class MadeALogo extends lit.LitElement {
        // static override styles = style
        render() {
            return lit.html `
      <img class="made-a-logo" src="" />
    `;
        }
    };
    exports.MadeALogo = __decorate([
        decorators_js.customElement('made-a-logo')
    ], exports.MadeALogo);

    // import {style} from './made-a-menu-item.style.js'
    exports.MadeAMenuItem = class MadeAMenuItem extends lit.LitElement {
        // static override styles = style
        render() {
            return lit.html `
      <a href="/item">
          <slot part="base"></slot>
      </a>
    `;
        }
    };
    exports.MadeAMenuItem = __decorate([
        decorators_js.customElement('made-a-menu-item')
    ], exports.MadeAMenuItem);

}));
