<template>
  <div class="tw-flex tw-items-center tw-justify-center tw-gap-5 tw-text-[24px]">
    <a
      v-if="common.footer.facebook"
      :href="common.footer.facebook"
      target="_blank"
      class="hover:tw-text-[var(--primary)] tw-transition-colors"
      ><Icon name="ri:facebook-fill"
    /></a>
    <a
      v-if="common.footer.x"
      :href="common.footer.x"
      target="_blank"
      class="hover:tw-text-[var(--primary)] tw-transition-colors"
      ><Icon name="simple-icons:x"
    /></a>
    <a
      v-if="common.footer.instagram"
      :href="common.footer.instagram"
      target="_blank"
      class="hover:tw-text-[var(--primary)] tw-transition-colors"
      ><Icon name="ri:instagram-line"
    /></a>
    <a
      v-if="common.footer.linkedin"
      :href="common.footer.linkedin"
      target="_blank"
      class="hover:tw-text-[var(--primary)] tw-transition-colors"
      ><Icon name="ri:linkedin-fill"
    /></a>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from '~/stores/common';
const common = useCommonStore();
</script>
