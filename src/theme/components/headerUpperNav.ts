import { headerFocus } from "./header";

const HeaderUpperNav = {
  parts: ["donateLink"],
  baseStyle: {
    height: "37px",
    ul: {
      alignItems: "center",
      display: "flex",
      margin: "0",
      whiteSpace: "nowrap",
    },
    li: {
      fontSize: "var(--nypl-fontSizes-desktop-body-body2) !important",
      fontWeight: "medium",
      marginRight: "s",
      _last: {
        marginRight: "0",
      },
    },
    a: {
      color: "ui.black",
      position: "relative",
      textDecoration: "none",
      _hover: {
        color: "ui.black",
        textDecoration: "none",
      },
      _focus: headerFocus,
      _dark: {
        color: "dark.ui.typography.heading",
        _hover: {
          color: "dark.ui.typography.heading",
        },
      },
    },
    svg: {
      _dark: {
        fill: "white",
      },
    },
    donateLink: {
      color: "var(--nypl-colors-ui-white) !important",
      _hover: {
        color: "var(--nypl-colors-ui-white) !important",
      },
      _dark: {
        bgColor: "brand.secondary",
        _hover: {
          bgColor: "brand.primary",
        },
      },
    },
  },
};

export default HeaderUpperNav;
