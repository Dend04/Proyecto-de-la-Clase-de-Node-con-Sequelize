<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-tr from-gray-200 to-gray-300">
    <!-- Header y Navbar (no se renderizan en las páginas de autenticación) -->
    <template v-if="!isAuthPage">
      <Header />
      <Navbar />
    </template>

    <!-- Contenido de la página -->
    <NuxtPage class="relative z-10" />

    <!-- Logo de fondo (solo en páginas no de autenticación) -->
    <NuxtImg
      v-if="!isAuthPage"
      class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] object-contain opacity-20 z-0 pointer-events-none"
      src="/logo.jpg"
      alt="Logo de fondo"
      format="webp"
    />
  </div>
</template>

<script setup>
import { useRoute } from '#app'; // Importa useRoute de Nuxt

const route = useRoute();
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/crearUsuario' || route.path === '/verificar-2fa';
});
</script>

<style scoped>
/* Asegúrate de que Tailwind CSS esté configurado en tu proyecto */
</style>