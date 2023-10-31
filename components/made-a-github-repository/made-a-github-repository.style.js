import { css } from 'lit';
import { rem } from '../../helpers/functions.js';
export const style = css `
  .made-a-github-repository {
    border: 1px solid var(--main-border-color);
    border-radius: 5px;
    padding: 10px;
    height: calc(100% - 20px);
  }
  
  .title {
    color: var(--main-text-color);
    text-decoration: none;
    transition: color .2s ease-in-out;
  }
  
  .title:hover {
    color: var(--url-hover-text-color);
  }
  
  .description {
    color: var(--secondary-text-color)
  }
  
  .languages {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 5px;
  }
  
      
  .languages li {
    display: inline-block;
    color: var(--tertiary-text-color);
    background-color: var(--tag-background-color);
    font-size: ${rem(10)};
    border-radius: 16px;
    padding: 4px 8px;
  }
  
  .stars {
    color: var(--secondary-text-color)
  }
`;
//# sourceMappingURL=made-a-github-repository.style.js.map