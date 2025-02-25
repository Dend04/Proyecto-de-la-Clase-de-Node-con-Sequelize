<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col"
  >
    <!-- Contenido principal -->
    <div
      :class="[
        'flex-grow flex flex-col items-center justify-start mt-8 relative transition-all duration-300',
        isNavbarOpen ? 'ml-20 md:ml-52' : 'ml-16', // Ajusta el margen según el estado del Navbar
      ]"
    >
      <div class="relative w-full max-w-6xl mx-auto px-6 py-12">
        <!-- Título -->
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-800 mb-12 tracking-tight text-center"
        >
          Tests Disponibles
        </h1>

        <!-- Estado de error -->
        <div v-if="error" class="max-w-2xl mx-auto mb-8">
          <div class="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
            {{ error }}
          </div>
        </div>

        <!-- Mensaje cuando no hay tests -->
        <div
          v-if="!error && tests.length === 0"
          class="flex justify-center items-center h-full"
        >
          <p class="text-gray-600 text-center">No hay tests disponibles.</p>
        </div>

        <!-- Grid de tests -->
        <div v-if="!error && tests.length > 0" class="relative">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            <div
              v-for="test in tests"
              :key="test.id"
              :class="[
                'bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative border border-gray-100',
                test.incompleto ? 'border-2 border-red-500' : '',
              ]"
            >
              <!-- Indicador de test incompleto -->
              <div
                v-if="test.incompleto"
                class="absolute top-2 left-2 text-red-500"
              >
                <span class="text-sm font-semibold">Test Incompleto</span>
              </div>

              <!-- Botones de editar, borrar y visualizar -->
              <div class="absolute top-2 right-2 flex space-x-2"
              v-if="userRole === 'administrador'">
                <NuxtLink
                  :to="`/editarTest/${test.id}`"
                  class="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon class="h-5 w-5" />
                </NuxtLink>
                <button
                  @click="borrarTest(test.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
                <NuxtLink
                  :to="`/visualizarPreguntas/${test.id}`"
                  class="text-green-500 hover:text-green-700"
                >
                  <EyeIcon class="h-5 w-5" />
                </NuxtLink>
              </div>

              <!-- Información del test -->
              <div class="flex flex-col h-full space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">
                  {{ test.titulo }}
                </h2>
                <p v-if="test.descripcion" class="text-gray-600 flex-grow">
                  {{ test.descripcion }}
                </p>
                <p v-if="test.duracion" class="text-gray-500">
                  Duración: {{ test.duracion }} minutos
                </p>
                <p v-if="test.dificultad" class="text-gray-500">
                  Dificultad: {{ test.dificultad }}
                </p>
                <div class="flex items-center mt-2">
                  <span v-if="test.etiqueta === 'Salud'" class="text-green-500">
                    <HeartIcon class="h-5 w-5 inline-block mr-1" />
                  </span>
                  <span
                    v-if="test.etiqueta === 'Conocimiento'"
                    class="text-yellow-500"
                  >
                    <LightBulbIcon class="h-5 w-5 inline-block mr-1" />
                  </span>
                  <span v-if="test.etiqueta === 'Idioma'" class="text-blue-500">
                    <GlobeAltIcon class="h-5 w-5 inline-block mr-1" />
                  </span>
                  <p class="text-gray-500">{{ test.etiqueta }}</p>
                </div>
                <NuxtLink
                  :to="`/empezarTests/${test.id}`"
                  class="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                >
                  Comenzar Test
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón flotante para crear test -->
    <NuxtLink
    v-if="userRole === 'administrador'"
      to="/crearTest"
      class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:shadow-outline"
    >
      <PlusIcon class="h-6 w-6" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  HeartIcon,
  LightBulbIcon,
  GlobeAltIcon,
} from "@heroicons/vue/outline";
import { useRoute } from "#app";
import { jwtDecode } from "jwt-decode";


const userRole = ref(null)
const tests = ref([]);
const error = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const route = useRoute();
const isAuthPage = computed(() => {
  return (
    route.path === "/login" ||
    route.path === "/crearUsuario" ||
    route.path === "/verificar-2fa"
  );
});
const isNavbarOpen = ref(true); // Estado del Navbar (abierto o cerrado)

const fetchTests = async () => {
  try {
    const testsData = await $fetch(`${apiBaseUrl}/tests`);

    for (const test of testsData) {
      try {
        const preguntasConEstado = await $fetch(
          `${apiBaseUrl}/preguntas-con-respuestas/test/${test.id}`
        );

        // Verificar si alguna pregunta está incompleta
        const tienePreguntasIncompletas = preguntasConEstado.some(
          (pregunta) => !pregunta.completa
        );

        test.incompleto = tienePreguntasIncompletas;
      } catch (err) {
        console.error(
          `Error al obtener preguntas para el test ${test.id}:`,
          err
        );
        test.incompleto = true;
      }
    }

    tests.value = testsData;
    error.value = null;
  } catch (err) {
    error.value =
      "No se puede conectar con el servidor. Por favor, verifica que el servidor esté en funcionamiento.";
    console.error("Error al obtener los tests:", err);
  }
};

const retryConnection = () => {
  fetchTests();
};

const borrarTest = async (id) => {
  if (userRole.value !== 'administrador') {
    alert('No tienes permisos para esta acción');
    return;
  }
  
  try {
    await $fetch(`${apiBaseUrl}/test/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    fetchTests();
  } catch (err) {
    console.error("Error al borrar el test:", err);
  }
};

const obtenerRolUsuario = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole.value = decoded.rol.toLowerCase(); // Normaliza a minúsculas
    } catch (error) {
      console.error("Error decodificando token:", error);
      userRole.value = null;
    }
  }
};
onMounted(() => {
  fetchTests();
  obtenerRolUsuario();
});
useHead({
  title: "Lista de test - TestMaster",
  meta: [
    {
      name: "description",
      content: "Lista de todos los test para realizar.",
    },
  ],
});
</script>

<style scoped>
/* Estilos personalizados */
</style>
