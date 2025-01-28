import breakpoints from "../foundations/breakpoints";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["button", "select"]);

const SearchBar = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    display: "flex",
    "@container (min-width: 0px)": {
      "&": { marginBottom: "xs", flexFlow: "column nowrap" },
      " > select": { marginBottom: "-1px" },
      "[data-button]": {
        borderRightRadius: "none",
        maxWidth: "unset",
      },
    },
    [`@container (min-width: ${breakpoints.md})`]: {
      "&": { marginBottom: "auto", flexFlow: "row nowrap" },
      " > select": {
        marginBottom: "0",
        maxWidth: "255px",
        marginRight: "-1px",
      },
      "[data-button]": {
        borderRightRadius: "sm",
        maxWidth: "80px",
      },
    },
    ".textInput": {
      flexGrow: 1,
      "div > input": {
        borderRightRadius: 0,
      },
    },
    ".searchButton": {
      minWidth: "44px",
      borderLeftRadius: "none",
      lineHeight: "1.70",
      marginBottom: "auto",
      paddingTop: { base: "xs", md: "xs" },
      paddingLeft: { base: "xs", md: "s" },
      paddingBottom: { base: "xs", md: "xs" },
      paddingRight: { base: "xs", md: "s" },
      gap: "xxs",
      borderRightRadius: "sm",
      " > span": {
        display: { base: "none", md: "block" },
      },
      " > svg": {
        margin: 0,
      },
    },
    button: {
      borderLeftRadius: "none",
      lineHeight: "1.70",
      marginBottom: "auto",
    },
    select: {
      paddingBottom: { base: "xs", md: "unset" },
      flexShrink: "0",
      textOverflow: "ellipsis",
      _hover: {
        zIndex: "10",
        "+ .chakra-select__icon-wrapper": {
          zIndex: "9999",
        },
      },
    },
  }),
});

export default SearchBar;
