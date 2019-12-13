import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import FavoritesListItem from './FavoritesListItem';

const listCss = css`
  .title {
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: 12rem;
    font-weight: bold;
    margin-bottom: 6px;
  }
`;

function FavoritesList({ favorites, onRemove }) {
  const items = favorites.map(favorite => (
    <FavoritesListItem key={favorite} favorite={favorite} onRemove={onRemove} />
  ));

  return (
    <div className={listCss}>
      <h2 className="title">Current Favorites</h2>
      { favorites.length > 0 &&
        <ul className="list">
          {items}
        </ul>
      }
      { favorites.length === 0 &&
        <p className="muted">Add favorite flavors to get notified when they are available.</p>
      }
    </div>
  );
}

FavoritesList.propTypes = {
  favorites: PropTypes.array,
  onRemove: PropTypes.func
};

export default FavoritesList;

