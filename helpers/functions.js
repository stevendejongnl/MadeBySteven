import { css } from 'lit';
export const rem = (px, base = 16) => {
    return css `${(1 / base * px)}rem`;
};
//# sourceMappingURL=functions.js.map