<script lang="ts" setup>
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import { useCommonStore } from "~/stores/common";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const common = useCommonStore();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n({ useScope: "global" });

const handleContactNavigation = async () => {
  const allowedRoutes = ["/", "/contact-us"];
  const currentRoute = route.path;

  if (!allowedRoutes.includes(currentRoute)) {
    await router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 1300));
  }

  await nextTick();

  const contactSection = document.getElementById("contact-us");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn("Contact section not found");
  }
};
onMounted(() => {
  common.loadFooter();
});
watch(
  locale,
  (newlocale, oldValue) => {
    if (oldValue !== newlocale) {
      common.loadFooter();
    }
  },
  { immediate: true }
);
</script>

<template>
  <footer class="tw-py-20 tw-pb-10 tw-bg-[#212122] tw-relative">
    <div class="tw-z-[2] tw-relative">
      <BaseContainer>
        <div
          class="tw-flex lg:tw-justify-between tw-items-start tw-flex-wrap tw-flex-col lg:tw-flex-row tw-justify-start tw-gap-y-8"
        >
          <div
            class="tw-flex tw-text-start lg:tw-flex-row tw-flex-col lg:tw-items-start tw-gap-10"
          >
            <img
              class="tw-size-full tw-object-cover tw-max-h-[6.688rem] tw-max-w-[6.125rem]"
              src="~/assets/svg/logo.svg"
              alt="Logo"
            />
            <h2
              class="md:tw-text-[3.125rem] sm:tw-text-[3.125rem] tw-text-[2.125rem] tw-max-w-[31rem] tw-text-white"
            >
              {{ common.footer.title }}
            </h2>
          </div>
          <div
            class="tw-flex lg:tw-flex-row md:tw-flex-col tw-flex-col tw-gap-2 tw-w-fit"
          >
            <a @click.prevent="handleContactNavigation" href="#contact-us">
              <Button
                :text="common.footer.button_text_1"
                bgColor="var(--primary)"
                icon="ic:baseline-arrow-right-alt"
                text_color="#fff"
                hoverEffect="filled-slide-right"
                width="230px"
              />
            </a>
            <NuxtLink to="/contact-us">
              <Button
                :text="common.footer.button_text_2"
                :border="true"
                text_color="#fff"
                border_color="#b7c2c8"
                class="!tw-py-2 !tw-px-10"
                hoverEffect="filled-top-to-bottom"
                hover_text="#000"
                hover_color="#fbaf40"
                hover_bg="#fbaf40"
                width="230px"
              />
            </NuxtLink>
          </div>
        </div>
        <!-- footer links  -->
        <div
          class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-2 tw-gap-10 tw-mt-28"
        >
          <!-- links -->
          <div class="tw-flex tw-flex-col">
            <h1
              class="tw-text-[var(--primary)] tw-text-[25px] md:tw-text-[30px]"
            >
              {{ t("Links") }}
            </h1>
            <ul class="tw-flex tw-flex-col tw-gap-3 tw-mt-3">
              <ll>
                <NuxtLink
                  to="/products"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Products") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  to="/services"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Services") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  to="/blogs"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Blogs") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  to="/careers"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Careers") }}
                </NuxtLink>
              </ll>
            </ul>
          </div>
          <!-- company -->
          <div class="tw-flex tw-flex-col">
            <h1
              class="tw-text-[var(--primary)] tw-text-[25px] md:tw-text-[30px]"
            >
              {{ t("Company") }}
            </h1>
            <ul class="tw-flex tw-flex-col tw-gap-3 tw-mt-3">
              <ll>
                <NuxtLink
                  to="/contact-us"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Contact Us") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  to="/about-us"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("About Us") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  :to="{ path: '/privacy-policy', query: { type: 'privacy' } }"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Privacy Policy") }}
                </NuxtLink>
              </ll>
              <ll>
                <NuxtLink
                  :to="{
                    path: '/terms-and-conditions',
                    query: { type: 'terms' },
                  }"
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4]"
                >
                  {{ t("Terms and Conditions") }}
                </NuxtLink>
              </ll>
            </ul>
          </div>
          <!-- call us -->
          <div class="tw-flex tw-flex-col">
            <h1
              class="tw-text-[var(--primary)] tw-text-[25px] md:tw-text-[30px]"
            >
              {{ t("Call Us") }}
            </h1>
            <ul class="tw-flex tw-flex-col tw-gap-3 tw-mt-3">
              <ll>
                <span
                  class="tw-text-[16px] md:tw-text-[18px] hover:tw-text-primary tw-transition-all tw-text-[#D4DEE4] tw-decoration-none"
                >
                  {{ common.footer.email }}
                </span>
              </ll>
              <ll>
                <a
                  :href="`https://wa.me/${common.footer.phone}`"
                  target="_blank"
                  class="tw-text-[16px] md:tw-text-[18px] tw-decoration-none tw-text-[#D4DEE4] tw-cursor-pointer hover:tw-text-[var(--primary)] tw-transition-colors"
                >
                  {{ common.footer.phone }}
                </a>
              </ll>
              <li class="tw-flex tw-items-center tw-gap-5 tw-text-[20px]">
                <a
                  v-if="common.footer.facebook"
                  :href="common.footer.facebook"
                  target="_blank"
                  class="hover:tw-text-[var(--primary)] tw-transition-colors"
                  ><Icon name="ri:facebook-fill"
                /></a>
                <a
                  v-if="common.footer.x"
                  :href="common.footer.x"
                  target="_blank"
                  class="hover:tw-text-[var(--primary)] tw-transition-colors"
                  ><Icon name="simple-icons:x"
                /></a>
                <a
                  v-if="common.footer.instagram"
                  :href="common.footer.instagram"
                  target="_blank"
                  class="hover:tw-text-[var(--primary)] tw-transition-colors"
                  ><Icon name="ri:instagram-line"
                /></a>
                <a
                  v-if="common.footer.linkedin"
                  :href="common.footer.linkedin"
                  target="_blank"
                  class="hover:tw-text-[var(--primary)] tw-transition-colors"
                  ><Icon name="ri:linkedin-fill"
                /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- copyright -->
        <div class="tw-flex tw-items-center tw-justify-center tw-mt-36">
          <div>
            <h2
              class="tw-text-[#B7C2C8] tw-text-[14px] md:tw-text-[18px] rtl:md:tw-text-[14px] tw-text-center tw-font-medium"
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
      </BaseContainer>
    </div>
    <div class="tw-absolute tw-bottom-0 tw-left-0 tw-z-[1]">
      <img src="~/assets/images/footerShapes.png" class="tw-size-full" alt="" />
    </div>
  </footer>
</template>
<style></style>
