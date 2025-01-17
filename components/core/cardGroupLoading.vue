<script lang="ts" setup>
defineProps<{
  layoutListed: boolean;
}>();
</script>

<template>
  <div
    :class="
      layoutListed
        ? '!tw-flex tw-flex-row tw-gap-5 tw-items-center tw-w-full'
        : ''
    "
    v-for="item in 9"
    :key="item"
  >
    <n-skeleton height="200px" :width="layoutListed ? '40%' : '100%'" />
    <div :class="layoutListed ? 'tw-flex-col tw-w-full' : 'tw-flex-row'">
      <n-skeleton
        :class="layoutListed ? 'tw-mb-10 tw-w-full' : ''"
        :repeat="2"
        text
      />
      <n-skeleton style="width: 60%" text />
    </div>
  </div>
</template>

<style>
.n-card.tw-flex-row {
  background: red !important;
}
</style>
