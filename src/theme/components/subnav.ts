import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "action", "body", "heading"]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
  isOutlined: boolean;
}

const getSvgStyles = (highlightColor, backgroundColor, isPrimary) => ({
  fill: highlightColor ? `${highlightColor} !important` : (isPrimary ? "ui.black !important" : "ui.link.primary !important"),
  _dark: {
    fill: backgroundColor ? `${backgroundColor} !important` : (isPrimary ? "ui.white !important" : "ui.link.primary-05 !important"),
  },
});

const SubNav = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({
      backgroundColor,
      highlightColor,
      isOutlined,
    }: SubNavStyleProps) => {
      
      return {
        base: {
        },
        selectedItem: {
          color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
          fontWeight: "700",
          backgroundColor: backgroundColor !== undefined? `${backgroundColor}` : "ui.link.primary-05",
        },
        borderLine: {
          borderTop: "1px solid",
          width: "100%",
          marginTop: "3px",
          color: highlightColor !== undefined ? `${highlightColor}` : "ui.border.default",
        },
        outLine: {
          border: isOutlined !== undefined? "1px solid" : "none",
          borderRadius: "6px",
        },
        secondaryActions: {
          display: "flex",
          whiteSpace: "nowrap",
          position: "relative",
          svg: getSvgStyles(highlightColor, backgroundColor, false),
          _hover: {
            svg: getSvgStyles(highlightColor, backgroundColor, false),
          },
          button: {
            color: getSvgStyles(highlightColor, backgroundColor, false).fill,
          },
          a: {
            color: getSvgStyles(highlightColor, backgroundColor, false).fill,
          },
        },
        primaryActions: {
          button: {
            _hover: {
              svg: getSvgStyles(highlightColor, backgroundColor, true),
            },
            _active: {
              svg: getSvgStyles(highlightColor, backgroundColor, true),
            },
          },
          a: {
            _hover: {
              svg: getSvgStyles(highlightColor, backgroundColor, true),
            },
            _active: {
              svg: getSvgStyles(highlightColor, backgroundColor, true),
            },
          },
        },
        button: {
          color: "ui.typography.body",
          padding: "4px 16px",
          gap: "4px",
          marginY: "4px",
          width: "140px",
          minWidth: "140px",
          transition: "background-color 0.2s, color 0.2s",
          lineHeight: "normal",
          boxSizing: "border-box",
          _hover: {
            svg: {
              fill: highlightColor ? `${highlightColor} !important` : "ui.black !important",
              _dark: {
                fill: backgroundColor ? `${backgroundColor} !important` : "ui.white !important",
              },
            },
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.typography.body",
            backgroundColor: backgroundColor !== undefined? backgroundColor : "ui.link.primary-05",
          },
          _active: {
            svg: {
              fill: highlightColor ? `${highlightColor} !important` : "ui.link.primary !important",
              _dark: {
                fill: backgroundColor ? `${backgroundColor} !important` : "ui.link.primary-05 !important",
              },
            },
            fontWeight: "700",
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary",
            backgroundColor: backgroundColor !== undefined? `${backgroundColor}` : "ui.link.primary-05",
            bold: "bold",
            display: "inline-block",
          },
        },
        a: {
          textDecoration: "none",
          color: "ui.typography.body !important",
          padding: "4px 16px",
          gap: "4px",
          marginY: "4px",
          width: "140px",
          minWidth: "140px",
          _hover: {
            color: highlightColor !== undefined ? `${highlightColor} !important` : "ui.typography.body",
            background: backgroundColor !== undefined ? `${backgroundColor} !important` : "ui.link.primary-05",
            textDecoration: "none",
          },
          _active: {
            fontWeight: "700",
            color: highlightColor !== undefined ? `${highlightColor} !important` : "ui.link.primary !important",
            background: backgroundColor !== undefined ? `${backgroundColor} !important` : "ui.link.primary-05 !important",
            bold: "bold",
            display: "inline-block",
            textDecoration: "none",
          },
        },
        scrollableButtons: {
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          position: "relative",
        },
        fadeEffect: {
          position: "absolute",
          right: 0,
          height: "100%",
          width: "50px",
          background: "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
      }
    }
  ),
});
export default SubNav;