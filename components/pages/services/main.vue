<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import primeServices from "~/components/shared/website/prime-services.vue";
import type { MainServices } from "~/types";

//  Props 🔥
const { data } = defineProps<{
  data: IServicesPage;
}>();

const layoutData = {
  title: data.title,
  button_text: data.button_text,
};
</script>
<template>
  <section class="tw-pt-20">
    <BaseContainer>
      <primeServices
        numb_sections="01"
        :data="layoutData"
        :services="data.services.data"
      />
    </BaseContainer>
  </section>
</template>

<style></style>
