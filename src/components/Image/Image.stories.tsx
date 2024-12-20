import { Box, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Heading from "../Heading/Heading";
import Image, {
  imageRatiosArray,
  imageSizesArray,
  imageTypesArray,
} from "./Image";
import SimpleGrid from "../Grid/SimpleGrid";
import { dimensionTypeArray } from "../../helpers/types";
import { argsBooleanType } from "../../helpers/storybookUtils";
import { getPlaceholderImage } from "../../utils/utils";

const meta: Meta<typeof Image> = {
  title: "Components/Media & Icons/Image",
  component: Image,
  argTypes: {
    additionalFigureStyles: { control: false },
    additionalImageStyles: { control: false },
    additionalWrapperStyles: { control: false },
    alt: {
      control: false,
      description:
        "Alternate text description of the image. Needed for accessibility purposes.",
    },
    aspectRatio: {
      control: { type: "select" },
      options: imageRatiosArray,
      table: { defaultValue: { summary: "original" } },
    },
    caption: {
      control: { type: "text" },
    },
    className: {
      control: false,
      description: "Additional class name for the component to use.",
    },
    component: { control: false },
    credit: {
      control: { type: "text" },
    },
    imageType: {
      control: { type: "radio" },
      options: imageTypesArray,
      table: { defaultValue: { summary: "default" } },
    },
    isLazy: argsBooleanType(),
    size: {
      control: { type: "select" },
      options: imageSizesArray,
      table: { defaultValue: { summary: "default" } },
    },
    sizeBasedOn: {
      control: { type: "radio" },
      options: dimensionTypeArray,
      table: { defaultValue: { summary: "width" } },
    },
    src: {
      description:
        "The src attribute is required, and contains the path to the image you want to embed.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const imageRow = (opts: any = {}) => {
  // We'll use this setup function to render all the images in a list item.
  // Some images display better with a dark background.
  const styles: any = { textAlign: "center" };
  const { size = "large", displayValue, sizeBasedOn = "width", id } = opts;
  if (sizeBasedOn === "width" && size === "default") {
    styles.width = "100%";
  } else if (sizeBasedOn === "height" && size === "default") {
    styles.width = "100%";
    styles.height = "100%";
  }

  return (
    <Box style={styles} key={id}>
      <Heading id={id} level="h4" size="heading6" text={size} />
      <Image
        alt="Alt text"
        caption={displayValue}
        size={size}
        sizeBasedOn={sizeBasedOn}
        src={getPlaceholderImage("smaller")}
      />
    </Box>
  );
};

const allVStack = (items) => {
  return <VStack spacing="l">{items}</VStack>;
};

const imageSizeValues = [
  { size: "xxxsmall", display: "32px", id: "ExtraExtraExtraSmall" },
  { size: "xxsmall", display: "64px", id: "ExtraExtraSmall" },
  { size: "xsmall", display: "96px", id: "ExtraSmall" },
  { size: "small", display: "165px", id: "Small" },
  { size: "medium", display: "225px", id: "Medium" },
  { size: "large", display: "360px", id: "Large" },
  { size: "default", display: "100%", id: "Default" },
];

const sizes = [];
const sizesBasedOnHeight = [];

for (const imageValue of imageSizeValues) {
  sizes.push(
    imageRow({
      size: imageValue.size,
      displayValue: imageValue.display,
      id: `${imageValue.id}-width`,
    })
  );
  sizesBasedOnHeight.push(
    imageRow({
      size: imageValue.size,
      displayValue: imageValue.display,
      id: `${imageValue.id}-height`,
      sizeBasedOn: "height",
    })
  );
}
/**
 * Main Story for the Image component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    additionalFigureStyles: undefined,
    additionalImageStyles: undefined,
    additionalWrapperStyles: undefined,
    alt: "Alt text",
    aspectRatio: "twoByOne",
    caption: "Image caption",
    className: undefined,
    component: undefined,
    credit: "Image credit",
    imageType: "default",
    size: "medium",
    sizeBasedOn: "width",
    src: getPlaceholderImage(),
  },
  render: (args) => <Image {...args} id="image-id" />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=11896%3A45379",
    },
    jest: ["Image.test.tsx"],
  },
};

// The following are additional Image example Stories.
export const FigureAndFigcaption: Story = {
  args: {
    alt: "Alt text",
    aspectRatio: "threeByTwo",
    caption: "Image caption",
    credit: "Image credit",
    imageType: "default",
    size: "medium",
    src: getPlaceholderImage("smaller"),
  },
  argTypes: {
    aspectRatio: { table: { disable: true } },
    caption: { table: { disable: true } },
    credit: { table: { disable: true } },
    imageType: { table: { disable: true } },
    size: { table: { disable: true } },
    src: { table: { disable: true } },
  },
  name: "Credit and Caption",
  render: (args) => <Image {...args} />,
};
export const Sizes: Story = {
  render: () => allVStack(sizes),
};
export const SizesBasedOnHeight: Story = {
  render: () => allVStack(sizesBasedOnHeight),
};

const imageBlockStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "360px",
  textalign: "center",
  width: "100%",
};
export const AspectRatios: Story = {
  render: () => (
    <VStack spacing="l">
      <Box style={imageBlockStyles}>
        <Heading
          id="fourbythree"
          level="h4"
          size="heading6"
          text="fourByThree"
        />
        <Image
          alt="Alt text"
          aspectRatio="fourByThree"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="onebytwo" level="h4" size="heading6" text="oneByTwo" />
        <Image
          alt="Alt text"
          aspectRatio="oneByTwo"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="original" level="h4" size="heading6" text="original" />
        <Image
          alt="Alt text"
          aspectRatio="original"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading
          id="sixteenbynine"
          level="h4"
          size="heading6"
          text="sixteenByNine"
        />
        <Image
          alt="Alt text"
          aspectRatio="sixteenByNine"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="square" level="h4" size="heading6" text="square" />
        <Image
          alt="Alt text"
          aspectRatio="square"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading
          id="threebyfour"
          level="h4"
          size="heading6"
          text="threeByFour"
        />
        <Image
          alt="Alt text"
          aspectRatio="threeByFour"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="threebytwo" level="h4" size="heading6" text="threeByTwo" />
        <Image
          alt="Alt text"
          aspectRatio="threeByTwo"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="twobyone" level="h4" size="heading6" text="twoByOne" />
        <Image
          alt="Alt text"
          aspectRatio="twoByOne"
          src={getPlaceholderImage()}
        />
      </Box>
    </VStack>
  ),
};
export const Types: Story = {
  render: () => (
    <VStack spacing="l">
      <Box style={imageBlockStyles}>
        <Heading id="default" level="h4" size="heading6" text="default" />
        <Image
          alt="Alt text"
          aspectRatio="square"
          imageType="default"
          src={getPlaceholderImage()}
        />
      </Box>
      <Box style={imageBlockStyles}>
        <Heading id="circle" level="h4" size="heading6" text="circle" />
        <Image
          alt="Alt text"
          aspectRatio="square"
          imageType="circle"
          src={getPlaceholderImage()}
        />
      </Box>
    </VStack>
  ),
};
export const HTMLAttributes: Story = {
  render: () => (
    <VStack align="start" spacing="l">
      <Box>
        <Heading
          id="withOnLoad"
          level="h4"
          size="heading6"
          text="Image with `onLoad` function"
        />
        <Image
          alt="Alt text"
          src={getPlaceholderImage("smaller")}
          onLoad={({ target }: any) => {
            console.log("Image 1 loaded and `onLoad` called.");
            console.log(
              "Image 1 dimensions:",
              target.offsetHeight,
              target.offsetWidth
            );
          }}
        />
      </Box>
      <Box>
        <Heading
          id="withOnLoad"
          level="h4"
          size="heading6"
          text="Image with `onError` function"
        />
        <Image
          alt="Broken image with bad url"
          src={getPlaceholderImage("smaller")}
          onError={() =>
            console.warn("Image 2 error! Called through `onError`.")
          }
        />
      </Box>
    </VStack>
  ),
};

export const FallbackImage: Story = {
  render: () => (
    <>
      <Heading
        id="fallback-heading"
        level="h4"
        size="heading6"
        text="Fallback Image Example"
      />
      <Image
        alt="Alt text"
        fallbackSrc={getPlaceholderImage()}
        onError={(_event) =>
          console.error("Error loading image in Storybok example")
        }
        src="foobar.jpg"
      />
    </>
  ),
};

export const LazyLoading: Story = {
  render: () => (
    <SimpleGrid columns={1}>
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
      <Image alt="Alt text" isLazy src={getPlaceholderImage()} />
    </SimpleGrid>
  ),
};
