<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// refs 📠📠📠🔥🔥
const { t } = useI18n({ useScope: "global" });

const RadioVal = ref<(string | number)[]>([]);
const isAllChecked = ref(false);
const openedDropdown = ref<string | null>(null);
const { filter_name, data } = defineProps<{
  filter_name?: string;
  data: any;
}>();
const visibleCount = ref(5);
const router = useRouter();
const route = useRoute();
// methods
// :load-more 🧓
const showMore = () => {
  visibleCount.value += 5;
};
// 🏁🏁🔥🔥🏁🏁🏁🏁🏁🏁
// update url with query params 🔺🧮🔺
const updateURLQueries = () => {
  const query = { ...route.query };
  let englishFilterName = "";

  if (filter_name === t("Categories")) {
    englishFilterName = "Categories";
  } else if (filter_name === t("Brands")) {
    englishFilterName = "Brands";
  }

  if (englishFilterName === "Categories") {
    Object.keys(query).forEach((key) => {
      if (key.startsWith("category_ids")) delete query[key];
    });
    RadioVal.value.forEach((val, index) => {
      query[`category_ids[${index}]`] = val.toString();
    });
  } else if (englishFilterName === "Brands") {
    Object.keys(query).forEach((key) => {
      if (key.startsWith("brand_ids")) delete query[key];
    });
    RadioVal.value.forEach((val, index) => {
      query[`brand_ids[${index}]`] = val.toString();
    });
  } else if (englishFilterName) {
    if (RadioVal.value.length > 0) {
      query[englishFilterName] = RadioVal.value.join(",");
    } else {
      delete query[englishFilterName];
    }
  }

  // Push the updated query to the router
  router.push({ query });
};
// 🏁🏁🔥🔥🏁🏁🏁🏁🏁🏁🏁
// check all boxes logic 🎴
const toggleCheckAll = () => {
  if (isAllChecked.value) {
    RadioVal.value = data.map((item: any) => item.value);
  } else {
    RadioVal.value = [];
  }
};
// 🏁🏁🔥🔥🏁🏁🏁🏁🏁🏁🏁
// Watche changes in `RadioVal` ⌚
watch(RadioVal, () => {
  isAllChecked.value =
    RadioVal.value.length === data.length && RadioVal.value.length > 0;
  updateURLQueries();
});
// 🏁🏁🔥🔥🏁🏁🏁🏁🏁🏁🏁
// initial checkbox states based on the URL query 🔥🔥🔥🔥 🏁🏁🏁🏁🏁🏁 🔥🔥🔥🔥
onMounted(() => {
  if (filter_name === "Categories" || filter_name === "Brands") {
    const prefix = filter_name === "Categories" ? "category_ids" : "brand_ids";
    const queryValues = Object.keys(route.query)
      .filter((key) => key.startsWith(prefix))
      .map((key) => route.query[key]);
    RadioVal.value = queryValues.map(Number);
  } else if (filter_name) {
    const queryValue = route.query[filter_name];
    if (queryValue) {
      RadioVal.value = queryValue.toString().split(",").map(Number);
    }
  }
});
const toggleDropdown = (dropdownId: any) => {
  if (openedDropdown.value === dropdownId) {
    openedDropdown.value = null;
  } else {
    openedDropdown.value = dropdownId;
  }
};
</script>

<template>
  <div>
    <h2
      class="tw-text-[#212122] lg:tw-block tw-hidden tw-text-[14px] tw-font-semibold tw-mb-5"
    >
      {{ filter_name }}
    </h2>
    <div
      class="tw-items-center tw-gap-5 lg:tw-hidden md:tw-flex sm:tw-flex tw-flex"
    >
      <div
        class="tw-dropdown tw-dropdown-bottom lg:tw-hidden md:tw-block sm:tw-block tw-block"
      >
        <div
          @click="toggleDropdown(filter_name)"
          tabindex="0"
          role="button"
          class="tw-btn tw-m-1"
        >
          <Icon
            size="20"
            :name="
              filter_name === t('Categories')
                ? 'tabler:category-filled'
                : 'material-symbols:filter-list'
            "
          />
          <h2
            class="tw-text-[10px] lg:tw-hidden md:tw-block sm:tw-block tw-block tw-text-black tw-font-semibold"
          >
            {{
              filter_name === t("Categories") ? t("Categories") : t("Brands")
            }}
          </h2>
        </div>

        <ul
          v-if="openedDropdown === filter_name"
          tabindex="0"
          class="tw-dropdown-content tw-z-[999999] tw-menu tw-bg-base-100 tw-rounded-box tw-w-52 tw-p-2 tw-shadow"
        >
          <n-checkbox
            v-model:checked="isAllChecked"
            @update:checked="toggleCheckAll"
            class="tw-mb-2 tw-font-semibold"
            :label="t('all')"
          />

          <n-checkbox-group v-model:value="RadioVal" name="radiogroup">
            <n-space vertical>
              <n-checkbox
                class="tw-mb-2"
                v-for="(checkbox, index) in data.slice(0, visibleCount)"
                :key="index"
                :value="checkbox.value"
                :label="checkbox.label"
              />
            </n-space>
          </n-checkbox-group>
        </ul>
      </div>
    </div>

    <div
      class="lg:tw-flex tw-hidden tw-flex-col tw-border-b tw-pb-5 tw-border-b-[#D9DADB] tw-mb-5"
    >
      <n-checkbox
        v-model:checked="isAllChecked"
        @update:checked="toggleCheckAll"
        class="tw-mb-2 tw-font-semibold"
        :label="t('all')"
      />

      <n-checkbox-group
        v-model:value="RadioVal"
        class="tw-w-full"
        name="radiogroup"
      >
        <n-space vertical>
          <n-checkbox
            class="tw-mb-2 tw-w-full"
            v-for="(checkbox, index) in data.slice(0, visibleCount)"
            :key="index"
            :value="checkbox.value"
          >
            <template #default class="tw-w-full">
              <div class="tw-flex tw-justify-between tw-w-full">
                <span class="tw-text-[#4B5157]">{{ checkbox.label }}</span>
                <span class="tw-text-[#939699] tw-text-[14px]">{{
                  checkbox.product_count
                }}</span>
              </div>
            </template>
          </n-checkbox>
        </n-space>
      </n-checkbox-group>

      <div v-if="data.length > visibleCount">
        <h2
          @click="showMore"
          class="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-[#6D758F] tw-text-[14px] tw-font-semibold"
        >
          Show More
        </h2>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.n-checkbox) {
  --n-border-checked: 1px solid #fbaf40 !important;
  --n-border-focus: 1px solid #fbaf40 !important;
  --n-box-shadow-focus: 0 0 0 2px #fbaf40 !important;
  --n-color-checked: #fbaf40 !important;
}
:deep(.n-checkbox__label) {
  width: 100% !important;
}
</style>
