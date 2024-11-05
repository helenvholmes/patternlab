import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";
import Heading from "../Heading/Heading";
import Hero from "./Hero";
import Image from "../Image/Image";
import { getLinkColor, getTextColor } from "../../theme/components/hero";
import { getPlaceholderImage } from "../../utils/utils";

export const subHeaderText = (
  <>
    Explore our collection of hundreds of online resources and databases. Use
    our free online content to help with your research, whether it's finding a
    single article, tracing a family tree, learning a new language, or anything
    in between.
  </>
);
export const otherSubHeaderText =
  "With 92 locations across the Bronx, Manhattan, and Staten Island, The New " +
  "York Public Library is an essential part of neighborhoods across the city. " +
  "Visit us today.";
const imageProps = {
  alt: "Image example",
  id: "image-example",
  src: getPlaceholderImage("smaller", 0),
};

describe("Hero accessbility tests", () => {
  it("passes for type Primary", async () => {
    const { container } = render(
      <Hero
        heroType="primary"
        heading={<Heading level="h1" id="a11y-hero" text="Hero Primary" />}
        id="primary-hero"
        subHeaderText="Example Subtitle"
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes for type Secondary", async () => {
    const { container } = render(
      <Hero
        heroType="secondary"
        heading={<Heading level="h1" id="a11y-hero" text="Hero Secondary" />}
        imageProps={imageProps}
        subHeaderText={subHeaderText}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes for type Tertiary", async () => {
    const { container } = render(
      <Hero
        heroType="tertiary"
        heading={<Heading level="h1" id="a11y-hero" text="Hero Tertiary" />}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes for type Campaign", async () => {
    const { container } = render(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="campaign"
        heading={<Heading level="h1" id="a11y-hero" text="Hero Campaign" />}
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes for type FiftyFifty", async () => {
    const { container } = render(
      <Hero
        heroType="fiftyFifty"
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Hero", () => {
  it("renders Primary Hero", () => {
    render(
      <Hero
        heroType="primary"
        heading={<Heading level="h1" id="primary-hero" text="Hero Primary" />}
        subHeaderText="Example Subtitle"
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
      />
    );

    expect(screen.getByText("Hero Primary")).toBeInTheDocument();
    expect(screen.getByText("Example Subtitle")).toBeInTheDocument();
    // Due to the bug found in Chakra and the workaround that was implemented,
    // this test will fail. The `style` attribute is seen in the DOM in a
    // browser, but not in the test environment and it's not clear why.
    // expect(screen.getByTestId("hero")).toHaveAttribute(
    //   "style",
    //   `background-image: url(${getPlaceholderImage("smaller", 0)});`
    // );
  });

  it("renders Secondary Hero", () => {
    render(
      <Hero
        heroType="secondary"
        heading={
          <Heading level="h1" id="secondary-hero" text="Hero Secondary" />
        }
        imageProps={imageProps}
        subHeaderText={subHeaderText}
      />
    );

    expect(screen.getByText("Hero Secondary")).toBeInTheDocument();
    expect(screen.getByText(/Explore our collection of/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      getPlaceholderImage("smaller", 0)
    );
  });

  it("renders Tertiary Hero", () => {
    render(
      <Hero
        heroType="tertiary"
        heading={<Heading level="h1" id="tertiary-hero" text="Hero Tertiary" />}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByText("Hero Tertiary")).toBeInTheDocument();
    expect(screen.getByText(/With 92 locations across/i)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders Campaign Hero", () => {
    render(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="campaign"
        heading={<Heading level="h1" id="campaign-hero" text="Hero Campaign" />}
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByText("Hero Campaign")).toBeInTheDocument();
    expect(screen.getByText(/With 92 locations across/i)).toBeInTheDocument();
    // @TODO: This test needs to be rewritten to target a pseudo element.
    // expect(screen.getByTestId("hero")).toHaveAttribute(
    //   "style",
    //   `background-image: url(${getPlaceholderImage("smaller", 0)};`
    // );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      getPlaceholderImage("smaller", 0)
    );
  });

  it("renders Fifty-Fifty Hero", () => {
    render(
      <Hero
        heroType="fiftyFifty"
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByText(/With 92 locations across/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      getPlaceholderImage("smaller", 0)
    );
  });

  it("renders custom background and foreground colors for all but the Secondary type", () => {
    const { rerender } = render(
      <Hero
        heroType="primary"
        heading={
          <Heading
            level="h1"
            id="custom-colors-hero"
            text="Hero with Custom Colors"
          />
        }
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        foregroundColor="#123456"
        backgroundColor="#654321"
      />
    );

    expect(screen.getByTestId("hero-content")).toHaveAttribute(
      "style",
      "color: rgb(18, 52, 86); background-color: rgb(101, 67, 33);"
    );

    rerender(
      <Hero
        backgroundColor="#654321"
        foregroundColor="#123456"
        heroType="fiftyFifty"
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByTestId("hero-content")).toHaveAttribute(
      "style",
      "color: rgb(18, 52, 86); background-color: rgb(101, 67, 33);"
    );

    rerender(
      <Hero
        backgroundColor="#654321"
        foregroundColor="#123456"
        heroType="secondary"
        heading={
          <Heading level="h1" id="secondary-hero" text="Hero Secondary" />
        }
        imageProps={imageProps}
        subHeaderText={subHeaderText}
      />
    );

    expect(screen.getByTestId("hero-content")).not.toHaveAttribute(
      "style",
      "color: rgb(18, 52, 86); background-color: rgb(101, 67, 33);"
    );
  });

  it("logs a warning if `imageProps.src` prop is passed but not `imageProps.alt`", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="primary"
        imageProps={{ src: imageProps.src }}
      />
    );

    expect(warn).toHaveBeenCalledWith(
      `NYPL Reservoir Hero: The "imageProps.src" prop was passed but the "imageProps.alt" props was not. This will make the rendered image inaccessible.`
    );
  });

  it("correctly renders custom image component with internal props", () => {
    render(
      <Hero
        heroType="campaign"
        heading={<Heading level="h1" id="campaign-hero" text="Hero" />}
        imageProps={{
          alt: "Should not be the alt text",
          component: (
            <Image
              alt={"Custom Image component example"}
              src={getPlaceholderImage()}
            />
          ),
        }}
      />
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Custom Image component example"
    );
  });

  it("renders Primary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="h1" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(<Hero heroType="primary" heading={heading} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use the `backgroundImageSrc` " +
        "prop for the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="primary"
        heading={heading}
        imageProps={imageProps}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `imageProps.src` and `imageProps.alt` props have been passed, " +
        "but the `'primary'` `heroType` variant will not use it."
    );
  });

  it("renders Secondary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="h1" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(
      <Hero
        heroType="secondary"
        heading={heading}
        imageProps={imageProps}
        locationDetails={<>Some location details.</>}
        subHeaderText={subHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
        "with the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="secondary"
        heading={heading}
        imageProps={imageProps}
        subHeaderText={subHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `backgroundImageSrc` prop has been passed, " +
        "but the `'secondary'` `heroType` variant will not use it."
    );

    rerender(
      <Hero
        backgroundColor="#654321"
        foregroundColor="#123456"
        heroType="secondary"
        heading={heading}
        imageProps={imageProps}
        subHeaderText={subHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `foregroundColor`, `backgroundColor`, or " +
        "`backdropBackgroundColor` props have been passed, but the " +
        "`'secondary'` `heroType` variant will not use them."
    );
  });

  it("renders Tertiary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="h1" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(
      <Hero
        heroType="tertiary"
        heading={heading}
        subHeaderText={otherSubHeaderText}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
        "with the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        heroType="tertiary"
        heading={heading}
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `'tertiary'` `heroType` variant hero " +
        "will not use any of the image props."
    );

    rerender(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="tertiary"
        heading={heading}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `'tertiary'` `heroType` variant hero " +
        "will not use any of the image props."
    );
  });

  it("renders Campaign Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="h1" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="campaign"
        heading={heading}
        imageProps={imageProps}
        locationDetails={<>Some location details.</>}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
        "with the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        heroType="campaign"
        heading={heading}
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use either the " +
        "`backdropBackgroundColor`, `backgroundImageSrc`, or `imageProps.src` " +
        "prop for the `'campaign'` `heroType` variant."
    );

    rerender(
      <Hero
        heroType="campaign"
        heading={heading}
        subHeaderText={otherSubHeaderText}
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use either the " +
        "`backdropBackgroundColor`, `backgroundImageSrc`, or `imageProps.src` " +
        "prop for the `'campaign'` `heroType` variant."
    );
  });

  it("logs a warning if `backdropBackgroundColor` prop is passed but the variant is not 'campaign'", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Hero
        backdropBackgroundColor="brand.primary"
        heroType="fiftyFifty"
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `backdropBackgroundColor` prop has been passed, " +
        "but the `'campaign'` `heroType` variant was not set. It will be ignored."
    );
  });

  it("logs a warning if `isDarkBackgroundImage` prop is passed but the variant is not 'campaign'", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Hero
        heroType="primary"
        imageProps={imageProps}
        isDarkBackgroundImage
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `isDarkBackgroundImage` prop has been passed, " +
        "but the `'campaign'` `heroType` variant was not set. It will be ignored."
    );
  });

  it("logs a warning if `foregroundColor` and `isDarkText` props are both passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Hero
        foregroundColor="ui.black"
        heroType="campaign"
        imageProps={imageProps}
        isDarkBackgroundImage
        isDarkText
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `foregroundColor` and `isDarkText` props " +
        "have both been passed. Thse props can not be used at the same time, " +
        "so the `foregroundColor` prop will override the `isDarkText` prop."
    );
  });

  it("logs a warning when the main image fails to load and the fallback image is rendered", () => {
    const warn = jest.spyOn(console, "warn");
    const onError = jest.fn();

    render(
      <Hero
        heroType="campaign"
        imageProps={{
          alt: "Custom NYPL",
          src: "foo.jpg",
          fallbackSrc: "//placekitten.com/800/400",
          onError,
        }}
      />
    );

    fireEvent.error(screen.getByRole("img"));

    expect(onError).toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Image: The initial image failed to load in the " +
        "browser. The fallback image source will now be used."
    );
  });

  it("renders FiftyFifty Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const { rerender } = render(
      <Hero
        heroType="fiftyFifty"
        subHeaderText={otherSubHeaderText}
        imageProps={imageProps}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
        "with the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="fiftyFifty"
        imageProps={imageProps}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `backgroundImageSrc` prop has been passed, " +
        "but the `'fiftyFifty'` `heroType` variant hero will not use it."
    );
  });

  it("Renders the UI snapshot correctly", () => {
    const primary = renderer
      .create(
        <Hero
          heroType="primary"
          heading={<Heading level="h1" id="primary-hero" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        />
      )
      .toJSON();
    const secondary = renderer
      .create(
        <Hero
          heroType="secondary"
          heading={
            <Heading level="h1" id="secondary-hero" text="Hero Secondary" />
          }
          imageProps={imageProps}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const secondaryBooksAndMore = renderer
      .create(
        <Hero
          heroType="secondaryBooksAndMore"
          heading={
            <Heading
              level="h1"
              id="secondary-hero"
              text="Hero Secondary Books and More"
            />
          }
          imageProps={imageProps}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const secondaryLocations = renderer
      .create(
        <Hero
          heroType="secondaryLocations"
          heading={
            <Heading
              level="h1"
              id="secondary-hero"
              text="Hero Secondary Locations"
            />
          }
          imageProps={imageProps}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const secondaryResearch = renderer
      .create(
        <Hero
          heroType="secondaryResearch"
          heading={
            <Heading level="h1" id="secondary-hero" text="Hero Secondary" />
          }
          imageProps={imageProps}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const secondaryWhatsOn = renderer
      .create(
        <Hero
          heroType="secondaryWhatsOn"
          heading={
            <Heading
              level="h1"
              id="secondary-hero"
              text="Hero Secondary What's On"
            />
          }
          imageProps={imageProps}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const campaign = renderer
      .create(
        <Hero
          backgroundImageSrc={getPlaceholderImage("smaller", 0)}
          heroType="campaign"
          heading={
            <Heading level="h1" id="campaign-hero" text="Hero Campaign" />
          }
          imageProps={imageProps}
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const tertiary = renderer
      .create(
        <Hero
          heroType="tertiary"
          heading={
            <Heading level="h1" id="tertiary-hero" text="Hero Tertiary" />
          }
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const fiftyFifty = renderer
      .create(
        <Hero
          heroType="fiftyFifty"
          imageProps={imageProps}
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Hero
          heroType="primary"
          heading={<Heading level="h1" id="chakra" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc={getPlaceholderImage("smaller", 0)}
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Hero
          heroType="primary"
          heading={<Heading level="h1" id="props" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc={getPlaceholderImage("smaller", 0)}
          data-testid="props"
        />
      )
      .toJSON();

    expect(primary).toMatchSnapshot();
    expect(secondary).toMatchSnapshot();
    expect(secondaryBooksAndMore).toMatchSnapshot();
    expect(secondaryLocations).toMatchSnapshot();
    expect(secondaryResearch).toMatchSnapshot();
    expect(secondaryWhatsOn).toMatchSnapshot();
    expect(tertiary).toMatchSnapshot();
    expect(campaign).toMatchSnapshot();
    expect(fiftyFifty).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref and id to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Hero
        backgroundImageSrc={getPlaceholderImage("smaller", 0)}
        heroType="primary"
        heading={<Heading level="h1" id="primary-hero" text="Hero Primary" />}
        id="hero-id"
        ref={ref}
        subHeaderText="Example Subtitle"
      />
    );

    expect(container.querySelector("div")).toBe(ref.current);
    expect(container.querySelector("#hero-id")).toBeInTheDocument();
  });
});
describe("Test getTextColor function (hero.ts)", () => {
  let type, mode, foregroundColor, isDarkText;
  it("returns foregroundColor", () => {
    type = "heading";
    mode = "light";
    foregroundColor = "brand.primary";
    isDarkText = false;
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "brand.primary"
    );
    type = "body";
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "brand.primary"
    );
  });
  it("returns default heading text color", () => {
    type = "heading";
    mode = "light";
    foregroundColor = undefined;
    isDarkText = false;
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "ui.typography.inverse.heading"
    );
  });
  it("returns dark heading text color", () => {
    type = "heading";
    mode = "light";
    foregroundColor = undefined;
    isDarkText = true;
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "ui.typography.heading"
    );
  });
  it("returns default body text color", () => {
    type = "body";
    mode = "light";
    foregroundColor = undefined;
    isDarkText = false;
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "ui.typography.inverse.body"
    );
  });
  it("returns dark body text color", () => {
    type = "body";
    mode = "light";
    foregroundColor = undefined;
    isDarkText = true;
    expect(getTextColor(type, mode, foregroundColor, isDarkText)).toBe(
      "ui.typography.body"
    );
  });
});
describe("Test getLinkColor function (hero.ts)", () => {
  let state, foregroundColor, isDarkText;
  it("returns foregroundColor", () => {
    state = "default";
    foregroundColor = "brand.primary";
    isDarkText = false;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "brand.primary"
    );
  });
  it("returns default link color", () => {
    state = "default";
    foregroundColor = undefined;
    isDarkText = false;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "dark.ui.link.primary"
    );
  });
  it("returns default dark text link color", () => {
    state = "default";
    foregroundColor = undefined;
    isDarkText = true;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "var(--nypl-colors-ui-link-primary) !important"
    );
  });
  it("returns hover link color", () => {
    state = "hover";
    foregroundColor = undefined;
    isDarkText = false;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "dark.ui.link.secondary"
    );
  });
  it("returns dark text hover link color", () => {
    state = "hover";
    foregroundColor = undefined;
    isDarkText = true;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "var(--nypl-colors-ui-link-secondary) !important"
    );
  });
  it("returns visted link color", () => {
    state = "visited";
    foregroundColor = undefined;
    isDarkText = false;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "dark.ui.link.tertiary"
    );
  });
  it("returns dark text visted link color", () => {
    state = "visited";
    foregroundColor = undefined;
    isDarkText = true;
    expect(getLinkColor(state, foregroundColor, isDarkText)).toBe(
      "var(--nypl-colors-ui-link-tertiary) !important"
    );
  });
});
