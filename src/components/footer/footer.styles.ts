import { css } from "lit"

const footerStyles = css`
  footer {
    display: grid;
    place-items: center;
  }

  footer > h1 {
    place-self: center;
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 32px;
  }
`

export const styles = [footerStyles]
