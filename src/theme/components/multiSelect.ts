import { defaultElementSizes } from "./global";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// This function creates a set of function that helps us
// create multipart component styles.
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "base",
    "accordionStyles",
    "buttonTextLabel",
    "menuChildren",
    "menuSearchInputBox",
    "viewAllButton",
  ]);

export const multiSelectWidths = {
  fitContent: {
    width: {
      base: "100%",
      md: "fit-content",
    },
    minWidth: {
      md: "175px",
    },
    maxWidth: {
      md: "360px",
    },
  },
  full: {
    width: "100%",
  },
};

const MultiSelect = defineMultiStyleConfig({
  baseStyle: definePartsStyle(({ isBlockElement, width = "full" }) => ({
    base: {
      position: "relative",
    },
    menuChildren: {
      paddingLeft: "m",
      marginBottom: 0,
    },
    viewAllButton: {
      color: "ui.link.primary",
      marginLeft: "-4px",
      px: "xs",
      py: "xxs",
      _hover: {
        bg: "ui.link.primary-05",
      },
      _dark: {
        color: "dark.ui.link.primary",
        _hover: {
          bg: "dark.ui.link.primary-10",
        },
      },
    },
    buttonTextLabel: {
      marginBottom: 0,
      ...(width === "fitContent" && {
        textOverflow: "ellipsis",
        overflow: "hidden",
      }),
      marginLeft: "56px",
    },
    menuSearchInputBox: {
      button: {
        height: "100%",
        minWidth: "auto",
        right: "0",
        top: "0",
        width: { base: defaultElementSizes.mobileFieldHeight, md: "34px" },
      },
      input: {
        backgroundColor: "ui.bg.default",
        border: "none",
        fontSize: "desktop.caption",
        height: "auto",
        lineHeight: "inherit",
        minHeight: { base: defaultElementSizes.mobileFieldHeight, md: "auto" },
      },
    },
    accordionStyles: {
      ".chakra-accordion__item": {
        _dark: {
          bgColor: "transparent",
        },
      },
      ".chakra-accordion__button": {
        backgroundColor: "ui.white",
        fontWeight: "default",
        minWidth: width === "full" ? "100%" : "175px",
        position: "relative",
        width: width === "full" ? "100%" : { base: "100%", md: "fit-content" },
        overflow: "hidden",
        zIndex: 10000,
        div: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        span: {
          overflow: "hidden",
        },
        _hover: {
          backgroundColor: "ui.white",
        },
        _dark: {
          backgroundColor: "dark.ui.bg.default",
          borderStartColor: "dark.ui.border.default",
          borderStartWidth: "1px",
          _hover: {
            borderStartColor: "ui.gray.dark",
          },
        },
        _expanded: {
          bgColor: "ui.link.primary-05",
          _dark: {
            bgColor: "dark.ui.link.primary-10",
          },
        },
      },
      ".chakra-collapse": {
        bgColor: "ui.bg.page",
        overflow: "unset !important",
        borderTopWidth: "1px",
        marginTop: "-1px",
        position: isBlockElement ? null : "absolute",
        zIndex: 10001,
        ...multiSelectWidths[width],
      },
      ".chakra-accordion__panel": {
        bgColor: "ui.white",
        _dark: {
          bgColor: "dark.ui.bg.page",
        },
      },
    },
  })),
});

export default MultiSelect;
