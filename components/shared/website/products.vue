<script lang="ts" setup>
import Products from "~/components/core/product.vue";
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import Slash from "~/components/ui/slash.vue";
import type { IFifth_Section, IProducts, Product } from "~/types";
// Props 🔥🧨
defineProps<{
  data: IFifth_Section;
  heading?: string;
  with_slash?: boolean;
  products: Product[];
  num_section: string;
}>();
</script>
<template>
  <div class="tw-py-20">
    <BaseContainer>
      <div class="tw-flex tw-flex-col">
        <div v-if="with_slash" class="tw-flex tw-items-center tw-gap-2">
          <p class="tw-text-basecolor tw-text-[1.125rem]">{{ num_section }}</p>
          <component :is="Slash" />
        </div>
        <div
          v-if="with_slash"
          class="tw-flex lg:tw-flex-col tw-gap-y-2 tw-flex-wrap"
        >
          <h2
            class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
          >
            {{ data.title }}
          </h2>
          <p
            class="tw-text-[1.125rem] tw-text-[#353C40] tw-max-w-xl tw-font-medium"
          >
            {{ data.description }}
          </p>
        </div>
        <div
          v-else
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
        >
          <div
            class="tw-divider !tw-font-medium tw-text-[var(--primary)] tw-w-[10rem] tw-m-auto"
          >
            <h2 class="tw-text-[1.125rem]">05</h2>
          </div>
          <h2
            class="md:tw-text-[3.125rem] tw-text-[2.125rem] tw-text-center tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
          >
            {{ data.title }}
          </h2>
          <p
            class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-center tw-m-auto md:tw-w-[29rem] md:tw-max-w-lg tw-max-w-lg tw-mt-3 tw-capitalize tw-text-[#353C40] tw-font-semibold"
          >
            {{ data.description }}
          </p>
        </div>
      </div>

      <div
        class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-2 md:tw-gap-20 tw-gap-5 tw-mt-20 md:tw-mt-32"
      >
        <Products
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="tw-flex tw-items-center tw-justify-center tw-w-full tw-mt-20">
        <Button
          @click="$router.push('/products')"
          :text="data.button_text"
          :border="true"
          to="/contact-us"
          text_color="#000"
          border_color="#b7c2c8"
          class="!tw-py-3 !tw-px-10"
          width="250px"
        />
      </div>
    </BaseContainer>
  </div>
</template>

<style></style>
