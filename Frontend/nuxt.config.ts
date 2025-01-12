// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  axios: {
    baseURL: 'http://localhost:3000' // Reemplaza con la URL de tu API
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'usuario',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/iniciarSesion', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'usuario' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/'
    }
  }
});