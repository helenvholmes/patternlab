import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { screenreaderOnly } from "./globalMixins";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "closeButton",
    "drawerBody",
    "drawerContent",
    "drawerHeader",
    "openButton",
  ]);

const FeedbackBox = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    closeButton: {
      /** This is overriding the default min-height value in order to keep the
       * button spacing symmetrical. */
      minHeight: "40px",
      minWidth: "40px",
      right: "xs",
      p: "0",
      position: "absolute",
      span: screenreaderOnly(),
      top: "xs",
      _dark: {
        svg: {
          fill: "dark.ui.typography.heading",
        },
      },
    },
    drawerBody: {
      borderLeft: { base: undefined, md: "1px solid" },
      borderColor: { base: undefined, md: "ui.border.default" },
      paddingTop: "m",
      paddingBottom: "m",
      _dark: {
        background: "dark.ui.bg.page",
        borderColor: { base: undefined, md: "dark.ui.border.default" },
      },
    },
    drawerContent: {
      marginStart: "auto",
      width: { base: "100%", md: "375px" },
      aside: {
        color: "ui.typography.heading",
        _dark: { color: "dark.ui.typography.heading" },
      },
    },
    drawerHeader: {
      alignItems: "baseline",
      background: "ui.bg.hover",
      borderBottomWidth: "1px",
      borderLeftWidth: { base: undefined, md: "1px" },
      borderTopWidth: "1px",
      color: "ui.typography.heading",
      display: "flex",
      fontSize: "desktop.body.body1",
      px: "m",
      paddingTop: "s",
      paddingBottom: "s",
      p: {
        marginBottom: "0",
      },
      _dark: {
        background: "dark.ui.bg.hover",
        borderColor: "dark.ui.border.default",
        color: "dark.ui.typography.heading",
      },
    },
    openButton: {
      position: "fixed",
      borderRadius: "0",
      bottom: "0",
      right: "0",
      zIndex: "10000",
      _focus: {
        boxShadow: "0 0 0 6px var(--nypl-colors-ui-white) !important",
        zIndex: "10000 !important",
      },
    },
  }),
});

export default FeedbackBox;
