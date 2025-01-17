<script lang="ts" setup>
const props = defineProps<{
  thumbnail?: string;
  class_styles?: string[] | string;
  parent_class_styles?: string;
  alt?: string;
  place_holder?: string;
  spiner?: string;
}>();

const isLoading = ref(true);

function handleImageLoad() {
  isLoading.value = false;
}

const placeholder = computed(() => {
  return (
    props.place_holder ||
    " https://via.placeholder.com/300x300/000000/FFFFFF.png?text=Loading"
  );
});
</script>

<template>
  <div
    :class="[
      'image-wrapper',
      parent_class_styles,
      isLoading
        ? 'pending tw-flex tw-justify-center tw-items-center'
        : 'loaded',
    ]"
  >
    <!-- Image -->
    <img
      :src="thumbnail || placeholder"
      :class="[class_styles, 'image', 'tw-object-contain']"
      :alt="alt || 'Image Placeholder'"
      loading="lazy"
      @load="handleImageLoad"
    />

    <!-- Placeholder Spinner -->
    <div
      v-if="isLoading"
      class="spinner tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full tw-absolute tw-left-0 tw-inset-y"
    >
      <Icon class="tw-text-black" name="svg-spinners:90-ring" size="30" />
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.image-wrapper.pending {
  display: flex;
  align-items: center;
}

.image-wrapper.loaded .spinner {
  display: none;
}

.image-wrapper img.image {
  opacity: 0;
  transform: scale(1);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.image-wrapper.loaded img.image {
  opacity: 1;
}
</style>
