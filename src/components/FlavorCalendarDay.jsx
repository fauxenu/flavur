import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import classnames from 'classnames';
import dateUtils from '@/lib/dateUtils';

const dayCss = css`
  position: relative;
  padding: 10px var(--container-padding);
  border-bottom: 1px solid var(--brand-grey-lighter);

  @media screen and (min-width: 768px) {
    min-height: 100px;
    padding: 5px;
    border-right: 1px solid var(--brand-grey-lighter);
  }

  &.weekend {
    background-color: var(--brand-grey-lightest);
  }

  .date {
    font-size: 10rem;
    display: block;
    margin-bottom: 10px;
    color: var(--text-muted);
    font-weight: bold;

    @media screen and (min-width: 768px) {
      font-size: 9rem;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-bottom: 0;

      &__label {
        display: none;
      }
    }
  }

  &.today {
    @media screen and (max-width: 767px) {
      background-color: var(--brand-secondary-lightest);
    }

    @media screen and (min-width: 768px) {
      .date {
        border-radius: 50%;
        background-color: var(--brand-primary);
        color: #fff;
      }
    }
  }

  .flavor {
    font-size: 12rem;
    margin: 0;
    hyphens: auto;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (min-width: 768px) {
      font-size: 10rem;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }

    &.favorite {
      color: var(--brand-secondary);
    }
  }
`;

function FlavorCalendarDay({ day, favorites }) {
  const { start, summary } = day;
  const date = dateUtils.getCalendarDate(start);
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  const className = classnames({
    [dayCss]: true,
    weekend: dateUtils.isWeekend(date),
    today: dateUtils.isToday(date),
  });

  return (
    <li className={className}>
      <span className="date">
        <span className="date__label">{ dayName }&nbsp;</span>
        <span className="date__day">{ date.getDate() }</span>
      </span>
      <p className={classnames({ flavor: true, favorite: favorites.includes(summary) })}>
        { summary }
      </p>
    </li>
  );
}

FlavorCalendarDay.propTypes = {
  day: PropTypes.object,
  favorites: PropTypes.array
}

export default FlavorCalendarDay
