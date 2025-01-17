<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import BaseImage from "~/components/core/BaseImage.vue";
import Slash from "~/components/ui/slash.vue";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import brand from "~/assets/svg/kotech.svg";
import type { INinth_section, IPartners } from "~/types";
defineProps<{
  with_slash?: boolean;
  data: INinth_section;
  partners: IPartners[];
  num_section?: string | number;
}>();
const { t } = useI18n({ useScope: "global" });
</script>
<template>
  <div id="partners" class="tw-pt-5 tw-pb-20">
    <BaseContainer>
      <div class="tw-flex tw-flex-col">
        <div v-if="with_slash" class="tw-flex tw-items-center tw-gap-2">
          <p class="tw-text-basecolor tw-text-[1.125rem]">{{ num_section }}</p>
          <component :is="Slash" />
        </div>
        <div v-if="with_slash" class="tw-flex lg:tw-flex-col tw-gap-y-2">
          <h2
            class="tw-max-w-xl md:tw-text-[3.125rem] tw-text-[2rem] tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
          >
            {{ data.title }}
          </h2>
        </div>
        <div v-else class="tw-flex tw-items-center tw-flex-col">
          <div
            class="tw-divider tw-text-center !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
          >
            <h2 class="tw-text-[1.125rem]">{{ num_section }}</h2>
          </div>
          <h2
            class="md:tw-text-[3.125rem] tw-max-w-xl tw-text-[2rem] tw-mt-3 tw-text-center tw-capitalize tw-text-[#212122] tw-font-semibold"
          >
            {{ t("Brands and Companies We Worked With") }}
          </h2>
        </div>
      </div>
      <div class="md:tw-mt-20 tw-mt-10">
        <div
          class="tw-grid lg:tw-grid-cols-5 md:tw-grid-cols-3 tw-grid-cols-2 tw-gap-5"
        >
          <div
            v-for="(partner, index) in partners"
            :key="partner.id"
            class="tw-flex tw-flex-col tw-bg-[#f7f8fa] tw-py-2 tw-px-5 tw-pl-4 rtl:pr-4 lg:tw-basis-[calc(18%-20px)] md:tw-basis-[calc(23%-20px)] sm:tw-basis-[calc(50%-10px)] tw-basis-[calc(23%-20px)] tw-justify-center tw-items-center"
          >
            <BaseImage
              class_styles="tw-max-w-[7.587rem] tw-object-cover tw-m-auto tw-max-h-[2.188rem]"
              :thumbnail="partner.logo"
              :place_holder="LoadingSvg"
            />
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style></style>
