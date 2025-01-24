import {
  Box,
  chakra,
  ChakraComponent,
  useColorModeValue,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Image, { ComponentImageProps } from "../Image/Image";

export const heroTypesArray = [
  "primary",
  "secondary",
  "secondaryBooksAndMore",
  "secondaryLocations",
  "secondaryResearch",
  "secondaryWhatsOn",
  "tertiary",
  "campaign",
  "fiftyFifty",
] as const;
export type HeroTypes = typeof heroTypesArray[number];
// Only used for internal purposes.
export const heroSecondaryTypes = [
  "secondary",
  "secondaryBooksAndMore",
  "secondaryLocations",
  "secondaryResearch",
  "secondaryWhatsOn",
];

export interface HeroImageProps
  extends Pick<
    ComponentImageProps,
    "alt" | "fallbackSrc" | "id" | "src" | "onError" | "component"
  > {}

export interface HeroProps {
  /**
   * Optional background color for the backdrop only in the `campaign` variant.
   * When both `backdropBackgroundColor` and `backgroundImageSrc` are passed,
   * the `backgroundImageSrc` will take precedence.
   */
  backdropBackgroundColor?: string;
  /** Optional hex color value used to override the default background
   * color for a given `Hero` variation.
   * Note: not all `Hero` variations utilize this prop. */
  backgroundColor?: string;
  /** Optional path to an image that will be used as a background image for the
   * `Hero` component.
   * Note: not all `Hero` variations utilize this prop. */
  backgroundImageSrc?: string;
  /** Optional hex color value used to override the default text color for a
   * given `Hero` variation.
   * Note: not all `Hero` variations utilize this prop. */
  foregroundColor?: string;
  /** Optional heading element. */
  heading?: JSX.Element;
  /** Used to control how the `Hero` component will be rendered. */
  heroType?: HeroTypes;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Object used to create and render the `Image` component. You can pass `component`
   * (with its own internal props, which will override) or `src`, `alt`, `id`, `fallBackSrc`, and `onError`.
   * If `imageProps.alt` is left blank, a warning will be logged to the console and
   * will cause accessibility issues. For `imageProps.src`, it will only work for
   * the "secondary", "fiftyFifty" and "campaign" `Hero` types. */
  imageProps?: HeroImageProps;
  /** Optional boolean used to toggle the default text color from light to dark.
   * Set isDarkText to `true` if the backgroundColor is set to a light color. */
  isDarkText?: boolean;
  /** Optional boolean used to toggle the treatment of the background image in
   * the "campaign" variant. If true, the background image will be converted to
   * black & white and darkened to 60% black. */
  isDarkBackgroundImage?: boolean;
  /** Optional details area that contains location data.
   * Note: not all `Hero` variations utilize this prop. */
  locationDetails?: JSX.Element;
  /** Optional string used for the subheader that displays
   * underneath the heading element. */
  subHeaderText?: string | JSX.Element;
}

export const Hero: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<HeroProps> & React.RefAttributes<HTMLDivElement>
  >,
  HeroProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<HeroProps>>(
    (props, ref?) => {
      const {
        backdropBackgroundColor,
        backgroundColor,
        backgroundImageSrc,
        foregroundColor,
        heading,
        heroType,
        id,
        imageProps = {
          alt: "",
          id: undefined,
          src: "",
        },
        isDarkText,
        isDarkBackgroundImage = false,
        locationDetails,
        subHeaderText,
      } = props;
      const styles = useMultiStyleConfig("Hero", {
        foregroundColor,
        isDarkText,
        variant: heroType,
      });
      const headingStyles = styles.heading;
      // We want to add `Hero`-specific styling to the `Heading` component.
      const finalHeading =
        heading && React.cloneElement(heading, { __css: headingStyles });
      let backgroundImageStyle = {};
      let contentBoxStyling = {};

      const imageToRender = (
        <Image
          alt={imageProps.alt}
          component={imageProps.component}
          fallbackSrc={imageProps.fallbackSrc}
          id={imageProps.id}
          onError={imageProps.onError}
          src={imageProps.src}
        />
      );

      // Using the custom Image component's props to check requirements.
      if (imageProps.component) {
        const { src, alt } = imageProps.component.props;
        Object.assign(imageProps, { src, alt });
      }

      if (imageProps.src && !imageProps.alt) {
        console.warn(
          `NYPL Reservoir Hero: The "imageProps.src" prop was passed but the "imageProps.alt"` +
            ` props was not. This will make the rendered image inaccessible.`
        );
      }

      if (heroType === "primary") {
        if (!backgroundImageSrc) {
          console.warn(
            "NYPL Reservoir Hero: It is recommended to use the `backgroundImageSrc` " +
              "prop for the `'primary'` `heroType` variant."
          );
        }
        if (imageProps.alt && imageProps.src) {
          console.warn(
            "NYPL Reservoir Hero: The `imageProps.src` and `imageProps.alt` props have been " +
              "passed, but the `'primary'` `heroType` variant will not use it."
          );
        }
      } else if (locationDetails) {
        console.warn(
          "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
            "with the `'primary'` `heroType` variant."
        );
      }
      if (heroSecondaryTypes.includes(heroType) && backgroundImageSrc) {
        console.warn(
          "NYPL Reservoir Hero: The `backgroundImageSrc` prop has been passed, " +
            "but the `'secondary'` `heroType` variant will not use it."
        );
      }
      if (heroType === "tertiary" && (backgroundImageSrc || imageProps.src)) {
        console.warn(
          "NYPL Reservoir Hero: The `'tertiary'` `heroType` variant hero " +
            "will not use any of the image props."
        );
      }
      if (
        heroType === "campaign" &&
        (!backdropBackgroundColor || !backgroundImageSrc || !imageProps.src)
      ) {
        console.warn(
          "NYPL Reservoir Hero: It is recommended to use either the " +
            "`backdropBackgroundColor`, `backgroundImageSrc`, or " +
            "`imageProps.src` prop for the `'campaign'` `heroType` variant."
        );
      }
      if (heroType === "fiftyFifty" && backgroundImageSrc) {
        console.warn(
          "NYPL Reservoir Hero: The `backgroundImageSrc` prop has been passed, " +
            "but the `'fiftyFifty'` `heroType` variant hero will not use it."
        );
      }
      if (heroType !== "campaign" && backdropBackgroundColor) {
        console.warn(
          "NYPL Reservoir Hero: The `backdropBackgroundColor` prop has been passed, " +
            "but the `'campaign'` `heroType` variant was not set. It will be ignored."
        );
      }
      if (heroType !== "campaign" && isDarkBackgroundImage) {
        console.warn(
          "NYPL Reservoir Hero: The `isDarkBackgroundImage` prop has been passed, " +
            "but the `'campaign'` `heroType` variant was not set. It will be ignored."
        );
      }

      /** The _dark object in the theme file was overriding custom background
       * colors. To overcome this issue, the background color styles were moved
       * into the component file and the related styles for all variants, other
       * than the "secondary" variant, were removed from the theme file. */
      const allDefaultBackgroundColors = {
        primary: useColorModeValue("ui.black", "dark.ui.bg.default"),
        secondary: useColorModeValue("ui.bg.default", "dark.ui.bg.default"),
        tertiary: useColorModeValue("ui.gray.x-dark", "dark.ui.bg.default"),
        campaign: useColorModeValue("ui.black", "dark.ui.bg.default"),
        campaignBackdrop: useColorModeValue(
          "dark.ui.bg.active",
          "dark.ui.bg.active"
        ),
        fiftyFifty: useColorModeValue("ui.bg.default", "dark.ui.bg.default"),
      };

      const defaultBackgroundColor = allDefaultBackgroundColors[heroType];
      if (heroType === "primary") {
        backgroundImageStyle = backgroundImageSrc
          ? {
              bgColor: defaultBackgroundColor,
              backgroundImage: `/**/url("${backgroundImageSrc}")`,
            }
          : {};
      } else if (heroType === "secondary") {
        backgroundImageStyle = { bgColor: defaultBackgroundColor };
      } else if (heroType === "campaign") {
        /**
         * For better control of the background image in the "campaign" variant,
         * the image and the associated styles were moved into the `:before`
         * element.
         */
        const campaignBgStyles = {
          content: `""`,
          height: { base: "100%", md: "calc(100% - var(--nypl-space-xl))" },
          minHeight: "300px",
          paddingBottom: { base: "0", md: "xl" },
          position: "absolute",
          top: 0,
          width: "100%",
        };
        backgroundImageStyle = backgroundImageSrc
          ? {
              _before: {
                ...campaignBgStyles,
                bgColor: "ui.black",
              },
              _after: {
                ...campaignBgStyles,
                backgroundBlendMode: isDarkBackgroundImage
                  ? "saturation"
                  : null,
                backgroundImage: isDarkBackgroundImage
                  ? `/**/linear-gradient(black, black), url("${backgroundImageSrc}")`
                  : `/**/url("${backgroundImageSrc}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                opacity: isDarkBackgroundImage ? "0.4" : "1.0",
              },
            }
          : backdropBackgroundColor
          ? {
              _before: {
                ...campaignBgStyles,
                bgColor: backdropBackgroundColor,
              },
            }
          : {
              _before: {
                ...campaignBgStyles,
                bgColor: allDefaultBackgroundColors["campaignBackdrop"],
              },
            };
      } else if (heroType === "tertiary" || heroType === "fiftyFifty") {
        const tertiaryBgColor = backgroundColor
          ? backgroundColor
          : defaultBackgroundColor;
        backgroundImageStyle = backgroundColor
          ? { bgColor: backgroundColor }
          : { bgColor: tertiaryBgColor };
      }

      if (!heroSecondaryTypes.includes(heroType)) {
        contentBoxStyling = {
          ...(foregroundColor && { color: foregroundColor }),
          ...(backgroundColor
            ? { backgroundColor }
            : { bgColor: defaultBackgroundColor }),
        };
      } else if (
        foregroundColor ||
        backgroundColor ||
        backdropBackgroundColor
      ) {
        console.warn(
          "NYPL Reservoir Hero: The `foregroundColor`, `backgroundColor`, or " +
            "`backdropBackgroundColor` props have been passed, but the " +
            "`'secondary'` `heroType` variant will not use them."
        );
      }
      if (foregroundColor && isDarkText) {
        console.warn(
          "NYPL Reservoir Hero: The `foregroundColor` and `isDarkText` props " +
            "have both been passed. Thse props can not be used at the same time, " +
            "so the `foregroundColor` prop will override the `isDarkText` prop."
        );
      }

      const childrenToRender =
        heroType === "campaign" ? (
          <>
            <Box
              __css={{
                ...styles.imgWrapper,
              }}
              style={{
                backgroundImage: `/**/url("${imageProps.src}")`,
              }}
            >
              {imageToRender}
            </Box>
            <Box __css={styles.interior}>
              {finalHeading}
              {subHeaderText}
            </Box>
          </>
        ) : (
          <>
            {heroType !== "primary" && heroType !== "tertiary" && (
              <Box
                __css={{
                  ...styles.imgWrapper,
                }}
                style={{
                  backgroundImage:
                    heroType === "fiftyFifty"
                      ? `/**/url("${imageProps.src}")`
                      : undefined,
                }}
              >
                {imageToRender}
              </Box>
            )}
            {finalHeading}
            {heroType === "tertiary" && subHeaderText ? (
              <p>{subHeaderText}</p>
            ) : (
              <Box __css={styles.bodyText}>{subHeaderText}</Box>
            )}
          </>
        );

      return (
        <Box
          data-testid="hero"
          data-responsive-background-image
          id={id}
          ref={ref}
          __css={{
            ...styles.base,
            ...backgroundImageStyle,
          }}
        >
          <Box
            data-testid="hero-content"
            style={contentBoxStyling}
            __css={{ ...styles.content, ...contentBoxStyling }}
          >
            {childrenToRender}
          </Box>
        </Box>
      );
    }
  ),
  { shouldForwardProp: () => true }
);

export default Hero;
