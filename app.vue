<script lang="ts" setup>
import {
  arDZ,
  dateArDZ,
  dateEnUS,
  enUS,
  NConfigProvider,
  NNotificationProvider,
} from "naive-ui";
import useNaiveTheme from "~/composables/core/useNaiveTheme";
import useI18nHandler from "~/composables/core/useI18nHandler";
import ThemeConfig from "~/theme.config";

const { getBodyClasses } = ThemeConfig();
const { themeOverrides } = useNaiveTheme();

const { setLang, langCookie } = useI18nHandler();

setLang(langCookie.value);

// console.log(`:root{${getBodyClasses()}}`);

// console.log(getBodyClasses());
useHead({
  style: [{ innerHTML: `:root{${getBodyClasses()}}` }],
});
</script>
<template>
  <n-config-provider
    :date-locale="langCookie === 'en' ? dateEnUS : dateArDZ"
    :locale="langCookie === 'en' ? enUS : arDZ"
    :theme-overrides="themeOverrides"
  >
    <client-only>
      <n-notification-provider>
        <NuxtLoadingIndicator :height="6" />
        <nuxtLayout>
          <NuxtPage />
        </nuxtLayout>
      </n-notification-provider>
    </client-only>
  </n-config-provider>
</template>
