import {
  chakra,
  ChakraComponent,
  CheckboxGroup as ChakraCheckboxGroup,
  Stack,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Fieldset from "../Fieldset/Fieldset";
import HelperErrorText, {
  HelperErrorTextType,
} from "../HelperErrorText/HelperErrorText";
import { LayoutTypes } from "../../helpers/types";
import { spacing } from "../../theme/foundations/spacing";

export interface CheckboxGroupProps {
  /** Any child node passed to the component. */
  children: React.ReactNode;
  /** Populates the initial value of the input */
  defaultValue?: string[];
  /** Optional string to populate the HelperErrorText for standard state */
  helperText?: HelperErrorTextType;
  /** ID that other components can cross reference for accessibility purposes */
  id: string;
  /** Optional string to populate the HelperErrorText for error state */
  invalidText?: HelperErrorTextType;
  /** Adds the 'disabled' prop to the input when true. */
  isDisabled?: boolean;
  /** Set's the `Checkbox`s' wrapper to be full width. */
  isFullWidth?: boolean;
  /** A`dds the 'aria-invalid' attribute to the input and
   * sets the error state when true. */
  isInvalid?: boolean;
  /** Adds the 'required' attribute to the input when true. */
  isRequired?: boolean;
  /** The checkbox group label displayed in a `legend` element if `showlabel` is
   * true, or an "aria-label" if `showLabel` is false. */
  labelText: string;
  /** Renders the checkbox buttons in a row or column (default). */
  layout?: LayoutTypes;
  /** The `name` prop indicates the form group for all the `Checkbox` children. */
  name: string;
  /** The action to perform on the `<input>`'s onChange function  */
  onChange?: (value: string[]) => void;
  /** Offers the ability to hide the helper/invalid text. */
  showHelperInvalidText?: boolean;
  /** Offers the ability to show the group's legend onscreen or hide it. Refer
   * to the `labelText` property for more information. */
  showLabel?: boolean;
  /** Whether or not to display the "(required)" text in the label text.
   * True by default. */
  showRequiredLabel?: boolean;
  /** The values to programmatically update the selected `Checkbox`es. */
  value?: string[];
}

/**
 * Wrapper component to wrap `Checkbox` components. Can be displayed in a
 * column or in a row. The `CheckboxGroup` component renders all the necessary
 * wrapping and associated text elements, but the checkbox input elements
 * _need_ to be child `Checkbox` components from the NYPL Design System.
 */
export const CheckboxGroup: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<CheckboxGroupProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<CheckboxGroupProps>
> = chakra(
  forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref?) => {
    const {
      children,
      defaultValue = [],
      helperText,
      id,
      invalidText,
      isDisabled = false,
      isFullWidth = false,
      isInvalid = false,
      isRequired = false,
      labelText,
      layout = "column",
      name,
      onChange,
      showHelperInvalidText = true,
      showLabel = true,
      showRequiredLabel = true,
      value,
      ...rest
    } = props;
    const footnote = isInvalid ? invalidText : helperText;
    const newChildren: JSX.Element[] = [];
    const spacingProp =
      layout === "column"
        ? spacing.input.group.default.vstack
        : spacing.input.group.default.hstack;
    const checkboxProps =
      defaultValue && onChange
        ? {
            defaultValue,
            onChange,
          }
        : {};

    if (value) {
      checkboxProps["value"] = value;
    }

    if (!id) {
      console.warn(
        "NYPL Reservoir CheckboxGroup: This component's required `id` prop was not passed."
      );
    }
    // Go through the Checkbox children and update them as needed.
    React.Children.map(
      children as JSX.Element,
      (child: React.ReactElement, i) => {
        if (child !== undefined && child !== null) {
          const newProps = {
            key: i,
            id: `${id}-${i}`,
            name,
            isDisabled,
            isInvalid,
            isRequired,
          };
          newChildren.push(React.cloneElement(child, newProps));
        }
      }
    );

    // Get the Chakra-based styles for the custom elements in this component.
    const styles = useMultiStyleConfig("CheckboxGroup", { isFullWidth });

    return (
      <Fieldset
        id={`${id}-checkbox-group`}
        isLegendHidden={!showLabel}
        isRequired={isRequired}
        legendText={labelText}
        showRequiredLabel={showRequiredLabel}
        {...rest}
        __css={styles}
      >
        <ChakraCheckboxGroup {...checkboxProps}>
          <Stack
            id={id}
            data-testid="checkbox-group"
            direction={[layout]}
            spacing={spacingProp}
            ref={ref}
          >
            {newChildren}
          </Stack>
        </ChakraCheckboxGroup>
        <HelperErrorText
          id={`${id}-helperErrorText`}
          isInvalid={isInvalid}
          isRenderedText={showHelperInvalidText}
          text={footnote}
          __css={styles.helperErrorText}
        />
      </Fieldset>
    );
  })
);

export default CheckboxGroup;
