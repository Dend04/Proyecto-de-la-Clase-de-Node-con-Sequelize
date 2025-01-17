<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#aab2b5] to-[#eaebef]">
      <div v-if="!accountCreated" class="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-md w-full relative z-10">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h1>
        <form @submit.prevent="register" class="space-y-6">
          <div class="relative">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
            <div class="mt-1 flex items-center">
              <UserIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              <input
                type="text"
                v-model="nombre"
                id="nombre"
                placeholder="Nombre"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="relative">
            <label for="segundoNombre" class="block text-sm font-medium text-gray-700">Segundo Nombre:</label>
            <input
              type="text"
              v-model="segundoNombre"
              id="segundoNombre"
              placeholder="Segundo Nombre"
              class="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="relative">
            <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos:</label>
            <div class="mt-1 flex items-center">
              <UserIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              <input
                type="text"
                v-model="apellidos"
                id="apellidos"
                placeholder="Apellidos"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="relative">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
            <div class="mt-1 flex items-center">
              <MailIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              <input
                type="email"
                v-model="email"
                id="email"
                placeholder="Correo Electrónico"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="relative">
            <label for="nombreUsuario" class="block text-sm font-medium text-gray-700">Nombre de Usuario (Opcional):</label>
            <div class="mt-1 flex items-center">
              <UserIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              <input
                type="text"
                v-model="nombreUsuario"
                id="nombreUsuario"
                placeholder="Nombre de Usuario"
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
          <div class="relative">
            <label for="peso" class="block text-sm font-medium text-gray-700">Peso (kg):</label>
            <div class="mt-1 flex items-center">
              <ScaleIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              <input
                type="number"
                v-model="peso"
                id="peso"
                placeholder="Peso"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="relative">
            <label for="altura" class="block text-sm font-medium text-gray-700">Altura (cm):</label>
            <div class="mt-1 flex items-center">
              <input
                type="number"
                v-model="altura"
                id="altura"
                placeholder="Altura"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="relative">
            <label for="enfermedadCronica" class="block text-sm font-medium text-gray-700">Enfermedad Crónica:</label>
            <input
              type="text"
              v-model="enfermedadCronica"
              id="enfermedadCronica"
              placeholder="Enfermedad Crónica"
              class="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="relative">
            <label for="estadoFisicoActual" class="block text-sm font-medium text-gray-700">Estado Físico Actual:</label>
            <input
              type="text"
              v-model="estadoFisicoActual"
              id="estadoFisicoActual"
              placeholder="Estado Físico Actual"
              class="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
  
      <div v-else class="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-md w-full relative z-10 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Cuenta Creada Exitosamente</h2>
        <p class="text-gray-700 mb-6">Tu cuenta ha sido creada con éxito.</p>
        <p class="text-gray-700 mb-6">Nombre de Usuario: <strong>{{ nombreUsuario || 'Generado automáticamente' }}</strong></p>
        <p class="text-gray-700 mb-6">Correo Electrónico: <strong>{{ email }}</strong></p>
        <button
          @click="goToLogin"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Volver al Login
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router"; // Importa useRouter para la redirección
  import { definePageMeta, useAuth } from "#imports";
  import { UserIcon, MailIcon, LockClosedIcon, ScaleIcon } from '@heroicons/vue/solid';
  
  const { signUp } = useAuth();
  const router = useRouter(); // Inicializa el router
  const nombre = ref("");
  const segundoNombre = ref("");
  const apellidos = ref("");
  const email = ref("");
  const nombreUsuario = ref("");
  const password = ref("");
  const peso = ref("");
  const altura = ref("");
  const enfermedadCronica = ref("");
  const estadoFisicoActual = ref("");
  const accountCreated = ref(false);
  
  const register = async () => {
    try {
      await signUp({
        nombre: nombre.value,
        segundoNombre: segundoNombre.value,
        apellidos: apellidos.value,
        email: email.value,
        nombreUsuario: nombreUsuario.value || undefined,
        password: password.value,
        peso: parseFloat(peso.value),
        altura: parseFloat(altura.value),
        enfermedadCronica: enfermedadCronica.value,
        estadoFisicoActual: estadoFisicoActual.value,
      });
      accountCreated.value = true;
      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };
  
  const goToLogin = () => {
    router.push('/login'); // Redirige al usuario a la página de inicio de sesión
    console.log("Redirigiendo al login...");
  };
  
  definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: "/",
    },
  });
  </script> 