import { Box, chakra, ChakraComponent, useStyleConfig } from "@chakra-ui/react";
import React, { forwardRef } from "react";

export const statusBadgeFontSizeArray = [
  "desktop.body.body1",
  "desktop.body.body2",
  "desktop.caption",
] as const;
export type StatusBadgeFontSizes = typeof statusBadgeFontSizeArray[number];

export const statusBadgeLevelArray = ["low", "medium", "high"] as const;
export type StatusBadgeLevels = typeof statusBadgeLevelArray[number];

export const statusBadgeTypeArray = [
  "informative",
  "negative",
  "neutral",
  "positive",
  "recommendation",
  "warning",
  "low",
  "medium",
  "high",
] as const;
export type StatusBadgeTypes = typeof statusBadgeTypeArray[number];
export interface StatusBadgeProps {
  /** Additional class for the component */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Level of the status badge. This prop has been deprecated in favor of the
   * `type` prop. */
  level?: StatusBadgeLevels;
  /** Semantic type of the status badge. */
  type?: StatusBadgeTypes;
}

/**
 * The `StatusBadge` component is a label that indicates status or importance.
 * It is used for bringing awareness to a specific element or feature and should
 * provide quick recognition.
 */
export const StatusBadge: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<StatusBadgeProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<StatusBadgeProps>
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<StatusBadgeProps>>(
    (props, ref?) => {
      const { children, className, id, level, type, ...rest } = props;
      const labelFontSize = rest["fontSize"] || "desktop.body.body2";
      const finalVariant = level ? level : type ? type : "low";
      const styles = useStyleConfig("StatusBadge", {
        labelFontSize,
        variant: finalVariant,
      });

      if (!children) {
        console.warn("NYPL Reservoir StatusBadge: No children were passed.");
      }

      return (
        <Box id={id} className={className} ref={ref} __css={styles} {...rest}>
          {children}
        </Box>
      );
    }
  )
);

export default StatusBadge;
