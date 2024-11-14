import { headerBlack, headerBlue, headerFocusColor, headerRed } from "./header";

const loginFocus = () => ({
  boxShadow: { base: null, mh: `1px 1px 2px 2px ${headerFocusColor}` },
  outline: { base: "inset", mh: "none" },
  outlineStyle: { base: "solid", mh: null },
  outlineWidth: { base: "0.1875em", mh: null },
});

const HeaderLogin = {
  parts: ["logoutButton", "patronGreeting"],
  baseStyle: ({ patronName }) => ({
    bg: { base: headerBlack, mh: headerBlue },
    boxShadow: { base: "2px 2px 3px 4px rgb(100 100 100 / 25%)", mh: "none" },
    display: { base: "block", mh: "flex" },
    flexDirection: "column",
    left: { base: "0", mh: null },
    marginTop: { mh: "1px" },
    minHeight: { base: "215px", mh: "175px" },
    minWidth: { base: "100%", mh: "360px" },
    position: "absolute",
    padding: { base: "0", mh: "10px 20px" },
    zIndex: "9999",
    ul: {
      display: { base: "grid", mh: "block" },
      marginBottom: "0",
      marginTop: {
        base: !patronName ? "60px" : "0",
        mh: "0px",
      },
      width: "100%",
      li: {
        _first: {
          gridColumn: { base: "1 / span 1", mh: null },
        },
        _last: {
          gridColumn: { base: "2 / span 1", mh: null },
        },
      },
    },
    li: {
      _first: {
        marginEnd: { base: "5px", mh: "0" },
        marginTop: { base: "xxs", mh: "s" },
        marginBottom: { mh: "s" },
      },
    },
    "li a": {
      alignItems: "center",
      border: { base: "none", mh: "2px" },
      borderColor: "ui.white",
      borderRadius: { base: "0", mh: "28px" },
      bg: { base: headerRed, mh: "inherit" },
      color: "ui.white",
      display: "flex",
      fontSize: "14px",
      fontWeight: "medium",
      justifyContent: { mh: "center" },
      lineHeight: { base: "normal", mh: "1.5" },
      marginTop: { base: "0" },
      minHeight: { base: "105px", mh: "45px" },
      padding: { base: "10px", mh: "10px 20px" },
      textTransform: "uppercase",
      whiteSpace: "normal",
      width: "100%",
      svg: {
        marginRight: { base: "10px", mh: null },
      },
      span: {
        width: { base: "100px", mh: "auto" },
      },
      _hover: {
        bg: { base: headerRed, mh: "transparent" },
        color: "ui.white",
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", mh: "28px" },
      },
      _dark: {
        bgColor: { base: "brand.secondary", mh: "dark.ui.link.primary" },
        color: { base: "ui.white", mh: "ui.gray.xx-dark" },
        svg: {
          fill: { base: "ui.white", mh: "ui.gray.xx-dark" },
        },
        _hover: {
          bgColor: { base: "brand.primary", mh: "dark.ui.link.secondary" },
          color: { base: "ui.white", mh: "ui.gray.xx-dark" },
        },
      },
      _visited: {
        color: "ui.white",
      },
    },
    patronGreeting: {
      alignSelf: "flex-start",
      color: "ui.white",
      fontSize: { base: "16px", mh: "14px" },
      fontWeight: "medium",
      lineHeight: "1.5em",
      margin: { base: "10px", mh: "0 0 10px" },
      minHeight: { base: "100px", mh: "55px" },
      textAlign: "left",
      textTransform: "none",
      width: { mh: "100%" },
      _focus: loginFocus(),
      ".greeting": {
        fontStyle: "italic",
        margin: { base: "10px 0 25px 0", mh: "0 0 5px" },
      },
      ".name": {
        margin: 0,
      },
    },
    logoutButton: {
      alignSelf: "flex-start",
      bg: { base: "ui.black", mh: "ui.white" },
      borderRadius: { base: "0", mh: "28px" },
      color: { base: "ui.white", mh: `${headerBlue} !important` },
      fontSize: { base: "18px", mh: "14px" },
      marginTop: { base: "5px", mh: "25px" },
      marginBottom: { base: "0", mh: "10px" },
      padding: { base: "30px", mh: null },
      textDecoration: { base: "underline", mh: null },
      textTransform: "uppercase",
      width: { base: "100%", mh: "140px" },
      svg: {
        fill: headerBlue,
      },
      _hover: {
        bg: { base: "ui.black", mh: "ui.white" },
        color: { base: "ui.white", mh: headerBlue },
        textDecoration: { base: "underline", mh: null },
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", mh: "28px !important" },
      },
      _dark: {
        color: "ui.gray.xx-dark",
        svg: {
          fill: "ui.gray.xx-dark",
        },
        _hover: {
          color: "ui.gray.xx-dark",
        },
      },
    },
  }),
};

export default HeaderLogin;
