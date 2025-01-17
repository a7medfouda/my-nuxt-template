<script lang="ts" setup>
import { type NotificationType, useNotification } from "naive-ui";
import BaseContainer from "~/components/core/BaseContainer.vue";
import { useCommonStore } from "~/stores/common";
import Button from "~/components/core/Button.vue";
import CallUs from "~/components/ui/call-us.vue";
import * as Yup from "yup";
import Location from "~/components/ui/location.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { data } = defineProps<{
  data: any;
}>();

const common = useCommonStore();
const isLoading = ref<boolean>(false);
const notification = useNotification();
const fileName = ref<string[]>([]);
const { t, locale } = useI18n();
// @ts-ignore
const footer_data = common.footer.address?.replace(/\r\n/g, "<br>");

const formValues = ref({
  company_name: "",
  email_address: "",
  phone_number: "",
  type_model: "",
  serial_number: "",
  product_receipt_date: 1183135260000,
  number_of_Working_Hours: "",
  Briefly_Describe: "",
  Attachments: null as FileList | null,
});

const formErrors = ref<Record<keyof typeof formValues.value, string>>({
  company_name: "",
  email_address: "",
  phone_number: "",
  type_model: "",
  serial_number: "",
  product_receipt_date: "",
  number_of_Working_Hours: "",
  Briefly_Describe: "",
  Attachments: "",
});

const notify = (type: NotificationType, content: string, meta: string) => {
  notification[type]({
    content,
    meta,
    duration: 4000,
    keepAliveOnHover: true,
  });
};

const validationSchema = Yup.object({
  company_name: Yup.string().required("Company name is required"),
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone_number: Yup.string().required("Phone number is required"),
  type_model: Yup.string().required("Model name is required"),
  serial_number: Yup.string().required("Serial number is required"),
  product_receipt_date: Yup.string().required(
    "Product receipt date is required"
  ),
  number_of_Working_Hours: Yup.string().required("Working hours are required"),
  Briefly_Describe: Yup.string().required(
    "Briefly describe the issue is required"
  ),
  Attachments: Yup.mixed().required("Attachments are required").nullable(),
});

const validateForm = async () => {
  try {
    isLoading.value = true;
    await validationSchema.validate(formValues.value, { abortEarly: false });

    const formData = new FormData();
    formData.append("company_name", formValues.value.company_name);
    formData.append("email", formValues.value.email_address);
    formData.append("phone", formValues.value.phone_number);
    formData.append("model_type", formValues.value.type_model);
    formData.append("serial_number", formValues.value.serial_number);
    formData.append(
      "received_date",
      convertTimeStamp(formValues.value.product_receipt_date)
    );
    formData.append(
      "machine_running_hours",
      formValues.value.number_of_Working_Hours
    );
    formData.append("problem_description", formValues.value.Briefly_Describe);

    if (formValues.value.Attachments) {
      Array.from(formValues.value.Attachments).forEach((file) => {
        formData.append("files[]", file);
      });
    }

    const { data: responseData, error } = await useFetch("/maintenances", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "post",
      body: formData,
    });

    if (error.value?.status === 500) {
      notify(
        "error",
        locale.value === "ar"
          ? "حدث خطأ اثناء الارسال"
          : "Error occurred while sending the request",
        locale.value === "ar"
          ? "حدث خطأ اثناء الارسال"
          : "Error occurred while sending the request"
      );
      isLoading.value = false;
      return;
    }
    // @ts-ignore
    if (responseData.value?.status === true) {
      await nextTick(() => {
        isLoading.value = false;
      });
    }

    notify(
      "success",
      locale.value === "ar"
        ? "تم إرسال الطلب بنجاح"
        : "Request sent successfully",
      locale.value === "ar"
        ? "شكراً لك! تم تقديم طلب الصيانة الخاص بك بنجاح. سنقوم بمعالجة طلبك في أقرب وقت ممكن وسنتواصل معك لتأكيد التفاصيل."
        : "Thank you! Your maintenance request has been submitted successfully. We will process your request as soon as possible and will contact you to confirm the details."
    );

    formValues.value = {
      company_name: "",
      email_address: "",
      phone_number: "",
      type_model: "",
      serial_number: "",
      // @ts-ignore
      product_receipt_date: formValues.value.product_receipt_date,
      number_of_Working_Hours: "",
      Briefly_Describe: "",
      Attachments: null,
    };
    fileName.value = [];
    const fileInput = document.getElementById(
      "Attachments"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";

    await nextTick(() => {
      isLoading.value = false;
    });
  } catch (error) {
    await nextTick(() => {
      isLoading.value = false;
    });
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((err) => {
        formErrors.value[err.path as keyof typeof formErrors.value] =
          err.message;
      });
    }
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    formValues.value.Attachments = input.files;
    fileName.value = Array.from(input.files).map((file) => file.name);
  } else {
    formValues.value.Attachments = null;
    fileName.value = [];
  }
};

const clearError = (field: keyof typeof formValues.value) => {
  formErrors.value[field] = "";
};

const convertTimeStamp = (value: number | string) => {
  const timestamp = Number(value);
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    console.error("Invalid timestamp:", value);
    return "";
  }
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  // @ts-ignore
  return formattedDate;
};
const setDob = (value: any) => {
  formValues.value.product_receipt_date = value;
};
</script>

<template>
  <section id="services-contact-us" class="tw-py-32 tw-bg-[#f7f7f7] tw-mb-20">
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
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Email Address") }}:</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]">{{
                  data.email
                }}</NuxtLink>
              </div>
              <div class="tw-mt-3 tw-flex tw-gap-2">
                <h2 class="tw-text-[#212122] tw-font-semibold">{{ t("Phone") }}:</h2>
                <NuxtLink target="_blank" class="tw-text-[#212122]">{{
                  data.phone
                }}</NuxtLink>
              </div>
            </div>
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center tw-gap-4">
                <component :is="Location" />
                <h2
                  class="tw-text-[#212122] tw-text-[1.5rem] tw-font-medium"
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
        <div class="tw-bg-white tw-shadow-md tw-px-5 tw-py-20 -tw-mb-52 tw-transform">
          <div>
            <form
              class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10"
              onsubmit=""
            >
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="Company_Name"
                >
                  {{ t("Company Name") }}
                </label>
                <input
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="Company_Name"
                  type="text"
                  v-model="formValues.company_name"
                  :placeholder="t('Company Name')"
                  :class="{
                    '!tw-border-red-500': formErrors.company_name,
                    '!tw-border-b-[#d4dee4]': !formErrors.company_name,
                  }"
                  @input="clearError('company_name')"
                />
                <div
                  v-if="formErrors.company_name"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.company_name }}
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
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  v-model="formValues.email_address"
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
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
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
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="model"
                >
                  {{ t("type model name") }}
                </label>
                <input
                  v-model="formValues.type_model"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  :placeholder="t('choice type')"
                  id="model"
                  type="text"
                  :class="{
                    '!tw-border-red-500': formErrors.type_model,
                    '!tw-border-b-[#d4dee4]': !formErrors.type_model,
                  }"
                  @input="clearError('type_model')"
                />
                <div
                  v-if="formErrors.type_model"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.type_model }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="serial_number"
                >
                  {{ t("serial number") }}
                </label>
                <input
                  v-model="formValues.serial_number"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  type="text"
                  :placeholder="t('serial number')"
                  id="serial_number"
                  :class="{
                    '!tw-border-red-500': formErrors.serial_number,
                    '!tw-border-b-[#d4dee4]': !formErrors.serial_number,
                  }"
                  @input="clearError('serial_number')"
                />
                <div
                  v-if="formErrors.serial_number"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.serial_number }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="receipt_Date"
                >
                  {{ t("Product Receipt Date") }}
                </label>
                <n-date-picker
                  v-model:value="formValues.product_receipt_date"
                  type="date"
                  :time-picker-format="setDob"
                />
                <div
                  v-if="formErrors.product_receipt_date"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.product_receipt_date }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="working_hours"
                >
                  {{ t("Number of Working Hours") }}
                </label>
                <input
                  v-model="formValues.number_of_Working_Hours"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="working_hours"
                  type="text"
                  :placeholder="t('Number of Working Hours')"
                  :class="{
                    '!tw-border-red-500': formErrors.number_of_Working_Hours,
                    '!tw-border-b-[#d4dee4]':
                      !formErrors.number_of_Working_Hours,
                  }"
                  @input="clearError('number_of_Working_Hours')"
                />
                <div
                  v-if="formErrors.number_of_Working_Hours"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.number_of_Working_Hours }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-font-semibold"
                  for="Describe_Issues"
                >
                  {{ t("Briefly Describe the Issue You Are Facing") }}
                </label>
                <input
                  v-model="formValues.Briefly_Describe"
                  class="tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  id="Describe_Issues"
                  type="text"
                  :placeholder="t('Briefly Describe the Issue You Are Facing')"
                  :class="{
                    '!tw-border-red-500': formErrors.Briefly_Describe,
                    '!tw-border-b-[#d4dee4]': !formErrors.Briefly_Describe,
                  }"
                  @input="clearError('Briefly_Describe')"
                />
                <div
                  v-if="formErrors.Briefly_Describe"
                  class="tw-text-red-500 tw-text-sm tw-mt-2"
                >
                  {{ formErrors.Briefly_Describe }}
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-col-span-2">
                <label
                  class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2 tw-cursor-pointer tw-border-b placeholder:tw-text-[#697B86] tw-text-[#697B86] placeholder:tw-font-medium tw-border-b-[#d4dee4] tw-pb-3 tw-bg-transparent tw-outline-none"
                  for="Attachments"
                >
                  {{ t("Attachments") }}
                </label>

                <!-- Hidden file input -->
                <input
                  class="tw-hidden"
                  id="Attachments"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  @change="handleFileChange"
                  :class="{
                    '!tw-border-red-500': formErrors.Attachments,
                    '!tw-border-b-[#d4dee4]': !formErrors.Attachments,
                  }"
                  @input="clearError('Attachments')"
                />

                <!-- Error message -->
                <div
                  v-if="formErrors.Attachments"
                  class="tw-text-red-500 tw-text-xs"
                >
                  {{ formErrors.Attachments }}
                </div>

                <!-- Selected files display -->
                <div v-if="fileName.length > 0" class="tw-mt-2">
                  <p class="tw-text-[#212122] tw-text-[0.9rem] tw-mb-2">
                    {{ t("Selected files") }}:
                  </p>
                  <ul class="tw-list-disc tw-pl-5">
                    <li
                      v-for="name in fileName"
                      :key="name"
                      class="tw-text-[#697B86] tw-text-sm tw-mb-1"
                    >
                      {{ name }}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
            <div class="tw-mt-10">
              <Button
                @click="validateForm"
                :text="t('Send Request')"
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

<style lang="scss">
.n-input.n-input--resizable.n-input--stateful {
  --n-border-hover: 1px solid #f0a020 !important;
  --n-border-focus: 1px solid #f0a020 !important;
  --n-box-shadow-focus: none !important;
}
.n-date-panel
  .n-date-panel-dates
  .n-date-panel-date.n-date-panel-date--selected::after {
  background: #f0a020 !important;
}
.n-notification-container {
  z-index: 99999999999999 !important;
}
.n-notification {
  z-index: 99999999999999 !important;
}
.n-input {
  background-color: transparent !important;
}
.n-border-hover-warning {
  border: 1px solid red !important;
}
.n-input__border {
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #d4dee4 !important;
}
</style>
