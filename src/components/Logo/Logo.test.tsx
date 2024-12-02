import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import Logo from "./Logo";

describe("Logo Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<Logo name="nyplFullBlack" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Logo", () => {
  it("consoles a warning if both name and children are passed to Logo", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Logo name="nyplFullBlack">
        <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.526 12.871L.263 1.676 1.737.324 12 11.52 22.263.324l1.474 1.352L13.474 12.87a2 2 0 01-2.948 0z"
          />
        </svg>
      </Logo>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Logo: Pass either a `name` prop or an `svg` element child. Do not pass both."
    );
  });

  it("consoles a warning if both name and children are not passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Logo />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Logo: Pass a logo `name` prop or an SVG child to " +
        "`Logo` to ensure a logo appears."
    );
  });

  it("consoles a warning if name is not passed and a child is but it's not an SVG element", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Logo>Not an SVG</Logo>);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Logo: An `svg` element must be passed to the `Logo` " +
        "component as its child."
    );
  });

  it("renders a logo based on the logo `name` prop", () => {
    const { container } = render(<Logo name="nyplFullBlack" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "nyplFullBlack logo"
    );
  });

  it("renders a title element", () => {
    const { container, rerender } = render(<Logo name="nyplFullBlack" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "nyplFullBlack logo"
    );

    rerender(<Logo name="nyplFullBlack" title="title content" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "title content"
    );
  });

  it("renders a logo based on the child", () => {
    const { container } = render(
      <Logo>
        <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.526 12.871L.263 1.676 1.737.324 12 11.52 22.263.324l1.474 1.352L13.474 12.87a2 2 0 01-2.948 0z"
          />
        </svg>
      </Logo>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the UI snapshot correctly", () => {
    const standard = renderer
      .create(<Logo id="test-logo" name="nyplFullBlack" />)
      .toJSON();
    const withCustomSize = renderer
      .create(<Logo id="test-logo-size" name="nyplFullBlack" size="large" />)
      .toJSON();
    const withCustomSizeBasedOnHeight = renderer
      .create(
        <Logo
          id="test-logo-size"
          name="nyplFullBlack"
          size="large"
          sizeBasedOn="height"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Logo
          id="chakra"
          name="nyplFullBlack"
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(<Logo id="props" name="nyplFullBlack" data-testid="props" />)
      .toJSON();

    expect(standard).toMatchSnapshot();
    expect(withCustomSize).toMatchSnapshot();
    expect(withCustomSizeBasedOnHeight).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });
});
