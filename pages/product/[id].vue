<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import BaseImage from "~/components/core/BaseImage.vue";
import Button from "~/components/core/Button.vue";
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import Product from "~/components/core/product.vue";
import type { ProductResponse } from "~/types";
import ProductLoader from "~/components/loaders/ProductLoader.vue";
import { useI18n } from "vue-i18n";
import { useNotification } from "naive-ui";
import { useUseDownloadFiles } from "~/composables/helpers/useDownloadFiles";
const notification = useNotification();
const notificationConfig = {
  containerStyle: {
    zIndex: 999999999999999,
  },
};
//  --------------------------------
const { t, locale } = useI18n();
// ⚓⚓⚓⚓⚓⚓⚓
const route = useRoute();
const router = useRouter();
const productId = route.params.id.toString();
const URL = `/product/${productId}`;
// 🔥🧨
const {
  data: single_product,
  pending,
  error,
} = await useFetch<ProductResponse>(URL, {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  headers: {
    "Accept-Language": locale,
  },
  onRequest() {
    if (process.client && window) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }
  },
  onResponse({ response }) {
    const prodcut = response._data.data.product;
    if (prodcut) {
      useSeoMeta({
        title: prodcut.name,
        ogTitle: prodcut.name,
        description: prodcut.description,
        ogDescription: prodcut.description,
        ogImage: prodcut.image,
      });
    }
  },
});
// Updated copy function using Naive UI notification
const copyProductUrl = async () => {
  try {
    const currentUrl = window.location.href;
    const isRTL = document.dir === "rtl";

    // Try using the clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentUrl);
    } else {
      // Fallback for mobile devices
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999999999999px";
      textArea.style.top = "-9999999999999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
        throw err;
      } finally {
        textArea.remove();
      }
    }

    notification.success({
      title: isRTL ? "تم النسخ" : "Copied",
      content: isRTL
        ? "تم نسخ رابط المنتج بنجاح"
        : "Product URL copied to clipboard!",
      duration: 2500,
    });
  } catch (error) {
    const isRTL = document.dir === "rtl";
    notification.error({
      title: isRTL ? "خطأ" : "Error",
      content: isRTL ? "فشل نسخ الرابط" : "Failed to copy URL",
      duration: 2500,
    });
    console.error("Copy failed:", error);
  }
};
</script>

<template>
  <section>
    <div class="tw-py-20 tw-bg-[#f7f7f7]">
      <ProductLoader v-if="pending" />
      <BaseContainer v-if="!pending">
        <div
          class="tw-grid md:tw-mt-28 sm:tw-mt-28 tw-mt-10 lg:tw-grid-cols-2 tw-grid-cols-1"
        >
          <!-- LEFT-SIDE -->
          <div class="tw-flex lg:tw-order-1 tw-order-2 tw-flex-col tw-gap-2">
            <h2 class="tw-text-[50px] tw-text-[#212122]">
              {{ single_product?.data.product.name }}
            </h2>
            <p class="tw-text-[#212122] tw-max-w-lg tw-text-[18px] tw-mt-4">
              {{ single_product?.data.product.description }}
            </p>
            <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-4 tw-mt-10">
              <Button
                v-if="single_product?.data.product.file"
                @click="useUseDownloadFiles(single_product?.data.product.file)"
                :text="t('Download File')"
                bgColor="var(--primary)"
                icon="material-symbols:download"
                iconClass="!tw-rotate-[unset]"
                text_color="#fff"
                hoverEffect="filled-slide-right"
                class="tw-w-fit !tw-py-2"
                width="200px"
              />
              <!-- Share -->
              <button
                @click="copyProductUrl"
                style="width: 200px"
                class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-py-3 tw-bg-primary/10 tw-rounded-full hover:tw-bg-primary/20 tw-transition-colors"
              >
                <Icon
                  name="material-symbols:share-outline"
                  class="tw-text-primary"
                  size="22"
                />
                <span class="tw-text-primary tw-font-medium">{{
                  t("Copy Product Link")
                }}</span>
              </button>
            </div>
          </div>
          <!-- RIGHT-SIDE -->
          <!-- tw-h-[300px] -->
          <div
            class="tw-bg-white tw-shadow-md md:tw-h-[600px] sm:tw-h-[600px] tw-h-[331px] tw-flex tw-items-center tw-justify-center lg:tw-order-2 tw-order-1 lg:-tw-mb-[15rem] tw-mb-5"
          >
            <Swiper
              :autoplay="true"
              :loop="true"
              :pagination="{
                clickable: true,
              }"
              :modules="[SwiperAutoplay, SwiperPagination]"
            >
              <SwiperSlide
                v-for="(item, key) in single_product?.data.product.gallery"
                :key="key * 50"
              >
                <BaseImage
                  class_styles="md:tw-size-[27rem] sm:tw-size-[27rem] tw-size-[17rem] tw-m-auto tw-object-contain  "
                  :thumbnail="item"
                  :place_holder="LoadingSvg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </BaseContainer>
    </div>
    <BaseContainer>
      <!-- Product-Info -->
      <div
        class="tw-flex tw-flex-col tw-items-start lg:tw-mt-48 md:tw-mt-28 tw-mt-20 tw-mb-20"
      >
        <p
          v-html="single_product?.data.product.long_description"
          class="tw-text-[#353C40] tw-max-w-[95%] lg:tw-max-w-[75%] tw-text-[18px] tw-mt-5 *:!tw-text-start"
        />
      </div>
      <!-- RELATED ** PRODUCTS -->
      <div
        class="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-y-10 tw-mb-20 tw-mt-32"
      >
        <h2 class="tw-text-[#212122] tw-font-medium tw-text-[30px]">
          {{ t("Related Products") }}
        </h2>
        <Button
          :text="t('Browse All Products')"
          :border="true"
          @click="router.push('/products')"
          text_color="#000"
          border_color="#b7c2c8"
          class="!tw-py-3 !tw-px-10"
          hoverEffect="filled-top-to-bottom"
          hover_text="#fff"
          hover_bg="#fbaf40"
          icon="ic:baseline-arrow-right-alt"
        />
      </div>
      <div
        class="tw-grid xl:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-2 tw-gap-10 tw-my-10 tw-overflow-hidden"
      >
        <Product
          v-if="!pending"
          v-for="product in single_product?.data.related_products"
          :key="product.id"
          :product="product"
        />
      </div>
      <!-- RELATED ** PRODUCTS -->
    </BaseContainer>
  </section>
</template>
<style scoped lang="scss">
:deep(.swiper-pagination) {
  // bottom: -2% !important;
}
span.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #f2b149 !important;
}
:deep(.swiper) {
  overflow-y: visible !important;
}

:deep(.swiper-pagination-clickable .swiper-pagination-bullet) {
  background: #d2d2d4;
}
:deep(.swiper-pagination-clickable) {
  overflow: hidden;
  white-space: nowrap;
}
:deep(.swiper-pagination-bullet-active) {
  background: #f2b149 !important;
  border-radius: 15px !important ;
}
:deep(.n-notification-container) {
  z-index: 999999999999999999999999 !important;
}
:deep(.n-notification) {
  z-index: 999999999999999999999999 !important;
}
</style>
