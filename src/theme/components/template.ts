import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";
import { responsiveGap, responsivePadding } from "./global";

const Template = defineStyleConfig({
  baseStyle: defineStyle({
    boxSizing: "border-box",
    color: "ui.typography.body",
    display: "grid",
    maxWidth: "1280px",
    // 320px screen width - 32px padding = 288px
    minWidth: "288px",
    m: "0 auto",
    p: responsivePadding,
    gridTemplateAreas: `"breakout" "top" "main" "bottom"`,
    gridTemplateColumns: "100%",
    gridTemplateRows: "auto",
    columnGap: responsiveGap,
    "& > *:not(:last-child)": { mb: responsiveGap },
  }),
  variants: {
    left: {
      gridTemplateAreas: {
        base: `"breakout" "top" "sidebar" "main" "bottom"`,
        md: `"breakout breakout" "top top" "sidebar main" "bottom bottom"`,
      },
      gridTemplateColumns: {
        base: "100%",
        md: "repeat(2, minmax(100px, 1fr))",
        lg: "minmax(100px, 1fr) minmax(200px, 2fr)",
        xl: "minmax(100px, 1fr) minmax(300px, 3fr)",
      },
    },
    right: {
      gridTemplateAreas: {
        base: `"breakout" "top" "main" "sidebar" "bottom"`,
        md: `"breakout breakout" "top top" "main sidebar" "bottom bottom"`,
      },
      gridTemplateColumns: {
        base: "100%",
        md: "repeat(2, minmax(100px, 1fr))",
        lg: "minmax(200px, 2fr) minmax(100px, 1fr)",
        xl: "minmax(300px, 3fr) minmax(100px, 1fr)",
      },
    },
  },
});

const TemplateBreakout = defineStyleConfig({
  baseStyle: defineStyle({
    width: "100vw",
    ml: "calc(-50vw + 50%)",
    px: responsivePadding,
  }),
});

const TemplateMainNarrow = defineStyleConfig({
  baseStyle: defineStyle({
    maxWidth: "720px",
    m: "0 auto",
  }),
});

export default {
  Template,
  TemplateBreakout,
  TemplateMainNarrow,
};
