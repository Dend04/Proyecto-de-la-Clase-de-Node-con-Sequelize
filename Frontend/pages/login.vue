<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '@sidebase/nuxt-auth';
  
  const username = ref('');
  const password = ref('');
  const auth = useAuth();
  
  const login = async () => {
    try {
      const response = await auth.loginWith('local', {
        data: {
          identificador: username.value,
          password: password.value
        }
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Guardar el token en localStorage
      // Redirigir al usuario a la página de inicio después de iniciar sesión
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  </script>