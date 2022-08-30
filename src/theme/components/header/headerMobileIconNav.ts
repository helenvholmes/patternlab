import { headerFocus } from "./header";

const HeaderMobileIconNav = {
  baseStyle: {
    button: {
      minHeight: "60px",
      minWidth: "60px",
    },
    "> a": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60px",
      minWidth: "60px",
      _focus: headerFocus,
    },
  },
};

export default HeaderMobileIconNav;
