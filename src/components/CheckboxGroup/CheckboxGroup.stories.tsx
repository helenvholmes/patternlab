import { Flex, Spacer, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";

import { Button } from "../Button/Button";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import Checkbox from "../Checkbox/Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import { layoutTypesArray } from "../../helpers/types";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/Form Elements/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    children: { table: { disable: true } },
    defaultValue: { control: false },
    id: { control: false },
    isDisabled: {
      table: { defaultValue: { summary: "false" } },
    },
    isFullWidth: {
      table: { defaultValue: { summary: "true" } },
    },
    isInvalid: {
      table: { defaultValue: { summary: "false" } },
    },
    isRequired: {
      table: { defaultValue: { summary: "false" } },
    },
    key: { table: { disable: true } },
    layout: {
      table: { defaultValue: { summary: "column" } },
      options: layoutTypesArray,
    },
    name: { control: false },
    onChange: { control: false },
    ref: { table: { disable: true } },
    showHelperInvalidText: {
      table: { defaultValue: { summary: "true" } },
    },
    showLabel: {
      table: { defaultValue: { summary: "true" } },
    },
    showRequiredLabel: {
      table: { defaultValue: { summary: "true" } },
    },
    value: { control: false },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=11895%3A658",
    },
    jest: ["CheckboxGroup.test.tsx"],
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const WithControls: Story = {
  args: {
    defaultValue: ["4"],
    helperText: "This is the helper text for the full group.",
    id: "checkboxGroup-id",
    invalidText: "This is the error text :(",
    isDisabled: false,
    isFullWidth: false,
    isInvalid: false,
    isRequired: false,
    labelText: "Standard Checkbox Group",
    layout: "column",
    name: "checkbox-story",
    onChange: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
      <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
      <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
      <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement);

    expect(screen.getByText("Standard Checkbox Group")).toBeInTheDocument();
    expect(screen.getByText(/This is the helper text/)).toBeInTheDocument();

    const checkbox2 = screen.getByLabelText("Checkbox 2");
    const checkbox4 = screen.getByLabelText("Checkbox 4");
    const checkbox5 = screen.getByLabelText("Checkbox 5");

    expect(checkbox2).not.toBeChecked();
    expect(checkbox4).not.toBeChecked();

    await userEvent.click(checkbox2);
    await userEvent.click(checkbox4);
    expect(checkbox2).toBeChecked();
    expect(checkbox4).toBeChecked();

    await userEvent.keyboard("{Tab}");
    expect(checkbox5).toHaveFocus();

    await userEvent.click(checkbox4);
    expect(checkbox4).not.toBeChecked();
  },
};

// The following are additional Checkbox example Stories.
export const Layout: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <CheckboxGroup
        id="column"
        labelText="Column (default)"
        name="column-example"
      >
        <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
        <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
        <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
        <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
      </CheckboxGroup>
      <br />
      <CheckboxGroup id="row" labelText="Row" name="row-example" layout="row">
        <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
        <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
        <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
        <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
      </CheckboxGroup>
    </VStack>
  ),
};

export const Errored: Story = {
  render: () => (
    <CheckboxGroup
      id="errored"
      invalidText="Error message for the full group."
      isInvalid
      labelText="Errored Checkbox Group"
      name="errored-example"
    >
      <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
      <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
      <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
      <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
    </CheckboxGroup>
  ),
};

export const Required: Story = {
  render: () => (
    <CheckboxGroup
      id="required"
      isRequired
      labelText="Required Checkbox Group"
      name="required-example"
      helperText="The reason for being required."
    >
      <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
      <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
      <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
      <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
    </CheckboxGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup
      id="disabled"
      isDisabled
      labelText="Disabled Checkbox Group"
      name="disabled-example"
      helperText="The reason for being disabled."
    >
      <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
      <Checkbox id="checkbox-3" value="3" labelText="Checkbox 3" />
      <Checkbox id="checkbox-4" value="4" labelText="Checkbox 4" />
      <Checkbox id="checkbox-5" value="5" labelText="Checkbox 5" />
    </CheckboxGroup>
  ),
};

export const LabelsUsingJSXElements: Story = {
  render: () => (
    <CheckboxGroup
      id="full-width"
      isFullWidth
      labelText="Checkbox Group"
      name="checkbox-example"
    >
      <Checkbox
        labelText={
          <Flex>
            <span>Arts</span>
            <Spacer />
            <span>4</span>
          </Flex>
        }
        value="Arts"
        id="arts"
      />
      <Checkbox
        labelText={
          <Flex>
            <span>English</span>
            <Spacer />
            <span>23</span>
          </Flex>
        }
        value="English"
        id="english"
      />
      <Checkbox
        labelText={
          <Flex>
            <span>Science</span>
            <Spacer />
            <span>10</span>
          </Flex>
        }
        value="Science"
        id="science"
      />
      <Checkbox
        labelText={
          <Flex>
            <span>Math</span>
            <Spacer />
            <span>3</span>
          </Flex>
        }
        value="Math"
        id="math"
      />
    </CheckboxGroup>
  ),
};

// Set up CheckboxGoup with indeterminate state option using useState
function IndeterminateCheckboxExample() {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  return (
    <CheckboxGroup
      id="indeterminate"
      labelText="Indeterminate Example"
      name="indeterminate-example"
    >
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        labelText="Parent Checkbox"
        id="parent-checkbox"
      />
      <Checkbox
        isChecked={checkedItems[0]}
        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        labelText="Child Checkbox 1"
        id="child-checkbox-1"
      />
      <Checkbox
        isChecked={checkedItems[1]}
        onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        labelText="Child Checkbox 2"
        id="child-checkbox-2"
      />
    </CheckboxGroup>
  );
}
export const IndeterminateExample: Story = {
  render: () => <IndeterminateCheckboxExample />,
};

// Set up CheckboxGoup with progremmatically set selections using useState
function CheckboxGroupValuesUpdateExample() {
  const [value, setValue] = useState([]);
  const onClick1 = () => {
    setValue(["art", "science", "math"]);
  };
  const onClick2 = () => {
    setValue(["math", "music", "magic"]);
  };
  const onClick3 = () => {
    setValue(["physics", "science", "chemistry"]);
  };
  const onChange = (data) => {
    setValue(data);
    console.log("Selected values:", data);
  };
  return (
    <VStack align="stretch" spacing="m">
      <span>Set values to:</span>
      <ButtonGroup>
        <Button id="btn1" onClick={onClick1}>
          "art", "science", "math"
        </Button>
        <Button id="btn2" onClick={onClick2}>
          "math", "music", "magic"
        </Button>
        <Button id="btn3" onClick={onClick3}>
          "physics", "science", "chemistry"
        </Button>
      </ButtonGroup>
      <CheckboxGroup
        id="programmatically-update-example"
        labelText="Course Selection"
        name="courseSelection"
        onChange={onChange}
        value={value}
      >
        <Checkbox id="art" labelText="Art" value="art" />
        <Checkbox id="chemistry" labelText="Chemistry" value="chemistry" />
        <Checkbox id="english" labelText="English" value="english" />
        <Checkbox id="magic" labelText="Magic" value="magic" />
        <Checkbox id="math" labelText="Math" value="math" />
        <Checkbox id="music" labelText="Music" value="music" />
        <Checkbox id="physics" labelText="Physics" value="physics" />
        <Checkbox id="science" labelText="Science" value="science" />
      </CheckboxGroup>
    </VStack>
  );
}
export const ProgrammaticallyUpdateValues: Story = {
  render: () => <CheckboxGroupValuesUpdateExample />,
};
