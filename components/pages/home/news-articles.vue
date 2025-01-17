<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import ArticlesCard from "~/components/shared/website/articles-card.vue";
import { articles } from "~/constants/common";
import type { Blogs, ITenth_Section } from "~/types";
defineProps<{
  data: ITenth_Section;
  blogs: Blogs[];
}>();
</script>
<template>
  <section class="tw-pb-20 tw-pt-24">
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
    >
      <div
        class="tw-divider !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
      >
        <h2 class="tw-text-[1.125rem]">10</h2>
      </div>
      <h2
        class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-mt-3 tw-text-center tw-capitalize tw-text-[#212122] tw-font-semibold"
      >
        {{ data.title }}
      </h2>
      <p
        class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-center tw-m-auto md:tw-w-[29rem] tw-max-w-lg tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
      >
        {{ data.description }}
      </p>
      <BaseContainer>
        <div
          class="tw-grid tw-gap-8 tw-overflow-hidden md:tw-gap-14 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-mt-14 md:tw-mt-20"
        >
          <ArticlesCard
            v-for="article in blogs.slice(0, 3)"
            :key="article.id"
            :blog="article"
          />
        </div>
        <div class="tw-flex tw-items-center tw-justify-center tw-mt-20">
          <NuxtLink to="/blogs">
            <Button
              :text="data.button_text"
              :border="true"
              text_color="#000"
              border_color="#b7c2c8"
              class="!tw-py-3 !tw-px-10"
            />
          </NuxtLink>
        </div>
      </BaseContainer>
    </div>
  </section>
</template>

<style></style>
