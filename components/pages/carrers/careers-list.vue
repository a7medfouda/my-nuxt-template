<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import type { ICareer } from "~/types";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
//  Props 🔥
const {
  careers = [],
  title = "",
  description = "",
} = defineProps<{
  careers: ICareer[];
  title?: string;
  description?: string;
}>();
</script>

<template>
  <section class="tw-pt-20 tw-mt-8">
    <BaseContainer>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
      >
        <h2
          class="tw-text-[2.5rem] md:tw-text-[3.125rem] tw-max-w-md tw-text-center tw-mt-3 tw-capitalize tw-text-[#212122] tw-font-semibold"
        >
          {{ title }}
        </h2>
        <p
          class="tw-text-[1rem] md:tw-text-[1.125rem] tw-text-center md:tw-m-auto sm:tw-w-[29rem] tw-mt-3 tw-capitalize tw-text-[#353E5C] tw-font-semibold"
        >
          {{ description }}
        </p>
      </div>
      <!-- CAREERS-LIST -->
      <div class="tw-mt-20">
        <div
          class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-1 tw-grid-cols-1 tw-mt-10 tw-gap-y-6 tw-gap-x-20"
        >
          <div
            v-for="career in careers"
            class="--careers-list"
            :key="career.id"
          >
            <h2 class="job-title">
              {{ career.title }}
            </h2>
            <p class="about-job">
              {{ career.description }}
            </p>
            <!--  -->
            <div
              class="tw-flex tw-items-center tw-gap-5 md:tw-gap-10 tw-mt-3 tw-justify-between tw-flex-wrap"
            >
              <div class="tw-flex xl:tw-gap-20 tw-gap-5 tw-items-center">
                <div class="tw-mt-2 tw-text-[#101113] tw-text-[1rem]">
                  {{ career.job_type }}
                </div>
                <div class="date tw-mt-2 tw-text-[#353E5C] tw-text-[.9rem]">
                  {{ career.created_at }}
                </div>
              </div>
              <NuxtLink
                :to="`/careers/${career.id}`"
                class="tw-flex tw-gap-2 tw-mt-2 tw-items-center group"
              >
                <h2 class="tw-text-primary">{{ t("Apply Now") }}</h2>
                <svg
                  :class="[
                    'tw-transition-all tw-duration-300',
                    $i18n.locale === 'ar' 
                      ? 'rtl-svg group-hover:tw-translate-x-[10px]' 
                      : 'ltr-svg group-hover:-tw-translate-x-[10px]'
                  ]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M10.4538 3.53799C10.3218 3.40599 10.1688 3.33999 9.99482 3.33999C9.82082 3.33999 9.66782 3.39999 9.53582 3.51999L3.37982 9.40599C3.24782 9.53799 3.18182 9.69399 3.18182 9.87399C3.18182 10.054 3.24782 10.21 3.37982 10.342L9.53582 16.228C9.66782 16.348 9.82382 16.405 10.0038 16.399C10.1838 16.393 10.3338 16.324 10.4538 16.192C10.5738 16.06 10.6308 15.907 10.6248 15.733C10.6188 15.559 10.5558 15.412 10.4358 15.292L4.74782 9.87399L10.4358 4.45599C10.5558 4.33599 10.6188 4.18599 10.6248 4.00599C10.6308 3.82599 10.5738 3.66999 10.4538 3.53799ZM16.4658 9.87399C16.4658 9.69399 16.4028 9.54099 16.2768 9.41499C16.1508 9.28899 15.9978 9.22599 15.8178 9.22599H3.82982C3.64982 9.22599 3.49682 9.28899 3.37082 9.41499C3.24482 9.54099 3.18182 9.69099 3.18182 9.86499C3.18182 10.039 3.24482 10.189 3.37082 10.315C3.49682 10.441 3.64982 10.504 3.82982 10.504H15.8178C15.9978 10.504 16.1508 10.441 16.2768 10.315C16.4028 10.189 16.4658 10.042 16.4658 9.87399Z"
                    fill="#FBAF40"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style lang="scss">
.--careers-list {
  @apply tw-flex tw-flex-col tw-transition  hover:tw-border-[var(--primary)]  tw-border-b tw-border-b-[#b9bccb] tw-pb-5;
  .job-title {
    @apply tw-text-[#101113] tw-text-[1.3rem];
  }
  .about-job {
    @apply tw-text-[#353E5C] tw-text-[1.1rem] tw-mt-2 tw-line-clamp-2;
  }
  svg {
    transform: rotate(180deg);
    transition: all 0.3s ease;
  }

  .group:hover svg {
    transform: rotate(180deg) translateX(-10px);
  }
  
  .ltr-svg {
    transform: rotate(180deg);
  }
  
  .rtl-svg {
    transform: rotate(0deg);
  }

  .group:hover {
    .ltr-svg {
      transform: rotate(180deg) translateX(-10px);
    }
    .rtl-svg {
      transform: translateX(-10px);
    }
  }
}
</style>
