<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import checkboxGroup from "./checkbox-group.vue";
import type { CategoriesAndBrands, Category } from "~/types";
import FilterLoader from "~/components/loaders/filterLoader.vue";

const { locale } = useI18n({ useScope: "global" });
const categories = ref([]);
const brands = ref([]);
const route = useRoute();
const selectedCategoryIds = ref<number[]>([]);
const { t } = useI18n({ useScope: "global" });

// fetch categories-and-brands 🔥
const { data, pending } = await useFetch<CategoriesAndBrands>(
  "/categories-and-brands",
  {
    baseURL: useRuntimeConfig().public.baseURL,
    lazy: true,
    server: true,
    headers: {
      "Accept-Language": locale,
    },
    onResponse: ({ response }) => {
      data.value = response._data;
      if (response._data.data.categories) {
        categories.value = response._data.data.categories.map(
          (c: Category) => ({
            label: c.name,
            value: c.id,
            slug_en: c.slug_en,
            slug: c.slug,
            product_count: c.product_count,
          })
        );
      }
      if (response._data.data.brands) {
        brands.value = response._data.data.brands.map((c: Category) => ({
          label: c.name,
          value: c.id,
          slug_en: c.slug_en,
          slug: c.slug,
          product_count: c.product_count,
        }));
      }
    },
  }
);

onMounted(() => {
  const categoryQueryKeys = Object.keys(route.query).filter((key) =>
    key.startsWith("category_ids")
  );
  selectedCategoryIds.value = categoryQueryKeys
    .map((key) => parseInt(route.query[key] as string, 10))
    .filter((id) => !isNaN(id));
});
</script>

<template>
  <div>
    <div
      class="lg:tw-block md:tw-flex sm:tw-flex tw-flex tw-items-center tw-gap-3"
    >
      <FilterLoader v-if="pending" />
      <checkboxGroup
        v-if="!pending"
        :data="categories"
        :filter_name="t('Categories')"
        v-model:selectedValues="selectedCategoryIds"
      />
      <checkboxGroup
        v-if="!pending"
        :data="brands"
        :filter_name="t('Brands')"
      />
    </div>
  </div>
</template>
