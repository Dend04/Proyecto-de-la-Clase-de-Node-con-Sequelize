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
        <!-- Enlace a Usuarios -->
        <li>
          <NuxtLink
            to="/usuarios"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Usuarios' : ''"
          >
            <UserIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Usuarios</span>
          </NuxtLink>
        </li>
           <!-- Enlace a Rutinas -->
          <!--  <li>
          <NuxtLink
            to="/rutinas"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Rutinas' : ''"
          >
            <ClipboardListIcon class="h-6 w-6" />
            <span v-if="isNavbarOpen" class="ml-2 text-sm">Rutinas</span>
          </NuxtLink>
        </li> -->
        <!-- Enlace a Config -->
        <li>
          <NuxtLink
            to="/config"
            class="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            :title="isNavbarOpen ? 'Config' : ''"
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
import {
  HomeIcon,
  BeakerIcon,
  CogIcon,
  MenuIcon,
  UserIcon,
  ClipboardListIcon, // Nuevo ícono para Rutinas
} from "@heroicons/vue/outline";

// Estado para controlar la visibilidad del Navbar
const isNavbarOpen = ref(true);

// Función para alternar la visibilidad del Navbar
function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

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
});
</script>

<style scoped>
/* Estilos personalizados */
</style>