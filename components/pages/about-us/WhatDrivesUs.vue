<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import type { IValue } from "~/types";
import { useI18n } from "vue-i18n";
defineProps<{
  values: IValue[];
  num_section: string;
  title: string;
  description: string;
}>();
const { t } = useI18n();
</script>

<template>
  <div class="tw-py-20 tw-bg-[#f7f7f7]">
    <BaseContainer>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
      >
        <div
          class="tw-divider !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
        >
          <h2 class="tw-text-[1.125rem]">{{ num_section }}</h2>
        </div>
        <h2
          class="md:tw-text-[3rem] sm:tw-text-[2.5rem] tw-text-[1.8rem] lg:tw-max-w-xl tw-text-center tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ title }}
        </h2>
        <p
          class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-center tw-m-auto lg:tw-w-[32rem] tw-max-w-md tw-mt-3 tw-capitalize tw-text-[#353E5C] tw-font-semibold"
        >
          {{ description }}
        </p>
      </div>
      <div
        class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-mt-20 tw-gap-10"
      >
        <div
          v-for="(value, index) in values"
          :key="value.id"
          class="tw-flex tw-flex-col tw-border-b tw-border-b-[#d4dee4] tw-pb-5 tw-transition-all tw-duration-300 hover:tw-border-b-[var(--primary)]"
        >
          <img
            :src="value.icon"
            class="tw-max-w-[20px] tw-max-h-[27px] tw-object-cover"
          />
          <h2 class="tw-text-[#212122] tw-text-[25px] tw-font-medium tw-mt-4">
            {{ value.title }}
          </h2>
          <p
            class="tw-text-[#353C40] tw-text-[16px] md:tw-text-[18px] tw-font-normal tw-mt-2"
          >
            {{ value.description }}
          </p>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style>
.tw-divider:before,
.tw-divider:after {
  background: var(--primary) !important;
}
</style>
