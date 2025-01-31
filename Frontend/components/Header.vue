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
      <!-- Botón de cerrar sesión -->
      <button
        v-if="userName !== 'Inicio'"
        @click="handleLogout"
        class="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        <LogoutIcon class="h-4 w-4" />
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
      <!-- Mostrar foto de perfil si está disponible, de lo contrario mostrar la imagen por defecto -->
      <NuxtImg
        v-else
        :src="userProfile.fotoPerfil || '/avatar.png'"
        alt="Avatar"
        width="36"
        height="36"
        class="rounded-full"
        format="webp"
      />
    </div>

    <!-- Modal del perfil -->
    <div
      v-if="showProfileModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click.self="showProfileModal = false"
    >
      <div
        class="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto z-50"
      >
        <button
          @click="showProfileModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon class="h-5 w-5" />
        </button>
        <h2 class="text-xl font-semibold mb-4">Perfil de Usuario</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.nombre }}</p>
          </div>
          <div v-if="userProfile.segundoNombre">
            <label class="block text-sm font-medium text-gray-700"
              >Segundo Nombre</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.segundoNombre }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Apellidos</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.apellidos }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nombre de Usuario</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.nombreUsuario }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Correo Electrónico</label
            >
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Peso</label>
            <p class="mt-1 text-sm text-gray-900">{{ userProfile.peso }} kg</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Altura</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.altura }} cm
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Enfermedad Crónica</label
            >
            <p class="mt-1 text-sm text-gray-900">
              {{ userProfile.enfermedadCronica || "No especificado" }}
            </p>
          </div>
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
import { ref, onMounted } from "vue";
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  UserIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { navigateTo } from "#app";
import { jwtDecode } from 'jwt-decode';

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.BACKEND_URL;
const props = defineProps({
  redirectToLogin: {
    type: Boolean,
    default: false,
  },
});
const userName = ref("Inicio");
const userRole = ref("Admin");
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
  fotoPerfil: "", // Añadimos el campo fotoPerfil
});
const accessToken = ref(null);
const refreshToken = ref(null);
const showProfileModal = ref(false);

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await fetch(`${backendUrl}/refrescarToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const { token } = await response.json();
    localStorage.setItem("accessToken", token);
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const getValidToken = async () => {
  let token = localStorage.getItem("accessToken");
  if (isTokenExpired(token)) {
    token = await refreshAccessToken();
  }
  return token;
};

const obtenerPerfil = async () => {
  try {
    const token = await getValidToken();
    const response = await fetch(`${backendUrl}/perfil`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch profile");

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
      fotoPerfil: usuario.fotoPerfil || "",
    };
    userName.value = usuario.nombreUsuario;
    userRole.value = usuario.rol;
  } catch (error) {
    console.error("Error:", error.message);
    navigateTo("/login");
  }
};

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  navigateTo("/login");
};

onMounted(async () => {
  try {
    const token = await getValidToken();
    if (token) {
      accessToken.value = token;
      await obtenerPerfil();
    }
  } catch (error) {
    console.error("Error:", error.message);
    navigateTo("/login");
  }
});
</script>