import {
  Box,
  chakra,
  ChakraComponent,
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  useMergeRefs,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef, useRef } from "react";

import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import Label from "../Label/Label";
import { HelperErrorTextType } from "../HelperErrorText/HelperErrorText";
import useStateWithDependencies from "../../hooks/useStateWithDependencies";
import { getAriaAttrs } from "../../utils/utils";
import Button from "../Button/Button";
import Icon from "../Icons/Icon";

export const autoCompleteValuesArray = [
  "on",
  "off",
  "additional-name",
  "address-level1",
  "address-level2",
  "address-level3",
  "address-level4",
  "address-line1",
  "address-line2",
  "address-line3",
  "bday-day",
  "bday-month",
  "bday-year",
  "bday",
  "cc-additional-name",
  "cc-csc",
  "cc-exp-month",
  "cc-exp-year",
  "cc-exp",
  "cc-family-name",
  "cc-given-name",
  "cc-name",
  "cc-number",
  "cc-type",
  "country-name",
  "country",
  "current-password",
  "email",
  "family-name",
  "given-name",
  "honorific-prefix",
  "honorific-suffix",
  "impp",
  "language",
  "name",
  "new-password",
  "nickname",
  "organization-title",
  "organization",
  "photo",
  "postal-code",
  "sex",
  "street-address",
  "tel-area-code",
  "tel-country-code",
  "tel-extension",
  "tel-local-prefix",
  "tel-local-suffix",
  "tel-local",
  "tel-national",
  "tel",
  "transaction-amount",
  "transaction-currency",
  "url",
  "username",
] as const;
export type AutoCompleteValues = typeof autoCompleteValuesArray[number];

export const textInputTypesArray = [
  "email",
  "hidden",
  "number",
  "password",
  "text",
  "textarea",
  "tel",
  "url",
] as const;
// HTML Input types as defined by MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export type TextInputTypes = typeof textInputTypesArray[number];

// Only used internally.
export const TextInputFormats = {
  email: "jdoe@domain.com",
  hidden: "",
  password: "",
  text: "",
  tel: "(123) 123-1234",
  textarea: "",
  url: "https://domain.com",
};

// Only used internally in `TextInput` and `SearchBar`.
export type TextInputVariants = "default" | "searchBar" | "searchBarSelect";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** FOR INTERNAL DS USE ONLY: Adds an aria-label or appends to an existing aria-label for screen readers.*/
  additionalAriaLabel?: string;
  /** FOR INTERNAL DS USE ONLY: additional helper text id(s) to be used for the input's `aria-describedby` value.
   * If more than one, separate each with a space */
  additionalHelperTextIds?: string;
  /** String value used to set the autocomplete attribute. */
  autoComplete?: AutoCompleteValues;
  /** A class name for the TextInput parent div. */
  className?: string;
  /** The starting value of the input field. */
  defaultValue?: string;
  /** Populates the HelperErrorText for the standard state */
  helperText?: HelperErrorTextType;
  /** ID that other components can cross reference for accessibility purposes */
  id: string;
  /** Populates the HelperErrorText for the error state */
  invalidText?: HelperErrorTextType;
  /** Adds a button to clear existing text in the input field. */
  isClearable?: boolean;
  /** The callback function that is called when the clear button is clicked. */
  isClearableCallback?: () => void;
  /** Adds the `disabled` and `aria-disabled` prop to the input when true */
  isDisabled?: boolean;
  /** Adds errored styling to the input/textarea and helper text elements */
  isInvalid?: boolean;
  /** Will add `required` and `aria-required` props to the input/textarea elements */
  isRequired?: boolean;
  /** Provides text for a `Label` component if `showLabel` is set to true;
   * populates an `aria-label` attribute if `showLabel` is set to false. */
  labelText: string;
  /** The max number for a `number` TextInput type. */
  max?: number;
  /** The max length of the input field. This prop is for all input types
   * except for the `number` type. */
  maxLength?: number;
  /** The min number for a `number` TextInput type. */
  min?: number;
  /** Used to reference the input element in forms. */
  name?: string;
  /** The action to perform on the `input`/`textarea`'s onChange function  */
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  /** The action to perform on the `input`/`textarea`'s onClick function  */
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  /** The action to perform on the `input`/`textarea`'s onFocus function  */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Regex to query the user input against. */
  pattern?: string;
  /** Populates the placeholder for the input/textarea elements */
  placeholder?: string;
  /** Allows the '(required)' text to be changed for language purposes
   * Note: Parenthesis will be added automatically by the component */
  requiredLabelText?: string;
  /** Offers the ability to hide the helper/invalid text. */
  showHelperInvalidText?: boolean;
  /** Offers the ability to show the label onscreen or hide it. Refer to the
   * `labelText` property for more information. */
  showLabel?: boolean;
  /** Whether or not to display the "(required)" text in the label text.
   * True by default. */
  showRequiredLabel?: boolean;
  /** The amount to increase or decrease when using the number type. */
  step?: number;
  /** FOR INTERNAL DS USE ONLY: the input variant to display. */
  textInputType?: TextInputVariants;
  /** HTML Input types as defined by MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input */
  type?: TextInputTypes;
  /** Populates the value of the input/textarea elements */
  value?: string;
}

/**
 * The type used for `ref`s. We want to extend both `input` and `textarea`
 * since both are available to create through `TextInput`.
 */
export type TextInputRefType = HTMLInputElement & HTMLTextAreaElement;

/**
 * Renders either an `input` element with a specified type or a `textarea`
 * element. All types will render an accessible `Label` component and an
 * optional `HelperErrorText` component.
 */
export const TextInput: ChakraComponent<
  React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<TextInputRefType>
  >,
  InputProps
> = chakra(
  forwardRef<TextInputRefType, InputProps>(
    (props, ref: React.Ref<TextInputRefType>) => {
      const {
        additionalAriaLabel,
        additionalHelperTextIds,
        ["aria-describedby"]: ariaDescribedby,
        autoComplete,
        className,
        defaultValue,
        helperText,
        id,
        invalidText,
        isClearable = false,
        isClearableCallback,
        isDisabled = false,
        isInvalid = false,
        isRequired = false,
        labelText,
        max,
        maxLength,
        min,
        name,
        onChange,
        onClick,
        onFocus,
        pattern,
        placeholder,
        showHelperInvalidText = true,
        showLabel = true,
        showRequiredLabel = true,
        requiredLabelText,
        step = 1,
        textInputType = "default",
        type = "text",
        value,
        ...rest
      } = props;
      const [finalValue, setFinalValue] = useStateWithDependencies(value);
      const closedRef = useRef<HTMLInputElement>();
      const mergedRefs = useMergeRefs(closedRef, ref);
      // If a ref is not passed, then merging refs won't work.
      const finalRef = ref ? mergedRefs : closedRef;
      const styles = useMultiStyleConfig("TextInput", {
        showLabel,
        variant: textInputType,
      });
      const isTextArea = type === "textarea";
      const isHidden = type === "hidden";
      let hasAutocomplete = autoComplete ? true : false;
      const finalInvalidText = invalidText
        ? invalidText
        : "There is an error related to this field.";
      const internalOnChange = (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setFinalValue(e.target.value);
        onChange && onChange(e);
      };
      let footnote: HelperErrorTextType = isInvalid
        ? finalInvalidText
        : helperText;

      if (type === "tel" || type === "url" || type === "email") {
        hasAutocomplete = true;
        const example = TextInputFormats[type] || "";
        footnote = (
          <>
            Ex: {example}
            <br />
            {footnote}
          </>
        );
      }

      const ariaAttributes = {
        ...getAriaAttrs({
          additionalAriaLabel,
          additionalHelperTextIds,
          footnote,
          id,
          labelText,
          name: "TextInput",
          showLabel,
        }),
        // getAriaAttrs returns an object with the key `aria-describedby`,
        // but if we need to override it, we can do so here.
        ...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
      };

      const onClearClick = () => {
        setFinalValue("");
        isClearableCallback && isClearableCallback();
        // Set focus back to the input element.
        closedRef.current?.focus();
      };
      let finalIsInvalid = isInvalid;
      let fieldOutput;
      let clearButtonOutput;
      let options;

      if (!id) {
        console.warn(
          "NYPL Reservoir TextInput: This component's required `id` prop was not passed."
        );
      }

      if (type === "number" && max && min && min > max) {
        finalIsInvalid = true;
        console.warn(
          "NYPL Reservoir TextInput: The `min` prop is greater than the `max` prop."
        );
      }
      // When the type is "hidden", the input element needs fewer attributes.
      options = isHidden
        ? {
            defaultValue,
            id,
            "aria-hidden": isHidden,
            name,
            onChange: internalOnChange,
            ref: finalRef,
          }
        : {
            "aria-required": isRequired,
            /** If the `autoComplete` prop is passed, that value will take
             * precedence and will be used here. Otherwise, a value will be set
             * based on the `type` prop. Lastly, if `autoComplete` is not passed
             * and a default value is not set based on the `type` prop, then
             * `autoComplete` will not be set for the input. */
            autoComplete: hasAutocomplete
              ? autoComplete
                ? autoComplete
                : type
              : null,
            defaultValue,
            id,
            isDisabled,
            isRequired,
            isInvalid: finalIsInvalid,
            max,
            maxLength,
            min,
            name,
            onChange: internalOnChange,
            onClick,
            onFocus,
            pattern,
            placeholder,
            ref: finalRef,
            // The `step` attribute is useful for the number type.
            step: type === "number" ? step : null,
            ...rest,
            ...ariaAttributes,
          };
      // For `input` and `textarea`, all attributes are the same but `input`
      // also needs `type` and `value` to render correctly.
      if (!isTextArea) {
        options = { type, value: finalValue, ...options } as any;
        fieldOutput = <ChakraInput {...options} __css={styles.input} />;
        if (isClearable && !isHidden) {
          clearButtonOutput = (
            <Button
              buttonType="text"
              id={`${id}-clear-btn`}
              onClick={onClearClick}
              sx={styles.clearButton}
            >
              <Icon color="ui.black" name="close" size="medium" />
              <span>Clear {labelText}</span>
            </Button>
          );
        }
      } else {
        if (isClearable) {
          console.warn(
            "NYPL Reservoir TextInput: The `isClearable` prop cannot be used with the `textarea` type."
          );
        }
        fieldOutput = (
          <ChakraTextarea {...options} __css={styles.textarea}>
            {value}
          </ChakraTextarea>
        );
      }

      return (
        <ComponentWrapper
          className={className}
          helperText={!finalIsInvalid ? footnote : helperText}
          id={id}
          invalidText={finalInvalidText}
          isInvalid={finalIsInvalid}
          showHelperInvalidText={showHelperInvalidText && !isHidden}
          __css={styles}
          {...rest}
        >
          {labelText && showLabel && !isHidden && (
            <Label
              htmlFor={id}
              id={`${id}-label`}
              isRequired={showRequiredLabel && isRequired}
              requiredLabelText={requiredLabelText}
            >
              {labelText}
            </Label>
          )}
          <Box position="relative">
            {fieldOutput}
            {!isHidden && finalValue?.length > 0 && clearButtonOutput}
          </Box>
        </ComponentWrapper>
      );
    }
  )
);

export default TextInput;
