import {css} from 'lit'

export const style = css`
  .made-by-steven {
    display: grid;
    grid-template-areas: "made-a-header"
      "main"
      "footer";
    grid-template-rows: 60px auto 80px;
    width: 100vw;
    height: 100vh;
    background-color: #2E3440;
  }
`
