import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import Heading from "../Heading/Heading";
import Hero from "./Hero";

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
const imageAlt = "Image example";
const imageSrc = "https://placeimg.com/800/400/animals";

describe("Hero", () => {
  describe("axe accessbility tests", () => {
    it("passes for type Primary", async () => {
      const { container } = render(
        <Hero
          heroType="primary"
          heading={<Heading level="one" id="a11y-hero" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc="https://placeimg.com/1600/800/arch"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("passes for type Secondary", async () => {
      const { container } = render(
        <Hero
          heroType="secondary"
          heading={<Heading level="one" id="a11y-hero" text="Hero Secondary" />}
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={subHeaderText}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("passes for type Tertiary", async () => {
      const { container } = render(
        <Hero
          heroType="tertiary"
          heading={<Heading level="one" id="a11y-hero" text="Hero Tertiary" />}
          subHeaderText={otherSubHeaderText}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("passes for type Campaign", async () => {
      const { container } = render(
        <Hero
          backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
          heroType="campaign"
          heading={<Heading level="one" id="a11y-hero" text="Hero Campaign" />}
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={otherSubHeaderText}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("passes for type FiftyFifty", async () => {
      const { container } = render(
        <Hero
          heroType="fiftyFifty"
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={otherSubHeaderText}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it("renders Primary Hero", () => {
    render(
      <Hero
        heroType="primary"
        heading={<Heading level="one" id="primary-hero" text="Hero Primary" />}
        subHeaderText="Example Subtitle"
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
      />
    );

    expect(screen.getByText("Hero Primary")).toBeInTheDocument();
    expect(screen.getByText("Example Subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toHaveAttribute(
      "style",
      "background-image: url(https://placeimg.com/1600/800/arch);"
    );
  });

  it("renders Secondary Hero", () => {
    render(
      <Hero
        heroType="secondary"
        heading={
          <Heading level="one" id="secondary-hero" text="Hero Secondary" />
        }
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={subHeaderText}
      />
    );

    expect(screen.getByText("Hero Secondary")).toBeInTheDocument();
    expect(screen.getByText(/Explore our collection of/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://placeimg.com/800/400/animals"
    );
  });

  it("renders Tertiary Hero", () => {
    render(
      <Hero
        heroType="tertiary"
        heading={
          <Heading level="one" id="tertiary-hero" text="Hero Tertiary" />
        }
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
        backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
        heroType="campaign"
        heading={
          <Heading level="one" id="campaign-hero" text="Hero Campaign" />
        }
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByText("Hero Campaign")).toBeInTheDocument();
    expect(screen.getByText(/With 92 locations across/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toHaveAttribute(
      "style",
      "background-image: url(https://placeimg.com/2400/800/nature/grayscale);"
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://placeimg.com/800/400/animals"
    );
  });

  it("renders Fifty-Fifty Hero", () => {
    render(
      <Hero
        heroType="fiftyFifty"
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={otherSubHeaderText}
      />
    );

    expect(screen.getByText(/With 92 locations across/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://placeimg.com/800/400/animals"
    );
  });

  it("renders custom background and foreground colors for all but the Secondary type", () => {
    const { rerender } = render(
      <Hero
        heroType="primary"
        heading={
          <Heading
            level="one"
            id="custom-colors-hero"
            text="Hero with Custom Colors"
          />
        }
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
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
        imageAlt={imageAlt}
        imageSrc={imageSrc}
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
          <Heading level="one" id="secondary-hero" text="Hero Secondary" />
        }
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={subHeaderText}
      />
    );

    expect(screen.getByTestId("hero-content")).not.toHaveAttribute(
      "style",
      "color: rgb(18, 52, 86); background-color: rgb(101, 67, 33);"
    );
  });

  it("logs a warning if `imageSrc` prop is passed but not `imageAlt`", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Hero
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
        heroType="primary"
        imageSrc={imageSrc}
      />
    );

    expect(warn).toHaveBeenCalledWith(
      `NYPL Reservoir: The "imageSrc" prop was passed but the "imageAlt" props was not. This will make the rendered image inaccessible.`
    );
  });

  it("renders Primary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="one" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(<Hero heroType="primary" heading={heading} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use the `backgroundImageSrc` " +
        "prop for the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
        heroType="primary"
        heading={heading}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `imageSrc` and `imageAlt` props have been passed, " +
        "but the `'primary'` `heroType` variant will not use it."
    );
  });

  it("renders Secondary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="one" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(
      <Hero
        heroType="secondary"
        heading={heading}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
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
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
        heroType="secondary"
        heading={heading}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
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
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={subHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `foregroundColor` and/or `backgroundColor` " +
        "props have been passed, but the `'secondary'` `heroType` " +
        "variant will not use them."
    );
  });

  it("renders Tertiary Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const heading = (
      <Heading level="one" id="hero-errors" text="Hero with Error Warnings" />
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
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={otherSubHeaderText}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `'tertiary'` `heroType` variant hero " +
        "will not use any of the image props."
    );

    rerender(
      <Hero
        backgroundImageSrc="https://placeimg.com/1600/800/arch"
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
      <Heading level="one" id="hero-errors" text="Hero with Error Warnings" />
    );
    const { rerender } = render(
      <Hero
        backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
        heroType="campaign"
        heading={heading}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
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
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        subHeaderText={otherSubHeaderText}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use both the " +
        "`backgroundImageSrc` and `imageSrc` props for the `'campaign'` " +
        "`heroType` variant."
    );

    rerender(
      <Hero
        heroType="campaign"
        heading={heading}
        subHeaderText={otherSubHeaderText}
        backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: It is recommended to use both the " +
        "`backgroundImageSrc` and `imageSrc` props for the `'campaign'` " +
        "`heroType` variant."
    );
  });

  it("renders FiftyFifty Hero with warnings in browser console", () => {
    const warn = jest.spyOn(console, "warn");
    const { rerender } = render(
      <Hero
        heroType="fiftyFifty"
        subHeaderText={otherSubHeaderText}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        locationDetails={<>Some location details.</>}
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Hero: The `locationDetails` prop should only be used " +
        "with the `'primary'` `heroType` variant."
    );

    rerender(
      <Hero
        backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
        heroType="fiftyFifty"
        imageAlt={imageAlt}
        imageSrc={imageSrc}
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
          heading={
            <Heading level="one" id="primary-hero" text="Hero Primary" />
          }
          subHeaderText="Example Subtitle"
          backgroundImageSrc="https://placeimg.com/1600/800/arch"
        />
      )
      .toJSON();
    const secondary = renderer
      .create(
        <Hero
          heroType="secondary"
          heading={
            <Heading level="one" id="secondary-hero" text="Hero Secondary" />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
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
              level="one"
              id="secondary-hero"
              text="Hero Secondary Books and More"
            />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
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
              level="one"
              id="secondary-hero"
              text="Hero Secondary Locations"
            />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const secondaryResearch = renderer
      .create(
        <Hero
          heroType="secondaryResearch"
          heading={
            <Heading level="one" id="secondary-hero" text="Hero Secondary" />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
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
              level="one"
              id="secondary-hero"
              text="Hero Secondary What's On"
            />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={subHeaderText}
        />
      )
      .toJSON();
    const campaign = renderer
      .create(
        <Hero
          backgroundImageSrc="https://placeimg.com/2400/800/nature/grayscale"
          heroType="campaign"
          heading={
            <Heading level="one" id="campaign-hero" text="Hero Campaign" />
          }
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const tertiary = renderer
      .create(
        <Hero
          heroType="tertiary"
          heading={
            <Heading level="one" id="tertiary-hero" text="Hero Tertiary" />
          }
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const fiftyFifty = renderer
      .create(
        <Hero
          heroType="fiftyFifty"
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          subHeaderText={otherSubHeaderText}
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Hero
          heroType="primary"
          heading={<Heading level="one" id="chakra" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc="https://placeimg.com/1600/800/arch"
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Hero
          heroType="primary"
          heading={<Heading level="one" id="props" text="Hero Primary" />}
          subHeaderText="Example Subtitle"
          backgroundImageSrc="https://placeimg.com/1600/800/arch"
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
});
