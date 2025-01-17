<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Product } from "~/types";
import BlackArrow from "../ui/black-arrow.vue";
import BaseImage from "./BaseImage.vue";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import Button from "./Button.vue";
import { useUseDownloadFiles } from "~/composables/helpers/useDownloadFiles";
const { t } = useI18n();
const currentIndex = ref(0);
const props = defineProps<{
  product: Product;
  height_wrapper?: string | number;
  layoutListed?: boolean;
}>();

watch(currentIndex, (newIndex) => {
  if (newIndex < 0) currentIndex.value = 0;
  if (newIndex >= props.product.gallery.length)
    currentIndex.value = props.product.gallery.length - 1;
});
</script>

<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    :class="[
      '--product',
      layoutListed && !product.file
        ? 'tw-flex tw-items-center !tw-justify-between tw-gap-x-5 '
        : '',
      layoutListed && product.file
        ? 'tw-flex tw-items-center tw-justify-around tw-gap-x-5'
        : '',
    ]"
  >
    <figure
      :class="[
        'product-thumbnail tw-h-[200px] md:tw-h-[250px] tw-flex tw-relative tw-justify-center tw-items-center',
        layoutListed && product.file
          ? 'md:tw-w-[280px] sm:tw-w-[280px] tw-w-[159px]'
          : '',
        layoutListed && !product.file
          ? 'lg:tw-w-[282px] md:tw-w-[424px] sm:tw-w-[275px] tw-w-[170px]'
          : '',
      ]"
    >
      <span
        class="tw-absolute tw-top-5 tw-left-4 tw-z-10 tw-bg-[#212122] tw-text-white tw-px-2 tw-py-2 tw-text-[10px] sm:tw-text-[12px] tw-font-medium tw-rounded-full"
      >
        {{ product.category }}
      </span>
      <BaseImage
        parent_class_styles="tw-flex tw-items-center tw-justify-center "
        class_styles="tw-object-contain tw-h-[200px] "
        :thumbnail="
          product.gallery[currentIndex]
            ? product.gallery[currentIndex]
            : product.image
        "
        :place_holder="LoadingSvg"
      />
      <div
        class="--pagination tw-absolute tw-bottom-5 tw-z-[9] tw-flex tw-gap-3"
      >
        <span
          v-for="(image, index) in product.gallery"
          :key="index"
          :class="[
            'tw-bg-black tw-opacity-15 tw-w-2 tw-h-2 tw-cursor-default tw-rounded-full',
            { 'tw-bg-opacity-50': currentIndex !== index },
          ]"
          @click.stop="
            (event) => {
              event.preventDefault();
              event.stopPropagation();
              currentIndex = index;
            }
          "
        />
      </div>
    </figure>
    <div
      :class="[
        'details',
        layoutListed && !product.file ? '' : '',
      ]"
    >
      <h2 class="title">{{ product.name }}</h2>
      <p
        :class="[
          'description',
          layoutListed ? 'md:tw-max-w-md sm:tw-max-w-sm tw-max-w-[11rem] ' : '',
        ]"
      >
        {{ product.description }}
      </p>
      <div class="tw-flex tw-items-center tw-mt-3 tw-gap-3">
        <h2
          class="tw-text-primary tw-capitalize tw-font-medium md:tw-text-[1.125rem] tw-text-[0.9rem]"
        >
          {{ $t("Read More") }}
        </h2>
        <component
          class="tw-rotate-180 rtl:tw-rotate-0 md:tw-w-[40px] sm:tw-w-[39px] tw-w-[29px] arrow-icon"
          :is="BlackArrow"
        />
      </div>
      <Button
        class="lg:tw-hidden tw-block tw-mt-5 tw-text-[13px]"
        v-if="product.file"
        @click.prevent="useUseDownloadFiles(product.file)"
        :text="t('Download File')"
        bgColor="var(--primary)"
        icon="material-symbols:download"
        iconClass="!tw-rotate-[unset]"
        text_color="#fff"
        hoverEffect="filled-slide-right"
        width="max-content"
      />
    </div>
    <div class="lg:tw-block md:tw-hidden tw-hidden" v-if="layoutListed">
      <Button
        v-if="product.file"
        @click.prevent="useUseDownloadFiles(product.file)"
        :text="t('Download File')"
        bgColor="var(--primary)"
        icon="material-symbols:download"
        iconClass="!tw-rotate-[unset]"
        text_color="#fff"
        hoverEffect="filled-slide-right"
        width="max-content"
      />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.product-thumbnail {
  @apply tw-bg-[#f7f8fa] tw-flex tw-items-center tw-justify-center;
}
.title {
  @apply tw-text-[#212122] md:tw-line-clamp-2 tw-line-clamp-1 tw-w-full tw-break-words md:tw-text-[1.8rem] tw-text-[1.3rem] tw-font-semibold tw-mt-4 tw-capitalize;
}
.description {
  @apply md:tw-line-clamp-2 tw-line-clamp-2 tw-text-[#353C40] md:tw-text-[1.125rem] tw-text-[1rem] tw-font-medium tw-mt-2 tw-capitalize;
}

.arrow-icon {
  @apply tw-transition-transform tw-duration-300 tw-ease-in-out;
}

.--product:hover .arrow-icon {
  @apply tw-translate-x-[10px] rtl:tw-translate-x-[-10px];
}
</style>
