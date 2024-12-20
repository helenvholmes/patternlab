import type { Meta, StoryObj } from "@storybook/react";

import HelperErrorText from "./HelperErrorText";
import Link from "../Link/Link";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";

const meta: Meta<typeof HelperErrorText> = {
  title: "Components/Content Display/HelperErrorText",
  component: HelperErrorText,
  argTypes: {
    ariaAtomic: {
      control: false,
      table: { defaultValue: { summary: "true" } },
    },
    ariaLive: {
      table: { defaultValue: { summary: "polite" } },
    },
    children: { table: { disable: true } },
    className: { control: false },
    id: { control: false },
    isInvalid: {
      table: { defaultValue: { summary: "false" } },
    },
    isRenderedText: {
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HelperErrorText>;

/**
 * Main Story for the HelperErrorText component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    ariaAtomic: undefined,
    ariaLive: undefined,
    className: undefined,
    id: "helperErrorText-id",
    isInvalid: false,
    text: "This is the helper text!",
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
    jest: ["HelperErrorText.test.tsx"],
  },
  render: (args) => (
    <HelperErrorText
      {...args}
      text={args.isInvalid ? "This is the error text :(" : args.text}
    />
  ),
};

// The following are additional HelperErrorText example Stories.
export const TextInputExample: Story = {
  name: "TextInput Example",
  render: () => (
    <TextInput
      helperText="Choose wisely."
      id="textInput-id"
      invalidText="This is error text :("
      isInvalid={true}
      labelText="What is your favorite color?"
      name="textInput-name"
      placeholder="e.g. blue, green, etc."
    />
  ),
};

export const AriaControls: Story = {
  args: {
    ariaAtomic: true,
    ariaLive: "polite",
  },
  name: "ARIA Controls",
  render: (args) => (
    <HelperErrorText
      {...args}
      text="Live updates to the helper and error text can be read to screen readers with the appropriate aria-atomic and aria-live props."
    />
  ),
};

export const HTMLChildren: Story = {
  name: "HTML Children",
  render: () => (
    <>
      <HelperErrorText
        text={
          <>
            This first example uses an HTML anchor element for{" "}
            <a href="https://nypl.org">a link</a>.
          </>
        }
      />
      <HelperErrorText
        text={
          <Text>
            This second example uses Reservoir Design System (DS) components,
            such as the <Link href="#">`Link`</Link> component, and the `Text`
            component.
          </Text>
        }
      />
    </>
  ),
};

export const InvalidState: Story = {
  name: "Invalid State",
  render: () => <HelperErrorText isInvalid text="This is the error text :(" />,
};
