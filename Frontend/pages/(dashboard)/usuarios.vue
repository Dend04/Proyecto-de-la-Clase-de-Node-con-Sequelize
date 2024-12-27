<template>
  <div class="pt-16 pl-20 md:pl-52 relative z-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Lista de Usuarios</h1>
    <div class="overflow-x-auto">
      <!-- Mostrar mensaje de error si no se puede conectar al servidor -->
      <div v-if="error" class="max-w-2xl mx-auto mb-8">
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border-l-4 border-red-500">
          <div class="flex flex-col items-center text-center">
            <div class="mb-4">
              <svg
                class="h-16 w-16 text-red-500 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              No se puede establecer conexión
            </h3>
            <p class="text-gray-600 mb-6">{{ error }}</p>
            <button
              @click="retryConnection"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 active:scale-95"
            >
              <svg
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reintentar conexión
            </button>
          </div>
        </div>
      </div>
      <!-- Mostrar mensaje si no hay usuarios disponibles -->
      <div v-else-if="users.length === 0" class="text-center text-gray-600">
        No hay usuarios disponibles.
      </div>
      <!-- Mostrar tabla de usuarios si hay usuarios disponibles -->
      <table v-else class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Nombre</th>
            <th class="py-2 px-4 border-b">Segundo Nombre</th>
            <th class="py-2 px-4 border-b">Apellidos</th>
            <th class="py-2 px-4 border-b">Nombre de Usuario</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Peso</th>
            <th class="py-2 px-4 border-b">Altura</th>
            <th class="py-2 px-4 border-b">Enfermedad Crónica</th>
            <th class="py-2 px-4 border-b">Estado Físico Actual</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-100 transition cursor-default">
            <td class="py-2 px-4 border-b text-black">{{ user.nombre }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.segundoNombre }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.apellidos }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.nombreUsuario }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.email }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.peso }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.altura }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.enfermedadCronica }}</td>
            <td class="py-2 px-4 border-b text-black">{{ user.estadoFisicoActual }}</td>
            <td class="py-2 px-4 border-b text-black flex space-x-2">
              <button @click="editUser(user.id)" class="text-blue-500 hover:underline relative group">
                <PencilIcon class="h-5 w-5" />
                <span class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Editar</span>
              </button>
              <button @click="deleteUser(user.id)" class="text-red-500 hover:underline relative group">
                <TrashIcon class="h-5 w-5" />
                <span class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Eliminar</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Mostrar paginación solo si hay usuarios disponibles -->
    <div v-if="!error && users.length > 0" class="flex justify-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-[#3c9a7d] text-white rounded disabled:opacity-50">
        <ChevronLeftIcon class="h-5 w-5" />
      </button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="px-4 py-2 mx-1 cursor-pointer" :class="{'bg-[#3c9a7d] text-white rounded': currentPage === page}">
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-[#3c9a7d] text-white rounded disabled:opacity-50">
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
// Importar funciones y componentes necesarios
import { ref, computed, onMounted } from 'vue';
import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline';

// Definir variables reactivas para usuarios y errores
const users = ref([]);
const error = ref(null);

// Función para obtener usuarios desde la API
const fetchUsers = async () => {
  try {
    users.value = await $fetch('http://localhost:3000/api/usuarios');
    error.value = null;
  } catch (err) {
    error.value = "No se puede conectar con el servidor. Por favor, verifica que el servidor esté en funcionamiento.";
    console.error("Error:", err);
  }
};

// Función para reintentar la conexión
const retryConnection = () => {
  fetchUsers();
};

// Definir variables reactivas para la paginación
const currentPage = ref(1);
const itemsPerPage = 10;

// Computar los usuarios paginados
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.slice(start, end);
});

// Computar el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage);
});

// Función para ir a la página siguiente
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Función para ir a la página anterior
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Función para ir a una página específica
function goToPage(page) {
  currentPage.value = page;
}

// Función para editar un usuario
function editUser(id) {
  console.log(`Editar usuario con id: ${id}`);
}

// Función para eliminar un usuario
function deleteUser(id) {
  console.log(`Eliminar usuario con id: ${id}`);
}

// Obtener usuarios cuando el componente se monta
onMounted(() => {
  fetchUsers();
});
</script>