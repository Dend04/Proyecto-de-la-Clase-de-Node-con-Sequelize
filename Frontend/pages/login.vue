<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#aab2b5] to-[#eaebef]">
    <div class="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-md w-full relative z-10">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div class="relative">
          <label for="username" class="block text-sm font-medium text-gray-700">Usuario:</label>
          <div class="mt-1 flex items-center">
            <UserIcon class="h-5 w-5 text-gray-400 absolute left-3" />
            <input
              type="text"
              v-model="username"
              id="username"
              placeholder="Nombre de usuario o correo"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
          <div class="mt-1 flex items-center">
            <LockClosedIcon class="h-5 w-5 text-gray-400 absolute left-3" />
            <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Contraseña"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Iniciar Sesión
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        ¿No tiene cuenta? <a href="/crearUsuario" class="text-indigo-600 hover:text-indigo-500">Toque aquí para crear una</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UserIcon, LockClosedIcon } from '@heroicons/vue/solid';

const router = useRouter();
const username = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await $fetch('http://localhost:3000/api/iniciarSesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identificador: username.value, password: password.value })
    });

   
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al iniciar sesión');
    }

    const data = await response.json();
    console.log("Inicio de sesión exitoso", data);
    router.push('/'); // Redirige al usuario después de un inicio de sesión exitoso
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error al iniciar sesión: " + error.message); // Muestra un mensaje de error al usuario
  }
};
</script>