let timeoutId: string | number | NodeJS.Timeout | undefined;

export default function debounce(func: any, delay: number) {
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
