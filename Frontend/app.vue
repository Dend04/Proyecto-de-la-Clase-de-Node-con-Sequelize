<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#aab2b5] to-[#eaebef]">
    <!-- Aquí se renderizan las páginas y componentes globales -->
    <Header />
    <Navbar class="z-20" />
    <NuxtPage class="relative z-10" />
    <!-- Logo -->
    <NuxtImg
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] object-contain opacity-50 z-0 pointer-events-none"
      src="/logo.jpg"
      alt="Logo de fondo"
      format="webp"
    />
  </div>
</template>