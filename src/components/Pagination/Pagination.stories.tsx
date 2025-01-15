import { VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from "../Button/Button";
import Pagination from "./Pagination";
import { getStorybookHrefProps } from "../../utils/utils";

const hrefProps = getStorybookHrefProps(10);

const meta: Meta<typeof Pagination> = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  argTypes: {
    className: { control: false },
    currentPage: { control: false },
    getPageHref: { control: false },
    id: { control: false },
    initialPage: { control: false, table: { defaultValue: { summary: "1" } } },
    onPageChange: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * The Pagination component doesn't have a "main" story. Both variations are
 * equally important with two separate features so they will both be highlighted.
 * This must contains the `args` and `parameters` properties in this object.
 */
export const URLUpdates: Story = {
  args: {
    className: undefined,
    getPageHref: hrefProps.getPageHref,
    id: "pagination-id",
    initialPage: hrefProps.computedCurrentPage || 1,
    pageCount: 10,
  },
  name: "Pagination with URL Updates",
  render: (args) => <Pagination {...args} onPageChange={undefined} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=17226%3A932",
    },
    jest: ["Pagination.test.tsx"],
  },
};
export const UnchangingURL: Story = {
  args: {
    className: undefined,
    id: "pagination-id-2",
    initialPage: 7,
    onPageChange: (selectedPage) => {
      console.log(`Current page: ${selectedPage}`);
    },
    pageCount: 10,
  },
  name: "Pagination with Unchanging URL",
  render: (args) => <Pagination {...args} getPageHref={undefined} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=17226%3A932",
    },
    jest: ["Pagination.test.tsx"],
  },
};

// The following are additional Accordion example Stories.
function CurrentPagePaginationExample() {
  const [page, setPage] = useState(1);
  const handleClick = () => setPage(1);
  const handleSelection = (selectedPage) => setPage(selectedPage);

  return (
    <VStack align="start" spacing={6}>
      <Pagination
        pageCount={10}
        currentPage={page}
        onPageChange={(selectedPage) => handleSelection(selectedPage)}
      />
      <Button id="go-to-btn" type="button" onClick={handleClick}>
        Go to Page 1
      </Button>
    </VStack>
  );
}

export const UpdateProgrammatically: Story = {
  render: () => <CurrentPagePaginationExample />,
  name: "Forcing a Page Change Programmatically",
};
