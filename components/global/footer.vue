<template>
  <n-layout-footer bordered position="absolute" class="footer">
    <n-space vertical align="center" class="footer-content">
      <n-space justify="center" size="large">
        <n-button text>Privacy Policy</n-button>
        <n-button text>Terms of Service</n-button>
        <n-button text>Contact Us</n-button>
      </n-space>

      <n-text depth="3">
        © {{ new Date().getFullYear() }} Your Company Name. All rights reserved.
      </n-text>
    </n-space>
  </n-layout-footer>
</template>

<style scoped>
.footer {
  padding: 2rem;
  background: white;
}

.footer-content {
  width: 100%;
}
</style>
