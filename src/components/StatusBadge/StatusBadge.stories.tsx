import { Box, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Icon from "../Icons/Icon";
import StatusBadge, {
  statusBadgeFontSizeArray,
  statusBadgeLevelArray,
  statusBadgeTypeArray,
} from "./StatusBadge";
import Table from "../Table/Table";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/Content Display/StatusBadge",
  component: StatusBadge,
  argTypes: {
    className: { control: false },
    fontSize: {
      description: "**Only used for Storybook** - Set the label font size.",
      table: { defaultValue: { summary: "desktop.body.body2" } },
      type: { name: "string" },
      control: { type: "radio" },
      options: statusBadgeFontSizeArray,
    },
    id: { control: false },
    level: {
      table: { defaultValue: { summary: "low" } },
      control: { type: "radio" },
      options: statusBadgeLevelArray,
    },
    type: {
      control: { type: "select" },
      options: statusBadgeTypeArray,
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

/**
 * Main Story for the StatusBadge component. This must contains the `args`
 *  and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    fontSize: undefined,
    id: "statusBadge-id",
    level: undefined,
    type: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=11256%3A0",
    },
    jest: "StatusBadge.test.tsx",
  },
  render: ({ ...args }) => {
    return <StatusBadge {...args}>Registration required</StatusBadge>;
  },
};

// The following are additional StatusBadge example Stories.

export const Types: Story = {
  render: () => (
    <Table
      columnHeaders={["", "Variant", "Purpose", "Examples"]}
      tableData={[
        [
          <>
            <StatusBadge type="neutral">Neutral</StatusBadge>
          </>,
          <>
            <Box whiteSpace="nowrap">Neutral (default)</Box>
          </>,
          "Indicates a general, non-critical status update.",
          "Unavailable, Draft, Not started",
        ],
        [
          <>
            <StatusBadge type="informative">Informative</StatusBadge>
          </>,
          "Informative",
          "Communicates helpful information or an important attribute.",
          "Available, New, Help, Active, In-use, Live",
        ],
        [
          <>
            <StatusBadge type="positive">Positive</StatusBadge>
          </>,
          "Positive",
          "Indicates a constructive or successful state.",
          "Completed, Approved, Success, Published",
        ],
        [
          <>
            <StatusBadge type="negative">Negative</StatusBadge>
          </>,
          "Negative",
          "Informs users of problems or errors that require potential action to correct.",
          "Error, Deleted, Failed",
        ],
        [
          <>
            <StatusBadge type="warning">Warning</StatusBadge>
          </>,
          "Warning",
          "Communicates cautionary or time-sensitive information.",
          "Missing, Warning, Cancelled, Busy",
        ],
        [
          <>
            <StatusBadge type="recommendation">Recommendation</StatusBadge>
          </>,
          "Recommendation",
          "Highlights a suggestion that will improve the experience and achieve better results.",
          "Recommended for you, Related",
        ],
      ]}
      tableTextSize="body2"
    />
  ),
};

export const Levels: Story = {
  render: () => (
    <Table
      columnHeaders={["", "Variant", "Purpose", "Examples"]}
      tableData={[
        [
          <>
            <StatusBadge level="low">Low level</StatusBadge>
          </>,
          <>
            <Box whiteSpace="nowrap">Low (default)</Box>
          </>,
          "Used to indicate standard or low priority.",
          "Library Card Required",
        ],
        [
          <>
            <StatusBadge level="medium">Medium level</StatusBadge>
          </>,
          "Medium",
          "Indicates moderate priority – something is important, but not critical.",
          "Pending, Cancelled",
        ],
        [
          <>
            <StatusBadge level="high">High level</StatusBadge>
          </>,
          "High",
          "Indicates the highest priority – this is critical and very important; destructive",
          "On-Site Access Only, Closed, Unavailable",
        ],
      ]}
      tableTextSize="body2"
    />
  ),
};

export const FontSize: Story = {
  render: () => (
    <Table
      columnHeaders={["Body1", "Body2 (default)", "Caption"]}
      tableData={[
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="neutral">
              Neutral
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="neutral">Neutral</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="neutral">
              Neutral
            </StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="informative">
              Informative
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="informative">Informative</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="informative">
              Informative
            </StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="positive">
              Positive
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="positive">Positive</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="positive">
              Positive
            </StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="negative">
              Negative
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="negative">Negative</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="negative">
              Negative
            </StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="warning">
              Warning
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="warning">Warning</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="warning">
              Warning
            </StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge fontSize="desktop.body.body1" type="recommendation">
              Recommendation
            </StatusBadge>
          </>,
          <>
            <StatusBadge type="recommendation">Recommendation</StatusBadge>
          </>,
          <>
            <StatusBadge fontSize="desktop.caption" type="recommendation">
              Recommendation
            </StatusBadge>
          </>,
        ],
      ]}
    />
  ),
};

export const Labeling: Story = {
  render: () => (
    <Table
      columnHeaders={["Standard", "All Caps"]}
      tableData={[
        [
          <>
            <StatusBadge type="neutral">Request pending</StatusBadge>
          </>,
          <>
            <StatusBadge type="neutral">REQUEST PENDING</StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge type="informative">In progress</StatusBadge>
          </>,
          <>
            <StatusBadge type="informative">IN PROGRESS</StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge type="positive">Ready for pickup</StatusBadge>
          </>,
          <>
            <StatusBadge type="positive">READY FOR PICKUP</StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge type="negative">Closed</StatusBadge>
          </>,
          <>
            <StatusBadge type="negative">CLOSED</StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge type="warning">Cancelled</StatusBadge>
          </>,
          <>
            <StatusBadge type="warning">CANCELLED</StatusBadge>
          </>,
        ],
        [
          <>
            <StatusBadge type="recommendation">Related</StatusBadge>
          </>,
          <>
            <StatusBadge type="recommendation">RELATED</StatusBadge>
          </>,
        ],
      ]}
    />
  ),
};

export const Icons: Story = {
  render: () => (
    <VStack spacing="s" align="stretch">
      <StatusBadge level="high">
        <Icon color="brand.primary" mr="xs" name="errorFilled" size="medium" />
        On-Site Access Only
      </StatusBadge>
      <StatusBadge fontSize="desktop.caption" type="warning">
        <Icon
          color="ui.warning.secondary"
          mr="xs"
          name="actionHelpDefault"
          size="medium"
        />
        Mising information
      </StatusBadge>
      <StatusBadge level="low">
        Registration Required
        <Icon
          color="ui.black"
          ml="xs"
          name="actionIdentityFilled"
          size="medium"
        />
      </StatusBadge>
      <StatusBadge fontSize="desktop.body.body1" type="informative">
        Includes audio
        <Icon color="ui.link.secondary" ml="xs" name="headset" size="medium" />
      </StatusBadge>
    </VStack>
  ),
};
