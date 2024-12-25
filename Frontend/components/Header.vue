<template>
  <!-- Header -->
  <div
    class="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#eaebef] to-[#aab2b5] shadow-md z-10 transition-all duration-300"
  >
    <!-- Barra de búsqueda -->
    <div
      class="hidden md:flex items-center gap-2 text-xs rounded-full ring-1.5 ring-gray-300 px-2 ml-auto"
    >
      <SearchIcon class="h-5 w-5 text-gray-500" />

      <input
        type="text"
        placeholder="Buscar..."
        class="w-48 p-2 bg-transparent outline-none"
      />
    </div>
    <!-- Usuarios e iconos -->
    <div class="flex items-center gap-6 ml-auto">
      <div
        class="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
      >
        <!--  <NuxtImg
          src="/message.png"
          alt="Mensajes"
          width="20"
          height="20"
          format="webp"
        /> -->
        <ChatIcon class="h-5 w-5 text-gray-500" />
      </div>
      <div
        class="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
      >
        <!--   <NuxtImg
          src="/announcement.png"
          alt="Anuncios"
          width="20"
          height="20"
          format="webp"
        /> -->
        <BellIcon class="h-5 w-5 text-gray-500" />
        <div
          class="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-teal-700 text-white rounded-full text-xs"
        >
          1
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-xs leading-3 font-medium">Dairon Enamorado</span>
        <span class="text-[10px] text-gray-500 text-right">Admin</span>
      </div>
       <NuxtImg
        src="/avatar.png"
        alt="Avatar"
        width="36"
        height="36"
        class="rounded-full"
        format="webp"
      /> 
      <!-- <UserIcon class="h-7 w-7 text-gray-500" /> --> 
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { 
  SearchIcon, 
  BellIcon, 
  ChatIcon,
  UserIcon } from "@heroicons/vue/outline";

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
