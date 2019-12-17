import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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

  .list {
    overflow: hidden;
  }

  .item-enter {
    opacity: 0;
    transform: translateY(-100%);
    z-index: -1;
  }

  .item-enter-active {
    opacity: 1;
    z-index: -1;
    transform: translateY(0);
  }

  .item-exit {
    opacity: 1;
    transform: translateX(0);
  }

  .item-exit-active {
    opacity: 0;
    transform: translateX(-100%);
  }

  .item-enter-active,
  .item-exit-active {
    transition: all 0.3s ease-in-out;
  }
`;

function FavoritesList({ favorites, onRemove }) {
  const items = favorites.map(favorite => (
    <CSSTransition key={favorite} timeout={300} classNames="item">
      <FavoritesListItem favorite={favorite} onRemove={onRemove} />
    </CSSTransition>
  ));

  return (
    <div className={listCss}>
      <h2 className="title">Current Favorites</h2>
      { favorites.length > 0 &&
        <TransitionGroup component="ul" className="list">
          {items}
        </TransitionGroup>
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
