import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["link"]);

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
    },
  }),
});

export default Pagination;
