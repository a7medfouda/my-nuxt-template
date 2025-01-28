<template>
  <n-layout-header bordered class="header">
    <n-space justify="space-between" align="center" class="nav-container">
      <!-- Logo/Brand -->
      <div class="logo">
        <n-h2>Your Logo</n-h2>
      </div>

      <!-- Navigation Links -->
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/services">Services</NuxtLink></li>
      </ul>
    </n-space>
  </n-layout-header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: white;
}

.nav-container {
  padding: 0 2rem;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
}
</style>
