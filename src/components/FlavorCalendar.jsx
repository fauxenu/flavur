import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import dateUtils from '@/lib/dateUtils';
import FlavorCalendarHeader from './FlavorCalendarHeader';
import FlavorCalendarDay from './FlavorCalendarDay';

const calendarCss = css`
  margin: 0 calc(var(--container-padding) * -1);

  @media screen and (min-width: 768px) {
    margin: 0;
  }

  .days {
    &__spacer {
      display: none;
    }

    @media screen and (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid var(--brand-grey-lighter);

      > * {
        width: calc(100% / 7);
      }

      &__spacer {
        border-bottom: 1px solid var(--brand-grey-lighter);
        border-right: 1px solid var(--brand-grey-lighter);
        border-left: 1px solid #fff;
        display: block;
        margin-left: -1px;
      }
    }
  }
`;

function FlavorCalendar({ calendar, favorites }) {
  const currentMonth = new Date().toISOString().replace(/-\d{2}T.*$/, '');
  const days = calendar.items
    .filter(({ start }) => {
      const { dateTime, date } = start;
      return (dateTime || date).includes(currentMonth);
    });
  const firstDate = dateUtils.getCalendarDate(days[0].start);
  const spacerOffset = firstDate.day();

  return (
    <div className={calendarCss}>
      <FlavorCalendarHeader />
      <ul className="days">
        { !!spacerOffset &&
          <li
            className="days__spacer"
            style={{ width: `calc((100% / 7) * ${spacerOffset} + 1px)` }}
          />
        }
        { days.map(day => <FlavorCalendarDay key={day.id} day={day} favorites={favorites} />) }
      </ul>
    </div>
  )
}

FlavorCalendar.propTypes = {
  calendar: PropTypes.object,
  favorites: PropTypes.array
};

export default FlavorCalendar;
