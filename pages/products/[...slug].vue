<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import CardGroupLoading from "~/components/core/cardGroupLoading.vue";
import Products from "~/components/core/product.vue";
import Filters from "~/components/pages/products/Filters.vue";
import { getProducts, type Buttons } from "~/services/productsFilter";
import type { Product } from "~/types";
import useI18nHandler from "~/composables/core/useI18nHandler";
import { useUseDownloadFiles } from "~/composables/helpers/useDownloadFiles";
// refs 🧧
const { locale, t, n } = useI18n({ useScope: "global" });
const { langCookie } = useI18nHandler();
const hasNextPage = ref(false);
const route = useRoute();
const loading = ref<boolean>(false);
const products = ref<Array<Product>>([]);
const totalProducts = ref<number>(0);
const meta = ref<any>({});
const pageCount = ref<number>(0);
const currentPage = ref(1);
const pageTitle = ref<string>("");
const pageDescription = ref<string>("");
const layoutListed = ref<boolean>(false);
const buttons = ref<Buttons>({
  file_1: "",
  file_2: "",
  file_3: "",
  text_1: "",
  text_2: "",
  text_3: "",
});
// PARSE QUERY ⚓
const parseQueryParams = (query: Record<string, any>, page: number) => {
  const category_ids = Object.keys(query)
    .filter((key) => key.startsWith("category_ids"))
    .map((key) => query[key])
    .reduce((acc, value, index) => {
      acc[`${index}`] = value;
      return acc;
    }, {});
  const brand_ids = Object.keys(query)
    .filter((key) => key.startsWith("brand_ids"))
    .map((key) => query[key])
    .reduce((acc, value, index) => {
      acc[`${index}`] = value;
      return acc;
    }, {});

  return {
    category_ids: Object.keys(category_ids).length ? category_ids : null,
    brand_ids: Object.keys(brand_ids).length ? brand_ids : null,
    search: query.search || null,
    page: page || 1,
    pageSize: query.pageSize || 10,
  };
};
// LOAD-MORE - FUNCTION  🧨
const loadMoreProducts = async () => {
  if (hasNextPage.value && !loading.value) {
    currentPage.value++;
    await fetchProducts(currentPage.value);
  }
};
// Fetch prodcuts with query parameters 🚒
const fetchProducts = async (page: number = 1) => {
  loading.value = true;
  try {
    const queryParams = parseQueryParams(route.query, page);

    if (route.params.slug && Array.isArray(route.params.slug)) {
      const slugValue = route.params.slug[0];
      const parsedSlugValue = slugValue.split("=");
      const categoryId = parsedSlugValue[1];
      queryParams.category_ids = { 0: categoryId };
    }

    const {
      products: productsData,
      title,
      description,
      buttons: buttons_data,
    } = await getProducts(queryParams, langCookie.value || "en");

    console.log("--- Fire request 🔥");
    if (page === 1) {
      // @ts-ignore
      products.value = productsData.data;
    } else {
      // @ts-ignore
      products.value = [...products.value, ...productsData.data];
    }

    totalProducts.value = productsData.meta.total;
    meta.value = productsData.meta;
    pageCount.value = productsData.meta.last_page;
    hasNextPage.value = currentPage.value < pageCount.value;
    buttons.value = { ...buttons.value, ...buttons_data };

    pageTitle.value = title;
    pageDescription.value = description;
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    loading.value = false;
  }
};

useHead({
  title: pageTitle,
  meta: [
    {
      name: "description",
      content: pageDescription,
    },
  ],
});
// ⌚
watch(
  () => route.params,
  async () => {
    currentPage.value = 1;
    console.log(route.params.slug, "route.params");
    await fetchProducts();
  },
  { immediate: true }
);
watch(
  () => langCookie.value,
  async (newValue, oldValue) => {
    if (newValue == oldValue) {
      return;
    }
    if (newValue !== oldValue) {
      currentPage.value = currentPage.value;
      await fetchProducts();
    }
  }
);
</script>

<template>
  <div class="tw-py-28">
    <BaseContainer>
      <div class="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <h2
          class="md:tw-text-[3.125rem] tw-block tw-text-[3.1rem] tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ pageTitle }}
        </h2>
        <p
          class="tw-text-[1rem] sm:tw-text-[1.125rem] tw-block tw-text-center tw-m-auto md:tw-w-[29rem] tw-max-w-md tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
        >
          {{ pageDescription }}
        </p>
        <div
          class="tw-w-full xl:tw-px-10 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5 tw-my-10"
        >
          <div
            v-if="buttons"
            @click="useUseDownloadFiles(buttons.file_1)"
            class="download-button tw-border-2 tw-border-primary/10 hover:tw-bg-primary/10 tw-transition-all tw-duration-300 tw-rounded-[16px] tw-p-5 tw-flex tw-justify-between tw-items-center tw-gap-5 tw-cursor-pointer tw-min-w-full sm:tw-min-w-[unset]"
          >
            <div class="download-icon-wrapper">
              <img
                src="~/assets/svg/download.svg"
                alt=""
                class="download-icon"
              />
            </div>
            <h2
              class="tw-text-[#1A191E] tw-text-[12px] sm:tw-text-[14px] xl:tw-text-[17px] tw-font-semibold"
            >
              {{ buttons.text_1 }}
            </h2>
            <div
              class="tw-flex tw-items-center tw-justify-center tw-size-12 sm:tw-size-14 tw-bg-[#FBF5EC] tw-rounded-full"
            >
              <img src="~/assets/svg/catalog.svg" alt="" />
            </div>
          </div>
          <div
            v-if="buttons"
            @click="useUseDownloadFiles(buttons.file_2)"
            class="download-button tw-border-2 tw-border-primary/10 hover:tw-bg-primary/10 tw-transition-all tw-duration-300 tw-rounded-[16px] tw-p-5 tw-flex tw-justify-between tw-items-center tw-gap-5 tw-cursor-pointer tw-min-w-full sm:tw-min-w-[unset]"
          >
            <div class="download-icon-wrapper">
              <img
                src="~/assets/svg/download.svg"
                alt=""
                class="download-icon"
              />
            </div>
            <h2
              class="tw-text-[#1A191E] tw-text-[12px] sm:tw-text-[14px] xl:tw-text-[17px] tw-font-semibold"
            >
              {{ buttons.text_2 }}
            </h2>
            <div
              class="tw-flex tw-items-center tw-justify-center tw-size-12 sm:tw-size-14 tw-bg-[#FBF5EC] tw-rounded-full"
            >
              <img src="~/assets/svg/catalog.svg" alt="" />
            </div>
          </div>
          <div
            v-if="buttons"
            @click="useUseDownloadFiles(buttons.file_3)"
            class="download-button tw-border-2 tw-border-primary/10 hover:tw-bg-primary/10 tw-transition-all tw-duration-300 tw-rounded-[16px] tw-p-5 tw-flex tw-justify-between tw-items-center tw-gap-5 tw-cursor-pointer tw-min-w-full sm:tw-min-w-[unset]"
          >
            <div class="download-icon-wrapper">
              <img
                src="~/assets/svg/download.svg"
                alt=""
                class="download-icon"
              />
            </div>
            <h2
              class="tw-text-[#1A191E] tw-text-[12px] sm:tw-text-[14px] xl:tw-text-[17px] tw-font-semibold"
            >
              {{ buttons.text_3 }}
            </h2>
            <div
              class="tw-flex tw-items-center tw-justify-center tw-size-12 sm:tw-size-14 tw-bg-[#FBF5EC] tw-rounded-full"
            >
              <img src="~/assets/svg/catalog.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-12 lg:tw-gap-20 tw-py-10">
        <div
          class="lg:tw-col-span-3 md:tw-col-span-12 sm:tw-col-span-12 tw-col-span-12"
        >
          <Filters />
        </div>
        <div
          class="lg:tw-col-span-9 md:tw-col-span-12 sm:tw-col-span-12 tw-col-span-12"
        >
          <div
            class="lg:tw-grid-cols-3 tw-my-5 md:tw-grid-cols-2 sm:tw-grid-cols-2 tw-grid-cols-2 tw-mb-10"
          >
            <div class="tw-flex tw-justify-between">
              <div class="tw-text-[#101113] tw-font-medium tw-text-[28px]">
                {{ t("All Products") }}
              </div>
              <div class="tw-flex tw-gap-4">
                <div
                  :class="[
                    'tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-rounded-[14px] tw-p-2 tw-px-3',
                    !layoutListed
                      ? 'tw-bg-[#FBAF40]'
                      : 'tw-bg-[#E8E8E8] tw-text-black',
                  ]"
                  @click="layoutListed = false"
                >
                  <Icon name="iconamoon:category-thin" :size="30" />
                </div>
                <div
                  :class="[
                    'tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-rounded-[14px] tw-p-2 tw-px-3',
                    layoutListed
                      ? 'tw-bg-[#FBAF40]'
                      : 'tw-bg-[#E8E8E8] tw-text-black',
                  ]"
                  @click="layoutListed = true"
                >
                  <Icon name="material-symbols-light:lists" :size="30" />
                </div>
              </div>
            </div>
          </div>
          <div
            :class="[
              layoutListed
                ? 'tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-x-10 tw-gap-y-10 tw-mt-4 '
                : 'tw-grid tw-gap-x-10 tw-gap-y-10 tw-mt-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 sm:tw-grid-cols-2 tw-grid-cols-2',
            ]"
          >
            <CardGroupLoading :layoutListed="layoutListed" v-if="loading" />
            <template v-else>
              <template v-if="products.length">
                <Products
                  :layoutListed="layoutListed"
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                />
                <div
                  v-if="hasNextPage"
                  @click="loadMoreProducts"
                  class="tw-flex tw-col tw-items-center tw-justify-center lg:tw-col-span-3 md:tw-col-span-2 sm:tw-col-span-2 tw-col-span-2"
                >
                  <Button
                    text="t('Read More')"
                    :border="true"
                    text_color="#000"
                    border_color="#b7c2c8"
                    class="!tw-py-3 !tw-px-10"
                    hoverEffect="filled-top-to-bottom"
                    hover_text="#000"
                    hover_color="#fbaf40"
                    hover_bg="#fbaf40"
                  />
                </div>
              </template>
              <div
                v-else
                class="tw-text-[2.5rem] tw-text-[#3e464b] tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2 lg:tw-col-span-3 md:tw-col-span-2 sm:tw-col-span-2 tw-col-span-2"
              >
                <span>{{ t("Sorry, There is no product found!!") }}</span>
                <span class="tw-text-primary tw-text-[6rem]">
                  <Icon name="mdi:cart-off" />
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style scoped>
.download-icon-wrapper {
  pointer-events: none;
}

.download-icon {
  pointer-events: none;
}

.download-button:hover .download-icon {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
