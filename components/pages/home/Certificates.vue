<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import type { Certificates, ICertificates } from "~/types";
import BaseImage from "~/components/core/BaseImage.vue";
defineProps<{
  data: ICertificates;
  certificates: Certificates[];
}>();
</script>
<template>
  <section class="tw-pb-5 tw-pt-10 sm:tw-py-8 md:tw-py-10 lg:tw-py-20">
    <BaseContainer>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
      >
        <div
          class="tw-divider !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
        >
          <h2 class="tw-text-[1.125rem]">07</h2>
        </div>
        <h2
          class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-mt-3 tw-text-center tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ data.title }}
        </h2>
        <p
          class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-center tw-m-auto md:tw-w-[29rem] tw-max-w-lg tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
        >
          {{ data.description }}
        </p>
      </div>
      <div
        class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5 tw-mt-24 tw-gap-y-14 tw-gap-x-20"
      >
        <div v-for="certificate in certificates" :key="certificate.id">
          <div
            class="tw-bg-[#F6F8F9] tw-w-full tw-p-20 tw-justify-center tw-flex tw-items-center tw-flex-1 tw-flex-col"
          >
            <div>
              <BaseImage
                class_styles="tw-object-cover tw-h-[79px] tw-w-[79px]"
                :thumbnail="certificate.image"
              />
            </div>
            <!--  -->
          </div>
          <div class="--content tw-mt-3">
            <h2
              class="tw-text-[#212122] tw-capitalize tw-line-clamp-1 tw-mt-2 tw-text-[25px] tw-font-medium"
            >
              {{ certificate.name }}
            </h2>
            <h2
              class="tw-text-[#697B86] tw-line-clamp-2 tw-mt-2 tw-text-[18px] tw-font-medium"
            >
              {{ certificate.description }}
            </h2>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style></style>
