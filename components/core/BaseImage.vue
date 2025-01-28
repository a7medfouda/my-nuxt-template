<script lang="ts" setup>
type IProps = {
  src: string;
  placeholder?: string;
  alt: string;
  lazy?: boolean;
  variant?: "cover" | "contain";
};
const props = withDefaults(defineProps<IProps>(), {
  lazy: true,
  src: "",
  alt: "",
  placeholder: "/logo_mb.svg",
  variant: "cover",
});

async function checkImageURL(url: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve();
    img.onerror = () => reject();
  });
}

const placeholderSrc = ref(
  props.placeholder ? props.placeholder : "/logo_mb.svg"
);
const mainSrc = ref(props.src);

const checkImage = async () => {
  checkImageURL(props.src)
    .then(() => {
      console.log("Image loaded successfully", props.src);
    })
    .catch(() => {
      console.error("Error loading the image");
      mainSrc.value = placeholderSrc.value;
    });
};

const style = computed(() => {
  if (mainSrc.value === placeholderSrc.value) return { background: "#000000" };
  return { background: "transparent" };
});
const img = useImage();

const isImage = computed(
  () =>
    props.src.trim().split("").length > 0 &&
    props.alt.trim().split("").length > 0
);

const handleError = () => {
  console.error("IMAGE ERROR ->", props.src);
  mainSrc.value = placeholderSrc.value;
};
</script>

<template>
  <template v-if="isImage">
    <nuxt-img
      :alt="alt"
      :fit="variant"
      :loading="lazy ? 'lazy' : 'eager'"
      :src="mainSrc"
      :style="{ objectFit: variant }"
      densities="x1 x2"
      height="100"
      sizes="100vw sm:50vw md:400px"
      width="100"
      @load="checkImage"
      @error="handleError"
    />
  </template>
  <template v-else>
    <nuxt-img
      :src="'/logo_mb.svg'"
      alt=" logo placeholder"
      densities="x1 x2"
      fit="cover"
      height="50"
      loading="lazy"
      sizes="100vw sm:50vw md:400px"
    />
  </template>
</template>

<style lang="scss" scoped></style>
