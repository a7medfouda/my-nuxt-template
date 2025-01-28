<script lang="ts" setup>
import LangSwitcher from "~/components/core/LangSwitcher.vue";
import useI18nHandler from "~/composables/core/useI18nHandler";
const { t } = useI18nHandler();
</script>

<template>
  <div class="container">
    <h1 class="text-red-500">{{ t("hello") }}</h1>
    <p>{{ t("welcome") }}</p>
    <LangSwitcher />
  </div>
</template>

<style></style>
