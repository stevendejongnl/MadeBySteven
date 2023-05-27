import {css} from 'lit'

export const rem = (px: number, base = 16) => {
  return css`${(1 / base * px)}rem`
}
