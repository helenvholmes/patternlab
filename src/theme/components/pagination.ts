import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "link",
    "previousNextElement",
    "disabledElement",
  ]);

const Pagination = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    display: "flex",
    minWidth: { base: "320px", md: "unset" },
    width: "100%",
    link: {
      lineHeight: "1.15",
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
      _visited: {
        color: "ui.link.primary",
      },
      _dark: {
        _visited: {
          color: "dark.ui.link.primary",
        },
      },
    },
    ul: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "0",
      justifyItems: "center",
    },
    previousNextElement: {
      alignItems: "center",
      color: "ui.link.primary",
      _hover: {
        textDecoration: "none",
        svg: { fill: "ui.link.secondary" },
        color: "ui.link.secondary",
      },
      _visited: {
        color: "ui.link.primary",
        svg: {
          fill: "ui.link.primary",
        },
      },
      svg: {
        fill: "ui.link.primary",
      },
      _dark: {
        color: "dark.ui.link.primary",
        svg: { fill: "dark.ui.link.primary" },
        _visited: {
          color: "dark.ui.link.primary",
          svg: { fill: "dark.ui.link.primary" },
        },
      },
    },
    disabledElement: {
      color: "ui.disabled.primary",
      pointerEvents: "none",
      svg: { fill: "ui.disabled.primary" },
      _dark: {
        color: "dark.ui.disabled.secondary",
        svg: { fill: "dark.ui.disabled.secondary" },
      },
    },
  }),
});

export default Pagination;
