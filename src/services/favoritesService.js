import storageService from './storageService';

const STORAGE_KEY = 'favorites';

export default {
  getFavorites() {
    const favorites = storageService.getItem(STORAGE_KEY);
    return favorites || [];
  },

  setFavorites(favorites = []) {
    storageService.setItem(STORAGE_KEY, favorites);
  }
}
