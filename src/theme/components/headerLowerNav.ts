import { headerFocus, headerRed, headerRedDarkMode } from "./header";

const linkFocusHoverStyles = {
  borderBottom: "3px solid",
  color: headerRed,
  paddingBottom: "2px",
  textDecoration: "none",
  _dark: {
    color: headerRedDarkMode,
  },
};

const HeaderLowerNav = {
  baseStyle: {
    ul: {
      alignItems: "center !important",
      marginBottom: "0 !important",
      marginLeft: "auto !important",
      whiteSpace: "nowrap !important",
      li: {
        marginEnd: { mh: "s !important", xl: "m !important" },
        _last: {
          marginRight: "0 !important",
        },
      },
    },
    "li > a": {
      color: "ui.black",
      fontSize: {
        base: "var(--nypl-fontSizes-desktop-subtitle-subtitle2) !important",
        lh: "desktop.subtitle.subtTitle1",
      },
      fontWeight: "medium",
      textDecoration: "none",
      _hover: linkFocusHoverStyles,
      _focus: {
        ...headerFocus,
        ...linkFocusHoverStyles,
      },
      _dark: {
        color: "dark.ui.typography.heading",
        _hover: linkFocusHoverStyles,
        _focus: {
          ...headerFocus,
          ...linkFocusHoverStyles,
        },
      },
    },
  },
};

export default HeaderLowerNav;
