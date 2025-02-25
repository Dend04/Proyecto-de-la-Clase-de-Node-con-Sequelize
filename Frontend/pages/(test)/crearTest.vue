<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 py-8 pl-20 md:pl-52">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Crear Nuevo Test</h1>
    <form @submit.prevent="submitForm" class="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="titulo">
          <PencilIcon class="h-5 w-5 inline-block mr-1" /> Título
        </label>
        <input
          v-model="titulo"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="titulo"
          type="text"
          placeholder="Título del Test"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion">
          <DocumentTextIcon class="h-5 w-5 inline-block mr-1" /> Descripción
        </label>
        <textarea
          v-model="descripcion"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="descripcion"
          placeholder="Descripción del Test"
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="duracion">
          <ClockIcon class="h-5 w-5 inline-block mr-1" /> Duración (minutos) <span class="text-gray-500">(Opcional)</span>
        </label>
        <select
          v-model="duracion"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duracion"
        >
          <option value="">Seleccionar duración</option>
          <option value="30">30 minutos</option>
          <option value="45">45 minutos</option>
          <option value="60">60 minutos</option>
          <option value="90">90 minutos</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="dificultad">
          <AdjustmentsIcon class="h-5 w-5 inline-block mr-1" /> Dificultad <span class="text-gray-500">(Opcional)</span>
        </label>
        <select
          v-model="dificultad"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dificultad"
        >
          <option value="">Seleccionar dificultad</option>
          <option value="facil">Fácil</option>
          <option value="medio">Medio</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="etiqueta">
          <TagIcon class="h-5 w-5 inline-block mr-1" /> Etiqueta
        </label>
        <select
          v-model="etiqueta"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="etiqueta"
        >
          <option value="">Seleccionar etiqueta</option>
          <option value="Salud">Salud</option>
          <option value="Conocimiento">Conocimiento</option>
          <option value="Idioma">Idioma</option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear Test
        </button>
      </div>
    </form>
    <div v-if="mensaje" :class="mensajeClase" class="mt-4 p-4 rounded-lg shadow-lg flex items-center">
      <CheckCircleIcon v-if="mensajeClase === 'bg-green-100 text-green-700'" class="h-6 w-6 mr-2" />
      <ExclamationCircleIcon v-if="mensajeClase === 'bg-red-100 text-red-700'" class="h-6 w-6 mr-2" />
      <span>{{ mensaje }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PencilIcon, DocumentTextIcon, ClockIcon, AdjustmentsIcon, TagIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/outline';

const router = useRouter();

const titulo = ref('');
const descripcion = ref('');
const duracion = ref('');
const dificultad = ref('');
const etiqueta = ref('');
const mensaje = ref('');
const mensajeClase = ref('');
const testId = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const submitForm = async () => {
  if (!titulo.value || !etiqueta.value) {
    mensaje.value = 'Por favor, complete los campos obligatorios (Título y Etiqueta).';
    mensajeClase.value = 'bg-red-100 text-red-700';
    return;
  }

  try {
    const response = await $fetch(`${apiBaseUrl}/crearTest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Enviar el token
      },
      body: { 
        titulo: titulo.value, 
        descripcion: descripcion.value, 
        duracion: duracion.value || null, 
        dificultad: dificultad.value || null,
        etiqueta: etiqueta.value  
      }
    });
    mensaje.value = 'Test creado con éxito.';
    mensajeClase.value = 'bg-green-100 text-green-700';
    testId.value = response.id;
    console.log('Test creado:', response);
    // Redirigir a la página de agregar preguntas
    router.push(`/agregarPreguntas/${testId.value}`);
  } catch (error) {
    mensaje.value = 'Algo salió mal al crear el test.';
    mensajeClase.value = 'bg-red-100 text-red-700';
    console.error('Error al crear el test:', error);
  }
};
useHead({
  title: "Crear Test - TestMaster",
  meta: [
    {
      name: "description",
      content: "Crear los test para realizar.",
    },
  ],
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>