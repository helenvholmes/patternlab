import type { Meta, StoryObj } from "@storybook/react";
import Text, { textSizesArray } from "./Text";
import { argsBooleanType } from "../../helpers/storybookUtils";
import formatNumber from "../../hooks/useFormatNumber";

const meta: Meta<typeof Text> = {
  title: "Components/Typography & Styles/Text",
  component: Text,
  argTypes: {
    children: { table: { disable: true } },
    className: { control: false },
    isBold: argsBooleanType(),
    isItalic: argsBooleanType(),
    isCapitalized: argsBooleanType(),
    isUppercase: argsBooleanType(),
    isLowercase: argsBooleanType(),
    noSpace: argsBooleanType(),
    role: { control: false },
    size: {
      control: {
        type: "select",
      },
      options: textSizesArray,
      table: { defaultValue: { summary: "default" } },
    },
  },
};

const copiesSold = formatNumber(81450000);
const suggestedPrice = formatNumber(100, "20000");

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * Main Story for the Text component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    isBold: false,
    isItalic: false,
    isCapitalized: false,
    isUppercase: false,
    isLowercase: false,
    noSpace: false,
    role: undefined,
    size: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?type=design&node-id=10975-52&t=AEGDRpspvTyuSWSA-4",
    },
    jest: "Text.test.tsx",
  },
  render: (args) => (
    <>
      <Text {...args}>
        Animal Crossing[a] is a <b>social</b> simulation video game series
        developed and published by Nintendo. The series was conceptualized and
        created by Katsuya Eguchi and Hisashi Nogami. In Animal Crossing, the
        player character is a human who lives in a village inhabited by various
        anthropomorphic animals and can do various activities like fishing, bug
        catching, and fossil hunting. The series is notable for its open-ended
        gameplay and use of the video game console's internal clock and calendar
        to simulate real passage of time.
      </Text>
      <Text {...args}>
        Since its initial release in 2001, five Animal Crossing games have been
        released worldwide, one each for the Nintendo 64/iQue Player (enhanced
        and reissued for the GameCube), Nintendo DS, Wii, Nintendo 3DS and
        Nintendo Switch. The series has been both critically and commercially
        successful and has sold over 60 million units worldwide. Three spin-off
        games have also been released: Animal Crossing: Happy Home Designer for
        Nintendo 3DS, Animal Crossing: Amiibo Festival for Wii U, and Animal
        Crossing: Pocket Camp for mobile devices.
      </Text>
      <Text {...args}>
        As of June 2024, the Animal Crossing franchise has sold over $
        {copiesSold} copies worldwide. Suggested retail price: ${suggestedPrice}
      </Text>
    </>
  ),
};

// The following are additional Heading example Stories.
export const RecommendedOptions: Story = {
  render: () => (
    <>
      <Text size="body1">Body 1</Text>
      <Text size="body2">Body 2</Text>
      <Text size="caption">Caption</Text>
      <Text size="subtitle1">Subtitle 1</Text>
      <Text size="subtitle2">Subtitle 2</Text>
      <Text size="overline1">Overline 1</Text>
      <Text size="overline2">Overline 2</Text>
    </>
  ),
};
export const DeprecatedOptions: Story = {
  render: () => (
    <>
      <Text size="tag">Tag text (deprecated)</Text>
      <Text size="mini">Mini text (deprecated)</Text>
    </>
  ),
};
