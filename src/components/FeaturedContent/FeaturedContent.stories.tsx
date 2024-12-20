import type { Meta, StoryObj } from "@storybook/react";

import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";
import SimpleGrid from "../Grid/SimpleGrid";
import FeaturedContent, {
  featuredContentWidthArray,
  featuredContentPositionArray,
} from "./FeaturedContent";
import { getPlaceholderImage } from "../../utils/utils";

const meta: Meta<typeof FeaturedContent> = {
  title: "Components/Basic Elements/FeaturedContent",
  component: FeaturedContent,
  argTypes: {
    className: { control: false },
    id: { control: false },
    isFullWidth: {
      table: { defaultValue: { summary: "false" } },
    },
    imageProps: { disable: true },
    "imageProps.alt": {
      control: { type: "text" },
      table: { defaultValue: { summary: "" } },
    },
    "imageProps.width": {
      control: { type: "select" },
      options: featuredContentWidthArray,
      table: { defaultValue: { summary: "oneHalf" } },
    },
    "imageProps.position": {
      control: { type: "select" },
      options: featuredContentPositionArray,
      table: { defaultValue: { summary: "end" } },
    },
    "imageProps.src": {
      table: { defaultValue: { summary: "" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturedContent>;

/**
 * Main Story for the FeaturedContent component. This must contain the `args`
 * and `parameters` properties in this object.
 */

export const WithControls: Story = {
  args: {
    className: undefined,
    id: "FeaturedContent-id",
    imageProps: undefined,
    "imageProps.alt": "Alt text",
    "imageProps.position": "end",
    "imageProps.src": getPlaceholderImage(),
    "imageProps.width": "default",
    isFullWidth: undefined,
    textContent: undefined,
  },
  render: (args) => (
    <FeaturedContent
      // {...args}
      id={args["id"]}
      imageProps={{
        alt: args["imageProps.alt"],
        position: args["imageProps.position"],
        src: args["imageProps.src"],
        width: args["imageProps.width"],
      }}
      isFullWidth={args["isFullWidth"]}
      textContent={
        <div>
          <Heading level="h2" overline="Featured">
            Spotlight on the Public Domain
          </Heading>
          <p>
            The New York Public Library recently enhanced access to all public
            domain items in Digital Collections so that everyone has the freedom
            to enjoy and reuse these materials in almost limitless ways.
          </p>
          <Button id="test"> Discover more </Button>
        </div>
      }
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?type=design&node-id=80613-80958&mode=design&t=HerPVZJXMF8fVMUb-0",
    },
    jest: ["FeaturedContent.test.tsx"],
  },
};

// The following are additional example Stories.

export const LayoutVariations: Story = {
  render: () => (
    <SimpleGrid columns={1} maxWidth="1280px" margin="auto">
      <Text noSpace>
        The examples below are within a container with the max-width set to
        1280px.
      </Text>
      <FeaturedContent
        isFullWidth={true}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              Full Width
            </Heading>
            <p>
              The New York Public Library recently enhanced access to all public
              domain items in Digital Collections so that everyone has the
              freedom to enjoy and reuse these materials in almost limitless
              ways.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "default",
          position: "end",
          src: "https://iiif.nypl.org/iiif/2/5164274/full/!900,900/0/default.jpg",
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              Default Width
            </Heading>
            <p>
              The New York Public Library recently enhanced access to all public
              domain items in Digital Collections so that everyone has the
              freedom to enjoy and reuse these materials in almost limitless
              ways.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "default",
          position: "end",
          src: "https://iiif.nypl.org/iiif/2/5131004/full/!900,900/0/default.jpg",
        }}
      />
    </SimpleGrid>
  ),
};

export const ImagePositionVariations: Story = {
  render: () => (
    <SimpleGrid columns={1}>
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              Image Start Position
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "default",
          position: "start",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              Image End Position
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "default",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
    </SimpleGrid>
  ),
};

export const imageWidthVariations: Story = {
  render: () => (
    <SimpleGrid columns={1}>
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              oneQuarter Image Width
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "oneQuarter",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              oneThird Image Width
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "oneThird",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              oneHalf Image Width (Default)
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "oneHalf",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              twoThirds Image Width
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "twoThirds",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" overline="Featured">
              three Quarters Image Width
            </Heading>
            <p>
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </p>
            <Button id="test"> Discover more </Button>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "threeQuarters",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
    </SimpleGrid>
  ),
};

export const textContentVariations: Story = {
  render: () => (
    <SimpleGrid columns={1}>
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Text noSpace>
              This text should have a header. This text should have a header.
              This text should have a header. This text should have a header.
              This text should have a header. This text should have a header.
              This text should have a header. This text should have a header.
              This text should have a header.
            </Text>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "threeQuarters",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
      <FeaturedContent
        isFullWidth={false}
        textContent={
          <div>
            <Heading level="h2" size="heading5">
              Not recommended
            </Heading>
            <Text noSpace>
              This does not fill the space and could use more.
            </Text>
          </div>
        }
        imageProps={{
          alt: "Alt text",
          width: "oneHalf",
          position: "end",
          src: getPlaceholderImage(),
        }}
      />
    </SimpleGrid>
  ),
};
