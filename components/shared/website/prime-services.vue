<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import Cup from "~/components/ui/cup.vue";
import Slash from "~/components/ui/slash.vue";
import type { ISecond_section, IServices } from "~/types";
import { useRouter } from "vue-router";
const { data, services } = defineProps<{
  data: ISecond_section;
  services?: IServices[];
  numb_sections?: string;
}>();

const router = useRouter();
const navigateToServices = async () => {
  await router.push("/services");
  // Give the page more time to fully render
  setTimeout(() => {
    const element = document.getElementById("services-contact-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Element 'services-contact-us' not found");
    }
  }, 500); // Increased timeout to 500ms
};
</script>
<template>
  <section id="prime-services" class="tw-py-20">
    <BaseContainer>
      <div class="tw-flex tw-items-center tw-gap-2">
        <p class="tw-text-basecolor tw-text-[1.125rem]">{{ numb_sections }}</p>
        <component :is="Slash" />
      </div>
      <div
        class="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-y-3 tw-mt-3"
      >
        <div>
          <h3
            class="md:tw-text-[3.125rem] tw-text-[2.125rem] rtl:tw-max-w-5xl tw-max-w-xl tw-font-semibold tw-text-[#212122]"
          >
            {{ data.title }}
          </h3>
        </div>
      </div>
      <!-- services -->
      <div>
        <div
          class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-x-20 tw-gap-y-10 tw tw-py-12 tw-mt-5"
        >
          <div v-for="(service, index) in services" :key="service.id">
            <div class="tw-flex tw-items-start tw-gap-4">
              <div>
                <img
                  class="tw-min-h-[30px] tw-min-w-[30px] tw-object-contain"
                  :src="service.image"
                  alt=""
                />
              </div>
              <div>
                <h4 class="tw-text-[1.4rem] tw-font-semibold tw-text-[#212122]">
                  {{ service.title }}
                </h4>
                <p class="tw-text-[1.1rem] tw-mt-2 tw-text-[#636363]">
                  {{ service.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tw-mt-5 tw-flex tw-items-center lg:tw-items-center tw-justify-center tw-gap-5 lg:tw-flex-row md:tw-flex-col tw-flex-col"
        >
          <Button
            :text="data.button_text"
            bgColor="var(--primary)"
            class="!tw-py-3"
            icon="ic:baseline-arrow-right-alt"
            text_color="#fff"
            hoverEffect="filled-slide-right"
            @click="navigateToServices"
            width="250px"
          />
        </div>
      </div>
      <!-- services -->
    </BaseContainer>
  </section>
</template>

<style></style>
