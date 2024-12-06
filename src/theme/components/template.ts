import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";

export const responsiveGap = { base: "1rem", md: "1.5rem", xl: "1rem" };
export const responsivePadding = { base: "1rem", md: "1.5rem", xl: "2rem" };

const Template = defineStyleConfig({
  baseStyle: defineStyle({
    boxSizing: "border-box",
    color: "ui.typography.body",
    display: "grid",
    maxWidth: "1280px",
    m: "0 auto",
    p: "s",
    gridTemplateAreas: `"breakout" "top" "main" "bottom"`,
    gridTemplateColumns: "repeat(1, minmax(100px, 1fr))",
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
        base: "repeat(1, minmax(100px, 1fr))",
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
        base: "repeat(1, minmax(100px, 1fr))",
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
    px: "s",
  }),
});

const TemplateMainNarrow = defineStyleConfig({
  baseStyle: defineStyle({
    maxWidth: { lg: "720px" },
    m: { lg: "0 auto" },
  }),
});

export default {
  Template,
  TemplateBreakout,
  TemplateMainNarrow,
};
