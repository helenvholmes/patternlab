import { Box, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import SocialMediaLinks, {
  SocialMediaLinkDataProps,
  borderTypeArray,
  colorTypeArray,
  sizeTypeArray,
} from "./SocialMediaLinks";
import { layoutTypesArray } from "../../helpers/types";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";

const exampleAllLinkData: SocialMediaLinkDataProps[] = [
  {
    icon: "fileTypeGenericDoc",
    labelText: "NYPL Blog",
    url: "https://nypl.org/blog",
  },
  {
    icon: "socialFacebook",
    labelText: "Facebook",
    url: "https://facebook.com/nypl",
  },
  {
    icon: "socialInstagram",
    labelText: "Instagram",
    url: "https://instagram.com/nypl",
  },
  {
    icon: "socialPinterest",
    labelText: "Pinterest",
    url: "https://pinterest.com/nypl",
  },
  {
    icon: "socialSoundCloud",
    labelText: "SoundCloud",
    url: "https://soundcloud.com/nypl",
  },
  {
    icon: "socialTikTok",
    labelText: "TikTok",
    url: "https://tiktok.com/@nypl",
  },
  {
    icon: "socialTumblr",
    labelText: "Tumblr",
    url: "https://nypl.tumblr.com",
  },
  {
    icon: "socialTwitter",
    labelText: "Twitter",
    url: "https://twitter.com/nypl",
  },
  {
    icon: "socialX",
    labelText: "X",
    url: "https://x.com/nypl",
  },
  {
    icon: "socialYoutube",
    labelText: "YouTube",
    url: "https://youtube.com/newyorkpubliclibrary",
  },
];
const exampleLinkData: SocialMediaLinkDataProps[] = [
  {
    icon: "socialFacebook",
    labelText: "Facebook",
    url: "https://facebook.com/nypl",
  },
  {
    icon: "socialX",
    labelText: "X",
    url: "https://x.com/nypl",
  },
  {
    icon: "socialInstagram",
    labelText: "Instagram",
    url: "https://instagram.com/nypl",
  },
];

const exampleTwoLinkData: SocialMediaLinkDataProps[] = [
  {
    icon: "socialPinterest",
    labelText: "Pinterest",
    url: "https://pinterest.com/nypl",
  },
  {
    icon: "socialSoundCloud",
    labelText: "SoundCloud",
    url: "https://soundcloud.com/nypl",
  },
  {
    icon: "socialTumblr",
    labelText: "Tumblr",
    url: "https://nypl.tumblr.com",
  },
  {
    icon: "socialX",
    labelText: "X",
    url: "https://x.com/nypl",
  },
  {
    icon: "socialYoutube",
    labelText: "YouTube",
    url: "https://youtube.com/newyorkpubliclibrary",
  },
];

const meta: Meta<typeof SocialMediaLinks> = {
  title: "Components/Navigation/SocialMediaLinks",
  component: SocialMediaLinks,
  argTypes: {
    borders: {
      description: 'Optional border  \n\n `"none"` `"circular"` `"straight"`',
      control: { type: "radio" },
      options: borderTypeArray,
      table: {
        disable: false,
        defaultValue: { summary: "none" },
      },
    },
    className: {
      table: {
        disable: false,
      },
    },
    color: {
      control: { type: "radio" },
      options: colorTypeArray,
      table: {
        disable: false,
        defaultValue: { summary: "textDefault" },
      },
    },
    id: {
      table: {
        disable: false,
      },
    },
    layout: {
      control: { type: "radio" },
      options: layoutTypesArray,
      table: {
        disable: false,
        defaultValue: { summary: "row" },
      },
    },
    linksData: { table: { disable: false } },
    showLabels: {
      description:
        'Optional prop to display names of platforms along with icons. NOTE: Can not be chosen in combination with a circular border \n\n `"boolean"`',
      table: {
        disable: false,
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "radio" },
      options: sizeTypeArray,
      table: {
        disable: false,
        defaultValue: { summary: "small" },
      },
    },
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=77103-126004&t=Yx1GyAfBJyhuGIGs-4",
    },
    jest: ["SocialMediaLinks.test.tsx"],
  },
};
export default meta;
type Story = StoryObj<typeof SocialMediaLinks>;

export const WithControls: Story = {
  args: {
    borders: "none",
    color: "textDefault",
    className: undefined,
    id: undefined,
    layout: "row",
    linksData: exampleLinkData,
    showLabels: true,
    size: "small",
  },
  render: ({ borders, showLabels, color, ...rest }) => {
    const finalShowLabels = borders === "circular" ? false : showLabels;
    return (
      <div>
        <div
          style={
            color === "textInverse"
              ? {
                  backgroundColor: "var(--nypl-colors-dark-ui-bg-page)",
                  padding: "var(--nypl-space-s)",
                }
              : { padding: "var(--nypl-space-xs)" }
          }
        >
          <SocialMediaLinks
            // Hack to satisfy storybook control options AND component prop type
            showLabels={finalShowLabels as false}
            borders={borders}
            color={color}
            {...rest}
          />
        </div>
        {color === "textInverse" && (
          <Text size="caption" mt="s">
            NOTE: background color for textInverse is added for readability in
            Reservoir. It is not part of the functionality.
          </Text>
        )}
      </div>
    );
  },
};

export const AllOptionsVariations: Story = {
  render: () => (
    <SocialMediaLinks layout="row" linksData={exampleAllLinkData} />
  ),
};

export const LayoutVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-row-layout"
          level="h4"
          size="heading6"
          text="Row (Default)"
        />
        <SocialMediaLinks layout="row" linksData={exampleTwoLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-column-layout"
          level="h4"
          size="heading6"
          text="Column"
        />
        <SocialMediaLinks layout="column" linksData={exampleTwoLinkData} />
      </Box>
    </VStack>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-small-size"
          level="h4"
          size="heading6"
          text="Small (Default)"
        />
        <SocialMediaLinks size="small" linksData={exampleLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-medium-size"
          level="h4"
          size="heading6"
          text="Medium"
        />
        <SocialMediaLinks size="medium" linksData={exampleLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-large-size"
          level="h4"
          size="heading6"
          text="Large"
        />
        <SocialMediaLinks size="large" linksData={exampleLinkData} />
      </Box>
    </VStack>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-textdefault-color"
          level="h4"
          size="heading6"
          text="Site Default"
        />
        <SocialMediaLinks color="textDefault" linksData={exampleTwoLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-links-color"
          level="h4"
          size="heading6"
          text="Link"
        />
        <SocialMediaLinks color="link" linksData={exampleTwoLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-textinverse-color"
          level="h4"
          size="heading6"
          text="textInverse"
        />
        <Box bgColor="dark.ui.bg.page" p="s">
          <SocialMediaLinks
            color="textInverse"
            linksData={exampleTwoLinkData}
          />
        </Box>
        <Text size="caption" mt="s">
          NOTE: background color for textInverse is added for readability in
          Reservoir. It is not part of the functionality.
        </Text>
      </Box>
    </VStack>
  ),
};

export const BorderVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-border-none"
          level="h4"
          size="heading6"
          text="None (Default)"
        />
        <SocialMediaLinks borders="none" linksData={exampleLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-border-straight"
          level="h4"
          size="heading6"
          text="Straight"
        />
        <SocialMediaLinks borders="straight" linksData={exampleLinkData} />
      </Box>
      <Box>
        <Heading
          id="heading-border-circular"
          level="h4"
          size="heading6"
          text="Circular"
        />
        <SocialMediaLinks borders="circular" linksData={exampleLinkData} />
        <Text size={"caption"} mt="s">
          NOTE: labels are disallowed with circular borders.
        </Text>
      </Box>
    </VStack>
  ),
};

export const LabelVariations: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading
          id="heading-nolabels"
          level="h4"
          size="heading6"
          text="False (Default)"
        />
        <SocialMediaLinks showLabels={false} linksData={exampleTwoLinkData} />
      </Box>
      <Box>
        <Heading id="heading-labels" level="h4" size="heading6" text="True" />
        <SocialMediaLinks showLabels={true} linksData={exampleTwoLinkData} />
      </Box>
    </VStack>
  ),
};
