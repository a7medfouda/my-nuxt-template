<template>
  <n-layout position="absolute">
    <Navbar />
    <n-layout-content class="main-content">
      <slot />
    </n-layout-content>
    <Footer />
  </n-layout>
</template>

<style>
.main-content {
  min-height: 100vh;
  padding-top: 84px;
}
</style>
