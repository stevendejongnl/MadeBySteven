import { css } from 'lit';
import { rem } from '../../helpers/functions.js';
export const style = css `
  .made-a-github-overview {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 40px;
    padding-right: 20px;
    padding-left: 20px;
  }
  
  header a {
    font-size: ${rem(24)};
    color: var(--url-text-color);
    text-decoration: none;
    transition: color .2s ease-in-out;
  }
  
  header a:hover {
    color: var(--url-hover-text-color);
  }
  
  @media (min-width: 480px) {
    .made-a-github-overview {
      grid-template-columns: repeat(2, 1fr);
    }
      
    header {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
  
  @media (min-width: 768px) {
    .made-a-github-overview {
      grid-template-columns: repeat(4, 1fr);
    }
    
    header {
      grid-column-start: 1;
      grid-column-end: 5;
    }
  }
`;
//# sourceMappingURL=made-a-github-overview.style.js.map