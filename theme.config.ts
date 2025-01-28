export default function themeConfig() {
  const _lightThemeVars = {
    sidebarWidthClose: 60,
    sidebarWidthOpen: 190,

    primary: "#051638",
    primaryRgb: "5, 22, 56",

    secondary: "#656E81",
    secondaryRgb: "101, 110, 129",

    third: "#ededed",
    thirdRgb: "237, 237, 237",

    accent: "#fdda00",
    accentRgb: "253, 218, 0",
    // 333333
    btnPrimaryBg: "#ffffff",
    btnPrimarySec: "#333333",

    bg: "#fcfcfd",
    bgRgb: "252, 252, 253",

    bgSec: "#ffe7b2",
    bgSecRgb: "255, 231, 178",

    bgThird: "#ffffff",
    bgThirdRgb: "255, 255, 255",

    info: "#1491e6",
    infoRgb: " 20, 145, 230",

    error: "#9f2b2b",
    errorRgb: "159, 43, 43",

    warning: "#faad14;",
    warningRgb: "250, 173, 20",

    success: "#4e8d12",
    successRgb: "78, 141, 18",

    fontAr: `'Baloo Bhaijaan 2', sans-serif`,
    fontEn: `'Rubik', sans-serif`,

    fontBaseSize: "14px",

    fontSmSize: "0.8rem",
    fontXsmSize: "0.7rem",

    fontLgSize: "1.25rem",
    fontXlgSize: "2.1rem",

    baseRadius: "0.5rem",
    baseBorder: "1px solid #e5e7eb",
  };
  const _DarThemeVars = {
    sidebarWidthClose: 60,
    sidebarWidthOpen: 190,

    primary: "#051638",
    primaryRgb: "5, 22, 56",

    secondary: "#656E81",
    secondaryRgb: "101, 110, 129",

    third: "#ededed",
    thirdRgb: "237, 237, 237",

    accent: "#fdda00",
    accentRgb: "253, 218, 0",
    // 333333
    btnPrimaryBg: "#ffffff",
    btnPrimarySec: "#333333",

    bg: "#fcfcfd",
    bgRgb: "252, 252, 253",

    bgSec: "#ffe7b2",
    bgSecRgb: "255, 231, 178",

    bgThird: "#ffffff",
    bgThirdRgb: "255, 255, 255",

    info: "#1491e6",
    infoRgb: " 20, 145, 230",

    error: "#9f2b2b",
    errorRgb: "159, 43, 43",

    warning: "#faad14;",
    warningRgb: "250, 173, 20",

    success: "#4e8d12",
    successRgb: "78, 141, 18",

    fontAr: `'Baloo Bhaijaan 2', sans-serif`,
    fontEn: `'Rubik', sans-serif`,

    fontBaseSize: "14px",

    fontSmSize: "0.8rem",
    fontXsmSize: "0.7rem",

    fontLgSize: "1.25rem",
    fontXlgSize: "2.1rem",

    baseRadius: "0.5rem",
    baseBorder: "1px solid #e5e7eb",
  };
  const getBodyClasses = () => {
    let convertedString = "";
    const obj = _lightThemeVars;
    for (const key in obj) {
      const convertedKey = `--${key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase()}`;
      // @ts-ignore
      const value = obj[key];
      convertedString += `${convertedKey}: ${value};\n`;
      // if (key.includes('Rgb')) {
      //   const rgbKey = convertedKey.replace('-rgb', '');
      //   const rgbValue = value.replace(/\s/g, '');
      //   convertedString += `${rgbKey}: ${rgbValue};\n`;
      // }
    }
    return convertedString;
  };
  return { _lightThemeVars, getBodyClasses };
}
