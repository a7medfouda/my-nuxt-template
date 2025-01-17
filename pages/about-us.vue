<script lang="ts" setup>
import CompanyOverview from "~/components/pages/about-us/CompanyOverview.vue";
import OurPartners from "~/components/shared/website/our-partners.vue";
import WhatDrivesUs from "~/components/pages/about-us/WhatDrivesUs.vue";
import Loading from "~/components/loaders/main-loader.vue";
import type { IAboutUsPage, IAbout } from "~/types";
import useI18nHandler from "~/composables/core/useI18nHandler";
const { setLang, langCookie } = useI18nHandler();
const { locale } = useI18n({ useScope: "global" });

const { data: aboutData, pending } = await useFetch<IAboutUsPage>("/about", {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  headers: {
    "Accept-Language": locale,
  },
  onResponse({ response }) {
    useSeoMeta({
      title: response._data.data.about.title,
      ogTitle: response._data.data.about.title,
      description: response._data.data.about.description,
      ogDescription: response._data.data.about.description,
    });
  },
});
</script>
<template>
  <div>
    <teleport to="body">
      <Loading v-if="pending" />
    </teleport>
    <CompanyOverview
      v-if="!pending && aboutData"
      :data="aboutData?.data.about"
    />
    <our-partners
      :num_section="'02'"
      :data="{ title: aboutData.data.about.partners_title }"
      v-if="!pending && aboutData"
      :partners="aboutData?.data.partners"
      :with_slash="true"
    />
    <WhatDrivesUs
      :num_section="'03'"
      v-if="!pending && aboutData"
      :values="aboutData?.data.values"
      :title="aboutData?.data.about.values_title"
      :description="aboutData?.data.about.values_description"
    />
  </div>
</template>

<style></style>
