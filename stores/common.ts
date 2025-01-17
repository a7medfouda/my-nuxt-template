import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useI18nHandler from "~/composables/core/useI18nHandler";
import type { IHomePage } from "~/types";

type FooterState = {
  title: string | null;
  description: string | null;
  button_text_1: string | null;
  button_text_2: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  facebook: string | null;
  x: string | null;
  instagram: string | null;
  linkedin: string | null;
};

type NotifyCtx = {
  title: string;
  content?: string;
  duration?: number;
};

export const useCommonStore = defineStore("commonData", () => {
  const { locale } = useI18n({ useScope: "global" });
  const route = useRoute();
  const { $api } = useNuxtApp();
  const api = $api as AxiosInstance;
  const state = ref({
    footer: {
      title: null,
      description: null,
      button_text_1: null,
      button_text_2: null,
      email: null,
      phone: null,
      address: null,
      facebook: null,
      x: null,
      instagram: null,
      linkedin: null,
    } as FooterState,
  });

  const footer = computed(() => state.value.footer);

  const setState = (payload: FooterState) => {
    state.value.footer = payload;
  };

  async function loadFooter() {
    const currentFooter = footer.value;
    const isFooterEmpty = Object.values(currentFooter).every(
      (value) => value === null
    );
    if (route.path === "/") {
      return;
    }
    if (isFooterEmpty || locale.value === "en" || locale.value === "ar") {
      try {
        const response = await api.get("/home", {
          headers: {
            "Accept-Language": locale.value,
          },
        });
        setState(response.data.data.landing.footer_section);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }
  }

  function getErrorMsg(e: any) {
    return e || "An error occurred";
  }

  function handleServerErrors(e: any): string {
    console.log(e);
    const errorMsg = getErrorMsg(e);
    return errorMsg;
  }

  function changeLanguage(lang: string) {
    localStorage.setItem("app-lang", lang);
  }

  function loadLanguage(locale: Ref<string>) {
    locale.value = localStorage.getItem("locale") || "en";
  }

  return {
    footer,
    setState,
    loadFooter,
    getErrorMsg,
    handleServerErrors,
    changeLanguage,
    loadLanguage,
  };
});
