<template>
  <div>
    <div class="content" v-if="data">
      <p class="tw-text-secondary tw-text-[18px]" v-html="data.content">
       
      </p>
    </div>
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
<style scoped>
.content {
  line-height: 1.7;
  padding: 15px;
  border: 1px solid #ffa62f;
  border-radius: 10px;
}
</style>
