import { VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Heading, { headingLevelsArray, headingSizesArray } from "./Heading";
import Link from "../Link/Link";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof Heading> = {
  title: "Components/Typography & Styles/Heading",
  component: Heading,
  argTypes: {
    className: { control: false },
    id: { control: false },
    isCapitalized: argsBooleanType(),
    isUppercase: argsBooleanType(),
    isLowercase: argsBooleanType(),
    level: {
      control: { type: "select" },
      options: headingLevelsArray,
      table: { defaultValue: { summary: "h2" } },
    },
    noSpace: { table: { defaultValue: { summary: "false" } } },
    overline: { control: { type: "text" } },
    size: {
      control: { type: "select" },
      options: headingSizesArray,
    },
    subtitle: { control: { type: "text" } },
    text: { control: { type: "text" } },
    url: { control: { type: "text" } },
    urlClass: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

/**
 * Main Story for the Heading component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    id: "heading-id",
    isCapitalized: false,
    isUppercase: false,
    isLowercase: false,
    level: "h2",
    noSpace: true,
    overline: undefined,
    size: undefined,
    subtitle: undefined,
    text: "Default Heading",
    url: undefined,
    urlClass: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=10975%3A16",
    },
    jest: ["Heading.test.tsx"],
  },
  render: (args) => (
    <VStack align="left" spacing="l">
      <Heading {...args} />
      <Heading {...args} color="brand.primary" />
      <Heading
        {...args}
        bgColor="brand.primary"
        color="ui.typography.inverse.heading"
        px="s"
        py="xs"
      />
    </VStack>
  ),
};

// The following are additional Heading example Stories.
export const DefaultStyles: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-h1"
        level="h1"
        noSpace
        text="(h1) Lorem ipsum dolor"
      />
      <Heading id="heading-h2" level="h2" text="(h2) Lorem ipsum dolor" />
      <Heading id="heading-h3" level="h3" text="(h3) Lorem ipsum dolor" />
      <Heading id="heading-h4" level="h4" text="(h4) Lorem ipsum dolor" />
      <Heading id="heading-h5" level="h5" text="(h5) Lorem ipsum dolor" />
      <Heading id="heading-h6" level="h6" text="(h6) Lorem ipsum dolor" />
    </VStack>
  ),
};

export const SizeStyles: Story = {
  name: "Sizes",
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-display1"
        level="h1"
        noSpace
        size="display1"
        text="(display1) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading1"
        level="h1"
        size="heading1"
        text="(heading1) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading2"
        level="h1"
        size="heading2"
        text="(heading2) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading3"
        level="h1"
        size="heading3"
        text="(heading3) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading4"
        level="h1"
        size="heading4"
        text="(heading4) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading5"
        level="h1"
        size="heading5"
        text="(heading5) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading6"
        level="h1"
        size="heading6"
        text="(heading6) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading7"
        level="h1"
        size="heading7"
        text="(heading7) Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading8"
        level="h1"
        size="heading8"
        text="(heading8) Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const DefaultStylesDeprecated: Story = {
  name: "Deprecated Styles",
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-one"
        level="one"
        noSpace
        text="(one) Lorem ipsum dolor"
      />
      <Heading id="heading-two" level="two" text="(two) Lorem ipsum dolor" />
      <Heading
        id="heading-three"
        level="three"
        text="(three) Lorem ipsum dolor"
      />
      <Heading id="heading-four" level="four" text="(four) Lorem ipsum dolor" />
      <Heading id="heading-five" level="five" text="(five) Lorem ipsum dolor" />
      <Heading
        id="heading-six"
        color="inheret"
        level="six"
        text="(six) Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const SizeStylesDeprecated: Story = {
  name: "Deprecated Sizes",
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-primary"
        level="one"
        noSpace
        size="primary"
        text="(primary) Lorem ipsum dolor"
      />
      <Heading
        id="heading-secondary"
        level="one"
        size="secondary"
        text="(secondary) Lorem ipsum dolor"
      />
      <Heading
        id="heading-tertiary"
        level="one"
        size="tertiary"
        text="(tertiary) Lorem ipsum dolor"
      />
      <Heading
        id="heading-callout"
        level="one"
        size="callout"
        text="(callout) Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const Overline: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-display1"
        level="h1"
        noSpace
        overline="Overline"
        size="display1"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading1"
        level="h1"
        noSpace
        overline="Overline"
        size="heading1"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading2"
        level="h1"
        noSpace
        overline="Overline"
        size="heading2"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading3"
        level="h1"
        noSpace
        overline="Overline"
        size="heading3"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading4"
        level="h1"
        noSpace
        overline="Overline"
        size="heading4"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading5"
        level="h1"
        noSpace
        overline="Overline"
        size="heading5"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading6"
        level="h1"
        noSpace
        overline="Overline"
        size="heading6"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading7"
        level="h1"
        noSpace
        overline="Overline"
        size="heading7"
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading8"
        level="h1"
        noSpace
        overline="Overline"
        size="heading8"
        text="Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const Subtitle: Story = {
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-display1"
        level="h1"
        noSpace
        size="display1"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading1"
        level="h1"
        noSpace
        size="heading1"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading2"
        level="h1"
        noSpace
        size="heading2"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading3"
        level="h1"
        noSpace
        size="heading3"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading4"
        level="h1"
        noSpace
        size="heading4"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading5"
        level="h1"
        noSpace
        size="heading5"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading6"
        level="h1"
        noSpace
        size="heading6"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading7"
        level="h1"
        noSpace
        size="heading7"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading8"
        level="h1"
        noSpace
        size="heading8"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const OverlineAndSubtitle: Story = {
  name: "Overline and Subtitle",
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-display1"
        level="h1"
        overline="Overline"
        size="display1"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading1"
        level="h1"
        overline="Overline"
        size="heading1"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading2"
        level="h1"
        overline="Overline"
        size="heading2"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading3"
        level="h1"
        overline="Overline"
        size="heading3"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading4"
        level="h1"
        overline="Overline"
        size="heading4"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading5"
        level="h1"
        overline="Overline"
        size="heading5"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading6"
        level="h1"
        overline="Overline"
        size="heading6"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading7"
        level="h1"
        overline="Overline"
        size="heading7"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
      <Heading
        id="heading-heading8"
        level="h1"
        overline="Overline"
        size="heading8"
        subtitle="The subtitle text sits below the main heading text."
        text="Lorem ipsum dolor"
      />
    </VStack>
  ),
};

export const BoldText: Story = {
  render: () => (
    <Heading id="headingWithBold" level="h2" noSpace>
      <>
        Heading with a <b>Bold</b> Word
      </>
    </Heading>
  ),
};

export const Links: Story = {
  name: "Links",
  render: () => (
    <VStack align="left" spacing="l">
      <Heading
        id="heading-with-text-url-values"
        level="h3"
        noSpace
        text="Heading with `url` and `text` props"
        url="http://apple.com"
        urlClass="special-link"
      />
      <Heading
        id="heading-with-link-url"
        level="h3"
        noSpace
        url="http://apple.com"
        urlClass="special-link"
      >
        Heading with `url` prop value
      </Heading>
      <Heading id="heading-with-anchor" level="h3" noSpace>
        <a href="#hello">Link from HTML anchor element</a>
      </Heading>
      <Heading id="heading-with-DS-link" level="h3" noSpace>
        <Link href="#hello">Link using DS `Link` component</Link>
      </Heading>
      <Heading id="heading-with-link-child" level="h3" noSpace>
        <>
          Not acceptable. Do not use. <a href="#hello">Link</a>
        </>
      </Heading>
      <Heading id="heading-with-DS-link-child" level="h3" noSpace>
        <>
          <span>Text wrapped in a span </span>
          <Link href="#hello">Link</Link>
          <span> Not a recommended pattern</span>
        </>
      </Heading>
    </VStack>
  ),
};
