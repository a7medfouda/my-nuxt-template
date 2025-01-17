<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import contactInformation from "~/components/pages/contact-us/contact-information.vue";
import ContactForQuote from "~/components/shared/website/contact-for-quote.vue";
import FAQS from "~/components/pages/contact-us/Faqs.vue";
import type { IContactUsPage } from "~/types";
import ServicesLoader from "~/components/loaders/ServicesLoader.vue";
const { locale } = useI18n({ useScope: "global" });

const { data: pageData, pending } = await useFetch<IContactUsPage>(
  "/contact-us",
  {
    baseURL: useRuntimeConfig().public.baseURL,
    lazy: true,
    server: true,
    headers: {
      "Accept-Language": locale,
    },
  }
);
</script>
<template>
  <section class="tw-py-20 tw-mt-20">
    <template v-if="pending">
      <ServicesLoader />
    </template>
    <template v-if="!pending && pageData">
      <BaseContainer>
        <contactInformation :data="pageData.data.header" />
      </BaseContainer>
      <div class="tw-mt-24 lg:tw-mt-32">
        <ContactForQuote :data="pageData.data.contact" />
        <div class="tw-mt-36">
          <FAQS
            :faqs="pageData.data.faqs"
            :faqsData="pageData.data.faqs_data"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<style></style>
