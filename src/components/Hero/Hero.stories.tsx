import { Stack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Heading from "../Heading/Heading";
import Hero, { heroSecondaryTypes, heroTypesArray } from "./Hero";
import Link from "../Link/Link";
import Text from "../Text/Text";
import { getPlaceholderImage } from "../../utils/utils";

const secondarySubHeaderText = (
  <>
    Explore our <Link href="#">collection</Link> of hundreds of online resources
    and databases. Use our free online content to help with your research,
    whether it's finding a single article, tracing a family tree, learning a new
    language, or anything in between.
  </>
);
const deprecatedMessage = (
  <Text mt="s" noSpace>
    This variant has been deprecated.
  </Text>
);
const otherSubHeaderText = (
  <>
    With 92 locations across the Bronx, Manhattan, and Staten Island,{" "}
    <Link href="https://www.nypl.org/locations/snfl/childrens">
      The New York Public Library
    </Link>{" "}
    is an essential part of neighborhoods across the city. Visit us today.
  </>
);
const otherSubHeaderTextLong = (
  <>
    <Heading
      level="h2"
      size="heading3"
      subtitle="Lorem Parturient Bibendum Aenean Cras"
    >
      Subheading
    </Heading>
    <Heading level="h3" noSpace size="heading6">
      Subheading
    </Heading>
    <Text>
      Donec ullamcorper nulla non metus auctor fringilla. Cras mattis elit{" "}
      <Link href="https://www.nypl.org/locations/snfl/childrens">
        The New York Public Library
      </Link>{" "}
      consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra
      augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      Aenean lacinia{" "}
      <Link href="https://google.com" type="external">
        Google
      </Link>{" "}
      bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod
      semper. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
      eu leo.
    </Text>
    <ButtonGroup>
      <Button id="other-button-example-1">Button</Button>
      <Button id="other-button-example-2" buttonType="secondary">
        Button
      </Button>
    </ButtonGroup>
  </>
);
const imageProps = {
  alt: "Image example",
  src: getPlaceholderImage(),
};

const meta: Meta<typeof Hero> = {
  title: "Components/Basic Elements/Hero",
  component: Hero,
  argTypes: {
    backdropBackgroundColor: { control: false },
    backgroundColor: { control: false },
    foregroundColor: { control: false },
    heading: { control: false },
    heroType: {
      control: { type: "select" },
      options: heroTypesArray,
      table: { defaultValue: { summary: "primary" } },
    },
    imageProps: { control: false },
    isDarkBackgroundImage: {
      control: { type: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
    isDarkText: { control: false },
    locationDetails: { control: false },
    subHeaderText: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

/**
 * Main Story for the Hero component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    backdropBackgroundColor: undefined,
    backgroundColor: undefined,
    backgroundImageSrc: undefined,
    foregroundColor: undefined,
    heading: undefined,
    heroType: "primary",
    imageProps,
    "imageProps.alt": "",
    "imageProps.src": "",
    isDarkBackgroundImage: undefined,
    isDarkText: undefined,
    locationDetails: undefined,
    subHeaderText: undefined,
  },
  render: (args) =>
    (args.heroType === "primary" && (
      <Hero
        {...args}
        backgroundImageSrc={getPlaceholderImage()}
        heading={
          <Heading
            level="h1"
            id="1"
            subtitle="Example Subtitle"
            text="Hero Primary"
          />
        }
        heroType={args.heroType}
        subHeaderText="Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis."
      />
    )) ||
    (heroSecondaryTypes.includes(args.heroType) && (
      <div className="nypl--books-and-more">
        <Hero
          {...args}
          heading={
            <Heading
              level="h1"
              id="1"
              size="heading2"
              text="Hero Secondary (deprecated)"
            />
          }
          heroType={args.heroType}
          imageProps={args.imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
    )) ||
    (args.heroType === "tertiary" && (
      <Hero
        {...args}
        heading={
          <Heading level="h1" id="1" size="heading2" text="Hero Tertiary" />
        }
        heroType={args.heroType}
        subHeaderText={otherSubHeaderText}
      />
    )) ||
    (args.heroType === "campaign" && (
      <Hero
        {...args}
        backgroundImageSrc={getPlaceholderImage()}
        heading={<Heading level="h1" id="1" text="Hero Campaign" />}
        heroType={args.heroType}
        imageProps={args.imageProps}
        subHeaderText={otherSubHeaderText}
      />
    )) ||
    (args.heroType === "fiftyFifty" && (
      <Hero
        {...args}
        heroType={args.heroType}
        imageProps={{
          ...args.imageProps,
          src: getPlaceholderImage(),
        }}
        subHeaderText={
          <>
            {otherSubHeaderText} {deprecatedMessage}
          </>
        }
      />
    )),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=36817%3A23704",
    },
    jest: "Hero.test.tsx",
  },
};

// https://iiif.nypl.org/iiif/2/5164274/full/!900,900/0/default.jpg
// The following are additional Accordion example Stories.
export const Primary: Story = {
  render: () => (
    <Hero
      backgroundImageSrc="https://iiif.nypl.org/iiif/2/5164274/full/!900,900/0/default.jpg"
      heading={
        <Heading
          id="primary-hero"
          level="h1"
          noSpace
          overline="Hero Example"
          subtitle="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam."
          text="Hero Primary"
        />
      }
      heroType="primary"
    />
  ),
};

export const Tertiary: Story = {
  render: () => (
    <>
      <Hero
        heading={
          <Heading
            level="h1"
            id="tertiary-hero-subtitle-subheading"
            size="heading2"
            subtitle="This is the subtitle"
            text="Hero Tertiary with Subtitle & Sub-Heading"
          />
        }
        heroType="tertiary"
        subHeaderText={otherSubHeaderText}
      />
      <br />
      <Hero
        heading={
          <Heading
            level="h1"
            id="tertiary-hero-subheading"
            size="heading2"
            text="Hero Tertiary with Sub-Heading"
          />
        }
        heroType="tertiary"
        subHeaderText={otherSubHeaderText}
      />
      <br />
      <Hero
        heading={
          <Heading
            level="h1"
            id="tertiary-hero"
            size="heading2"
            text="Hero Tertiary without Additional Elements"
          />
        }
        heroType="tertiary"
      />
    </>
  ),
};

export const Campaign: Story = {
  render: () => (
    <Stack spacing="l">
      <div>
        <Heading
          id="campaign-hero-default"
          level="h4"
          size="heading6"
          text="Campaign Hero at Default Height"
        />
        <Hero
          backgroundImageSrc={getPlaceholderImage()}
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-default-heading"
              text="Hero Campaign"
            />
          }
          imageProps={{
            alt: "",
            src: "https://iiif.nypl.org/iiif/2/5164274/full/!900,900/0/default.jpg",
          }}
          subHeaderText={otherSubHeaderText}
        />
      </div>
      <div>
        <Heading
          id="campaign-hero-long-text"
          level="h4"
          size="heading6"
          text="Campaign Hero with Long Text"
        />
        <Hero
          backgroundImageSrc={getPlaceholderImage()}
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-long-text-heading"
              overline="Example"
              subtitle="Donec id elit non mi porta gravida at eget metus."
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          subHeaderText={otherSubHeaderTextLong}
        />
      </div>
    </Stack>
  ),
};

export const CampaignDarkBackgroundImage: Story = {
  render: () => (
    <Hero
      backgroundImageSrc="https://iiif.nypl.org/iiif/2/5164274/full/!900,900/0/default.jpg"
      heroType="campaign"
      heading={
        <Heading
          level="h1"
          id="campaign-hero-default-heading"
          text="Hero Campaign"
        />
      }
      imageProps={imageProps}
      isDarkBackgroundImage
      subHeaderText={otherSubHeaderText}
    />
  ),
};
export const CampaignBackgroundColors: Story = {
  render: () => (
    <Stack spacing="l">
      <div>
        <Heading
          id="campaign-hero-custom-background-color"
          level="h4"
          size="heading6"
          text="Campaign Hero with backdrop background color"
        />
        <Hero
          backdropBackgroundColor="section.research.primary"
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-long-text-heading"
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          subHeaderText={otherSubHeaderTextLong}
        />
      </div>
      <div>
        <Heading
          id="campaign-hero-custom-background-and-foreground-colors"
          size="heading6"
          text="Campaign Hero with separate backdrop and foreground background design token color"
        />
        <Hero
          backdropBackgroundColor="section.education.primary"
          backgroundColor="ui.warning.primary"
          foregroundColor="ui.typography.heading"
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-long-text-heading"
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          subHeaderText={otherSubHeaderTextLong}
        />
      </div>
    </Stack>
  ),
};
export const TextColorStyles: Story = {
  render: () => (
    <Stack spacing="l">
      <div>
        <Heading
          id="campaign-hero-default"
          size="heading6"
          text="Campaign Hero with Default Colors"
        />
        <Hero
          backgroundImageSrc="https://images.nypl.org/index.php?id=swope_244712&t=w"
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-default-heading"
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          isDarkBackgroundImage
          subHeaderText={otherSubHeaderText}
        />
      </div>
      <div>
        <Heading
          id="campaign-hero-default"
          size="heading6"
          text="Campaign Hero with Custom Background and Text Colors"
        />
        <Hero
          backgroundColor="ui.status.primary"
          backgroundImageSrc="https://images.nypl.org/index.php?id=swope_244712&t=w"
          foregroundColor="ui.error.secondary"
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-default-heading"
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          isDarkBackgroundImage
          subHeaderText={otherSubHeaderText}
        />
      </div>
      <div>
        <Heading
          id="campaign-hero-long-text"
          size="heading6"
          text='Campaign Hero with Custom Background Color and "Dark" Text'
        />
        <Hero
          backgroundColor="ui.status.primary"
          backgroundImageSrc="https://images.nypl.org/index.php?id=swope_244712&t=w"
          heroType="campaign"
          heading={
            <Heading
              level="h1"
              id="campaign-hero-long-text-heading"
              overline="Example"
              subtitle="Donec id elit non mi porta gravida at eget metus."
              text="Hero Campaign"
            />
          }
          imageProps={imageProps}
          isDarkBackgroundImage
          isDarkText
          subHeaderText={otherSubHeaderTextLong}
        />
      </div>
    </Stack>
  ),
};

const CampaignFallBackExample = () => {
  const [imageSrc, setImageSrc] = useState("foobar.jpg");
  const fallbackImageSrc =
    "https://iiif.nypl.org/iiif/2/105224/full/!900,900/0/default.jpg";

  return (
    <Stack spacing="l">
      <Heading
        id="campaign-hero-default"
        size="heading6"
        text="Campaign Hero with fallback image"
      />
      <Hero
        backgroundImageSrc={imageSrc}
        heroType="campaign"
        heading={
          <Heading
            level="h1"
            id="campaign-fallback-image"
            text="Hero Campaign"
          />
        }
        imageProps={{
          alt: "NYPL Image",
          src: imageSrc,
          fallbackSrc: fallbackImageSrc,
          onError: (_event) => {
            setImageSrc(fallbackImageSrc);
          },
        }}
        subHeaderText={otherSubHeaderText}
      />
    </Stack>
  );
};

export const CampaignFallbackImage: Story = {
  render: () => <CampaignFallBackExample />,
};

export const Secondary: Story = {
  name: "Secondary (deprecated)",
  render: () => (
    <Hero
      heading={
        <Heading
          level="h1"
          id="secondary-hero"
          size="heading2"
          text="Hero Secondary (deprecated)"
        />
      }
      heroType="secondary"
      imageProps={imageProps}
      subHeaderText={
        <>
          {secondarySubHeaderText} {deprecatedMessage}
        </>
      }
    />
  ),
};

export const FiftyFifty: Story = {
  name: "FiftyFifty (deprecated)",
  render: () => (
    <Stack spacing="l">
      <div>
        <Heading
          id="fiftyfifty-default"
          size="heading6"
          text="FiftyFifty Hero at Default Height"
        />
        <Hero
          heroType="fiftyFifty"
          imageProps={imageProps}
          subHeaderText={
            <>
              {otherSubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
      <div>
        <Heading
          id="fiftyfifty-long-text"
          size="heading6"
          text="FiftyFifty Hero with Long Text"
        />
        <Hero
          heroType="fiftyFifty"
          imageProps={imageProps}
          subHeaderText={
            <>
              {otherSubHeaderTextLong} {deprecatedMessage}
            </>
          }
        />
      </div>
    </Stack>
  ),
};
export const ColorVariations: Story = {
  name: "Color Variations for Secondary Hero",
  render: () => (
    <Stack mb="l" spacing="l">
      <div>
        <Heading
          id="main-secondary-heading"
          level="h4"
          size="heading6"
          text="secondary"
        />
        <Hero
          heading={
            <Heading
              level="h1"
              size="heading2"
              id="main-secondary-hero"
              text="Secondary (deprecated)"
            />
          }
          heroType="secondary"
          imageProps={imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
      <div>
        <Heading
          id="books-heading"
          level="h4"
          size="heading6"
          text="secondaryBooksAndMore"
        />
        <Hero
          heading={
            <Heading
              level="h1"
              size="heading2"
              id="books-hero"
              text="Books and More (deprecated)"
            />
          }
          heroType="secondaryBooksAndMore"
          imageProps={imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
      <div>
        <Heading
          id="location-heading"
          level="h4"
          size="heading6"
          text="secondaryLocations"
        />
        <Hero
          heading={
            <Heading
              level="h1"
              size="heading2"
              id="locations-hero"
              text="Locations (deprecated)"
            />
          }
          heroType="secondaryLocations"
          imageProps={imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
      <div>
        <Heading
          id="research-heading"
          level="h4"
          size="heading6"
          text="secondaryResearch"
        />
        <Hero
          heading={
            <Heading
              level="h1"
              size="heading2"
              id="research-hero"
              text="Research (deprecated)"
            />
          }
          heroType="secondaryResearch"
          imageProps={imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
      <div>
        <Heading
          id="whats-on-heading"
          level="h4"
          size="heading6"
          text="secondaryWhatsOn"
        />
        <Hero
          heading={
            <Heading
              level="h1"
              size="heading2"
              id="whats-on-hero"
              text="What's On (deprecated)"
            />
          }
          heroType="secondaryWhatsOn"
          imageProps={imageProps}
          subHeaderText={
            <>
              {secondarySubHeaderText} {deprecatedMessage}
            </>
          }
        />
      </div>
    </Stack>
  ),
};
