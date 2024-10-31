import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "action", "body", "heading"]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
}

interface SubNavActionsStyleProps extends SubNavStyleProps {
  isOutlined: boolean;
}

const SubNav = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({
      backgroundColor,
      highlightColor,
    }: SubNavStyleProps) => {
      
      return {
        base: {
          fontSize: "16px",
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
        secondaryActions: {
          display: "flex",
          whiteSpace: "nowrap",
          position: "relative",
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
          width: "50px", // Adjust width as needed for the fade
          background: "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
          pointerEvents: "none", // Allow clicks to pass through
          zIndex: 1,
        },
        buttonStyles:  {
          display: "flex",             // Use flexbox for alignment
          alignItems: "center",        // Center items vertically
          justifyContent: "center",    // Center items horizontally
          padding: "10px 15px",       // Consistent padding
          fontSize: "14px",           // Uniform font size
          lineHeight: "1",             // Ensure line height is set to avoid vertical shifting
          height: "40px",              // Fixed height for all buttons
          border: "1px solid transparent", // Border style
          borderRadius: "6px",        // Rounded corners
          cursor: "pointer",           // Change cursor on hover
          transition: "background 0.3s", // Smooth background transition
        }
        
      }
    }
  ),
});
export default SubNav;