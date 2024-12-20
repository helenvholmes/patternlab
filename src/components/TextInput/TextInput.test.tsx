import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import React from "react";
import renderer from "react-test-renderer";

import TextInput, { TextInputRefType } from "./TextInput";

describe("TextInput Accessibility", () => {
  it("passes axe accessibility test for the input element", async () => {
    const { container } = render(
      <TextInput
        id="textInput"
        isRequired
        labelText="Custom input label"
        onChange={jest.fn()}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with hidden label", async () => {
    const { container } = render(
      <TextInput
        id="textInput"
        isRequired
        labelText="Custom input label"
        onChange={jest.fn()}
        placeholder="Input Placeholder"
        showLabel={false}
        type="text"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with `clear` button", async () => {
    const { container } = render(
      <TextInput
        id="textInput"
        isClearable
        labelText="Custom input label"
        onChange={jest.fn()}
        placeholder="Input Placeholder"
        type="text"
        value="input value"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for the textarea element", async () => {
    const { container } = render(
      <TextInput
        id="textInput"
        isRequired
        labelText="Custom textarea label"
        onChange={jest.fn()}
        placeholder="Input Placeholder"
        type="textarea"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("TextInput", () => {
  let changeHandler: jest.MockedFunction<() => void>;
  let utils: RenderResult;

  beforeEach(() => {
    changeHandler = jest.fn();
    utils = render(
      <TextInput
        helperText="Custom Helper Text"
        id="myTextInput"
        isRequired
        labelText="Custom Input Label"
        onChange={changeHandler}
        placeholder="Input Placeholder"
        type="text"
      />
    );
  });

  it("renders an input element", () => {
    expect(screen.getByLabelText(/Custom Input Label/i)).toBeInTheDocument();
  });

  it("renders label with label text", () => {
    expect(screen.getByText("Custom Input Label")).toBeInTheDocument();
  });

  it("renders 'required' along with the label text", () => {
    expect(screen.getByText("Custom Input Label")).toBeInTheDocument();
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it("adds aria-describedby attribute", async () => {
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "myTextInput-helperText"
    );

    utils.rerender(
      <TextInput
        helperText="Custom Email Helper Text"
        id="myEmailInput"
        isRequired
        labelText="Custom Email Input Label"
        onChange={changeHandler}
        placeholder="Email Input Placeholder"
        type="email"
      />
    );

    await waitFor(() =>
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "myEmailInput-helperText"
      )
    );
  });

  it("has an 'autocomplete' attribute if the type is 'email', 'tel', or 'url'", () => {
    expect(screen.getByRole("textbox")).not.toHaveAttribute("autocomplete");

    utils.rerender(
      <TextInput
        id="myEmailInput"
        labelText="Custom Email Input Label"
        onChange={changeHandler}
        type="email"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "autocomplete",
      "email"
    );

    utils.rerender(
      <TextInput
        id="myTelInput"
        labelText="Custom Tel Input Label"
        onChange={changeHandler}
        type="tel"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "tel");

    utils.rerender(
      <TextInput
        id="myURLInput"
        labelText="Custom URL Input Label"
        onChange={changeHandler}
        type="url"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "url");
  });

  it("has an 'autocomplete' attribute if the `autoComplete` prop is set", () => {
    expect(screen.getByRole("textbox")).not.toHaveAttribute("autocomplete");

    utils.rerender(
      <TextInput
        autoComplete="name"
        id="myEmailInput"
        labelText="Custom Email Input Label"
        onChange={changeHandler}
        type="text"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "name");

    utils.rerender(
      <TextInput
        autoComplete="off"
        id="myTelInput"
        labelText="Custom Tel Input Label"
        onChange={changeHandler}
        type="text"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "off");

    utils.rerender(
      <TextInput
        autoComplete="username"
        id="myURLInput"
        labelText="Custom URL Input Label"
        onChange={changeHandler}
        type="email"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "autocomplete",
      "username"
    );
  });

  it("does not render '(required)' along with the label text", () => {
    utils.rerender(
      <TextInput
        id="myTextInput"
        isRequired
        labelText="Custom Input Label"
        onChange={changeHandler}
        placeholder="Input Placeholder"
        showRequiredLabel={false}
        type="text"
      />
    );

    expect(screen.getByText("Custom Input Label")).toBeInTheDocument();
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it("renders a custom 'required' along with the label text", () => {
    utils.rerender(
      <TextInput
        id="myTextInput"
        isRequired
        requiredLabelText="Obligatoire"
        labelText="Custom Input Label"
        onChange={changeHandler}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    expect(screen.getByText("Custom Input Label")).toBeInTheDocument();
    expect(screen.getByText(/Obligatoire/i)).toBeInTheDocument();
  });

  it("does not render a custom '(required)' along with the label text", () => {
    utils.rerender(
      <TextInput
        id="myTextInput"
        isRequired
        requiredLabelText="Obligatoire"
        labelText="Custom Input Label"
        onChange={changeHandler}
        placeholder="Input Placeholder"
        showRequiredLabel={false}
        type="text"
      />
    );

    expect(screen.getByText("Custom Input Label")).toBeInTheDocument();
    expect(screen.queryByText(/Obligatoire/i)).not.toBeInTheDocument();
  });

  it("does not render the label but adds it as an aria-label attribute", () => {
    utils.rerender(
      <TextInput
        id="myTextInput"
        isRequired
        labelText="Custom Input Label"
        onChange={changeHandler}
        placeholder="Input Placeholder"
        showLabel={false}
        type="text"
      />
    );

    expect(screen.queryByText(/Custom Input Label/i)).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-label",
      "Custom Input Label"
    );
  });

  it("renders the invalid state and shows the invalid text", () => {
    utils.rerender(
      <TextInput
        helperText="Custom Helper Text"
        id="myTextInputError"
        invalidText="Custom Error Text"
        isInvalid
        labelText="Custom Input Label"
        placeholder="Input Placeholder"
        type="text"
      />
    );

    expect(screen.queryByText("Custom Helper Text")).not.toBeInTheDocument();
    expect(screen.getByText("Custom Error Text")).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom Input Label/i)).toHaveAttribute(
      "aria-invalid"
    );
  });

  it("does not render the invalid text when 'showHelperInvalidText' is set to false", () => {
    utils.rerender(
      <TextInput
        helperText="Custom Helper Text"
        id="myTextInputError"
        invalidText="Custom Error Text"
        isInvalid
        labelText="Custom Input Label"
        placeholder="Input Placeholder"
        showHelperInvalidText={false}
        type="text"
      />
    );
    expect(screen.queryByText("Custom Helper Text")).not.toBeInTheDocument();
    expect(screen.queryByText("Custom Error Text")).not.toBeInTheDocument();
  });

  it("renders label's `for` attribute pointing at ID from input", () => {
    expect(screen.getByText(/Custom Input Label/i)).toHaveAttribute(
      "for",
      "myTextInput"
    );
  });

  it("renders placeholder text", () => {
    expect(
      screen.getByPlaceholderText("Input Placeholder")
    ).toBeInTheDocument();
  });

  it("adds aria-required prop if input is required", () => {
    expect(screen.getByLabelText(/Custom Input Label/i)).toHaveAttribute(
      "aria-required"
    );
  });

  it("calls the onChange handler function", () => {
    expect(changeHandler).toHaveBeenCalledTimes(0);
    userEvent.type(screen.getByLabelText(/Custom Input Label/i), "Hello");
    // Called 5 times because "Hello" has length of 5.
    expect(changeHandler).toHaveBeenCalledTimes(5);
  });

  it("has a maxlength for the input element", () => {
    const onChangeSpy = jest.fn();
    utils.rerender(
      <TextInput
        id="inputID-attributes"
        labelText="Input Label"
        maxLength={10}
        onChange={onChangeSpy}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    expect(screen.getByLabelText(/Input Label/i)).toHaveAttribute(
      "maxLength",
      "10"
    );
  });

  it("has a pattern for the input element", () => {
    const onChangeSpy = jest.fn();
    utils.rerender(
      <TextInput
        id="inputID-attributes"
        labelText="Input Label"
        pattern="[0-9]+"
        onChange={onChangeSpy}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    expect(screen.getByLabelText(/Input Label/i)).toHaveAttribute(
      "pattern",
      "[0-9]+"
    );
  });

  it("renders a `clear` button and clears the input field when clicked", () => {
    const onChangeSpy = jest.fn();

    utils.rerender(
      <TextInput
        id="isClearable"
        isClearable
        labelText="Input Label"
        maxLength={10}
        onChange={onChangeSpy}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    let clearButton = screen.queryByRole("button");

    // Renders when `isClearable` is true and the input has a value.
    expect(clearButton).not.toBeInTheDocument();

    // Type some value
    userEvent.type(screen.getByRole("textbox"), "text value");

    expect(screen.getByRole("textbox")).toHaveValue("text value");
    clearButton = screen.queryByRole("button");
    expect(clearButton).toBeInTheDocument();

    // Click on the clear button
    userEvent.click(clearButton);
    // The text should no longer be in the input field.
    expect(screen.getByRole("textbox")).toHaveValue("");
    // The clear button does not render.
    expect(clearButton).not.toBeInTheDocument();
  });

  it("calls the `isClearableCallback` when the clear button is clicked for controlled TextInput", () => {
    let value = "";
    const setValue = (v) => {
      value = v;
    };

    utils.rerender(
      <TextInput
        id="isClearable"
        isClearable
        isClearableCallback={() => setValue("")}
        labelText="Input Label"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Input Placeholder"
        type="text"
        value={value}
      />
    );
    let clearButton = screen.queryByRole("button");

    // Type some value
    userEvent.type(screen.getByRole("textbox"), "text value");

    expect(screen.getByRole("textbox")).toHaveValue("text value");
    clearButton = screen.queryByRole("button");

    // Click on the clear button
    userEvent.click(clearButton);
    // The text should no longer be in the input field.
    expect(screen.getByRole("textbox")).toHaveValue("");
    // The clear button does not render.
    expect(clearButton).not.toBeInTheDocument();
  });

  it("returns focus to the input field when the `clear` button is clicked", () => {
    const onChangeSpy = jest.fn();

    utils.rerender(
      <TextInput
        id="inputID-attributes"
        isClearable
        labelText="Input Label"
        maxLength={10}
        onChange={onChangeSpy}
        placeholder="Input Placeholder"
        type="text"
      />
    );
    let inputElement = screen.getByRole("textbox");
    let clearButton;

    // Type some value
    userEvent.type(inputElement, "text value");
    clearButton = screen.queryByRole("button");
    expect(clearButton).toBeInTheDocument();

    // Click on the clear button
    userEvent.click(clearButton);

    // The text should no longer be in the input field.
    expect(inputElement).toHaveValue("");
    expect(inputElement).toHaveFocus();
  });

  it("logs a warning for the number type when the min prop is greater than the max prop", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <TextInput
        id="input-number"
        labelText="Input Label"
        max={20}
        min={50}
        type="number"
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir TextInput: The `min` prop is greater than the `max` prop."
    );
  });

  it("logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <TextInput labelText="Custom Input Label" />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir TextInput: This component's required `id` prop was not passed."
    );
  });

  it("logs a warning when `isClearable` is set to true for `textarea` type", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <TextInput
        id="isClearable-warningn"
        isClearable
        labelText="Custom Input Label"
        type="textarea"
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir TextInput: The `isClearable` prop cannot be used with the `textarea` type."
    );
  });
});

describe("Forwarding refs", () => {
  it("Passes the ref to the input element", () => {
    const ref = React.createRef<TextInputRefType>();
    const { container } = render(
      <TextInput
        id="inputID-attributes"
        labelText="Input Label"
        placeholder={"Input Placeholder"}
        type="text"
        ref={ref}
      />
    );
    expect(container.querySelector("input")).toEqual(ref.current);
  });

  it("Passes the ref to the textarea element", () => {
    const ref = React.createRef<TextInputRefType>();
    const { container } = render(
      <TextInput
        id="inputID-attributes"
        labelText="Input Label"
        placeholder={"Input Placeholder"}
        type="textarea"
        ref={ref}
      />
    );
    expect(container.querySelector("textarea")).toEqual(ref.current);
  });
});

describe("Hidden input", () => {
  it("renders a hidden type input", () => {
    const utils = render(
      <TextInput
        id="inputID-hidden"
        labelText="Hidden Input Label"
        type="hidden"
        value="hidden"
      />
    );

    expect(utils.container.querySelector("#inputID-hidden")).toHaveAttribute(
      "aria-hidden"
    );
    expect(utils.container.querySelector("#inputID-hidden")).toHaveAttribute(
      "value",
      "hidden"
    );
  });

  it("does not show the helper text", () => {
    render(
      <TextInput
        helperText="Helper Text"
        id="inputID-hidden"
        labelText="Hidden Input Label"
        type="hidden"
        value="hidden"
      />
    );

    expect(screen.queryByText("Hidden Input Label")).not.toBeInTheDocument();
    expect(screen.queryByText("Helper Text")).not.toBeInTheDocument();
  });
});

describe("Textarea element type", () => {
  beforeEach(() => {
    render(
      <TextInput
        id="myTextarea"
        labelText="Custom textarea Label"
        placeholder="Textarea Placeholder"
        type="textarea"
      />
    );
  });

  it("renders a textarea element", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label with label text", () => {
    expect(screen.getByLabelText(/Custom textarea Label/i)).toBeInTheDocument();
  });
});

describe("UI Snapshots", () => {
  it("renders the text input UI snapshot correctly", () => {
    const basicTextarea = renderer
      .create(
        <TextInput
          id="myTextarea"
          labelText="Custom textarea Label"
          placeholder="Textarea Placeholder"
          type="textarea"
        />
      )
      .toJSON();
    const required = renderer
      .create(
        <TextInput
          id="myTextInput"
          isRequired
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const requiredLabelText = renderer
      .create(
        <TextInput
          id="myTextInput"
          isRequired
          requiredLabelText="Obiligatoire"
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const optional = renderer
      .create(
        <TextInput
          id="myTextInput"
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const hiddenLabelText = renderer
      .create(
        <TextInput
          id="myTextInput"
          isRequired
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          showLabel={false}
          type="text"
        />
      )
      .toJSON();
    const withHelperText = renderer
      .create(
        <TextInput
          helperText="Custom helper text"
          id="myTextInput"
          isRequired
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const errorState = renderer
      .create(
        <TextInput
          id="myTextInput"
          isInvalid
          isRequired
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const disabledState = renderer
      .create(
        <TextInput
          id="myTextInput"
          isDisabled
          isRequired
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const withClearButton = renderer
      .create(
        <TextInput
          id="myTextInput"
          isClearable
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <TextInput
          id="chakra"
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <TextInput
          id="props"
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
          data-testid="props"
        />
      )
      .toJSON();
    const withCustomAutoComplete = renderer
      .create(
        <TextInput
          autoComplete="name"
          id="autocomplete"
          labelText="Custom Input Label"
          placeholder="Input Placeholder"
          type="text"
        />
      )
      .toJSON();

    expect(basicTextarea).toMatchSnapshot();
    expect(required).toMatchSnapshot();
    expect(requiredLabelText).toMatchSnapshot();
    expect(optional).toMatchSnapshot();
    expect(hiddenLabelText).toMatchSnapshot();
    expect(withHelperText).toMatchSnapshot();
    expect(errorState).toMatchSnapshot();
    expect(disabledState).toMatchSnapshot();
    expect(withClearButton).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
    expect(withCustomAutoComplete).toMatchSnapshot();
  });

  it("passes a ref to the input element", () => {
    const ref = React.createRef<TextInputRefType>();
    const { container } = render(
      <TextInput id="ref" labelText="Custom Label" ref={ref} />
    );

    expect(container.querySelector("input")).toBe(ref.current);
  });
});
