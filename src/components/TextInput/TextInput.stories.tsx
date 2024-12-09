import { Box, VStack, HStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState, useRef } from "react";

import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import TextInput, {
  autoCompleteValuesArray,
  textInputTypesArray,
} from "./TextInput";
import type { TextInputRefType } from "./TextInput";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof TextInput> = {
  title: "Components/Form Elements/TextInput",
  component: TextInput,
  argTypes: {
    autoComplete: {
      control: { type: "select" },
      options: autoCompleteValuesArray,
      table: { defaultValue: { summary: "off" } },
    },
    className: { control: false },
    defaultValue: { control: false },
    helperText: { control: "text" },
    id: { control: false },
    invalidText: { control: "text" },
    isClearable: argsBooleanType(),
    isClearableCallback: { control: false },
    isDisabled: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRequired: argsBooleanType(),
    labelText: { control: "text" },
    max: { control: "number" },
    min: { control: "number" },
    name: { control: false },
    key: { table: { disable: true } },
    onChange: { control: false },
    onClick: { control: false },
    onFocus: { control: false },
    pattern: { control: "text" },
    placeholder: { control: "text" },
    ref: { table: { disable: true } },
    requiredLabelText: argsBooleanType("true"),
    showHelperInvalidText: argsBooleanType("true"),
    showLabel: argsBooleanType("true"),
    showRequiredLabel: argsBooleanType("true"),
    step: { table: { defaultValue: { summary: "1" } } },
    textInputType: {
      control: false,
      table: { defaultValue: { summary: "default" } },
    },
    type: {
      control: { type: "select" },
      options: textInputTypesArray,
      table: { defaultValue: { summary: "text" } },
    },
    value: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

/**
 * Main Story for the TextInput component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    additionalHelperTextIds: undefined,
    autoComplete: undefined,
    className: undefined,
    defaultValue: undefined,
    helperText: "Choose wisely.",
    id: "textInput-id",
    isClearable: true,
    isClearableCallback: undefined,
    isDisabled: false,
    isInvalid: false,
    invalidText: "This is error text :(",
    isRequired: true,
    labelText: "What is your favorite color?",
    max: undefined,
    maxLength: undefined,
    min: undefined,
    name: undefined,
    onChange: undefined,
    onClick: undefined,
    onFocus: undefined,
    pattern: undefined,
    placeholder: "e.g. blue, green, etc.",
    requiredLabelText: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
    step: 1,
    textInputType: "default",
    type: "text",
    value: undefined,
  },
  render: (args) => <TextInput {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=11895%3A547",
    },
    jest: "TextInput.test.tsx",
  },
  play: async ({ canvasElement }) => {
    const textInput = within(canvasElement).getByRole("textbox");
    await userEvent.click(textInput);
    await userEvent.type(textInput, "Hello World");

    await waitFor(() => {
      expect(textInput).toHaveValue("Hello World");
    });

    const clearButton = within(canvasElement).getByRole("button");
    await userEvent.click(clearButton);

    await waitFor(() => {
      expect(textInput).not.toHaveValue("Hello World");
    });
  },
};

// The following are additional TextInput example Stories.
export const LabellingVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing={12}>
      <TextInput
        helperText="Choose wisely!"
        id="textInput-1"
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
      />
      <TextInput
        id="textInput-2"
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
        showLabel={false}
      />
      <TextInput
        id="textInput-3"
        isRequired
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
      />
      <TextInput
        id="textInput-4"
        isRequired
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
        showRequiredLabel={false}
      />
      <TextInput
        helperText="Choose wisely!"
        id="textInput-5"
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
        showLabel={false}
      />
    </VStack>
  ),
};

export const BrowserStates: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Invalid
        </Heading>
        <TextInput
          helperText="Choose wisely!"
          id="errored"
          invalidText="This is error text :("
          isInvalid
          labelText="What is your favorite color?"
          placeholder="i.e. blue, green, etc."
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Disabled
        </Heading>
        <TextInput
          helperText="Choose wisely!"
          id="disabled"
          isDisabled
          labelText="What is your favorite color?"
          placeholder="i.e. blue, green, etc."
        />
      </Box>
    </VStack>
  ),
};

export const isClearableButton: Story = {
  render: () => (
    <TextInput
      id="isClearable-example"
      isClearable
      labelText="What is your favorite color?"
      placeholder="i.e. blue, green, etc."
    />
  ),
  name: "isClearable Button",
};

const ControlledExampleComponent = () => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      id="isClearable-controlled-example"
      isClearable
      isClearableCallback={() => setValue("")}
      labelText="What is your favorite color?"
      onChange={(e) => setValue(e.target.value)}
      placeholder="i.e. blue, green, etc."
      value={value}
    />
  );
};

export const ControlledExample: Story = {
  render: () => <ControlledExampleComponent />,
  name: "Controlled isClearableCallback Example",
};

export const NumberType: Story = {
  render: () => (
    <VStack align="stretch" spacing={12}>
      <TextInput
        helperText="The min value is 10 and the max value is 20."
        id="number-type"
        labelText="Enter a number"
        max={20}
        min={10}
        placeholder="i.e. 1, 2, 3, etc."
        type="number"
      />
      <TextInput
        helperText="The min value is 30 and the max value is 5."
        id="number-type"
        invalidText="The min value is 30 and the max value is 5."
        labelText="Enter a number"
        max={5}
        min={30}
        placeholder="i.e. 1, 2, 3, etc."
        type="number"
      />
    </VStack>
  ),
};

export const AlternateNumberPattern: Story = {
  render: () => (
    <TextInput
      helperText="Enter a 5-digit zip code."
      id="number-pattern"
      labelText="Enter a zip code"
      maxLength={5}
      pattern="[0-9]+"
      placeholder="i.e. 10018"
    />
  ),
};

export const HTMLHelperText: Story = {
  render: () => (
    <>
      <TextInput
        helperText="Choose <b>wisely!</b>"
        id="string"
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
      />
      <br />
      <TextInput
        helperText={
          <>
            Choose <b>wisely!</b>
          </>
        }
        id="jsx"
        labelText="What is your favorite color?"
        placeholder="i.e. blue, green, etc."
      />
    </>
  ),
  name: "HTML in Helper Text",
};

const FocusManagementComponent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInputRefType | null>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);

  return !isEdit ? (
    <Button
      id="edit"
      ref={editBtnRef}
      onClick={() => {
        setIsEdit(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }}
    >
      Edit
    </Button>
  ) : (
    <HStack alignItems="end">
      <TextInput
        ref={inputRef}
        id="focus-management"
        labelText="What is your favorite color?"
        onFocus={() => setIsEdit(true)}
        placeholder="i.e. blue, green, etc."
        isClearable
        isClearableCallback={() => setValue("")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        id="cancel"
        onClick={() => {
          setIsEdit(false);
          setTimeout(() => editBtnRef.current?.focus(), 0);
        }}
      >
        Cancel
      </Button>
    </HStack>
  );
};

export const FocusRefManagement: Story = {
  render: () => <FocusManagementComponent />,
  name: "Focus Ref Management",
};

export const Textarea: Story = {
  args: {
    additionalHelperTextIds: undefined,
    className: undefined,
    defaultValue: undefined,
    helperText: "Let it all out.",
    id: "textarea",
    invalidText: "This is error text :(",
    isClearable: false,
    isClearableCallback: undefined,
    isDisabled: false,
    isInvalid: false,
    isRequired: true,
    labelText: "In less than 500 words, describe your favorite color?",
    max: undefined,
    maxLength: undefined,
    min: undefined,
    name: undefined,
    onChange: undefined,
    onClick: undefined,
    onFocus: undefined,
    pattern: undefined,
    placeholder: "Essay question...",
    requiredLabelText: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
    step: 1,
    textInputType: "default",
    type: "textarea",
    value: undefined,
  },
  argTypes: {
    type: { control: false },
    textInputType: { control: false },
  },
  render: (args) => <TextInput {...args} />,
};
