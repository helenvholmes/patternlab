import {
  Box,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";

import Button from "../Button/Button";
import Heading, { HeadingSizes } from "../Heading/Heading";
import Icon, { IconProps } from "../Icons/Icon";

export const bannerTypesArray = [
  "informative",
  "negative",
  "neutral",
  "positive",
  "recommendation",
  "warning",
] as const;
export type BannerTypes = typeof bannerTypesArray[number];
export const bannerBgColorsArray = [
  "brand.primary-05",
  "section.blogs.primary-05",
  "section.books-and-more.primary-05",
  "section.connect.primary-05",
  "section.education.primary-05",
  "section.locations.primary-05",
  "section.research.primary-05",
  "section.research-library.lpa-05",
  "section.research-library.schomburg-05",
  "section.research-library.schwarzman-05",
  "section.whats-on.primary-05",
  "dark.brand.primary-05",
  "dark.section.blogs.primary-05",
  "dark.section.books-and-more.primary-05",
  "dark.section.connect.primary-05",
  "dark.section.education.primary-05",
  "dark.section.locations.primary-05",
  "dark.section.research.secondary-05",
  "dark.section.research-library.lpa-05",
  "dark.section.research-library.schomburg-05",
  "dark.section.research-library.schwarzman-05",
  "dark.section.whats-on.primary-05",
] as const;
export type BannerBgColors = typeof bannerBgColorsArray[number];
export const bannerHighlightColorsArray = [
  "brand.primary",
  "section.blogs.primary",
  "section.books-and-more.primary",
  "section.connect.primary",
  "section.education.primary",
  "section.locations.primary",
  "section.research.primary",
  "section.research-library-lpa.primary",
  "section.research-library-schomburg.primary",
  "section.research-library-schwarzman.primary",
  "section.whats-on.primary",
  "dark.brand.primary",
  "dark.section.blogs.primary",
  "dark.section.books-and-more.primary",
  "dark.section.connect.primary",
  "dark.section.education.primary",
  "dark.section.locations.primary",
  "dark.section.research.secondary",
  "dark.section.research-library-lpa.primary",
  "dark.section.research-library-schomburg.primary",
  "dark.section.research-library-schwarzman.primary",
  "dark.section.whats-on.primary",
] as const;
export type BannerHighlightColors = typeof bannerHighlightColorsArray[number];

export interface BannerProps {
  /** Label used to describe the `Banner`'s aside HTML element. */
  ariaLabel?: string;
  /** Used to set the color of the background for the full component.
   * Refer to how color values are defined and typed in the DS Icon component. */
  backgroundColor?: BannerBgColors;
  /** Additional `className` to add. */
  className?: string;
  /** Used to populate the body content of the component. */
  content: string | JSX.Element;
  /** Used to populate the heading element within the component.  A string
   * value can be passed to set the text for a default DS Heading component,
   * or an actual DS Heading component can be passed in. */
  heading?: string | JSX.Element;
  /** Used to set the color for the left border and icon.  Refer to how color
   * values are defined and typed in the DS Icon component. */
  highlightColor?: BannerHighlightColors;
  /** Optional custom `Icon` that will override the default `Icon`. */
  icon?: JSX.Element;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Optional prop to control whether a `Banner` can be dismissed
   * (closed) by a user. */
  isDismissible?: boolean;
  /** Used to control the component's semantic coloring and iconography. */
  type?: BannerTypes;
}

const iconProps: Record<BannerTypes, IconProps> = {
  neutral: {
    name: "errorOutline",
    title: "Banner neutral icon",
    iconRotation: "rotate180",
  },
  informative: {
    name: "errorOutline",
    title: "Banner informative icon",
    iconRotation: "rotate180",
  },
  positive: {
    name: "actionCheckCircle",
    title: "Banner positive icon",
  },
  negative: {
    name: "errorOutline",
    title: "Banner negative icon",
  },
  warning: {
    name: "alertNotificationImportant",
    title: "Banner warning icon",
  },
  recommendation: {
    name: "actionLightbulb",
    title: "Banner recommendation icon",
  },
};

/**
 * The `Banner` component is a non-modal semantic dialog used to communicate a
 * general status event or to promote a feature, providing contextual feedback
 * messages for typical user actions. They are displayed contextually within a
 * page flow and they will often prompt a user to take action.
 */
export const Banner: ChakraComponent<
  React.ForwardRefExoticComponent<
    BannerProps & React.RefAttributes<HTMLDivElement>
  >,
  BannerProps
> = chakra(
  forwardRef<HTMLDivElement, BannerProps>((props, ref?) => {
    const {
      ariaLabel,
      backgroundColor,
      className,
      content,
      heading,
      highlightColor,
      icon,
      id,
      isDismissible = false,
      type = "neutral",
      ...rest
    } = props;
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false);
    const overrideType = !!(backgroundColor && highlightColor);
    const styles = useMultiStyleConfig("Banner", {
      // Only set the custom `backgroundColor` and `highlightColor` values
      // if they are both set.
      backgroundColor: overrideType ? backgroundColor : undefined,
      highlightColor: overrideType ? highlightColor : undefined,
      // If `backgroundColor` and `highlightColor` are set, then it
      // overrides the Banner types.
      variant: overrideType ? undefined : type,
    });
    const generalHeadingProps = {
      size: "heading6" as HeadingSizes,
      noSpace: true,
      color: type === "negative" ? "ui.error.primary" : null,
      _dark: {
        color: type === "negative" ? "dark.ui.error.primary" : null,
      },
    };
    // If `heading is a string, then we want the default heading,
    // otherwise, use whatever the user passed in.
    const finalHeading = heading ? (
      typeof heading === "string" ? (
        <Heading level="h2" text={heading} {...generalHeadingProps} />
      ) : (
        React.cloneElement(heading, generalHeadingProps)
      )
    ) : null;
    const dismissibleButton = (
      <Button
        aria-label="Close the banner"
        buttonType="text"
        id={`${id}-dismissible-button`}
        onClick={handleClose}
        __css={styles.dismissibleButton}
      >
        <Icon
          data-testid={`${id}-dismissible-icon`}
          name="close"
          size="large"
          title="Banner close icon"
        />
      </Button>
    );
    const finalIcon = icon || (
      <Icon
        className="banner-icon"
        data-testid={`${id}-banner-icon`}
        title="Banner announcement icon"
        size="large"
        {...iconProps[type]}
        __css={finalHeading ? { marginTop: "xxxs" } : {}}
      />
    );

    // If the `Banner` is closed, don't render anything.
    if (!isOpen) {
      return null;
    }

    if (backgroundColor && !highlightColor) {
      console.warn(
        "NYPL Reservoir Banner: The `backgroundColor` prop has been passed, " +
          "but the `highlightColor` prop has not been passed. Because of " +
          "this, the `backgroundColor` prop will be ignored."
      );
    }
    if (highlightColor && !backgroundColor) {
      console.warn(
        "NYPL Reservoir Banner: The `highlightColor` prop has been passed, " +
          "but the `backgroundColor` prop has not been passed. Because of " +
          "this, the `highlightColor` prop will be ignored."
      );
    }

    return (
      <Box
        aria-label={ariaLabel}
        as="aside"
        className={className}
        data-type={type}
        id={id}
        ref={ref}
        __css={styles.base}
        {...rest}
      >
        {finalIcon}
        <Box maxWidth="800px">
          {heading && finalHeading}
          {/* Render string content as div with dangerouslySetInnerHTML prop in case HTML is passed in as string
            (e.g. notification HTML stored in an environment variable. */}
          {typeof content === "string" ? (
            <Box dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <>{content}</>
          )}
        </Box>
        {isDismissible && dismissibleButton}
      </Box>
    );
  }),
  { shouldForwardProp: () => true }
);

export default Banner;
