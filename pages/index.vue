<script lang="ts" setup>
import Main from "~/components/pages/home/main.vue";
import Loading from "~/components/loaders/main-loader.vue";
import type { IHomePage } from "~/types/index.ts";
// 🎌
const { locale, t } = useI18n({ useScope: "global" });
const nuxtApp = useNuxtApp();
useHead({
  title: t("Home"),
});

const { data: pageData, pending } = await useFetch<IHomePage["pageData"]>(
  "/home",
  {
    baseURL: useRuntimeConfig().public.baseURL,
    lazy: true,
    server: true,
    headers: {
      "Accept-Language": locale,
    },
    // cache home-page 🔥
    // getCachedData(key) {
    //   const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    //   return cachedData as IHomePage["pageData"] | undefined;
    // },
  }
);
</script>
<template>
  <div>
    <teleport to="body">
      <Loading v-if="pending" />
    </teleport>
    <Main v-if="!pending && pageData" :page-data="pageData" />
  </div>
</template>
