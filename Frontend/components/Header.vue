<template>
  <div
    class="fixed top-0 right-0 w-[calc(100%-5rem)] md:w-[calc(100%-13rem)] flex items-center justify-between p-4 bg-gradient-to-r from-[#eaebef] to-[#aab2b5] shadow-md z-30 transition-all duration-300"
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
        <ChatIcon class="h-5 w-5 text-gray-500" />
      </div>
      <div
        class="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
      >
        <BellIcon class="h-5 w-5 text-gray-500" />
        <div
          class="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-teal-700 text-white rounded-full text-xs"
        >
          1
        </div>
      </div>
      <!-- Botón de cerrar sesión (solo se muestra si hay un nombre de usuario) -->
      <button
        v-if="userName !== 'Inicio'"
        @click="handleLogout"
        class="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        <LogoutIcon class="h-4 w-4" />
        <!-- Ícono de cierre de sesión -->
        <span>Cerrar sesión</span>
      </button>
      <!-- Nombre del usuario o botón de inicio -->
      <NuxtLink
        v-if="!accessToken"
        to="/login"
        class="flex flex-col cursor-pointer hover:underline"
        @click="redirectToLogin"
      >
        <span class="text-xs leading-3 font-medium">Iniciar o</span>
        <span class="text-[10px] text-gray-500 text-right">Crear sesión</span>
      </NuxtLink>
      <button
        v-else
        @click="showProfileModal = true"
        class="flex flex-col cursor-pointer hover:underline"
      >
        <span class="text-xs leading-3 font-medium">{{ userName }}</span>
        <span class="text-[10px] text-gray-500 text-right">{{ userRole }}</span>
      </button>
      <!-- Avatar o botón de login -->
      <NuxtLink
        v-if="!accessToken"
        to="/login"
        class="cursor-pointer"
        @click="redirectToLogin"
      >
        <UserIcon class="h-7 w-7 text-gray-500 hover:text-gray-700" />
      </NuxtLink>
      <NuxtImg
        v-else
        src="/avatar.png"
        alt="Avatar"
        width="36"
        height="36"
        class="rounded-full"
        format="webp"
      />
    </div>

    <!-- Fondo oscuro semitransparente -->
    <div
      v-if="showProfileModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click.self="showProfileModal = false"
    >
      <!-- Modal del perfil -->
      <div
        class="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto z-50"
      >
        <!-- Botón de cierre (cruz) -->
        <button
          @click="showProfileModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon class="h-5 w-5" />
        </button>
        <!-- Contenido del perfil -->
        <h2 class="text-xl font-semibold mb-4">Perfil de Usuario</h2>
        <div class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.nombre }}</p>
          </div>
          <!-- Segundo nombre (solo si existe) -->
          <div v-if="userProfile.segundoNombre">
            <label class="block text-sm font-medium text-gray-700"
              >Segundo Nombre</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.segundoNombre }}
            </p>
          </div>
          <!-- Apellidos -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Apellidos</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.apellidos }}
            </p>
          </div>
          <!-- Nombre de usuario -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nombre de Usuario</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.nombreUsuario }}
            </p>
          </div>
          <!-- Correo electrónico -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Correo Electrónico</label
            >
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.email }}</p>
          </div>
          <!-- Peso -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Peso</label>
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.peso }} kg</p>
          </div>
          <!-- Altura -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Altura</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.altura }} cm
            </p>
          </div>
          <!-- Enfermedad crónica -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Enfermedad Crónica</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.enfermedadCronica || "No especificado" }}
            </p>
          </div>
          <!-- Estado físico actual -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Estado Físico Actual</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.estadoFisicoActual || "No especificado" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  UserIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/vue/outline"; // Importa XIcon
import { navigateTo } from "#app"; // Importa navigateTo de Nuxt

// Estado para el nombre del usuario
const userName = ref("Inicio");

// Estado para el rol del usuario
const userRole = ref("Admin"); // Valor por defecto

// Estado para el perfil del usuario
const userProfile = ref({
  nombre: "",
  segundoNombre: "",
  apellidos: "",
  nombreUsuario: "",
  email: "",
  peso: "",
  altura: "",
  enfermedadCronica: "",
  estadoFisicoActual: "",
});

// Estado para el token de acceso
const accessToken = ref(null);

// Estado para controlar la visibilidad del modal del perfil
const showProfileModal = ref(false);

// Estado para controlar la visibilidad del header
const isHeaderVisible = ref(true);

// Referencia al header
const header = ref(null);

// Variables para detectar el scroll
let lastScrollTop = 0;

// Función para manejar el scroll
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo: ocultar el header
    isHeaderVisible.value = false;
  } else {
    // Scroll hacia arriba: mostrar el header
    isHeaderVisible.value = true;
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evitar valores negativos
};

// Añadir el evento de scroll al montar el componente
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Eliminar el evento de scroll al desmontar el componente
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Función para redirigir a login
const redirectToLogin = () => {
  navigateTo("/login");
};

// Función para manejar el cierre de sesión
const handleLogout = () => {
  // Eliminar los tokens del localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Recargar la página para actualizar el estado
  window.location.reload();
};

// Función para obtener el perfil del usuario
const obtenerPerfil = async () => {
  try {
    const backendUrl = "http://localhost:3000/api"; // URL del backend
    const response = await fetch(`${backendUrl}/perfil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.value}`, // Enviar el token en el header
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el perfil del usuario");
    }

    const usuario = await response.json();
    userProfile.value = {
      nombre: usuario.nombre,
      segundoNombre: usuario.segundoNombre,
      apellidos: usuario.apellidos,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      peso: usuario.peso,
      altura: usuario.altura,
      enfermedadCronica: usuario.enfermedadCronica,
      estadoFisicoActual: usuario.estadoFisicoActual,
    };
    userName.value = usuario.nombreUsuario; // Actualizar el nombre del usuario
    userRole.value = usuario.rol; // Actualizar el rol del usuario
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Al cargar el componente, verificar si hay un token y obtener el perfil
onMounted(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    accessToken.value = token;
    obtenerPerfil(); // Obtener el perfil del usuario
  }
});
</script>
