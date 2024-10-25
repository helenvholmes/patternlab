import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["select"]);

const SearchBar = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    display: "flex",
    marginBottom: {
      base: "xs",
      md: "auto",
    },
    ".textInput": {
      flexGrow: 1,
      "div > input": {
        borderRightRadius: 0,
      },
    },
    flexFlow: { base: "column nowrap", md: "row" },
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
    select: {
      paddingBottom: { base: "xs", md: "unset" },
      flexShrink: "0",
      marginBottom: { base: "-1px", md: "0" },
      maxWidth: { base: undefined, md: "255px" },
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
