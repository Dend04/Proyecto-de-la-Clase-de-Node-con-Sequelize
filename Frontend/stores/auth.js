// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    user: null,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setUser(user) {
      this.user = user;
    },
  },
});