<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Pagination from "~/components/core/pagination.vue";
import ArticlesCard from "~/components/shared/website/articles-card.vue";
import SkeletonCards from "~/components/skeleton/CardsLoader.vue";
import type { Blogs, IBlogsPage } from "~/types/index.ts";
import useI18nHandler from "~/composables/core/useI18nHandler";
import { useI18n } from "vue-i18n";
// refs 🧨
const nuxtApp = useNuxtApp();
const { setLang, langCookie } = useI18nHandler();
const currentPage = ref<number>(1);
const from = ref<number>(1);
const last_page = ref<number>(1);
const per_page = ref<number>(10);
const to = ref<number>(0);
const total = ref<number>(0);
const blogs = ref<Blogs[]>([]);
const mainTitle = ref<string>("");
const mainDescription = ref<string>(""); // Fixed typo in variable name

const { t, locale } = useI18n();
// request-with-cache-data 🧨
const { data, pending } = useFetch<IBlogsPage>("/blogs", {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  params: {
    page: currentPage,
  },
  headers: {
    "Accept-Language": locale,
  },
  onResponse: ({ response }) => {
    mainTitle.value = response._data.data.title;
    mainDescription.value = response._data.data.description;
    currentPage.value = response._data.data.blogs.meta.current_page;
    from.value = response._data.data.blogs.meta.from;
    last_page.value = response._data.data.blogs.meta.last_page;
    to.value = response._data.data.blogs.meta.to;
    total.value = response._data.data.blogs.meta.total;
    per_page.value = response._data.data.blogs.meta.per_page;

    if (response._data.data.blogs.data) {
      blogs.value = response._data.data.blogs.data;
    }
  },
});
const onPageChange = async (page: number) => {
  currentPage.value = page;
  await window.scroll(0, 0);
};
watch(pending, (newPending) => {
  if (newPending) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
useSeoMeta({
  title: t("Blogs"),
  ogTitle: t("Blogs"),
});
</script>

<template>
  <section class="tw-pt-20 tw-pb-10 tw-mt-20">
    <BaseContainer>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
      >
        <h2
          class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-text-center tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ mainTitle }}
        </h2>
        <p
          class="md:tw-text-[1.125rem] tw-text-[0.9rem] tw-text-center tw-m-auto lg:tw-w-[29rem] tw-max-w-md tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
        >
          {{ mainDescription }}
        </p>
      </div>

      <!-- loader -->
      <SkeletonCards v-if="pending" />
      <div
        class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-x-20 tw-gap-y-5"
      >
        <ArticlesCard
          v-if="!pending && blogs"
          v-for="blog in blogs"
          :key="blog.id"
          :blog="blog"
        />
      </div>
      <div class="tw-flex tw-items-center tw-justify-center tw-mt-10">
        <Pagination
          :currentPage="currentPage"
          :lastPage="last_page"
          :total="total"
          :perPage="per_page"
          :from="from"
          :to="to"
          @pageChange="onPageChange"
        />
      </div>
    </BaseContainer>
  </section>
</template>

<style></style>
