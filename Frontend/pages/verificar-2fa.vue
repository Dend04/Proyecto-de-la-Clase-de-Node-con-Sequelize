<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold mb-6 text-center">Verificación 2FA</h2>
      <form @submit.prevent="verificarOTP">
        <div class="mb-4">
          <label for="otp" class="block text-sm font-medium text-gray-700"
            >Código OTP</label
          >
          <input
            v-model="otp"
            type="text"
            id="otp"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-800"
          >
            Verificar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const runtimeConfig = useRuntimeConfig();
const otp = ref("");

const verificarOTP = async () => {
  try {
    const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
    const response = await fetch(`${apiBaseUrl}/verificar-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ token: otp.value }),
    });

    if (!response.ok) {
      throw new Error("Código OTP no válido");
    }

    // Redirigir al usuario a la página principal
    navigateTo("/", { reload: true });
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
};
</script>
