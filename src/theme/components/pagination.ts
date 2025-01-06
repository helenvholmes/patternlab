import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "link",
    "previousNextElement",
    "disabledElement",
  ]);

const Pagination = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    alignItems: "stretch",
    display: "flex",
    maxWidth: { base: "480px", md: "unset" },
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
      marginBottom: "0",
      gap: "10px",
      justifyItems: "center",
    },
    previousNextElement: {
      alignItems: "center",
      color: "ui.link.primary",
      _hover: {
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
        color: "ui.disabled.secondary",
        svg: { fill: "ui.disabled.secondary" },
      },
    },
  }),
});

export default Pagination;
