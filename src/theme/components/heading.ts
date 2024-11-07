import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

import { baseLinkStyles } from "./link";

const margins = {
  marginTop: "0",
  marginStart: "0",
  marginEnd: "0",
};

// This function creates a set of function that helps us
// create multipart component styles.
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "headingWrapper"]);

// Heading Styles
export const headings = {
  one: definePartsStyle({
    base: {
      fontSize: "heading.primary", // var(--nypl-fontSizes-4);
      fontWeight: "heading.primary",
      letterSpacing: "0",
      lineHeight: "1.1",
      ...margins,
      width: "auto",
      a: { textUnderlineOffset: "4px" },
    },
  }),
  two: definePartsStyle({
    base: {
      fontSize: "heading.secondary", // var(--nypl-fontSizes-3);
      fontWeight: "heading.secondary",
      lineHeight: "1.25",
      ...margins,
      width: "auto",
      a: { textUnderlineOffset: "3px" },
    },
  }),
  three: definePartsStyle({
    base: {
      fontSize: "heading.tertiary", // var(--nypl-fontSizes-2);
      fontWeight: "heading.tertiary",
      lineHeight: "1.25",
      ...margins,
      width: "auto",
    },
  }),
  four: definePartsStyle({
    base: {
      fontSize: "heading.callout", // var(--nypl-fontSizes-1);
      fontWeight: "heading.callout",
      lineHeight: "1.15",
      ...margins,
      width: "auto",
    },
  }),
  fallback: definePartsStyle({
    base: {
      fontSize: "1", // var(--nypl-fontSizes-1);
      fontWeight: "regular",
      lineHeight: "1.15",
      ...margins,
      width: "auto",
    },
  }),
  display1: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.display1",
        md: "desktop.heading.display1",
      },
      fontWeight: "heading.display1",
      letterSpacing: "0.0625rem",
      lineHeight: "1.10",
      width: "auto",
      a: { textUnderlineOffset: "7px" },
    },
  }),
  heading1: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading1",
        md: "desktop.heading.heading1",
      },
      fontWeight: "heading.heading1",
      letterSpacing: "0.0625rem",
      lineHeight: "1.15",
      width: "auto",
      a: { textUnderlineOffset: "6px" },
    },
  }),
  heading2: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading2",
        md: "desktop.heading.heading2",
      },
      fontWeight: "heading.heading2",
      letterSpacing: "0.0625rem",
      lineHeight: "1.20",
      width: "auto",
      a: { textUnderlineOffset: "5px" },
    },
  }),
  heading3: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading3",
        md: "desktop.heading.heading3",
      },
      fontWeight: "heading.heading3",
      letterSpacing: "0",
      lineHeight: "1.25",
      width: "auto",
      a: { textUnderlineOffset: "4px" },
    },
  }),
  heading4: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading4",
        md: "desktop.heading.heading4",
      },
      fontWeight: "heading.heading4",
      letterSpacing: "0",
      lineHeight: "1.30",
      width: "auto",
      a: { textUnderlineOffset: "3px" },
    },
  }),
  heading5: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading5",
        md: "desktop.heading.heading5",
      },
      fontWeight: "heading.heading5",
      letterSpacing: "0",
      lineHeight: "1.35",
      width: "auto",
    },
  }),
  heading6: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading6",
        md: "desktop.heading.heading6",
      },
      fontWeight: "heading.heading6",
      letterSpacing: "0",
      lineHeight: "1.40",
      width: "auto",
    },
  }),
  heading7: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading7",
        md: "desktop.heading.heading7",
      },
      fontWeight: "heading.heading7",
      letterSpacing: "0",
      lineHeight: "1.45",
      width: "auto",
    },
  }),
  heading8: definePartsStyle({
    base: {
      fontSize: {
        base: "mobile.heading.heading8",
        md: "desktop.heading.heading8",
      },
      fontWeight: "heading.heading8",
      letterSpacing: "0",
      lineHeight: "1.50",
      width: "auto",
    },
  }),
};

// Styles for different visual variants
const variants = {
  // RECOMMENDED options for native heading element variants
  h1: headings.heading1,
  h2: headings.heading2,
  h3: headings.heading3,
  h4: headings.heading4,
  h5: headings.heading5,
  h6: headings.heading6,
  // DEPRECATED options for native heading elements variants
  one: headings.one,
  two: headings.two,
  three: headings.three,
  four: headings.four,
  five: headings.fallback,
  six: headings.fallback,
  // RECOMMENDED options for size variants
  display1: headings.display1,
  heading1: headings.heading1,
  heading2: headings.heading2,
  heading3: headings.heading3,
  heading4: headings.heading4,
  heading5: headings.heading5,
  heading6: headings.heading6,
  heading7: headings.heading7,
  heading8: headings.heading8,
  // DEPRECATED options for size variants
  primary: headings.one,
  secondary: headings.two,
  tertiary: headings.three,
  callout: headings.four,
};

const Heading = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({ isCapitalized, isUppercase, isLowercase, noSpace }) => ({
      base: {
        "a:only-child": {
          ...baseLinkStyles,
          textDecoration: "none",
        },
        color: "ui.typography.heading",
        margin: "0",
        textTransform: isCapitalized
          ? "capitalize"
          : isUppercase
          ? "uppercase"
          : isLowercase
          ? "lowercase"
          : null,
        _dark: {
          color: "dark.ui.typography.heading",
        },
      },
      headingWrapper: {
        marginBottom: noSpace ? "0" : "s",
        ...margins,
      },
    })
  ),
  // Available variants:
  // h1, h2, h3, h4, h5, h6
  // display1, heading1, heading2, heading3, heading4, heading5, heading6
  // DEPRECATED: one, two, three, four, five, six
  // DEPRECATED: primary, secondary, tertiary, callout
  variants,
  defaultProps: {
    variant: "h2",
  },
});

export default Heading;
