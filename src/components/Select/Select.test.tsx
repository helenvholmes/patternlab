import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Select from "./Select";

const baseProps = {
  helperText: "This is the helper text.",
  id: "select",
  labelText: "What is your favorite color?",
  name: "color",
};
const baseOptions = (
  <>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
    <option value="black">Black</option>
    <option value="white">White</option>
  </>
);

describe("Select Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<Select {...baseProps}>{baseOptions}</Select>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with hidden label", async () => {
    const { container } = render(
      <Select {...baseProps} showLabel={false}>
        {baseOptions}
      </Select>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Select", () => {
  it("renders a label, select, option, and helper text DOM elements", () => {
    render(<Select {...baseProps}>{baseOptions}</Select>);

    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
    expect(screen.getByText(/This is the helper text/i)).toBeInTheDocument();
  });

  it("renders a name attribute to use in forms", () => {
    render(<Select {...baseProps}>{baseOptions}</Select>);
    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toHaveAttribute("name", "color");
  });

  it("renders an aria-label attribute when `showLabel` is false", () => {
    const { rerender } = render(<Select {...baseProps}>{baseOptions}</Select>);

    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).not.toHaveAttribute("aria-label");

    rerender(
      <Select {...baseProps} showLabel={false}>
        {baseOptions}
      </Select>
    );
    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toHaveAttribute("aria-label", "What is your favorite color?");
  });

  it("renders aria-describedby when helperText prop is passed", () => {
    const id = "test-describe";
    render(
      <Select {...baseProps} id={id}>
        {baseOptions}
      </Select>
    );

    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toHaveAttribute("aria-describedby", `${id}-helperText`);
  });

  it("renders '(required)' text in the label", () => {
    const { rerender } = render(
      <Select {...baseProps} isRequired>
        {baseOptions}
      </Select>
    );

    expect(screen.getByText(/required/i)).toBeInTheDocument();

    rerender(
      <Select {...baseProps} isRequired showRequiredLabel={false}>
        {baseOptions}
      </Select>
    );
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it("renders required and aria-required attributes when 'showLabel' is false", () => {
    render(
      <Select {...baseProps} isRequired showLabel={false}>
        {baseOptions}
      </Select>
    );
    expect(screen.queryByText(/equired/i)).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toHaveAttribute("aria-required");
    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toHaveAttribute("required");
  });

  it("should not render a required label if 'showRequiredLabel' flag is false, but still render the label", () => {
    render(
      <Select {...baseProps} isRequired showRequiredLabel={false}>
        {baseOptions}
      </Select>
    );
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(/What is your favorite color/i)
    ).toBeInTheDocument();
  });

  it("renders helper text when helperText prop is passed", () => {
    render(<Select {...baseProps}>{baseOptions}</Select>);

    expect(screen.getByText("This is the helper text.")).toBeInTheDocument();
  });

  it("renders default error text when 'invalidText' prop is not passed and 'isInvalid' prop is set to true", () => {
    render(
      <Select {...baseProps} isInvalid>
        {baseOptions}
      </Select>
    );

    expect(
      screen.getByText("There is an error related to this field.")
    ).toBeInTheDocument();
  });

  it("does not render the error text when 'isInvalid' is true and 'showHelperInvalidText' is false", () => {
    render(
      <Select {...baseProps} showHelperInvalidText={false} isInvalid>
        {baseOptions}
      </Select>
    );

    expect(
      screen.queryByText("There is an error related to this field.")
    ).not.toBeInTheDocument();
  });

  it("renders custom error text when 'invalidText' prop is passed and 'isInvalid' prop is set to true", () => {
    render(
      <Select
        {...baseProps}
        invalidText="This is a custom error text!"
        isInvalid
      >
        {baseOptions}
      </Select>
    );
    expect(
      screen.getByText("This is a custom error text!")
    ).toBeInTheDocument();
  });

  it("updates the value through a ref", () => {
    const selectRef = React.createRef<HTMLSelectElement>();
    render(
      <Select {...baseProps} ref={selectRef}>
        {baseOptions}
      </Select>
    );

    expect(selectRef.current?.value).toEqual("red");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "blue" },
    });
    expect(selectRef.current?.value).toEqual("blue");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "white" },
    });
    expect(selectRef.current?.value).toEqual("white");
  });

  it("calls the onChange callback function", () => {
    let value = "";
    const changeCallback = (e: React.FormEvent) => {
      value = (e.target as HTMLInputElement).value;
    };
    render(
      <Select {...baseProps} onChange={changeCallback} value={value}>
        {baseOptions}
      </Select>
    );

    expect(value).toEqual("");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "blue" },
    });
    expect(value).toEqual("blue");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "white" },
    });
    expect(value).toEqual("white");
  });

  it("logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <Select labelText="What is your favorite color?" name="color">
        {baseOptions}
      </Select>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Select: This component's required `id` prop was not passed."
    );
  });

  it("logs a warning when both `onChange` and `defaultValue` are passed", () => {
    const warn = jest.spyOn(console, "warn");
    let value = "defaultValue";
    const changeCallback = (e: React.FormEvent) => {
      value = (e.target as HTMLInputElement).value;
    };
    render(
      <Select {...baseProps} onChange={changeCallback} defaultValue={value}>
        {baseOptions}
      </Select>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Select: Both an `onChange` prop (used for controlled components) and a `defaultValue` prop (used for uncontrolled components) were passed. `defaultValue` will be ignored."
    );
  });

  it("Renders the UI snapshot correctly", () => {
    const siblings = ["Kendall", "Shiv", "Connor", "Roman", "Tom"];
    const options = siblings.map((sibling) => (
      <option key={sibling}>{sibling}</option>
    ));

    const primary = renderer
      .create(
        <Select
          id="select"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const disabled = renderer
      .create(
        <Select
          id="select"
          isDisabled
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const withInvalidText = renderer
      .create(
        <Select
          id="select"
          invalidText="Tom doesn't count as a sibling :(."
          isInvalid
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const withHelperText = renderer
      .create(
        <Select
          helperText="Remember, Logan will judge you no matter who you pick."
          id="select"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const required = renderer
      .create(
        <Select
          id="select"
          isRequired
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const withLabelInline = renderer
      .create(
        <Select
          id="select"
          isRequired
          labelPosition="inline"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
        >
          {options}
        </Select>
      )
      .toJSON();
    const hasOnChange = renderer
      .create(
        <Select
          id="select"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
          onChange={jest.fn()}
        >
          {options}
        </Select>
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Select
          id="chakra"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
          p="20px"
          color="ui.error.primary"
        >
          {options}
        </Select>
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Select
          id="props"
          labelText="Which Succession sibling are you?"
          name="succession-sibling"
          data-testid="props"
        >
          {options}
        </Select>
      )
      .toJSON();

    expect(primary).toMatchSnapshot();
    expect(disabled).toMatchSnapshot();
    expect(withInvalidText).toMatchSnapshot();
    expect(withHelperText).toMatchSnapshot();
    expect(required).toMatchSnapshot();
    expect(withLabelInline).toMatchSnapshot();
    expect(hasOnChange).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref to the select element", () => {
    const ref = React.createRef<HTMLSelectElement>();
    const { container } = render(
      <Select {...baseProps} ref={ref}>
        {baseOptions}
      </Select>
    );

    expect(container.querySelector("select")).toBe(ref.current);
  });
});
