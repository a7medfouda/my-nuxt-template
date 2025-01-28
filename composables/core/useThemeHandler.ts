export default function () {
    const theme_cookie = useCookie<"dark" | "light">("theme");
    const setTheme = async (globalTheme: "dark" | "light") => {
      // dark.set(globalTheme === "dark");
      theme_cookie.value = globalTheme;
      if (process.client) {
        await nextTick(() => {
          document
            .querySelector("html")
            ?.classList.remove(globalTheme == "dark" ? "light" : "dark");
          document.querySelector("html")?.classList.add(globalTheme);
        });
      }
    };
  
    return { setTheme, theme_cookie };
  }
  