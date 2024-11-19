import { headerYellow } from "./header";

const SitewideAlerts = {
  baseStyle: {
    backgroundColor: headerYellow,
    borderBottom: { base: "1px solid", mh: "none" },
    fontSize: "text.default",
    fontWeight: "regular",
    lineHeight: "1.1rem",
    minHeight: { base: "85px", mh: "65px" },
    paddingX: "s",
    ul: {
      marginBottom: "0",
      // Target any anchor and paragraph HTML passed in from
      // the API response in `alert.description`.
      a: {
        textDecoration: "underline",
      },
      p: {
        marginBottom: "0",
        marginTop: "0",
      },
      _dark: {
        color: "dark.ui.typography.heading",
        a: {
          color: "dark.ui.typography.heading",
          _hover: {
            color: "dark.ui.typography.heading",
          },
        },
      },
    },
    _dark: {
      backgroundColor: "dark.ui.bg.active",
      borderBottom: "1px solid",
      borderColor: "dark.ui.status.primary",
      color: "dark.ui.typography.heading",
    },
  },
};

export default SitewideAlerts;
