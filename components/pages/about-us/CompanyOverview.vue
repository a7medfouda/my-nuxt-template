<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import Image_2 from "~/assets/images/654d49e753b6d10c90d36359_the-story-of-how-our-company-was-founded-image-industrial-x-webflow-template-p-1080.jpg";
import percentageIcon from "@/assets/images/percentageIcon.png";
import plusIcon from "@/assets/images/plus.png";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import BaseImage from "~/components/core/BaseImage.vue";
import Slash from "~/components/ui/slash.vue";
import type { IAbout } from "~/types";
const { data } = defineProps<{
  data: IAbout;
}>();
function scrollToSection(id: string) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
</script>
<template>
  <div>
    <section class="tw-bg-[#f7f7f7] tw-pt-20 tw-pb-72 tw-mt-10">
      <BaseContainer>
        <div
          class="tw-grid lg:tw-grid-cols-2 tw-gap-y-5 tw-grid-cols-1 tw-items-end"
        >
          <div class="tw-flex tw-flex-col tw-mt-5 tw-flex-wrap">
            <h2
              class="tw-text-[#212122] tw-text-[2.5rem] md:tw-text-[3.125rem] tw-max-w-md tw-font-semibold tw-mt-10"
            >
              {{ data.title }}
            </h2>

            <div class="tw-mt-10 tw-flex tw-items-center tw-flex-wrap tw-gap-5">
              <Button
                @click="
                  () => {
                    $router.push('/contact-us');
                  }
                "
                :text="data.header_button_1"
                bgColor="var(--primary)"
                icon="ic:baseline-arrow-right-alt"
                text_color="#fff"
                hoverEffect="filled-slide-right"
                width="150px"
              />
              <Button
                @click="scrollToSection('partners')"
                :text="data.header_button_2"
                :border="true"
                text_color="#000"
                border_color="#b7c2c8"
                class="!tw-py-2 !tw-px-6"
                width="150px"
              />
            </div>
          </div>
          <div class="">
            <p
              class="tw-text-[#212122] tw-text-[1.125rem] tw-font-normal tw-max-w-md"
            >
              {{ data.description }}
            </p>
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="tw-bg-[#f7f7f7] tw-py-20 tw-mb-20">
      <BaseImage
        class_styles="tw-size-full tw-w-[95%] tw-h-[20rem] md:tw-h-[31.25rem] tw-object-cover -tw-mt-[20rem]"
        parent_class_styles="!tw-overflow-visible"
        :thumbnail="data.header_image"
      />
      <BaseContainer>
        <div
          class="tw-grid xl:tw-grid-cols-4 sm:tw-grid-cols-2 tw-grid-cols-1 tw-gap-16 tw-mt-20"
        >
          <div
            v-for="num in data.numbers.slice(0, 3)"
            :key="num.id"
            class="tw-ms-5 tw-flex tw-flex-col tw-gap-2"
          >
            <h2
              class="tw-text-[20px] md:tw-text-[25px] tw-text-[#212122] tw-font-semibold"
            >
              {{ num.text }}
            </h2>
            <div class="tw-w-fit tw-flex tw-items-center tw-gap-2 tw-justify-center tw-mt-2">
              <img
                :src="num.sign === '%' ? percentageIcon : plusIcon"
                class=""
                :alt="num.text"
              />
              <h2
                class="tw-text-[#212122] tw-text-[2rem] sm:tw-text-[2.5rem] md:tw-text-[2.8rem] tw-font-bold"
              >
                {{ num.number }}
              </h2>
            </div>
          </div>
        </div>
        <!--  -->
        <div
          class="tw-flex tw-justify-between tw-items-center tw-mt-20 lg:tw-gap-10 tw-flex-wrap lg:tw-gap-y-36 tw-pt-20"
        >
          <!--  -->
          <div
            class="tw-flex tw-flex-col xl:tw-order-1 tw-order-2 md:tw-mt-20 lg:tw-mt-0"
          >
            <div class="tw-flex tw-items-center tw-gap-2">
              <p class="tw-text-basecolor tw-text-[1.125rem]">01</p>
              <component :is="Slash" />
            </div>
            <h2
              class="tw-text-[#212122] tw-text-[2rem] md:tw-text-[2.5rem] xl:tw-text-[3.125rem] lg:tw-max-w-md tw-font-semibold tw-mt-10"
            >
              {{ data.story_title }}
            </h2>
            <p
              class="tw-text-[#212122] tw-text-[1.125rem] tw-font-normal tw-max-w-md"
            >
              {{ data.story_description }}
            </p>
            <div class="tw-mt-10 tw-flex tw-items-center tw-gap-5">
              <Button
                @click="scrollToSection('partners')"
                :text="data.story_button"
                bgColor="var(--primary)"
                icon="ic:baseline-arrow-right-alt"
                text_color="#fff"
                hoverEffect="filled-slide-right"
                width="150px"
              />
            </div>
          </div>
          <div class="xl:tw-order-2 tw-order-1">
            <BaseImage
              class_styles="tw-w-full tw-object-cover md:!tw-h-[660px] sm:!tw-h-[660px] !tw-h-[407px] md:-tw-mb-[12rem] tw-mb-[5rem]"
              :thumbnail="data.story_image"
              :place_holder="LoadingSvg"
            />
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>

<style></style>
