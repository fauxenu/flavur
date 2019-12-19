import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { css } from 'linaria';

const TIMEOUT = 500;

const transitionCss = css`
  :global() {
    .page {
      position: absolute;
      left: var(--container-padding);
      right: var(--container-padding);
    }

    .page-enter {
      opacity: 0;
      transform: translateY(-10px);
    }

    .page-enter-active {
      opacity: 1;
      transform: translateY(0px);
      transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
    }

    .page-exit {
      opacity: 1;
      transform: translateY(0px);
    }

    .page-exit-active {
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
    }
  }
`;

function PageTransition({ isVisible, children }) {
  return (
    <div className={transitionCss}>
      <CSSTransition
        classNames="page"
        in={isVisible}
        timeout={TIMEOUT}
        unmountOnExit
      >
        <div className="page">
          {children}
        </div>
      </CSSTransition>
    </div>
  );
}

PageTransition.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node
};

export default PageTransition;
