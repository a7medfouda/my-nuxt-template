import { defineStore } from "pinia";
import { type NotificationType, useNotification } from "naive-ui";

type NotifyCtx = {
  title: string;
  content?: string;
  duration?: number;
};
export const useCommonStore = defineStore("commonData", () => {
  const notification = useNotification();
  const showNetworkError = ref(false);

  function notifyNetworkError(exist: boolean) {
    const title = exist
      ? "Your Internet Connection was restored"
      : "You are Currently offline try to check your modem and router";
    if (!exist && showNetworkError.value) return;
    notification.create({
      title,
      avatar: () => h("div", {}, { default: () => (exist ? "🎉" : "⚠️") }),
      onAfterEnter: () => (showNetworkError.value = !exist),
      onClose: () => (showNetworkError.value = !exist),
    });
  }

  function notify(
    type: NotificationType,
    { content, title, duration }: NotifyCtx
  ) {
    notification[type]({
      title,
      content,
      duration: duration || 2500,
      keepAliveOnHover: true,
    });
  }

  function getErrorMsg(e: any) {
    return e?.response?.data?.message || e?.message || "An error occurred";
  }

  function handleServerErrors(e: any): string | null {
    const code = parseInt(e.response && e.response.status);

    const _notify = code < 401 || code === 422;
    if (!_notify) return null;

    const errorMsg = getErrorMsg(e);

    notify("error", { title: errorMsg || "" });

    return errorMsg;
  }

  return {
    notify,
    getErrorMsg,
    handleServerErrors,
    notifyNetworkError,
  };
});
