<template>
  <section class="tw-py-20 tw-mt-20">
    <template v-if="!pending && pageData">
      <BaseContainer>
      <HeadingSection :data="pageData.data.page" />
      <div class="tw-mt-10">
        <Content :data="pageData.data.page" />
      </div>
    </BaseContainer>
    </template>
  </section>
</template>

<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import HeadingSection from "~/components/pages/termsAndPrivacy/HeadingSection.vue";
import Content from "~/components/pages/termsAndPrivacy/content.vue";
import type { ITermsAndConditionsPage } from "~/types";

const route = useRoute();

const { data: pageData, pending } = await useFetch<ITermsAndConditionsPage>(`/pages?type=${route.query.type}`, {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
});
</script>

<style>

</style>