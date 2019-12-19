import storageService from './storageService';

const STORAGE_KEY = 'suggestions';

export default {
  getAllSuggestions() {
    return storageService.getItem(STORAGE_KEY) || [];
  },

  importSuggestions({ items }) {
    const suggestions = this.getAllSuggestions();
    items.forEach(({ summary }) => {
      if (!suggestions.includes(summary) && !summary.toLowerCase().includes('closed')) {
        suggestions.push(summary);
      }
    });

    suggestions.sort();
    storageService.setItem(STORAGE_KEY, suggestions);
  },

  findSuggestions(query) {
    return this.getAllSuggestions().filter((suggestion) => {
      return suggestion.toLowerCase().includes(query.trim().toLowerCase());
    });
  }
}
