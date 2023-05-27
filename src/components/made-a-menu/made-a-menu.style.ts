import {css} from 'lit'

export const style = css`
  .made-a-menu slot[part="base"]::slotted(made-a-menu-item:not(:first-child)) {
    padding-left: 10px;
  }
`
