<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import white_logo from "~/assets/images/logo.png";
import dark_logo from "~/assets/images/logo2.png";
import brandIcon from "~/assets/svg/logo.svg";
import Drawer from "~/components/core/drawer.vue";
import SwitchLangIcon from "~/components/core/SwitchLangIcon.vue";
const scrollPosition = ref(0);
const isMenuOpen = ref(false);
const { locale, t } = useI18n({ useScope: "global" });
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const path = [
  "/products",
  "/services",
  "/contact-us",
  "/blogs",
  "/careers",
  "/about-us",
  "/blogs/:id",
  "/product",
  "/terms-and-conditions",
  "/privacy-policy",
];

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollPosition.value = window.scrollY;
  });
});
</script>

<template>
  <header
    :class="[
      'header tw-fixed !tw-z-[999999] tw-w-full',
      // @ts-ignore
      scrollPosition > 50 || ['/'].includes($route.name) ? '--scroll' : '',
      path.some((p) => $route.path.startsWith(p))
        ? '!tw-bg-white !tw-top-0 !tw-mt-0 !tw-py-4 tw-shadow-md'
        : 'md:tw-top-5 md:tw-mt-5 sm:tw-top-5 sm:tw-mt-5 tw-top-3 tw-mt-1 ',
    ]"
  >
    <BaseContainer>
      <div class="tw-flex tw-items-center tw-justify-between">
        <!-- logo -->
        <NuxtLink to="/">
          <img class="tw-size-10 small-logo" :src="brandIcon" alt="logo" />
          <img
            :class="
              scrollPosition > 50
                ? 'tw-size-10 --logo'
                : '--logo tw-object-cover'
            "
            :src="
              scrollPosition > 50
                ? brandIcon
                : $route.path === '/'
                ? white_logo
                : dark_logo
            "
            alt="logo"
          />
        </NuxtLink>

        <!-- links -->
        <nav class="tw-flex-1">
          <ul class="tw-flex tw-justify-center tw-items-center tw-gap-x-20">
            <li>
              <NuxtLink
                to="/"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("Home") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("Products") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/services"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("Services") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about-us"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("About Us") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blogs"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("Blogs") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/careers"
                :class="[
                  'hover:tw-text-basecolor',
                  path.some((p) => $route.path.startsWith(p))
                    ? 'tw-text-black'
                    : 'tw-text-white',
                ]"
                exact-active-class="!tw-text-basecolor tw-font-bold"
              >
                {{ t("Careers") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="tw-flex tw-gap-2 tw-items-center">
          <SwitchLangIcon :path="path" />
          <Button
            class="hidden-in-md"
            :text="t('Contact Us')"
            :bgColor="
              path.some((p) => $route.path.startsWith(p)) ? '#000' : '#fff'
            "
            icon="ic:baseline-arrow-right-alt"
            to="/contact-us"
            :text_color="
              path.some((p) => $route.path.startsWith(p)) ? '#fff' : '#000'
            "
            @click="$router.push('/contact-us')"
          />

          <div
            @click="toggleMenu"
            class="mega-menu tw-flex tw-w-[30px] tw-z-50 tw-duration-1000 tw-gap-[10px] tw-flex-col tw-cursor-pointer"
          >
            <span class="tw-w-full tw-h-[1px] tw-bg-primary"></span>
            <span
              :class="[
                ' tw-transition-all tw-ml-auto tw-duration-300 tw-h-[1px] tw-bg-primary',
                isMenuOpen ? 'tw-w-1/2 ' : 'tw-w-full',
              ]"
            />
            <span class="tw-w-full tw-h-[1px] tw-bg-primary" />
          </div>
          <teleport to="body">
            <Drawer :isOpen="isMenuOpen" @close="toggleMenu" />
          </teleport>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: rgba(var(--secondary-rgb), 0);
  backdrop-filter: blur(2px);
  @apply tw-transition-all;

  &.--scroll {
    top: 0 !important;
    margin-top: 0 !important;
    padding: 15px 0 !important;
    z-index: 99;
    background-color: rgba(var(--secondary-rgb), 0.9);
  }
}
.header ul li a {
  transition: all 0.3s;
}
</style>
