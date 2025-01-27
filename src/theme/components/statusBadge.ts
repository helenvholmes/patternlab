import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";
import { statusBadgeFontSizeArray } from "../../components/StatusBadge/StatusBadge";

const baseStyle = defineStyle(({ labelFontSize }) => {
  const finalFontSize = statusBadgeFontSizeArray.includes(labelFontSize)
    ? `desktop.body.${labelFontSize}`
    : labelFontSize;

  return {
    alignItems: "center",
    bgColor: "ui.bg.default",
    borderLeft: "4px solid",
    borderColor: "ui.gray.semi-dark",
    borderRadius: "base",
    color: "ui.typography.heading",
    display: "flex",
    fontSize: labelFontSize === "caption" ? "desktop.caption" : finalFontSize,
    fontWeight: "500",
    py: "inset.extranarrow",
    paddingInlineEnd: "inset.default",
    paddingInlineStart: ".75rem",
    whiteSpace: "nowrap",
    width: "fit-content",
    _dark: {
      backgroundColor: "dark.ui.bg.default",
      borderColor: "dark.ui.border.default",
      color: "dark.ui.typography.heading",
    },
  };
});

// Level variants
const low = defineStyle({});
const medium = defineStyle({
  borderColor: "ui.status.primary",
  _dark: {
    borderColor: "ui.status.primary",
  },
});
const high = defineStyle({
  borderColor: "ui.error.primary",
  _dark: {
    borderColor: "dark.ui.error.primary",
  },
});
// Type variants
export const neutral = defineStyle({
  borderColor: "ui.gray.dark",
  _dark: {
    borderColor: "dark.ui.gray.semi-dark",
  },
});
export const informative = defineStyle({
  bgColor: "ui.link.primary-10",
  borderColor: "ui.link.primary",
  _dark: {
    bgColor: "dark.ui.link.primary-10",
    borderColor: "dark.ui.link.primary",
  },
});
export const positive = defineStyle({
  bgColor: "ui.success.primary-10",
  borderColor: "ui.success.primary",
  _dark: {
    bgColor: "dark.ui.success.primary-10",
    borderColor: "dark.ui.success.primary",
  },
});
export const negative = defineStyle({
  bgColor: "ui.error.primary-10",
  borderColor: "ui.error.primary",
  _dark: {
    bgColor: "dark.ui.error.primary-10",
    borderColor: "dark.ui.error.primary",
  },
});
export const warning = defineStyle({
  bgColor: "ui.warning.primary-10",
  borderColor: "ui.warning.tertiary",
  _dark: {
    bgColor: "dark.ui.warning.primary-10",
    borderColor: "dark.ui.warning.primary",
  },
});
export const recommendation = defineStyle({
  bgColor: "ui.link.tertiary-10",
  borderColor: "ui.link.tertiary",
  _dark: {
    bgColor: "dark.ui.link.tertiary-10",
    borderColor: "dark.ui.link.tertiary",
  },
});

const StatusBadge = defineStyleConfig({
  baseStyle,
  variants: {
    low,
    medium,
    high,
    neutral,
    informative,
    positive,
    negative,
    warning,
    recommendation,
  },
});

export default StatusBadge;
