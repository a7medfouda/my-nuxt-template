<script lang="ts" setup>
import Toolbar from "~/components/shared/layout/toolbar.vue";
import Footer from "~/components/shared/layout/footer.vue";
import WhatsAppButton from "~/components/core/WhatsAppButton.vue";
</script>
<template>
  <div>
    <Toolbar />
    <slot />
    <WhatsAppButton />
    <Footer />
  </div>
</template>
<style></style>
