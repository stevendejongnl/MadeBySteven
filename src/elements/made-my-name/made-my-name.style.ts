import {css} from 'lit'
import {rem} from '../../helpers/functions.js'

export const style = css`
  :host {
    display: grid;
    grid-template-areas: "name"
      "made-my-slogan";
    grid-template-rows: repeat(2, auto);
  }
  slot[part="base"] {
    grid-area: name;
    font-family: "DM Sans", sans-serif;
    font-size: ${rem(36)};
    color: var(--main-text-color);
  }
  slot[part="made-my-slogan"] {
    grid-area: made-my-slogan;
  }
`
