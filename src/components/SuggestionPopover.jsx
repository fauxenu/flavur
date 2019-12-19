import React, { useState, useLayoutEffect } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from 'linaria';
import suggestionsService from '@/services/suggestionsService';

const TIMEOUT = 300;
const popoverCss = css`
  background-color: #fff;
  border: 1px solid var(--brand-grey-light);
  border-radius: 4px;
  margin-top: 5px;
  position: absolute;
  left: 0;
  right: 0;
  padding: 4px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(-10px);
  transition: all ${TIMEOUT}ms ease-in-out;

  &.enter,
  &.entered {
    opacity: 1;
    transform: translateY(0);
  }

  &.exit,
  &.exited {
    opacity: 0;
    transform: translateY(-10px);
  }

  .suggestion {
    padding: 8px;
    display: block;
    width: 100%;
    text-align: left;
    font-size: 14rem;
    color: var(--text-muted);
    transition: all 0.2s;

    &:hover {
      background-color: var(--brand-primary-lightest);
    }
  }
`;

function SuggestionPopover({ show, query, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  useLayoutEffect(() => {
    if (query.trim().length > 2) {
      setSuggestions(suggestionsService.findSuggestions(query.trim()));
    }
  }, [query, show]);

  return (
    <Transition mountOnEnter unmountOnExit in={show && !!suggestions.length} timeout={TIMEOUT}>
      {state => (
        <ul className={classnames({ [popoverCss]: true, [state]: true })}>
          {
            suggestions.map(suggestion => (
              <li key={suggestion}>
                <button type="button" className="suggestion" onClick={() => onSelect(suggestion)}>
                  { suggestion }
                </button>
              </li>
            ))
          }
        </ul>
      )}
    </Transition>
  )
}

SuggestionPopover.propTypes = {
  query: PropTypes.string,
  show: PropTypes.bool,
  onSelect: PropTypes.func
};

export default SuggestionPopover;
