<script lang="ts" setup>
import { NButton } from "naive-ui";

interface IProps {
  titleBold?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  allowedTypes?: Array<string>;
}

const props = withDefaults(defineProps<IProps>(), {
  titleBold: "Click to upload",
  title: "or drag and drop",
  subtitle: "PDF and Doc(max. 800 x 400px)",
  icon: "mdi:file-document-outline",
  // @ts-ignore
  allowedTypes: ["application/pdf", "application/vnd.google-apps.document"],
});

const fileList = ref<any>([]);
const drag = ref(false);

function dropHandler(event: any) {
  drag.value = false;

  // Prevent default behavior (Prevent file from being opened)
  event.preventDefault();

  if (event.dataTransfer.items) {
    const items = [...event.dataTransfer.items];

    // Use DataTransferItemList interface to access the file(s)
    items.forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (isAllowedType(file)) {
          fileList.value.push({ [file.name]: file });
        }
        console.log(file);

        console.log(`… file[${i}].name = ${file.name}`);
      }
    });
    return;
  }
  const files = [...event.dataTransfer.files];
  console.log({ files });
  // Use DataTransfer interface to access the file(s)
  files.forEach((file, i) => {
    console.log(file);
    if (isAllowedType(file)) {
      fileList.value.push({ [file.name]: file });
    }
    console.log(file);

    console.log(`… file[${i}].name = ${file.name}`);
  });
}

const inputRef = ref(null);

function openFileUploaderWindow() {
  // @ts-ignore
  inputRef.value.click();
}

function dragOverHandler(ev: any) {
  drag.value = true;
  console.log("File(s) in drop zone", ev);

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function handleFileInput(ev: any) {
  const files = ev.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (isAllowedType(file)) {
      fileList.value.push({ [file.name]: file });
    }
  }
}

const fileName = (file: any) => {
  const fileKey = Object.keys(file).map((x) => x)[0];
  return file[fileKey].name;
};

function isAllowedType(file: any) {
  const _allowedType = props.allowedTypes.includes(file.type);
  const listNames = fileList.value.map((x) => Object.keys(x)[0]);
  return _allowedType && !listNames.includes(file.name);
}

function getFileListData() {
  return fileList.value;
}

function formatFileSize(file: any) {
  const fileKey = Object.keys(file).map((x) => x)[0];
  const fileSizeInBytes = file[fileKey].size;
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (fileSizeInBytes < kilobyte) {
    return fileSizeInBytes + " B";
  } else if (fileSizeInBytes < megabyte) {
    return (fileSizeInBytes / kilobyte).toFixed(2) + " KB";
  } else if (fileSizeInBytes < gigabyte) {
    return (fileSizeInBytes / megabyte).toFixed(2) + " MB";
  } else {
    return (fileSizeInBytes / gigabyte).toFixed(2) + " GB";
  }
}

const deleteFile = (index: number) => {
  fileList.value.splice(index, 1);
};
defineExpose({
  getFileListData,
});
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-3">
    <div
      :class="drag ? 'tw-bg-blue-50' : 'tw-bg-base'"
      class="drop-zone"
      @click="openFileUploaderWindow"
      @dragover="dragOverHandler"
      @dragend="drag = false"
      @dragleave="drag = false"
      @drop="dropHandler"
    >
      <Icon name="mdi:cloud-upload-outline" size="65" />
      <div class="tw-flex tw-flex-col tw-gap-1">
        <p class="tw-text-[#656E81] tw-text-base">
          <span class="tw-text-[#051638] tw-font-semibold">{{
            titleBold
          }}</span>
          {{ title }}
        </p>
        <p class="tw-text-[#656E81] tw-text-base">{{ subtitle }}</p>
      </div>
    </div>
    <div
      v-if="fileList.length"
      class="tw-py-2 tw-flex tw-flex-col tw-gap-3 tw-max-h-[500px] tw-overflow-auto tw-p-2 tw-shadow-sm tw-rounded"
    >
      <div
        v-for="(file, index) in fileList"
        :key="index"
        class="drop-list-item"
      >
        <div
          class="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-flex-1"
        >
          <div
            class="tw-bg-secondary tw-rounded-full tw-w-[32px] tw-h-[32px] tw-flex tw-items-center tw-justify-center"
          >
            <Icon :name="icon" size="16" />
          </div>
          <div class="tw-flex tw-flex-col">
            <h1 class="title !tw-text-base">{{ fileName(file) }}</h1>
            <h6 class="subtitle !tw-text-xsm">{{ formatFileSize(file) }}</h6>
          </div>
        </div>
        <n-button
          circle
          secondary
          size="small"
          strong
          type="error"
          @click="deleteFile(index)"
        >
          <template #icon>
            <Icon name="ic:baseline-delete-outline" size="27" />
          </template>
        </n-button>
      </div>
    </div>

    <input
      id="file-input"
      ref="inputRef"
      accept=".pdf,application/vnd.google-apps.document"
      multiple
      style="display: none"
      type="file"
      @change="handleFileInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.drop-zone {
  @apply tw-flex tw-flex-col tw-gap-3 tw-rounded-md tw-items-center tw-justify-center tw-p-6 tw-cursor-pointer;
  border: 1px dashed rgba(var(--primary-rgb), 0.2);
}

.drop-list-item {
  @apply tw-transition-all tw-flex tw-items-center tw-justify-between tw-gap-2 tw-flex-wrap tw-ps-2 tw-pe-4 tw-py-2 tw-rounded-base;
  border: 2px solid var(--accent);
  background: var(--btn-primary-bg);

  &:hover {
    background: var(--accent);
  }
}
</style>
