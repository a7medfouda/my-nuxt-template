<script lang="ts" setup>
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import BaseImage from "~/components/core/BaseImage.vue";
import type { Blogs } from "~/types";

const router = useRouter();

function navigateToBlog(id: string | number | undefined): void {
  // Navigate to the blog page
  router.push(`/blogs/${id}`);
}
defineProps<{
  blog: Blogs;
}>();
</script>
<template>
  <article
    role="button"
    @click="navigateToBlog(blog.slug)"
    class="--article"
  >
    <h2
      class="tw-text-[var(--primary)] tw-text-[1.125rem] tw-font-medium tw-mb-3"
    >
      {{ blog.slug }}
    </h2>
    <div class="--article thumbnail">
      <BaseImage
        class_styles="tw-w-full tw-object-cover  tw-min-h-[21.188rem] tw-max-h-[21.188rem]"
        :thumbnail="blog.image"
        :place_holder="LoadingSvg"
      />
    </div>
    <div class="--article content">
      <h2 class="title">{{ blog.title }}</h2>
      <p class="subtitle">
        {{ blog.description }}
      </p>
      <span class="date">{{ blog.date }} </span>
    </div>
  </article>
</template>
<style lang="scss" scoped>
.--article {
  @apply tw-flex tw-flex-col tw-items-start;
}
.--article.thumbnail {
  @apply tw-min-h-[21.188rem] tw-object-cover tw-w-full tw-max-h-[21.188rem] tw-flex tw-items-center tw-justify-center;
}
.--article.content {
  @apply tw-flex tw-flex-col;
  .title {
    @apply tw-text-[#212122] tw-text-[1.2rem] tw-max-w-md tw-mt-3 tw-font-semibold tw-mb-3;
  }
  .subtitle {
    @apply tw-text-[#353C40] tw-text-[1.125rem] tw-max-w-md tw-mb-3;
  }
  .date {
    @apply tw-text-[#7D7D7D] tw-text-[0.875rem] tw-font-medium tw-mb-3;
  }
}
</style>
