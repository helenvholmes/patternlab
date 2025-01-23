import { Flex, Spacer } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Radio from "../Radio/Radio";
import RadioGroup from "./RadioGroup";

describe("Radio Accessibility", () => {
  it("passes axe accessibility with string labels", async () => {
    const { container } = render(
      <RadioGroup
        id="radioGroup"
        labelText="RadioGroup example"
        name="a11y-test"
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
        <Radio id="radio5" value="5" labelText="Radio 5" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility with jsx labels", async () => {
    const { container } = render(
      <RadioGroup
        id="radioGroup"
        labelText="RadioGroup example"
        name="a11y-test"
        isFullWidth
      >
        <Radio
          id="arts"
          labelText={
            <Flex>
              <span>Arts</span>
              <Spacer />
              <span>4</span>
            </Flex>
          }
          value="arts"
        />
        <Radio
          id="English"
          labelText={
            <Flex>
              <span>English</span>
              <Spacer />
              <span>23</span>
            </Flex>
          }
          value="English"
        />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("passes axe accessibility with the title hidden", async () => {
    const { container } = render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test3"
        helperText="This is the helper text for the full group."
        invalidText="This is the error text :("
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Radio Button", () => {
  it("renders with radio inputs and a label", () => {
    render(
      <RadioGroup id="radioGroup" labelText="Test Label" name="test1">
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(screen.getByText(/Test Label/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByText("Radio 2")).toBeInTheDocument();
    expect(screen.getByText("Radio 3")).toBeInTheDocument();
    expect(screen.getByText("Radio 4")).toBeInTheDocument();
  });

  it("span element is available in the DOM when 'showLabel' prop is set to true or false", () => {
    const { container, rerender } = render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test2"
        showLabel={true}
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(container.querySelectorAll("span")[0]).toBeVisible();
    expect(container.querySelectorAll("span")[0]).toHaveTextContent(
      "Test Label"
    );

    rerender(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test2"
        showLabel={false}
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(container.querySelectorAll("span")[0]).toBeVisible();
    expect(container.querySelectorAll("span")[0]).toHaveTextContent(
      "Test Label"
    );
  });

  it("renders visible helper or error text", () => {
    const { rerender } = render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test3"
        helperText="This is the helper text for the full group."
        invalidText="This is the error text :("
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(
      screen.getByText("This is the helper text for the full group.")
    ).toBeVisible();
    expect(
      screen.queryByText("This is the error text :(")
    ).not.toBeInTheDocument();

    rerender(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test4"
        helperText="This is the helper text for the full group."
        invalidText="This is the error text :("
        isInvalid
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(screen.getByText("This is the error text :(")).toBeVisible();
    expect(
      screen.queryByText("This is the helper text for the full group.")
    ).not.toBeInTheDocument();
  });

  it("sets the next value through the onChange function", () => {
    let newValue = "";
    const onChange = (value: string) => {
      newValue = value;
    };
    render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="getValue"
        defaultValue="4"
        onChange={onChange}
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );

    expect(newValue).toEqual("");
    userEvent.click(screen.getByText("Radio 3"));
    expect(newValue).toEqual("3");
    userEvent.click(screen.getByText("Radio 2"));
    expect(newValue).toEqual("2");
  });

  it("sets the 'disabled' attribute for all its Radio children", () => {
    render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test7"
        isDisabled
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute("disabled");
    expect(radios[1]).toHaveAttribute("disabled");
    expect(radios[2]).toHaveAttribute("disabled");
  });

  it("sets the 'required' attribute for all its Radio children", () => {
    render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test8"
        isRequired
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute("required");
    expect(radios[0]).toHaveAttribute("aria-required");
    expect(radios[1]).toHaveAttribute("required");
    expect(radios[1]).toHaveAttribute("aria-required");
    expect(radios[2]).toHaveAttribute("required");
    expect(radios[2]).toHaveAttribute("aria-required");
  });

  it("sets the error state for all its Radio children", () => {
    render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test9"
        isInvalid
        invalidText="There is an error :("
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute("aria-invalid");
    expect(radios[1]).toHaveAttribute("aria-invalid");
    expect(radios[2]).toHaveAttribute("aria-invalid");
    expect(screen.getByText("There is an error :(")).toBeInTheDocument();
  });

  it("does not render the error text when 'showHelperInvalidText' is false", () => {
    render(
      <RadioGroup
        id="radioGroup"
        labelText="Test Label"
        name="test10"
        isInvalid
        invalidText="There is an error :("
        showHelperInvalidText={false}
      >
        <Radio id="radio2" value="2" labelText="Radio 2" />
        <Radio id="radio3" value="3" labelText="Radio 3" />
        <Radio id="radio4" value="4" labelText="Radio 4" />
      </RadioGroup>
    );
    expect(screen.queryByText("There is an error :(")).not.toBeInTheDocument();
  });

  it("should throw warning when a non-Radio component is used as a child", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <RadioGroup labelText="wrong child!" name="wrong" id="wrong-child">
        <p>This is wrong!</p>
      </RadioGroup>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir RadioGroup: Only `Radio` components are allowed inside " +
        "the `RadioGroup` component."
    );
  });

  it("logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <RadioGroup labelText="RadioGroup example" name="a11y-test">
        <Radio id="radio1" value="1" labelText="Radio 1" />
      </RadioGroup>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir RadioGroup: This component's required `id` prop was not passed."
    );
  });

  it("passes a ref to the input element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <RadioGroup id="column" labelText="column" name="column" ref={ref}>
        <Radio value="2" labelText="Radio 2" id="radio-2" />
        <Radio value="3" labelText="Radio 3" id="radio-3" />
      </RadioGroup>
    );

    expect(screen.getByRole("radiogroup")).toBe(ref.current);
  });

  it("renders the UI snapshot correctly", () => {
    const column = renderer
      .create(
        <RadioGroup labelText="column" name="column" id="column">
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const row = renderer
      .create(
        <RadioGroup labelText="row" name="row" id="row" layout="row">
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const noLabel = renderer
      .create(
        <RadioGroup
          labelText="no label"
          name="noLabel"
          id="noLabel"
          showLabel={false}
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const helperText = renderer
      .create(
        <RadioGroup
          labelText="helperText"
          name="helperText"
          id="helperText"
          helperText="helper text"
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const invalidText = renderer
      .create(
        <RadioGroup
          labelText="invalidText"
          name="invalidText"
          id="invalidText"
          invalidText="error text"
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const isRequired = renderer
      .create(
        <RadioGroup
          labelText="required"
          name="required"
          id="required"
          isRequired
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const noRequiredLabel = renderer
      .create(
        <RadioGroup
          labelText="no optional or required label"
          name="noRequiredLabel"
          id="noRequiredLabel"
          isRequired
          showRequiredLabel={false}
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const isInvalid = renderer
      .create(
        <RadioGroup labelText="invalid" name="invalid" id="invalid" isInvalid>
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const isDisabled = renderer
      .create(
        <RadioGroup
          labelText="disabled"
          name="disabled"
          id="disabled"
          isDisabled
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const withJSXRadioLabels = renderer
      .create(
        <RadioGroup
          id="jsxLabels"
          isFullWidth
          labelText="RadioGroup example"
          name="a11y-test"
        >
          <Radio
            id="arts"
            labelText={
              <Flex>
                <span>Arts</span>
                <Spacer />
                <span>4</span>
              </Flex>
            }
            value="arts"
          />
          <Radio
            id="English"
            labelText={
              <Flex>
                <span>English</span>
                <Spacer />
                <span>23</span>
              </Flex>
            }
            value="English"
          />
        </RadioGroup>
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <RadioGroup
          labelText="chakra"
          name="chakra"
          id="chakra"
          p="20px"
          color="ui.error.primary"
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <RadioGroup
          labelText="props"
          name="props"
          id="props"
          data-testid="props"
        >
          <Radio value="2" labelText="Radio 2" id="radio-2" />
          <Radio value="3" labelText="Radio 3" id="radio-3" />
        </RadioGroup>
      )
      .toJSON();

    expect(column).toMatchSnapshot();
    expect(row).toMatchSnapshot();
    expect(noLabel).toMatchSnapshot();
    expect(helperText).toMatchSnapshot();
    expect(invalidText).toMatchSnapshot();
    expect(noRequiredLabel).toMatchSnapshot();
    expect(isRequired).toMatchSnapshot();
    expect(isInvalid).toMatchSnapshot();
    expect(isDisabled).toMatchSnapshot();
    expect(withJSXRadioLabels).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });
});
