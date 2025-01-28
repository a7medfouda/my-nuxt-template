import type { GlobalThemeOverrides } from "naive-ui";
import ThemeConfig from "~/theme.config";

export default function useLightTheme() {
  const {
    primary,
    third,
    accent,
    fontBaseSize,
    baseRadius,
    secondary,
    accentRgb,
    fontSmSize,
    btnPrimarySec,
    btnPrimaryBg,
    bg,
    bgThird,
    fontLgSize,
    bgSec,
    fontXsmSize,
  } = ThemeConfig()._lightThemeVars;

  const baseBorder = `1px solid ${accent}`;
  const baseShadow = `0 0 1px 2px rgba(${accentRgb},0.2)`;

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      borderRadius: baseRadius,
      primaryColor: primary,
      primaryColorHover: accent,
      primaryColorPressed: accent,
      borderColor: third,
      placeholderColor: "#9ca3af",
      heightMedium: "40px",
      heightSmall: "32px",
      heightMini: "24px",
      heightLarge: "48px",
      // boxShadow1: 'none',
      // boxShadow2: 'none',
      // boxShadow3: 'none',
      closeIconColor: primary,
      closeIconColorHover: primary,
      closeIconColorPressed: primary,
    },
    Input: {
      boxShadowFocus: baseShadow,
    },
    InternalSelection: {
      boxShadowActive: baseShadow,
      boxShadowFocus: baseShadow,
      boxShadowHover: baseShadow,
      borderFocus: baseBorder,
      borderActive: baseBorder,
    },
    Tooltip: {
      borderRadius: baseRadius,
      boxShadow:
        "0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      color: primary,
      textColor: third,
      padding: "7px 10px",
      fontSize: fontSmSize,
      fontWeight: "700",
    },
    DataTable: {
      tdColor: bgThird,
      tdColorHover: third,
      tdPaddingMedium: "1rem",
      borderRadius: baseRadius,
      boxShadowBefore: "0px 0px 0px 10px #f00",
      // borderColor
      boxShadowAfter: "0px 0px 0px 10px #f00",

      thFontWeight: "700",
      fontSizeMedium: fontBaseSize,

      thTextColor: secondary,
      tdTextColor: primary,
      thColorHover: "transparent",
      thColor: "transparent",
      thColorPopover: primary,
      tdTextColorHover: primary,
      actionDividerColor: accent,
      borderColor: third,
    },
    Tag: {
      borderRadius: baseRadius,
      textColor: primary,
      borderPrimary: accent,
      textColorPrimary: accent,
      border: baseBorder,
    },
    Button: {
      // base button
      paddingMedium: "0.5rem 1.25rem",
      borderRadius: "2rem",
      color: btnPrimaryBg,
      colorHover: btnPrimarySec,
      colorPrimary: btnPrimarySec,
      colorHoverPrimary: bgThird,
      colorPressedPrimary: btnPrimarySec,
      colorFocusPrimary: btnPrimarySec,

      textColor: primary,
      textColorHover: third,
      textColorTextFocus: primary,
      textColorPressed: primary,
      textColorFocus: primary,

      // primary button
      textColorPrimary: third,
      textColorHoverPrimary: primary,
      textColorTextFocusPrimary: primary,
      textColorPressedPrimary: third,

      borderPrimary: `1px solid ${btnPrimarySec}`,
      borderHoverPrimary: `1px solid ${primary}`,
      borderPressedPrimary: `1px solid ${btnPrimarySec}`,
      borderFocusPrimary: `1px solid ${btnPrimarySec}`,

      // info button
      colorInfo: btnPrimaryBg,
      colorHoverInfo: bg,
      colorPressedInfo: bg,
      colorFocusInfo: bg,
      colorDisabledInfo: bg,

      textColorInfo: primary,
      textColorHoverInfo: primary,
      textColorPressedInfo: primary,
      textColorFocusInfo: primary,
      textColorDisabledInfo: primary,
      // textColor

      borderInfo: `1px solid ${third}`,
      borderHoverInfo: `1px solid ${accent}`,
      borderPressedInfo: `1px solid ${accent}`,
      borderFocusInfo: `1px solid ${accent}`,
      borderDisabledInfo: `1px solid ${third}`,

      // tertiary button
      // colorTertiary: btnPrimaryBg,
      // colorHoverTertiary: bg,
      // colorPressedTertiary: bg,
      // colorFocusTertiary: bg,
      //
      // textColorTertiary: primary,
      // textColorHoverTertiary: primary,
      // textColorPressedTertiary: primary,
      // textColorFocusTertiary: primary,
      // textColorDisabledTertiary:primary,
      // // textColor
      //
      // borderTertiary: `1px solid ${primary}`,
      // borderHoverTertiary: `1px solid ${primary}`,
      // borderPressedTertiary: `1px solid ${primary}`,
      // borderFocusTertiary: `1px solid ${primary}`,
    },
    Notification: {
      color: bg,
      borderRadius: baseRadius,
      textColor: primary,
    },
    Badge: {
      color: primary,
      fontSize: "10px",
    },
    Popover: {
      borderRadius: baseRadius,
      padding: "0.5rem",
    },
    Switch: {
      railColorActive: accent,
      boxShadowFocus: "none",
    },
  };
  return { themeOverrides };
}
