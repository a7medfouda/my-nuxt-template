<script lang="ts" setup>
import { defineProps } from "vue";
interface IProps {
  custome?: boolean | null;
}
const { custome } = defineProps<IProps>();
</script>
<template>
  <div
    :class="[
      custome
        ? 'tw-mx-auto lg:tw-max-w-[1600px] md:tw-w-{1480px} tw-w-full lg:!tw-px-[70px] md:!tw-px-0 sm:!tw-px-0 !tw-px-0'
        : 'tw-mx-auto lg:tw-max-w-[1600px] md:tw-w-{1480px} tw-w-full lg:!tw-px-[70px] md:!tw-px-[35px] sm:!tw-px-[20px] !tw-px-[20px]',
    ]"
  >
    <slot />
  </div>
</template>
