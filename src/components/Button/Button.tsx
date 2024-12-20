import {
  Box,
  Button as ChakraButton,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Icon from "../Icons/Icon";

export const buttonElementTypeArray = ["submit", "button", "reset"] as const;
export const buttonSizesArray = ["small", "medium", "large"] as const;
export const buttonTypesArray = [
  "primary",
  "secondary",
  "text",
  "callout",
  "pill",
  "noBrand",
  "link",
] as const;

export type ButtonElementType = typeof buttonElementTypeArray[number];
export type ButtonSizes = typeof buttonSizesArray[number];
export type ButtonTypes = typeof buttonTypesArray[number];

export interface ButtonProps {
  /** The button variation to render based on the `ButtonTypes` type. */
  buttonType?: ButtonTypes;
  /** Additional className to use. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id: string;
  /** Adds 'disabled' property to the button. */
  isDisabled?: boolean;
  /** Trigger the Button's action through the `mouseDown` event handler instead
   * of `onClick`. `false` by default. */
  mouseDown?: boolean;
  /** The action to perform on the `<button>`'s onClick function. */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** Visibly hidden text that will only be read by screenreaders. */
  screenreaderOnlyText?: string;
  /** The size of the `Button`. */
  size?: ButtonSizes;
  /** The HTML button type attribute. */
  type?: ButtonElementType;
}

/**
 * Renders a simple `button` element with custom variant styles.
 */
export const Button: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<ButtonProps> &
      React.RefAttributes<HTMLButtonElement>
  >,
  React.PropsWithChildren<ButtonProps>
> = chakra(
  forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
    (props, ref?) => {
      const {
        buttonType = "primary",
        children,
        className = "",
        id,
        isDisabled = false,
        mouseDown = false,
        onClick,
        screenreaderOnlyText,
        size = "medium",
        type = "button",
        ...rest
      } = props;
      const btnCallback = mouseDown ? { onMouseDown: onClick } : { onClick };
      let childCount = 0;
      let hasIcon = false;
      let variant: string | ButtonTypes = buttonType;
      let styles: any = {};

      if (!id) {
        console.warn(
          "NYPL Reservoir Button: This component's required `id` prop was not passed."
        );
      }

      React.Children.map(
        children as JSX.Element,
        (child: React.ReactElement) => {
          childCount++;
          if (child !== undefined && child !== null) {
            if (child.type === Icon || child?.props?.mdxType === "Icon") {
              hasIcon = true;
            }
          }
        }
      );

      if (childCount === 1 && hasIcon) {
        variant = "iconOnly";
      }

      styles = useMultiStyleConfig("CustomButton", {
        variant,
        buttonSize: size,
      });

      return (
        <ChakraButton
          className={className}
          gap={hasIcon ? "xxs" : null}
          id={id}
          isDisabled={isDisabled}
          ref={ref}
          type={type}
          {...btnCallback}
          __css={styles.base}
          {...rest}
        >
          {children}
          {screenreaderOnlyText && (
            <Box as="span" __css={styles.screenreaderOnly}>
              {screenreaderOnlyText}
            </Box>
          )}
        </ChakraButton>
      );
    }
  ),
  // Chakra uses different values for its own `size` prop. We
  // want to override the values and use our own.
  { shouldForwardProp: () => true }
);

export default Button;
