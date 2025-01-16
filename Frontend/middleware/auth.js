export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return navigateTo('/login');
    }
  });