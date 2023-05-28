import {css} from 'lit'

export const style = css`
  .made-by-steven {
    display: grid;
    grid-template-areas: "made-a-header"
      "main"
      "footer";
    grid-template-rows: 80px auto 80px;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: var(--main-background-color);
  }
`
