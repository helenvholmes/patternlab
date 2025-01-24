import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";
import { wrapperStyles } from "./global";
import { screenreaderOnly } from "./globalMixins";
import breakpoints from "../foundations/breakpoints";

// This function creates a set of function that helps us
// create multipart component styles.
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["imgWrapper", "text", "wrapper"]);

interface FeaturedContentBaseStyleProps extends StyleFunctionProps {
  imagePosition: string;
  imageWidth: string;
  isFullWidth: boolean;
}

const FeaturedContent = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({
      imagePosition,
      imageWidth,
      isFullWidth,
    }: FeaturedContentBaseStyleProps) => {
      let imageAtEnd = imagePosition === "end";
      let full = isFullWidth === true;
      let wrapperWidth = "50%";
      if (imageWidth === "oneQuarter") {
        wrapperWidth = "25%";
      } else if (imageWidth === "oneThird") {
        wrapperWidth = "33%";
      } else if (imageWidth === "twoThirds") {
        wrapperWidth = "66%";
      } else if (imageWidth === "threeQuarters") {
        wrapperWidth = "75%";
      }
      return {
        base: {
          bgColor: "ui.bg.default",
          left: full ? "50%" : "auto",
          marginLeft: full ? "-50vw" : "auto",
          marginRight: full ? "-50vw" : "auto",
          position: "relative",
          right: full ? "50%" : "auto",
          width: full ? "100vw" : "100%",
          _dark: {
            bgColor: "dark.ui.bg.default",
          },
          img: screenreaderOnly(),
          containerType: "inline-size",
          "@container (min-width: 0px)": {
            "[data-wrapper]": {
              flexDirection: imageAtEnd ? "column-reverse" : "column",
            },
            "[data-image]": {
              height: "320px",
              width: "100%",
            },
          },
          [`@container (min-width: ${breakpoints.md})`]: {
            "[data-wrapper]": {
              flexDirection: imageAtEnd ? "row-reverse" : "row",
              paddingLeft: full ? "s" : null,
              paddingRight: full ? "s" : null,
            },
            "[data-image]": {
              height: "auto",
              width: wrapperWidth,
            },
            "[data-text]": {
              /** The `paddingLeft` attribute is used to adjust the spacing around the
               * text when the image is positioned at the end. For aesthetic reasons,
               * we opted to not adjust the spacing around the text when the image is
               * positioned at the start.
               * */
              paddingStart: full && imageAtEnd ? 0 : null,
            },
          },
        },
        wrapper: {
          ...wrapperStyles,
          alignItems: "stretch",
          display: "flex",
          maxWidth: full ? "1280px" : "100%",
          minHeight: "320px",
        },
        text: {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: "l",
        },
        imgWrapper: {
          backgroundPosition: "center",
          backgroundSize: "cover",
        },
      };
    }
  ),
});

export default FeaturedContent;
