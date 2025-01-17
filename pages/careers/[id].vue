<script lang="ts" setup>
import Button from "~/components/core/Button.vue";
import ServicesLoader from "~/components/loaders/ServicesLoader.vue";
import SingleCareerLoader from "~/components/loaders/singleCareerLoader.vue";
import ourContact from "~/components/pages/carrers/our-contact.vue";
import type { CareerResponse } from "~/types";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// 🇦🇺
const route = useRoute();
const contact = ref<any>(null);
const careerId = route.params.id;
const URL = `/career/${careerId}`;
const {
  data: single_career,
  pending,
  error,
} = await useFetch<CareerResponse>(URL, {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  onRequest() {
    if (process.client && window) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }
  },
  onResponse({ response }) {
    contact.value = response._data.data.contact;
    const career = response._data.data.career;
    if (career) {
      useSeoMeta({
        title: career.title,
        ogTitle: career.title,
        description: career.description,
        ogDescription: career.long_description,
      });
    }
  },
});
</script>
<template>
  <section>
    <div class="tw-bg-[#f7f7f7] tw-py-20 tw-mt-16">
      <SingleCareerLoader v-if="pending" />
      <div
        v-if="!pending && single_career"
        class="tw-flex tw-flex-col tw-items-center tw-justify-center"
      >
        <h2
          class="tw-text-primary tw-text-[18px] tw-text-center tw-font-medium"
        >
          {{ t("Careers") }}
        </h2>
        <h4
          class="tw-text-[36px] tw-text-[#212122] tw-max-w-lg tw-my-5 tw-text-center"
        >
          {{ single_career.data.career.title }}
        </h4>
        <p class="tw-text-[#212122] tw-text-[18px] tw-max-w-lg tw-text-center">
          {{ single_career.data.career.description }}
        </p>
        <a href="#contact-us">
          <Button
          class="tw-mt-6"
          :text="t('Apply for the Job')"
          bgColor="var(--primary)"
          icon="ic:baseline-arrow-right-alt"
          text_color="#fff"
          width="200px"
        />
        </a>
      </div>
    </div>
    <!--DETAILS  -->
    <ServicesLoader v-if="pending" />
    <CoreBaseContainer>
      <div class="tw-py-20">
        <h4
          v-if="!pending && single_career"
          v-html="single_career.data.career.long_description"
          class="tw-text-[#212122] tw-text-[35px] tw-font-semibold"
        />
      </div>
    </CoreBaseContainer>
    <!--  -->
    <div class="tw-mb-36">
      <ourContact v-if="contact" :data="contact" />
    </div>
  </section>
</template>

<style></style>
