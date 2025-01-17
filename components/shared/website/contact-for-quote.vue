<script lang="ts" setup>
import { type NotificationType, useNotification } from "naive-ui";
import { ref } from "vue";
import * as Yup from "yup";
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import CallUs from "~/components/ui/call-us.vue";
import Location from "~/components/ui/location.vue";
import { useCommonStore } from "~/stores/common";
const { t } = useI18n({ useScope: "global" });
const common = useCommonStore();
const { data } = defineProps<{
  data: any;
}>();

const isLoading = ref<boolean>(false);
const notification = useNotification();
const formValues = ref({
  user_name: "",
  email_address: "",
  phone_number: "",
  company_name: "",
  message: "",
});

const formErrors = ref<Record<keyof typeof formValues.value, string>>({
  user_name: "",
  email_address: "",
  phone_number: "",
  company_name: "",
  message: "",
});

const notify = (type: NotificationType) => {
  notification[type]({
    content: "Message Successfully Send",
    meta: "Message Successfully Send",
    duration: 3500,
    keepAliveOnHover: true,
  });
};
const validationSchema = Yup.object({
  user_name: Yup.string().required("Full Name is required"),
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string().required("Phone number is required"),
  company_name: Yup.string().required("Company name  is required"),
  message: Yup.string().required("Message is required"),
});

const validateForm = async () => {
  try {
    isLoading.value = true;
    await validationSchema.validate(formValues.value, { abortEarly: false });
    console.log("Form is valid 🔥🎉");
    // @ts-ignore
    const { data: responseData } = await useFetch("/contact-us", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "post",
      body: {
        name: formValues.value.user_name,
        phone: formValues.value.phone_number,
        email: formValues.value.email_address,
        message: formValues.value.message,
        company_name: formValues.value.company_name,
      },
    })
      .then((results) => {
        console.log(`${results} - results 🔥 `);
      })
      .finally(() => {
        notify("success");
        // @ts-ignore
        formValues.value = {
          user_name: "",
          email_address: "",
          phone_number: "",
          message: "",
        };
        isLoading.value = false;
      });

    console.log(`${responseData} - response-data 🔥`);
    // @ts-ignore
    formErrors.value = {};
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((err) => {
        formErrors.value[err.path as keyof typeof formErrors.value] =
          err.message;
      });
      isLoading.value = false;
    }
  }
};

watch(
  formValues,
  (newValues) => {
    Object.keys(formErrors.value).forEach((field) => {
      // @ts-ignore
      if (newValues[field] !== "") {
        // @ts-ignore
        formErrors.value[field] = "";
      }
    });
  },
  { deep: true }
);
</script>
<template>
  <section id="contact-us" class="tw-py-28 lg:tw-py-32 tw-bg-[#F7F7F7] tw-mb-20">
    <BaseContainer>
      <div class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10">
        <!-- left-side -->
        <div>
          <h2 class="tw-text-[2.188rem] tw-capitalize tw-text-[#212122]">
            {{ data.title }}
          </h2>
          <p class="tw-leading-7 tw-text-[#212122] tw-text-[1.125rem]">
            {{ data.description }}
          </p>
          <div class="tw-flex tw-items-start tw-mt-10 tw-gap-20 tw-flex-wrap">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center tw-gap-4">
                <component :is="CallUs" />
                <h2 class="tw-text-[#212122] tw-text-[1.5rem] tw-font-medium">
                  {{ t("Call Us") }}
                </h2>
              </div>
              <div class="tw-mt-3 tw-flex tw-gap-2">
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Email Address") }}:</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]"
                  >{{ data.email || common.footer.email }}</NuxtLink
                >
              </div>
              <div class="tw-mt-3 tw-flex tw-gap-2">
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Phone") }}:</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]"
                  >{{ data.phone || common.footer.phone }}</NuxtLink
                >
              </div>
            </div>
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center tw-gap-4">
                <component :is="Location" />
                <h2 class="tw-text-[#212122] tw-text-[1.5rem] tw-font-medium">
                  {{ t("Our Location") }}
                </h2>
              </div>
              <div class="tw-mt-3">
                <h2 class="tw-text-[#212122] tw-text-[18px] tw-w-[13em]" v-html="data.address?.replace(/\r\n/g, '<br>') || common.footer.address?.replace(/\r\n/g, '<br>')">
                </h2>
              </div>
            </div>
          </div>
        </div>
        <!-- right-side -->
        <!-- tw-translate-x-[13.8rem] -->
          <div class="tw-bg-white tw-px-5 tw-py-20 -tw-mb-52 tw-transform tw-shadow-md">
          <div>
            <form
              class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10"
              onsubmit=""
            >
              <div class="tw-flex tw-flex-col">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="User_Name"
                >
                  {{ t("Full Name") }}
                </label>
                <input
                  v-model="formValues.user_name"
                  id="User_Name"
                  type="text"
                  :placeholder="t('User Name')"
                  :class="{
                    '!tw-border-red-500': formErrors.user_name,
                    '!tw-border-b-[#d4dee4]': !formErrors.user_name,
                  }"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] tw-transition tw-duration-500 placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                />
                <div
                  v-if="formErrors.user_name"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.user_name }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="email_Address"
                >
                  {{ t("Email Address") }}
                </label>
                <input
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] tw-transition tw-duration-500 placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  v-model="formValues.email_address"
                  id="email_Address"
                  type="email"
                  placeholder="example@gamil.com"
                  :class="{
                    '!tw-border-red-500': formErrors.email_address,
                    '!tw-border-b-[#d4dee4]': !formErrors.email_address,
                  }"
                />
                <div
                  v-if="formErrors.email_address"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.email_address }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="phone_number"
                >
                  {{ t("Phone Number") }}
                </label>
                <input
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] tw-transition tw-duration-500 placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  v-model="formValues.phone_number"
                  id="phone_number"
                  type="text"
                  placeholder="(123) 456 - 7890"
                  :class="{
                    '!tw-border-red-500': formErrors.phone_number,
                    '!tw-border-b-[#d4dee4]': !formErrors.phone_number,
                  }"
                />
                <div
                  v-if="formErrors.phone_number"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.phone_number }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="company_name"
                >
                  {{ t("Company Name") }}
                </label>
                <input
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-transition tw-duration-500 tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  v-model="formValues.company_name"
                  id="company_name"
                  type="text"
                  :placeholder="t('Company Name')"
                  :class="{
                    '!tw-border-red-500': formErrors.company_name,
                    '!tw-border-b-[#d4dee4]': !formErrors.company_name,
                  }"
                />
                <div
                  v-if="formErrors.company_name"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.company_name }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="message"
                >
                  {{ t("Message") }}
                </label>
                <textarea
                  class="tw-border-b tw-resize-none tw-mt-2 placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-bg-transparent tw-outline-none tw-transition tw-duration-500"
                  v-model="formValues.message"
                  id="message"
                  :placeholder="t('Write Your Message...')"
                  :class="{
                    '!tw-border-red-500': formErrors.message,
                    '!tw-border-b-[#d4dee4]': !formErrors.message,
                  }"
                />
                <div
                  v-if="formErrors.message"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.message }}
                </div>
              </div>
            </form>
            <div class="tw-mt-10">
              <Button
                @click="validateForm"
                :text="t('Send Message')"
                bgColor="var(--primary)"
                icon="ic:baseline-arrow-right-alt"
                text_color="#fff"
                hoverEffect="filled-slide-right"
                :isLoading="isLoading"
                width="200px"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
