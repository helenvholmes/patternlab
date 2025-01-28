import {
  Box,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import Image, { ImageProps } from "../Image/Image";

export const featuredContentWidthArray = [
  "oneQuarter",
  "oneThird",
  "oneHalf",
  "twoThirds",
  "threeQuarters",
];
export type FeaturedContentWidthType = typeof featuredContentWidthArray[number];

export const featuredContentPositionArray = ["start", "end"] as const;
export type FeaturedContentPositionType =
  typeof featuredContentPositionArray[number];

export interface FeaturedContentImageProps extends ImageProps {
  /** String value that specifies the width of the image rendered within the component. */
  width?: FeaturedContentWidthType;
  /** String value that specifies the position of the image rendered within the component. */
  position?: FeaturedContentPositionType;
}

export interface FeaturedContentProps {
  /** Optional CSS class name to add. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** The text content rendered in the component.  DS components and native HTML can be passed in this prop. */
  textContent: string | JSX.Element;
  /** Whether component will fill the full width of the browser window, instead of just its parent element.
   * False by default. */
  isFullWidth: boolean;
  /** Data object that contains the props related to the image element: alt, position, src, width.  */
  imageProps: FeaturedContentImageProps;
}

/**
 * The FeaturedContentImage component is used internally in the `FeaturedContent` component. It
 * renders an 'Image' component but with overriding styles specific to the
 * `FeaturedContent` component (see featuredContent.ts).
 */
function FeaturedContentImage(props: FeaturedContentImageProps) {
  const { alt, src } = props;
  return <Image alt={alt} src={src} />;
}

export const FeaturedContent: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<FeaturedContentProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  FeaturedContentProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<FeaturedContentProps>>(
    (props, ref?) => {
      const {
        textContent,
        isFullWidth,
        imageProps = {
          alt: "",
          position: "end",
          width: "oneHalf",
          src: "",
        },
        ...rest
      } = props;
      const styles = useMultiStyleConfig("FeaturedContent", {
        imagePosition: imageProps.position,
        imageWidth: imageProps.width,
        isFullWidth,
      });

      if (!imageProps.src) {
        console.warn(
          `NYPL Reservoir FeaturedContent: A value for 'imageProps.src' is required.`
        );
      }
      if (!textContent) {
        console.warn(
          `NYPL Reservoir FeaturedContent: The 'textContent' prop is required.`
        );
      }

      return (
        <Box
          data-testid="featuredcontent"
          __css={styles.base}
          ref={ref}
          {...rest}
        >
          <Box __css={styles.wrapper} data-wrapper>
            <Box
              data-testid="featuredcontent-bg-image"
              __css={{
                ...styles.imgWrapper,
                backgroundImage: `/**/url(${imageProps.src})`,
              }}
              data-image
            >
              <FeaturedContentImage
                alt={imageProps.alt}
                src={imageProps.src ? imageProps.src : undefined}
              />
            </Box>
            <Box __css={styles.text} data-text>
              {textContent}
            </Box>
          </Box>
        </Box>
      );
    }
  )
);

export default FeaturedContent;
