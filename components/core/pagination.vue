<script lang="ts" setup>
const { currentPage, lastPage, total, perPage, from, to } = defineProps<{
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  from: number;
  to: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const onPageClick = (page: number) => {
  if (page > 0 && page <= lastPage) {
    emit("pageChange", page);
  }
};
</script>

<template>
  <div
    class="tw-flex tw-justify-center tw-my-20 tw-items-center tw-dark:tw-bg-gray-800 tw-w-full"
  >
    <div class="tw-flex tw-items-center tw-justify-center">
      <div class="tw-py-3 tw-border tw-rounded-lg tw-dark:tw-border-gray-600">
        <ol
          class="tw-flex tw-items-center tw-text-sm tw-text-gray-500 tw-divide-x tw-rtl:tw-divide-x-reverse tw-divide-gray-300 tw-dark:tw-text-gray-400 tw-dark:tw-divide-gray-600"
        >
          <li>
            <button
              @click="onPageClick(currentPage - 1)"
              type="button"
              class="tw-relative tw-flex tw-items-center tw-justify-center tw-font-medium tw-min-w-[2rem] tw-px-1.5 tw-h-8 tw-my-[-3] tw-rounded-md tw-outline-none tw-hover:tw-bg-gray-500/5 tw-focus:tw-bg-yellow-500/10 tw-focus:tw-ring-2 tw-focus:tw-ring-yellow-500 tw-dark:tw-hover:tw-bg-gray-400/5 tw-transition tw-text-yellow-600"
              aria-label="Previous"
              :disabled="currentPage <= 1"
            >
              <svg
                class="tw-w-5 tw-h-5 tw-rtl:tw-scale-x-[-1] rtl:tw-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>

          <li
            v-for="page in Array.from({ length: lastPage }, (_, i) => i + 1)"
            :key="page"
          >
            <button
              @click="onPageClick(page)"
              :class="{
                'tw-bg-yellow-500/10 tw-ring-2 tw-ring-yellow-500':
                  currentPage === page,
                'tw-hover:tw-bg-gray-500/5': currentPage !== page,
              }"
              type="button"
              class="tw-relative tw-flex tw-items-center tw-justify-center tw-font-medium tw-min-w-[2rem] tw-px-1.5 tw-h-8 tw-my-[-3] tw-rounded-md tw-outline-none tw-transition"
            >
              <span>{{ page }}</span>
            </button>
          </li>

          <li>
            <button
              @click="onPageClick(currentPage + 1)"
              type="button"
              class="tw-relative tw-flex tw-items-center tw-justify-center tw-font-medium tw-min-w-[2rem] tw-px-1.5 tw-h-8 tw-my-[-3] tw-rounded-md tw-outline-none tw-hover:tw-bg-gray-500/5 tw-focus:tw-bg-yellow-500/10 tw-focus:tw-ring-2 tw-focus:tw-ring-yellow-500 tw-dark:tw-hover:tw-bg-gray-400/5 tw-transition tw-text-yellow-600"
              aria-label="Next"
              :disabled="currentPage >= lastPage"
            >
              <svg
                class="tw-w-5 tw-h-5 tw-rtl:tw-scale-x-[-1] rtl:tw-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
