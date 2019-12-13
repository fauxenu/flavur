import React from 'react';
import { css } from 'linaria';

const spinnerCss = css`
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto;
  animation: spin 2s linear infinite;

  .primary {
    fill: var(--brand-grey-lighter);
  }

  .secondary {
    fill: var(--brand-primary);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-360deg);
    }
  }
`;

const Spinner = function() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={spinnerCss}>
      <circle cx="12" cy="12" r="10" className="primary"></circle>
      <path className="secondary" d="M8.52 7.11a5.98 5.98 0 0 1 8.98 2.5 1 1 0 1 1-1.83.8 4 4 0 0 0-5.7-1.86l.74.74A1 1 0 0 1 10 11H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1.7-.7l.82.81zm5.51 8.34l-.74-.74A1 1 0 0 1 14 13h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1.7.7l-.82-.81A5.98 5.98 0 0 1 6.5 14.4a1 1 0 1 1 1.83-.8 4 4 0 0 0 5.7 1.85z"></path>
    </svg>
  )
};

export default Spinner;
