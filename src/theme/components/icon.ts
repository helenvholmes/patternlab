import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle, StyleFunctionProps } from "@chakra-ui/system";

const svgBase = {
  display: "inline-block",
  fill: "currentColor",
  width: "auto",
  height: "100%",
};
const align = {
  none: {},
  left: { marginEnd: "xxs" },
  right: { marginStart: "xxs" },
};
const iconRotation = {
  rotate180: {
    transform: "rotate(180deg)",
  },
  rotate270: {
    transform: "rotate(270deg)",
  },
  rotate0: {
    transform: "rotate(0deg)",
  },
  rotate90: {
    transform: "rotate(90deg)",
  },
};
const size = {
  // 96px
  xxxxxlarge: {
    height: "var(--nypl-space-xxxl)",
    width: "var(--nypl-space-xxxl)",
  },
  "5xlarge": {
    height: "var(--nypl-space-xxxl)",
    width: "var(--nypl-space-xxxl)",
  },
  // 80px
  xxxxlarge: {
    height: "5rem",
    width: "5rem",
  },
  "4xlarge": {
    height: "5rem",
    width: "5rem",
  },
  // 64px
  xxxlarge: {
    height: "var(--nypl-space-xxl)",
    width: "var(--nypl-space-xxl)",
  },
  "3xlarge": {
    height: "var(--nypl-space-xxl)",
    width: "var(--nypl-space-xxl)",
  },
  // 48px
  xxlarge: {
    height: "var(--nypl-space-xl)",
    width: "var(--nypl-space-xl)",
  },
  "2xlarge": {
    height: "var(--nypl-space-xl)",
    width: "var(--nypl-space-xl)",
  },
  // 32px
  xlarge: {
    height: "var(--nypl-space-l)",
    width: "var(--nypl-space-l)",
  },
  // 24px
  large: {
    height: "var(--nypl-space-m)",
    width: "var(--nypl-space-m)",
  },
  // 100%
  default: {
    width: "100%",
  },
  // 18px
  medium: {
    height: "1.125rem",
    width: "1.125rem",
  },
  // 14px
  small: {
    height: "0.875rem",
    width: "0.875rem",
  },
  // 10px
  xsmall: {
    height: "0.65rem",
    width: "0.65rem",
  },
};

interface IconBaseStyle extends StyleFunctionProps {
  align: keyof typeof align;
  color: string;
  iconRotation: keyof typeof iconRotation;
  size: keyof typeof size;
}

const Icon = defineStyleConfig({
  baseStyle: defineStyle((props: IconBaseStyle) => {
    const allStyles = {
      ...svgBase,
      ...align[props.align],
      fill: props.color,
      ...iconRotation[props.iconRotation],
      ...size[props.size],
    };
    return {
      ...allStyles,
      // We still want to style any custom SVG element that was
      // passed to the `Icon` component.
      svg: {
        ...allStyles,
      },
    };
  }),
  variants: {
    default: {},
    breadcrumbs: defineStyle({
      fill: "var(--nypl-colors-ui-white)",
      display: { md: "none" },
    }),
  },
});

export default Icon;
