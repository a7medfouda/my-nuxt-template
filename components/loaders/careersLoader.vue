<template>
  <div class="tw-container tw-mt-36 tw-px-6 tw-py-10 tw-animate-pulse">
    <h1
      class="tw-w-48 tw-h-2 tw-mx-auto tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
    ></h1>
    <p
      class="tw-w-64 tw-h-2 tw-mx-auto tw-mt-4 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
    ></p>
    <p
      class="tw-w-64 tw-h-2 tw-mx-auto tw-mt-4 tw-bg-gray-200 tw-rounded-lg tw-sm:w-80 tw-dark:bg-gray-700"
    ></p>
    <div class="tw-grid tw-gap-20 tw-my-36 md:tw-grid-cols-2 tw-grid-cols-2">
      <div
        v-for="(_, index) in Array(8)"
        :key="index"
        class="tw-w-full tw-border-b-[3px] tw-border-opacity-50 tw-border-b-[#babccb] tw-pb-5 tw-animate-pulse"
      >
        <h1
          class="tw-w-[90%] tw-h-2 tw-mt-4 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
        ></h1>
        <p
          class="tw-w-[65%] tw-h-2 tw-mt-4 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
        ></p>
        <p
          class="tw-w-[45%] tw-h-2 tw-mt-3 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
        ></p>
        <div class="tw-flex tw-mt-5 tw-gap-10 tw-justify-between">
          <p
            class="tw-w-[10%] tw-h-2 tw-mt-3 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
          ></p>
          <p
            class="tw-w-[10%] tw-h-2 tw-mt-3 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
          ></p>
          <p
            class="tw-w-[30%] tw-h-2 tw-mt-3 tw-bg-gray-200 tw-rounded-lg tw-dark:bg-gray-700"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
