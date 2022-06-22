import { headerFocus, headerRedDonate } from "./header";

const mobileLinkFocus = {
  ...headerFocus,
  outlineColor: "var(--nypl-colors-ui-white) !important",
};

const HeaderMobileNav = {
  parts: ["bottomLinks", "sideNav"],
  baseStyle: () => ({
    backgroundColor: "ui.black",
    color: "ui.white",
    left: "0px",
    minHeight: "540px",
    position: "absolute",
    whiteSpace: "initial",
    width: "100%",
    zIndex: "99999",
    logo: {
      marginTop: "15px",
      marginLeft: "15px",
    },
    sideNav: {
      lineHeight: "1.7",
      marginBottom: "0",
      padding: "15px",
      textAlign: "right",
      "li:not(:first-child)": {
        marginTop: "10px",
      },
      a: {
        color: "ui.white",
        fontSize: "18px",
        textDecoration: "none",
        _hover: {
          color: "ui.white",
          textDecoration: "none",
        },
        _focus: mobileLinkFocus,
      },
    },
    bottomLinks: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      a: {
        color: "white",
        display: "block",
        textDecoration: "none",
        textAlign: "center",
        padding: "27px",
        _hover: {
          color: "ui.white",
          backgroundColor: "ui.black",
          textDecoration: "none",
        },
        _focus: mobileLinkFocus,
        _last: {
          backgroundColor: headerRedDonate,
          _hover: {
            backgroundColor: headerRedDonate,
          },
        },
      },
    },
  }),
};

export default HeaderMobileNav;
