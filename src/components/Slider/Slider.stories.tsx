import { Box, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";

import Heading from "../Heading/Heading";
import Form, { FormRow, FormField } from "../Form/Form";
import SimpleGrid from "../Grid/SimpleGrid";
import Slider from "./Slider";
import TextInput from "../TextInput/TextInput";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof Slider> = {
  title: "Components/Form Elements/Slider",
  component: Slider,
  argTypes: {
    className: { control: false },
    defaultValue: {
      control: false,
      table: { defaultValue: { summary: "0" } },
    },
    helperText: { control: "text" },
    id: { control: false },
    invalidText: { control: "text" },
    isDisabled: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRangeSlider: argsBooleanType(),
    isRequired: argsBooleanType(),
    labelText: { control: "text" },
    max: { control: "number", table: { defaultValue: { summary: "100" } } },
    min: { control: "number", table: { defaultValue: { summary: "0" } } },
    name: { control: false },
    onChange: { control: false },
    onChangeEnd: { control: false },
    showBoxes: argsBooleanType("true"),
    showHelperInvalidText: argsBooleanType("true"),
    showLabel: argsBooleanType("true"),
    showRequiredLabel: argsBooleanType("true"),
    showValues: argsBooleanType("true"),
    step: { control: "number", table: { defaultValue: { summary: "1" } } },
    value: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/**
 * Main Story for the Slider component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    defaultValue: 50,
    helperText: "Pass in a value from the min 0 to the max 100 values.",
    id: "slider-id",
    invalidText: "Oh no this is an error :(",
    isDisabled: false,
    isInvalid: false,
    isRangeSlider: false,
    isRequired: false,
    labelText: "Slider label",
    max: 100,
    min: 0,
    name: undefined,
    onChange: undefined,
    onChangeEnd: undefined,
    showBoxes: true,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
    showValues: true,
    step: 1,
    value: undefined,
  },
  argTypes: {
    isRangeSlider: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  render: (args) => <Slider {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=36889%3A25871",
    },
    jest: ["Slider.test.tsx"],
  },
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement);
    const textInput = screen.getByRole("spinbutton");

    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
    expect(textInput).toHaveValue(50);

    await userEvent.clear(textInput);
    await userEvent.type(textInput, "75");

    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
    expect(textInput).toHaveValue(75);

    await userEvent.clear(textInput);
    await userEvent.type(textInput, "145");

    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "100");
    expect(textInput).toHaveValue(100);
  },
};

export const RangeSliderWithControls: Story = {
  args: {
    className: undefined,
    defaultValue: [25, 75],
    helperText: "Pass in a value from the min 0 to the max 100 values.",
    id: "slider-range-id",
    invalidText: "Oh no this is an error :(",
    isDisabled: false,
    isInvalid: false,
    isRangeSlider: true,
    isRequired: false,
    labelText: "Range Slider label",
    max: 100,
    min: 0,
    name: undefined,
    onChange: undefined,
    onChangeEnd: undefined,
    showBoxes: true,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
    showValues: true,
    step: 1,
    value: undefined,
  },
  argTypes: {
    isRangeSlider: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  render: (args) => <Slider {...args} />,
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement);

    const textInputs = screen.getAllByRole("spinbutton");
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
    expect(textInputs[0]).toHaveValue(25);
    expect(textInputs[1]).toHaveValue(75);
    expect(sliders[0]).toHaveAttribute("aria-valuenow", "25");
    expect(sliders[1]).toHaveAttribute("aria-valuenow", "75");

    await userEvent.clear(textInputs[0]);
    await userEvent.clear(textInputs[1]);
    await userEvent.type(textInputs[0], "80");
    await userEvent.type(textInputs[1], "20");
    expect(screen.getAllByRole("spinbutton")[0]).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getAllByRole("spinbutton")[1]).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByText(/Oh no this is an error/)).toBeInTheDocument();

    await userEvent.clear(textInputs[0]);
    await userEvent.clear(textInputs[1]);
    await userEvent.type(textInputs[0], "34");
    await userEvent.type(textInputs[1], "65");
    expect(textInputs[0]).toHaveValue(34);
    expect(textInputs[1]).toHaveValue(65);
    expect(sliders[0]).toHaveAttribute("aria-valuenow", "34");
    expect(sliders[1]).toHaveAttribute("aria-valuenow", "65");

    await userEvent.click(textInputs[0]);
    await userEvent.tab();
    expect(sliders[0]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");
    expect(sliders[0]).toHaveAttribute("aria-valuenow", "36");

    await userEvent.tab();
    expect(sliders[1]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");
    expect(sliders[1]).toHaveAttribute("aria-valuenow", "67");
  },
};

export const SingleSliderStates: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-single-default"
          level="h4"
          size="heading5"
          text="Default State"
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider"
          invalidText="Component error text :("
          labelText="Label"
        />
      </Box>
      <Box>
        <Heading
          id="heading-single-errored"
          level="h4"
          size="heading5"
          text="Errored State"
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="errored-slider"
          invalidText="Component error text :("
          labelText="Label"
          isInvalid
        />
        <p>
          Note: If the `min` prop value is greater than the `max` prop value,
          then this will be an errored state.
        </p>
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="errored-slider"
          invalidText="The `min` value must be less than the `max` value."
          labelText="Label"
          max={30}
          min={80}
        />
      </Box>
      <Box>
        <Heading
          id="heading-single-required"
          level="h4"
          size="heading5"
          text="Required State"
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="required-slider"
          invalidText="Component error text :("
          labelText="Label"
          isRequired
        />
      </Box>
      <Box>
        <Heading
          id="heading-single-disabled"
          level="h4"
          size="heading5"
          text="Disabled State"
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="disabled-slider"
          invalidText="Component error text :("
          labelText="Label"
          isDisabled
        />
      </Box>
    </VStack>
  ),
};

export const RangeSliderStates: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <div>
        <Heading
          id="heading-range-default"
          level="h4"
          size="heading5"
          text="Default State"
        />
        <Slider
          defaultValue={[25, 75]}
          helperText="Component helper text."
          id="range-slider"
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
        />
      </div>
      <div>
        <Heading
          id="heading-range-errored"
          level="h4"
          size="heading5"
          text="Errored State"
        />
        <SimpleGrid columns={1} gap="grid.l">
          <Slider
            defaultValue={[25, 75]}
            helperText="Component helper text."
            id="range-error-slider"
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
            isInvalid
          />
          <p>
            Note: The slider does not allow the starting thumb to go past the
            ending thumb. Likewise, it also does not allow the ending thumb to
            go below the starting thumb. However, it's possible to set incorrect
            values directly into both of the text inputs. For example, if you
            enter 80 in the first text input box and 20 in the second input box,
            it will automatically go into the invalid state. In the following
            example, the default values are already set to 80 and 20 *just* to
            showcase this error.
          </p>
          <Slider
            defaultValue={[80, 20]}
            helperText="Component helper text."
            id="range-error-slider2"
            invalidText="Component error text :("
            labelText="Label"
            isRangeSlider
          />
        </SimpleGrid>
      </div>
      <div>
        <Heading
          id="heading-range-required"
          level="h4"
          size="heading5"
          text="Required State"
        />
        <Slider
          defaultValue={[25, 75]}
          helperText="Component helper text."
          id="range-required-slider"
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
          isRequired
        />
      </div>
      <div>
        <Heading
          id="heading-range-disabled"
          level="h4"
          size="heading5"
          text="Disabled State"
        />
        <Slider
          defaultValue={[25, 75]}
          helperText="Component helper text."
          id="single-disabled-slider"
          invalidText="Component error text :("
          labelText="Label"
          isRangeSlider
          isDisabled
        />
      </div>
    </VStack>
  ),
};

export const SingleSliderVariants: Story = {
  render: () => (
    <>
      <Heading
        id="heading-single-labels"
        level="h4"
        size="heading5"
        text="With and Without Component Labels"
      />
      <SimpleGrid columns={1} gap="grid.xl">
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider-variant-1"
          labelText="Label"
          showValues={false}
          showBoxes={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider-variant-2"
          labelText="Label"
          showValues={false}
          showBoxes={false}
          isRequired
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider-variant-3"
          labelText="Label"
          showValues={false}
          showBoxes={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider-variant-4"
          labelText="Label"
          showHelperInvalidText={false}
          showValues={false}
          showBoxes={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="single-slider-variant-5"
          labelText="Label"
          showValues={false}
          showBoxes={false}
          showLabel={false}
        />
      </SimpleGrid>
    </>
  ),
};

export const SingleSliderVariantsHiddenLabels: Story = {
  render: () => (
    <>
      <Heading
        id="heading-single-labels-inputs"
        level="h4"
        size="heading5"
        text="With and Without Internal Inputs and Labels"
      />
      <SimpleGrid columns={1} gap="grid.xl">
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="hidden-labels-1"
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="hidden-labels-2"
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
          showBoxes={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="hidden-labels-3"
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
          showValues={false}
        />
        <Slider
          defaultValue={50}
          helperText="Component helper text."
          id="hidden-labels-4"
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
          showValues={false}
          showBoxes={false}
        />
      </SimpleGrid>
    </>
  ),
};

export const RangeSliderWithAdjustedHandles: Story = {
  render: () => (
    <>
      <SimpleGrid columns={1} gap="grid.xl">
        <Slider
          defaultValue={[15, 75]}
          helperText="Component helper text."
          id="range-slider-1"
          isRangeSlider
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
        />
        <Slider
          defaultValue={[15, 75]}
          helperText="Component helper text."
          id="range-slider-1"
          isRangeSlider
          labelText="Label"
          showBoxes={false}
          showHelperInvalidText={false}
          showLabel={false}
        />
        <Slider
          defaultValue={[15, 75]}
          helperText="Component helper text."
          id="range-slider-3"
          isRangeSlider
          labelText="Label"
          showHelperInvalidText={false}
          showLabel={false}
          showValues={false}
        />
        <Slider
          defaultValue={[15, 75]}
          helperText="Component helper text."
          id="range-slider-4"
          isRangeSlider
          labelText="Label"
          showBoxes={false}
          showHelperInvalidText={false}
          showLabel={false}
          showValues={false}
        />
      </SimpleGrid>
    </>
  ),
};

function SliderExampleComponent() {
  const onChange = (newValue) => {
    console.log(`The single Slider updated value is: ${newValue}`);
  };

  return (
    <Slider
      defaultValue={50}
      helperText="Component helper text."
      id="slider"
      labelText="Label"
      onChange={onChange}
    />
  );
}

export const GetInputValuesSingleSlider: Story = {
  render: () => <SliderExampleComponent />,
};

function RangeSliderExample() {
  const onChange = (newValue) => {
    const [start, end] = newValue;
    console.log(`The Range Slider updated start value is: ${start}`);
    console.log(`The Range Slider updated end value is: ${end}`);
  };

  return (
    <Slider
      defaultValue={[15, 75]}
      helperText="Component helper text."
      id="range-slider"
      isRangeSlider
      labelText="Label"
      onChange={onChange}
    />
  );
}

export const GetInputValuesRangeSlider: Story = {
  render: () => <RangeSliderExample />,
};

function SliderEndExample() {
  const onChangeEnd = (newValue) => {
    console.log(`The single Slider updated value is: ${newValue}`);
  };
  return (
    <Slider
      defaultValue={50}
      helperText="Component helper text."
      id="slider"
      labelText="Label"
      onChangeEnd={onChangeEnd}
    />
  );
}

export const FinalSingleSliderValue: Story = {
  render: () => <SliderEndExample />,
};

function RangeSliderEndExample() {
  const onChangeEnd = (newValue) => {
    const [start, end] = newValue;
    console.log(`The Range Slider updated start value is: ${start}`);
    console.log(`The Range Slider updated end value is: ${end}`);
  };
  return (
    <Slider
      defaultValue={[15, 75]}
      helperText="Component helper text."
      id="range-slider"
      isRangeSlider
      labelText="Label"
      onChangeEnd={onChangeEnd}
    />
  );
}

export const FinalRangeSliderValue: Story = {
  render: () => <RangeSliderEndExample />,
};

function RangeSliderValuesUpdateExample() {
  const [value, setValue] = useState([15, 75]);
  const onChangeFirst = (newValue) => {
    setValue([newValue.target.value, value[1]]);
  };
  const onChangeSecond = (newValue) => {
    setValue([value[0], newValue.target.value]);
  };
  return (
    <Form id="slider-example">
      <FormRow>
        <FormField>
          <TextInput
            id="textInput-s1"
            labelText="First Slider value"
            onChange={onChangeFirst}
          />
        </FormField>
        <FormField>
          <TextInput
            id="textInput-s2"
            labelText="Second Slider value"
            onChange={onChangeSecond}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField>
          <Slider
            defaultValue={[15, 75]}
            helperText="Values can be updated through the two inputs above."
            id="range-slider-text-example"
            isRangeSlider
            labelText="Slider with Updated Values"
            showBoxes={false}
            value={value}
          />
        </FormField>
      </FormRow>
    </Form>
  );
}

export const ProgrammaticallyUpdate: Story = {
  render: () => <RangeSliderValuesUpdateExample />,
};
