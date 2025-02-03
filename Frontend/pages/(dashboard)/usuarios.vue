<template>
  <div class="pt-16 pl-20 md:pl-52 relative z-10">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Usuarios</h1>

    <!-- Mensaje de error -->
    <div v-if="error" class="max-w-2xl mx-auto mb-8">
      <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border-l-4 border-red-500">
        <div class="flex flex-col items-center text-center">
          <div class="mb-4">
            <svg class="h-16 w-16 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No se puede establecer conexión</h3>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button @click="retryConnection" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 active:scale-95">
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reintentar conexión
          </button>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay usuarios -->
    <div v-else-if="users.length === 0" class="text-center text-gray-600">
      No hay usuarios disponibles.
    </div>

    <!-- Tabla de usuarios -->
    <div v-else class="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50">
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Segundo Nombre</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Apellidos</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nombre de Usuario</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Peso</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Altura</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Enfermedad Crónica</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Estado Físico Actual</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition">
            <td class="py-3 px-4 border-b text-gray-700">{{ user.nombre }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.segundoNombre }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.apellidos }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.nombreUsuario }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.email }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.peso }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.altura }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.enfermedadCronica }}</td>
            <td class="py-3 px-4 border-b text-gray-700">{{ user.estadoFisicoActual }}</td>
            <td class="py-3 px-4 border-b text-gray-700 flex space-x-2">
              <button @click="editUser(user.id)" class="text-blue-500 hover:text-blue-600 transition">
                <PencilIcon class="h-5 w-5" />
              </button>
              <button @click="openDeleteModal(user.id)" class="text-red-500 hover:text-red-600 transition">
                <TrashIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div v-if="!error && users.length > 0" class="flex justify-center mt-8">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-[#3c9a7d] text-white rounded disabled:opacity-50">
        <ChevronLeftIcon class="h-5 w-5" />
      </button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="px-4 py-2 mx-1 cursor-pointer" :class="{ 'bg-[#3c9a7d] text-white rounded': currentPage === page }">
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-[#3c9a7d] text-white rounded disabled:opacity-50">
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Modal de confirmación para eliminar usuario -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro?</h2>
        <p class="text-gray-600 mb-6">Esta acción eliminará al usuario permanentemente. ¿Deseas continuar?</p>
        <div class="flex justify-end space-x-4">
          <button @click="closeDeleteModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            Cancelar
          </button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

const runtimeConfig = useRuntimeConfig();
const users = ref([]);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = 10;
const showDeleteModal = ref(false);
const userIdToDelete = ref(null);

const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No se encontró un token de autenticación.");
    users.value = await $fetch(`${apiBaseUrl}/usuarios`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    error.value = null;
  } catch (err) {
    error.value = "No se puede conectar con el servidor. Por favor, verifica que el servidor esté en funcionamiento.";
    console.error("Error:", err);
  }
};

const retryConnection = () => {
  fetchUsers();
};

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goToPage = (page) => {
  currentPage.value = page;
};

const editUser = (id) => {
  console.log(`Editar usuario con id: ${id}`);
};

const openDeleteModal = (id) => {
  userIdToDelete.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userIdToDelete.value = null;
};

const confirmDelete = async () => {
  if (userIdToDelete.value) {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No se encontró un token de autenticación.");
      await $fetch(`${apiBaseUrl}/usuario/${userIdToDelete.value}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      error.value = "No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.";
    } finally {
      closeDeleteModal();
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Estilos personalizados */
</style>