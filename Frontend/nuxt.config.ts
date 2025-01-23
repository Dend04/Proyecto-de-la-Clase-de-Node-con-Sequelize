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
    baseURL: process.env.backend_url, // URL base de tu backend
    provider: {
      type: "local",
      endpoints: {
        // Rutas de autenticación del backend que me proporcionaste
        signIn: {
          path: "/api/iniciarSesion",
          method: "post"
        },
        signUp: {
          path: "/api/crearUsuario",
          method: "post"
        },
        signOut: {
          path: "/api/cerrarSesion",
          method: "post"
        },
        getSession: {
          path: "/api/perfil",
          method: "get"
        }
      },
      pages: {
        login: "/login" // Página de inicio de sesión en tu frontend
      },
      session: {
        dataType: {
          id: 'number',
          nombre_usuario: 'string',
          email: 'string',
          rol: "'administrador' | 'usuario'", // Enum basado en tu backend
          //twoFactorEnabled: "boolean", // Opcional según el diseño
        },
        dataResponsePointer: "/" // Ajustar si la estructura de respuesta lo requiere
      },
      token: {
        signInResponseTokenPointer: "/iniciarSesion", // Ruta al token en la respuesta del login
        maxAgeInSeconds: 3600, // Tiempo de vida del access token
        type: "Bearer", // Tipo de token en el encabezado
        headerName: "Authorization" // Nombre del encabezado para el token
      },
      refresh: {
        isEnabled: true, // Habilitar el refresco de token
        endpoint: {
          path: '/api/refrescarToken', // Ruta para renovar el access token
          method: 'post'
        },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refrescarToken', // Ruta al refresh token en la respuesta
          refreshRequestTokenPointer: '/refrescarToken', // Ruta al token enviado para renovar
          maxAgeInSeconds: 86400, // Tiempo de vida del refresh token (1 días)
          cookieName: 'refresh_token' // Nombre de la cookie para almacenar el refresh token (opcional)
        }
      }
    },
    globalAppMiddleware: {
      isEnabled: true, // Habilitar middleware global
      allow404WithoutAuth: true // Permitir 404 sin autenticación
    }
  },
});