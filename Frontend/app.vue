<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#aab2b5] to-[#eaebef]">
    <!-- Verifica si la ruta actual no es '/login' o '/crearUsuario' -->
    <Header v-if="!isAuthPage" />
    <Navbar v-if="!isAuthPage" class="z-20" />
    <NuxtPage class="relative z-10" />
    <!-- Logo -->
    <NuxtImg
      v-if="!isAuthPage"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] object-contain opacity-50 z-0 pointer-events-none"
      src="/logo.jpg"
      alt="Logo de fondo"
      format="webp"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isAuthPage = route.path === '/login' || route.path === '/crearUsuario';
</script>