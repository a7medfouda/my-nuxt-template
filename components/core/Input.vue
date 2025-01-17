<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineProps<{
  label?: string;
  path?: string;
  value?: string;
  place_holder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (newValue: string) => {
  emit("update:modelValue", newValue);
};
</script>

<template>
  <div>
    <n-form-item :label="label" :path="path">
      <n-input
        :value="value"
        @update:value="updateValue"
        :placeholder="place_holder"
      />
    </n-form-item>
  </div>
</template>
