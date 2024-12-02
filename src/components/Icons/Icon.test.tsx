import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import Icon from "./Icon";

describe("Icon Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<Icon name="download" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Icon", () => {
  it("consoles a warning if both name and children are passed to Icon", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Icon name="download" decorative={true}>
        <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.526 12.871L.263 1.676 1.737.324 12 11.52 22.263.324l1.474 1.352L13.474 12.87a2 2 0 01-2.948 0z"
          />
        </svg>
      </Icon>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Icon: Pass in either a `name` prop or an `svg` element " +
        "child. Do not pass both."
    );
  });

  it("consoles a warning if both name and children are not passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Icon />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Icon: Pass an icon `name` prop or an SVG child to " +
        "ensure an icon appears."
    );
  });

  it("consoles a warning if name is not passed and a child is but it's not an SVG element", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Icon>Not an SVG</Icon>);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Icon: An `svg` element must be passed to the `Icon` " +
        "component as its child."
    );
  });

  it("renders an icon based on the icon `name` prop", () => {
    const { container } = render(<Icon name="download" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "download icon"
    );
  });

  it("renders a title element", () => {
    const { container, rerender } = render(<Icon name="download" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "download icon"
    );

    rerender(<Icon name="download" title="title content" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "title content"
    );
  });

  it("renders an icon based on the child", () => {
    const { container } = render(
      <Icon>
        <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.526 12.871L.263 1.676 1.737.324 12 11.52 22.263.324l1.474 1.352L13.474 12.87a2 2 0 01-2.948 0z"
          />
        </svg>
      </Icon>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the UI snapshot correctly", () => {
    const basic = renderer.create(<Icon id="basic" name="download" />).toJSON();
    const customIcon = renderer
      .create(
        <Icon id="customIcon">
          <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.526 12.871L.263 1.676 1.737.324 12 11.52 22.263.324l1.474 1.352L13.474 12.87a2 2 0 01-2.948 0z"
            />
          </svg>
        </Icon>
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Icon id="chakra" name="download" p="20px" color="ui.error.primary" />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(<Icon id="props" name="download" data-testid="props" />)
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(customIcon).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });
});
