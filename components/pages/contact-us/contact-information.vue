<script lang="ts" setup>
import Attachment from "~/components/ui/attachment.vue";
import HelpUs from "~/components/ui/help-us.vue";
import PaymentInfo from "~/components/ui/payment-info.vue";

const { data } = defineProps<{
  data: {
    header: {
      title?: string;
      description?: string;
      help?: {
        title?: string;
        number?: string;
      };
      media?: {
        title?: string;
        email?: string;
      };
      sales?: {
        title?: string;
        email?: string;
      };
    };
  };
}>();
</script>
<template>
  <div>
    <BaseContainer>
      <div
        class="tw-flex lg:tw-items-center lg:tw-flex-row tw-flex-col tw-justify-between tw-border-b tw-border-b-[#D4DEE4] tw-pb-10"
      >
        <div class="tw-flex-1">
          <h1 class="tw-text-[3rem] lg:tw-text-[4rem] tw-text-secondary">
            {{ data.title }}
          </h1>
        </div>
        <div class="tw-flex-1">
          <p class="tw-text-tertiary tw-font-semibold">
            {{ data.description }}
          </p>
        </div>
      </div>
      <div
        class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10 tw-mt-10"
      >
        <div class="tw-flex tw-gap-2 tw-items-start">
          <div class="tw-pt-2">
            <component :is="HelpUs" />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-text-[1.5rem] tw-font-bold tw-mb-4">
              {{ data.help.title }}
            </h2>
            <h2 class="tw-text-secondary tw-font-medium tw-text-[1.125rem]">
              {{ data.help.number }}
            </h2>
          </div>
        </div>
        <div class="tw-flex tw-gap-2 tw-items-start">
          <div class="tw-pt-2">
            <component :is="Attachment" />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-text-[1.5rem] tw-font-bold tw-mb-4">
              {{ data.media.title }}
            </h2>
            <h2 class="tw-text-secondary tw-font-medium tw-text-[1.125rem]">
              {{ data.media.email }}
            </h2>
          </div>
        </div>
        <div class="tw-flex tw-gap-2 tw-items-start">
          <div class="tw-pt-2">
            <component :is="PaymentInfo" />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-text-[1.5rem] tw-font-bold tw-mb-4">
              {{ data.sales.title }}
            </h2>
            <h2 class="tw-text-secondary tw-font-medium tw-text-[1.125rem]">
              {{ data.sales.email }}
            </h2>
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style></style>
