import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// This function creates a set of function that helps us
// create multipart component styles.
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "modalBody",
    "modalHeader",
    "modalFooter",
    "modalCloseButton",
  ]);

const FilterBarPopup = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    width: "full",
    modalBody: {
      _dark: {
        background: "dark.ui.bg.page",
      },
    },
    modalHeader: {
      bg: "ui.bg.default",
      borderBottom: "1px solid",
      borderColor: "ui.border.default",
      _dark: {
        background: "dark.ui.bg.default",
        borderBottom: "1px solid",
        borderColor: "dark.ui.border.default",
      },
    },
    modalFooter: {
      bg: "ui.bg.default",
      borderTop: "1px solid",
      borderColor: "ui.border.default",
      _dark: {
        background: "dark.ui.bg.default",
        borderTop: "1px solid",
        borderColor: "dark.ui.border.default",
        color: "dark.ui.typography.heading",
      },
    },
    modalCloseButton: {
      mt: "8px",
    },
  }),
});

export default FilterBarPopup;
