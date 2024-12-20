import React, { forwardRef } from "react";
import {
  chakra,
  Tooltip as ChakraTooltip,
  useStyleConfig,
  ChakraComponent,
} from "@chakra-ui/react";
import Icon from "../Icons/Icon";
import Image from "../Image/Image";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";

export interface TooltipProps {
  /** Any child node passed to the component. */
  children: React.ReactNode;
  /** Value used to populate the tooltip content. */
  content: string | number | React.ReactNode;
  /** A class name for the Tooltip parent div. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Adds the `disabled` prop to the Tooltip when true. */
  isDisabled?: boolean;
  /** Wraps the children of the tooltip in `ComponentWrapper` with `tabIndex=0` when true. */
  shouldWrapChildren?: boolean;
  /** The placement of the tooltip relative to its children. */
  placement?: "top" | "left" | "bottom" | "right" | "auto";
  /** The main and cross-axis offset to displace the tooltip from its reference element. */
  offset?: [number, number];
}

export const Tooltip: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<TooltipProps> & React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<TooltipProps>
> = chakra(
  forwardRef<HTMLDivElement, TooltipProps>((props, ref?) => {
    const {
      children,
      className,
      content,
      id,
      placement = "top",
      offset = [0, 8],
      isDisabled,
      shouldWrapChildren,
      ...rest
    } = props;

    if (typeof content !== "string" && typeof content !== "number") {
      React.Children.map(
        content as React.ReactNode,
        (contentChild: React.ReactElement) => {
          if (contentChild.type !== Icon || contentChild.type !== Image) {
            console.warn(
              "NYPL Reservoir Tooltip: Pass in a string, number, DS Icon, or DS Image into the 'content' prop."
            );
          }
        }
      );
    }

    const newChildren = shouldWrapChildren ? (
      <ComponentWrapper width="fit-content">{children}</ComponentWrapper>
    ) : (
      children
    );

    const styles = useStyleConfig("Tooltip", {});

    return (
      <ChakraTooltip
        aria-label={typeof content !== "string" ? "Tooltip" : undefined}
        closeDelay={750}
        closeOnClick
        closeOnEsc
        closeOnMouseDown
        hasArrow
        isDisabled={isDisabled}
        label={content}
        openDelay={500}
        offset={offset}
        placement={placement}
        ref={ref}
        sx={styles}
        {...rest}
      >
        {newChildren}
      </ChakraTooltip>
    );
  })
);

export default Tooltip;
