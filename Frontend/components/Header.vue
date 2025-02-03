<template>
  <div
    class="fixed top-0 right-0 w-[calc(100%-5rem)] md:w-[calc(100%-13rem)] flex items-center justify-between p-4 bg-white shadow-sm z-30"
  >
    <!-- Barra de búsqueda -->
    <div
      class="hidden md:flex items-center gap-2 text-sm rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
    >
      <SearchIcon class="h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar..."
        class="w-48 bg-transparent outline-none placeholder:text-gray-400"
      />
    </div>

    <!-- Usuarios e iconos -->
    <div class="flex items-center gap-4">
      <!-- Botón de cerrar sesión -->
      <button
        v-if="userName !== 'Inicio'"
        @click="handleLogout"
        class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
      >
        <LogoutIcon class="h-5 w-5" />
        <span>Cerrar sesión</span>
      </button>

      <!-- Nombre del usuario o botón de inicio -->
      <NuxtLink
        v-if="!accessToken"
        to="/login"
        class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
      >
        <UserIcon class="h-5 w-5" />
        <span>Iniciar sesión</span>
      </NuxtLink>

      <!-- Perfil del usuario -->
      <button
        v-else
        @click="showProfileModal = true"
        class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
      >
        <NuxtImg
          :src="
            userProfile.fotoPerfil
              ? `${backendUrl}/uploads/fotosPerfil/${userProfile.fotoPerfil}`
              : '/avatar.png'
          "
          alt="Avatar"
          width="32"
          height="32"
          class="rounded-full"
          format="webp"
        />
        <span>{{ userName }}</span>
      </button>
    </div>

    <!-- Modal del perfil -->
    <div
      v-if="showProfileModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click.self="showProfileModal = false"
    >
      <div
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
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
  UserIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { navigateTo } from "#app";
import { jwtDecode } from "jwt-decode";

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.BACKEND_URL;
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
  fotoPerfil: "",
});
const accessToken = ref(null);
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

<style scoped>
/* Estilos personalizados */
</style>
