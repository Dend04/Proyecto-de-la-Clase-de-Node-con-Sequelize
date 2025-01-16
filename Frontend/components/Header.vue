<template>
  <header class="header flex items-center justify-between p-4 bg-gray-100">
    <div class="flex items-center space-x-4">
      <div class="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
        <BellIcon class="h-5 w-5 text-gray-500" />
        <div class="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-teal-700 text-white rounded-full text-xs">
          1
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-xs leading-3 font-medium">{{ usuario.nombre }}</span>
        <span class="text-[10px] text-gray-500 text-right">{{ usuario.rol }}</span>
        <div v-if="isAuthenticated" class="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <NuxtImg src="/avatar.png" alt="Avatar" class="w-8 h-8 rounded-full" />
    </div>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Cerrar Sesión</button>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '@sidebase/nuxt-auth';

const auth = useAuth();
const usuario = ref({ nombre: '', rol: '' });
const isAuthenticated = ref(false);

// Función para obtener el estado del usuario
const fetchUsuario = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('/api/auth/estado', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    usuario.value = data.usuario;
    isAuthenticated.value = true;
  } catch (error) {
    console.error('Error al obtener estado del usuario:', error);
  }
};

// Función para cerrar sesión
const logout = async () => {
  try {
    await auth.logout();
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
    window.location.href = '/login';
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// Obtener el estado del usuario cuando el componente se monta
onMounted(() => {
  if (localStorage.getItem('authToken')) {
    fetchUsuario();
  }
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>