import * as React from "react";
import { Button as ChakraButton, useStyleConfig } from "@chakra-ui/react";

import { ButtonTypes } from "./ButtonTypes";
import Icon from "../Icons/Icon";

type ButtonElementType = "submit" | "button" | "reset";

interface ButtonProps {
  /** Optionally pass in additional Chakra-based styles. */
  additionalStyles?: { [key: string]: any };
  /** Additional attributes passed to the button */
  attributes?: { [key: string]: any };
  /** The kind of button assigned through the `ButtonTypes` enum  */
  buttonType?: ButtonTypes;
  /** Additional className for use with BEM. See how to work with blockNames and BEM here: http://getbem.com/introduction/ */
  className?: string;
  /** Adds 'disabled' property to the button */
  disabled?: boolean;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Trigger the Button's action through the `mouseDown` event handler instead of `onClick`. `false` by default. */
  mouseDown?: boolean;
  /** The action to perform on the `<button>`'s onClick function */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** The html button attribute */
  type?: ButtonElementType;
}

// Used to map between ButtonTypes enum values and Chakra variant options.
const variantMap = {};
for (const type in ButtonTypes) {
  variantMap[ButtonTypes[type]] = ButtonTypes[type];
}

/**
 * Map the ButtonType to the Button Chakra theme variant object. If a wrong
 * value is passed (typically in non-Typescript scenarios), then the default
 * is the "primary" variant.
 */
const getVariant = (buttonType) =>
  variantMap[buttonType] || ButtonTypes.Primary;

/** Renders a simple `button` element with custom classes and modifiers. */
// @TODO had to add this to allow refs for Button.
const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>((props, ref?) => {
  const {
    additionalStyles = {},
    attributes,
    buttonType,
    children,
    className = "",
    disabled,
    id,
    mouseDown = false,
    onClick,
    type = "button",
  } = props;
  const btnCallback = mouseDown ? { onMouseDown: onClick } : { onClick };
  let childCount = 0;
  let hasIcon = false;
  let variant;
  let styles;

  React.Children.map(children, (child: React.ReactElement) => {
    childCount++;
    if (child !== undefined && child !== null) {
      if (
        child.type === Icon ||
        (child.props && child.props.mdxType === "Icon")
      ) {
        hasIcon = true;
      }
    }
  });

  if (childCount === 1 && hasIcon) {
    variant = "iconOnly";
  } else {
    variant = getVariant(buttonType);
  }

  styles = useStyleConfig("Button", { variant });

  return (
    <ChakraButton
      ref={ref}
      id={id}
      data-testid="button"
      className={className}
      type={type}
      disabled={disabled}
      __css={{ ...styles, ...additionalStyles }}
      {...attributes}
      {...btnCallback}
    >
      {children}
    </ChakraButton>
  );
});

export default Button;
