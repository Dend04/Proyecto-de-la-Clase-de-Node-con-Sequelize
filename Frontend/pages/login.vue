<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="nombreUsuario" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            v-model="loginForm.nombreUsuario"
            type="text"
            id="nombreUsuario"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-6 relative">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          v-model="loginForm.password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
          required
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center"
        >
          <component 
            :is="showPassword ? EyeOffIcon : EyeIcon" 
            class="h-5 w-5 text-gray-500 hover:text-gray-700"
          />
        </button>
      </div>

        <div class="flex justify-between">
          <!-- Botón "Cancelar" -->
          <NuxtLink
            to="/login"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </NuxtLink>
          <!-- Botón "Iniciar Sesión" -->
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-800"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <!-- Enlace para crear sesión -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes una cuenta?
          <NuxtLink to="/crearUsuario" class="text-teal-700 hover:underline">
            Crear Sesión
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/outline"; // Importar iconos

const showPassword = ref(false);
const runtimeConfig = useRuntimeConfig();
// Estado para el formulario de login
const loginForm = ref({
  nombreUsuario: "",
  password: "",
});

// Función para manejar el login
const handleLogin = async () => {
  try {
    const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm.value),
    });

    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }

    const { accessToken, refreshToken, requiere2FA } = await response.json();
   
    // Guardar los tokens en localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Verificar si el usuario requiere 2FA
    if (requiere2FA) {
      console.log("Redirigiendo a /verificar-2fa");
      navigateTo("/verificar-2fa");
    } else {
      console.log("Redirigiendo a /");
      navigateTo("/", { reload: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
};
</script>