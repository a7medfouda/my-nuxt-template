<script lang="ts" setup>
import useLangHandler from "~/composables/core/useI18nHandler";
import { ref } from "vue";
import { onClickOutside, onKeyStroke } from "@vueuse/core";

const isOpen = ref(false);
const dropdownRef = ref(null);

const { locale, t } = useI18n({ useScope: "global" });
const { setLang } = useLangHandler();

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

onKeyStroke("Escape", () => {
  isOpen.value = false;
});
defineProps<{
  path: string[];
}>();
</script>
<template>
  <div class="tw-relative" ref="dropdownRef">
    <!-- Language Trigger Button -->
    <button
      @click="isOpen = !isOpen"
      class="tw-flex tw-items-center tw-gap-2 tw-text-white hover:tw-text-primary tw-transition-colors tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-white/10"
    >
      <Icon
        name="material-symbols:language"
        size="24"
        :class="[
          path.some((p) => $route.path.startsWith(p))
            ? 'tw-text-black'
            : 'tw-text-white',
        ]"
      />
      <span
        class="tw-text-sm tw-font-medium"
        :class="[
          path.some((p) => $route.path.startsWith(p))
            ? 'tw-text-black'
            : 'tw-text-white',
        ]"
      >
        {{ locale === "en" ? "EN" : " AR" }}
      </span>
      <Icon
        name="mdi:chevron-down"
        size="20"
        :class="[
          'tw-transition-transform tw-duration-200',
          { 'tw-rotate-180': isOpen },
          path.some((p) => $route.path.startsWith(p))
            ? 'tw-text-black'
            : 'tw-text-white',
        ]"
      />
    </button>
    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="tw-absolute tw-right-0 tw-mt-2 tw-bg-white tw-rounded-lg tw-shadow-xl tw-py-2 tw-min-w-[160px] tw-border tw-border-gray-100 tw-animate-fadeIn"
    >
      <button
        @click="
          {
            setLang('en');
            isOpen = false;
          }
        "
        class="tw-w-full tw-text-left tw-px-4 tw-py-2.5 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50 tw-flex tw-items-center tw-gap-2 tw-font-medium"
      >
        <Icon name="circle-flags:uk" size="20" />
        {{ t("English") }}
      </button>
      <button
        @click="
          {
            setLang('ar');
            isOpen = false;
          }
        "
        class="tw-w-full tw-text-left tw-px-4 tw-py-2.5 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50 tw-flex tw-items-center tw-gap-2 tw-font-medium"
      >
        <Icon name="circle-flags:sa" size="20" />
        {{ t("Arabic") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.tw-animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
