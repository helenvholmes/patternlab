import { headerBlack, headerDarkBlue, headerFocus } from "./header";

const HeaderLoginButton = {
  baseStyle: ({ isOpen }) => ({
    alignItems: { base: "center" },
    bg: {
      base: isOpen ? headerBlack : "ui.white",
      mh: isOpen ? headerDarkBlue : "ui.white",
    },
    borderRadius: "none",
    color: isOpen ? "ui.white" : "ui.black",
    display: "flex",
    fontFamily: "body",
    fontSize: "desktop.body.body2",
    fontWeight: "medium",
    justifyContent: "center",
    minHeight: { mh: "auto" },
    paddingY: { mh: "10px" },
    svg: {
      fill: isOpen ? "ui.white" : null,
      marginLeft: { base: "0px", mh: "5px" },
      marginTop: { base: "0" },
    },
    textDecoration: "none",
    textTransform: "inherit",
    _hover: {
      backgroundColor: {
        base: isOpen ? headerBlack : "transparent",
        mh: isOpen ? headerDarkBlue : "transparent",
      },
      color: isOpen ? "ui.white" : "initial",
      svg: {
        fill: isOpen ? "ui.white" : "ui.black",
      },
      textDecoration: "none",
    },
    _focus: headerFocus,
    _dark: {
      bg: {
        base: isOpen ? headerBlack : "transparent",
        mh: isOpen ? headerDarkBlue : "transparent",
      },
      color: "dark.ui.typography.heading",
      svg: {
        fill: isOpen ? "dark.ui.typography.heading" : null,
      },
      _hover: {
        svg: {
          fill: "dark.ui.typography.heading",
        },
      },
    },
  }),
};

export default HeaderLoginButton;
