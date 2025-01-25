<template>
    <div class="min-h-screen bg-gradient-to-tr from-[#aab2b5] to-[#eaebef] py-8">
      <!-- Contenedor principal -->
      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
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
          <h1 class="text-2xl font-bold text-gray-800 mb-6">Configuración de la Cuenta</h1>
  
          <!-- Sección de 2FA -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-700">Autenticación de Dos Factores (2FA)</h2>
  
            <!-- Estado actual del 2FA -->
            <p v-if="!is2FAEnabled" class="text-gray-600">
              La autenticación de dos factores no está habilitada.
            </p>
            <p v-else class="text-gray-600">
              La autenticación de dos factores está habilitada.
            </p>
  
            <!-- Habilitar 2FA -->
            <div v-if="!is2FAEnabled">
              <button
                @click="habilitar2FA"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Habilitar 2FA
              </button>
  
              <div v-if="qrCodeUrl" class="mt-4 space-y-4">
                <p class="text-gray-700">Escanea el siguiente código QR con tu aplicación de autenticación:</p>
                <img :src="qrCodeUrl" alt="Código QR para 2FA" class="mx-auto" />
                <p class="text-gray-700">O introduce manualmente el siguiente código:</p>
                <pre class="bg-gray-100 p-4 rounded-md text-sm text-gray-800">{{ secret2FA }}</pre>
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
  
            <!-- Deshabilitar 2FA -->
            <div v-else>
              <button
                @click="deshabilitar2FA"
                class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Deshabilitar 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Estado del componente
  const qrCodeUrl = ref('');
  const secret2FA = ref('');
  const otp = ref('');
  const is2FAEnabled = ref(false);
  const accessToken = ref(null); // Token de acceso
  
  // Verificar el token al cargar la página
  onMounted(() => {
    accessToken.value = localStorage.getItem('accessToken');
  });
  
  // Función para habilitar 2FA
  const habilitar2FA = async () => {
    try {
      const response = await fetch('/api/habilitar-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Error al habilitar 2FA:', error);
    }
  };
  
  // Función para verificar 2FA
  const verificar2FA = async () => {
    try {
      const response = await fetch('/api/verificar-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: JSON.stringify({ token: otp.value }),
      });
      const data = await response.json();
      if (data.success) {
        is2FAEnabled.value = true;
        alert('2FA verificado correctamente');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al verificar 2FA:', error);
    }
  };
  
  // Función para deshabilitar 2FA
  const deshabilitar2FA = async () => {
    try {
      const response = await fetch('/api/deshabilitar-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        is2FAEnabled.value = false;
        alert('2FA deshabilitado correctamente');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al deshabilitar 2FA:', error);
    }
  };
  
  // Verificar el estado del 2FA al cargar la página
  const verificarEstado2FA = async () => {
    try {
      const response = await fetch('/api/estado-2fa', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      const data = await response.json();
      is2FAEnabled.value = data.is2FAEnabled;
    } catch (error) {
      console.error('Error al verificar el estado del 2FA:', error);
    }
  };
  
  // Verificar el estado del 2FA cuando la página se carga
  if (accessToken.value) {
    verificarEstado2FA();
  }
  </script>