import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "action", "body", "heading"]);

interface SubNavStyleProps extends StyleFunctionProps {
  backgroundColor: string;
  highlightColor: string;
  isOutlined: boolean;
}
const commonStyles = () => ({
  padding: "4px 16px !important",
  gap: "4px !important",
  marginY: "4px !important",
  width: "140px !important",
  minWidth: "140px !important",
  transition: "background-color 0.2s, color 0.2s !important",
  lineHeight: "normal !important",
  boxSizing: "border-box !important",
  display: "inline-block !important",
  textDecoration: "none !important",
});

const SubNav = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({ backgroundColor, highlightColor, isOutlined }: SubNavStyleProps) => {
      return {
        base: {},
        selectedItem: {
          color:
            highlightColor !== undefined
              ? `${highlightColor}`
              : "ui.link.primary !important",
          fontWeight: "700",
          backgroundColor:
            backgroundColor !== undefined
              ? `${backgroundColor}`
              : "ui.link.primary-05",
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
        },
        secondaryActions: {
          display: "flex",
          whiteSpace: "nowrap",
          position: "relative",
          color:
            highlightColor !== undefined
              ? `${highlightColor}`
              : "ui.link.primary",
          button: {
            ...commonStyles(),
            svg: {
              fill:
                highlightColor !== undefined
                  ? `${highlightColor} !important`
                  : "ui.link.primary !important",
              _dark: {
                fill: backgroundColor
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              },
            },
            _hover: {
              background:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill: backgroundColor
                    ? `${backgroundColor} !important`
                    : "ui.link.primary-05 !important",
                },
              },
            },
            _active: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill:
                    backgroundColor !== undefined
                      ? `${backgroundColor} !important`
                      : "ui.link.primary-05 !important",
                },
              },
              fontWeight: "700",
              color:
                highlightColor !== undefined
                  ? `${highlightColor} !important`
                  : "ui.link.primary !important",
              background:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              bold: "bold",
              display: "inline-block",
              textDecoration: "none",
            },
          },
          a: {
            ...commonStyles(),
            color:
              highlightColor !== undefined
                ? `${highlightColor} !important`
                : "ui.link.primary !important",
            textDecoration: "none !important",
            svg: {
              fill:
                highlightColor !== undefined
                  ? `${highlightColor} !important`
                  : "ui.link.primary !important",
              _dark: {
                fill: backgroundColor
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              },
            },
            _hover: {
              background:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill: backgroundColor
                    ? `${backgroundColor} !important`
                    : "ui.link.primary-05 !important",
                },
              },
            },
            _active: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill: backgroundColor
                    ? `${backgroundColor} !important`
                    : "ui.link.primary-05 !important",
                },
              },
              fontWeight: "700",
              color:
                highlightColor !== undefined
                  ? `${highlightColor}`
                  : "ui.link.primary",
              backgroundColor:
                backgroundColor !== undefined
                  ? `${backgroundColor}`
                  : "ui.link.primary-05",
              bold: "bold",
              display: "inline-block",
            },
          },
        },
        primaryActions: {
          button: {
            ...commonStyles(),
            _hover: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.black !important",
                _dark: {
                  fill:
                    backgroundColor !== undefined
                      ? `${backgroundColor} !important`
                      : "ui.white !important",
                },
              },
              color:
                highlightColor !== undefined
                  ? `${highlightColor}`
                  : "ui.typography.body",
              backgroundColor:
                backgroundColor !== undefined
                  ? backgroundColor
                  : "ui.link.primary-05",
            },
            _active: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill: backgroundColor
                    ? `${backgroundColor} !important`
                    : "ui.link.primary-05 !important",
                },
              },
              fontWeight: "700",
              color:
                highlightColor !== undefined
                  ? `${highlightColor}`
                  : "ui.link.primary",
              backgroundColor:
                backgroundColor !== undefined
                  ? `${backgroundColor}`
                  : "ui.link.primary-05",
              bold: "bold",
              display: "inline-block",
            },
          },
          a: {
            ...commonStyles(),
            color: "ui.typography.body !important",
            svg: {
              fill: "ui.black !important",
              _dark: {
                fill: "ui.white !important",
              },
            },
            _hover: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.black !important",
                _dark: {
                  fill:
                    backgroundColor !== undefined
                      ? `${backgroundColor} !important`
                      : "ui.white !important",
                },
              },
              color:
                highlightColor !== undefined
                  ? `${highlightColor} !important`
                  : "ui.typography.body",
              background:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05",
              textDecoration: "none",
            },
            _active: {
              svg: {
                fill:
                  highlightColor !== undefined
                    ? `${highlightColor} !important`
                    : "ui.link.primary !important",
                _dark: {
                  fill:
                    backgroundColor !== undefined
                      ? `${backgroundColor} !important`
                      : "ui.link.primary-05 !important",
                },
              },
              fontWeight: "700",
              color:
                highlightColor !== undefined
                  ? `${highlightColor} !important`
                  : "ui.link.primary !important",
              background:
                backgroundColor !== undefined
                  ? `${backgroundColor} !important`
                  : "ui.link.primary-05 !important",
              bold: "bold",
              display: "inline-block",
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
