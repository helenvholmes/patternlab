import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";
import { customFocusColor } from "./global";

// Variant styling
const blogs = defineStyle({
  bg: "section.blogs.secondary",
  color: "ui.black",
  _dark: {
    bg: "dark.section.blogs.secondary",
  },
  a: {
    _hover: {
      color: "ui.gray.xx-dark",
    },
    _dark: {
      _hover: {
        color: "dark.ui.typography.heading",
      },
    },
    _focus: customFocusColor("ui.black", "dark.ui.typography.body"),
  },
  "li:last-child": {
    ".chakra-breadcrumb__link": {
      _hover: {
        // Override the default hover color.
        color: "ui.black",
      },
    },
  },
  svg: {
    fill: "ui.black",
  },
});
const booksAndMore = defineStyle({
  bg: "section.books-and-more.secondary",
  _dark: {
    bg: "dark.section.books-and-more.secondary",
  },
});
const brand = defineStyle({
  bg: "brand.secondary",
  _dark: {
    bg: "dark.brand.secondary",
  },
});
const connect = defineStyle({
  bg: "section.connect.secondary",
  _dark: {
    bg: "dark.section.connect.secondary",
  },
});
const digitalCollections = defineStyle({
  bg: "ui.gray.light-cool",
  color: "ui.black",
  _dark: {
    bg: "ui.gray.xx-dark",
  },
  a: {
    _hover: {
      color: "ui.gray.xx-dark",
    },
    _dark: {
      _hover: {
        color: "ui.white",
      },
    },
    _focus: customFocusColor("ui.black", "dark.ui.typography.body"),
  },
  "li:last-child": {
    ".chakra-breadcrumb__link": {
      _hover: {
        color: "ui.gray.xx-dark",
      },
      _dark: {
        _hover: {
          color: "ui.white",
        },
      },
    },
  },
  svg: {
    fill: "ui.black",
    _dark: {
      fill: "ui.white",
    },
  },
});
const education = defineStyle({
  bg: "section.education.secondary",
  _dark: {
    bg: "dark.section.education.secondary",
  },
});
const locations = defineStyle({
  bg: "section.locations.primary",
  _dark: {
    bg: "dark.section.locations.primary",
  },
});
const research = defineStyle({
  bg: "section.research.secondary",
  _dark: {
    bg: "dark.section.research.secondary",
  },
});
const whatsOn = defineStyle({
  bg: "section.whats-on.secondary",
  _dark: {
    bg: "dark.section.whats-on.secondary",
  },
});

const Breadcrumb = defineStyleConfig({
  baseStyle: defineStyle({
    bg: "ui.black",
    color: "ui.white",
    fontSize: "desktop.breadcrumbs.default",
    fontWeight: "breadcrumbs.default",
    paddingBottom: "xs",
    paddingTop: "xs",
    _dark: {
      bg: "dark.ui.bg.hover",
      color: "dark.ui.typography.heading",
    },
    ol: {
      alignItems: { base: "center", md: "unset" },
      display: { base: "flex", md: "block" },
      margin: "auto",
      maxWidth: "1280px",
      paddingStart: "s",
      paddingEnd: "s",
    },
    a: {
      _visited: { color: "unset" },
      _hover: {
        color: "ui.gray.light-cool",
        textDecoration: "none",
      },
      _focus: customFocusColor("ui.white", "dark.ui.typography.heading"),
    },
    "li:last-child": {
      fontWeight: { base: "breadcrumbs.default", md: "breadcrumbs.lastChild" },
      ".chakra-breadcrumb__link": {
        _hover: {
          // Override the default hover color.
          color: "ui.white",
          cursor: "default",
          textDecoration: "none",
        },
        _dark: {
          _hover: {
            color: "dark.ui.typography.heading",
          },
        },
      },
      ".icon": {
        display: "none",
      },
    },
    "li:not(:last-child)": {
      display: { base: "none", md: "inline-block" },
      a: {
        marginEnd: { base: "xs", md: "0" },
      },
      ".icon": {
        display: { base: "inline", md: "none" },
      },
      "span:not(.breadcrumb-label)": {
        marginInlineEnd: "xxs",
        marginInlineStart: "xxs",
      },
    },
    "li:nth-last-of-type(2)": {
      display: "inline-block",
      span: {
        display: { base: "none", md: "inline" },
      },
    },
  }),
  // Available variants:
  variants: {
    blogs,
    booksAndMore,
    brand,
    connect,
    digitalCollections,
    education,
    locations,
    research,
    whatsOn,
  },
});

export default Breadcrumb;
