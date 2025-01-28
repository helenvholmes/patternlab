import React, { forwardRef } from "react";
import {
  Box,
  chakra,
  ChakraComponent,
  LinkBox as ChakraLinkBox,
  LinkOverlay as ChakraLinkOverlay,
  useMultiStyleConfig,
  useStyleConfig,
} from "@chakra-ui/react";
import { LayoutTypes } from "../../helpers/types";
import Heading from "../Heading/Heading";
import Image, { ComponentImageProps, ImageProps } from "../Image/Image";

interface CustomColorProps {
  backgroundColor?: string;
  color?: string;
}

interface CardBaseProps {
  /** Optional value to control the alignment of the text and elements. */
  isCentered?: boolean;
  /** Optional value to render the layout in a row or column.
   * Default is `"column"`. */
  layout?: LayoutTypes;
}

interface CardWrapperProps {
  /** Optional CSS class name to add. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Main link to use when the full `Card` component should be clickable. */
  mainActionLink?: string;
  /** Additional object for styling the `Card`'s `div` wrapper. */
  styles?: any;
}

// Used internally only for the `imageProps` prop for the `Card` component.
interface CardImageProps extends ComponentImageProps {
  /** Optional boolean value to control the position of the `CardImage`. */
  isAtEnd?: boolean;
}

interface CardActionsProps extends CardBaseProps {
  /** Optional boolean value to control visibility of border on the bottom edge
   * of the card actions element */
  bottomBorder?: boolean;
  /** Optional boolean value to control visibility of border on the top edge of
   * the card actions element */
  topBorder?: boolean;
}

/** Used only internally for the `CardImage` component. */
interface CardImageComponentProps extends CardBaseProps, ImageProps {
  /** Optional boolean value to control the position of the `CardImage`. */
  isAtEnd?: boolean;
}

export interface CardProps extends CardBaseProps, CardWrapperProps {
  /** Optional hex color value used to set the card background color. */
  backgroundColor?: string;
  /** Optional hex color value used to override the default text color. */
  foregroundColor?: string;
  /** Optional boolean value to control the visibility of a border around
   * the card. */
  isBordered?: boolean;
  /** Object used to create and render the `Image` component. */
  imageProps?: CardImageProps;
  /** Set CardActions to the right content side. This only works in
   * the row layout. */
  isAlignedRightActions?: boolean;
}

/**
 * The CardImage component is used internally in the `Card` component. It
 * renders an `Image` component but with overriding styles specific to the
 * `Card` component.
 */
function CardImage(
  props: React.ComponentProps<"img"> & CardImageComponentProps
) {
  const {
    alt,
    aspectRatio,
    caption,
    component,
    credit,
    fallbackSrc,
    id,
    isAtEnd,
    isCentered,
    isLazy,
    layout,
    onError,
    size,
    src,
  } = props;
  // Additional styles to add to the `Image` component.
  const styles = useStyleConfig("CardImage", {
    imageIsAtEnd: isAtEnd,
    isCentered,
    layout,
    size,
  });

  return (
    <Box __css={styles} data-image>
      <Image
        alt={alt}
        aspectRatio={aspectRatio}
        caption={caption}
        component={component}
        credit={credit}
        fallbackSrc={fallbackSrc}
        id={id}
        isLazy={isLazy}
        onError={onError}
        size={size}
        src={src}
      />
    </Box>
  );
}

// CardHeading child-component
export const CardHeading: React.FC<any> = chakra(Heading);

// CardContent child-component
export const CardContent: React.FC<React.PropsWithChildren<any>> = chakra(
  (props: React.PropsWithChildren<{}>) => {
    const { children, ...rest } = props;
    const styles = useStyleConfig("CardContent");
    return children ? (
      <Box __css={styles} {...rest}>
        {children}
      </Box>
    ) : null;
  }
);

// CardActions child-component
export const CardActions: React.FC<React.PropsWithChildren<any>> = chakra(
  (props: React.PropsWithChildren<CardActionsProps>) => {
    const { bottomBorder, children, isCentered, layout, topBorder, ...rest } =
      props;
    const styles = useStyleConfig("CardActions", {
      bottomBorder,
      isCentered,
      layout,
      topBorder,
    });

    return children ? (
      <Box __css={styles} {...rest}>
        {children}
      </Box>
    ) : null;
  }
);

/**
 * If `mainActionLink` is passed, then this adds Chakra's `LinkBox` wrapper
 * component to the entire `Card` component. This works together with the
 * `CardLinkOverlay` component to provide a clickable overlay.
 */
const CardWrapper: React.FC<any> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<CardWrapperProps>>(
    ({ className, children, id, mainActionLink, styles, ...rest }, ref) =>
      mainActionLink ? (
        <ChakraLinkBox
          id={id}
          className={className}
          ref={ref}
          sx={styles}
          {...rest}
        >
          {children}
        </ChakraLinkBox>
      ) : (
        <Box id={id} className={className} ref={ref} sx={styles} {...rest}>
          {children}
        </Box>
      )
  )
);

/**
 * If `mainActionLink` is passed, then this adds Chakra's `LinkOverlay` around
 * text that should be linked, in this case the `CardHeading` text. This works
 * together with the `CardWrapper` component to provide a clickable overlay to
 * the `Card` component while still allowing links in the `CardActions` to be
 * clickable.
 */
function CardLinkOverlay({
  children,
  mainActionLink,
}: React.PropsWithChildren<CardWrapperProps>) {
  return mainActionLink ? (
    <ChakraLinkOverlay href={mainActionLink}>{children}</ChakraLinkOverlay>
  ) : (
    <>{children}</>
  );
}

export const Card: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<CardProps> & React.RefAttributes<HTMLDivElement>
  >,
  CardProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<CardProps>>(
    (props, ref?) => {
      const {
        backgroundColor,
        children,
        className,
        foregroundColor,
        id,
        imageProps = {
          alt: "",
          aspectRatio: "square",
          caption: undefined,
          component: undefined,
          credit: undefined,
          fallbackSrc: undefined,
          id: undefined,
          isAtEnd: false,
          isLazy: false,
          onError: undefined,
          size: "default",
          src: "",
        },
        isAlignedRightActions = false,
        isBordered,
        isCentered = false,
        layout = "column",
        mainActionLink,
        ...rest
      } = props;
      const hasImage = imageProps.src || imageProps.component;
      const finalImageAspectRatio = imageProps.component
        ? "original"
        : imageProps.aspectRatio;
      const customColors: CustomColorProps = {};
      const cardContents: JSX.Element[] = [];
      const cardRightContents: JSX.Element[] = [];
      let cardHeadingCount = 0;

      if (imageProps.component && imageProps.aspectRatio) {
        console.warn(
          "NYPL Reservoir Card: Both the `imageProps.component` and `imageProps.aspectRatio` " +
            "props were set but `imageProps.aspectRatio` will be ignored in favor " +
            "of the aspect ratio on `imageProps.component` prop."
        );
      }

      backgroundColor && (customColors["backgroundColor"] = backgroundColor);
      foregroundColor && (customColors["color"] = foregroundColor);

      const styles = useMultiStyleConfig("ReservoirCard", {
        hasImage,
        imageIsAtEnd: imageProps.isAtEnd,
        isAlignedRightActions,
        isBordered,
        isCentered,
        layout,
        mainActionLink,
        imageSize: imageProps.size,
      });

      React.Children.map(
        children as JSX.Element,
        (child: React.ReactElement, key) => {
          const isCardActions =
            child.type === CardActions || child.props.mdxType === "CardActions";
          if (
            child.type === CardHeading ||
            child.props.mdxType === "CardHeading"
          ) {
            // If the child is a `CardHeading` component, then we add the
            // `CardLinkOverlay` inside of the `Heading` component and wrap its text.
            // This allows other links in the `CardActions` to be clickable. This is
            // only done for the first `CardHeading` component but does not affect
            // the full-click feature.
            const newChildren =
              cardHeadingCount === 0 ? (
                <CardLinkOverlay mainActionLink={mainActionLink}>
                  {child.props.children}
                </CardLinkOverlay>
              ) : (
                child.props.children
              );
            const elem = React.cloneElement(child, {
              key,
              // Override the child text with the potential `CardLinkOverlay`.
              children: newChildren,
              layout,
              __css: styles.heading,
            });
            cardContents.push(elem);
            cardHeadingCount++;
          } else if (
            child.type === CardContent ||
            child.props.mdxType === "CardContent"
          ) {
            const elem = React.cloneElement(child, { key });
            cardContents.push(elem);
          } else if (isCardActions) {
            const elem = React.cloneElement(child, { key, isCentered, layout });

            // Only allow `CardActions` to align to the right of the main
            // `CardContent` component when in the row layout.
            if (isAlignedRightActions && layout === "row") {
              cardRightContents.push(elem);
            } else {
              cardContents.push(elem);
            }
          }
        }
      );

      return (
        <Box __css={styles.base} ref={ref}>
          <CardWrapper
            id={id}
            className={className}
            mainActionLink={mainActionLink}
            styles={{
              ...styles.wrapper,
              ...customColors,
            }}
            data-wrapper
            {...rest}
          >
            {hasImage && (
              <CardImage
                alt={imageProps.alt}
                aspectRatio={finalImageAspectRatio}
                caption={imageProps.caption}
                component={imageProps.component}
                credit={imageProps.credit}
                fallbackSrc={imageProps.fallbackSrc}
                id={imageProps.id}
                isAtEnd={imageProps.isAtEnd}
                isLazy={imageProps.isLazy}
                onError={imageProps.onError}
                layout={layout}
                size={imageProps.size}
                src={imageProps.src ? imageProps.src : undefined}
              />
            )}
            <Box className="card-body" __css={styles.body} data-body>
              {cardContents}
            </Box>
            {cardRightContents.length ? (
              <Box
                className="card-right"
                __css={{ ...styles.body, ...styles.actions }}
                data-actions
              >
                {cardRightContents}
              </Box>
            ) : null}
          </CardWrapper>
        </Box>
      );
    }
  )
);

export default Card;
