import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Temp/Header",
  component: Header,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const WithControls: Story = {
  args: {},
  parameters: {},
  render: () => <Header />,
};
