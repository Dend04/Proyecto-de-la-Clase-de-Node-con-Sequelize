<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Gestionar Preguntas del Test</h1>
      <form @submit.prevent="submitPregunta" class="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="texto">
            Pregunta
          </label>
          <input
            v-model="texto"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="texto"
            type="text"
            placeholder="Escribe la pregunta"
          />
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
      <div v-if="mensaje" :class="mensajeClase" class="mt-4 p-4 rounded-lg shadow-lg flex items-center">
        <CheckCircleIcon v-if="mensajeClase === 'bg-green-100 text-green-700'" class="h-6 w-6 mr-2" />
        <ExclamationCircleIcon v-if="mensajeClase === 'bg-red-100 text-red-700'" class="h-6 w-6 mr-2" />
        <span>{{ mensaje }}</span>
      </div>
      <div class="mt-8 w-full max-w-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Preguntas del Test</h2>
        <ul>
          <li v-for="pregunta in preguntas" :key="pregunta.id" class="mb-2">
            {{ pregunta.texto }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/outline';
  
  const route = useRoute();
  const testId = route.params.id;
  
  const texto = ref('');
  const preguntas = ref([]);
  const mensaje = ref('');
  const mensajeClase = ref('');
  
  const fetchPreguntas = async () => {
    try {
      preguntas.value = await $fetch(`/api/preguntas/test/id/${testId}`);
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
    }
  };
  
  const submitPregunta = async () => {
    if (!texto.value) {
      mensaje.value = 'Por favor, complete el campo de la pregunta.';
      mensajeClase.value = 'bg-red-100 text-red-700';
      return;
    }
  
    try {
      const response = await $fetch('/api/crearPregunta', {
        method: 'POST',
        body: {
          texto: texto.value,
          testId: testId
        }
      });
      mensaje.value = 'Pregunta agregada con éxito.';
      mensajeClase.value = 'bg-green-100 text-green-700';
      preguntas.value.push(response);
      texto.value = '';
    } catch (error) {
      mensaje.value = 'Algo salió mal al agregar la pregunta.';
      mensajeClase.value = 'bg-red-100 text-red-700';
      console.error('Error al agregar la pregunta:', error);
    }
  };
  
  onMounted(() => {
    fetchPreguntas();
  });
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>