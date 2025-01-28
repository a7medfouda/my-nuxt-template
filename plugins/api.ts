import axios from "axios";
import { navigateTo } from "#app";
import { useCommonStore } from "~/stores/common";
import { useAuthStore } from "~/stores/auth";

type NotifyCtx = {
  title: string;
  content?: string;
  duration?: number;
};

export default defineNuxtPlugin((nuxtApp) => {
  const { $pinia } = useNuxtApp();

  const $axios = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const fireRequest = async (config: any) => {
    console.log(`%c Making request to: ${config.url}`);
    // @ts-ignore
    const token = useCookie("_token").value?.token;
    // Do something before request is sent
    config.headers["Authorization"] = token ? `Bearer ${token}` : null;
    config.headers["Accept-Language"] = useCookie("lang").value || "en";
    // config.headers["Device-Type"] = useRuntimeConfig().public.API_SECRET;

    await nuxtApp.callHook("page:start");
    // console.log(config, "config from middleware");
    return config;
  };
  const errorResponse = async (error: any) => {
    // @ts-ignore
    const commonStore = useCommonStore($pinia);
    // @ts-ignore
    const authStore = useAuthStore($pinia);

    const { notify, getErrorMsg, notifyNetworkError } = commonStore;

    await nuxtApp.callHook("page:finish");

    const isNetworkError = error.code === "ERR_NETWORK";
    if (isNetworkError) {
      notifyNetworkError(false);
      return Promise.reject(error);
    }

    const code = parseInt(error.response && error.response.status);

    const notifyMsg: NotifyCtx = {
      title: getErrorMsg(error),
      content: `An Error has occurred at this request: "/${error.response.config.url}" with status code: ${code}`,
      duration: 1000000,
    };

    // 401 Unauthorized
    if (code === 401) {
      await authStore.clearAuth();
      navigateTo({ name: "login" });
    }
    // 403 Forbidden
    if (code === 403) {
      notify("error", notifyMsg);
    }
    if (code !== 422 && code > 403 && code < 500) {
      notify("error", notifyMsg);
    }

    if (code >= 500) {
      navigateTo({
        path: "/error",
        query: {
          code: code,
          statusMessage: notifyMsg.title,
          message: notifyMsg.content,
        },
      });
    }
    return Promise.reject(error);
  };

  $axios.interceptors.request.use(fireRequest);

  $axios.interceptors.response.use(
    async (response: any) => {
      await nuxtApp.callHook("page:finish");
      return response;
    },
    (error) => errorResponse(error)
  );
  // @ts-ignore
  $axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL;

  return {
    provide: {
      axios: $axios,
    },
  };
});
