<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#aab2b5] to-[#eaebef]">
    <!-- Aquí se renderizan las páginas y componentes globales -->
    <NuxtPage />
    <Header />
    <Navbar class="z-20" />
    <!-- Logo -->
    <NuxtImg
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] object-contain opacity-50 z-10"
      src="/logo.jpg"
      alt="Logo de fondo"
      format="webp"
    />
  </div>
</template>