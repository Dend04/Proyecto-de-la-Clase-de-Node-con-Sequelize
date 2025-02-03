<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
    <!-- Título -->
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Preguntas del Test</h1>

    <!-- Mensaje de error -->
    <div
      v-if="error"
      class="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm mb-6"
    >
      {{ error }}
    </div>

    <!-- Lista de preguntas -->
    <div v-else class="w-full max-w-4xl">
      <div v-if="preguntas.length === 0" class="text-gray-600 text-center">
        No hay preguntas disponibles para este test.
      </div>
      <ul class="space-y-6">
        <li
          v-for="pregunta in preguntas"
          :key="pregunta.id"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Encabezado de la pregunta -->
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ pregunta.texto }}
            </h2>
            <div class="flex space-x-3">
              <button
                @click="toggleRespuestas(pregunta.id)"
                class="text-gray-500 hover:text-gray-700 transition-colors"
                title="Visualizar respuestas"
              >
                <EyeIcon class="h-6 w-6" />
              </button>
              <button
                @click="editarPregunta(pregunta)"
                class="text-blue-500 hover:text-blue-600 transition-colors"
                title="Editar pregunta"
              >
                <PencilIcon class="h-6 w-6" />
              </button>
              <button
                @click="eliminarPregunta(pregunta.id)"
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
                v-for="respuesta in pregunta.respuestas"
                :key="respuesta.id"
                class="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <span class="text-gray-700">{{ respuesta.respuesta }}</span>
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
                    @click="editarRespuesta(respuesta)"
                    class="text-blue-500 hover:text-blue-600 transition-colors"
                    title="Editar respuesta"
                  >
                    <PencilIcon class="h-5 w-5" />
                  </button>
                  <button
                    @click="eliminarRespuesta(respuesta.id)"
                    class="text-red-500 hover:text-red-600 transition-colors"
                    title="Eliminar respuesta"
                  >
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </li>
            </ul>
            <button
              @click="mostrarModalRespuestas(pregunta.id)"
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Agregar Respuesta
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Botón para agregar pregunta -->
    <button
      @click="mostrarModalPregunta = true"
      class="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      Agregar Pregunta
    </button>

    <!-- Modal para agregar/editar pregunta -->
    <div
      v-if="mostrarModalPregunta"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ editandoPregunta ? "Editar Pregunta" : "Agregar Pregunta" }}
          </h2>
          <button
            @click="cerrarModalPregunta"
            class="text-gray-500 hover:text-gray-700"
          >
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="submitPregunta">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-medium mb-2"
              for="pregunta"
            >
              Pregunta
            </label>
            <input
              v-model="pregunta.texto"
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
              {{ editandoPregunta ? "Guardar Cambios" : "Agregar Pregunta" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para agregar/editar respuesta -->
    <div
      v-if="mostrarModalRespuesta"
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
              v-model="respuesta.respuesta"
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
} from "@heroicons/vue/outline";

const route = useRoute();
const preguntas = ref([]);
const error = ref(null);
const mostrarModalPregunta = ref(false);
const mostrarModalRespuesta = ref(false);
const editandoPregunta = ref(false);
const editandoRespuesta = ref(false);
const pregunta = ref({ texto: "" });
const respuesta = ref({ respuesta: "", correcta: false, preguntaId: null });
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const preguntasDesplegadas = ref({});

// Funciones para cargar preguntas y respuestas
const fetchPreguntas = async () => {
  try {
    const response = await $fetch(
      `${apiBaseUrl}/preguntas/test/id/${route.params.id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    preguntas.value = response.map((p) => ({
      ...p,
      mostrarRespuestas: preguntasDesplegadas.value[p.id] || false,
      respuestas: [],
    }));
  } catch (err) {
    error.value = "No se pudieron cargar las preguntas.";
    console.error("Error al cargar las preguntas:", err);
  }
};

const toggleRespuestas = async (preguntaId) => {
  const pregunta = preguntas.value.find((p) => p.id === preguntaId);
  if (pregunta) {
    if (!pregunta.mostrarRespuestas) {
      const respuestas = await fetchRespuestas(preguntaId);
      pregunta.respuestas = respuestas;
    }
    pregunta.mostrarRespuestas = !pregunta.mostrarRespuestas;
    preguntasDesplegadas.value[preguntaId] = pregunta.mostrarRespuestas;
  }
};

const fetchRespuestas = async (preguntaId) => {
  try {
    const response = await $fetch(
      `${apiBaseUrl}/respuestas/pregunta/${preguntaId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Error al cargar las respuestas:", err);
    return [];
  }
};

// Funciones para preguntas
const editarPregunta = (preguntaSeleccionada) => {
  pregunta.value = { ...preguntaSeleccionada };
  editandoPregunta.value = true;
  mostrarModalPregunta.value = true;
};

const eliminarPregunta = async (preguntaId) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta pregunta?")) {
    try {
      await $fetch(`${apiBaseUrl}/preguntas/${preguntaId}`, {
        method: "DELETE",
      });
      fetchPreguntas();
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
    }
  }
};

const submitPregunta = async () => {
  try {
    const testId = route.params.id;

    if (!testId) {
      throw new Error("El ID del test es requerido.");
    }

    await $fetch(`${apiBaseUrl}/crearPregunta`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: {
        testId,
        texto: pregunta.value.texto,
      },
    });

    // Recarga las preguntas y cierra el modal
    await fetchPreguntas();
    cerrarModalPregunta();
  } catch (error) {
    console.error("Error al guardar la pregunta:", error);
  }
};

const cerrarModalPregunta = () => {
  mostrarModalPregunta.value = false;
  pregunta.value = { texto: "" };
  editandoPregunta.value = false;
};

// Funciones para respuestas
const mostrarModalRespuestas = (preguntaId) => {
  respuesta.value = { respuesta: "", correcta: false, preguntaId };
  mostrarModalRespuesta.value = true;
};

const editarRespuesta = (respuestaSeleccionada) => {
  respuesta.value = { ...respuestaSeleccionada };
  editandoRespuesta.value = true;
  mostrarModalRespuesta.value = true;
};

const eliminarRespuesta = async (respuestaId) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta respuesta?")) {
    try {
      await $fetch(`${apiBaseUrl}/borrarRespuesta/${respuestaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchPreguntas();
    } catch (error) {
      console.error("Error al eliminar la respuesta:", error);
    }
  }
};

const submitRespuesta = async () => {
  try {
    if (!respuesta.value.respuesta || !respuesta.value.preguntaId) {
      throw new Error("Todos los campos son obligatorios.");
    }
    respuesta.value.tipo = "texto";

    await $fetch(`${apiBaseUrl}/crearRespuesta`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: {
        tipo: respuesta.value.tipo,
        respuesta: respuesta.value.respuesta,
        correcta: respuesta.value.correcta,
        preguntaId: respuesta.value.preguntaId,
      },
    });

    // Actualiza las respuestas de la pregunta correspondiente
    const preguntaIndex = preguntas.value.findIndex(p => p.id === respuesta.value.preguntaId);
    if (preguntaIndex !== -1) {
      preguntas.value[preguntaIndex].respuestas = await fetchRespuestas(respuesta.value.preguntaId);
    }

    cerrarModalRespuesta();
  } catch (error) {
    console.error("Error al guardar la respuesta:", error);
    alert("Error al guardar la respuesta: " + error.message);
  }
};

const cerrarModalRespuesta = () => {
  mostrarModalRespuesta.value = false;
  respuesta.value = { respuesta: "", correcta: false, preguntaId: null };
  editandoRespuesta.value = false;
};

onMounted(() => {
  fetchPreguntas();
});
</script>

<style scoped>
/* Estilos personalizados */
</style>
