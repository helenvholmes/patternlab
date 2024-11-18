export const headerBlack = "#2b2b2b";
export const headerBlue = "#1B7FA7";
export const headerDarkBlue = "#135772";
export const headerFocusColor = "#0F465C";
export const headerLightBlue = "#78CCED";
export const headerLightBlueIcon = "#1DA1D4";
export const headerRed = "#ED1C24";
export const headerRedDarkMode = "dark.ui.error.primary";
export const headerRedDonate = "#E32B31";
export const headerYellow = "#FEE34A";
export const headerYellowDark = "#403B2D";
export const headerFocus = {
  borderRadius: "none",
  outlineColor: `${headerDarkBlue} !important`,
  outlineOffset: "0 !important",
  outlineStyle: "solid !important",
  outlineWidth: "0.25em !important",
};

const Header = {
  parts: ["container", "horizontalRule", "logo", "navContainer"],
  baseStyle: {
    fontFamily: "body",
    fontSize: "text.default",
    fontWeight: "text.default",
    // "& *, & ::before, & ::after": {
    //   borderWidth: "0px",
    //   borderStyle: "solid",
    //   boxSizing: "border-box",
    // },
    "& > nav li": { marginBottom: "0 !important" },
    "& > nav a": {
      lineHeight: "0",
      _focus: {
        boxShadow: "none",
        outline: "2px solid",
        outlineOffset: "2px",
        outlineColor: "ui.focus",
        zIndex: "9999",
        _dark: {
          outlineColor: "dark.ui.focus",
        },
      },
    },
    a: {
      _visited: {
        color: "ui.typography.body",
      },
    },
    button: {
      cursor: "pointer",
    },
    container: {
      paddingX: { base: "8px", mh: "16px" },
      paddingY: { mh: "16px" },
      maxWidth: "1280px",
      minHeight: { mh: "122px" },
      margin: "0 auto",
    },
    navContainer: {
      height: { mh: "80px", lh: "97px" },
      gap: { mh: "s", lh: "35px" },
    },
    horizontalRule: {
      bg: "brand.primary",
      marginTop: "0",
      marginBottom: "0",
      _dark: {
        backgroundColor: "dark.brand.primary",
      },
    },
    logo: {
      lineHeight: "0",
      svg: {
        height: { base: "40px", mh: "74px", lh: "97px" },
      },
      _focus: headerFocus,
    },
  },
};

export default Header;
