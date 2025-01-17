<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import overlayImage from "~/assets/images/section_image.jpeg";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import BaseImage from "~/components/core/BaseImage.vue";
import Slash from "~/components/ui/slash.vue";
import type { IFirst_section } from "~/types";

const { data } = defineProps<{
  data: IFirst_section;
}>();
</script>
<template>
  <div>
    <section
      id="power-and-innovation"
      class="tw-bg-white tw-py-10 md:tw-pb-20 tw-pb-2 tw-mt-10"
    >
      <BaseContainer>
        <div
          class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10 tw-items-center"
        >
          <!-- left -->
          <div class="tw-flex tw-flex-col tw-mt-5">
            <div class="tw-flex tw-items-center tw-gap-2">
              <p class="tw-text-basecolor tw-text-[1.125rem]">01</p>
              <component :is="Slash" />
            </div>
            <h2
              class="tw-text-[#212122] tw-mb-10 rtl:lg:tw-w-[30rem] lg:tw-text-[3.125rem] md:tw-text-[2.125rem] tw-text-[2.125rem] tw-font-semibold tw-mt-10"
            >
              {{ data.title }}
            </h2>
            <div class="tw-flex tw-flex-col">
              <h2
                class="tw-text-[#353C40] tw-mb-10 tw-text-[1.125rem] tw-font-medium"
              >
                {{ data.description }}
              </h2>
            </div>
            <div
              class="tw-mt-5 tw-flex tw-items-start lg:tw-items-center tw-gap-5 lg:tw-flex-row md:tw-flex-col tw-flex-col"
            >
              <a href="#contact-us">
                <Button
                  :text="data.button_text_1"
                  bgColor="var(--primary)"
                  class="!tw-py-3"
                  icon="ic:baseline-arrow-right-alt"
                  text_color="#fff"
                  hoverEffect="filled-slide-right"
                  width="250px"
                />
              </a>
              <a href="#prime-services">
                <Button
                  :text="data.button_text_2"
                  :border="true"
                  text_color="#000"
                  border_color="#b7c2c8"
                  class="!tw-py-3 !tw-px-10"
                  hoverEffect="filled-top-to-bottom"
                  hover_text="#fff"
                  hover_color="#fbaf40"
                  hover_bg="#fbaf40"
                  width="250px"
                />
              </a>
            </div>
          </div>
          <!-- right -->
          <div>
            <BaseImage
              class_styles="tw-object-cover tw-h-full tw-w-[60rem]"
              :thumbnail="overlayImage"
              :place_holder="LoadingSvg"
            />
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>

<style lang="scss"></style>
