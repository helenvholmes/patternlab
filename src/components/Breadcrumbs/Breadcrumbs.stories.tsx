import { Box, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumbs, { breadcrumbTypeArray } from "./Breadcrumbs";
import Heading from "../Heading/Heading";
import Link from "../Link/Link";

const breadcrumbsData = [
  { url: "#", text: "Parent" },
  { url: "#", text: "Child" },
  { url: "#", text: "Grandchild" },
];

const linkPropsBreadcrumbsData = [
  { url: "#", text: "Parent", linkProps: { target: "_top" } },
  { url: "#", text: "Child", linkProps: { target: "_top" } },
  { url: "#", text: "Grandchild", linkProps: { target: "_top" } },
];

const breadcrumbsLongTextData = [
  { url: "#", text: "Parent with a Long Name" },
  { url: "#", text: "Child with an Even Longer Name" },
  {
    url: "#",
    text: "Grandchild with an Exceptionally Long Name",
  },
  {
    url: "#",
    text: "Great-Grandchild with the Longest Name That Will Wrap onto the Second Line of the Breadcrumb Component Under the Right Circumstances",
  },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    breadcrumbsData: { control: false },
    customLinkComponent: { control: false },
    breadcrumbsType: {
      table: { defaultValue: { summary: "whatsOn" } },
      control: {
        type: "select",
      },
      options: breadcrumbTypeArray,
    },
    className: { control: false },
    id: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/**
 * Main Story for the Accordion component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    breadcrumbsData,
    breadcrumbsType: "whatsOn",
    className: undefined,
    customLinkComponent: undefined,
    id: "breadcrumbs-id",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=10766%3A1031",
    },
    jest: ["Breadcrumbs.test.tsx"],
  },
};

// The following are additional Breadcrumbs example Stories.
export const LongText: Story = {
  render: () => <Breadcrumbs breadcrumbsData={breadcrumbsLongTextData} />,
};
export const CustomLinkComponent: Story = {
  render: () => (
    <Breadcrumbs
      customLinkComponent={Link}
      breadcrumbsData={linkPropsBreadcrumbsData}
    />
  ),
};
export const ColorVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Blogs
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="blogs"
          customLinkComponent={Link}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Books and More
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="booksAndMore"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Connect
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="connect"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Digital Collections
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="digitalCollections"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Education
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="education"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Locations
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="locations"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Research
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="research"
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          What's On
        </Heading>
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="whatsOn"
        />
      </Box>
    </VStack>
  ),
};
