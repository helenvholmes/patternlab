import {
  Box,
  ChakraComponent,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Button from "../Button/Button";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { HelperErrorTextType } from "../HelperErrorText/HelperErrorText";
import Icon from "../Icons/Icon";
import Select, { SelectProps as InitialSelectProps } from "../Select/Select";
import TextInput, {
  InputProps as InitialInputProps,
} from "../TextInput/TextInput";
import useNYPLBreakpoints from "../../hooks/useNYPLBreakpoints";

interface SelectOptionsProps {
  text: string;
  value: string;
}

// Internal types that are used only for `SearchBar` props. View the
// respective `Select` and `TextInput` components to get full details
// of each prop type value.

// From the `Select` component, we only need a certain set of optional props,
// except for `optionsData`.
export type SelectProps = Partial<
  Pick<InitialSelectProps, "id" | "labelText" | "name" | "onChange" | "value">
> & {
  optionsData: SelectOptionsProps[];
};
// From the `TextInput` component, we only need a certain set of optional props.
export type TextInputProps = Pick<InitialInputProps, "labelText" | "name"> &
  Partial<
    Pick<
      InitialInputProps,
      | "defaultValue"
      | "id"
      | "isClearable"
      | "isClearableCallback"
      | "max"
      | "maxLength"
      | "min"
      | "onChange"
      | "pattern"
      | "placeholder"
      | "value"
    >
  >;

export interface SearchBarProps {
  /** Adds 'action' property to the `form` element. */
  action?: string;
  /** The onClick callback function for the `Button` component. */
  buttonOnClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** A class name for the `form` element. */
  className?: string;
  /** Optional string for the SearchBar's description above the component. */
  descriptionText?: string;
  /** Optional string value used to set the text for a `Heading` component, or
   * a DS Heading component that can be passed in.
   */
  headingText?: string | JSX.Element;
  /** The text to display below the form in a `HelperErrorText` component. */
  helperText?: HelperErrorTextType;
  /** ID that other components can cross reference for accessibility purposes */
  id: string;
  /** Optional string to populate the `HelperErrorText` for the error state
   * when `isInvalid` is true. */
  invalidText?: HelperErrorTextType;
  /** Sets children form components in the disabled state. */
  isDisabled?: boolean;
  /** Sets children form components in the error state. */
  isInvalid?: boolean;
  /** Sets children form components in the required state. */
  isRequired?: boolean;
  /** Populates the `aria-label` attribute on the form element. */
  labelText: string;
  /** Adds 'method' property to the `form` element. */
  method?: string;
  /** Sets the `Button` variant type to `noBrand` when true;
   * false by default which sets the type to `primary`. */
  noBrandButtonType?: boolean;
  /** Handler function when the form is submitted. */
  onSubmit: (event: React.FormEvent) => void;
  /** Required props to render a `Select` element. */
  selectProps?: SelectProps | undefined;
  /** Custom input element to render instead of a `TextInput` element. */
  textInputElement?: JSX.Element;
  /** Required props to render a `TextInput` element. */
  textInputProps?: TextInputProps | undefined;
}

/**
 * Renders a wrapper `form` element to be used with `Select` (optional),
 * `Input`, and `Button` components together.
 */
export const SearchBar: ChakraComponent<
  React.ForwardRefExoticComponent<
    SearchBarProps & React.RefAttributes<HTMLDivElement>
  >,
  SearchBarProps
> = chakra(
  forwardRef<HTMLDivElement, SearchBarProps>((props, ref?) => {
    const {
      action,
      buttonOnClick,
      className,
      descriptionText,
      headingText,
      helperText,
      id,
      invalidText,
      isDisabled = false,
      isInvalid = false,
      isRequired = false,
      labelText,
      method,
      noBrandButtonType = false,
      onSubmit,
      selectProps,
      textInputElement,
      textInputProps,
      ...rest
    } = props;
    const styles = useMultiStyleConfig("SearchBar", {});
    const stateProps = {
      helperText: "",
      isDisabled,
      isInvalid,
      isRequired,
      showHelperInvalidText: false,
      showLabel: false,
    };
    const footnote = isInvalid ? invalidText : helperText;
    const finalAriaLabel = footnote ? `${labelText} - ${footnote}` : labelText;
    const inputPlaceholder = textInputProps?.placeholder || "Search terms";
    const textInputPlaceholder = `${inputPlaceholder} ${
      isRequired ? "(required)" : ""
    }`;
    const buttonType = noBrandButtonType ? "noBrand" : "primary";
    const { isLargerThanMobile } = useNYPLBreakpoints();
    const iconSize = isLargerThanMobile ? "small" : "medium";

    if (!id) {
      console.warn(
        "NYPL Reservoir SearchBar: This component's required `id` prop was not passed."
      );
    }
    // Render the `Select` component.
    const selectElem = selectProps && (
      <Select
        id={selectProps?.id || `searchbar-select-${id}`}
        labelText={selectProps?.labelText}
        name={selectProps?.name}
        onChange={selectProps?.onChange}
        selectType="searchbar"
        value={selectProps?.value}
        __css={styles.select}
        {...stateProps}
      >
        {selectProps?.optionsData.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    );
    // Render the `TextInput` component.
    const textInputNative = textInputProps && (
      <TextInput
        aria-describedby={footnote ? `${id}-helperText` : undefined}
        className="textInput"
        defaultValue={textInputProps?.defaultValue}
        id={textInputProps?.id || `searchbar-textinput-${id}`}
        isClearable={textInputProps?.isClearable}
        isClearableCallback={textInputProps?.isClearableCallback}
        labelText={textInputProps?.labelText}
        name={textInputProps?.name}
        max={textInputProps?.max}
        maxLength={textInputProps?.maxLength}
        min={textInputProps?.min}
        onChange={textInputProps?.onChange}
        pattern={textInputProps?.pattern}
        placeholder={textInputPlaceholder}
        textInputType={selectElem ? "searchBarSelect" : "searchBar"}
        type="text"
        value={textInputProps?.value}
        sx={{
          "div > input": {
            borderLeftRadius: isLargerThanMobile && selectElem ? 0 : "sm",
          },
        }}
        {...stateProps}
      />
    );
    // Render the `Button` component.
    const buttonElem = (
      <Button
        className="searchButton"
        buttonType={buttonType}
        id={`searchbar-button-${id}`}
        isDisabled={isDisabled}
        onClick={buttonOnClick}
        type="submit"
        sx={styles.button}
        data-button
        aria-label={isLargerThanMobile ? "" : "Search"}
      >
        <Icon
          align="left"
          id={`searchbar-icon-${id}`}
          name="search"
          size={iconSize}
        />
        <span>Search</span>
      </Button>
    );
    // If a custom input element was passed, use that element
    // instead of the DS `TextInput` component.
    const textInputElem = textInputElement || textInputNative;

    return (
      <ComponentWrapper
        descriptionText={descriptionText}
        headingText={headingText}
        helperText={helperText}
        id={id}
        invalidText={
          invalidText ? `There was a problem. ${invalidText}` : undefined
        }
        isInvalid={isInvalid}
        ref={ref}
        sx={{ containerType: "inline-size" }}
        {...rest}
      >
        <Box
          as="form"
          id={`searchbar-form-${id}`}
          className={className}
          role="search"
          aria-label={finalAriaLabel}
          onSubmit={onSubmit}
          method={method}
          action={action}
          __css={styles}
        >
          {selectElem}
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {textInputElem}
            {buttonElem}
          </Box>
        </Box>
      </ComponentWrapper>
    );
  })
);

export default SearchBar;
