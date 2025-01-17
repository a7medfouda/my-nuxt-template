import axios, { type AxiosInstance } from "axios";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const baseURL = config.public.baseURL as string;
  const locale =
    typeof window !== "undefined"
      ? window.localStorage.getItem("app-lang") || "en"
      : "ar";
  const api: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": locale,
    },
  });

  const setAuthToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  };

  const setLanguage = (language: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app-lang", language);
      api.defaults.headers.common["Accept-Language"] = language;
    }
  };
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", api);
  nuxtApp.provide("setLanguage", setLanguage);
});
