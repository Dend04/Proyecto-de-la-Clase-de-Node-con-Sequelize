<template>
    <div class="pt-16 pl-20 md:pl-52 relative z-20">
      <h1 class="text-2xl font-bold mb-4 text-center">Lista de Usuarios</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
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
      <div class="flex justify-center mt-4">
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
  import { ref, computed, onMounted } from 'vue';
  import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline';
  
  const users = ref([
    { id: 1, nombre: 'Juan', apellidos: 'Pérez García', segundoNombre: 'Antonio', nombreUsuario: 'juanperez123', email: 'juan.perez@ejemplo.com', peso: 75.5, altura: 175.5, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 2, nombre: 'María', apellidos: 'López Martínez', segundoNombre: 'Isabel', nombreUsuario: 'marialopez456', email: 'maria.lopez@ejemplo.com', peso: 65.0, altura: 165.0, enfermedadCronica: 'Diabetes', estadoFisicoActual: 'Moderado' },
    { id: 3, nombre: 'Carlos', apellidos: 'Sánchez Fernández', segundoNombre: 'Javier', nombreUsuario: 'carlossanchez789', email: 'carlos.sanchez@ejemplo.com', peso: 80.0, altura: 180.0, enfermedadCronica: 'Hipertensión', estadoFisicoActual: 'Activo' },
    { id: 4, nombre: 'Ana', apellidos: 'Gómez Ruiz', segundoNombre: 'María', nombreUsuario: 'anagomez123', email: 'ana.gomez@ejemplo.com', peso: 55.0, altura: 160.0, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 5, nombre: 'Luis', apellidos: 'Martínez Pérez', segundoNombre: 'Fernando', nombreUsuario: 'luismartinez456', email: 'luis.martinez@ejemplo.com', peso: 85.0, altura: 170.0, enfermedadCronica: 'Asma', estadoFisicoActual: 'Moderado' },
    { id: 6, nombre: 'Laura', apellidos: 'Fernández López', segundoNombre: 'Isabel', nombreUsuario: 'laurafernandez789', email: 'laura.fernandez@ejemplo.com', peso: 60.0, altura: 165.0, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 7, nombre: 'Pedro', apellidos: 'García Sánchez', segundoNombre: 'José', nombreUsuario: 'pedrogarcia123', email: 'pedro.garcia@ejemplo.com', peso: 90.0, altura: 180.0, enfermedadCronica: 'Hipertensión', estadoFisicoActual: 'Moderado' },
    { id: 8, nombre: 'Marta', apellidos: 'López García', segundoNombre: 'Ana', nombreUsuario: 'martalopez456', email: 'marta.lopez@ejemplo.com', peso: 70.0, altura: 170.0, enfermedadCronica: 'Diabetes', estadoFisicoActual: 'Activo' },
    { id: 9, nombre: 'Jorge', apellidos: 'Pérez Fernández', segundoNombre: 'Luis', nombreUsuario: 'jorgeperez789', email: 'jorge.perez@ejemplo.com', peso: 75.0, altura: 175.0, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 10, nombre: 'Sofía', apellidos: 'Martínez Ruiz', segundoNombre: 'María', nombreUsuario: 'sofiamartinez123', email: 'sofia.martinez@ejemplo.com', peso: 65.0, altura: 160.0, enfermedadCronica: 'Asma', estadoFisicoActual: 'Moderado' },
    { id: 11, nombre: 'David', apellidos: 'Gómez López', segundoNombre: 'Fernando', nombreUsuario: 'davidgomez456', email: 'david.gomez@ejemplo.com', peso: 80.0, altura: 175.0, enfermedadCronica: 'Hipertensión', estadoFisicoActual: 'Activo' },
    { id: 12, nombre: 'Elena', apellidos: 'Fernández García', segundoNombre: 'Isabel', nombreUsuario: 'elenafernandez789', email: 'elena.fernandez@ejemplo.com', peso: 55.0, altura: 160.0, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 13, nombre: 'Raúl', apellidos: 'Sánchez Pérez', segundoNombre: 'José', nombreUsuario: 'raulsanchez123', email: 'raul.sanchez@ejemplo.com', peso: 85.0, altura: 180.0, enfermedadCronica: 'Diabetes', estadoFisicoActual: 'Moderado' },
    { id: 14, nombre: 'Patricia', apellidos: 'López Ruiz', segundoNombre: 'Ana', nombreUsuario: 'patricialopez456', email: 'patricia.lopez@ejemplo.com', peso: 60.0, altura: 165.0, enfermedadCronica: 'Ninguna', estadoFisicoActual: 'Activo' },
    { id: 15, nombre: 'Alberto', apellidos: 'García Martínez', segundoNombre: 'Luis', nombreUsuario: 'albertogarcia789', email: 'alberto.garcia@ejemplo.com', peso: 90.0, altura: 170.0, enfermedadCronica: 'Hipertensión', estadoFisicoActual: 'Moderado' },
  ]);
  
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(users.value.length / itemsPerPage);
  });
  
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }
  
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  
  function goToPage(page) {
    currentPage.value = page;
  }
  
  function editUser(id) {
    // Lógica para editar el usuario
    console.log(`Editar usuario con id: ${id}`);
  }
  
  function deleteUser(id) {
    // Lógica para eliminar el usuario
    console.log(`Eliminar usuario con id: ${id}`);
  }
  
  onMounted(async () => {
    try {
      // Descomenta la siguiente línea para obtener los usuarios desde la API
      // users.value = await $fetch('/api/usuarios');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  });
  </script>