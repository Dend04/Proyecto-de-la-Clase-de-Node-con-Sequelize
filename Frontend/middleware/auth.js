// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = localStorage.getItem("accessToken");

  // Si no hay token, redirigir al login
  if (!accessToken && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Si hay token, verificar su validez (puedes hacer una solicitud al backend)
  // Si el token no es válido, redirigir al login
});