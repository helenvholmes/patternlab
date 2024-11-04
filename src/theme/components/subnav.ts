import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "action", "body", "heading"]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
  isOutlined: boolean;
}

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
        button: {
          color: "ui.typography.body",
          padding: "4px 16px",
          gap: "4px",
          margin: 0,
          transition: "background-color 0.2s, color 0.2s",
          width: "auto",
          lineHeight: "normal",
          boxSizing: "border-box",
          _hover: {
            padding: "4px 16px",
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.typography.body",
            backgroundColor: backgroundColor !== undefined? backgroundColor : "ui.link.primary-05",
            svg: {
              fill: highlightColor !== undefined ? `${highlightColor}` : "ui.black",
              _dark: {
                fill: backgroundColor !== undefined ? `${backgroundColor}` : "ui.white",
              },
            },
          },
          _active: {
            padding: "4px 16px",
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary",
            backgroundColor: backgroundColor !== undefined? `${backgroundColor}` : "ui.link.primary-05",
            bold: "bold",
            display: "inline-block",
            svg: {
              fill: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
              _dark: {
                fill: backgroundColor !== undefined ? `${backgroundColor}` : "ui.link.primary-05 !important",
              },
            },
          },
        },
        a: {
          textDecoration: "none",
          color: "ui.typography.body",
          padding: "3px 14px",
          gap: "4px",
          _hover: {
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.typography.body",
            background: backgroundColor !== undefined ? `${backgroundColor}` : "ui.link.primary-05",
            textDecoration: "none",
            svg: {
              fill: highlightColor !== undefined ? `${highlightColor}` : "ui.black",
              _dark: {
                fill: backgroundColor !== undefined ? `${backgroundColor}` : "ui.white",
              },
            },
          },
          _active: {
            padding: "3px 14px",
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary",
            background: backgroundColor !== undefined ? `${backgroundColor}` : "ui.link.primary-05",
            bold: "bold",
            display: "inline-block",
            textDecoration: "none",
            svg: {
              transition: "all 0.1s ease",
              transform: "scale(0.95)",
              fill: highlightColor !== undefined ? `${highlightColor} !important` : "ui.link.primary !important",
              _dark: {
                fill: backgroundColor !== undefined ? `${backgroundColor} !important` : "ui.link.primary-05 !important"
              },
            },
          },
        },
        secondaryIcons: {
          color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
          svg: {
            transition: "all 0.1s ease",
            transform: "scale(0.95)",
            fill: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
            _dark: {
              fill: backgroundColor !== undefined ? `${backgroundColor}` : "ui.link.primary-05 !important",
            },
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
        secondaryActions: {
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          position: "relative",
          button: {
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
          },
          a: {
            color: highlightColor !== undefined ? `${highlightColor}` : "ui.link.primary !important",
          },
        }
      }
    }
  ),
});
export default SubNav;