<script setup>
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <h1>Página Protegida</h1>
    <p>Solo los usuarios autenticados pueden ver esta página.</p>
  </div>
</template>