import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';

const itemCss = css`
  display: flex;
  padding: 8px 0;
  border-top: 1px solid var(--brand-grey-lightest);
  justify-content: space-between;
  align-items: center;

  .remove {
    color: #fff;
    color: var(--brand-danger);
    font-size: 18rem;
    transition: color 0.25s;

    &:active,
    &:focus {
      outline: none;
    }

    &:hover,
    &:active,
    &:focus {
      color: var(--brand-danger-alt);
    }
  }
`;

function FavoritesListItem({ favorite, onRemove }) {
  function handleRemove() {
    onRemove(favorite);
  }

  return (
    <li className={itemCss}>
      <span className="label">{ favorite }</span>
      <button type="button" className="remove" onClick={handleRemove}>&times;</button>
    </li>
  );
}

FavoritesListItem.propTypes = {
  favorite: PropTypes.string,
  onRemove: PropTypes.func
};

export default FavoritesListItem;
