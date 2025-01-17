<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

// Props
const { vedio } = defineProps<{
  vedio: string;
}>();

// Refs
const playState = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);

const handlePlay = () => {
  if (videoRef.value) {
    videoRef.value.play();
    playState.value = true;
  }
};

const handlePause = () => {
  if (videoRef.value) {
    videoRef.value.pause();
    playState.value = false;
  }
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
});

watch(playState, (newState) => {
  if (videoRef.value) {
    if (newState) {
      videoRef.value.play();
    } else {
      videoRef.value.pause();
    }
  }
});
</script>

<template>
  <div class="--video">
    <!-- Overlay and Play Button with Transition -->
    <transition
      name="fade"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <div v-if="!playState" class="overlay" />
    </transition>

    <transition
      name="fade"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <div v-if="!playState" class="--thumbnail">
        <div class="--play" @click="handlePlay">
          <img
            src="~/assets/images/6543a1ba207e36ec38fb0081_play-button-image-industrial-x-webflow-template.png"
            alt="Play Button"
          />
        </div>
      </div>
    </transition>

    <!-- Video Element with dynamic controls -->
    <video
      ref="videoRef"
      class="tw-w-full md:tw-h-[40.625rem] tw-h-[18.625rem] tw-object-cover"
      :src="vedio"
      :controls="playState"
    />
    <!-- Hidden canvas for thumbnail generation -->
    <canvas ref="thumbnailRef" style="display: none" width="360" height="240" />
  </div>
</template>

<style lang="scss" scoped>
.--video {
  @apply tw-mt-20 md:tw-min-h-[40.568rem] sm:tw-min-h-[15.568rem] tw-min-h-[15.568rem] tw-w-full tw-relative tw-overflow-hidden;

  /* Overlay transition */
  .overlay {
    @apply tw-z-[2] tw-absolute tw-size-full tw-inset-y-0 tw-bg-black tw-opacity-50;
    transition: opacity 0.5s ease;
  }

  .--thumbnail {
    @apply tw-absolute tw-inset-x-0 tw-inset-y-0 tw-size-full tw-flex tw-items-center tw-justify-center;

    .thumbnail-image {
      @apply tw-object-cover tw-w-full tw-h-full;
    }

    .--play {
      @apply tw-z-50 md:tw-w-[6.75rem] md:tw-h-[6.75rem] tw-w-[3.75rem] tw-h-[3.75rem] tw-absolute tw-left-1/2 tw-top-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  }

  /* Play button transition */
  .--play-enter-active,
  .--play-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .--play-enter,
  .--play-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  /* Video styling */
  video {
    @apply tw-z-[3];
  }
}
</style>
