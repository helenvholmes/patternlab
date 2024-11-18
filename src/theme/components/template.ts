import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";
/**
 * Grid layout based on https://www.joshwcomeau.com/css/full-bleed/
 */

const Template = defineStyleConfig({
  baseStyle: defineStyle({
    boxSizing: "border-box",
    color: "ui.typography.body",
    display: "grid",
    gridTemplateColumns: `
      1fr
      min(1280px, 100%)
      1fr`,
    rowGap: "grid.l",
    _dark: {
      color: "dark.ui.typography.body",
    },
  }),
  sizes: {},
  defaultProps: {},
});
// Elements that need to breakout will span outside
// the center 1280px grid column.
const TemplateBreakout = defineStyleConfig({
  baseStyle: defineStyle({
    width: "100%",
    // This could be "1 / 4" and it would mean the same. This is
    // "future-proof" the grid column assignment to the last column.
    gridColumn: "1 / -1",
  }),
});
const TemplateContent = defineStyleConfig({
  baseStyle: defineStyle({
    // Set this element to start on the second 1280px grid column.
    gridColumn: "2",
    // This element also contains its own grid system within, but we use "flex"
    // for mobile to deal with overflow issues related to the Table component.
    display: { base: "flex", md: "grid" },
    flexDirection: { base: "column", md: null },
    gridTemplateColumns: "1fr",
    paddingY: 0,
    rowGap: "grid.l",
  }),
  // With left or right sidebars, we need to set two grid columns and
  // the column for the sidebar is max 271px width (255px for the sidebar,
  // + 16px for padding).
  variants: {
    left: {
      gridTemplateColumns: { md: "271px 1fr" },
    },
    right: {
      gridTemplateColumns: { md: "1fr 271px" },
    },
  },
});

const TemplateContentTopBottom = defineStyleConfig({
  baseStyle: defineStyle({
    gridColumn: { base: "1", md: "1 / span 2" },
    height: "100%",
    paddingX: "s",
  }),
});

/** The overflow styles were added to deal with overflow issues related to the
 * Table component. */
const TemplateContentPrimary = defineStyleConfig({
  baseStyle: defineStyle({
    gridColumn: { base: "1", md: "1 / span 2" },
    overflow: { base: "unset", md: "hidden" },
    paddingX: "s",
  }),
  variants: {
    left: {
      gridColumn: { base: "1", md: "2" },
      marginEnd: { md: 0 },
      minWidth: { md: 0 },
      paddingRight: "s",
      paddingLeft: { base: "s", md: "l" },
    },
    right: {
      gridColumn: "1",
      paddingRight: { base: "s", md: "l" },
      paddingLeft: "s",
    },
  },
});
const TemplateContentSidebar = defineStyleConfig({
  variants: {
    left: {
      gridColumn: "1",
      paddingLeft: "s",
      paddingRight: { base: "s", md: 0 },
    },
    right: {
      gridColumn: { base: "1", md: "2" },
      paddingLeft: { base: "s", md: 0 },
      paddingRight: "s",
    },
  },
});

export default {
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentTopBottom,
  TemplateContentPrimary,
  TemplateContentSidebar,
};
