<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import ArticlesCard from "~/components/shared/website/articles-card.vue";
import type { Blogs } from "~/types";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps<{
  blogs: Blogs[];
}>();
</script>
<template>
  <BaseContainer>
    <div
      class="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-y-10 tw-mt-20"
    >
      <h2 class="tw-text-[#212122] tw-text-[30px]">{{ t("Related Blogs") }}</h2>
      <Button
        @click="
          () => {
            $router.push('/blogs');
          }
        "
        :text="t('Browse Related Blogs')"
        :border="true"
        text_color="#000"
        border_color="#b7c2c8"
        class="!tw-py-3 !tw-px-10"
        hoverEffect="filled-top-to-bottom"
        hover_text="#fff"
        hover_bg="#fbaf40"
        icon="ic:baseline-arrow-right-alt"
      />
    </div>
    <div
      class="tw-grid xl:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-20 tw-my-10 tw-overflow-hidden"
    >
      <ArticlesCard
        v-for="article in blogs.slice(0, 3)"
        :key="article.id"
        :blog="article"
      />
    </div>
  </BaseContainer>
</template>

<style></style>
