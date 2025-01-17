<template>
  <div>
    <BaseContainer>
      <h1 class="tw-text-[2rem] md:tw-text-[3rem] lg:tw-text-[4rem] tw-text-secondary tw-capitalize " v-if="data">
       {{ data.title }}
      </h1>
    </BaseContainer>
  </div>
</template>
<script lang="ts" setup>
interface PageData {
  type: string;
  title: string;
  content: string;
}

defineProps<{
  data: PageData;
}>();
</script>
<style></style>
