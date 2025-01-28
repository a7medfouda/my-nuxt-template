import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["@/assets/styles/_base.scss"],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "no url",
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "nuxt-swiper",
    "@pinia/nuxt",
    "nuxtjs-naive-ui",
  ],
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});
