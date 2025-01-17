<script lang="ts" setup>
import { type NotificationType, useNotification } from "naive-ui";
import BaseContainer from "~/components/core/BaseContainer.vue";
import Button from "~/components/core/Button.vue";
import CallUs from "~/components/ui/call-us.vue";
import Location from "~/components/ui/location.vue";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";
const { data } = defineProps<{
  data: any;
}>();
onMounted(() => {
  console.log(data);
});
const { t } = useI18n();
const fileName = ref<string>("");
const isLoading = ref<boolean>(false);
const notification = useNotification();
const route = useRoute();

const notify = (type: NotificationType, content: string, meta: string) => {
  notification[type]({
    content: content,
    meta: meta,
    duration: 3500,
    keepAliveOnHover: true,
  });
};
const formValues = ref({
  user_name: "",
  email_address: "",
  phone_number: "",
  Resume: null,
});
const formErrors = ref<Record<keyof typeof formValues.value, string>>({
  user_name: "",
  email_address: "",
  phone_number: "",
  Resume: "",
});
const validationSchema = Yup.object({
  user_name: Yup.string().required("Full name is required"),
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone_number: Yup.string().required("Phone number is required"),
  Resume: Yup.mixed().required("Resume are required").nullable(),
});
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    // @ts-ignore
    formValues.value.Resume = file;
    fileName.value = file.name;
  }
};
const validateForm = async () => {
  try {
    const careerId = ref(route.params.id);
    isLoading.value = true;

    await validationSchema.validate(formValues.value, { abortEarly: false });

    const formData = new FormData();
    formData.append("name", formValues.value.user_name);
    formData.append("email", formValues.value.email_address);
    formData.append("phone", formValues.value.phone_number);
    // @ts-ignore
    formData.append("career_id", careerId.value);
    if (formValues.value.Resume) {
      formData.append("cv", formValues.value.Resume);
    }

    const { data: responseData, error } = await useFetch("/apply-career", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "post",
      body: formData,
    });
    console.log(`${responseData} - results 🔥`);
    notify("success", "Cv successfully sent", "cv successfully sent");

    // Reset form values
    formValues.value = {
      user_name: "",
      email_address: "",
      phone_number: "",
      Resume: null,
    };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((err) => {
        formErrors.value[err.path as keyof typeof formErrors.value] =
          err.message;
      });
    }
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};
const clearError = (field: keyof typeof formValues.value) => {
  formErrors.value[field] = "";
};
</script>
<template>
  <section id="contact-us" class="tw-py-32 tw-bg-[#f7f7f7] tw-mb-20">
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
                <h2
                  class="tw-text-[#212122] tw-text-[1.5rem] tw-font-medium tw-font-medium"
                >
                  {{ t("Call Us") }}
                </h2>
              </div>
              <div class="tw-mt-3 tw-flex tw-gap-2">
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Email Address") }} :</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]"
                  >
                  {{ data.email }}
                  </NuxtLink
                >
              </div>
              <div class="tw-mt-3 tw-flex tw-gap-2">
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Phone") }}</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]"
                  >
                  {{ data.phone }}
                  </NuxtLink
                >
              </div>
            </div>
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center tw-gap-4">
                <component :is="Location" />
                <h2
                  class="tw-text-[#212122] tw-text-[1.5rem] tw-font-medium tw-font-medium"
                >
                  {{ t("Our Location") }}
                </h2>
              </div>
              <div class="tw-mt-3">
                <h2
                  class="tw-text-[#212122] tw-text-[18px] tw-w-[13em]"
                  v-html="data.address?.replace(/\r\n/g, '<br>')"
                ></h2>
              </div>
            </div>
          </div>
        </div>
        <!-- right-side -->
        <!-- tw-translate-x-[13.8rem] -->
        <div class="tw-bg-white tw-shadow-md tw-px-5 tw-py-20 -tw-mb-52 tw-transform">
          <div>
            <form
              class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10"
              :onsubmit="validateForm"
            >
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="User_Name"
                >
                  {{ t("Full Name") }}
                </label>
                <input
                  v-model="formValues.user_name"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="User_Name"
                  type="text"
                  :placeholder="t('User Name')"
                  :class="{
                    '!tw-border-red-500': formErrors.user_name,
                    '!tw-border-b-[#d4dee4]': !formErrors.user_name,
                  }"
                  @input="clearError('user_name')"
                />
                <div
                  v-if="formErrors.user_name"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.user_name }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="email_Address"
                >
                  {{ t("Email Address") }}
                </label>
                <input
                  v-model="formValues.email_address"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="email_Address"
                  type="email"
                  placeholder="example@gamil.com"
                  :class="{
                    '!tw-border-red-500': formErrors.email_address,
                    '!tw-border-b-[#d4dee4]': !formErrors.email_address,
                  }"
                  @input="clearError('email_address')"
                />
                <div
                  v-if="formErrors.email_address"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.email_address }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="phone_number"
                >
                  {{ t("Phone Number") }}
                </label>
                <input
                  v-model="formValues.phone_number"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="phone_number"
                  type="text"
                  placeholder="(123) 456 - 7890"
                  :class="{
                    '!tw-border-red-500': formErrors.phone_number,
                    '!tw-border-b-[#d4dee4]': !formErrors.phone_number,
                  }"
                  @input="clearError('phone_number')"
                />
                <div
                  v-if="formErrors.phone_number"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.phone_number }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-col-span-2">
                <!-- Upload Resume -->
                <label
                  class="tw-text-[#212122] tw-ml-3 tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="Resume"
                >
                  {{ t("Resume") }}
                </label>
                <div
                  class="tw-border-b-[#d4dee4] tw-pb-1 tw-bg-transparent tw-flex tw-items-center tw-w-full tw-justify-between tw-border-b"
                  :class="{
                    '!tw-border-red-500': formErrors.Resume,
                    '!tw-border-b-[#d4dee4]': !formErrors.Resume,
                  }"
                >
                  <div class="tw-flex tw-items-center tw-w-full">
                    <!-- File Input Button -->
                    <!-- @ts-ignore -->
                    <input
                      type="file"
                      id="Resume"
                      name="Resume"
                      class="tw-hidden"
                      @change="handleFileChange"
                      @input="clearError('Resume')"
                    />
                    <!-- Display File Name or Default Text -->
                    <label
                      for="Resume"
                      class="tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-between tw-w-full tw-rounded tw-text-[#697B86] tw-cursor-pointer"
                    >
                      <h2
                        class="tw-text-[#697B86] tw-pb-3 tw-h-fit tw-line-clamp-1"
                      >
                        {{ fileName ? fileName : t("Resume") }}
                      </h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        class="tw-ml-2"
                      >
                        <path
                          d="M8.71 8.68841L11 6.38841V15.9784C11 16.2436 11.1054 16.498 11.2929 16.6855C11.4804 16.8731 11.7348 16.9784 12 16.9784C12.2652 16.9784 12.5196 16.8731 12.7071 16.6855C12.8946 16.498 13 16.2436 13 15.9784V6.38841L15.29 8.68841C15.383 8.78214 15.4936 8.85653 15.6154 8.9073C15.7373 8.95807 15.868 8.98421 16 8.98421C16.132 8.98421 16.2627 8.95807 16.3846 8.9073C16.5064 8.85653 16.617 8.78214 16.71 8.68841C16.8037 8.59545 16.8781 8.48485 16.9289 8.36299C16.9797 8.24113 17.0058 8.11042 17.0058 7.97841C17.0058 7.8464 16.9797 7.71569 16.9289 7.59384C16.8781 7.47198 16.8037 7.36138 16.71 7.26841L12.71 3.26841C12.6149 3.17737 12.5028 3.10601 12.38 3.05841C12.1365 2.95839 11.8635 2.95839 11.62 3.05841C11.4972 3.10601 11.3851 3.17737 11.29 3.26841L7.29 7.26841C7.19676 7.36165 7.1228 7.47234 7.07234 7.59416C7.02188 7.71598 6.99591 7.84655 6.99591 7.97841C6.99591 8.11027 7.02188 8.24084 7.07234 8.36266C7.1228 8.48448 7.19676 8.59517 7.29 8.68841C7.38324 8.78165 7.49393 8.85561 7.61575 8.90607C7.73757 8.95653 7.86814 8.9825 8 8.9825C8.13186 8.9825 8.26243 8.95653 8.38425 8.90607C8.50607 8.85561 8.61676 8.78165 8.71 8.68841ZM21 12.9784C20.7348 12.9784 20.4804 13.0838 20.2929 13.2713C20.1054 13.4588 20 13.7132 20 13.9784V19.9784C20 20.2436 19.8946 20.498 19.7071 20.6855C19.5196 20.8731 19.2652 20.9784 19 20.9784H5C4.73478 20.9784 4.48043 20.8731 4.29289 20.6855C4.10536 20.498 4 20.2436 4 19.9784V13.9784C4 13.7132 3.89464 13.4588 3.70711 13.2713C3.51957 13.0838 3.26522 12.9784 3 12.9784C2.73478 12.9784 2.48043 13.0838 2.29289 13.2713C2.10536 13.4588 2 13.7132 2 13.9784V19.9784C2 20.7741 2.31607 21.5371 2.87868 22.0997C3.44129 22.6623 4.20435 22.9784 5 22.9784H19C19.7956 22.9784 20.5587 22.6623 21.1213 22.0997C21.6839 21.5371 22 20.7741 22 19.9784V13.9784C22 13.7132 21.8946 13.4588 21.7071 13.2713C21.5196 13.0838 21.2652 12.9784 21 12.9784Z"
                          fill="black"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div
                  v-if="formErrors.Resume"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.Resume }}
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

<style></style>
