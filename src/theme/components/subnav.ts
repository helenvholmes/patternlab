import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "base",
    "selectedItem",
    "borderLine",
    "outLine",
    "secondaryActions",
    "primaryActions",
  ]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
  isOutlined: boolean;
}
const commonStyles = () => ({
  alignItems: "center",
  display: "inline-flex",
  fontWeight: "regular",
  gap: "xs",
  height: { base: "44px", md: "unset" },
  lineHeight: "1.5 !important",
  px: "s",
  py: "xxs",
  marginY: "4px",
  textDecoration: "none !important",
  transition: "background-color 0.2s, color 0.2s !important",
});

const SubNav = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({ backgroundColor, highlightColor, isOutlined }: SubNavStyleProps) => {
      const defaultLabelColor = "ui.typography.body";
      const highlightOrLinkColor = highlightColor
        ? `${highlightColor} !important`
        : "ui.link.primary !important";
      const highlightOrBorderColor = highlightColor
        ? `${highlightColor} !important`
        : "ui.border.default !important";
      const finalBackgroundColor = backgroundColor
        ? backgroundColor
        : "ui.link.primary-05";
      const primaryActionsStyles = {
        ...commonStyles(),
        marginRight: "xs",
        svg: {
          fill: defaultLabelColor,
          margin: { base: "0", md: null },
          _dark: {
            fill: "ui.white !important",
          },
        },
        _hover: {
          backgroundColor: finalBackgroundColor,
          color: defaultLabelColor,
          svg: {
            fill: defaultLabelColor,
            _dark: {
              fill:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.white !important",
            },
          },
        },
      };
      const secondaryActionsStyles = {
        ...commonStyles(),
        color: highlightOrLinkColor,
        marginLeft: "xs",
        svg: {
          fill: highlightOrLinkColor,
          margin: { base: "0", md: null },
          _dark: {
            fill: backgroundColor
              ? `${backgroundColor} !important`
              : "ui.link.primary-05 !important",
          },
        },
        _hover: {
          background: finalBackgroundColor,
          svg: {
            fill: highlightOrLinkColor,
            _dark: {
              fill: backgroundColor
                ? `${backgroundColor} !important`
                : "ui.link.primary-05 !important",
            },
          },
        },
      };
      return {
        base: {
          borderBottom: "1px solid",
          borderColor: highlightOrBorderColor,
          px: "s",
          py: { base: "s", md: "xs" },
        },
        selectedItem: {
          color: highlightOrLinkColor,
          fontWeight: "bold !important",
          backgroundColor: finalBackgroundColor,
        },
        borderLine: {
          borderTop: "1px solid",
          width: "100%",
          marginTop: "3px",
          color:
            highlightColor !== undefined
              ? `${highlightColor}`
              : "ui.border.default",
        },
        outLine: {
          border: isOutlined !== undefined ? "1px solid" : "none",
          borderRadius: "6px",
          marginRight: "4px",
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
          }
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
export default SubNav;
