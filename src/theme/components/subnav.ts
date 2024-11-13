import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

// This function creates a set of function that helps us
// create multipart component styles.
const {
  defineMultiStyleConfig: subNavChildrenDefineMultiStyleConfig,
  definePartsStyle: subNavChildrenDefinePartsStyle,
} = createMultiStyleConfigHelpers(["outLine"]);

const {
  defineMultiStyleConfig: subNavDefineMultiStyleConfig,
  definePartsStyle: subNavDefinePartsStyle,
} = createMultiStyleConfigHelpers([
  "base",
  "container",
  "primaryActions",
  "selectedItem",
  "secondaryActions",
]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
}

interface SubNavChildrenStyleProps extends StyleFunctionProps {
  isOutlined: boolean;
}

const commonStyles = () => ({
  alignItems: "center",
  display: "inline-flex",
  fontWeight: "regular",
  fontSize: "desktop.button.large",
  gap: "xs",
  height: { base: "44px", md: "unset" },
  lineHeight: "1.5 !important",
  px: "s",
  py: "xxs",
  textDecoration: "none !important",
  transition: "background-color 0.2s, color 0.2s !important",
});

const SubNav = subNavDefineMultiStyleConfig({
  baseStyle: subNavDefinePartsStyle(
    ({ backgroundColor, highlightColor }: SubNavStyleProps) => {
      const defaultLabelColor = "ui.typography.body";
      const highlightOrDefaultColor = highlightColor
        ? `${highlightColor} !important`
        : `${defaultLabelColor} !important`;
      const highlightOrLinkColor = highlightColor
        ? `${highlightColor} !important`
        : "ui.link.primary !important";
      const highlightOrBorderColor = highlightColor
        ? `${highlightColor}`
        : "ui.border.default";
      const finalBackgroundColor = backgroundColor
        ? backgroundColor
        : "ui.link.primary-05 !important";
      const primaryActionsStyles = {
        ...commonStyles(),
        svg: {
          fill: defaultLabelColor,
          margin: { base: "0", md: null },
          _dark: {
            fill: "ui.white",
          },
        },
        _hover: {
          backgroundColor: finalBackgroundColor,
          color: highlightOrDefaultColor,
          svg: {
            fill: highlightOrDefaultColor,
            _dark: {
              fill:
                backgroundColor !== undefined
                  ? `${backgroundColor} `
                  : "ui.white",
            },
          },
        },
      };
      const secondaryActionsStyles = {
        ...commonStyles(),
        color: highlightOrLinkColor,
        svg: {
          fill: highlightOrLinkColor,
          margin: { base: "0", md: null },
          _dark: {
            fill: backgroundColor
              ? `${backgroundColor} !important`
              : "dark.ui.link.primary-05 !important",
          },
        },
        _hover: {
          background: finalBackgroundColor,
          svg: {
            fill: highlightOrLinkColor,
            _dark: {
              fill: backgroundColor
                ? `${backgroundColor}`
                : "dark.ui.link.primary-05",
            },
          },
        },
      };
      return {
        base: {
          ".selectedItem": {
            color: highlightColor,
            fontWeight: "bold ",
            backgroundColor: finalBackgroundColor,
          },
          borderBottom: "1px solid",
          borderColor: highlightOrBorderColor,
          display: "flex",
          justifyContent: "center",
          py: { base: "s", md: "xs" },
        },
        container: {
          maxWidth: "1280px",
          px: "s",
          width: "100%",
        },
        primaryActions: {
          width: "100%",
          button: {
            color: defaultLabelColor,
            ...primaryActionsStyles,
          },
          a: {
            color: `${defaultLabelColor} !important`,
            ...primaryActionsStyles,
            svg: {
              fill: `${defaultLabelColor} !important`,
              margin: { base: "0", md: null },
              _dark: {
                fill: "ui.white !important",
              },
            },
          },
        },
        secondaryActions: {
          width: "fit-content",
          whiteSpace: "nowrap",
          button: secondaryActionsStyles,
          a: secondaryActionsStyles,
        },
        scrollableButtons: {
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          position: "relative",
          scrollbarWidth: "none",
        },
        listCleanup: {
          gap: "xs",
          li: {
            marginEnd: "unset",
          },
        },
        fadeEffect: {
          position: "absolute",
          right: 0,
          height: "100%",
          width: "50px",
          background:
            "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
        ul: {
          margin: "0 !important",
        },
      };
    }
  ),
});

const SubNavChildren = subNavChildrenDefineMultiStyleConfig({
  baseStyle: subNavChildrenDefinePartsStyle(
    ({ isOutlined }: SubNavChildrenStyleProps) => ({
      outLine: {
        border: isOutlined !== undefined ? "1px solid" : "none",
        borderRadius: "6px",
      },
    })
  ),
});

export { SubNav, SubNavChildren };
