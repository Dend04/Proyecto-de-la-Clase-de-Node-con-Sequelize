<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Respuestas de la Pregunta</h1>
    <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
      {{ error }}
    </div>
    <div v-else>
      <div v-if="respuestas.length === 0" class="text-gray-700">
        No hay respuestas disponibles para esta pregunta.
      </div>
      <div v-else class="w-full max-w-4xl">
        <ul class="space-y-4">
          <li v-for="respuesta in respuestas" :key="respuesta.id" class="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">{{ respuesta.respuesta_textual || respuesta.respuesta_numerica }}</h2>
            <div class="flex space-x-2">
              <button @click="editarRespuesta(respuesta)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Editar
              </button>
              <button @click="eliminarRespuesta(respuesta.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Eliminar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="mostrarModal = true" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Agregar Respuesta
    </button>

    <!-- Modal para agregar o editar respuesta -->
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ editando ? 'Editar Respuesta' : 'Agregar Respuesta' }}</h2>
          <button @click="cerrarModal" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form @submit.prevent="submitRespuesta">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tipo">
              Tipo de Respuesta
            </label>
            <select v-model="tipo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tipo">
              <option value="multiple">Múltiple</option>
              <option value="unica">Única</option>
              <option value="texto">Texto</option>
              <option value="numero">Número</option>
            </select>
          </div>
          <div class="mb-4" v-if="tipo === 'texto' || tipo === 'multiple' || tipo === 'unica'">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="respuesta_textual">
              Respuesta Textual
            </label>
            <input
              v-model="respuesta_textual"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="respuesta_textual"
              type="text"
              placeholder="Escribe la respuesta"
            />
          </div>
          <div class="mb-4" v-if="tipo === 'numero'">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="respuesta_numerica">
              Respuesta Numérica
            </label>
            <input
              v-model="respuesta_numerica"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="respuesta_numerica"
              type="number"
              placeholder="Escribe la respuesta numérica"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ editando ? 'Guardar Cambios' : 'Agregar Respuesta' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// filepath: /d:/Mis proyectos VC/Proyecto-de-la-Clase-de-Node-con-Sequelize/Frontend/pages/(test)/visualizarRespuestas/[id].vue
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const respuestas = ref([]);
const error = ref(null);
const mostrarModal = ref(false);
const editando = ref(false);
const tipo = ref('texto');
const respuesta_textual = ref('');
const respuesta_numerica = ref(null);
const respuestaId = ref(null);

const fetchRespuestas = async () => {
  try {
    const preguntaId = route.params.id;
    if (!preguntaId) {
      throw new Error('El parámetro id es undefined');
    }
    const response = await $fetch(`http://localhost:3000/api/respuestas/pregunta/${preguntaId}`);
    if (response.length === 0) {
      error.value = 'No hay respuestas disponibles para esta pregunta.';
    } else {
      respuestas.value = response;
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = 'No se encontraron respuestas para esta pregunta.';
    } else {
      error.value = 'No se pudieron cargar las respuestas. Por favor, intenta nuevamente.';
    }
    console.error('Error al cargar las respuestas:', err);
  }
};

const submitRespuesta = async () => {
  if (!respuesta_textual.value && !respuesta_numerica.value) {
    alert('Por favor, escribe una respuesta.');
    return;
  }

  const nuevaRespuesta = {
    tipo: tipo.value,
    respuesta_textual: tipo.value === 'texto' || tipo.value === 'multiple' || tipo.value === 'unica' ? respuesta_textual.value : null,
    respuesta_numerica: tipo.value === 'numero' ? respuesta_numerica.value : null,
    preguntaId: route.params.id,
  };

  try {
    if (editando.value) {
      await $fetch(`http://localhost:3000/api/respuestas/${respuestaId.value}`, {
        method: 'PUT',
        body: nuevaRespuesta
      });
    } else {
      await $fetch(`http://localhost:3000/api/crearRespuesta`, {
        method: 'POST',
        body: nuevaRespuesta
      });
    }
    respuesta_textual.value = ''; // Limpiar el campo de la respuesta textual
    respuesta_numerica.value = null; // Limpiar el campo de la respuesta numérica
    mostrarModal.value = false; // Cerrar el modal
    fetchRespuestas(); // Volver a cargar las respuestas
  } catch (error) {
    alert('Algo salió mal al agregar la respuesta.');
    console.error('Error al agregar la respuesta:', error);
  }
};

const editarRespuesta = (respuesta) => {
  tipo.value = respuesta.tipo;
  respuesta_textual.value = respuesta.respuesta_textual;
  respuesta_numerica.value = respuesta.respuesta_numerica;
  respuestaId.value = respuesta.id;
  editando.value = true;
  mostrarModal.value = true;
};

const eliminarRespuesta = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta respuesta?')) {
    try {
      await $fetch(`http://localhost:3000/api/respuestas/${id}`, {
        method: 'DELETE'
      });
      fetchRespuestas(); // Volver a cargar las respuestas
    } catch (error) {
      alert('Algo salió mal al eliminar la respuesta.');
      console.error('Error al eliminar la respuesta:', error);
    }
  }
};

const cerrarModal = () => {
  mostrarModal.value = false;
  editando.value = false;
  respuesta_textual.value = '';
  respuesta_numerica.value = null;
};

onMounted(() => {
  fetchRespuestas();
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>