<script lang="ts" setup>
import type { Blog } from "~/types";
const { t } = useI18n();

const { blog } = defineProps<{
  blog: Blog;
}>();
</script>
<template>
  <div>
    <section class="tw-py-20 tw-pb-96 tw-mt-20 tw-bg-[#f7f7f7]">
      <div>
        <CoreBaseContainer>
          <div
            class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center"
          >
            <div class="tw-text-primary tw-text-[18px]">
              <span>{{ t("News") }}</span>
              <span
                class="tw-text-[#212122] tw-ml-2 rtl:tw-mr-2 rtl:ml-[unset] tw-text-center"
                >{{ blog.date }}</span
              >
              <h3
                class="tw-text-[#212122] md:tw-text-[3.125rem] tw-text-[1.125rem] tw-m-auto tw-text-center tw-leading-[1.2] tw-max-w-3xl tw-capitalize tw-mt-7"
              >
                {{ blog.title }}
              </h3>
              <p
                class="tw-text-[#212122] tw-m-auto tw-max-w-lg tw-mt-3 tw-font-medium tw-text-center"
              >
                {{ blog.description }}
              </p>
            </div>
          </div>
        </CoreBaseContainer>
      </div>
    </section>
  </div>
</template>

<style></style>
