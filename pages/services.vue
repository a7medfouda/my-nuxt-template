<script lang="ts" setup>
import type { IServicesPage } from "~/types";
import Main from "~/components/pages/services/main.vue";
import ServicesLoader from "~/components/loaders/ServicesLoader.vue";
import OurContacts from "~/components/pages/services/our-contacts.vue";
import { useServicesMeta } from "~/constants/common";

const { locale, t } = useI18n({ useScope: "global" });
const { data: pageData, pending } = await useFetch<IServicesPage>("/services", {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  headers: {
    "Accept-Language": locale,
  },
});
useHead({
  title: t("Services"),
  meta: useServicesMeta,
});
</script>
<template>
  <section>
    <ServicesLoader v-if="pending" />
    <Main v-if="!pending && pageData" :data="pageData.data" />
    <div class="tw-py-20">
      <OurContacts v-if="!pending && pageData" :data="pageData.data.contact" />
    </div>
  </section>
</template>

<style></style>
