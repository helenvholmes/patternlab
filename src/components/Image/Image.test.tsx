import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { getPlaceholderImage } from "../../utils/utils";

import Image from "./Image";

describe("Image Accessibility", () => {
  it("passes axe accessibility for regular img element", async () => {
    const { container } = render(<Image alt="" src="test.png" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility with an aspect ratio and id", async () => {
    const { container } = render(
      <Image alt="" src="test.png" aspectRatio="oneByTwo" id="test-id" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility for regular lazy loading img element", async () => {
    const { container } = render(<Image alt="" isLazy src="test.png" />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility for figure element wrapper", async () => {
    const { container } = render(
      <Image alt="" caption="This is a caption" src="test.png" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility for figure lazy loading element wrapper", async () => {
    const { container } = render(
      <Image alt="" caption="This is a caption" isLazy src="test.png" />
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Image", () => {
  const tooManyChars =
    "UNwbNIp1GFehVO1LBBIFYF6Nv5IhHeCPgW5JHet2VRuuKnKlGxSgjbFcfCbcttVTkxbE7I" +
    "tibBIuG9cTA9HGntZSKv31u7egV88bIg7DGDHmi2nKq3ssZkBDl7oWfYpyjWbfV4kZx9EDP" +
    "sKHUTKb2xIKZWSbRMuTUtsJWonQyfitDp8ui1P7QR80LA236yE5fCkRImbltEsqJWEYxyot" +
    "QpLjFbruJsPcGSCp6ET6DCrNQeWFsRVaM2Co99ewZjLuY42kdpBEXjcw9HPcTjKKZw141sK" +
    "BNOoFfNMueYaHtNjNI";

  // @TODO - test when it does come into view.
  it("does not render an image src when `isLazy` is true until it is 'inView'", () => {
    const src = getPlaceholderImage("smaller", 0);
    const { container } = render(<Image alt="" isLazy src={src} />);

    // Mock that the image is not in view through the IntersectionObserver object.
    mockAllIsIntersecting(false);

    expect(container.querySelector("img")).not.toHaveAttribute("src");
  });

  it("renders a simple image not wrapped in a figure element", () => {
    render(<Image alt="" src="test.png" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.queryByRole("figure")).not.toBeInTheDocument();
  });

  it("renders an image wrapped in figure when provided a caption", () => {
    render(<Image src="test.png" caption="caption" alt="" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByText("caption")).toBeInTheDocument();
  });

  it("renders an image wrapped in figure when provided an image credit", () => {
    render(<Image src="test.png" credit="credit" alt="" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByText("credit")).toBeInTheDocument();
  });

  it("renders an image wrapped in figure with credit and caption", () => {
    render(<Image src="test.png" caption="caption" credit="credit" alt="" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByText("caption")).toBeInTheDocument();
    expect(screen.getByText("credit")).toBeInTheDocument();
  });

  it("throws error when alt text is too long", () => {
    expect(() =>
      render(<Image src="test.png" alt={tooManyChars} />)
    ).toThrowError(
      "NYPL Reservoir Image: Alt text must be less than 300 characters."
    );
  });

  it("logs an error when the image fails to load and calls the onError prop", async () => {
    const warn = jest.spyOn(console, "warn");
    const onError = jest.fn();

    render(
      <Image
        alt="Alt text"
        fallbackSrc={getPlaceholderImage()}
        onError={onError}
        src="foobar.jpg"
      />
    );

    fireEvent.error(screen.getByRole("img"));

    expect(onError).toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Image: The initial image failed to load in the " +
        "browser. The fallback image source will now be used."
    );
  });

  it("Renders the UI snapshot correctly", () => {
    const basic = renderer.create(<Image src="test.png" alt="" />).toJSON();
    const figCaption = renderer
      .create(<Image src="test.png" alt="" caption="Caption" />)
      .toJSON();
    const figCredit = renderer
      .create(<Image src="test.png" alt="" credit="Credit" />)
      .toJSON();
    const figCaptionCredit = renderer
      .create(<Image src="test.png" alt="" caption="Caption" credit="Credit" />)
      .toJSON();
    const sizeExtraExtraSmall = renderer
      .create(<Image src="test.png" alt="" size="xxsmall" />)
      .toJSON();
    const sizeExtraSmall = renderer
      .create(<Image src="test.png" alt="" size="xsmall" />)
      .toJSON();
    const sizeSmall = renderer
      .create(<Image src="test.png" alt="" size="small" />)
      .toJSON();
    const sizeMedium = renderer
      .create(<Image src="test.png" alt="" size="medium" />)
      .toJSON();
    const sizeLarge = renderer
      .create(<Image src="test.png" alt="" size="large" />)
      .toJSON();
    const sizeBasedOnHeight = renderer
      .create(<Image src="test.png" alt="" size="large" sizeBasedOn="height" />)
      .toJSON();
    const ratioFourByThree = renderer
      .create(<Image src="test.png" alt="" aspectRatio="fourByThree" />)
      .toJSON();
    const ratioOneByTwo = renderer
      .create(<Image src="test.png" alt="" aspectRatio="oneByTwo" />)
      .toJSON();
    const ratioOriginal = renderer
      .create(<Image src="test.png" alt="" aspectRatio="original" />)
      .toJSON();
    const ratioSixteenByNine = renderer
      .create(<Image src="test.png" alt="" aspectRatio="sixteenByNine" />)
      .toJSON();
    const ratioSquare = renderer
      .create(<Image src="test.png" alt="" aspectRatio="square" />)
      .toJSON();
    const ratioThreeByFour = renderer
      .create(<Image src="test.png" alt="" aspectRatio="threeByFour" />)
      .toJSON();
    const ratioThreeByTwo = renderer
      .create(<Image src="test.png" alt="" aspectRatio="threeByTwo" />)
      .toJSON();
    const ratioTwoByOne = renderer
      .create(<Image src="test.png" alt="" aspectRatio="twoByOne" />)
      .toJSON();
    const typeCircle = renderer
      .create(
        <Image
          src="test.png"
          alt=""
          aspectRatio="square"
          size="small"
          imageType="circle"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(<Image src="test.png" alt="" p="20px" color="ui.error.primary" />)
      .toJSON();
    const withOtherProps = renderer
      .create(<Image src="test.png" alt="" data-testid="image" />)
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(figCaption).toMatchSnapshot();
    expect(figCredit).toMatchSnapshot();
    expect(figCaptionCredit).toMatchSnapshot();
    expect(sizeExtraExtraSmall).toMatchSnapshot();
    expect(sizeExtraSmall).toMatchSnapshot();
    expect(sizeSmall).toMatchSnapshot();
    expect(sizeMedium).toMatchSnapshot();
    expect(sizeLarge).toMatchSnapshot();
    expect(sizeBasedOnHeight).toMatchSnapshot();
    expect(ratioFourByThree).toMatchSnapshot();
    expect(ratioOneByTwo).toMatchSnapshot();
    expect(ratioOriginal).toMatchSnapshot();
    expect(ratioSixteenByNine).toMatchSnapshot();
    expect(ratioSquare).toMatchSnapshot();
    expect(ratioThreeByFour).toMatchSnapshot();
    expect(ratioThreeByTwo).toMatchSnapshot();
    expect(ratioTwoByOne).toMatchSnapshot();
    expect(typeCircle).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<Image alt="" src="test.png" ref={ref} />);

    expect(container.querySelector("div")).toBe(ref.current);
  });
});
