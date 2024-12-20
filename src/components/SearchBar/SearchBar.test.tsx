import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import Heading from "../Heading/Heading";
import SearchBar, { SelectProps, TextInputProps } from "./SearchBar";

const optionsGroup = [
  { text: "Art", value: "art" },
  { text: "Bushes", value: "bushes" },
  { text: "Clothing", value: "clothing" },
  { text: "Flowers", value: "flowers" },
  { text: "Fossils", value: "fossils" },
  { text: "Fruits", value: "fruits" },
  { text: "Furniture", value: "furniture" },
  { text: "Songs", value: "songs" },
  { text: "Tools", value: "tools" },
  { text: "Villagers", value: "villagers" },
];
const selectProps: SelectProps = {
  name: "selectName",
  labelText: "Select a category",
  optionsData: optionsGroup,
  value: "Songs",
};
const textInputProps: TextInputProps = {
  labelText: "Item Search",
  name: "textInputName",
  placeholder: "Item Search",
};
const labelText = "SearchBar label";
const helperText = "Search for items in Animal Crossing New Horizons";
const invalidText = "Could not find the item :(";

describe("SearchBar Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(
      <SearchBar
        helperText={helperText}
        id="id"
        invalidText={invalidText}
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={textInputProps}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with `clear` button", async () => {
    const { container } = render(
      <SearchBar
        helperText={helperText}
        id="id"
        invalidText={invalidText}
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={{
          isClearable: true,
          value: "input value",
          ...textInputProps,
        }}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with a Select component", async () => {
    const { container } = render(
      <SearchBar
        helperText={helperText}
        id="id"
        invalidText={invalidText}
        labelText={labelText}
        onSubmit={jest.fn()}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SearchBar", () => {
  const searchBarSubmit = jest.fn();
  const buttonCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the basic form", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        textInputProps={textInputProps}
      />
    );
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("search")).toHaveAttribute(
      "aria-label",
      `${labelText} - ${helperText}`
    );
    expect(screen.getByPlaceholderText("Item Search")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders a custom heading level", () => {
    render(
      <SearchBar
        headingText={<Heading level="h4">Custom Heading</Heading>}
        id="id-custom-heading"
        onSubmit={searchBarSubmit}
        labelText="SearchBar label"
      />
    );
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("renders an optional Select component", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("Select a category")).toBeInTheDocument();
  });

  it("renders the invalid text in the invalid state", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        invalidText={invalidText}
        isInvalid
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(
      screen.getByText(`There was a problem. ${invalidText}`)
    ).toBeInTheDocument();
    expect(screen.queryByText(helperText)).not.toBeInTheDocument();
  });

  it("does not render the default invalid text from the Select or TextInput components", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        invalidText={invalidText}
        isInvalid
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(
      screen.queryByText("There is an error related to this field.")
    ).not.toBeInTheDocument();
  });

  it("calls the TextInput onChange callback function", () => {
    textInputProps.onChange = jest.fn();

    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        textInputProps={textInputProps}
      />
    );
    const input = screen.getByLabelText(textInputProps.labelText);
    expect(textInputProps.onChange).toHaveBeenCalledTimes(0);

    userEvent.type(input, "search!");

    // Seven times for every letter in the search string
    expect(textInputProps.onChange).toHaveBeenCalledTimes(7);
  });

  it("renders a `clear` button and clears the input field when clicked", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={{
          isClearable: true,
          ...textInputProps,
        }}
      />
    );
    // The `labelText` value is "Item Search".
    let clearButton = screen.queryByRole("button", {
      name: "Clear Item Search",
    });

    // Renders when `isClearable` is true and the input has a value.
    expect(clearButton).not.toBeInTheDocument();

    // Type some value
    userEvent.type(screen.getByRole("textbox"), "text value");

    expect(screen.getByRole("textbox")).toHaveValue("text value");
    clearButton = screen.queryByRole("button", {
      name: "Clear Item Search",
    });
    expect(clearButton).toBeInTheDocument();

    // Click on the clear button
    userEvent.click(clearButton);
    // The text should no longer be in the input field.
    expect(screen.getByRole("textbox")).toHaveValue("");
    // The clear button does not render.
    expect(clearButton).not.toBeInTheDocument();
  });

  it("calls the isClearableCallback function for the `TextInput` component when `isClearable` is true", () => {
    let called = false;

    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={{
          ...textInputProps,
          isClearable: true,
          isClearableCallback: () => {
            called = true;
          },
        }}
      />
    );

    // Type some value
    userEvent.type(screen.getByRole("textbox"), "text value");

    let clearButton = screen.queryByRole("button", {
      name: "Clear Item Search",
    });

    // The `isClearableCallback` function should not be called.
    expect(called).toEqual(false);

    // Click on the clear button
    userEvent.click(clearButton);

    // But now it should!
    expect(called).toEqual(true);
  });

  it("calls the Select onChange callback function", () => {
    let selectValue = "Songs";
    selectProps.onChange = (e) => (selectValue = (e.target as any).value);
    selectProps.value = selectValue;

    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    const select = screen.getByLabelText(selectProps.labelText);
    expect(selectValue).toEqual("Songs");

    userEvent.selectOptions(select, "Flowers");
    expect(selectValue).toEqual("flowers");

    userEvent.selectOptions(select, "Furniture");
    expect(selectValue).toEqual("furniture");
  });

  it("calls the callback function for the Button component ", () => {
    render(
      <SearchBar
        buttonOnClick={buttonCallback}
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(buttonCallback).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByRole("button"));
    expect(buttonCallback).toHaveBeenCalledTimes(1);
  });

  it("calls the callback function on submit ", () => {
    render(
      <SearchBar
        helperText={helperText}
        id="id"
        labelText={labelText}
        onSubmit={searchBarSubmit}
        selectProps={selectProps}
        textInputProps={textInputProps}
      />
    );
    expect(searchBarSubmit).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByRole("button"));
    expect(searchBarSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders a default placeholder", () => {
    const textInputProps: TextInputProps = {
      labelText: "Item Search",
      name: "textInputName",
    };

    render(
      <SearchBar
        id="requiredState"
        isDisabled
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={textInputProps}
      />
    );

    expect(screen.getByPlaceholderText("Search terms")).toBeInTheDocument();
  });

  it("sets additional TextInput props", () => {
    const textInputProps: TextInputProps = {
      labelText: "Enter 5-digit zip code",
      maxLength: 5,
      name: "textInputName",
      pattern: "[0-9]+",
      placeholder: "Item Search",
    };

    render(
      <SearchBar
        id="requiredZipCode"
        isDisabled
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={textInputProps}
      />
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("pattern", "[0-9]+");
    expect(input).toHaveAttribute("maxlength", "5");
  });

  it("renders 'required' in the placeholder text", () => {
    const { rerender } = render(
      <SearchBar
        id="requiredState"
        isDisabled
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={textInputProps}
      />
    );

    expect(
      screen.queryByPlaceholderText("Item Search (required)")
    ).not.toBeInTheDocument();

    rerender(
      <SearchBar
        id="requiredState"
        isDisabled
        isRequired
        labelText={labelText}
        onSubmit={jest.fn()}
        textInputProps={textInputProps}
      />
    );
    expect(
      screen.getByPlaceholderText("Item Search (required)")
    ).toBeInTheDocument();
  });

  it("logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <SearchBar labelText={labelText} onSubmit={jest.fn()} />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir SearchBar: This component's required `id` prop was not passed."
    );
  });

  it("renders the UI snapshot correctly", () => {
    const basic = renderer
      .create(
        <SearchBar
          helperText={helperText}
          id="basic"
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const withSelect = renderer
      .create(
        <SearchBar
          helperText={helperText}
          id="withSelect"
          labelText={labelText}
          onSubmit={jest.fn()}
          selectProps={selectProps}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const withoutHelperText = renderer
      .create(
        <SearchBar
          id="withoutHelperText"
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const withClearButton = renderer
      .create(
        <SearchBar
          helperText={helperText}
          id="withClearButton"
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={{
            isClearable: true,
            ...textInputProps,
          }}
        />
      )
      .toJSON();
    const invalidState = renderer
      .create(
        <SearchBar
          id="invalidState"
          isInvalid
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const disabledState = renderer
      .create(
        <SearchBar
          id="disabledState"
          isDisabled
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const requiredState = renderer
      .create(
        <SearchBar
          id="requiredState"
          isDisabled
          isRequired
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const noBrandButtonType = renderer
      .create(
        <SearchBar
          id="noBrandButtonType"
          isDisabled
          isRequired
          labelText={labelText}
          noBrandButtonType={true}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
        />
      )
      .toJSON();
    const withHeading = renderer
      .create(
        <SearchBar
          id="withHeading"
          labelText={labelText}
          onSubmit={jest.fn()}
          headingText="A Heading"
        />
      )
      .toJSON();
    const withDescription = renderer
      .create(
        <SearchBar
          id="withDescription"
          labelText={labelText}
          onSubmit={jest.fn()}
          descriptionText="A description"
        />
      )
      .toJSON();
    const withHeadingAndDescription = renderer
      .create(
        <SearchBar
          id="withHeadingAndDescription"
          labelText={labelText}
          onSubmit={jest.fn()}
          headingText="A Heading"
          descriptionText="A description"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <SearchBar
          helperText={helperText}
          id="chakra"
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <SearchBar
          helperText={helperText}
          id="props"
          labelText={labelText}
          onSubmit={jest.fn()}
          textInputProps={textInputProps}
          data-testid="props"
        />
      )
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(withSelect).toMatchSnapshot();
    expect(withoutHelperText).toMatchSnapshot();
    expect(withClearButton).toMatchSnapshot();
    expect(invalidState).toMatchSnapshot();
    expect(disabledState).toMatchSnapshot();
    expect(requiredState).toMatchSnapshot();
    expect(noBrandButtonType).toMatchSnapshot();
    expect(withHeading).toMatchSnapshot();
    expect(withDescription).toMatchSnapshot();
    expect(withHeadingAndDescription).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <SearchBar
        helperText={helperText}
        id="ref"
        labelText={labelText}
        onSubmit={jest.fn()}
        ref={ref}
        textInputProps={textInputProps}
      />
    );

    expect(container.querySelector("div")).toBe(ref.current);
  });
});
