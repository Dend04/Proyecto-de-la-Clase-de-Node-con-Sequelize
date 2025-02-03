<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
    <!-- Título -->
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Agregar Preguntas al Test</h1>

    <!-- Mensaje de error -->
    <div
      v-if="error"
      class="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm mb-6"
    >
      {{ error }}
    </div>

    <!-- Formulario para agregar pregunta -->
    <div class="w-full max-w-4xl">
      <form
        @submit.prevent="submitPregunta"
        class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-medium mb-2"
            for="pregunta"
          >
            Pregunta
          </label>
          <input
            v-model="pregunta"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            id="pregunta"
            type="text"
            placeholder="Escribe la pregunta"
          />
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            type="submit"
          >
            Agregar Pregunta
          </button>
        </div>
      </form>

      <!-- Mensaje de éxito o error -->
      <div
        v-if="mensaje"
        :class="mensajeClase"
        class="mt-4 p-4 rounded-lg shadow-sm flex items-center"
      >
        <CheckCircleIcon
          v-if="mensajeClase === 'bg-green-50 text-green-600'"
          class="h-6 w-6 mr-2"
        />
        <ExclamationCircleIcon
          v-if="mensajeClase === 'bg-red-50 text-red-600'"
          class="h-6 w-6 mr-2"
        />
        <span>{{ mensaje }}</span>
      </div>

      <!-- Botones adicionales -->
      <div class="mt-4 flex space-x-4">
        <button
          @click="agregarOtraPregunta"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Agregar Otra Pregunta
        </button>
        <NuxtLink
          to="/test"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Volver a Tests
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";

const route = useRoute();
const pregunta = ref("");
const mensaje = ref("");
const mensajeClase = ref("");
const error = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const submitPregunta = async () => {
  if (!pregunta.value) {
    mensaje.value = "Por favor, escribe una pregunta.";
    mensajeClase.value = "bg-red-50 text-red-600";
    return;
  }

  try {
    await $fetch(`${apiBaseUrl}/preguntas/test/id/${route.params.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: {
        texto: pregunta.value,
      },
    });
    mensaje.value = "Pregunta agregada con éxito.";
    mensajeClase.value = "bg-green-50 text-green-600";
    pregunta.value = ""; // Limpiar el campo de la pregunta
  } catch (err) {
    mensaje.value = "Algo salió mal al agregar la pregunta.";
    mensajeClase.value = "bg-red-50 text-red-600";
    console.error("Error al agregar la pregunta:", err);
  }
};

const agregarOtraPregunta = () => {
  pregunta.value = "";
  mensaje.value = "";
  mensajeClase.value = "";
};
</script>

<style scoped>
/* Estilos personalizados */
</style>