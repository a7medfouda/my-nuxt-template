<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import type { ICategories, IThird_section } from "~/types";
import BaseImage from "~/components/core/BaseImage.vue";
const { locale, t } = useI18n({ useScope: "global" });
const { data } = defineProps<{
  data: IThird_section;
  categories: ICategories[];
}>();
</script>
<template>
  <div class="tw-py-5 sm:tw-py-8 md:tw-py-14 lg:tw-py-20">
    <BaseContainer>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
      >
        <div
          class="tw-divider !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
        >
          <h2 class="tw-text-[1.125rem]">03</h2>
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
        class="tw-grid md:tw-grid-cols-3 tw-grid-cols-1 lg:tw-gap-y-20 md:tw-mt-44 tw-mt-20 tw-gap-5 lg:tw-gap-10"
      >
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/products/?category_ids[0]=${category.id}`"
          class="-discover-card tw-relative tw-h-[400px]"
        >
          <div
            class="tw-absolute tw-inset-y-0 tw-inset-x-0 tw-z-[99] tw-bg-black tw-opacity-20"
          ></div>
          <h2 class="title">{{ category.title || category.name }}</h2>
          <p class="description">
            {{ category.description }}
          </p>
          <div class="thumbnail">
            <BaseImage
              parent_class_styles="tw-overflow-hidden"
              class_styles="tw-size-full tw-object-cover tw-absolute tw-top-0"
              :thumbnail="category.image"
            />
          </div>
        </NuxtLink>
      </div>
      <div
        class="lg:tw-mt-20 tw-mt-10 tw-flex lg:tw-flex-row md:tw-flex-col tw-flex-col tw-justify-center tw-items-center tw-gap-5"
      >
        <a href="#contact-us">
          <Button
            :text="data.button_text"
            bgColor="var(--primary)"
            icon="ic:baseline-arrow-right-alt"
            text_color="#fff"
            py="5"
            px="20"
            width="250px"
          />
        </a>
        <a href="#power-ful-source">
          <Button
            :text="t('Read More')"
            :border="true"
            text_color="#000"
            border_color="#b7c2c8"
            class="!tw-py-3 !tw-px-10"
            width="250px  "
          />
        </a>
      </div>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.tw-divider:before,
.tw-divider:after {
  background: var(--primary) !important;
}

.thumbnail {
  @apply tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0;
  img {
    @apply tw-h-full tw-w-full tw-object-cover;
  }
}
.-discover-card {
  position: relative;

  &:first-child {
    margin-top: 0;
  }
  &:nth-child(2) {
    transform: translateY(-71px);
  }
  &:nth-child(3) {
    transform: translateY(-142px);
  }
  @media (max-width: 767px) {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      transform: translateY(0);
    }
  }
  @apply tw-bg-[#F6F8F9] tw-h-full tw-transition-all tw-duration-300 tw-ease-in-out;

  .title {
    @apply tw-relative tw-z-50 tw-mb-3 tw-mt-32 tw-text-[28px] sm:tw-text-[25px] lg:tw-text-[30px] tw-text-[#ffff] tw-font-medium;
    transition: color 0.3s ease-in-out;
  }

  .description {
    @apply tw-relative tw-z-50 tw-text-[16px] lg:tw-text-[18px] tw-text-[#e2e2e2] tw-font-medium;
    transition: color 0.3s ease-in-out;
  }

  padding: 47px 24px 45px 24px;
}
</style>
