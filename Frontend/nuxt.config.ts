export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", /* "@sidebase/nuxt-auth" */],
  css: ["@/assets/css/tailwind.css"],
  
  app: {
    head: {
      title: "Pagina de Realización de Test", // Título global
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Esta pagina tiene como objetivo, brindarle a los usuarios, test de todo tipo que pueden realizar", // Meta descripción global
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL || "http://localhost:10000/api", // Variable de entorno para el backend
      NUXT_SUPABASE_URL: process.env.NUXT_SUPABASE_URL,
      NUXT_SUPABASE_KEY: process.env.NUXT_SUPABASE_KEY,
      host: '0.0.0.0',
      port: process.env.PORT
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

  compatibilityDate: '2025-01-24'
});