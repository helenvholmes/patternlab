import { headerBlue, headerFocus } from "./header";

const HeaderSearchButton = {
  baseStyle: ({ isOpen }) => ({
    alignItems: "center",
    borderRadius: "0",
    backgroundColor: isOpen ? headerBlue : "transparent",
    color: isOpen ? "ui.white" : "ui.link.primary",
    display: "flex",
    fontFamily: "body",
    fontSize: "inherit !important",
    fontWeight: "medium",
    justifyContent: "center",
    minHeight: { mh: "30px" },
    minWidth: { mh: "80px" },
    textDecoration: "none",
    _dark: {
      bgColor: isOpen ? "section.research.secondary" : "transparent",
      color: isOpen ? "ui.white" : "dark.ui.link.primary",
    },
    span: {
      alignItems: "center",
      borderBottom: { mh: "1px solid var(--nypl-colors-ui-link-primary)" },
      display: "inline-flex",
      _dark: {
        borderBottom: isOpen ? "0" : { mh: "3px solid" },
        borderColor: { mh: "dark.ui.link.primary" },
      },
    },
    svg: {
      marginLeft: { base: "0", mh: "xxs" },
      fill: {
        base: isOpen ? "ui.white" : "ui.black",
        mh: isOpen ? "ui.white" : "ui.link.primary",
      },
      _dark: {
        fill: {
          base: isOpen ? "ui.white" : "dark.ui.typography.heading",
          mh: isOpen ? "ui.white" : "dark.ui.link.primary",
        },
      },
    },
    _hover: {
      backgroundColor: isOpen ? headerBlue : "transparent",
      color: isOpen ? "ui.white" : "ui.link.primary",
      textDecoration: "none",
      svg: {
        fill: {
          base: isOpen ? "ui.white" : "ui.black",
          mh: isOpen ? "ui.white" : "ui.link.primary",
        },
      },
      _dark: {
        color: isOpen ? "ui.white" : "dark.ui.link.primary",
        svg: {
          fill: {
            base: isOpen ? "ui.white" : "dark.ui.typography.heading",
            mh: isOpen ? "ui.white" : "dark.ui.link.primary",
          },
        },
      },
    },
    _focus: headerFocus,
  }),
};

export default HeaderSearchButton;
