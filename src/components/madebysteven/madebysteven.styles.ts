import { css } from 'lit'

const mainStyles = css`
  main {
    display: grid;
    grid-template-areas: 'header' 'content' 'footer';
    grid-template-rows: 50px 1fr 87px;
    height: 100vh;
    width: 100vw;
    transition: all 0.5s;

    @starting-style {
      height: 100vh;
      height: calc-size(0px);
      width: 100vw;
      width: calc-size(min-content, size + 50px);
      overflow: hidden;
    }
  }

  main > mbs-header {
    grid-area: header;
  }

  main > mbs-content {
    grid-area: content;
  }

  main > mbs-footer {
    grid-area: footer;
  }
`

export const styles = [mainStyles]
