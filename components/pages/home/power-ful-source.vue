<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Slash from "~/components/ui/slash.vue";
import vedioSrc from "./vedio-src.vue";
import { type IFourth_section } from "~/types/index";

const { data } = defineProps<{
  data: IFourth_section;
}>();
</script>
<template>
  <section id="power-ful-source" class="tw-py-5 sm:tw-py-8 md:tw-py-14 lg:tw-py-20">
    <BaseContainer>
      <div class="tw-flex tw-items-center tw-gap-2">
        <p class="tw-text-basecolor tw-text-[1.125rem]">04</p>
        <component :is="Slash" />
      </div>
      <div
        class="tw-flex lg:tw-flex-row md:tw-flex-col tw-flex-col tw-items-end lg:tw-justify-between lg:tw-gap-20 tw-gap-y-10 tw-justify-center"
      >
        <h2
          class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ data.title }}
        </h2>
        <p class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-[#353C40] tw-font-medium">
          {{ data.description }}
        </p>
      </div>
      <!-- VEDIOS -->
      <div class="tw-mt-10">
        <vedioSrc :vedio="data.video" />
      </div>
      <!-- VEDIOS -->
    </BaseContainer>
  </section>
</template>

<style></style>
