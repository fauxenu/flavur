import spacetime from 'spacetime';
import config from '@/config/calendar.json';

const TIMEZONE = config.defaultTimezone;

export default {
  getToday() {
    const today = spacetime.now();
    today.goto(TIMEZONE);
    return today;
  },

  getCalendarDate({ dateTime, date }) {
    const s = spacetime(dateTime || date);
    s.goto(TIMEZONE);
    return s;
  },

  isWeekend(date) {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  },

  isToday(date) {
    return this.getToday().isSame(date, 'day');
  }
}
