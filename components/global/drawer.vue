<template>
  <div>
    <n-button @click="activate()">
      <Icon name="ph:list-bold" />
    </n-button>
    <n-drawer v-model:show="active" :width="502" :placement="drawerPlacement">
      <n-drawer-content title="Stoner">
        // ... existing code ...
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const active = ref(false);

const isArabic = computed(() => {
  return document.dir === "rtl" || document.documentElement.lang === "ar";
});

const drawerPlacement = computed(() => {
  return isArabic.value ? "right" : "left";
});

const activate = () => {
  active.value = true;
};
</script>
