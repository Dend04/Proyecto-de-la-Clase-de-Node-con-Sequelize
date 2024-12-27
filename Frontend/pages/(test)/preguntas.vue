<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Preguntas del Test</h1>
    <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
      {{ error }}
    </div>
    <div v-else>
      <ul>
        <li v-for="pregunta in preguntas" :key="pregunta.id" class="mb-4">
          <div class="bg-white p-4 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold">{{ pregunta.titulo }}</h2>
            <p>{{ pregunta.descripcion }}</p>
          </div>
        </li>
      </ul>
    </div>
    <NuxtLink to="/test" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Volver a Tests
    </NuxtLink>
  </div>
</template>

<script setup>
// filepath: /d:/Mis proyectos VC/Proyecto-de-la-Clase-de-Node-con-Sequelize/Frontend/pages/(test)/[id]/index.vue
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const preguntas = ref([]);
const error = ref(null);

const fetchPreguntas = async () => {
  try {
    const response = await $fetch(`http://localhost:3000/api/preguntas/test/id/${route.params.id}`);
    preguntas.value = response;
    error.value = null;
  } catch (err) {
    error.value = 'No se pueden cargar las preguntas. Por favor, intente nuevamente.';
    console.error('Error al cargar las preguntas:', err);
  }
};

onMounted(() => {
  fetchPreguntas();
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>