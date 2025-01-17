<script lang="ts" setup>
import BlogLoader from "~/components/loaders/blogLoader.vue";
import Content from "~/components/pages/blogs/Content.vue";
import OxygenNitrogen from "~/components/pages/blogs/Oxygen-Nitrogen.vue";
import RelatedBlogs from "~/components/pages/blogs/RelatedBlogs.vue";
import type { BlogResponse } from "~/types";
const route = useRoute();
const blogId = route.params.slug.toString();
const URL = `/blog/${blogId}`;

const {
  data: single_blog,
  pending,
  error,
} = await useFetch<BlogResponse>(URL, {
  baseURL: useRuntimeConfig().public.baseURL,
  lazy: true,
  server: true,
  onRequest() {
    if (process.client && window) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }
  },
  onResponse({ response }) {
    const blog = response._data.data.blog;
    if (blog) {
      useSeoMeta({
        title: blog.title,
        ogTitle: blog.title,
        description: blog.description,
        ogDescription: blog.description,
        ogImage: blog.image,
      });
    }
  },
});
</script>
<template>
  <div>
    <BlogLoader v-if="pending" />
    <OxygenNitrogen
      v-if="!pending && single_blog?.data?.blog"
      :blog="single_blog?.data?.blog"
      :loading="pending"
    />
    <Content
      :blog="single_blog?.data?.blog"
      v-if="!pending && single_blog?.data?.blog"
    />
    <RelatedBlogs
      v-if="!pending && single_blog?.data?.blog"
      :blogs="single_blog?.data?.relatedBlogs"
    />
  </div>
</template>

<style></style>
