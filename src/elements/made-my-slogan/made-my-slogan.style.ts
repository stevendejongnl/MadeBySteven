import {css} from 'lit'
import {rem} from '../../helpers/functions.js'

export const style = css`
  slot[part="base"] {
    font-size: ${rem(16)};
    color: #D8DEE9;
  }
`
