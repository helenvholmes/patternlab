import * as React from "react";
import { Button as ChakraButton, useStyleConfig } from "@chakra-ui/react";

import { ButtonTypes } from "./ButtonTypes";
import Icon from "../Icons/Icon";
import { getVariant } from "../../utils/utils";
import generateUUID from "../../helpers/generateUUID";

export type ButtonElementType = "submit" | "button" | "reset";

interface ButtonProps {
  /** Optionally pass in additional Chakra-based styles. */
  additionalStyles?: { [key: string]: any };
  /** Additional attributes passed to the button */
  attributes?: { [key: string]: any };
  /** The kind of button assigned through the `ButtonTypes` enum  */
  buttonType?: ButtonTypes;
  /** Additional className to use. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Adds 'disabled' property to the button */
  isDisabled?: boolean;
  /** Trigger the Button's action through the `mouseDown` event handler instead
   * of `onClick`. `false` by default. */
  mouseDown?: boolean;
  /** The action to perform on the `<button>`'s onClick function */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** The HTML button type attribute. */
  type?: ButtonElementType;
}

/**
 * Renders a simple `button` element with custom variant styles.
 */
function Button(props: React.PropsWithChildren<ButtonProps>) {
  const {
    additionalStyles = {},
    attributes,
    buttonType,
    children,
    className = "",
    id = generateUUID(),
    isDisabled = false,
    mouseDown = false,
    onClick,
    type = "button",
  } = props;
  const btnCallback = mouseDown ? { onMouseDown: onClick } : { onClick };
  let childCount = 0;
  let hasIcon = false;
  let variant;
  let styles = {};

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
    variant = getVariant(buttonType, ButtonTypes, ButtonTypes.Primary);
  }

  styles = useStyleConfig("Button", { variant });
  return (
    <ChakraButton
      id={id}
      data-testid="button"
      className={className}
      type={type}
      isDisabled={isDisabled}
      __css={{ ...styles, ...additionalStyles }}
      {...attributes}
      {...btnCallback}
    >
      {children}
    </ChakraButton>
  );
}

export default Button;
