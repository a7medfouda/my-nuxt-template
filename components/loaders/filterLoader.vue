<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <div
    class="lg:tw-flex tw-hidden tw-flex-col tw-border-b tw-pb-5 tw-border-b-[#D9DADB] tw-mb-5"
  >
    <div class="tw-flex tw-justify-between">
      <h2
        class="tw-text-[#212122] lg:tw-block tw-hidden tw-text-[14px] tw-font-semibold tw-mb-5"
      >
        {{ t("Categories") }}
      </h2>
      <Icon
        :size="25"
        name="uil:spinner-alt"
        class="tw-text-black tw-animate-spin"
      />
    </div>
  </div>
</template>

<style></style>
