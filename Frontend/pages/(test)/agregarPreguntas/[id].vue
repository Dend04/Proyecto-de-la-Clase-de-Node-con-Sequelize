<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Agregar Preguntas al Test</h1>
    <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
      {{ error }}
    </div>
    <div v-else>
      <form @submit.prevent="submitPregunta" class="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
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
      <div class="mt-4 flex space-x-4">
        <button
          @click="agregarOtraPregunta"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Otra Pregunta
        </button>
        <NuxtLink to="/test" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Volver a Tests
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/outline';

const route = useRoute();
const pregunta = ref('');
const mensaje = ref('');
const mensajeClase = ref('');
const error = ref(null);

const submitPregunta = async () => {
  if (!pregunta.value) {
    mensaje.value = 'Por favor, escribe una pregunta.';
    mensajeClase.value = 'bg-red-100 text-red-700';
    return;
  }

  try {
    await $fetch(`http://localhost:3000/api/preguntas/test/id/${route.params.id}`, {
      method: 'POST',
      body: { 
        texto: pregunta.value
      }
    });
    mensaje.value = 'Pregunta agregada con éxito.';
    mensajeClase.value = 'bg-green-100 text-green-700';
    pregunta.value = ''; // Limpiar el campo de la pregunta
  } catch (error) {
    mensaje.value = 'Algo salió mal al agregar la pregunta.';
    mensajeClase.value = 'bg-red-100 text-red-700';
    console.error('Error al agregar la pregunta:', error);
  }
};

const agregarOtraPregunta = () => {
  pregunta.value = '';
  mensaje.value = '';
  mensajeClase.value = '';
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>