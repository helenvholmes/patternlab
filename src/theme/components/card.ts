import { defineStyleConfig } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { defineStyle, StyleFunctionProps } from "@chakra-ui/system";
import breakpoints from "../foundations/breakpoints";
import { baseLinkStyles } from "./link";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "action", "body", "heading"]);

interface CardBaseStyleProps extends StyleFunctionProps {
  hasImage: boolean;
  imageIsAtEnd: boolean;
  isAlignedRightActions: boolean;
  isBordered: boolean;
  isCentered: boolean;
  layout: string;
  mainActionLink: boolean;
  imageSize: keyof typeof imageSizes;
}
interface BodyPaddingProps extends Partial<StyleFunctionProps> {
  hasImage: boolean;
  imageIsAtEnd: boolean;
  isBordered: boolean;
  isRow: boolean;
}
interface CardImageBaseStyleProps extends StyleFunctionProps {
  imageIsAtEnd: boolean;
  isCentered: boolean;
  size: keyof typeof imageSizes;
  layout: string;
}
interface CardActionsBaseStyleProps extends StyleFunctionProps {
  bottomBorder: boolean;
  isCentered: boolean;
  layout: string;
  topBorder: boolean;
}

const imageSizes = {
  xxsmall: { flex: { base: "0 0 100%", md: "0 0 64px" }, width: "100%" },
  xsmall: { flex: { md: "0 0 96px" } },
  small: { flex: { md: "0 0 165px" } },
  medium: { flex: { md: "0 0 225px" } },
  large: { flex: { md: "0 0 360px" } },
};

const imageSizesMinWidth0 = {
  xxsmall: { flex: "0 0 100%", width: "100%" },
};
const imageSizesMinWidth600 = {
  xxsmall: { flex: "0 0 64px", width: "100%" },
  xsmall: { flex: "0 0 96px" },
  small: { flex: "0 0 165px" },
  medium: { flex: "0 0 225px" },
  large: { flex: "0 0 360px" },
};
// This is complicated and can be refactored later...
const getBodyPaddingStyles = ({
  hasImage,
  imageIsAtEnd,
  isBordered,
  isRow,
}: BodyPaddingProps) => {
  let bodyPadding = null;
  if (isBordered) {
    bodyPadding = "inset.default";
    if (hasImage) {
      bodyPadding =
        "0 var(--nypl-space-inset-default) var(--nypl-space-inset-default)";
    }
  }
  if (isRow && isBordered) {
    bodyPadding = "inset.default";
  }
  if (isRow && isBordered && hasImage) {
    bodyPadding = {
      base: "0 var(--nypl-space-inset-default) var(--nypl-space-inset-default)",
      md: "var(--nypl-space-inset-default) var(--nypl-space-inset-default) var(--nypl-space-inset-default) 0",
    };
    if (imageIsAtEnd) {
      bodyPadding = {
        base: "var(--nypl-space-inset-default) var(--nypl-space-inset-default) 0",
        md: "var(--nypl-space-inset-default) 0 var(--nypl-space-inset-default) var(--nypl-space-inset-default)",
      };
    }
  }
  return bodyPadding;
};
const ReservoirCard = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({
      hasImage,
      imageIsAtEnd,
      isAlignedRightActions,
      isBordered,
      isCentered,
      layout,
      mainActionLink,
      imageSize,
    }: CardBaseStyleProps) => {
      const isRow = layout === "row";
      const layoutStyles = isRow
        ? {
            display: "flex",
            maxWidth: "100%",
            textAlign: "left",
            alignItems: isCentered ? "center" : null,
          }
        : {};
      const baseBorderStyles = isBordered
        ? {
            border: "1px solid",
            borderColor: "ui.border.default",
            _dark: {
              borderColor: "dark.ui.border.default",
            },
          }
        : {};
      const bodyPadding = getBodyPaddingStyles({
        isBordered,
        hasImage,
        imageIsAtEnd,
        isRow,
      });
      let bodyMargin = null;
      if (isCentered) {
        bodyMargin = "auto";
        if (isRow) {
          bodyMargin = "0";
        }
      }
      // These sizes are only for the "row" layout.
      // const imageSize = size ? imageSizes[size] : {};
      return {
        base: {
          containerType: "inline-size",
          "@container (min-width: 0px)": {
            "[data-wrapper]": {
              flexFlow: isRow ? "column nowrap" : null,
            },
            "[data-actions]": {
              flexShrink: isAlignedRightActions ? "0" : null,
              marginStart: "0",
              marginTop: "xs",
              maxWidth: "100%",
            },
            "[data-body]": {
              width: "100%",
            },
            ...(isRow && {
              "[data-image]": {
                maxWidth: "100%",
                margin: imageIsAtEnd ? "var(--nypl-space-m) 0 0" : null,
                width: "100%",
                ...imageSizesMinWidth0[imageSize],
              },
            }),
          },
          [`@container (min-width: ${breakpoints.sm})`]: {
            "[data-body]": {
              flexBasis: isRow ? "100%" : null,
            },
          },
          [`@container (min-width: ${breakpoints.md})`]: {
            "[data-wrapper]": {
              flexFlow: isRow ? "row" : null,
            },
            "[data-actions]": {
              flexShrink: "0",
              marginStart: "m",
              marginTop: "0",
              maxWidth: "180px",
            },
            "[data-body]": {
              display: "block",
              flexFlow: "row nowrap",
              width: "auto",
            },
            ...(isRow && {
              "[data-image]": {
                maxWidth: "50%",
                flex: "0 0 225px",
                margin: imageIsAtEnd
                  ? "0 0 0 var(--nypl-space-m)"
                  : "0 var(--nypl-space-m) 0 0",
                width: null,
                ...imageSizesMinWidth600[imageSize],
              },
            }),
          },
          width: "100%",
        },
        wrapper: {
          alignItems: "flex-start",
          display: "flex",
          flexFlow: "column wrap",
          textAlign: isCentered ? "center" : null,
          ...baseBorderStyles,
          ...layoutStyles,
        },
        actions: {
          width: "100%",
        },
        body: {
          margin: bodyMargin,
          padding: bodyPadding,
        },
        heading: {
          marginBottom: "xs",
          a: mainActionLink
            ? {
                ...baseLinkStyles,
                textDecoration: "none",
              }
            : null,
        },
      };
    }
  ),
});

const CardActions = defineStyleConfig({
  baseStyle: defineStyle(
    ({
      bottomBorder,
      isCentered,
      layout,
      topBorder,
    }: CardActionsBaseStyleProps) => {
      let justifyContent = null;
      // Only center in the column layout.
      if (layout === "row") {
        justifyContent = "left";
      } else if (isCentered) {
        justifyContent = "center";
      }

      const topBorderStyles = topBorder
        ? {
            borderTop: "1px solid",
            paddingTop: "xs",
          }
        : {};
      const bottomBorderStyles = bottomBorder
        ? {
            borderBottom: "1px solid",
            paddingBottom: "xs",
          }
        : {};
      return {
        marginBottom: "xs",
        columnGap: "var(--nypl-space-xs)",
        display: "flex",
        _last: {
          marginBottom: "0",
        },
        ...topBorderStyles,
        ...bottomBorderStyles,
        justifyContent,
        borderColor: "ui.border.default",
        _dark: {
          borderColor: "dark.ui.border.default",
        },
      };
    }
  ),
});

const CardContent = defineStyleConfig({
  baseStyle: defineStyle({
    marginBottom: "xs",
    _last: {
      marginBottom: "0",
    },
  }),
});

const CardImage = defineStyleConfig({
  baseStyle: defineStyle(
    ({ imageIsAtEnd, isCentered, layout }: CardImageBaseStyleProps) => {
      const layoutStyles =
        layout === "row"
          ? {
              textAlign: "left",
              alignItems: isCentered ? "center" : null,
              marginBottom: ["xs", "xs"],
            }
          : {
              marginBottom: "xs",
              width: "100%",
            };
      const imageIsAtEndStyles = imageIsAtEnd
        ? {
            marginBottom: "0",
            marginTop: "s",
            order: "2",
          }
        : {};

      return {
        ...imageIsAtEndStyles,
        ...layoutStyles,
      };
    }
  ),
});

export default { ReservoirCard, CardActions, CardContent, CardImage };
