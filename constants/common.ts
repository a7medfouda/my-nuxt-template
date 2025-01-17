import { useI18n } from "vue-i18n";

export const useServicesMeta = () => {
  const { t } = useI18n({ useScope: "global" });

  return [
    {
      hid: "description",
      name: "description",
      content: t("services.description"),
    },
    {
      name: "keywords",
      content: t("services.keywords"),
    },
    {
      name: "robots",
      content: t("services.robots"),
    },
    {
      name: "og:title",
      content: t("services.ogTitle"),
      property: "og:title",
    },
    {
      name: "og:description",
      content: t("services.ogDescription"),
      property: "og:description",
    },
    {
      name: "og:image",
      content: t("services.ogImage"),
      property: "og:image",
    },
    {
      name: "og:url",
      content: t("services.ogUrl"),
      property: "og:url",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: t("services.ogTitle"),
    },
    {
      name: "twitter:description",
      content: t("services.ogDescription"),
    },
    {
      name: "twitter:image",
      content: t("services.ogImage"),
    },
  ];
};
