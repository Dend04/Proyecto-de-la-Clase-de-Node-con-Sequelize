<template>
  <div>
    <!-- Navbar Desplegable -->
    <div
      :class="[
        'bg-[#3c9a7d] h-screen fixed top-0 left-0 flex flex-col items-center p-5 transition-all duration-300 z-20',
        isNavbarOpen ? 'w-20 md:w-52' : 'w-5 md:w-13',
      ]"
    >
      <!-- Botón de Toggle: Cambia entre mostrar el título y el icono de menú -->
      <button
        @click="toggleNavbar"
        class="text-white text-xl mb-5 cursor-pointer"
      >
        <span v-if="isNavbarOpen">Health Testing</span>
        <MenuIcon v-else class="h-6 w-6" />
      </button>
      <!-- Lista de enlaces del Navbar -->
      <ul class="flex flex-col space-y-5">
        <!-- Enlace a Home -->
        <li>
          <NuxtLink
            to="/"
            class="text-white no-underline flex items-center"
            title="Home"
          >
            <HomeIcon class="h-5 w-5 mr-2" />
            <span v-if="isNavbarOpen" class="hidden md:inline">Home</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Test -->
        <li>
          <NuxtLink
            to="/test"
            class="text-white no-underline flex items-center"
            title="Test"
          >
            <BeakerIcon class="h-5 w-5 mr-2" />
            <span v-if="isNavbarOpen" class="hidden md:inline">Test</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Usuarios -->
        <li>
          <NuxtLink
            to="/usuarios"
            class="text-white no-underline flex items-center"
            title="Usuarios"
          >
            <UserIcon class="h-5 w-5 mr-2" />
            <span v-if="isNavbarOpen" class="hidden md:inline">Usuarios</span>
          </NuxtLink>
        </li>
        <!-- Enlace a Config -->
        <li>
          <NuxtLink
            to="/config"
            class="text-white no-underline flex items-center"
            title="Config"
          >
            <CogIcon class="h-5 w-5 mr-2" />
            <span v-if="isNavbarOpen" class="hidden md:inline">Config</span>
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