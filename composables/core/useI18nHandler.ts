import { useI18n } from "vue-i18n";

type Lang = "ar" | "en";
type Currency = "SAR" | "USD";

export default function () {
  const refreshing = ref(false);

  const langCookie = useCookie<Lang>("lang");
  if (!langCookie.value) {
    langCookie.value = "en";
  }

  const currency = ref<Currency>(langCookie.value === "ar" ? "SAR" : "USD");

  const { locale, t, n } = useI18n({ useScope: "global" });
  const route = useRoute();

  const htmlAttrs = computed(() => ({
    lang: langCookie.value,
    dir: langCookie.value === "ar" ? "rtl" : "ltr",
  }));

  const setLang = async (lang: Lang) => {
    langCookie.value = lang;
    locale.value = lang;

    currency.value = lang === "ar" ? "SAR" : "USD";
    useHead({
      // @ts-ignore
      htmlAttrs: htmlAttrs.value,
      bodyAttrs: htmlAttrs.value,
    });

    // Refresh Nuxt data
    // refreshing.value = true;
    // try {
    //   await refreshNuxtData();
    // } finally {
    //   refreshing.value = false;
    // }
  };

  const setCurrency = (newCurrency: Currency) => {
    currency.value = newCurrency;
  };

  const currencyOptions = [
    { label: "ريال سعودي", value: "SAR" },
    { label: "$ Dollar", value: "USD" },
  ];

  return {
    setLang,
    t,
    n,
    langCookie,
    currency,
    setCurrency,
    currencyOptions,
  };
}
