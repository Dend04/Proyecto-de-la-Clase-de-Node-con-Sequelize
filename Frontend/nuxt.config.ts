export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@sidebase/nuxt-auth"
  ],
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000' // Reemplaza con la URL de tu API
    }
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      token: {
        signInResponseTokenPointer: 'token',
        // required: true,
        // type: 'Bearer'
      },
      endpoints: {
        signIn: { path: '/api/iniciarSesion', method: 'post' },
        signOut: { path: '/api/auth/logout', method: 'post' },
        getSession: { path: '/api/auth/user', method: 'get' }
      }
    }
  }
});