<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import { type IHero } from "../../../types/index";
import BaseImage from "~/components/core/BaseImage.vue";

const { data } = defineProps<IHero>();

// const handleScroll = () => {
//   const image = document.querySelector(".--background-image") as HTMLElement;
//   if (image) {
//     const scrollY = window.scrollY;
//     image.style.transform = `translate3d(0px, ${scrollY * -0.2}px, 0px)`;
//   }
// };
const onSlideChange = () => {
  console.log("slide change");
};
onMounted(() => {
  // window.addEventListener("scroll", handleScroll);

  gsap.from(".--hero-section h2", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 1,
    ease: "power4.out",
  });

  const countUpElements = document.querySelectorAll(".count h2");
  countUpElements.forEach((el) => {
    // @ts-ignore
    const targetValue = parseInt(el.innerText, 10);
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: targetValue,
        duration: 3,
        snap: { innerText: 1 },
        ease: "power1.out",
        onUpdate: function () {
          // @ts-ignore
          el.innerText = Math.floor(el.innerText);
        },
      }
    );
  });
});

onUnmounted(() => {
  // window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <section class="--hero-section">
    <Swiper
      class=""
      :autoplay="{
        delay: 7000,
        disableOnInteraction: true,
      }"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :speed="2800"
      :modules="[SwiperAutoplay, SwiperPagination]"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        class="!tw-h-screen tw-relative tw-pb-20 sm:tw-pb-0"
        v-for="(image, index) in data.images"
        :key="index"
      >
        <div
          class="--background-image tw-absolute inset-0 -z-10 tw-w-full tw-h-full"
        >
          <BaseImage
            :thumbnail="image"
            class_styles="tw-object-cover tw-size-full !tw-max-h-[923px]"
          />
        </div>
        <div
          class="swiper-overlay tw-absolute tw-inset-0 tw-z-10 tw-bg-black tw-opacity-50"
        ></div>
        <BaseContainer class="md:tw-h-full tw-h-full">
          <div
            class="--hero-wrapper md:tw-mt-0 tw-mt-5 tw-relative tw-z-10 tw-flex-col tw-justify-center tw-flex tw-items-start tw-h-full"
          >
            <h2
              class="--hero-title tw-mt-20 tw-font-semibold tw-text-[4.438rem] tw-text-basecolor"
            >
              {{ data.title }}
            </h2>
            <h2 class="--hero-description tw-font-semibold tw-text-[4.438rem]">
              {{ data.sub_title }}
            </h2>

            <div
              class="--grid-box tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-36 tw-items-center tw-mt-20"
            >
              <!-- left -->
              <div class="tw-flex tw-items-center tw-gap-20">
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <h2
                    class="count-title tw-text-[1.25rem] rtl:tw-text-[.9rem] tw-w-[11rem] tw-font-medium"
                  >
                    {{ data.small_description_1 }}
                  </h2>
                  <div class="count tw-relative tw-mt-2 tw-w-max tw-max-w">
                    <img
                      class="tw-absolute -tw-right-6 rtl:tw-right-[unset] rtl:-tw-left-6 -tw-top-3 tw-object-cover tw-h-[20px]"
                      src="@/assets/images/percentageIcon.png"
                      alt=""
                    />
                    <h2 class="tw-text-[4.5rem] tw-font-medium">
                      {{ data.small_description_number_1 }}
                    </h2>
                  </div>
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <h2
                    class="count-title tw-text-[1.25rem] rtl:tw-text-[.9rem] tw-w-[11rem] tw-font-medium"
                  >
                    {{ data.small_description_2 }}
                  </h2>
                  <div class="count tw-relative tw-mt-2 tw-w-max">
                    <img
                      class="tw-absolute -tw-right-6 rtl:tw-right-[unset] rtl:-tw-left-4 -tw-top-2 tw-object-cover tw-h-[20px]"
                      src="@/assets/images/plus.png"
                      alt=""
                    />
                    <h2 class="tw-text-[4.5rem] tw-font-medium">
                      {{ data.small_description_number_2 }}
                    </h2>
                  </div>
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <h2
                    class="count-title tw-text-[1.25rem] rtl:tw-text-[.9rem] tw-w-[11rem] tw-font-medium"
                  >
                    {{ data.small_description_3 }}
                  </h2>
                  <div class="count tw-relative tw-mt-2 tw-w-max">
                    <img
                      class="tw-absolute -tw-right-6 rtl:tw-right-[unset] rtl:-tw-left-4 -tw-top-2 tw-object-cover tw-h-[20px]"
                      src="@/assets/images/plus.png"
                      alt=""
                    />
                    <h2 class="tw-text-[4.5rem] tw-font-medium">
                      {{ data.small_description_number_3 }}
                    </h2>
                  </div>
                </div>
              </div>
              <!-- right -->
              <div class="tw-flex tw-flex-col">
                <div class="--desctipion-content">
                  <h2>
                    {{ data.description }}
                  </h2>
                </div>
                <div class="--buttons tw-mt-5 tw-flex tw-gap-5">
                  <a href="#contact-us">
                    <Button
                      :text="data.button_text_1"
                      bgColor="var(--primary)"
                      icon="ic:baseline-arrow-right-alt"
                      text_color="#fff"
                      py="10"
                      px="20"
                      width="150px"
                    />
                  </a>
                  <a href="#power-and-innovation">
                    <Button
                      :text="data.button_text_2"
                      :border="true"
                      text_color="#fff"
                      border_color="#b7c2c8"
                      width="150px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </BaseContainer>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
.--hero-section {
  @apply tw-relative tw-h-screen  tw-w-full;
  z-index: 0;

  .--background-image {
    will-change: transform;
    @apply tw-bg-[#000];
  }
}
:deep(.swiper-pagination) {
  bottom: 13% !important;
}
span.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #6d758f !important;
  opacity: 1 !important;
}
:deep(.swiper) {
  overflow-y: visible !important;
}

:deep(.swiper-pagination-clickable .swiper-pagination-bullet) {
  background: #e1e5ee;
}
:deep(.swiper-pagination-clickable) {
  overflow: hidden;
  white-space: nowrap;
}
:deep(.swiper-pagination-bullet-active) {
  background: #6d758f !important;
  border-radius: 15px !important ;
}
.swiper-slide {
  position: relative;
}
</style>
