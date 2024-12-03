import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";

export const responsiveGap = { base: "1rem", md: "1.5rem", xl: "1rem" };
export const responsivePadding = { base: "1rem", md: "1.5rem", xl: "2rem" };

const TemplateNew = defineStyleConfig({
  baseStyle: defineStyle({
    boxSizing: "border-box",
    color: "ui.typography.body",
    maxWidth: "min(100vw, 1280px)",
    m: "0 auto",
    display: "grid",
    p: "s",
    gap: responsiveGap,
    gridTemplateColumns: "repeat(1, minmax(100px, 1fr))",
    gridTemplateRows: "auto",
    gridTemplateAreas: `"breakout" "top" "main" "bottom"`,
  }),
  variants: {
    left: {
      gridTemplateColumns: {
        base: "repeat(1, minmax(100px, 1fr))",
        md: "repeat(2, minmax(100px, 1fr))",
        lg: "minmax(100px, 1fr) minmax(200px, 2fr)",
        xl: "minmax(100px, 1fr) minmax(300px, 3fr)",
      },
      gridTemplateAreas: {
        base: `"breakout" "top" "sidebar" "main" "bottom"`,
        md: `"breakout breakout" "top top" "sidebar main" "bottom bottom"`,
      },
    },
    right: {
      gridTemplateColumns: {
        base: "repeat(1, minmax(100px, 1fr))",
        md: "repeat(2, minmax(100px, 1fr))",
        lg: "minmax(200px, 2fr) minmax(100px, 1fr)",
        xl: "minmax(300px, 3fr) minmax(100px, 1fr)",
      },
      gridTemplateAreas: {
        base: `"breakout" "top" "main" "sidebar" "bottom"`,
        md: `"breakout breakout" "top top" "main sidebar" "bottom bottom"`,
      },
    },
  },
});

const TemplateNewBreakout = defineStyleConfig({
  baseStyle: defineStyle({
    gridArea: "breakout",
    width: "100vw",
    ml: "calc(-50vw + 50%)",
    px: "s",
  }),
});

const TemplateNewTop = defineStyleConfig({
  baseStyle: defineStyle({
    gridArea: "top",
  }),
});

const TemplateNewMain = defineStyleConfig({
  baseStyle: defineStyle({
    gridArea: "main",
  }),
});

const TemplateNewSidebar = defineStyleConfig({
  baseStyle: defineStyle({
    gridArea: "sidebar",
  }),
});

const TemplateNewBottom = defineStyleConfig({
  baseStyle: defineStyle({
    gridArea: "bottom",
  }),
});

export default {
  TemplateNew,
  TemplateNewBreakout,
  TemplateNewTop,
  TemplateNewMain,
  TemplateNewSidebar,
  TemplateNewBottom,
};
