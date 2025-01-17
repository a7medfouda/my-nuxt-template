<script lang="ts" setup>
import LoadingSvg from "~/assets/svg/loading-svgrepo-com.svg";
import BaseImage from "~/components/core/BaseImage.vue";
import type { Blog } from "~/types";

const { blog } = defineProps<{
  blog: Blog;
}>();
</script>
<template>
  <section class="tw-bg-[#fff] tw-py-20">
    <CoreBaseContainer>
      <div class="tw-bg-[#f7f8fa] -tw-mt-[26rem]">
        <BaseImage
          class_styles="tw-w-full tw-bg-[#f7f8fa] tw-object-cover md:tw-h-[506px]  sm:tw-h-[300px]  "
          :thumbnail="blog.image"
          :place_holder="LoadingSvg"
        />
      </div>

      <!-- right-side -->
      <div class="tw-flex tw-mt-32 tw-flex-col">
        <h2
          v-html="blog.long_description"
          class="tw-text-[#212122] tw-text-[35px] tw-font-semibold"
        />
      </div>
      <!--  end-CK-editor-->
    </CoreBaseContainer>
  </section>
</template>

<style></style>
