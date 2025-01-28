import { useI18n } from "vue-i18n";
type Lang = "en" | "ar";
export default function () {
  const refreshing = ref(false);

  const langCookie = useCookie<Lang>("lang");
  langCookie.value = langCookie.value || "en";

  const { locale, t } = useI18n({ useScope: "global" });
  const route = useRoute();

  const htmlAttrs = computed(() => {
    const _routeName = route.name;
    const routeName = _routeName ? _routeName.toString() : "";

    const _locale = langCookie.value;
    // @ts-ignore
    return {
      lang: _locale,
      dir: _locale === "ar" ? "rtl" : "ltr",
    };
  });
  const setLang = async (lang: Lang) => {
    // console.log(langCookie.value);
    langCookie.value = lang;
    locale.value = lang;
    useHead({
      // @ts-ignore
      htmlAttrs: htmlAttrs.value,
      bodyAttrs: htmlAttrs.value,
    });
    refreshing.value = true;
    try {
      await refreshNuxtData();
    } finally {
      refreshing.value = false;
    }
  };

  return { setLang, t, langCookie };
}
