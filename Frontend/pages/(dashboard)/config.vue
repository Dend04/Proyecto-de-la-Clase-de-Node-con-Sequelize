<template>
  <div class="min-h-screen bg-gradient-to-tr from-[#aab2b5] to-[#eaebef] py-8">
    <!-- Contenedor principal -->
    <div
      class="max-w-2xl mx-4 md:mx-auto bg-white p-6 rounded-lg shadow-md mt-10 md:mt-20"
    >
      <!-- Mensaje si no hay token -->
      <div v-if="!accessToken" class="text-center">
        <p class="text-red-500 text-lg font-semibold">
          Debe autenticarse primero.
        </p>
        <NuxtLink to="/login" class="text-blue-500 hover:underline">
          Ir a la página de inicio de sesión
        </NuxtLink>
      </div>

      <!-- Contenido si hay token -->
      <div v-else>
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
          Configuración de la Cuenta
        </h1>

        <!-- Sección de 2FA -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-700">
            Autenticación de Dos Factores (2FA)
          </h2>

          <!-- Estado actual del 2FA -->
          <div class="flex items-center justify-between">
            <p class="text-gray-600">
              {{ is2FAEnabled ? "2FA habilitado" : "2FA deshabilitado" }}
            </p>
            <!-- Toggle Switch -->
            <button
              @click="toggle2FA"
              :class="{
                'bg-blue-500': is2FAEnabled,
                'bg-gray-300': !is2FAEnabled,
              }"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="{
                  'translate-x-6': is2FAEnabled,
                  'translate-x-1': !is2FAEnabled,
                }"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Configuración de 2FA -->
          <div v-if="!is2FAEnabled && qrCodeUrl" class="mt-4 space-y-4">
            <p class="text-gray-700">
              Escanea el siguiente código QR con tu aplicación de autenticación:
            </p>
            <img :src="qrCodeUrl" alt="Código QR para 2FA" class="mx-auto" />
            <p class="text-gray-700">
              O introduce manualmente el siguiente código:
            </p>
            <pre class="bg-gray-100 p-4 rounded-md text-sm text-gray-800">{{
              secret2FA
            }}</pre>
            <input
              v-model="otp"
              placeholder="Introduce el código OTP"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="verificar2FA"
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Verificar 2FA
            </button>
          </div>
        </div>

        <!-- Sección de Cambiar Contraseña -->
        <div class="space-y-6 mt-8">
          <h2 class="text-xl font-semibold text-gray-700">
            Cambiar Contraseña
          </h2>

          <!-- Estado actual del cambio de contraseña -->
          <div class="flex items-center justify-between">
            <p class="text-gray-600">
              {{
                mostrarCambiarContrasena
                  ? "Cambiar contraseña activado"
                  : "Cambiar contraseña desactivado"
              }}
            </p>
            <!-- Toggle Switch -->
            <button
              @click="toggleCambiarContrasena"
              :class="{
                'bg-blue-500': mostrarCambiarContrasena,
                'bg-gray-300': !mostrarCambiarContrasena,
              }"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="{
                  'translate-x-6': mostrarCambiarContrasena,
                  'translate-x-1': !mostrarCambiarContrasena,
                }"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Campos para cambiar contraseña -->
          <div v-if="mostrarCambiarContrasena" class="mt-4 space-y-4">
            <!-- Contraseña actual -->
            <div class="relative">
              <input
                v-model="contrasenaActual"
                :type="mostrarContrasenaActual ? 'text' : 'password'"
                placeholder="Contraseña actual"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="mostrarContrasenaActual = !mostrarContrasenaActual"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <component
                  :is="mostrarContrasenaActual ? EyeOffIcon : EyeIcon"
                  class="h-5 w-5"
                />
              </button>
            </div>

            <!-- Nueva contraseña -->
            <div class="relative">
              <input
                v-model="nuevaContrasena"
                :type="mostrarNuevaContrasena ? 'text' : 'password'"
                placeholder="Nueva contraseña"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="mostrarNuevaContrasena = !mostrarNuevaContrasena"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <component
                  :is="mostrarNuevaContrasena ? EyeOffIcon : EyeIcon"
                  class="h-5 w-5"
                />
              </button>
            </div>

            <!-- Confirmar nueva contraseña -->
            <div class="relative">
              <input
                v-model="confirmarContrasena"
                :type="mostrarConfirmarContrasena ? 'text' : 'password'"
                placeholder="Confirmar nueva contraseña"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="
                  mostrarConfirmarContrasena = !mostrarConfirmarContrasena
                "
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <component
                  :is="mostrarConfirmarContrasena ? EyeOffIcon : EyeIcon"
                  class="h-5 w-5"
                />
              </button>
            </div>
            <div class="mt-2">
              <p
                :class="{
                  'text-green-500': contrasenaValida,
                  'text-red-500': !contrasenaValida,
                }"
              >
                {{
                  contrasenaValida
                    ? "La contraseña es válida"
                    : "La contraseña debe tener al menos 8 caracteres"
                }}
              </p>
            </div>

           
            <button
              @click="cambiarContrasena"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode"; // Importar jwt-decode para decodificar el token
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/outline";

// Estado del componente
const qrCodeUrl = ref("");
const secret2FA = ref("");
const otp = ref("");
const is2FAEnabled = ref(false);
const mostrarCambiarContrasena = ref(false); // Estado para mostrar/ocultar campos de cambio de contraseña
const contrasenaActual = ref("");
const nuevaContrasena = ref("");
const confirmarContrasena = ref("");
const accessToken = ref(null); // Token de acceso
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const cambiandoContrasena = ref(false); // Estado para deshabilitar el botón
const mostrarContrasenaActual = ref(false); // Estado para contraseña actual
const mostrarNuevaContrasena = ref(false); // Estado para nueva contraseña
const mostrarConfirmarContrasena = ref(false); // Estado para confirmar contraseña // Estado para mostrar/ocultar contraseña

// Función para decodificar el token y obtener el userId
const obtenerUserIdDesdeToken = () => {
  if (!accessToken.value) return null;
  try {
    const decodedToken = jwtDecode(accessToken.value); // Decodificar el token
    return decodedToken.id; // Extraer el userId del payload del token
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Verificar el token al cargar la página
onMounted(() => {
  accessToken.value = localStorage.getItem("accessToken");
  if (accessToken.value) {
    verificarEstado2FA();
  }
});

// Función para habilitar o deshabilitar 2FA
const toggle2FA = async () => {
  if (is2FAEnabled.value) {
    await deshabilitar2FA();
  } else {
    await habilitar2FA();
  }
  await verificarEstado2FA(); // Verificar el estado después de cambiar
};

// Función para habilitar 2FA
const habilitar2FA = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/habilitar-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      qrCodeUrl.value = data.qrCodeUrl;
      secret2FA.value = data.secret;
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error al habilitar 2FA:", error);
  }
};

// Función para verificar 2FA
const verificar2FA = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/verificar-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({ token: otp.value }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Lee el cuerpo de la respuesta
      console.error("Error del servidor:", errorData);
      alert(
        `Error: ${
          errorData.message || "No tienes permisos para realizar esta acción."
        }`
      );
      return;
    }

    const data = await response.json();
    if (data.success) {
      is2FAEnabled.value = true;
      alert("2FA verificado correctamente");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error al verificar 2FA:", error);
  }
};

// Función para deshabilitar 2FA
const deshabilitar2FA = async () => {
  if (!accessToken.value) {
    alert("No se encontró el token de acceso.");
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/deshabilitar-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      alert(
        `Error: ${
          errorData.message || "No tienes permisos para realizar esta acción."
        }`
      );
      return;
    }

    const data = await response.json();
    if (data.success) {
      is2FAEnabled.value = false;
      qrCodeUrl.value = "";
      secret2FA.value = "";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error al deshabilitar 2FA:", error);
  }
};

// Verificar el estado del 2FA al cargar la página
const verificarEstado2FA = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/estado-2fa`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Lee el cuerpo de la respuesta
      console.error("Error del servidor:", errorData);
      alert(
        `Error: ${
          errorData.message || "No tienes permisos para realizar esta acción."
        }`
      );
      return;
    }

    const data = await response.json();
    is2FAEnabled.value = data.is2FAEnabled;
  } catch (error) {
    console.error("Error al verificar el estado del 2FA:", error);
  }
};

// Función para mostrar/ocultar campos de cambio de contraseña
const toggleCambiarContrasena = () => {
  mostrarCambiarContrasena.value = !mostrarCambiarContrasena.value;
};

// Función para cambiar la contraseña
const cambiarContrasena = async () => {
  const userId = obtenerUserIdDesdeToken();
  if (cambiandoContrasena.value) return; // Evitar múltiples solicitudes
  cambiandoContrasena.value = true;

  if (!userId) {
    alert(
      "No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente."
    );
    return;
  }

  if (
    !contrasenaActual.value ||
    !nuevaContrasena.value ||
    !confirmarContrasena.value
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (nuevaContrasena.value !== confirmarContrasena.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (nuevaContrasena.value.length < 8) {
    alert("La nueva contraseña debe tener al menos 8 caracteres");
    return;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/usuario/${userId}/cambiar-contrasena`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: JSON.stringify({
          contrasenaActual: contrasenaActual.value,
          nuevaContrasena: nuevaContrasena.value,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      alert(
        `Error: ${
          errorData.message || "No tienes permisos para realizar esta acción."
        }`
      );
      return;
    }

    const data = await response.json();
    if (data.success) {
      alert("Contraseña cambiada exitosamente");
      contrasenaActual.value = "";
      nuevaContrasena.value = "";
      confirmarContrasena.value = "";
      mostrarCambiarContrasena.value = false;
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  } finally {
    cambiandoContrasena.value = false;
  }
};
</script>
