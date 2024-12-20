import { VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Link, { linkTypesArray } from "./Link";
import Icon from "../Icons/Icon";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof Link> = {
  title: "Components/Navigation/Link",
  component: Link,
  argTypes: {
    children: { table: { disable: true } },
    className: { control: false },
    hasVisitedState: argsBooleanType("true"),
    href: { control: { type: "text" } },
    id: { control: false },
    isUnderlined: argsBooleanType("true"),
    onClick: { control: false },
    ref: { table: { disable: true } },
    rel: { control: { type: "text" } },
    screenreaderOnlyText: { control: { type: "text" } },
    target: { control: false },
    type: {
      control: { type: "select" },
      options: linkTypesArray,
      table: { defaultValue: { summary: "default" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Main Story for the Link component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    children: "Link",
    className: "custom-class",
    hasVisitedState: true,
    href: "https://nypl.org",
    id: "nypl-link",
    isUnderlined: true,
    onClick: undefined,
    rel: undefined,
    screenreaderOnlyText: "Screenreader only text",
    target: undefined,
    type: "action",
  },
  render: (args: any) => <Link {...args}>{args.children}</Link>,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=36854%3A24387",
    },
    jest: ["Link.test.tsx"],
  },
};

// The following are additional Link example Stories.
export const Accessibility: Story = {
  render: () => (
    <Link type="external" href="https://nypl.org">
      NYPL Website
    </Link>
  ),
};
export const AllLinkTypes: Story = {
  render: () => (
    <VStack spacing="l" align="flex-start">
      <Link type="default" href="#default-link-example">
        Default
      </Link>
      <Link type="action" href="#action-link-example">
        Action
      </Link>
      <Link type="external" href="#external-link-example">
        External
      </Link>
      <Link type="standalone" href="#standalone-link-example">
        Standalone
      </Link>
      <Link type="backwards" href="#backwards-link-example">
        Backwards
      </Link>
      <Link type="forwards" href="#forwards-link-example">
        Forwards
      </Link>
      <Link type="buttonPrimary" href="#buttonPrimary-link-example">
        Button Primary
      </Link>
      <Link type="buttonSecondary" href="#buttonSecondary-link-example">
        Button Secondary
      </Link>
      <Link type="buttonPill" href="#buttonPill-link-example">
        Button Pill
      </Link>
      <Link type="buttonCallout" href="#buttonCallout-link-example">
        Button Callout
      </Link>
      <Link type="buttonNoBrand" href="#buttonNoBrand-link-example">
        Button No Brand
      </Link>
      <Link type="buttonDisabled" href="#buttonDisabled-link-example">
        Button Disabled
      </Link>
      <Link type="button" href="#button-deprecated" width="auto">
        Button (deprecated)
      </Link>
    </VStack>
  ),
};
export const LinksWithIcons: Story = {
  render: () => (
    <VStack spacing="xs" align="flex-start">
      <Link type="action" href="#headset-icon-example">
        <Icon name="headset" align="left" size="small" />
        Headset Link
      </Link>
      <Link type="action" href="#clock-icon-example">
        <Icon name="clock" align="left" size="small" />
        Clock Link
      </Link>
      <Link type="action" href="#action-check-left">
        <Icon name="check" align="left" size="small" />
        Check Link
      </Link>
      <Link type="action" href="#action-check-right">
        Check Link Right
        <Icon name="check" align="right" size="small" />
      </Link>
    </VStack>
  ),
};
