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
            ID del Test: <span class="font-semibold">{{ testId }}</span>
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

          <!-- Lógica para tests de "Salud" -->
          <div v-if="testEtiqueta === 'Salud'">
            <!-- Valores de las respuestas -->
            <div class="flex items-center">
              <span class="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <p class="text-gray-600">
                Valores de las respuestas:
                <ul class="list-disc ml-6">
                  <li v-for="(valor, nombre) in resultadoDetalles.resultado.valores" :key="nombre">
                    {{ nombre }}: {{ valor }}
                  </li>
                </ul>
              </p>
            </div>

            <!-- Estado físico -->
            <div class="flex items-center">
              <span class="text-yellow-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p class="text-gray-600">
                Estado físico: <span class="font-semibold">{{ resultadoDetalles.estado }}</span>
              </p>
            </div>

            <!-- Deficiencias -->
            <div class="flex items-center">
              <span class="text-red-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <p class="text-gray-600">
                Deficiencias: <span class="font-semibold">{{ resultadoDetalles.resultado.deficiencias }}</span>
              </p>
            </div>
          </div>

          <!-- Lógica para otros tests -->
          <div v-else>
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
                <span v-if="resultadoDetalles.resultado.respuestasIncorrectas?.length > 0">
                  <ul class="list-disc ml-6">
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
const testId = route.query.testId; // Obtén el ID del test desde los query parameters
const resultado = route.params.id; // Obtén el ID del resultado desde los parámetros de la ruta

const resultadoDetalles = ref(null);
const testEtiqueta = ref(""); // Define testEtiqueta como una referencia reactiva

// Función para determinar el estado físico y las deficiencias
const determinarEstadoFisicoYDeficiencias = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];
  const {
    planchas = 0,
    abdominales = 0,
    flexibilidad = 0,
    velocidad = 0,
    resistencia = 0,
    tiempoDescanso = 0,
  } = respuestas;

  if (planchas >= 30) puntaje += 2;
  else if (planchas >= 20) puntaje += 1;
  else deficiencias.push("planchas");

  if (abdominales >= 50) puntaje += 2;
  else if (abdominales >= 30) puntaje += 1;
  else deficiencias.push("abdominales");

  if (flexibilidad >= 9) puntaje += 2;
  else if (flexibilidad >= 7) puntaje += 1;
  else deficiencias.push("flexibilidad");

  if (velocidad >= 9) puntaje += 2;
  else if (velocidad >= 7) puntaje += 1;
  else deficiencias.push("velocidad");

  if (resistencia >= 9) puntaje += 2;
  else if (resistencia >= 7) puntaje += 1;
  else deficiencias.push("resistencia");

  if (tiempoDescanso >= 9) puntaje += 2;
  else if (tiempoDescanso >= 8) puntaje += 1;
  else deficiencias.push("tiempo de descanso");

  let estado;
  if (puntaje >= 10) estado = "Excelente estado físico";
  else if (puntaje >= 7) estado = "Buen estado físico";
  else if (puntaje >= 4) estado = "Saludable";
  else if (puntaje >= 2) estado = "Estado normal";
  else estado = "Poco saludable";

  return { estado, deficiencias };
};

const fetchResultadoDetalles = async () => {
  try {
    const config = useRuntimeConfig(); // Accede a las variables de entorno

    if (!testId) {
      throw new Error("No se encontró el ID del test.");
    }

    // Obtener los detalles del test para determinar su etiqueta
    const testResponse = await $fetch(`${config.public.BACKEND_URL}/test/${testId}`);
    testEtiqueta.value = testResponse.etiqueta; // Asignar la etiqueta del test

    // Obtener las preguntas del test
    const preguntasResponse = await $fetch(`${config.public.BACKEND_URL}/preguntas/test/id/${testId}`);
    const mapeoPreguntas = {}; // Objeto para mapear IDs de preguntas a nombres descriptivos

    // Crear el mapeo de IDs a nombres descriptivos
    preguntasResponse.forEach(pregunta => {
      if (pregunta.texto.toLowerCase().includes("planchas")) {
        mapeoPreguntas[pregunta.id] = "planchas";
      } else if (pregunta.texto.toLowerCase().includes("abdominales")) {
        mapeoPreguntas[pregunta.id] = "abdominales";
      } else if (pregunta.texto.toLowerCase().includes("flexibilidad")) {
        mapeoPreguntas[pregunta.id] = "flexibilidad";
      } else if (pregunta.texto.toLowerCase().includes("velocidad")) {
        mapeoPreguntas[pregunta.id] = "velocidad";
      } else if (pregunta.texto.toLowerCase().includes("resistencia")) {
        mapeoPreguntas[pregunta.id] = "resistencia";
      } else if (pregunta.texto.toLowerCase().includes("tiempo de descanso")) {
        mapeoPreguntas[pregunta.id] = "tiempo de descanso";
      }
    });

    let response;
    if (testEtiqueta.value === 'Salud') {
      // Lógica específica para tests de "Salud"
      response = await $fetch(`${config.public.BACKEND_URL}/resultados/${resultado}`);
      console.log("Respuesta del backend (Salud):", response); // Verifica la respuesta

      // Mapear los valores de las respuestas a nombres descriptivos
      const valoresMapeados = {};
      for (const [idPregunta, valor] of Object.entries(response.resultado.valores)) {
        const nombreDescriptivo = mapeoPreguntas[idPregunta] || `Pregunta ${idPregunta}`;
        valoresMapeados[nombreDescriptivo] = valor;
      }

      // Calcular el estado físico y las deficiencias
      const { estado, deficiencias } = determinarEstadoFisicoYDeficiencias(valoresMapeados);

      resultadoDetalles.value = {
        resultado: {
          valores: valoresMapeados, // Valores mapeados a nombres descriptivos
          estado: estado, // Estado físico calculado
          deficiencias: deficiencias.join(", "), // Deficiencias calculadas
        },
        estado: estado,
      };
    } else {
      // Lógica para otros tests
      response = await $fetch(`${config.public.BACKEND_URL}/resultados/${resultado}`);
      console.log("Respuesta del backend (Otros):", response); // Verifica la respuesta

      resultadoDetalles.value = {
        resultado: {
          respuestasCorrectas: response.resultado.respuestasCorrectas || 0,
          respuestasIncorrectas: response.resultado.respuestasIncorrectas || "", // Valor por defecto
          porcentajeCorrectas: response.resultado.porcentajeCorrectas || 0,
        },
        estado: response.estado,
      };
    }

    console.log("Detalles del resultado:", resultadoDetalles.value); // Verifica la respuesta
  } catch (error) {
    console.error("Error al obtener los detalles del resultado:", error);
    alert("Hubo un error al cargar los resultados. Inténtalo de nuevo.");
  }
};

onMounted(() => {
  fetchResultadoDetalles();
});
</script>