import storageService from './storageService';

const STORAGE_KEY = 'suggestions';

export default {
  async getAllSuggestions() {
    return storageService.getItem(STORAGE_KEY, []);
  },

  async importSuggestions({ items }) {
    const suggestions = await this.getAllSuggestions();
    items.forEach(({ summary }) => {
      if (!suggestions.includes(summary) && !summary.toLowerCase().includes('closed')) {
        suggestions.push(summary);
      }
    });

    suggestions.sort();
    return storageService.setItem(STORAGE_KEY, suggestions);
  },

  async findSuggestions(query) {
    const suggestions = await this.getAllSuggestions();
    return suggestions.filter((suggestion) => {
      return suggestion.toLowerCase().includes(query.trim().toLowerCase());
    });
  }
}
