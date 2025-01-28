<script lang="ts" setup>
import useI18nHandler from "~/composables/core/useI18nHandler";

const { setLang, langCookie, t } = useI18nHandler();

const handleLanguageSwitch = async () => {
  const newLang = langCookie.value === "en" ? "ar" : "en";
  await setLang(newLang);
  window.location.reload();
};
</script>

<template>
  <button class="px-4 py-3 border border-gray-300 rounded-md" @click="handleLanguageSwitch">
    {{ langCookie === "en" ? t("switch_to_arabic") : t("switch_to_english") }}
  </button>
</template>
