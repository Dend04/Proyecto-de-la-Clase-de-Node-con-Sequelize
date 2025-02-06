<template>
  <div>
    <!-- Navbar Desplegable -->
    <div
      :class="[
        'bg-white h-screen fixed top-0 left-0 flex flex-col items-center p-5 transition-all duration-300 z-20 shadow-lg',
        isNavbarOpen ? 'w-20 md:w-52' : 'w-16',
      ]"
    >
      <!-- Botón de Toggle -->
      <button
        @click="toggleNavbar"
        class="text-gray-700 hover:text-gray-900 transition-colors mb-8"
      >
        <MenuIcon v-if="!isNavbarOpen" class="h-6 w-6" />
        <span v-else class="text-xl font-semibold text-gray-800"
          >TestMaster</span
        >
      </button>

      <!-- Lista de enlaces del Navbar -->
      <ul class="flex flex-col space-y-4 w-full">
        <!-- Enlace a Home -->
        <li>
          <NuxtLink
            to="/"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Home' : ''"
          >
            <HomeIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Home</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Test -->
        <li>
          <NuxtLink
            to="/test"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Test' : ''"
          >
            <BeakerIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Test</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Usuarios (solo para administradores) -->
        <li v-if="userRole === 'administrador'">
          <NuxtLink
            to="/usuarios"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Usuarios' : ''"
          >
            <UserIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Usuarios</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Config -->
        <li>
          <NuxtLink
            to="/config"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Config' : ''"
            @click="handleConfigClick"
          >
            <CogIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Config</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import {
  HomeIcon,
  BeakerIcon,
  CogIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/vue/outline";

// Estado para controlar la visibilidad del Navbar
const isNavbarOpen = ref(true);
const userRole = ref(""); // Rol del usuario

// Función para alternar la visibilidad del Navbar
function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

// Obtener el rol del usuario desde el token
const getUserRole = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decoded = jwtDecode(token);
    userRole.value = decoded.rol; // Asignar el rol del usuario
  }
};

// Función para manejar el clic en el enlace de Config
const handleConfigClick = () => {
  const last2FATime = localStorage.getItem("last2FATime");
  const currentTime = Date.now();

  // Verificar si el 2FA está activado y si han pasado más de 30 segundos
  if (userRole.value.estaVerificado2FA) {
    if (!last2FATime || currentTime - last2FATime > 10000) {
      navigateTo("/verificar-2fa");
    } else {
      navigateTo("/config");
    }
  } else {
    navigateTo("/config");
  }
};

// Ajustar la visibilidad del Navbar según el tamaño de la pantalla
onMounted(() => {
  const updateNavbarVisibility = () => {
    if (window.innerWidth < 768) {
      isNavbarOpen.value = false;
    } else {
      isNavbarOpen.value = true;
    }
  };
  window.addEventListener("resize", updateNavbarVisibility);
  updateNavbarVisibility();

  // Obtener el rol del usuario al cargar el componente
  getUserRole();
});
</script>

<style scoped>
/* Estilos personalizados */
</style>