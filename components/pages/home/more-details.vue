<script lang="ts" setup>
import CallUs from "~/components/ui/call-us.vue";
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import Location from "~/components/ui/location.vue";

import { useCommonStore } from "~/stores/common";
const common = useCommonStore();
const { locale, t } = useI18n({ useScope: "global" });
</script>
<template>
  <section
    class="-tw-mt-[4rem] md:-tw-mt-[3rem] lg:-tw-mt-[7rem] xl:-tw-mt-[3rem] 2xl:-tw-mt-[5rem]"
  >
    <div
      class="--info lg:!tw-w-[60%] rtl:tw-mr-auto tw-bg-[#f8f8f8] tw-relative tw-z-50 tw-py-10 tw-shadow-md"
    >
      <BaseContainer>
        <div class="--info-wrapper tw-flex tw-gap-10">
          <div class="tw-flex tw-flex-col tw-flex-1">
            <div class="tw-flex tw-gap-4 tw-items-center">
              <component :is="CallUs" />
              <h2 class="tw-text-[#212122] tw-text-[1.5rem] tw-font-semibold">
                {{ t("Call Us") }}
              </h2>
            </div>
            <div class="tw-mt-3 tw-flex tw-gap-2">
              <h2 class="tw-text-[#697B86]">{{ t("Email Address") }}:</h2>
              <NuxtLink target="_blank" class="tw-text-[#212122]">{{
                common.footer.email
              }}</NuxtLink>
            </div>
            <div class="tw-mt-3 tw-flex tw-gap-2">
              <h2 class="tw-text-[#697B86]">{{ t("Phone") }}:</h2>
              <NuxtLink target="_blank" class="tw-text-[#212122]">{{
                common.footer.phone
              }}</NuxtLink>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-flex-1 lg:tw-pr-10">
            <div class="tw-flex tw-gap-4 tw-items-center">
              <component :is="Location" />
              <h2 class="tw-text-[#212122] tw-text-[1.5rem] tw-font-semibold">
                {{ t("Our Location") }}
              </h2>
            </div>
            <div class="tw-mt-3">
              <h2
                class="tw-text-[#212122] tw-text-[18px] tw-w-[13em]"
                v-html="common.footer.address?.replace(/\r\n/g, '<br>')"
              />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.--info-wrapper {
  @apply md:tw-flex-row tw-flex-col;
}
</style>
