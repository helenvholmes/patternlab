import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { createRef } from "react";

import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Form from "../Form/Form";
import Radio from "../Radio/Radio";
import RadioGroup from "./RadioGroup";
import SimpleGrid from "../Grid/SimpleGrid";
import Heading from "../Heading/Heading";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Form Elements/RadioGroup",
  component: RadioGroup,
  argTypes: {
    children: { table: { disable: true } },
    className: { control: false },
    id: { control: false },
    isDisabled: argsBooleanType(),
    isFullWidth: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRequired: argsBooleanType(),
    layout: {
      table: { defaultValue: { summary: "column" } },
    },
    key: { table: { disable: true } },
    onChange: { control: false },
    ref: { table: { disable: true } },
    showHelperInvalidText: argsBooleanType("true"),
    showLabel: argsBooleanType("true"),
    showRequiredLabel: argsBooleanType("true"),
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Main Story for the RadioGroup component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const Controls: Story = {
  args: {
    className: undefined,
    defaultValue: "4",
    helperText: "This is the helper text for the full group.",
    id: "radioGroup-id",
    invalidText: "An error occurred :(",
    isDisabled: false,
    isFullWidth: false,
    isInvalid: false,
    isRequired: false,
    labelText: "Standard Radio Group",
    layout: "column",
    name: "radio-story",
    onChange: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio id="main-2" labelText="Radio 2" value="2" />
      <Radio id="main-3" labelText="Radio 3" value="3" />
      <Radio id="main-4" labelText="Radio 4" value="4" />
      <Radio id="main-5" labelText="Radio 5" value="5" />
    </RadioGroup>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=11895%3A742",
    },
    jest: ["RadioGroup.test.tsx"],
  },
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement);

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    expect(screen.getByLabelText("Radio 4")).toBeChecked();

    await userEvent.click(screen.getByLabelText("Radio 3"));
    await userEvent.click(screen.getByLabelText("Radio 2"));
    await userEvent.click(screen.getByLabelText("Radio 5"));
    expect(screen.getByLabelText("Radio 5")).toBeChecked();

    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowleft}");
    await userEvent.keyboard("{arrowup}");
    await userEvent.keyboard("{arrowright}");
    await userEvent.keyboard("{arrowdown}");
    expect(screen.getByLabelText("Radio 2")).toBeChecked();
  },
};

// The following are additional RadioGroup example Stories.
export const LayoutPatterns: Story = {
  render: () => (
    <>
      <RadioGroup
        defaultValue="4"
        id="column"
        labelText="Column (default)"
        name="column-example"
      >
        <Radio id="column-2" labelText="Radio 2" value="2" />
        <Radio id="column-3" labelText="Radio 3" value="3" />
        <Radio id="column-4" labelText="Radio 4" value="4" />
        <Radio id="column-5" labelText="Radio 5" value="5" />
      </RadioGroup>
      <br />
      <RadioGroup
        defaultValue="3"
        id="row"
        labelText="Row"
        name="row-example"
        layout="row"
      >
        <Radio id="row-2" labelText="Radio 2" value="2" />
        <Radio id="row-3" labelText="Radio 3" value="3" />
        <Radio id="row-4" labelText="Radio 4" value="4" />
        <Radio id="row-5" labelText="Radio 5" value="5" />
      </RadioGroup>
    </>
  ),
};

export const BrowserStates: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Errored
        </Heading>
        <RadioGroup
          defaultValue="4"
          id="errored"
          invalidText="Error message for the full group."
          isInvalid
          labelText="Errored Radio Group"
          name="errored-example"
        >
          <Radio id="radio-2" labelText="Radio 2" value="2" />
          <Radio id="radio-3" labelText="Radio 3" value="3" />
          <Radio id="radio-4" labelText="Radio 4" value="4" />
          <Radio id="radio-5" labelText="Radio 5" value="5" />
        </RadioGroup>
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Required
        </Heading>
        <RadioGroup
          helperText="The reason for being required."
          id="required"
          isRequired
          labelText="Required Radio Group"
          name="required-example"
        >
          <Radio id="required-2" labelText="Radio 2" value="2" />
          <Radio id="required-3" labelText="Radio 3" value="3" />
          <Radio id="required-4" labelText="Radio 4" value="4" />
          <Radio id="required-5" labelText="Radio 5" value="5" />
        </RadioGroup>
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Disabled
        </Heading>
        <RadioGroup
          helperText="The reason for being disabled."
          id="disabled"
          isDisabled
          labelText="Disabled Radio Group"
          name="disabled-example"
        >
          <Radio id="required-2" labelText="Radio 2" value="2" />
          <Radio id="required-3" labelText="Radio 3" value="3" />
          <Radio id="required-4" labelText="Radio 4" value="4" />
          <Radio id="required-5" labelText="Radio 5" value="5" />
        </RadioGroup>
      </Box>
    </VStack>
  ),
};

export const JSXElement: Story = {
  render: () => (
    <RadioGroup
      id="jsx-radiogroup"
      isFullWidth
      labelText="Radio Group"
      name="radio-example"
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
        id="english"
        labelText={
          <Flex>
            <span>English</span>
            <Spacer />
            <span>23</span>
          </Flex>
        }
        value="English"
      />
      <Radio
        id="science"
        labelText={
          <Flex>
            <span>Science</span>
            <Spacer />
            <span>10</span>
          </Flex>
        }
        value="Science"
      />
      <Radio
        id="math"
        labelText={
          <Flex>
            <span>Math</span>
            <Spacer />
            <span>3</span>
          </Flex>
        }
        value="Math"
      />
    </RadioGroup>
  ),
  name: "Label Using JSX Elements",
};

function RadioGroupControlledExample() {
  const onChange = (selected) => {
    // This will return the value selected as a string.
    console.log(`Controlled example. Selected: ${selected}`);
  };
  return (
    <RadioGroup
      defaultValue="3"
      id="controlled-example"
      labelText="Controlled RadioGroup"
      name="radioGroupExample"
      onChange={onChange}
    >
      <Radio id="2" labelText="Radio 2" value="2" />
      <Radio id="3" labelText="Radio 3" value="3" />
      <Radio id="4" labelText="Radio 4" value="4" />
    </RadioGroup>
  );
}
export const ControlledExample: Story = {
  render: () => <RadioGroupControlledExample />,
};

function RadioGroupUncontrolledExample() {
  const radioGroupRef = createRef<HTMLDivElement>();
  // Get the value through:
  const onSubmit = (e) => {
    e.preventDefault();
    const radioGroupValue = (radioGroupRef.current as any).value;
    console.log(`Uncontrolled example. Selected: ${radioGroupValue}`);
  };
  return (
    <Form id="form" onSubmit={onSubmit}>
      <SimpleGrid columns={1}>
        <RadioGroup
          defaultValue="3"
          id="uncontrolled-example"
          labelText="Uncontrolled RadioGroup"
          name="radioGroupExample"
          ref={radioGroupRef}
        >
          <Radio id="2" labelText="Radio 2" value="2" />
          <Radio id="3" labelText="Radio 3" value="3" />
          <Radio id="4" labelText="Radio 4" value="4" />
        </RadioGroup>
        <ButtonGroup>
          <Button id="submit" type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </SimpleGrid>
    </Form>
  );
}

export const UncontrolledExample: Story = {
  render: () => <RadioGroupUncontrolledExample />,
};
