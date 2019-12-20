import storageService from './storageService';

const STORAGE_KEY = 'favorites';

export default {
  async getFavorites() {
    return storageService.getItem(STORAGE_KEY, []);
  },

  async setFavorites(favorites = []) {
    return storageService.setItem(STORAGE_KEY, favorites);
  }
}
