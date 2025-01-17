<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Slash from "~/components/ui/slash.vue";
import Button from "~/components/core/Button.vue";
const formatNumber = (number: number) => {
  return number < 10 ? `0${number}` : `${number}`;
};
const { faqs, faqsData } = defineProps<{
  faqs: any;
  faqsData: any;
}>();
</script>
<template>
  <BaseContainer>
    <div class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1">
      <div class="tw-flex tw-flex-col tw-mt-5">
        <div class="tw-flex tw-items-center tw-gap-2">
          <p class="tw-text-basecolor tw-text-[1.125rem]">02</p>
          <component :is="Slash" />
        </div>
        <h2
          class="tw-text-[#212122] tw-text-[3.125rem] tw-max-w-md tw-font-semibold tw-mt-10"
        >
          {{ faqs.title }}
        </h2>
        <p
          class="tw-text-quaternary tw-text-[1.125rem] tw-font-normal tw-max-w-md"
        >
          {{ faqs.description }}
        </p>
        <div class="tw-mt-10 tw-flex tw-items-center tw-gap-5">
          <Button
            :text="faqs.button"
            bgColor="var(--primary)"
            icon="ic:baseline-arrow-right-alt"
            text_color="#fff"
            hoverEffect="filled-slide-right"
          />
        </div>
      </div>
      <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-5 tw-mt-7">
        <div
          v-for="(_, index) in Array(faqsData.length)"
          :key="index"
          :tabindex="index"
          class="tw-collapse tw-transition-all hover:!tw-border-b-[var(--primary)] tw-pb-5 tw-rounded-none tw-border-r-0 tw-border-t-0 tw-border-l-0 tw-collapse-plus !tw-border-b-[#d4dee4] !tw-border-opacity-50 !tw-border-b tw-border"
        >
          <div
            class="tw-collapse-title tw-flex lg:tw-flex-row tw-flex-col lg:tw-items-center tw-gap-2 xl:tw-text-[1.875rem] lg:tw-text-[1.5rem] tw-text-[1.25rem] tw-text-secondary tw-font-medium"
          >
            <span class="collapse-number tw-whitespace-nowrap">{{
              formatNumber(index + 1)
            }}</span>
            {{ faqsData[index].question }}
          </div>
          <div class="tw-collapse-content">
            <p class="tw-text-tertiary tw-text-[1.125rem]">
              {{ faqsData[index].answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<style scoped>
.collapse-number {
  @apply tw-text-quaternary;
  margin-right: 8px;
  font-weight: bold;
  font-size: 1.21rem;
}
.tw-collapse-plus > .tw-collapse-title:after {
  content: "" !important;
}
</style>
