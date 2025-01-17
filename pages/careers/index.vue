<script lang="ts" setup>
import Pagination from "~/components/core/pagination.vue";
import Loader from "~/components/loaders/careersLoader.vue";
import CareersList from "~/components/pages/carrers/careers-list.vue";
import type { ICareerPage, ICareer } from "~/types/index.ts";

const title = ref<string>("");
const description = ref<string>("");
const currentPage = ref<number>(1);
const from = ref<number>(1);
const last_page = ref<number>(1);
const per_page = ref<number>(10);
const to = ref<number>(0);
const total = ref<number>(0);
const careers = ref<ICareer[]>([]);
const { locale } = useI18n();

const { refresh, pending } = await useFetch<ICareerPage>("/careers", {
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
    currentPage.value = response._data.data.careers.meta.current_page;
    from.value = response._data.data.careers.meta.from;
    last_page.value = response._data.data.careers.meta.last_page;
    to.value = response._data.data.careers.meta.to;
    total.value = response._data.data.careers.meta.total;
    per_page.value = response._data.data.careers.meta.per_page;
    title.value = response._data.data.title;
    description.value = response._data.data.description;
    careers.value = response._data.data.careers.data || [];
    useSeoMeta({
      title: response._data.data.title,
      ogTitle: response._data.data.description,
    });
  },
});

const onPageChange = async (page: number) => {
  currentPage.value = page;
  await window.scroll(0, 0);
};
</script>

<template>
  <div>
    <Loader v-if="pending" />
    <CareersList
      :title="title"
      :description="description"
      v-if="careers"
      :careers="careers"
    />
    <Pagination
      v-if="!pending"
      :currentPage="currentPage"
      :lastPage="last_page"
      :total="total"
      :perPage="per_page"
      :from="from"
      :to="to"
      @pageChange="onPageChange"
    />
  </div>
</template>

<style></style>
