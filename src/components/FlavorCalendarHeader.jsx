import React from 'react';
import { css } from 'linaria';
import spacetime from 'spacetime';

const headerCss = css`
  border-bottom: 1px solid var(--brand-grey-dark);

  .month-name {
    color: var(--brand-grey-darker);
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 14rem;

    @media screen and (min-width: 768px) {
      margin-bottom: 5px;
    }
  }

  .day-list {
    display: none;

    @media screen and (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1px;

      .week-day {
        text-align: center;
        font-size: 12rem;
        color: var(--brand-grey);
        font-weight: bold;
        padding: 8px 0;
        width: calc(100% / 7);

        &__name {
          display: none;
        }

        @media screen and (min-width: 768px) {
          &__name {
            display: inline;
          }

          &__abbr {
            display: none;
          }
        }
      }
    }
  }
`;

const DAYS = [
  { label: 'Sunday', abbr: 'S' },
  { label: 'Monday', abbr: 'M' },
  { label: 'Tuesday', abbr: 'T' },
  { label: 'Wednesday', abbr: 'W' },
  { label: 'Thursday', abbr: 'T' },
  { label: 'Friday', abbr: 'F' },
  { label: 'Saturday', abbr: 'S' }
];

function FlavorCalendarHeader() {
  const monthName = spacetime.now().format('month');

  return (
    <header className={headerCss}>
      <h3 className="month-name">{ monthName } Flavors</h3>
      <ul className="day-list">
        {
          DAYS.map(day =>
            <li key={day.label} className="week-day">
              <abbr className="week-day__abbr">{ day.abbr }</abbr>
              <span className="week-day__name">{ day.label }</span>
            </li>
          )
        }
      </ul>
    </header>
  )
}

export default FlavorCalendarHeader;
