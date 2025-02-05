<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pl-20 md:pl-52">
      <div class="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Encabezado -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 class="text-3xl font-bold text-white flex items-center justify-center">
            <span class="mr-2">📊</span> Resultados del Test
          </h1>
        </div>
  
        <!-- Contenido -->
        <div class="p-6">
          <!-- ID del Test -->
          <div class="flex items-center mb-4">
            <span class="text-gray-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            <p class="text-gray-600">
              ID del Test: <span class="font-semibold">{{ id }}</span>
            </p>
          </div>
  
          <!-- ID del Resultado -->
          <div class="flex items-center mb-6">
            <span class="text-gray-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <p class="text-gray-600">
              ID del Resultado: <span class="font-semibold">{{ resultado }}</span>
            </p>
          </div>
  
          <!-- Detalles del Resultado -->
          <div v-if="resultadoDetalles" class="space-y-4">
            <h2 class="text-xl font-bold text-gray-700 mb-4">
              Detalles del Resultado
            </h2>
  
            <!-- Respuestas Correctas -->
            <div class="flex items-center">
              <span class="text-green-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p class="text-gray-600">
                Respuestas Correctas: <span class="font-semibold">{{ resultadoDetalles.resultado.respuestasCorrectas }}</span>
              </p>
            </div>
  
            <!-- Respuestas Incorrectas -->
            <div class="flex items-center">
              <span class="text-red-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <p class="text-gray-600">
                Respuestas Incorrectas:
                <span v-if="resultadoDetalles.resultado.respuestasIncorrectas.length > 0">
                  <ul class="list-disc ml-6">
                    <!-- Dividir la cadena de texto en un array y mostrar cada pregunta -->
                    <li v-for="(pregunta, index) in resultadoDetalles.resultado.respuestasIncorrectas.split(', ')" :key="index">
                      {{ pregunta }}
                    </li>
                  </ul>
                </span>
                <span v-else class="font-semibold">Ninguna</span>
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
                Porcentaje de Aciertos: <span class="font-semibold">{{ resultadoDetalles.resultado.porcentajeCorrectas }}%</span>
              </p>
            </div>
  
            <!-- Estado -->
            <div class="flex items-center">
              <span class="text-yellow-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p class="text-gray-600">
                Estado: <span class="font-semibold">{{ resultadoDetalles.estado }}</span>
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
            <p>Cargando resultados...</p>
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
  const id = route.params.id; // Obtén el ID del parámetro de la ruta
  const resultado = route.query.resultado; // Accede al query "resultado"
  
  const resultadoDetalles = ref(null);
  
  const fetchResultadoDetalles = async () => {
    try {
      const config = useRuntimeConfig(); // Accede a las variables de entorno
      const response = await $fetch(
        `${config.public.BACKEND_URL}/resultados/${resultado}`
      );
      console.log("Detalles del resultado:", response); // Verifica la respuesta
      resultadoDetalles.value = response;
    } catch (error) {
      console.error("Error al obtener los detalles del resultado:", error);
      alert("Hubo un error al cargar los resultados. Inténtalo de nuevo.");
    }
  };
  
  onMounted(() => {
    fetchResultadoDetalles();
  });
  </script>