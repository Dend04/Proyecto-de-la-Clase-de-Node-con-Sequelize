<template>
  <div class="min-h-screen flex flex-col">
    <!-- Contenido principal centrado -->
    <div class="flex-grow flex flex-col items-center justify-start mt-4 relative">
      <div class="relative w-full max-w-4xl mx-auto px-6 py-12">
        <!-- Contenido principal -->
        <div class="relative z-20 text-center">
          <h1 class="text-4xl font-bold text-gray-800 mb-12 tracking-tight">
            Tests Disponibles
          </h1>

          <!-- Estado de error -->
          <div v-if="error" class="max-w-2xl mx-auto mb-8">
            <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border-l-4 border-red-500">
              <div class="flex flex-col items-center text-center">
                <div class="mb-4">
                  <svg
                    class="h-16 w-16 text-red-500 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  No se puede establecer conexión
                </h3>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <button
                  @click="retryConnection"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 active:scale-95"
                >
                  <svg
                    class="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reintentar conexión
                </button>
              </div>
            </div>
          </div>

          <!-- Botón de agregar test cuando no hay tests -->
          <div v-if="!error && tests.length === 0" class="flex justify-center items-center h-full">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div class="flex flex-col h-full space-y-4 items-center">
                <h2 class="text-xl font-semibold text-gray-800">
                  No hay tests disponibles
                </h2>
                <NuxtLink
                  to="/crearTest"
                  class="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-700"
                >
                  <PlusIcon class="h-5 w-5 mr-2" />
                  Agregar Test
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Grid de tests -->
          <div v-if="!error && tests.length > 0" class="relative">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div
                v-for="test in tests"
                :key="test.id"
                class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative"
              >
                <div class="absolute top-2 right-2 flex space-x-2">
                  <NuxtLink :to="`/editarTest/${test.id}`" class="text-blue-500 hover:text-blue-700">
                    <PencilIcon class="h-5 w-5" />
                  </NuxtLink>
                  <button @click="borrarTest(test.id)" class="text-red-500 hover:text-red-700">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                  <NuxtLink :to="`/visualizarPreguntas/${test.id}`" class="text-green-500 hover:text-green-700">
                    <EyeIcon class="h-5 w-5" />
                  </NuxtLink>
                </div>
                <div class="flex flex-col h-full space-y-4">
                  <h2 class="text-xl font-semibold text-gray-800">
                    {{ test.titulo }}
                  </h2>
                  <p v-if="test.descripcion" class="text-gray-600 flex-grow">
                    {{ test.descripcion }}
                  </p>
                  <p v-if="test.duracion" class="text-gray-500">
                    Duración: {{ test.duracion }} minutos
                  </p>
                  <p v-if="test.dificultad" class="text-gray-500">
                    Dificultad: {{ test.dificultad }}
                  </p>
                  <div class="flex items-center mt-2">
                    <span v-if="test.etiqueta === 'Salud'" class="text-green-500">
                      <HeartIcon class="h-5 w-5 inline-block mr-1" />
                    </span>
                    <span v-if="test.etiqueta === 'Conocimiento'" class="text-yellow-500">
                      <LightBulbIcon class="h-5 w-5 inline-block mr-1" />
                    </span>
                    <span v-if="test.etiqueta === 'Idioma'" class="text-blue-500">
                      <GlobeAltIcon class="h-5 w-5 inline-block mr-1" />
                    </span>
                    <p class="text-gray-500">{{ test.etiqueta }}</p>
                  </div>
                  <NuxtLink
                    :to="`/tests/${test.id}`"
                    class="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-700"
                  >
                    Comenzar Test
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/crearTest" class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline">
      <PlusIcon class="h-6 w-6" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, HeartIcon, LightBulbIcon, GlobeAltIcon } from '@heroicons/vue/outline';

const tests = ref([]);
const error = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const fetchTests = async () => {
  try {
    tests.value = await $fetch(`${apiBaseUrl}/tests`);
    error.value = null;
  } catch (err) {
    error.value = "No se puede conectar con el servidor. Por favor, verifica que el servidor esté en funcionamiento.";
    console.error("Error:", err);
  }
};

const retryConnection = () => {
  fetchTests();
};

const borrarTest = async (id) => {
  try {
    await $fetch(`${apiBaseUrl}/test/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Enviar el token
      },
    });
    fetchTests(); // Volver a cargar los tests después de borrar
  } catch (err) {
    console.error("Error al borrar el test:", err);
  }
};

onMounted(() => {
  fetchTests();
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>