const DAY_IN_MS = 1000 * 60 * 60 * 24;

export default {
  getCalendarDate({ dateTime, date }) {
    return new Date(dateTime || date);
  },

  isWeekend(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  },

  isToday(date) {
    const today = new Date();
    return today.getDate() === date.getDate()
      && today.getMonth() === date.getMonth()
      && today.getFullYear() === date.getFullYear();
  },

  format({ date = new Date(), options = {} } = {}) {
    return new Intl.DateTimeFormat('en-US', options).format(date)
  },

  diff(dateA, dateB) {
    return Math.ceil((dateA - dateB) / DAY_IN_MS);
  }
}
