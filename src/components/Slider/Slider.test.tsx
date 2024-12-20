import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import React, { createRef } from "react";
import renderer from "react-test-renderer";

import Slider from "./Slider";

describe("Slider Accessibility", () => {
  describe("Single Slider", () => {
    it("passes axe accessibility test", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test without a label", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showLabel={false}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test without visible values", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showValues={false}
          showBoxes={false}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Range Slider", () => {
    it("passes axe accessibility test", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test without a label", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showLabel={false}
          isRangeSlider
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test without visible values", async () => {
      const { container } = render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showValues={false}
          showBoxes={false}
          isRangeSlider
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe("Slider", () => {
  describe("Single Slider", () => {
    it("renders a label, two static values, text input, and helper text", () => {
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );
      expect(screen.getByText(/Label/i)).toBeInTheDocument();
      expect(screen.getByRole("slider")).toBeInTheDocument();
      // default min and max values
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      // Default value; this is the role in the slider context.
      expect(screen.getByRole("spinbutton")).toHaveValue(50);
      expect(screen.getByText("Component helper text.")).toBeInTheDocument();
    });

    it("adds the appropriate aria-* attributes to the slider element", () => {
      render(
        <Slider
          id="sliderId"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(slider).toHaveAttribute("aria-label", "Label - slider handle");
    });

    it("renders the '(required)' text in the label or hides it", () => {
      const { rerender } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRequired
        />
      );
      expect(screen.getByText(/required/i)).toBeInTheDocument();

      rerender(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRequired
          showRequiredLabel={false}
        />
      );
      expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    });

    it("hides the label but adds it as an aria-label attribute", () => {
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showLabel={false}
        />
      );

      expect(screen.queryByText(/Label/i)).not.toBeInTheDocument();
      expect(screen.getByRole("slider")).toHaveAttribute(
        "aria-label",
        "Label - slider handle"
      );
    });

    it("hides the min/max static values", () => {
      const { rerender } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          min={25}
          max={75}
        />
      );
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("75")).toBeInTheDocument();

      rerender(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          min={25}
          max={75}
          showValues={false}
        />
      );
      expect(screen.queryByText("25")).not.toBeInTheDocument();
      expect(screen.queryByText("75")).not.toBeInTheDocument();
    });

    it("hides the current value input box", () => {
      const { rerender } = render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
      expect(screen.getByRole("spinbutton")).toHaveValue(50);

      rerender(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          showBoxes={false}
        />
      );
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    });

    it("renders the invalid state", () => {
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isInvalid
        />
      );

      expect(
        screen.queryByText("Component helper text")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Component error text :(")).toBeInTheDocument();
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("renders the invalid state if the min prop is greater than the max prop", () => {
      const warn = jest.spyOn(console, "warn");
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          max={20}
          min={70}
        />
      );

      expect(
        screen.queryByText("Component helper text")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Component error text :(")).toBeInTheDocument();
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Slider: The `min` prop is greater than the `max` prop."
      );
    });

    it("renders the disabled state", () => {
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isDisabled
        />
      );
      expect(screen.getByRole("slider")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("updates the value through the text input", () => {
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, {
        target: { value: "42" },
      });
      expect(input).toHaveValue(42);

      // The max value is 100, so an entered value higher than 100 will
      // be set to 100.
      fireEvent.change(input, {
        target: { value: "12345" },
      });
      expect(input).toHaveValue(100);
    });

    it("doesn't crash if no onChange callback function is passed", () => {
      let currentValue = 0;
      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
        />
      );

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, {
        target: { value: "42" },
      });
      // While we change the slider input value, since there is no onChange
      // function, there is no way to update this local `currentValue` variable.
      expect(currentValue).toEqual(0);
    });

    it("gets the current value through the onChange callback function", () => {
      let currentValue = 0;
      function onChange(value: number | number[]) {
        currentValue = value as number;
      }

      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          onChange={onChange}
        />
      );

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, {
        target: { value: "42" },
      });
      expect(currentValue).toEqual(42);

      fireEvent.change(input, {
        target: { value: "84" },
      });
      expect(currentValue).toEqual(84);
    });

    it("gets the current value through the onChangeEnd callback function", () => {
      let currentValue = 0;
      function onChangeEnd(value: number | number[]) {
        currentValue = value as number;
      }

      render(
        <Slider
          id="slider"
          defaultValue={50}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          onChangeEnd={onChangeEnd}
          value={currentValue}
        />
      );

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, {
        target: { value: "42" },
      });
      expect(currentValue).toEqual(42);

      fireEvent.change(input, {
        target: { value: "84" },
      });
      expect(currentValue).toEqual(84);
    });

    it("logs a warning when both `onChange` and `onChangeEnd` are passed", () => {
      const warn = jest.spyOn(console, "warn");
      let currentValue = 0;
      function onChange(value: number | number[]) {
        currentValue = value as number;
      }
      function onChangeEnd(value: number | number[]) {
        currentValue = value as number;
      }

      render(
        <Slider
          id="slider"
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        />
      );

      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Slider: Both `onChange` and `onChangeEnd` props were passed."
      );
      expect(currentValue).toEqual(0);
    });

    it("updates the value programmatically through the `value` prop", () => {
      let value = 15;

      const { rerender } = render(
        <Slider id="slider" labelText="Label" value={value} />
      );
      let slider = screen.getByRole("slider");

      expect(screen.getByRole("spinbutton")).toHaveValue(15);
      expect(slider).toHaveAttribute("aria-valuenow", "15");

      value = 20;
      rerender(<Slider id="slider" labelText="Label" value={value} />);

      expect(screen.getByRole("spinbutton")).toHaveValue(20);
      expect(slider).toHaveAttribute("aria-valuenow", "20");
    });

    it("renders the UI snapshot correctly", () => {
      const defaultSlider = renderer
        .create(
          <Slider
            id="defaultSlider"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
          />
        )
        .toJSON();
      const errored = renderer
        .create(
          <Slider
            id="errored"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isInvalid
          />
        )
        .toJSON();
      const required = renderer
        .create(
          <Slider
            id="required"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRequired
          />
        )
        .toJSON();
      const disabled = renderer
        .create(
          <Slider
            id="disabled"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isDisabled
          />
        )
        .toJSON();
      const noLabels = renderer
        .create(
          <Slider
            id="noLabels"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            showLabel={false}
            showHelperInvalidText={false}
          />
        )
        .toJSON();
      const noVisibleValues = renderer
        .create(
          <Slider
            id="noVisibleValues"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            showValues={false}
            showBoxes={false}
          />
        )
        .toJSON();
      const onlySlider = renderer
        .create(
          <Slider
            id="onlySlider"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            showLabel={false}
            showHelperInvalidText={false}
            showValues={false}
            showBoxes={false}
          />
        )
        .toJSON();
      const withChakraProps = renderer
        .create(
          <Slider
            id="chakra"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            p="20px"
            color="ui.error.primary"
          />
        )
        .toJSON();
      const withOtherProps = renderer
        .create(
          <Slider
            id="props"
            defaultValue={50}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            data-testid="props"
          />
        )
        .toJSON();

      expect(defaultSlider).toMatchSnapshot();
      expect(errored).toMatchSnapshot();
      expect(required).toMatchSnapshot();
      expect(disabled).toMatchSnapshot();
      expect(noLabels).toMatchSnapshot();
      expect(noVisibleValues).toMatchSnapshot();
      expect(onlySlider).toMatchSnapshot();
      expect(withChakraProps).toMatchSnapshot();
      expect(withOtherProps).toMatchSnapshot();
    });

    it("passes a ref to the div wrapper element", () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="slider"
          invalidText="Component error text :("
          labelText="Label"
          ref={ref}
        />
      );

      expect(container.querySelectorAll("div")[0]).toBe(ref.current);
    });
  });

  describe("Range Slider", () => {
    it("renders everything from the single but also two text input fields", () => {
      render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      );
      expect(screen.getByText(/Label/i)).toBeInTheDocument();
      // The range slider has two sliders!
      expect(screen.getAllByRole("slider")).toHaveLength(2);
      // default min and max values
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      // The range slider has two text inputs.
      expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
      expect(screen.getAllByRole("spinbutton")[0]).toHaveValue(25);
      expect(screen.getAllByRole("spinbutton")[1]).toHaveValue(75);
      expect(screen.getByText("Component helper text.")).toBeInTheDocument();
    });

    it("adds the appropriate aria-* attributes to the slider element", () => {
      render(
        <Slider
          id="sliderId"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      );
      const slider = screen.getAllByRole("slider");

      expect(slider[0]).toHaveAttribute("aria-valuemin", "0");
      // This is set so the starting thumb can't go past the current end value.
      expect(slider[0]).toHaveAttribute("aria-valuemax", "75");
      expect(slider[0]).toHaveAttribute("aria-valuenow", "25");
      expect(slider[0]).toHaveAttribute(
        "aria-label",
        "Label - slider handle for start value"
      );
      // This is set so the ending thumb can't go below the current start value.
      expect(slider[1]).toHaveAttribute("aria-valuemin", "25");
      expect(slider[1]).toHaveAttribute("aria-valuemax", "100");
      expect(slider[1]).toHaveAttribute("aria-valuenow", "75");
      expect(slider[1]).toHaveAttribute(
        "aria-label",
        "Label - slider handle for end value"
      );
    });

    it("hides the label but adds it as an aria-label attribute", () => {
      render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Custom Label"
          isRangeSlider
          showLabel={false}
        />
      );

      expect(screen.queryByText(/Label/i)).not.toBeInTheDocument();
      expect(screen.getAllByRole("slider")[0]).toHaveAttribute(
        "aria-label",
        "Custom Label - slider handle for start value"
      );
      expect(screen.getAllByRole("slider")[1]).toHaveAttribute(
        "aria-label",
        "Custom Label - slider handle for end value"
      );
    });

    it("renders with min and max values as the default values if no `defaultValue` array is passed", () => {
      render(
        <Slider
          id="slider"
          helperText="Component helper text."
          invalidText="Component error text :("
          isRangeSlider
          labelText="Label"
          max={80}
          min={30}
        />
      );
      expect(screen.getByText("30")).toBeInTheDocument();
      expect(screen.getByText("80")).toBeInTheDocument();
    });

    it("renders the invalid state if the min prop is greater than the max prop", () => {
      const warn = jest.spyOn(console, "warn");
      // The start value is bigger than the end value.
      render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          isRangeSlider
          labelText="Label"
          max={20}
          min={80}
        />
      );

      expect(screen.getByText("Component error text :(")).toBeInTheDocument();
      expect(screen.getAllByRole("spinbutton")[0]).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(screen.getAllByRole("spinbutton")[1]).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Slider: The `min` prop is greater than the `max` prop."
      );
    });

    it("renders the invalid state if the start is greater than the end values", () => {
      const warn = jest.spyOn(console, "warn");
      // The start value is bigger than the end value.
      render(
        <Slider
          id="slider"
          defaultValue={[75, 25]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      );

      expect(
        screen.queryByText("Component helper text")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Component error text :(")).toBeInTheDocument();
      expect(screen.getAllByRole("spinbutton")[0]).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(screen.getAllByRole("spinbutton")[1]).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Slider: The RangeSlider's first value is greater than the second value."
      );
    });

    it("updates the value through the text input", () => {
      render(
        <Slider
          id="slider"
          defaultValue={[25, 75]}
          helperText="Component helper text."
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      );
      const startingInput = screen.getAllByRole("spinbutton")[0];
      const endingInput = screen.getAllByRole("spinbutton")[1];
      fireEvent.change(startingInput, {
        target: { value: "42" },
      });
      fireEvent.change(endingInput, {
        target: { value: "79" },
      });

      expect(startingInput).toHaveValue(42);
      expect(endingInput).toHaveValue(79);
    });

    it("logs a warning when there is no `id` passed", () => {
      const warn = jest.spyOn(console, "warn");
      render(
        // @ts-ignore: Typescript complains when a required prop is not passed, but
        // here we don't want to pass the required prop to make sure the warning appears.
        <Slider labelText="Label" />
      );
      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Slider: This component's required `id` prop was not passed."
      );
    });

    it("updates the value programmatically through the `value` prop", () => {
      let value = [15, 76];

      const { rerender } = render(
        <Slider id="slider" isRangeSlider labelText="Label" value={value} />
      );
      let slider = screen.getAllByRole("slider");

      expect(screen.getAllByRole("spinbutton")[0]).toHaveValue(15);
      expect(screen.getAllByRole("spinbutton")[1]).toHaveValue(76);
      expect(slider[0]).toHaveAttribute("aria-valuenow", "15");
      expect(slider[1]).toHaveAttribute("aria-valuenow", "76");

      value = [20, 99];
      rerender(
        <Slider id="slider" isRangeSlider labelText="Label" value={value} />
      );

      expect(screen.getAllByRole("spinbutton")[0]).toHaveValue(20);
      expect(screen.getAllByRole("spinbutton")[1]).toHaveValue(99);
      expect(slider[0]).toHaveAttribute("aria-valuenow", "20");
      expect(slider[1]).toHaveAttribute("aria-valuenow", "99");
    });

    it("renders the UI snapshot correctly", () => {
      const defaultRangeSlider = renderer
        .create(
          <Slider
            id="defaultRangeSlider"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
          />
        )
        .toJSON();
      const errored = renderer
        .create(
          <Slider
            id="errored"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            isInvalid
          />
        )
        .toJSON();
      const required = renderer
        .create(
          <Slider
            id="required"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            isRequired
          />
        )
        .toJSON();
      const disabled = renderer
        .create(
          <Slider
            id="disabled"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            isDisabled
          />
        )
        .toJSON();
      const noLabels = renderer
        .create(
          <Slider
            id="noLabels"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            showLabel={false}
            showHelperInvalidText={false}
          />
        )
        .toJSON();
      const noVisibleValues = renderer
        .create(
          <Slider
            id="noVisibleValues"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            showValues={false}
            showBoxes={false}
          />
        )
        .toJSON();
      const onlySlider = renderer
        .create(
          <Slider
            id="onlySlider"
            defaultValue={[25, 75]}
            helperText="Component helper text."
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            showLabel={false}
            showHelperInvalidText={false}
            showValues={false}
            showBoxes={false}
          />
        )
        .toJSON();

      expect(defaultRangeSlider).toMatchSnapshot();
      expect(errored).toMatchSnapshot();
      expect(required).toMatchSnapshot();
      expect(disabled).toMatchSnapshot();
      expect(noLabels).toMatchSnapshot();
      expect(noVisibleValues).toMatchSnapshot();
      expect(onlySlider).toMatchSnapshot();
    });

    it("passes a ref to the div wrapper element", () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <Slider
          defaultValue={[25, 75]}
          helperText="Component helper text."
          id="slider"
          isRangeSlider
          invalidText="Component error text :("
          labelText="Label"
          ref={ref}
        />
      );

      expect(container.querySelectorAll("div")[0]).toBe(ref.current);
    });
  });

  it("gets the current value through the onChangeEnd callback function", () => {
    let currentValue = [0, 100];
    function onChangeEnd(value: number | number[]) {
      currentValue = value as number[];
    }

    render(
      <Slider
        id="rangeSlider"
        helperText="Component helper text."
        invalidText="Component error text :("
        labelText="Label"
        isRangeSlider
        onChangeEnd={onChangeEnd}
        value={currentValue}
      />
    );

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], {
      target: { value: "42" },
    });
    expect(currentValue).toEqual([42, 100]);

    fireEvent.change(inputs[1], {
      target: { value: "84" },
    });
    expect(currentValue).toEqual([42, 84]);
  });
});
