<script lang="ts" setup>
import { computed } from "vue";
import { defineProps } from "vue";

type Props = {
  text?: string | undefined | null;
  bgColor?: string;
  text_color?: string;
  border?: boolean;
  border_color?: string;
  icon?: string;
  hover_text?: string;
  hoverEffect?: string;
  hover_bg?: string;
  isLoading?: boolean;
  width?: string;
  iconClass?: string;
};

const props = defineProps<Props>();

const buttonClasses = computed(() => {
  return [
    "btn tw-flex tw-rounded-[5rem] tw-py-2 tw-px-5 tw-justify-center tw-items-center tw-gap-2",
    props.width ? `!tw-w-[${props.width}]` : "",
    props.border
      ? `tw-border tw-border-[${props.border_color}] hover:tw-border-[#000]`
      : "",
    props.hoverEffect ? `hover-${props.hoverEffect}` : "",
  ];
});
</script>

<template>
  <button
    :class="buttonClasses"
    :style="{
      backgroundColor: props.border ? 'transparent' : props.bgColor,
      color: props.text_color, width: props.width
    }"
  >
    <h3 class="tw-z-50" v-if="props.text">{{ props.text }}</h3>

    <span v-if="props.icon" class="tw-flex tw-items-center tw-z-[1] tw-gap-2">
      <Icon
        class="rtl:tw-rotate-180"
        :class="props.iconClass"
        :name="props.isLoading ? 'svg-spinners:180-ring' : props.icon"
        size="25"
      />
    </span>
  </button>
</template>

<style scoped lang="scss">
/* Base Button */
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
/* Hover Filled Slide Right */
.hover-filled-slide-right::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 0;
  background-color: var(--hover-color, rgb(28, 31, 30));
  transition: 0.3s ease-out;
}

.hover-filled-slide-right:hover::before {
  width: 100%;
}

/* Hover Filled Top to Bottom */
.hover-filled-top-to-bottom::before {
  content: "";
  position: absolute;
  top: -66px;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(1);
  background-color: v-bind(hover_bg) !important;
  transition: top 0.4s ease-out;
  z-index: 1;
}

.hover-filled-top-to-bottom:hover::before {
  height: 100%;
  transform: scaleY(1);
  top: 0;
}

.hover-filled-top-to-bottom:hover h3 {
  color: v-bind(hover_text) !important;
  transition: 0.5s ease-in-out;
}

.btn h2,
.btn span {
  position: relative;
  z-index: 89999;
  color: var(--text-color, inherit);
}
</style>
