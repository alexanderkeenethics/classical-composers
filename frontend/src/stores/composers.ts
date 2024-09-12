import {defineStore} from 'pinia'

export const useComposerStore = defineStore('composer', {
  state: () => ({
    composers: [] as Array<{ id: number; name: string; img: string; dateOfBirth: string }>,  // Example structure
    isLoading: false,
    error: null as string | null,
    addresses: new Map<number, string>(),
  }),

  // Actions to fetch data from the backend
  actions: {
    async fetchComposers() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:8080/composers-list');  // Replace with your actual API
        if (!response.ok) {
          throw new Error('Failed to fetch composers');
        }
        this.composers = await response.json();  // Assuming the API returns an array of composers
      } catch (error: any) {
        this.error = error.message || 'An error occurred while fetching composers';
      } finally {
        this.isLoading = false;
      }
    }
  },
  getters: {
    composerAddress: state => async (id: number) => {
      if (!state.addresses.has(id)) {
        try {
          const response = await fetch(`http://localhost:8080/composer-contact-data/${id}`);  // Replace with your actual API
          if (!response.ok) {
            throw new Error('Failed to fetch composers');
          }
          const data = await response.json()
          state.addresses.set(id, data);
        } catch (error: any) {
          console.error(error);
          return {};
        }
      }

      return state.addresses.get(id);
    }
  }
});
