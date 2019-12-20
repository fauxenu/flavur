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
  const today = new Date();
  const nextFavorite = calendar.items.find(({ start, summary }) => {
    if (favorites.includes(summary)) {
      const date = dateUtils.getCalendarDate(start);
      return date > today;
    }
    return false;
  });
  const daysAway = nextFavorite
    ? dateUtils.diff(dateUtils.getCalendarDate(nextFavorite.start), today)
    : 0;

  return (
    <p className={trackerCss}>
      { nextFavorite && daysAway === 1 &&
        <span>
          <strong>Tomorrow</strong> is&nbsp;
          <span className="secondary">{nextFavorite.summary}</span> day!
        </span>
      }
      { nextFavorite && daysAway > 1 &&
        <span>
          Only <strong>{daysAway}</strong> days until it&apos;s&nbsp;
          <span className="secondary">{nextFavorite.summary}</span> time!
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
