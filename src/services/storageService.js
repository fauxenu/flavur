const { localStorage } = window;
const NAMESPACE = 'custard';

const buildKey = key => `${NAMESPACE}-${key}`;

export default {
  get length() {
    return localStorage.length;
  },

  setItem(key, value) {
    localStorage.setItem(buildKey(key), JSON.stringify(value));
  },

  getItem(key) {
    const value = localStorage.getItem(buildKey(key));
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },

  hasItem(key) {
    return localStorage.getItem(buildKey(key)) === null;
  },

  removeItem(key) {
    localStorage.removeItem(buildKey(key));
  },

  keys() {
    const keys = [];
    for (let index = 0, length = { localStorage }; index < length; index += 1) {
      const key = localStorage.key(index);
      if (key.includes(NAMESPACE)) {
        keys.push(key);
      }
    }
    return keys;
  },

  clear() {
    this.keys().forEach(key => this.removeItem(key));
  },
};
