import React from 'react'
import PropTypes from 'prop-types';
import FlavorCalendar from '@/components/FlavorCalendar';

function CalendarPage({ calendar, favorites }) {
  return (
    <section className="calendar-page">
      <div className="calendar-container">
        <FlavorCalendar calendar={calendar} favorites={favorites} />
      </div>
    </section>
  )
}

CalendarPage.propTypes = {
  calendar: PropTypes.object,
  favorites: PropTypes.array
};

export default CalendarPage;
