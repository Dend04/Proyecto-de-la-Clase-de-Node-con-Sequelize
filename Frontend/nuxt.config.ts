export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", /* "@sidebase/nuxt-auth" */],
  css: ["@/assets/css/tailwind.css"],
  
  app: {
    head: {
      title: "TestMaster - Tests de Conocimiento, Idiomas y Salud",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Realiza tests de conocimiento, idiomas y salud en línea con TestMaster. Evalúa tus habilidades y mejora tu bienestar.",
        },
        { name: "keywords", content: "tests de conocimiento, tests de idiomas, tests de salud, evaluación de habilidades" },
        { name: "author", content: "Dairon Enamorado" },
        { property: "og:title", content: "TestMaster - Tests de Conocimiento, Idiomas y Salud" },
        { property: "og:description", content: "Realiza tests de conocimiento, idiomas y salud en línea con TestMaster. Evalúa tus habilidades y mejora tu bienestar." },
        { property: "og:image", content: "/logo.png" }, // Ruta de tu logo
        { property: "og:url", content: "https://pagina-de-realizacion-de-test-frontend.onrender.com" }, // URL de tu sitio
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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