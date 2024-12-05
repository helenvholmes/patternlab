import { headerBlack, headerFocus, headerRedDonate } from "./header";

const mobileLinkFocus = {
  ...headerFocus,
  outlineColor: "var(--nypl-colors-ui-white) !important",
};

const HeaderMobileNav = {
  parts: ["bottomLinks", "sideNav"],
  baseStyle: () => ({
    backgroundColor: headerBlack,
    color: "ui.white",
    left: "0px",
    minHeight: "540px",
    position: "absolute",
    whiteSpace: "initial",
    width: "100%",
    zIndex: "99999",
    logo: {
      marginTop: "25px",
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
        fontWeight: "medium",
        textDecoration: "none",
        _hover: {
          color: "ui.white",
          textDecoration: "none",
        },
        _focus: mobileLinkFocus,
        _visited: {
          color: "ui.white",
        },
      },
    },
    bottomLinks: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      a: {
        alignItems: "center",
        color: "ui.white",
        display: "flex",
        fontWeight: "medium",
        justifyContent: "center",
        textDecoration: "none",
        paddingY: "27px",
        paddingLeft: "15px",
        svg: {
          marginRight: "xs",
        },
        _hover: {
          color: "ui.white",
          backgroundColor: "ui.black",
          textDecoration: "none",
        },
        _focus: mobileLinkFocus,
        _visited: {
          color: "ui.white",
        },
        _last: {
          backgroundColor: headerRedDonate,
          _hover: {
            backgroundColor: headerRedDonate,
          },
          _dark: {
            bgColor: "brand.secondary",
            color: "ui.white",
            _hover: {
              bgColor: "brand.primary",
            },
          },
        },
      },
    },
  }),
};

export default HeaderMobileNav;
