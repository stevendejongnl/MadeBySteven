import { css } from 'lit';
export const style = css `
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
//# sourceMappingURL=made-a-header.style.js.map