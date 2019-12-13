import config from '@/config/calendar.json';
import storageService from './storageService';

const STORAGE_KEY = 'calendar';

const isStale = ({ items = [] }) => {
  const endsAt = items.length ? Date.parse(items[items.length - 1].start.dateTime) : 0;
  return Date.now() > endsAt;
}

export default {
  async getCalendar() {
    const localCalendar = storageService.getItem(STORAGE_KEY);

    if (!localCalendar || isStale(localCalendar)) {
      const data = await this.fetchRemoteCalendar();
      storageService.setItem(STORAGE_KEY, data);
      return data;
    }
    return localCalendar;
  },

  async fetchRemoteCalendar() {
    const { apiKey, host, calendarId } = config;
    const start = new Date();
    const end = new Date();
    start.setDate(0);
    end.setMonth(end.getMonth() + 1);

    const params = new URLSearchParams({
      key: apiKey,
      singleEvents: true,
      orderBy: 'startTime',
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    const response = await fetch(`${host}/${calendarId}/events?${params.toString()}`);
    const data = await response.json();
    return data;
  },
};
