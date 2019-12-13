import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import FavoritesForm from '@/components/FavoritesForm';
import FavoritesList from '@/components/FavoritesList';

const pageCss = css`
  max-width: 400px;
  margin: 0 auto;
`;

function FavoritesPage({ calendar, favorites, updateFavorites }) {
  function handleAdd(newFavorite) {
    if (!favorites.includes(newFavorite)) {
      updateFavorites([...favorites, newFavorite]);
    }
  }

  function handleRemove(oldFavorite) {
    updateFavorites(favorites.filter(item => item !== oldFavorite));
  }

  return (
    <section className={pageCss}>
      <FavoritesForm calendar={calendar} onAdd={handleAdd} />
      <FavoritesList favorites={favorites} onRemove={handleRemove} />
    </section>
  );
}

FavoritesPage.propTypes = {
  calendar: PropTypes.object,
  favorites: PropTypes.array,
  updateFavorites: PropTypes.func
};


export default FavoritesPage;
