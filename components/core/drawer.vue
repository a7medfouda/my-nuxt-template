<script lang="ts" setup>
import SocialMediaIcons from "./SocialMediaIcons.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

function closeDrawer() {
  emit("close");
}
</script>

<template>
  <div class="">
    <div
      class="tw-fixed tw-top-0 tw-left-0 tw-h-full tw-w-full tw-z-[999999] tw-bg-[#212122] tw-shadow-lg"
      :class="{
        'tw-transform tw-transition-transform tw-duration-300': true,
        'tw-translate-x-0': isOpen,
        'tw-translate-x-[-100%]': !isOpen,
      }"
    >
      <!-- Drawer content -->
      <div
        class="tw-flex tw-flex-col tw-mt-3 md:tw-mt-20 tw-overflow-hidden tw-px-5"
      >
        <Icon
          @click.self="closeDrawer"
          role="button"
          name="ic:round-close"
          class="tw-text-white"
          :size="40"
        />
        <ul class="tw-flex tw-flex-col tw-mt-8">
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/"
          >
            <li class="tw-py-5">{{ t("Home") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/products"
          >
            <li class="tw-py-5">{{ t("Products") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/services"
          >
            <li class="tw-py-5">{{ t("Services") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/about-us"
          >
            <li class="tw-py-5">{{ t("About Us") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/blogs"
          >
            <li class="tw-py-5">{{ t("Blogs") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/careers"
          >
            <li class="tw-py-5">{{ t("Careers") }}</li>
          </NuxtLink>
          <NuxtLink
            @click="closeDrawer"
            class="tw-text-[18px] mobile-links tw-text-[#b4b4b4] tw-font-semibold tw-block"
            exact-active-class="!tw-text-basecolor tw-font-bold"
            to="/contact-us"
          >
            <li class="tw-py-5">{{ t("Contact Us") }}</li>
          </NuxtLink>
        </ul>
        <div class="tw-absolute tw-bottom-10 tw-inset-x-0 tw-z-[1] tw-px-5">
          <SocialMediaIcons />
          <!-- copyright -->
          <div
            class="tw-flex tw-items-center tw-justify-center tw-mt-3 sm:tw-mt-5"
          >
            <div>
              <h2
                class="tw-text-[#B7C2C8] tw-text-[14px] md:tw-text-[16px] tw-text-center tw-font-medium"
              >
                {{ t("© Copyright High Performance Industries | Designed by") }}
                <a
                  href="https://quarizm.tech/"
                  target="_blank"
                  class="tw-decration-[none] tw-text-[var(--primary)]"
                >
                  Quarizm solutions</a
                >
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tw-transition-transform {
  transition: transform 0.3s ease-in-out;
}
.mobile-links {
  @apply tw-relative;
  &.router-link-active::before {
    @apply tw-w-full;
  }
  &::after {
    content: "";
    @apply tw-absolute -tw-bottom-0 tw-block tw-h-[2px] tw-w-full tw-z-10;
    background: rgba(255, 255, 255, 0.06);
  }

  &::before {
    content: "";
    @apply tw-absolute tw-transition-all tw-duration-300 tw-bg-primary tw-w-0 -tw-bottom-0 tw-block tw-h-[2px];
  }

  &:hover::before {
    @apply tw-w-full;
  }
  &:hover li {
    @apply tw-text-primary;
  }
}
</style>
