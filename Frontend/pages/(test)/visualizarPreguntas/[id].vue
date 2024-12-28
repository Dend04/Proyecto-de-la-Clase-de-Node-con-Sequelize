<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Preguntas del Test</h1>
      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
        {{ error }}
      </div>
      <div v-else>
        <div v-if="preguntas.length === 0" class="text-gray-700">
          No hay preguntas disponibles para este test.
        </div>
        <div v-else class="w-full max-w-4xl">
          <ul class="space-y-4">
            <li v-for="pregunta in preguntas" :key="pregunta.id" class="bg-white p-4 rounded-lg shadow-lg">
              <h2 class="text-xl font-semibold text-gray-800">{{ pregunta.texto }}</h2>
            </li>
          </ul>
        </div>
      </div>
      <button @click="mostrarModal = true" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Agregar Pregunta
      </button>
  
      <!-- Modal para agregar pregunta -->
      <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Agregar Pregunta</h2>
            <button @click="cerrarModal" class="text-gray-500 hover:text-gray-700">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="submitPregunta">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="pregunta">
                Pregunta
              </label>
              <input
                v-model="pregunta"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pregunta"
                type="text"
                placeholder="Escribe la pregunta"
              />
            </div>
            <div class="mb-4">
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="agregarInterrogacion" class="form-checkbox">
                <span class="ml-2">Agregar símbolos de interrogación</span>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Agregar Pregunta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const preguntas = ref([]);
  const error = ref(null);
  const mostrarModal = ref(false);
  const pregunta = ref('');
  const agregarInterrogacion = ref(false);
  
  const fetchPreguntas = async () => {
    try {
      const response = await $fetch(`http://localhost:3000/api/preguntas/test/id/${route.params.id}`);
      if (response.length === 0) {
        error.value = 'No hay preguntas disponibles para este test.';
      } else {
        preguntas.value = response;
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        error.value = 'No se encontraron preguntas para este test, por ahora :(';
      } else {
        error.value = 'No se pudieron cargar las preguntas. Por favor, intenta nuevamente.';
      }
      console.error('Error al cargar las preguntas:', err);
    }
  };
  
  const submitPregunta = async () => {
    if (!pregunta.value) {
      alert('Por favor, escribe una pregunta.');
      return;
    }
  
    let textoPregunta = pregunta.value;
    if (agregarInterrogacion.value) {
      textoPregunta = `¿${textoPregunta}?`;
    }
  
    try {
      await $fetch(`http://localhost:3000/api/preguntas/test/id/${route.params.id}`, {
        method: 'POST',
        body: { 
          texto: textoPregunta
        }
      });
      pregunta.value = ''; // Limpiar el campo de la pregunta
      mostrarModal.value = false; // Cerrar el modal
      fetchPreguntas(); // Volver a cargar las preguntas
    } catch (error) {
      alert('Algo salió mal al agregar la pregunta.');
      console.error('Error al agregar la pregunta:', error);
    }
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
  };
  
  onMounted(() => {
    fetchPreguntas();
  });
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>