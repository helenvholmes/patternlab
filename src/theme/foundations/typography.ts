import { Dict } from "../types";

type Typography = {
  fonts: Dict;
  fontSizes: Dict;
  fontWeights: Dict;
};

const fontSizeValues = {
  "-3": "0.625rem",
  "-2": "0.75rem",
  "-1": "0.875rem",
  "0": "1rem",
  "1": "1.125rem",
  "2": "1.375rem",
  "3": "1.75rem",
  "4": "2.25rem",
  desktop: {
    display1: "4.25rem", // 68px
    heading1: "3.375rem", // 54px
    heading2: "2.625rem", // 42px
    heading3: "2rem", // 32px
    heading4: "1.625rem", // 26px
    heading5: "1.375rem", // 22px
    heading6: "1.25rem", // 20px
    heading7: "1.125rem", // 18px
    heading8: "1rem", // 16px
    subtitle1: "1.125rem", // 18px
    subtitle2: "1rem", // 16px
    overline1: "0.75rem", // 12px
    overline2: "0.625rem", // 10px
    label1: "0.875rem", // 14px
    label2: "0.75rem", // 12px
    buttonDefault: "0.875rem", // 14px
    buttonSmall: "0.75rem", // 12px
    buttonLarge: "1rem", // 26px
    body1: "1rem", // 16px
    body2: "0.875rem", // 14px
    caption: "0.75rem", // 12px
    default: "1rem", // 16px
  },
  mobile: {
    display1: "3.25rem", // 52px
    heading1: "2.625rem", // 42px
    heading2: "2.125rem", // 34px
    heading3: "1.75rem", // 28px
    heading4: "1.5rem", // 24px
    heading5: "1.25rem", // 20px
    heading6: "1.125rem", // 18px
    heading7: "1.0625rem", // 17px
    heading8: "1rem", // 16px
    subtitle1: "1rem", // 16px
    subtitle2: "0.875rem", // 14px
    overline1: "0.75rem", // 12px
    overline2: "0.625rem", // 10px
    label1: "0.875rem", // 14px
    label2: "0.75rem", // 12px
    buttonDefault: "0.875rem", // 14px
    buttonSmall: "0.75rem", // 12px
    buttonLarge: "1rem", // 26px
    body1: "1rem", // 16px
    body2: "0.875rem", // 14px
    caption: "0.75rem", // 12px
    default: "1rem", // 16px
  },
};

const fontWeightValues = {
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const typography: Typography = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
  fontSizes: {
    // generic tokens
    "-3": fontSizeValues["-3"],
    "-2": fontSizeValues["-2"],
    "-1": fontSizeValues["-1"],
    "0": fontSizeValues["0"],
    "1": fontSizeValues["1"],
    "2": fontSizeValues["2"],
    "3": fontSizeValues["3"],
    "4": fontSizeValues["4"],
    // semantic tokens - desktop and mobile
    desktop: {
      body: {
        body1: fontSizeValues.desktop["body1"],
        body2: fontSizeValues.desktop["body2"],
      },
      breadcrumbs: {
        default: fontSizeValues.desktop["body2"],
      },
      button: {
        small: fontSizeValues.desktop["buttonSmall"],
        default: fontSizeValues.desktop["buttonDefault"],
        large: fontSizeValues.desktop["buttonLarge"],
      },
      caption: fontSizeValues.desktop["caption"],
      default: fontSizeValues.desktop["default"],
      heading: {
        display1: fontSizeValues.desktop["display1"],
        heading1: fontSizeValues.desktop["heading1"],
        heading2: fontSizeValues.desktop["heading2"],
        heading3: fontSizeValues.desktop["heading3"],
        heading4: fontSizeValues.desktop["heading4"],
        heading5: fontSizeValues.desktop["heading5"],
        heading6: fontSizeValues.desktop["heading6"],
        heading7: fontSizeValues.desktop["heading7"],
        heading8: fontSizeValues.desktop["heading8"],
      },
      helper: {
        default: fontSizeValues.desktop["caption"],
      },
      label: {
        label1: fontSizeValues.desktop["label1"],
        label2: fontSizeValues.desktop["label2"],
      },
      overline: {
        overline1: fontSizeValues.desktop["overline1"],
        overline2: fontSizeValues.desktop["overline2"],
      },
      subtitle: {
        subtitle1: fontSizeValues.desktop["subtitle1"],
        subtitle2: fontSizeValues.desktop["subtitle2"],
      },
    },
    mobile: {
      body: {
        body1: fontSizeValues.mobile["body1"],
        body2: fontSizeValues.mobile["body2"],
      },
      breadcrumbs: {
        default: fontSizeValues.mobile["body2"],
      },
      button: {
        small: fontSizeValues.mobile["buttonSmall"],
        default: fontSizeValues.mobile["buttonDefault"],
        large: fontSizeValues.mobile["buttonLarge"],
      },
      caption: fontSizeValues.mobile["caption"],
      default: fontSizeValues.mobile["default"],
      heading: {
        display1: fontSizeValues.mobile["display1"],
        heading1: fontSizeValues.mobile["heading1"],
        heading2: fontSizeValues.mobile["heading2"],
        heading3: fontSizeValues.mobile["heading3"],
        heading4: fontSizeValues.mobile["heading4"],
        heading5: fontSizeValues.mobile["heading5"],
        heading6: fontSizeValues.mobile["heading6"],
        heading7: fontSizeValues.mobile["heading7"],
        heading8: fontSizeValues.mobile["heading8"],
      },
      helper: {
        default: fontSizeValues.mobile["caption"],
      },
      label: {
        label1: fontSizeValues.mobile["label1"],
        label2: fontSizeValues.mobile["label2"],
      },
      overline: {
        overline1: fontSizeValues.mobile["overline1"],
        overline2: fontSizeValues.mobile["overline2"],
      },
      subtitle: {
        subtitle1: fontSizeValues.mobile["subtitle1"],
        subtitle2: fontSizeValues.mobile["subtitle2"],
      },
    },
    // deprecated semantic tokens
    breadcrumbs: {
      // The deprecated value is "caption" but we should use body2 instead
      // for backwards compatibility
      default: fontSizeValues.desktop["body2"],
    },
    button: {
      small: {
        base: fontSizeValues.desktop["buttonSmall"],
        md: fontSizeValues.mobile["buttonSmall"],
      },
      default: {
        base: fontSizeValues.desktop["buttonDefault"],
        md: fontSizeValues.mobile["buttonDefault"],
      },
      large: {
        base: fontSizeValues.desktop["buttonLarge"],
        md: fontSizeValues.mobile["buttonLarge"],
      },
    },
    heading: {
      primary: fontSizeValues["4"],
      secondary: fontSizeValues["3"],
      tertiary: fontSizeValues["2"],
      callout: fontSizeValues["1"],
    },
    helper: {
      default: fontSizeValues["-2"],
    },
    label: {
      default: fontSizeValues["-1"],
      secondary: fontSizeValues["-2"],
    },
    text: {
      default: fontSizeValues["0"],
      caption: fontSizeValues["-1"],
      tag: fontSizeValues["-2"],
      mini: fontSizeValues["-3"],
    },
  },
  fontWeights: {
    // generic tokens
    light: fontWeightValues["light"],
    regular: fontWeightValues["regular"],
    medium: fontWeightValues["medium"],
    semibold: fontWeightValues["semibold"],
    bold: fontWeightValues["bold"],
    // semantic tokens
    body: {
      default: fontWeightValues["light"],
      body1: fontWeightValues["light"],
      body2: fontWeightValues["light"],
    },
    breadcrumbs: {
      default: fontWeightValues["regular"],
      lastChild: fontWeightValues["bold"],
    },
    button: {
      default: fontWeightValues["regular"],
    },
    caption: fontWeightValues["regular"],
    default: fontWeightValues["light"],
    heading: {
      display1: fontWeightValues["thin"],
      heading1: fontWeightValues["thin"],
      heading2: fontWeightValues["thin"],
      heading3: fontWeightValues["light"],
      heading4: fontWeightValues["regular"],
      heading5: fontWeightValues["medium"],
      heading6: fontWeightValues["medium"],
      heading7: fontWeightValues["medium"],
      heading8: fontWeightValues["medium"],
      // deprecated tokens
      primary: fontWeightValues["light"],
      secondary: fontWeightValues["medium"],
      tertiary: fontWeightValues["medium"],
      callout: fontWeightValues["medium"],
    },
    helper: {
      default: fontWeightValues["light"],
    },
    label: {
      default: fontWeightValues["medium"],
      secondary: fontWeightValues["regular"],
    },
    overline: {
      overline1: fontWeightValues["semibold"],
      overline2: fontWeightValues["semibold"],
    },
    subtitle: {
      subtitle1: fontWeightValues["regular"],
      subtitle2: fontWeightValues["regular"],
    },
    text: {
      default: fontWeightValues["light"],
      caption: fontWeightValues["light"],
      tag: fontWeightValues["regular"],
      mini: fontWeightValues["regular"],
    },
  },
};

export default typography;
