import { Store, set, get, keys, clear, del } from 'idb-keyval';

const store = new Store('flavur-db', 'flavur-store');

export default {
  async setItem(key, value) {
    return set(key, value, store);
  },

  async getItem(key, defaultValue) {
    const item = await get(key, store);
    return item === undefined && defaultValue ? defaultValue : item;
  },

  async removeItem(key) {
    return del(key, store);
  },

  async keys() {
    return keys(store);
  },

  async clear() {
    return clear(store);
  },
};
