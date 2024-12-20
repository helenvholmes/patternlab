import { Box, chakra, ChakraComponent, useStyleConfig } from "@chakra-ui/react";
import React, { forwardRef } from "react";

export interface LabelProps {
  /** Additional CSS class name to render in the `label` element. */
  className?: string;
  /** The id of the html element that this `Label` is describing. */
  htmlFor: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Controls whether the label should be inline with the input it goes with.
   * This prop should only be used internally. */
  isInlined?: boolean;
  /** Controls whether the "(required)" text should be displayed alongside the
   * label's text. False by default. */
  isRequired?: boolean;
  /** Allows the '(required)' text to be changed for language purposes
   * Note: Parenthesis will be added automatically by the component */
  requiredLabelText?: string;
}

/**
 * A label for form inputs. It should never be used alone.
 */
export const Label: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<LabelProps> &
      React.RefAttributes<HTMLDivElement & HTMLLabelElement>
  >,
  React.PropsWithChildren<LabelProps>
> = chakra(
  forwardRef<
    HTMLDivElement & HTMLLabelElement,
    React.PropsWithChildren<LabelProps>
  >((props, ref?) => {
    const {
      children,
      className,
      htmlFor,
      id,
      isInlined = false,
      isRequired = false,
      requiredLabelText,
      ...rest
    } = props;
    const styles = useStyleConfig("Label", { isInlined });

    if (!id) {
      console.warn(
        "NYPL Reservoir Label: This component's required `id` prop was not passed."
      );
    }

    return (
      <Box
        as="label"
        id={id}
        className={className}
        htmlFor={htmlFor}
        ref={ref}
        __css={styles}
        {...rest}
      >
        {children}
        {isRequired && (
          <span>
            {requiredLabelText ? ` (${requiredLabelText})` : " (required)"}
          </span>
        )}
      </Box>
    );
  })
);

export default Label;
