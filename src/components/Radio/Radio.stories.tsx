import { Box, HStack, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Heading from "../Heading/Heading";
import Radio from "./Radio";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof Radio> = {
  title: "Components/Form Elements/Radio",
  component: Radio,
  argTypes: {
    className: { control: false },
    id: { control: false },
    isChecked: { control: false },
    isDisabled: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRequired: argsBooleanType(),
    key: { table: { disable: true } },
    onChange: { control: false },
    ref: { table: { disable: true } },
    showHelperInvalidText: argsBooleanType("true"),
    showLabel: argsBooleanType("true"),
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * Main Story for the Radio component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const Controls: Story = {
  args: {
    className: undefined,
    helperText: "This is the helper text!",
    id: "radio-id",
    invalidText: "This is the error text :(",
    isChecked: undefined,
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    labelText: "Test Label",
    name: "test_name",
    onChange: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    value: "1",
  },
  render: (args) => <Radio {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=11895%3A742",
    },
    jest: ["Radio.test.tsx"],
  },
};

// The following are additional Radio example Stories.
export const BrowserStates: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Checked
        </Heading>
        <Radio labelText="I am checked" id="checked" isChecked value="1" />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Focused
        </Heading>
        <Radio
          id="focused"
          labelText="Click or tab to the Radio to see its focus state"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Errored
        </Heading>
        <HStack>
          <Radio id="invalid" isInvalid labelText="I am in an error state" />
          <Radio
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
        <HStack>
          <Radio id="disabled" isDisabled labelText="I am disabled" />
          <Radio
            id="disabled-checked"
            isDisabled
            isChecked
            labelText="I am checked and disabled"
          />
        </HStack>
      </Box>
    </VStack>
  ),
};

export const HelperAndErrorText: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Helper Text
        </Heading>
        <Radio
          helperText="I am the helper text for this Radio"
          id="help-text"
          labelText="I have helper text"
          name="testHelperText"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Error Text
        </Heading>
        <Radio
          id="invalid-text"
          invalidText="I am the error text for this Radio"
          isInvalid
          labelText="I have error text"
          name="testErrorText"
        />
      </Box>
    </VStack>
  ),
};

export const LabelUsingJSXElements: Story = {
  render: () => (
    <Radio
      id="jsx-label"
      labelText={<span>Arts</span>}
      name="jsxElementLabel"
    />
  ),
};
