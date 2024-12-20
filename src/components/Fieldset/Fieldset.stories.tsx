import type { Meta, StoryObj } from "@storybook/react";

import Fieldset from "./Fieldset";

const FieldsetTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Fieldset {...args}>
        <p>Text children in the Fieldset component.</p>
      </Fieldset>
    );
  },
};

const meta: Meta<typeof Fieldset> = {
  title: "Components/Form Elements/Fieldset",
  component: Fieldset,
  argTypes: {
    id: { control: false },
    className: { control: false },
    isLegendHidden: { table: { defaultValue: { summary: "false" } } },
    isRequired: { table: { defaultValue: { summary: "false" } } },
    legendText: { control: { type: "text" } },
    showRequiredLabel: { table: { defaultValue: { summary: "false" } } },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

/**
 * Main Story for the Fieldset component. This must contains the `args`
 * and `parameters` properties in this object.
 */

export const WithControls: Story = {
  ...FieldsetTemplate,
  args: {
    id: "fieldset-id",
    isLegendHidden: false,
    isRequired: false,
    legendText: "This is the legend text",
    showRequiredLabel: false,
  },
  parameters: {
    jest: "Fieldset.test.tsx",
  },
};
