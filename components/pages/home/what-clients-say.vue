<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import BaseImage from "~/components/core/BaseImage.vue";
import Button from "~/components/core/Button.vue";
import Slash from "~/components/ui/slash.vue";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import Image from "~/assets/images/images.jpg";
import type { IClientReviews, ISixth_Section } from "~/types";
defineProps<{
  data: ISixth_Section;
  clientReviews: IClientReviews[];
}>();
</script>
<template>
  <section class="tw-py-20">
    <BaseContainer>
      <div class="tw-flex tw-items-center tw-gap-2">
        <p class="tw-text-basecolor tw-text-[1.125rem]">06</p>
        <component :is="Slash" />
      </div>
      <div class="tw-mt-3">
        <div>
          <h3
            class="md:tw-text-[3.125rem] sm:tw-text-[2.125rem] tw-text-[2.125rem] tw-font-semibold tw-text-[#212122]"
          >
            {{ data.title }}
          </h3>
          <p
            class="tw-w-full md:tw-max-w-[27em] tw-text-[1rem] md:tw-text-[1.125rem] tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
          >
            {{ data.description }}
          </p>
        </div>
      </div>
      <div
        class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10 tw-items-start tw-mt-10"
      >
        <div class="">
          <!--  -->
          <div>
            <BaseImage
              class_styles="tw-size-full"
              :thumbnail="data.image"
              :place_holder="LoadingSvg"
            />
          </div>
          <div>
            <div class="tw-bg-[#f6f8f9] tw-p-10 tw-flex tw-flex-col tw-mt-20">
              <h4 class="tw-text-[#353E5C] tw-text-[1.2rem]">
                {{ clientReviews[0].review }}
              </h4>
              <div class="tw-flex tw-items-center tw-gap-2 tw-mt-10">
                <div class="tw-flex-1">
                  <BaseImage
                    class_styles="tw-size-14 tw-mr-[4rem] rtl:tw-mr-[unset]   tw-object-cover tw-rounded-full"
                    :thumbnail="clientReviews[0].image"
                    :loader="LoadingSvg"
                    :place_holder="Image"
                  />
                </div>
                <div class="tw-flex tw-flex-col tw-flex-[09]">
                  <h5 class="tw-text-[#101113] tw-text-[1rem]">
                    {{ clientReviews[0].name }}
                  </h5>
                  <p class="tw-text-quaternary tw-text-[0.875rem]">
                    {{ clientReviews[0].job }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="tw-flex !tw-flex-col !tw-gap-2">
            <div
              v-for="(review, index) in clientReviews.slice(0, 4)"
              :key="index"
              class="tw-p-10 tw-bg-[#f6f8f9]"
            >
              <h4 class="tw-text-[#353E5C] tw-text-[1.2rem]">
                {{ review.review }}
              </h4>
              <div class="tw-flex tw-items-start tw-gap-2 tw-mt-10">
                <div>
                  <BaseImage
                    class_styles="tw-size-14  tw-object-cover tw-rounded-full"
                    :thumbnail="review.image"
                    :place_holder="Image"
                  />
                </div>
                <div class="tw-flex tw-flex-col">
                  <h5 class="tw-text-[#101113] tw-text-[1rem]">
                    {{ review.name }}
                  </h5>
                  <p class="tw-text-quaternary tw-text-[0.875rem]">
                    {{ review.job }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style></style>
