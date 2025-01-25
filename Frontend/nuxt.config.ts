export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", /* "@sidebase/nuxt-auth" */],

  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3000", // Variable de entorno para el backend
    },
  },

  /* auth: {
    baseURL: process.env.BACKEND_URL || 'http://localhost:3000/api',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/cerrarSesion', method: 'post' },
        getSession: { path: '/perfil', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/accessToken',
        maxAgeInSeconds: 3600, // 1 hora
        type: 'Bearer',
        headerName: 'Authorization',
      },
      refresh: {
        isEnabled: true,
        endpoint: {
          path: '/refrescarToken',
          method: 'post',
        },
        token: {
          signInResponseRefreshTokenPointer: '/refreshToken',
          refreshRequestTokenPointer: '/refreshToken',
          maxAgeInSeconds: 604800, // 7 días
          cookieName: 'refresh_token',
        },
      },
    },
  }, */
});