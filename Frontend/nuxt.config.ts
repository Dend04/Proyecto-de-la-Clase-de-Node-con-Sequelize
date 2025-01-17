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
    baseURL: 'http://localhost:3000',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/iniciarSesion', method: 'post' },
        signOut: { path: '/api/cerrarSesion', method: 'post' },
        signUp: { path: '/api/crearUsuario', method: 'post' },
        getSession: { path: '/api/perfil', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: 'token',
      },
      /* sessionDataType:{
        id: "integer",
        email: "string",
        nombreUsuario: "string",
        createdAt: "string",
        updateAt: "string"
      }, */
    },  
    globalAppMiddleware:{
      isEnabled: true
    },
    
  },
});