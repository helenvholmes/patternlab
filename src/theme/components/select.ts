import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

import {
  defaultElementSizes,
  labelLegendTextSpecialSpacing,
  selectTextInputDisabledStyles,
  selectTextInputFocusStyles,
} from "./global";

// This function creates a set of function that helps us
// create multipart component styles.
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["helperText", "inline", "select"]);

interface SelectBaseStyle extends StyleFunctionProps {
  labelPosition: string;
}

const select = (labelPosition: string) => ({
  backgroundColor: "ui.white",
  borderRadius: "sm",
  borderColor: "ui.border.default",
  fontSize: "desktop.body.body2",
  minHeight: { base: defaultElementSizes.mobileFieldHeight, md: "auto" },
  paddingTop: "inset.narrow",
  paddingEnd: "2.5rem",
  paddingBottom: "inset.narrow",
  paddingStart: "inset.default",
  flex: labelPosition === "inline" ? { md: "1" } : null,
  _hover: {
    borderColor: "ui.border.hover",
  },
  _active: selectTextInputFocusStyles,
  _disabled: {
    ...selectTextInputDisabledStyles,
  },
  _focus: {
    ...selectTextInputFocusStyles,
    // When the select is focused, the icon should be on top of the dropdown.
    // This should only be done when focused, otherswise the icon will render
    // above any other elements on the page.
    "+ .chakra-select__icon-wrapper": {
      zIndex: "9999",
    },
  },
  _invalid: {
    border: "1px solid",
    borderColor: "ui.error.primary",
    boxShadow: "none",
    color: "ui.error.primary",
  },
  _dark: {
    backgroundColor: "dark.ui.bg.default",
    borderColor: "dark.ui.border.default",
    color: "dark.ui.typography.body",
    _hover: {
      borderColor: "dark.ui.border.hover",
    },
    _invalid: {
      borderColor: "dark.ui.error.primary",
      color: "dark.ui.error.primary",
    },
  },
});

const Select = defineMultiStyleConfig({
  baseStyle: definePartsStyle(({ labelPosition }: SelectBaseStyle) => {
    return {
      inline: {
        display: { md: "flex" },
        gap: { md: "xs" },
        alignItems: { md: "flex-end" },
      },
      label: labelLegendTextSpecialSpacing,
      select: select(labelPosition),
    };
  }),
  variants: {
    searchbar: definePartsStyle({
      select: {
        flex: "1 1 20%",
        borderRightColor: { md: "transparent" },
        borderRightRadius: { md: "none" },
      },
    }),
  },
  defaultProps: {
    size: "md",
  },
});

export default Select;
