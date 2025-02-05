<template>
    <div :class="theme">
      <button @click="toggleTheme">
        {{ theme === 'dark' ? '🌞 Light' : '🌙 Dark' }}
      </button>
      <slot />
    </div>
  </template>
  
  <script setup>
  const theme = useState('theme', () => 'light');
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme.value);
    
    // Aplicar clase al html
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Cargar tema al iniciar
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    theme.value = savedTheme;
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  });
  </script>