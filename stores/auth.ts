import { defineStore } from "pinia";
import { useCommonStore } from "~/stores/common";

interface UserData {}

export const useAuthStore = defineStore("auth", () => {
  const tokenCookie = useCookie("_token");
  const userData = ref<UserData | null>(null);
  const router = useRouter();

  const { notify, handleServerErrors } = useCommonStore();

  function setAuth(data: any, accessToken: any) {
    userData.value = data;
    tokenCookie.value = accessToken;
    if (process.client && window && window.localStorage) {
      localStorage.setItem("user", JSON.stringify(userData.value));
    }
  }

  async function clearAuth() {
    userData.value = null;
    tokenCookie.value = null;
    await router.push({ name: "login" });
  }

  async function checkAuth() {
    if (!process.client || !window || !window.localStorage) return;
    const _stg = localStorage.getItem("user");
    if (!_stg) {
      // await clearAuth()
      return;
    }
    userData.value = JSON.parse(_stg);
  }

  function useLoginHandler() {
    const formRef = ref(null);
    const loading = ref(false);
    const errorMsg = ref<string | null>(null);
    const formValues = ref({
      email: null,
      password: null,
    });

    const submit = async () => {
      // @ts-ignore
      const errors = await formRef?.value.validate();
      if (errors) return;

      loading.value = true;
      errorMsg.value = null;
      try {
        //const userData = await login(formValues.value);

        // setAuth(userData.user, userData.access_token);

        loading.value = false;

        notify("success", { title: "Login successful" });

        await router.push({ name: "dashboard" });
      } catch (e) {
        loading.value = false;
        errorMsg.value = handleServerErrors(e);
      }
    };

    return {
      loading,
      formValues,
      formRef,
      submit,
      errorMsg,
    };
  }

  return {
    setAuth,
    clearAuth,
    userData,
    tokenCookie,
    useLoginHandler,
    checkAuth,
  };
});
