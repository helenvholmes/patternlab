import {
  Box,
  chakra,
  ChakraComponent,
  Select as ChakraSelect,
  useColorModeValue,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState, useRef } from "react";

import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { HelperErrorTextType } from "../HelperErrorText/HelperErrorText";
import Icon from "../Icons/Icon";
import Label from "../Label/Label";
import { getAriaAttrs } from "../../utils/utils";

export const selectTypesArray = ["default", "searchbar"];
export const labelPositionsArray = ["default", "inline"];
export type SelectTypes = typeof selectTypesArray[number];
export type LabelPositions = typeof labelPositionsArray[number];

export interface SelectProps {
  /** A class name for the `div` parent element. */
  className?: string;
  /** The initial value of an uncontrolled component */
  defaultValue?: string;
  /** Optional string to populate the `HelperErrorText` for the standard state. */
  helperText?: HelperErrorTextType;
  /** ID that other components can cross reference for accessibility purposes */
  id: string;
  /** Optional string to populate the `HelperErrorText` for the error state
   * when `isInvalid` is true. */
  invalidText?: HelperErrorTextType;
  /** Adds the `disabled` and `aria-disabled` attributes to the select when true */
  isDisabled?: boolean;
  /** Adds the `aria-invalid` attribute to the select when true. This also makes
   * the color theme "NYPL error" red for the select and text. */
  isInvalid?: boolean;
  /** Adds the `required` and `aria-required` attributes to the input when true. */
  isRequired?: boolean;
  /** Optional value to render the label inline, rather than the default (on top)
   * of the select element. */
  labelPosition?: LabelPositions;
  /** Provides text for a `Label` component if `showLabel` is set to `true`;
   * populates an `aria-label` attribute on the select input if `showLabel` is
   * set to `false`. */
  labelText: string;
  /** Used to reference the select element in forms. */
  name: string;
  /** The callback function to get the selected value.
   * Should be passed along with `value` for controlled components. */
  onChange?: (event: React.FormEvent) => void;
  /** Placeholder text in the select element. */
  placeholder?: string;
  /** The variant to display. */
  selectType?: SelectTypes;
  /** Offers the ability to hide the helper/invalid text. */
  showHelperInvalidText?: boolean;
  /** Offers the ability to show the select's label onscreen or hide it. Refer
   * to the `labelText` property for more information. */
  showLabel?: boolean;
  /** Whether or not to display the "(required)" text in the label text.
   * True by default. */
  showRequiredLabel?: boolean;
  /** The value of the selected option.
   * Should be passed along with `onChange` for controlled components. */
  value?: string;
}

/**
 * Component that renders Chakra's `Select` component along with an accessible
 * `Label` and optional `HelperErrorText` component.
 */
export const Select: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<SelectProps> &
      React.RefAttributes<HTMLSelectElement>
  >,
  React.PropsWithChildren<SelectProps>
> = chakra(
  forwardRef<HTMLSelectElement, React.PropsWithChildren<SelectProps>>(
    (props: React.PropsWithChildren<SelectProps>, ref?) => {
      const {
        children,
        className,
        defaultValue,
        helperText,
        id,
        invalidText,
        isDisabled = false,
        isInvalid = false,
        isRequired = false,
        labelPosition = "default",
        labelText,
        name,
        onChange,
        placeholder,
        selectType = "default",
        showHelperInvalidText = true,
        showLabel = true,
        showRequiredLabel = true,
        value = "",
        ...rest
      } = props;
      const [labelWidth, setLabelWidth] = useState<number>(0);
      const labelRef = useRef<HTMLDivElement>(null);
      const styles = useMultiStyleConfig("CustomSelect", {
        variant: selectType,
        labelPosition,
      });
      const finalInvalidText = invalidText
        ? invalidText
        : "There is an error related to this field.";
      const footnote = isInvalid ? finalInvalidText : helperText;
      const ariaAttributes = getAriaAttrs({
        footnote,
        id,
        labelText,
        name: "Select",
        showLabel,
      });
      // To control the `Select` component, both `onChange` and `value`
      // must be passed.
      const controlledOrUncontrolledProps = onChange
        ? { onChange, value }
        : defaultValue
        ? { defaultValue }
        : {};

      // The number of pixels between the label and select elements
      // when the labelPosition is inline (equivalent to --nypl-space-xs).
      const labelSelectGap = 8;

      // Set the color of the dropdown arrow based on the color mode.
      const arrowColor = useColorModeValue(
        isInvalid ? "ui.error.primary" : "ui.black",
        isInvalid ? "dark.ui.error.primary" : "dark.ui.typography.body"
      );

      if (onChange && defaultValue) {
        console.warn(
          "NYPL Reservoir Select: Both an `onChange` prop (used for controlled components) and a `defaultValue` prop (used for uncontrolled components) were passed. `defaultValue` will be ignored."
        );
      }

      if (!id) {
        console.warn(
          "NYPL Reservoir Select: This component's required `id` prop was not passed."
        );
      }

      useEffect(() => {
        if (labelPosition === "inline") {
          if (labelRef.current) {
            const width = labelRef.current.clientWidth + labelSelectGap;
            setLabelWidth(width);
          }
        } else {
          setLabelWidth(0);
        }
      }, [labelPosition]);

      return (
        <ComponentWrapper
          className={className}
          helperText={helperText}
          helperTextStyles={{
            marginStart: { sm: "auto", md: `${labelWidth}px` },
          }}
          id={id}
          invalidText={finalInvalidText}
          isInvalid={isInvalid}
          showHelperInvalidText={showHelperInvalidText}
          __css={styles}
          {...rest}
        >
          <Box __css={labelPosition === "inline" && styles.inline}>
            {showLabel && (
              <Box ref={labelRef}>
                <Label
                  htmlFor={id}
                  id={`${id}-label`}
                  isInlined
                  isRequired={showRequiredLabel && isRequired}
                >
                  {labelText}
                </Label>
              </Box>
            )}
            <ChakraSelect
              id={id}
              variant="outline"
              isRequired={isRequired}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              name={name}
              placeholder={placeholder}
              ref={ref}
              {...controlledOrUncontrolledProps}
              {...ariaAttributes}
              icon={
                <Icon
                  color={arrowColor}
                  id={`${id}-icon`}
                  name="arrow"
                  size="medium"
                />
              }
              __css={styles.select}
            >
              {children}
            </ChakraSelect>
          </Box>
        </ComponentWrapper>
      );
    }
  )
);

export default Select;
