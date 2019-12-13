import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { css } from 'linaria';
import dateUtils from '@/lib/dateUtils';
import NextFlavorTracker from '@/components/NextFavoriteTracker';

const homepageCss = css`
  text-align: center;
  padding-top: 100rem;

  .flavor {
    width: 100%;
    font-size: 24rem;
    font-weight: bold;
    margin: 10rem 0 40rem;
  }

  .btn {
    display: inline-block;
  }
`;

const getCurrentDate = ({ items }) => {
  return items.find(({ start }) => dateUtils.isToday(dateUtils.getCalendarDate(start)));
}

function HomePage({ calendar, favorites }) {
  const today = getCurrentDate(calendar);
  const isFavorite = favorites.includes(today.summary);

  return (
    <section className={homepageCss}>
      { isFavorite &&
        <div className="favorite-day">
          <h1 className="flavor muted">
            It&apos;s <span className="secondary">{today.summary}</span> day!
          </h1>
          <p className="muted">Get your taste buds ready!</p>
        </div>
      }
      { !isFavorite &&
        <div className="regular-day">
          <p className="muted">Today&apos;s flavor is</p>
          <h1 className="flavor primary">{today.summary}</h1>
          <NextFlavorTracker calendar={calendar} favorites={favorites} />
          <Link to="/favorites" className="btn">Add Favorites</Link>
        </div>
      }
    </section>
  )
}

HomePage.propTypes = {
  calendar: PropTypes.object,
  favorites: PropTypes.array
};

export default HomePage;
