// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('authToken');
  
  // Si no hay token y la ruta no es '/login', redirige a '/login'
  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }
  
  // Si hay token y el usuario intenta acceder a '/login', redirige a la página de inicio
  if (token && to.path === '/login') {
    return navigateTo('/');
  }
});