<script lang="ts" setup>
import {
  arDZ,
  dateArDZ,
  dateEnUS,
  enUS,
  NConfigProvider,
  NNotificationProvider,
  useNotification
} from "naive-ui";
import useI18nHandler from "./composables/core/useI18nHandler";
const notificationConfig = {
  containerStyle: {
    zIndex: 9999999999999, // Very high z-index
    position: 'fixed',
    // Ensure it's positioned relative to the viewport on mobile
    top: 'env(safe-area-inset-top)', // Respects safe areas on modern mobile browsers
    right: '0',
    left: '0'
  }
};

// 🎌
const { setLang, langCookie } = useI18nHandler();
const { t } = useI18n();
useHead({
  title: t("headTitle"),
  titleTemplate: "%s - " + t("siteTitle"),
});
onMounted(async () => {
  setLang(langCookie.value);
});
</script>
<template>
  <Transition name="page">
    <n-config-provider
      :notification="notificationConfig"
      :date-locale="langCookie === 'en' ? dateEnUS : dateArDZ"
      :locale="langCookie === 'en' ? enUS : arDZ"
    >
      <client-only>
        <n-notification-provider class="!tw-z-[99999999999999999999999]">
          <NuxtLoadingIndicator color="#fbaf40" :height="3" />
          <nuxtLayout>
            <NuxtPage />
          </nuxtLayout>
        </n-notification-provider>
      </client-only>
    </n-config-provider>
  </Transition>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-5px);
  }
  :deep(.n-notification-container) {
    z-index: 999999999999999999999999 !important;
  }
  :deep(.n-notification) {
    z-index: 999999999999999999999999 !important;
  }
  @media screen and (max-width: 768px) {
  :deep(.n-notification-container) {
    position: fixed !important;
    z-index: 9999999999999999 !important;
    /* Ensure it respects the safe areas on mobile devices */
    padding-top: env(safe-area-inset-top) !important;
    /* Optional: adjust the notification position for mobile */
    top: 0 !important;
    right: 0 !important;
    left: 0 !important;
  }

  :deep(.n-notification-main) {
    /* Optionally adjust the individual notification styling for mobile */
    margin: 8px !important;
    max-width: calc(100% - 16px) !important;
  }
}
</style>
