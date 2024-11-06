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
  padding: "var(--nypl-space-xxs) var(--nypl-space-s) !important",
  gap: "var(--nypl-space-xxs) !important",
  marginY: "var(--nypl-space-xxs) !important",
  transition: "background-color 0.2s, color 0.2s !important",
  lineHeight: "normal !important",
  textDecoration: "none !important",
});

const SubNav = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({ backgroundColor, highlightColor, isOutlined }: SubNavStyleProps) => {
      // const highlightOrDefaultColor = highlightColor
      //   ? `${highlightColor} !important`
      //   : "ui.typography.body !important";
      const defaultLabelColor = "ui.typography.body";
      const highlightOrLinkColor = highlightColor
        ? `${highlightColor} !important`
        : "ui.link.primary !important";
      const finalBackgroundColor = backgroundColor
        ? backgroundColor
        : "ui.link.primary-05";
      const primaryActionsStyles = {
        ...commonStyles(),
        color: defaultLabelColor,
        svg: {
          fill: defaultLabelColor,
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
        svg: {
          fill: highlightOrLinkColor,
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
        base: {},
        selectedItem: {
          color: highlightOrLinkColor,
          fontWeight: "bold",
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
        secondaryActions: {
          whiteSpace: "nowrap",
          // position: "relative",
          button: secondaryActionsStyles,
          a: secondaryActionsStyles,
        },
        primaryActions: {
          button: primaryActionsStyles,
          a: primaryActionsStyles,
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
      };
    }
  ),
});
export default SubNav;
