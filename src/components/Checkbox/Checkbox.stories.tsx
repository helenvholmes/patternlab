import { Box, HStack, VStack } from "@chakra-ui/react";
import Heading from "../Heading/Heading";
import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Form Elements/Checkbox",
  component: Checkbox,
  argTypes: {
    className: { control: false },
    helperText: { control: { type: "text" } },
    id: { control: false },
    invalidText: { control: { type: "text" } },
    isChecked: argsBooleanType(),
    isDisabled: argsBooleanType(),
    isIndeterminate: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRequired: argsBooleanType(),
    labelText: { control: { type: "text" } },
    name: { control: { type: "text" } },
    onChange: { control: false },
    showHelperInvalidText: argsBooleanType("true"),
    showLabel: argsBooleanType("true"),
    value: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Main Story for the Checkbox component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    helperText: "This is the helper text!",
    id: "checkbox_id",
    invalidText: "This is the error text :(",
    isChecked: undefined,
    isDisabled: false,
    isIndeterminate: false,
    isInvalid: false,
    isRequired: false,
    labelText: "Test Label",
    name: "test_name",
    onChange: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    value: "1",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=11895%3A658",
    },
    jest: ["Checkbox.test.tsx"],
  },
};

// The following are additional Checkbox example Stories.
export const Checked: Story = {
  render: () => (
    <Checkbox id="isChecked" labelText="I am checked" isChecked value="1" />
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox
      id="indeterminate"
      labelText="I am indeterminate"
      isIndeterminate
    />
  ),
};

export const AdditionalStates: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Focused
        </Heading>
        <Checkbox
          id="focused"
          labelText="Click or tab to the Checkbox to see its focus state"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Errored
        </Heading>
        <HStack spacing="l">
          <Checkbox id="invalid" isInvalid labelText="I am in an error state" />
          <Checkbox
            id="invalid-checked"
            isInvalid
            isChecked
            labelText="I am checked in an error state"
          />
        </HStack>
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Disabled
        </Heading>
        <HStack spacing="l">
          <Checkbox id="disabled" isDisabled labelText="I am disabled" />
          <Checkbox
            id="disabled-checked"
            isDisabled
            isChecked
            labelText="I am checked and disabled"
          />
        </HStack>
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          With Helper Text
        </Heading>
        <Checkbox
          id="helpertext"
          name="testHelperText"
          labelText="I have helper text"
          helperText="I am the helper text for this Checkbox"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          With Errored Text
        </Heading>
        <Checkbox
          id="invalid-text"
          invalidText="I am the error text for this Checkbox"
          isInvalid
          name="testinvalidText"
          labelText="I have error text"
        />
      </Box>
    </VStack>
  ),
};

export const LabelUsingJSXElements: Story = {
  render: () => (
    <Checkbox
      id="jsx-label"
      labelText={
        <span>
          Arts and <strong>Entertainment</strong>
        </span>
      }
      name="jsxElementLabel"
    />
  ),
};
