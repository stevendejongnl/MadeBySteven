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
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof undefined === "function") r = undefined(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=globalThis,e$5=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),o$6=new WeakMap;let n$6 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$7=t=>new n$6("string"==typeof t?t:t+"",void 0,s$4),S$3=(s,o)=>{if(e$5)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$4.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$5=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$7(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$4,getOwnPropertyDescriptor:r$6,getOwnPropertyNames:h$3,getOwnPropertySymbols:o$5,getPrototypeOf:n$5}=Object,a$3=globalThis,c$4=a$3.trustedTypes,l$3=c$4?c$4.emptyScript:"",p$3=a$3.reactiveElementPolyfillSupport,d$3=(t,s)=>t,u$3={toAttribute(t,s){switch(s){case Boolean:t=t?l$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$3=(t,s)=>!i$4(t,s),y$2={attribute:!0,type:String,converter:u$3,reflect:!1,hasChanged:f$3};Symbol.metadata??=Symbol("metadata"),a$3.litPropertyMetadata??=new WeakMap;let b$1 = class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$2){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$4(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$6(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$2}static _$Ei(){if(this.hasOwnProperty(d$3("elementProperties")))return;const t=n$5(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$3("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$3("properties"))){const t=this.properties,s=[...h$3(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$5(s));}else void 0!==s&&i.push(c$5(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$3(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EO(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$3).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$3;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i,e=!1,r){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$3)(e?r:this[t],s))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$Eg=this._$EP());}C(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.C(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$ET();}catch(s){throw t=!1,this._$ET(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$ET(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET();}updated(t){}firstUpdated(t){}};b$1.elementStyles=[],b$1.shadowRootOptions={mode:"open"},b$1[d$3("elementProperties")]=new Map,b$1[d$3("finalized")]=new Map,p$3?.({ReactiveElement:b$1}),(a$3.reactiveElementVersions??=[]).push("2.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,i$3=t$3.trustedTypes,s$3=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3="$lit$",h$2=`lit$${(Math.random()+"").slice(9)}$`,o$4="?"+h$2,n$4=`<${o$4}>`,r$5=document,l$2=()=>r$5.createComment(""),c$3=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a$2=Array.isArray,u$2=t=>a$2(t)||"function"==typeof t?.[Symbol.iterator],d$2="[ \t\n\f\r]",f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,_$1=/>/g,m$1=RegExp(`>|${d$2}(?:([^\\s"'>=/]+)(${d$2}*=${d$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p$2=/'/g,g$1=/"/g,$$1=/^(?:script|style|textarea|title)$/i,w$1=Symbol.for("lit-noChange"),T$1=Symbol.for("lit-nothing"),A$1=new WeakMap,E$1=r$5.createTreeWalker(r$5,129);function C$1(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$3?s$3.createHTML(i):i}const P$1=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f$2;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f$2?"!--"===u[1]?c=v$1:void 0!==u[1]?c=_$1:void 0!==u[2]?($$1.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m$1):void 0!==u[3]&&(c=m$1):c===m$1?">"===u[0]?(c=r??f$2,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m$1:'"'===u[3]?g$1:p$2):c===g$1||c===p$2?c=m$1:c===v$1||c===_$1?c=f$2:(c=m$1,r=void 0);const x=c===m$1&&t[i+1].startsWith("/>")?" ":"";l+=c===f$2?s+n$4:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h$2+x):s+h$2+(-2===d?i:x);}return [C$1(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};let V$1 = class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P$1(t,s);if(this.el=V.createElement(f,n),E$1.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=E$1.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k$1:"?"===e[1]?H$1:"@"===e[1]?I$1:R$1}),r.removeAttribute(t);}else t.startsWith(h$2)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($$1.test(r.tagName)){const t=r.textContent.split(h$2),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l$2()),E$1.nextNode(),d.push({type:2,index:++c});r.append(t[s],l$2());}}}else if(8===r.nodeType)if(r.data===o$4)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h$2,t+1));)d.push({type:7,index:c}),t+=h$2.length-1;}c++;}}static createElement(t,i){const s=r$5.createElement("template");return s.innerHTML=t,s}};function N$1(t,i,s=t,e){if(i===w$1)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c$3(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N$1(t,h._$AS(t,i.values),h,e)),i}let S$2 = class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$5).importNode(i,!0);E$1.currentNode=e;let h=E$1.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M$1(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L$1(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=E$1.nextNode(),o++);}return E$1.currentNode=r$5,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};let M$1 = class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N$1(this,t,i),c$3(t)?t===T$1||null==t||""===t?(this._$AH!==T$1&&this._$AR(),this._$AH=T$1):t!==this._$AH&&t!==w$1&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):u$2(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==T$1&&c$3(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$5.createTextNode(t)),this._$AH=t;}g(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V$1.createElement(C$1(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new S$2(e,this),s=t.u(this.options);t.p(i),this.$(s),this._$AH=t;}}_$AC(t){let i=A$1.get(t.strings);return void 0===i&&A$1.set(t.strings,i=new V$1(t)),i}T(t){a$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.k(l$2()),this.k(l$2()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}};let R$1 = class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T$1;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N$1(this,t,i,0),o=!c$3(t)||t!==this._$AH&&t!==w$1,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N$1(this,e[s+n],i,n),r===w$1&&(r=this._$AH[n]),o||=!c$3(r)||r!==this._$AH[n],r===T$1?t=T$1:t!==T$1&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===T$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}};let k$1 = class k extends R$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===T$1?void 0:t;}};let H$1 = class H extends R$1{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T$1);}};let I$1 = class I extends R$1{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=N$1(this,t,i,0)??T$1)===w$1)return;const s=this._$AH,e=t===T$1&&s!==T$1||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T$1&&(s===T$1||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}};let L$1 = class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N$1(this,t);}};const Z$1=t$3.litHtmlPolyfillSupport;Z$1?.(V$1,M$1),(t$3.litHtmlVersions??=[]).push("3.0.1");

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$2=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$1,defineProperty:e$1,getOwnPropertyDescriptor:r$3,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$1(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$1(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EO(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i,e=!1,r){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(e?r:this[t],s))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$Eg=this._$EP());}C(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.C(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$ET();}catch(s){throw t=!1,this._$ET(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$ET(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i=t$1.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+h,n$1=`<${o$1}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),w=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),A=new WeakMap,E=r$2.createTreeWalker(r$2,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=E.nextNode(),o++);}return E.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):u(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==T&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$2.createTextNode(t)),this._$AH=t;}g(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new S(e,this),s=t.u(this.options);t.p(i),this.$(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}T(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.k(l()),this.k(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class k extends R{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===T?void 0:t;}}class H extends R{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T);}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t);}}const Z=t$1.litHtmlPolyfillSupport;Z?.(V,M),(t$1.litHtmlVersions??=[]).push("3.0.1");const j=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=j(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return w}}s._$litElement$=!0,s[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$1=globalThis.litElementPolyfillSupport;r$1?.({LitElement:s});(globalThis.litElementVersions??=[]).push("4.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:!0,type:String,converter:u$3,reflect:!1,hasChanged:f$3},r=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

const style$8 = i$2 `
  .made-by-steven {
    display: grid;
    grid-template-areas: "made-a-header"
      "main"
      "footer";
    grid-template-rows: 80px auto 80px;
    overflow-x: hidden;
    background-color: var(--main-background-color);
  }
`;

let MadeBySteven = class MadeBySteven extends s {
    render() {
        return x `
      <main class="made-by-steven" part="base">
        <slot></slot>
      </main>
    `;
    }
};
MadeBySteven.styles = style$8;
MadeBySteven = __decorate([
    t('made-by-steven')
], MadeBySteven);

const style$7 = i$2 `
  :host {
    display: grid;
    grid-area: made-a-header;
    padding-top: 10px;
    padding-right: 20px;
    padding-left: 20px;
  }

  .made-a-header {
    display: grid;
    grid-template-areas: "made-a-logo"
      "made-my-name"
      "made-a-menu";
    grid-template-columns: 0 1fr auto;
  }
`;

let MadeAHeader = class MadeAHeader extends s {
    render() {
        return x `
      <header class="made-a-header" part="base">
        <slot></slot>
      </header>
    `;
    }
};
MadeAHeader.styles = style$7;
MadeAHeader = __decorate([
    t('made-a-header')
], MadeAHeader);

const style$6 = i$2 `
  .made-a-menu ::slotted(made-a-menu-item:not(:first-child)) {
    padding-left: 10px;
  }
`;

let MadeAMenu = class MadeAMenu extends s {
    render() {
        return x `
      <nav class="made-a-menu" part="base">
        <slot></slot>
      </nav>
    `;
    }
};
MadeAMenu.styles = style$6;
MadeAMenu = __decorate([
    t('made-a-menu')
], MadeAMenu);

const rem = (px, base = 16) => {
    return i$2 `${(1 / base * px)}rem`;
};

const style$5 = i$2 `
  .made-a-github-overview {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 40px;
    padding-right: 20px;
    padding-left: 20px;
  }
  
  header a {
    font-size: ${rem(24)};
    color: var(--url-text-color);
    text-decoration: none;
    transition: color .2s ease-in-out;
  }
  
  header a:hover {
    color: var(--url-hover-text-color);
  }
  
  @media (min-width: 480px) {
    .made-a-github-overview {
      grid-template-columns: repeat(2, 1fr);
    }
      
    header {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
  
  @media (min-width: 768px) {
    .made-a-github-overview {
      grid-template-columns: repeat(4, 1fr);
    }
    
    header {
      grid-column-start: 1;
      grid-column-end: 5;
    }
  }
`;

const github_url = 'https://github.com/stevendejongnl';
const github_api = 'https://api.github.com/users/stevendejongnl';
let MadeAGithubOverview = class MadeAGithubOverview extends s {
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
        return x `
      <section class="made-a-github-overview">
        <header>
          <a href="${github_url}" target="_blank">
            GitHub Projects
          </a>
        </header>
        ${this.repositories.map((repository) => x `<made-a-github-repository part="base" .repository="${repository}"></made-a-github-repository>`)}
      </section>
    `;
    }
};
MadeAGithubOverview.styles = style$5;
MadeAGithubOverview = __decorate([
    t('made-a-github-overview')
], MadeAGithubOverview);

const style$4 = i$2 `
  .made-a-github-repository {
    border: 1px solid var(--main-border-color);
    border-radius: 5px;
    padding: 10px;
    height: calc(100% - 20px);
  }
  
  .title {
    color: var(--main-text-color);
    text-decoration: none;
    transition: color .2s ease-in-out;
  }
  
  .title:hover {
    color: var(--url-hover-text-color);
  }
  
  .description {
    color: var(--secondary-text-color)
  }
  
  .languages {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 5px;
  }
  
      
  .languages li {
    display: inline-block;
    color: var(--tertiary-text-color);
    background-color: var(--tag-background-color);
    font-size: ${rem(10)};
    border-radius: 16px;
    padding: 4px 8px;
  }
  
  .stars {
    color: var(--secondary-text-color)
  }
`;

let MadeAGithubRepository = class MadeAGithubRepository extends s {
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
        return x `
      <article class="made-a-github-repository" part="base">
        <a class="title" target="_blank" href="${this.repository?.html_url}">
          ${this.repository?.name}
        </a>
        <div class="description">
          <p>${this.repository?.description}</p>
        </div>
        <footer>
          <ul class="languages">
            ${Object.entries(this.languages).map(([language]) => x `
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
MadeAGithubRepository.styles = style$4;
__decorate([
    n({ type: Object })
], MadeAGithubRepository.prototype, "repository", void 0);
MadeAGithubRepository = __decorate([
    t('made-a-github-repository')
], MadeAGithubRepository);

const style$3 = i$2 ``;

let MadeAContactForm = class MadeAContactForm extends s {
    render() {
        return x `
      <section class="made-a-contact-form" part="base">
        <slot></slot>
      </section>
    `;
    }
};
MadeAContactForm.styles = style$3;
MadeAContactForm = __decorate([
    t('made-a-contact-form')
], MadeAContactForm);

// import {style} from './made-a-logo.style.js'
let MadeALogo = class MadeALogo extends s {
    // static override styles = style
    render() {
        return x `
      <img class="made-a-logo" src="" />
    `;
    }
};
MadeALogo = __decorate([
    t('made-a-logo')
], MadeALogo);

const style$2 = i$2 `
  a {
    color: var(--url-text-color);
    text-decoration: none;
    transition: color .2s ease-in-out;
  }
  
  a:hover {
    color: var(--url-hover-text-color);
  }
`;

let MadeAMenuItem = class MadeAMenuItem extends s {
    constructor() {
        super(...arguments);
        this.url = '';
    }
    render() {
        return x `
      <a href=${this.url} part="base">
          <slot></slot>
      </a>
    `;
    }
};
MadeAMenuItem.styles = style$2;
__decorate([
    n({ type: String })
], MadeAMenuItem.prototype, "url", void 0);
MadeAMenuItem = __decorate([
    t('made-a-menu-item')
], MadeAMenuItem);

const style$1 = i$2 `
  :host {
    display: grid;
    grid-template-areas: "name"
      "made-my-slogan";
    grid-template-rows: repeat(2, auto);
  }
  
  .made-my-name {
    grid-area: name;
    font-family: "DM Sans", sans-serif;
    font-size: ${rem(36)};
    color: var(--main-text-color);
  }

  .made-my-slogan {
    grid-area: made-my-slogan;
  }
`;

let MadeMyName = class MadeMyName extends s {
    render() {
        return x `
      <div class="made-my-name" part="base">
        <slot></slot>
      </div>
      
      <div class="made-my-slogan" part="made-my-slogan">
        <slot name="made-my-slogan"></slot>
      </div>
    `;
    }
};
MadeMyName.styles = style$1;
MadeMyName = __decorate([
    t('made-my-name')
], MadeMyName);

const style = i$2 `
  .made-my-slogan {
    font-size: ${rem(16)};
    color: var(--secondary-text-color);
  }
`;

let MadeMySlogan = class MadeMySlogan extends s {
    render() {
        return x `
      <div class="made-my-slogan" part="base">
        <slot></slot>
      </div>
    `;
    }
};
MadeMySlogan.styles = style;
MadeMySlogan = __decorate([
    t('made-my-slogan')
], MadeMySlogan);

export { MadeAContactForm, MadeAGithubOverview, MadeAGithubRepository, MadeAHeader, MadeALogo, MadeAMenu, MadeAMenuItem, MadeBySteven, MadeMyName, MadeMySlogan };
