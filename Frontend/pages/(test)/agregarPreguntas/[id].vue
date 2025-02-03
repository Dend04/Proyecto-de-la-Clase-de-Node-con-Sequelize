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

      <!-- Lista de preguntas -->
      <div v-if="preguntas.length > 0" class="mt-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Preguntas Agregadas</h2>
        <ul class="space-y-6">
          <li
            v-for="(pregunta, index) in preguntas"
            :key="index"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-800">{{ pregunta.texto }}</h3>
              <div class="flex space-x-3">
                <button
                  @click="toggleRespuestas(index)"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Visualizar respuestas"
                >
                  <EyeIcon class="h-6 w-6" />
                </button>
                <button
                  @click="editarPregunta(index)"
                  class="text-blue-500 hover:text-blue-600 transition-colors"
                  title="Editar pregunta"
                >
                  <PencilIcon class="h-6 w-6" />
                </button>
                <button
                  @click="eliminarPregunta(index)"
                  class="text-red-500 hover:text-red-600 transition-colors"
                  title="Eliminar pregunta"
                >
                  <TrashIcon class="h-6 w-6" />
                </button>
              </div>
            </div>

            <!-- Respuestas desplegables -->
            <div
              v-if="pregunta.mostrarRespuestas"
              class="mt-4 pl-6 border-l-2 border-gray-100"
            >
              <div v-if="pregunta.respuestas.length === 0" class="text-gray-500">
                No hay respuestas para esta pregunta.
              </div>
              <ul v-else class="space-y-3">
                <li
                  v-for="(respuesta, respIndex) in pregunta.respuestas"
                  :key="respIndex"
                  class="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <span class="text-gray-700">{{ respuesta.texto }}</span>
                    <span
                      v-if="respuesta.correcta"
                      class="text-green-500"
                      title="Respuesta correcta"
                    >
                      <CheckIcon class="h-5 w-5" />
                    </span>
                    <span
                      v-else
                      class="text-red-500"
                      title="Respuesta incorrecta"
                    >
                      <XIcon class="h-5 w-5" />
                    </span>
                  </div>
                  <div class="flex space-x-3">
                    <button
                      @click="editarRespuesta(index, respIndex)"
                      class="text-blue-500 hover:text-blue-600 transition-colors"
                      title="Editar respuesta"
                    >
                      <PencilIcon class="h-5 w-5" />
                    </button>
                    <button
                      @click="eliminarRespuesta(index, respIndex)"
                      class="text-red-500 hover:text-red-600 transition-colors"
                      title="Eliminar respuesta"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                </li>
              </ul>
              <button
                @click="mostrarModalRespuesta(index)"
                class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Agregar Respuesta
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Botones adicionales -->
      <div class="mt-4 flex space-x-4">
        <NuxtLink
          to="/test"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Volver a Tests
        </NuxtLink>
      </div>
    </div>

    <!-- Modal para agregar/editar respuesta -->
    <div
      v-if="mostrarModalRespuestas"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ editandoRespuesta ? "Editar Respuesta" : "Agregar Respuesta" }}
          </h2>
          <button
            @click="cerrarModalRespuesta"
            class="text-gray-500 hover:text-gray-700"
          >
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="submitRespuesta">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-medium mb-2"
              for="respuesta"
            >
              Respuesta
            </label>
            <input
              v-model="respuesta.texto"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              id="respuesta"
              type="text"
              placeholder="Escribe la respuesta"
            />
          </div>
          <div class="mb-4">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="respuesta.correcta"
                class="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-gray-700">Respuesta correcta</span>
            </label>
          </div>
          <div class="flex justify-end">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              type="submit"
            >
              {{ editandoRespuesta ? "Guardar Cambios" : "Agregar Respuesta" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
} from "@heroicons/vue/outline";

const route = useRoute();
const pregunta = ref("");
const preguntas = ref([]);
const mensaje = ref("");
const mensajeClase = ref("");
const error = ref(null);
const mostrarModalRespuestas = ref(false);
const editandoRespuesta = ref(false);
const respuesta = ref({ texto: "", correcta: false, preguntaIndex: null });
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const submitPregunta = async () => {
  if (!pregunta.value) {
    mensaje.value = "Por favor, escribe una pregunta.";
    mensajeClase.value = "bg-red-50 text-red-600";
    return;
  }

  try {
    const nuevaPregunta = {
      texto: pregunta.value,
      respuestas: [],
      mostrarRespuestas: false,
    };
    preguntas.value.push(nuevaPregunta);
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

const toggleRespuestas = (index) => {
  preguntas.value[index].mostrarRespuestas = !preguntas.value[index].mostrarRespuestas;
};

const editarPregunta = (index) => {
  pregunta.value = preguntas.value[index].texto;
  preguntas.value.splice(index, 1);
};

const eliminarPregunta = (index) => {
  preguntas.value.splice(index, 1);
};

const mostrarModalRespuesta = (index) => {
  respuesta.value = { texto: "", correcta: false, preguntaIndex: index };
  mostrarModalRespuestas.value = true;
};

const editarRespuesta = (preguntaIndex, respuestaIndex) => {
  respuesta.value = { ...preguntas.value[preguntaIndex].respuestas[respuestaIndex], preguntaIndex, respuestaIndex };
  editandoRespuesta.value = true;
  mostrarModalRespuesta.value = true;
};

const eliminarRespuesta = (preguntaIndex, respuestaIndex) => {
  preguntas.value[preguntaIndex].respuestas.splice(respuestaIndex, 1);
};

const submitRespuesta = () => {
  if (editandoRespuesta.value) {
    preguntas.value[respuesta.value.preguntaIndex].respuestas[respuesta.value.respuestaIndex] = {
      texto: respuesta.value.texto,
      correcta: respuesta.value.correcta,
    };
  } else {
    preguntas.value[respuesta.value.preguntaIndex].respuestas.push({
      texto: respuesta.value.texto,
      correcta: respuesta.value.correcta,
    });
  }
  cerrarModalRespuesta();
};

const cerrarModalRespuesta = () => {
  mostrarModalRespuestas.value = false;
  respuesta.value = { texto: "", correcta: false, preguntaIndex: null };
  editandoRespuesta.value = false;
};
</script>
<style scoped>
/* Estilos personalizados */
</style>