<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import type { IFCard } from "~/types";
defineProps<{
  data: IFCard;
}>();
</script>
<template>
  <section id="contact_prompt" class="tw-py-36 tw-overflow-hidden tw-bg-[#f6f8f9]">
    <div data-aos="fade-zoom-in" class="-right-shapes">
      <img src="~/assets/images/Component4.png" alt="" />
    </div>
    <div data-aos="fade-zoom-in" class="--left-shapes">
      <img src="~/assets/images/Container_.png" alt="" />
    </div>
    <BaseContainer>
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
        <h3
          class="md:tw-text-[3.125rem] tw-text-[#212122] sm:tw-text-[2.125rem] tw-text-[2.125rem] tw-max-w-[49rem] tw-text-center tw-font-bold"
        >
          {{ data.title }}
        </h3>
        <div class="tw-mt-5">
          <a href="#contact-us">
            <Button
              :text="data.button_text"
              bgColor="var(--primary)"
              icon="ic:baseline-arrow-right-alt"
              text_color="#fff"
              hoverEffect="filled-slide-right"
              width="200px"
            />
          </a>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style lang="scss">
#contact_prompt {
  @apply tw-bg-cover tw-relative tw-max-h-max tw-min-h-[30.75rem];
}
.-right-shapes {
  @apply tw-absolute tw-right-0 tw-bottom-0 tw-w-[20rem] md:tw-w-[25rem] lg:tw-w-[30rem] xl:tw-w-[40rem];
}
.--left-shapes {
  @apply tw-absolute tw-left-0 tw-top-0 tw-w-[20rem] md:tw-w-[25rem] lg:tw-w-[30rem] xl:tw-w-[40rem];
}
</style>
