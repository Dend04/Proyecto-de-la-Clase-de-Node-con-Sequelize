<template>
  <div class="container mx-auto p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6 text-red-600">Iniciar Sesión</h1>
    <form @submit.prevent="login" class="w-full max-w-sm">
      <!-- Campo para el Nombre de Usuario -->
      <label class="block mb-2 text-white">Nombre de Usuario</label>
      <input
        v-model="nombre_usuario"
        type="text"
        required
        class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400"
        placeholder="Ingresa tu usuario"
      />
      <!-- Campo para la Contraseña -->
      <label class="block mb-2 text-white">Contraseña</label>
      <input
        v-model="password"
        type="password"
        required
        class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400"
        placeholder="Ingresa tu contraseña"
      />
      <!-- Botón de Inicio de Sesión -->
      <button
        type="submit"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
      >
        Iniciar Sesión
      </button>
    </form>
    <!-- Mostrar Errores -->
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
/* import { ref } from "vue";
import { definePageMeta } from "#imports";
import { useRuntimeConfig } from "#app";
import { useRouter } from "vue-router"; // Importa el router

const { signIn, token } = useAuth();
const nombre_usuario = ref("");
const password = ref("");
const error = ref("");
const config = useRuntimeConfig();
const router = useRouter(); // Inicializa el router

const login = async () => {
  try {
    console.log("Iniciando proceso de inicio de sesión...");
    console.log("Datos enviados al servidor:", {
      nombreUsuario: nombre_usuario.value,
      password: password.value,
    });

    // Llama a la función signIn
    const response = await signIn(
      { nombreUsuario: nombre_usuario.value, password: password.value },
      { callbackUrl: "/", redirect: true }
    );

    console.log("Respuesta de signIn:", response);

    // Obtén el estado de autenticación
    const { status, data } = useAuth();

    console.log("Estado de autenticación:", status.value);
    console.log("Datos de autenticación:", data.value);

    // Verifica si el inicio de sesión fue exitoso
    if (status.value === "authenticated" && data.value) {
      const { accessToken, refreshToken } = data.value;

      console.log("Tokens recibidos:", { accessToken, refreshToken });

      // Almacena los tokens en localStorage (opcional)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Tokens almacenados en localStorage");

      // Redirige al usuario
      router.push("/");
    } else {
      console.error("No se obtuvieron los tokens. Verifica la lógica del servidor.");
      error.value = "No se obtuvieron los tokens. Verifica la lógica del servidor.";
    }
  } catch (err) {
    console.error("Error durante el inicio de sesión:", err);
    error.value = err.message || "Ocurrió un error inesperado. Por favor, intenta nuevamente.";
  }
}; */
</script>
