import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import Pagination from "../Pagination/Pagination";

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
  render: () => (
    <>
      <Header />
      <Pagination pageCount={10} />
      <h1>test </h1>
    </>
  ),
};
