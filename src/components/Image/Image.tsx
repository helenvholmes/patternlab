import useNativeLazyLoading from "@charlietango/use-native-lazy-loading";
import {
  Box,
  chakra,
  ChakraComponent,
  useMergeRefs,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef, ImgHTMLAttributes } from "react";
import { useInView } from "react-intersection-observer";
import HelperErrorText from "../HelperErrorText/HelperErrorText";
import { DimensionTypes } from "../../helpers/types";

export const imageRatiosArray = [
  "fourByThree",
  "oneByTwo",
  "original",
  "sixteenByNine",
  "square",
  "threeByFour",
  "threeByTwo",
  "twoByOne",
] as const;
export const imageSizesArray = [
  "default",
  "xxxsmall",
  "xxsmall",
  "xsmall",
  "small",
  "medium",
  "large",
] as const;
export const imageTypesArray = ["default", "circle"] as const;
export type ImageRatios = typeof imageRatiosArray[number];
export type ImageSizes = typeof imageSizesArray[number];
export type ImageTypes = typeof imageTypesArray[number];

// Used for components that have an `imageProps` prop.
export interface ComponentImageProps extends Partial<HTMLImageElement> {
  /** String value used to populate the `alt` attribute of the internal `Image`
   * component's `img` element. @NOTE if an image is used, this value must be passed. */
  alt?: string;
  /** Optional value to control the aspect ratio of the internal `Image` component.
   * Defaults to `ImageRatios.Square`. */
  aspectRatio?: ImageRatios;
  /** Optional value to render as a caption for the internal `Image` component. */
  caption?: string;
  /** Optional DOM element to use instead of the DS `Image` component. */
  component?: JSX.Element;
  /** Optional value to render as a credit for the internal `Image` component. */
  credit?: string;
  /** Fallback image path or URL. */
  fallbackSrc?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Flag to set the internal `Image` component to `isLazy` mode. */
  isLazy?: boolean;
  /** Additional action to perform in the `img`'s `onerror` attribute function. */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Optional value to control the size of the internal `Image` component.
   * Defaults to `ImageSizes.Default`. */
  size?: ImageSizes;
  /** Optional value that contains the path to an image. If omitted, the internal
   * DS `Image` component will not render. */
  src?: string;
}

interface ImageWrapperProps {
  /** Optionally pass in additional Chakra-based styles. */
  additionalWrapperStyles?: { [key: string]: any };
  /** ClassName you can add in addition to 'image' */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Optional value to control the aspect ratio of the card image; default
   * value is `"original"` */
  ratio?: ImageRatios;
  /** Optional value to control the size of the image */
  size?: ImageSizes;
  /** Sets the image size based on the width or height. Width by default. */
  sizeBasedOn?: DimensionTypes;
}

export interface ImageProps
  extends ImageWrapperProps,
    ImgHTMLAttributes<HTMLImageElement> {
  /** Optionally pass in additional Chakra-based styles only for the figure. */
  additionalFigureStyles?: { [key: string]: any };
  /** Optionally pass in additional Chakra-based styles only for the image. */
  additionalImageStyles?: { [key: string]: any };
  /** Alternate text description of the image */
  alt?: string;
  /** Optional value to control the aspect ratio of the card image; default
   * value is `"original"` */
  aspectRatio?: ImageRatios;
  /** Adding will wrap the image in a <figure> */
  caption?: string;
  /** Custom image component */
  component?: JSX.Element | null;
  /** Adding will wrap the image in a <figure> */
  credit?: string;
  /** Fallback image path or URL. */
  fallbackSrc?: string;
  /** Optional value for the image type */
  imageType?: ImageTypes;
  /** Flag to set the internal `Image` component to `isLazy` mode. */
  isLazy?: boolean;
  /** Additional action to perform in the `img`'s `onerror` attribute function. */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** The src attribute is required, and contains the path to the image you want to embed. */
  src?: string;
}

const ImageWrapper = chakra(
  (props: React.PropsWithChildren<ImageWrapperProps>) => {
    const {
      additionalWrapperStyles = {},
      className = "",
      children,
      id,
      ratio = "original",
      size = "default",
      sizeBasedOn = "width",
      ...rest
    } = props;
    const styles = useMultiStyleConfig("ReservoirImageWrapper", {
      ratio,
      size,
      sizeBasedOn,
    });
    return (
      <Box
        className={`the-wrap ${className}`}
        id={id}
        __css={{ ...styles.base, ...additionalWrapperStyles }}
        {...rest}
      >
        <Box className="the-crop" __css={styles.crop}>
          {children}
        </Box>
      </Box>
    );
  }
);

export const Image: ChakraComponent<
  React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLDivElement>
  >,
  ImageProps
> = chakra(
  forwardRef<HTMLDivElement, ImageProps>((props, ref?) => {
    const {
      additionalFigureStyles = {},
      additionalImageStyles = {},
      additionalWrapperStyles = {},
      alt = "",
      aspectRatio = "original",
      caption,
      className = "",
      component,
      credit,
      fallbackSrc,
      id,
      imageType = "default",
      isLazy = false,
      onError,
      size = "default",
      sizeBasedOn = "width",
      src,
      ...rest
    } = props;
    // Check if the native browser lazy loading is supported.
    const supportsLazyLoading = useNativeLazyLoading();
    // If it is (mostly Chromium-based browsers), then skip creating
    // the IntersectionObserver object.
    const [inViewRef, inView] = useInView({
      triggerOnce: true,
      skip: supportsLazyLoading,
    });
    const useImageWrapper = aspectRatio !== "original";
    const styles = useMultiStyleConfig("ReservoirImage", {
      variant: imageType,
      ratio: aspectRatio,
      size,
      sizeBasedOn,
    });
    // Function that gets called when an image fails to load.
    const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      console.warn(
        "NYPL Reservoir Image: The initial image failed to load in the " +
          "browser. The fallback image source will now be used."
      );
      (event.target as any).src = fallbackSrc || "";
      onError && onError(event);
    };
    let imageComponent: JSX.Element | null = null;
    let lazyRef = undefined;
    let finalRefs = undefined;
    let srcProp = isLazy ? {} : { src };

    if (alt && alt.length > 300) {
      throw new Error(
        "NYPL Reservoir Image: Alt text must be less than 300 characters."
      );
    }

    // For lazying loading images, the initial `src` value is empty. Once
    // the image is loaded, the `src` prop is set and passed to the image
    // element so that it can load. This also lets it load with a gray
    // background placeholder. We also only want to add the `inViewRef` ref
    // when `isLazy` is true to keep track of when the image is visible.
    if (isLazy && (inView || supportsLazyLoading)) {
      lazyRef = inViewRef;
      srcProp = { src };
    }

    // We want to add the `ref` from the `forwardRef` function regardless of
    // whether the image is lazy or not. This is meant for usage with other
    // components such as a `Tooltip`. The `inViewRef` is only added when
    // the `isLazy` prop is true.
    finalRefs = useMergeRefs(lazyRef, ref);

    imageComponent = component ? (
      component
    ) : (
      <Box
        as="img"
        alt={alt}
        id={id ? id : null}
        loading={isLazy ? "lazy" : undefined}
        onError={onImageError}
        {...srcProp}
        __css={{ ...styles.img, ...additionalImageStyles }}
        {...rest}
      />
    );
    const finalImage = useImageWrapper ? (
      <ImageWrapper
        additionalWrapperStyles={additionalWrapperStyles}
        className={className}
        id={id ? `${id}-wrapper` : null}
        ratio={aspectRatio}
        size={size}
        sizeBasedOn={sizeBasedOn}
        {...(caption || credit ? {} : rest)}
      >
        {imageComponent}
      </ImageWrapper>
    ) : (
      imageComponent
    );

    return (
      <Box ref={finalRefs}>
        {caption || credit ? (
          <Box
            as="figure"
            __css={{ ...styles.figure, ...additionalFigureStyles }}
          >
            {finalImage}
            <Box as="figcaption" __css={styles.figcaption}>
              {caption && (
                <HelperErrorText
                  ariaLive="off"
                  ariaAtomic={false}
                  text={caption}
                />
              )}
              {credit && (
                <HelperErrorText
                  ariaLive="off"
                  ariaAtomic={false}
                  text={credit}
                />
              )}
            </Box>
          </Box>
        ) : (
          finalImage
        )}
      </Box>
    );
  }),
  { shouldForwardProp: () => true }
);

export default Image;
