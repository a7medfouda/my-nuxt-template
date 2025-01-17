import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  let observer: IntersectionObserver | null = null;

  const lazyLoad = (image: HTMLElement) => {
    const dataSrc = image.getAttribute("data-src");
    if (!dataSrc) return;

    image.setAttribute("src", dataSrc);
    image.removeAttribute("data-src");
    image.setAttribute("data-loaded", "true");

    image.addEventListener("load", () => {
      image.classList.add("fade-in");
    });

    if (observer) {
      observer.unobserve(image);
    }
  };

  const initializeObserver = () => {
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              lazyLoad(entry.target as HTMLElement);
            }
          });
        },
        { rootMargin: "50px 0px", threshold: 0.01 }
      );
    }
  };

  const observeImages = () => {
    const images = document.querySelectorAll<HTMLElement>(
      "img[data-src], nuxt-img[data-src]"
    );
    images.forEach((img) => {
      if (observer) {
        observer.observe(img);
      } else {
        lazyLoad(img);
      }
    });
  };

  if (process.client) {
    initializeObserver();

    document.addEventListener("DOMContentLoaded", observeImages);

    const mutationObserver = new MutationObserver(() => {
      observeImages();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
});
