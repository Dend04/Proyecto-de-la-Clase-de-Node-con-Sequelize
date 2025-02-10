<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Cargando -->
    <div v-if="loading" class="text-center p-8 text-xl text-gray-600">
      Cargando test...
    </div>

    <!-- Test cargado -->
    <div v-else class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ test.titulo }}</h1>
      <p class="text-gray-600 mb-8">{{ test.descripcion }}</p>

      <!-- Pregunta actual -->
      <div v-if="currentQuestion">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-700">
            Pregunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
          </h2>
          <p class="mt-2 text-gray-800">{{ currentQuestion.texto }}</p>
        </div>

        <!-- Respuestas -->
        <div class="space-y-3">
          <template v-if="test.etiqueta === 'Salud'">
            <input
              v-model="respuestaNumerica"
              type="number"
              min="0"
              class="w-full p-4 border rounded-lg"
              :placeholder="placeholderSalud"
              @keyup.enter="handleSaludAnswer"
            />
          </template>
          <template v-else>
            <button
              v-for="respuesta in currentQuestion.respuestas"
              :key="respuesta.id"
              @click="selectAnswer(respuesta)"
              class="w-full p-4 text-left rounded-lg border border-gray-200 transition-all"
              :class="{
                'bg-blue-500 text-white border-blue-500':
                  respuestaSeleccionada?.id === respuesta.id,
                'hover:border-blue-300 hover:bg-gray-50':
                  respuestaSeleccionada?.id !== respuesta.id,
              }"
            >
              {{ respuesta.respuesta }}
            </button>
          </template>
        </div>

        <!-- Botones de navegación -->
        <div class="mt-8 flex justify-end gap-4">
          <button
            v-if="currentQuestionIndex < totalQuestions - 1"
            @click="nextQuestion"
            :disabled="
              test.etiqueta === 'Salud'
                ? !respuestaNumerica
                : !respuestaSeleccionada
            "
            class="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Siguiente →
          </button>

          <button
            v-if="currentQuestionIndex === totalQuestions - 1"
            @click="finishTest"
            :disabled="
              test.etiqueta === 'Salud'
                ? !respuestaNumerica
                : !respuestaSeleccionada
            "
            class="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          >
            Finalizar Test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Estado reactivo
const testId = ref(null);
const test = ref({});
const loading = ref(true);
const currentQuestionIndex = ref(0);
const totalQuestions = ref(0);
const currentQuestion = ref(null);
const answers = ref([]);
const respuestaSeleccionada = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const respuestaNumerica = ref("");
const respuestasSalud = ref({});

const placeholderSalud = computed(() => {
  if (!currentQuestion.value) return "Ingresa un número";
  return `Ingresa ${currentQuestion.value.texto.toLowerCase()}`;
});

const handleSaludAnswer = () => {
  if (!respuestaNumerica.value) return;
  nextQuestion();
};

// Función para obtener el test
const fetchTest = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No se encontró token de autenticación");

    // Obtener test básico
    const testResponse = await $fetch(
      `${apiBaseUrl}/test/${testId.value}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    test.value = testResponse;

    if (testResponse.etiqueta === "Salud") {
      // Configurar preguntas predefinidas para salud
      const preguntasResponse = await $fetch(
        `${apiBaseUrl}/preguntas/test/id/${testId.value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      test.value.preguntas = preguntasResponse;
      totalQuestions.value = test.value.preguntas?.length || 0;
    } else {
      // Lógica normal para otros tests
      const preguntasResponse = await $fetch(
        `${apiBaseUrl}/preguntas/test/id/${testId.value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      test.value.preguntas = preguntasResponse;

      // Obtener respuestas para cada pregunta
      for (const pregunta of test.value.preguntas) {
        const respuestasResponse = await $fetch(
          `${apiBaseUrl}/respuestas/pregunta/${pregunta.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        pregunta.respuestas = respuestasResponse.map((respuesta) => ({
          id: respuesta.id,
          tipo: respuesta.tipo,
          respuesta: tryParseJSON(respuesta.respuesta),
        }));
      }
      totalQuestions.value = test.value.preguntas?.length || 0;
    }

    currentQuestion.value = test.value.preguntas[currentQuestionIndex.value];
    loading.value = false;
  } catch (error) {
    console.error("Error:", error);
    test.value = { titulo: "Error", descripcion: error.message };
    loading.value = false;
    if (error.response?.status === 401) router.push("/login");
  }
};

const tryParseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

// Watcher para cambios en el ID de la ruta
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      testId.value = newId;
      await fetchTest();
    }
  },
  { immediate: true }
);

// Selección de respuesta para tests normales
const selectAnswer = (respuesta) => {
  respuestaSeleccionada.value = respuesta;
};

// Navegación entre preguntas
const nextQuestion = () => {
  if (test.value.etiqueta === "Salud") {
    if (!respuestaNumerica.value) return;

    // Guardar respuesta y reiniciar input
    respuestasSalud.value[currentQuestion.value.id] = parseInt(
      respuestaNumerica.value
    );
    respuestaNumerica.value = "";

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      currentQuestion.value = test.value.preguntas[currentQuestionIndex.value];
    }
  } else {
    if (!respuestaSeleccionada.value) return;

    answers.value.push({
      preguntaId: currentQuestion.value.id,
      respuestaId: respuestaSeleccionada.value.id,
    });
    respuestaSeleccionada.value = null;

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      currentQuestion.value = test.value.preguntas[currentQuestionIndex.value];
    }
  }
};

// Finalizar test
const finishTest = async () => {
  try {
    if (test.value.etiqueta === 'Salud') {
      // Guardar última respuesta si existe
      if (respuestaNumerica.value) {
        respuestasSalud.value[currentQuestion.value.id] = parseInt(respuestaNumerica.value);
      }

      const { estado, deficiencias } = determinarEstadoFisicoYDeficiencias(respuestasSalud.value);
      const resultado = await $fetch(`${apiBaseUrl}/test/${testId.value}/resultados`, {
        method: 'POST',
        body: {
          respuestas: respuestasSalud.value,
          estado,
          deficiencias,
        },
      });

      // Redirigir con el testId como query parameter
      router.push({
        path: `/resultadoTest/${resultado.id}`,
        query: { testId: testId.value },
      });
    } else {
      if (respuestaSeleccionada.value) {
        answers.value.push({
          preguntaId: currentQuestion.value.id,
          respuestaId: respuestaSeleccionada.value.id,
        });
      }

      const resultado = await $fetch(`${apiBaseUrl}/test/${testId.value}/resultados`, {
        method: 'POST',
        body: { respuestas: answers.value },
      });

      // Redirigir con el testId como query parameter
      router.push({
        path: `/resultadoTest/${resultado.id}`,
        query: { testId: testId.value },
      });
    }
  } catch (error) {
    console.error("Error al enviar respuestas:", error);
    alert("Error al enviar respuestas. Inténtalo de nuevo.");
  }
};

// Función de evaluación para salud
const determinarEstadoFisicoYDeficiencias = (respuestas) => {
  const valores = {
    planchas: respuestas[1] || 0,
    abdominales: respuestas[2] || 0,
    resistencia: respuestas[3] || 0,
  };

  let puntaje = 0;
  let deficiencias = [];

  // Lógica de puntuación
  if (valores.planchas >= 30) puntaje += 2;
  else if (valores.planchas >= 20) puntaje += 1;
  else deficiencias.push("planchas");

  if (valores.abdominales >= 50) puntaje += 2;
  else if (valores.abdominales >= 30) puntaje += 1;
  else deficiencias.push("abdominales");

  if (valores.resistencia >= 30) puntaje += 2;
  else if (valores.resistencia >= 15) puntaje += 1;
  else deficiencias.push("resistencia");

  // Determinar estado final
  let estado;
  if (puntaje >= 6) estado = "Excelente estado físico";
  else if (puntaje >= 4) estado = "Buen estado físico";
  else if (puntaje >= 2) estado = "Estado regular";
  else estado = "Necesita mejorar";

  return { estado, deficiencias: deficiencias.join(", ") };
};
useHead({
  title: "Empezar Test - TestMaster",
  meta: [
    {
      name: "description",
      content: "Comenzar los test.",
    },
  ],
});
</script>
