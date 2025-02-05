<template>
    <div class="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 p-6 py-8 pl-20 md:pl-52">
      <!-- Título de la página -->
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Gestión de Rutinas</h1>
  
      <!-- Formulario para crear/editar rutinas -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          {{ isEditing ? 'Editar Rutina' : 'Crear Nueva Rutina' }}
        </h2>
        <form @submit.prevent="submitRutina" class="space-y-4">
          <!-- Campo Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              v-model="rutinaForm.nombre"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la rutina"
              required
            />
          </div>
          <!-- Campo Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              v-model="rutinaForm.descripcion"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Descripción de la rutina"
            ></textarea>
          </div>
          <!-- Select para elegir el test -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test asociado</label>
            <select
              v-model="rutinaForm.testId"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecciona un test</option>
              <option v-for="test in tests" :key="test.id" :value="test.id">
                {{ test.titulo }}
              </option>
            </select>
          </div>
          <!-- Select para elegir el porcentaje de aciertos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Porcentaje de aciertos</label>
            <select
              v-model="rutinaForm.porcentajeAciertos"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecciona un porcentaje</option>
              <option value="0-30">0% - 30%</option>
              <option value="30-50">30% - 50%</option>
              <option value="50-70">50% - 70%</option>
              <option value="70-90">70% - 90%</option>
              <option value="90-100">90% - 100%</option>
            </select>
          </div>
          <!-- Botones del formulario -->
          <div class="flex space-x-2">
            <button
              type="submit"
              class="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <span>{{ isEditing ? 'Actualizar' : 'Crear' }}</span>
              <PencilIcon v-if="isEditing" class="ml-2 w-4 h-4" />
              <PlusIcon v-else class="ml-2 w-4 h-4" />
            </button>
            <button
              v-if="isEditing"
              @click="cancelEdit"
              type="button"
              class="flex items-center justify-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              <span>Cancelar</span>
              <XIcon class="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
  
      <!-- Lista de rutinas -->
      <div>
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Lista de Rutinas</h2>
        <div class="space-y-4">
          <!-- Tarjeta de rutina -->
          <div
            v-for="rutina in rutinas"
            :key="rutina.id"
            class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-800">{{ rutina.nombre }}</h3>
            <p class="text-gray-600 mt-1">{{ rutina.descripcion }}</p>
            <p class="text-gray-600 mt-1">Test asociado: {{ getTestName(rutina.testId) }}</p>
            <p class="text-gray-600 mt-1">Porcentaje de aciertos: {{ rutina.porcentajeAciertos }}%</p>
            <!-- Botones de acciones -->
            <div class="mt-3 flex space-x-2">
              <button
                @click="editRutina(rutina)"
                class="flex items-center justify-center bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition-colors"
              >
                <PencilIcon class="w-4 h-4" />
                <span class="ml-1">Editar</span>
              </button>
              <button
                @click="deleteRutina(rutina.id)"
                class="flex items-center justify-center bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
                <span class="ml-1">Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { PencilIcon, PlusIcon, XIcon, TrashIcon } from '@heroicons/vue/outline';
  import { useRuntimeConfig } from '#app';
  
  const apiBaseUrl = useRuntimeConfig().public.BACKEND_URL;
  const rutinas = ref([]);
  const tests = ref([]); // Lista de tests
  const porcentajes = ref([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]); // Lista de porcentajes
  const rutinaForm = ref({
    id: null,
    nombre: '',
    descripcion: '',
    testId: '', // ID del test asociado
    porcentajeAciertos: '', // Porcentaje de aciertos
  });
  const isEditing = ref(false);
  
  // Obtener el token desde localStorage
  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // Obtener rutinas y tests al montar el componente
  onMounted(async () => {
    await fetchRutinas();
    await fetchTests();
  });
  
  // Función para obtener rutinas
  const fetchRutinas = async () => {
    try {
      const response = await $fetch(`${apiBaseUrl}/rutinas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      rutinas.value = response;
    } catch (error) {
      console.error('Error al obtener rutinas:', error);
    }
  };
  
  // Función para obtener tests
  const fetchTests = async () => {
    try {
      const response = await $fetch(`${apiBaseUrl}/tests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      tests.value = response;
    } catch (error) {
      console.error('Error al obtener tests:', error);
    }
  };
  
  // Obtener el nombre del test por su ID
  const getTestName = (testId) => {
    const test = tests.value.find((t) => t.id === testId);
    return test ? test.titulo : 'Test no encontrado';
  };
  
  // Crear o actualizar una rutina
  const submitRutina = async () => {
  try {
    const data = {
      nombre: rutinaForm.value.nombre,
      descripcion: rutinaForm.value.descripcion,
      testId: Number(rutinaForm.value.testId),
      porcentajeAciertos: Number(rutinaForm.value.porcentajeAciertos),
    };

    console.log('Datos enviados:', data); // Verifica los datos

    await $fetch(`${apiBaseUrl}/crearRutina`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: data,
    });

    await fetchRutinas();
    resetForm();
  } catch (error) {
    console.error('Error al guardar rutina:', error);
    if (error.data) {
      console.error('Respuesta del servidor:', error.data);
    }
  }
};
  
  // Editar una rutina
  const editRutina = (rutina) => {
    rutinaForm.value = { ...rutina };
    isEditing.value = true;
  };
  
  // Eliminar una rutina
  const deleteRutina = async (id) => {
    try {
      await $fetch(`${apiBaseUrl}/rutinas/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      await fetchRutinas();
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
    }
  };
  
  // Cancelar edición
  const cancelEdit = () => {
    resetForm();
  };
  
  // Reiniciar el formulario
  const resetForm = () => {
    rutinaForm.value = {
      id: null,
      nombre: '',
      descripcion: '',
      testId: '',
      porcentajeAciertos: '',
    };
    isEditing.value = false;
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>