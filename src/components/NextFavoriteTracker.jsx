import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria'
import dateUtils from '@/lib/dateUtils';

const trackerCss = css`
  margin-bottom: 20px;
  color: var(--text-muted);
  font-size: 14rem;
`;

function NextFavoriteTracker({ calendar, favorites }) {
  const today = dateUtils.getToday();
  const nextFavorite = calendar.items.find(({ start, summary }) => {
    if (favorites.includes(summary)) {
      const date = dateUtils.getCalendarDate(start);
      return date.isAfter(today);
    }
    return false;
  });
  const daysAway = nextFavorite
    ? today.diff(dateUtils.getCalendarDate(nextFavorite.start), 'day') + 1
    : 0;

  return (
    <p className={trackerCss}>
      { nextFavorite &&
        <span>
          Only <strong>{daysAway}</strong> {daysAway > 1 ? 'days' : 'day'} until
          it&apos;s <span className="secondary">{nextFavorite.summary}</span> time!
        </span>
      }
      {
        !nextFavorite && !!favorites.length &&
        <span>
          No more <span className="secondary">{favorites[0]}</span> until next month&hellip;
        </span>
      }
      {
        !favorites.length &&
        <span>Get notified when your favorite flavors are available!</span>
      }
    </p>
  );
}

NextFavoriteTracker.propTypes = {
  calendar: PropTypes.object,
  favorites: PropTypes.array
};

export default NextFavoriteTracker;
