import {
  Box,
  chakra,
  ChakraComponent,
  CircularProgress as ChakraCircularProgress,
  CircularProgressLabel as ChakraCircularProgressLabel,
  Progress as ChakraProgress,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Label from "../Label/Label";

export const progressIndicatorSizesArray = ["default", "small"] as const;
export const progressIndicatorTypesArray = ["circular", "linear"] as const;
export const progressIndicatorLabelPlacementsArray = [
  "bottom",
  "right",
  "top",
  "left",
] as const;

export type ProgressIndicatorSizes = typeof progressIndicatorSizesArray[number];
export type ProgressIndicatorTypes = typeof progressIndicatorTypesArray[number];
export type ProgressIndicatorLabelPlacements =
  typeof progressIndicatorLabelPlacementsArray[number];

interface BaseProgressIndicatorProps {
  /** The darkMode prop is deprecated and should no longer be used. */
  darkMode?: boolean;
  /** ID that other components can cross reference for accessibility purposes. */
  id: string;
  /** Whether the `ProgressIndicator` should be linear or circular. */
  indicatorType?: ProgressIndicatorTypes;
  /** Whether the progress animation should display because the `value` prop is
   * not known. When this is set to `true`, the `value` prop will be ignored. */
  isIndeterminate?: boolean;
  /** The text to display in an HTML `label` element. */
  labelText: string;
  /** Visually show or hide the label text. When set to `false`, then the label
   * text will be added to the parent component as its `aria-label` attribute. */
  showLabel?: boolean;
  /** The size of the linear or circular progress. */
  size?: ProgressIndicatorSizes;
  /** A number between 0 to 100 that defines the progress' value. */
  value?: number;
}

interface LinearProgressIndicatorProps extends BaseProgressIndicatorProps {
  indicatorType?: "linear";
  labelPlacement?: never;
}

interface CircularProgressIndicatorProps extends BaseProgressIndicatorProps {
  indicatorType?: "circular";
  /** The placement of the label relative to a circular indicator. */
  labelPlacement?: ProgressIndicatorLabelPlacements;
}

export type ProgressIndicatorProps =
  | LinearProgressIndicatorProps
  | CircularProgressIndicatorProps;

/**
 * A component that displays a progress status for any task that takes a long
 * time to complete or consists of multiple steps. Examples include downloading,
 * uploading, or processing.
 */
export const ProgressIndicator: ChakraComponent<
  React.ForwardRefExoticComponent<
    ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>
  >,
  ProgressIndicatorProps
> = chakra(
  forwardRef<HTMLDivElement, ProgressIndicatorProps>((props, ref?) => {
    const {
      darkMode = false,
      id,
      indicatorType = "linear",
      isIndeterminate = false,
      labelPlacement,
      labelText,
      showLabel = true,
      size = "default",
      value = 0,
      ...rest
    } = props;
    const finalLabelPlacement = labelPlacement ?? "bottom";
    const styles = useMultiStyleConfig("ProgressIndicator", {
      darkMode,
      size,
      labelPlacement: finalLabelPlacement,
    });
    let finalValue = value;
    if (!id) {
      console.warn(
        "NYPL Reservoir Progress Indicator: This component's required `id` prop was not passed."
      );
    }
    if (finalValue < 0 || finalValue > 100) {
      console.warn(
        "NYPL Reservoir ProgressIndicator: An invalid value was passed for the" +
          " `value` prop, so 0 will be used. A valid value should be a number" +
          " between 0 and 100."
      );
      finalValue = 0;
    }
    const progressProps = {
      id,
      // If the label is visually shown, associate it with the progress indicator.
      // Otherwise, the `aria-label` will be added.
      "aria-label": showLabel ? undefined : labelText,
      "aria-labelledby": showLabel ? `${id}-label` : undefined,
      // If `isIndeterminate` is true, then it overrides the `value` prop.
      isIndeterminate: isIndeterminate || undefined,
      value: isIndeterminate ? undefined : finalValue,
    };
    const progressComponent = (indicatorType: ProgressIndicatorTypes) => {
      // Only display the percentage text for the default size, not in the
      // indeterminate state, and when `showLabel` is true.
      if (indicatorType === "circular") {
        return (
          <Box __css={styles.circularContainer}>
            <ChakraCircularProgress {...progressProps} sx={styles.circular}>
              {showLabel && !isIndeterminate && size !== "small" && (
                <ChakraCircularProgressLabel>
                  {finalValue}%
                </ChakraCircularProgressLabel>
              )}
            </ChakraCircularProgress>
            {showLabel && (
              <Label id={`${id}-label`} htmlFor={id} sx={styles.circularLabel}>
                {labelText}
              </Label>
            )}
          </Box>
        );
      }
      // The Linear progress indicator is the default.
      return (
        <>
          {showLabel && (
            <Label id={`${id}-label`} htmlFor={id}>
              {labelText}
            </Label>
          )}
          <Box __css={styles.linearContainer}>
            <ChakraProgress {...progressProps} sx={styles.linear} />
            {showLabel && !isIndeterminate && (
              <Box __css={styles.linearPercentage}>{finalValue}%</Box>
            )}
          </Box>
        </>
      );
    };

    return (
      <Box ref={ref} __css={styles} {...rest}>
        {progressComponent(indicatorType)}
      </Box>
    );
  })
);

export default ProgressIndicator;
