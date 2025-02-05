<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Encabezado -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 class="text-3xl font-bold text-white flex items-center justify-center">
            <span class="mr-2">🏋️‍♂️</span> Rutina Asignada
          </h1>
        </div>
  
        <!-- Contenido -->
        <div class="p-6">
          <!-- Detalles de la Rutina -->
          <div v-if="rutina" class="space-y-4">
            <h2 class="text-xl font-bold text-gray-700 mb-4">
              Detalles de la Rutina
            </h2>
  
            <!-- Nombre de la Rutina -->
            <div class="flex items-center">
              <span class="text-gray-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p class="text-gray-600">
                Nombre: <span class="font-semibold">{{ rutina.nombre }}</span>
              </p>
            </div>
  
            <!-- Descripción de la Rutina -->
            <div class="flex items-center">
              <span class="text-gray-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <p class="text-gray-600">
                Descripción: <span class="font-semibold">{{ rutina.descripcion }}</span>
              </p>
            </div>
  
            <!-- Porcentaje de Aciertos -->
            <div class="flex items-center">
              <span class="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <p class="text-gray-600">
                Porcentaje de Aciertos: <span class="font-semibold">{{ rutina.porcentajeAciertos }}%</span>
              </p>
            </div>
          </div>
  
          <!-- Mensaje de carga -->
          <div v-else class="text-gray-600 flex items-center justify-center py-6">
            <span class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
            <p>Cargando rutina...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { $fetch } from "ofetch";
  
  const route = useRoute();
  const rutinaId = route.params.id; // ID de la rutina
  const rutina = ref(null);
  
  // Obtener los detalles de la rutina
  const fetchRutina = async () => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch(
        `${config.public.BACKEND_URL}/rutina/${rutinaId}`
      );
      rutina.value = response;
    } catch (error) {
      console.error("Error al obtener los detalles de la rutina:", error);
      alert("Hubo un error al cargar la rutina. Inténtalo de nuevo.");
    }
  };
  
  onMounted(() => {
    fetchRutina();
  });
  </script>