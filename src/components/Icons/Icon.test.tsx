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

  it("renders the correct icon based on the `name` prop", () => {
    const { container } = render(<Icon name="download" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "download icon"
    );

    console.log(container.querySelector("svg"));
    console.log(container.innerHTML);
    // const pathElement = container.querySelector("path");

    // // Ensure the path element is present
    // expect(pathElement).toBeInTheDocument();

    // // Check the `d` attribute of the path
    // expect(pathElement).toHaveAttribute("d", "M12 2L15 8H9L12 2Z");
    // expect(container.querySelector("path")).toHaveAttribute(
    //   "d",
    //   "M14 6.684h-4v-6H4v6H0l7 7 7-7zm-8 2v-6h2v6h1.17L7 10.854l-2.17-2.17H6zm8 9v-2H0v2h14z"
    // );
  });

  it("renders a different icon", () => {
    const { container } = render(<Icon name="decorativeShoppingBag" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "title",
      "decorativeShoppingBag icon"
    );
    // expect(container.querySelector("path")).toHaveAttribute(
    //   "d",
    //   "M60.4664 59.0967L53.194 21.3402C52.7959 19.5465 51.7878 17.9465 50.3415 16.8132C48.8952 15.68 47.1005 15.0838 45.2637 15.1263H45.1814V7.34288C45.1814 6.3785 44.9915 5.42357 44.6224 4.53261C44.2533 3.64166 43.7123 2.83213 43.0303 2.15027C42.3484 1.4684 41.5388 0.927552 40.6477 0.558607C39.7567 0.189661 38.8018 -0.000154207 37.8374 9.39976e-08H30.2008C28.2533 9.39976e-08 26.3856 0.773623 25.0086 2.15068C23.6315 3.52774 22.8579 5.39543 22.8579 7.34288V15.1263H22.7381C20.9012 15.0838 19.1065 15.68 17.6602 16.8132C16.214 17.9465 15.2058 19.5465 14.8077 21.3402L7.53535 59.0955C7.35991 60.2215 7.43605 61.3724 7.75829 62.4655C8.08054 63.5586 8.6409 64.5668 9.39911 65.4175C10.1573 66.2683 11.0946 66.9406 12.1435 67.386C13.1924 67.8315 14.327 68.0391 15.4657 67.9939H52.5337C53.6724 68.0391 54.807 67.8315 55.8559 67.386C56.9048 66.9406 57.8421 66.2683 58.6003 65.4175C59.3585 64.5668 59.9188 63.5586 60.2411 62.4655C60.5633 61.3724 60.6395 60.2215 60.464 59.0955L60.4664 59.0967ZM28.18 7.8375C28.1803 7.1415 28.457 6.47409 28.9491 5.98194C29.4412 5.4898 30.1087 5.21317 30.8047 5.21286H37.3052C38.0014 5.21317 38.669 5.48996 39.1611 5.98236C39.6533 6.47476 39.9298 7.14247 39.9298 7.83868V15.1263H28.18V7.8375ZM55.1137 62.4592C54.7897 62.821 54.3918 63.1091 53.9469 63.3041C53.5021 63.499 53.0206 63.5963 52.5349 63.5894H15.468C14.9823 63.5964 14.5008 63.4992 14.0559 63.3042C13.6111 63.1092 13.2132 62.821 12.8892 62.4592C12.5746 62.116 12.3448 61.7038 12.2183 61.2558C12.0918 60.8077 12.0721 60.3362 12.1608 59.8792L19.4332 22.1226C19.5988 21.3747 20.019 20.7074 20.622 20.2349C21.225 19.7624 21.9734 19.514 22.7392 19.5321H22.8579V26.0761C22.858 26.4216 22.9264 26.7637 23.059 27.0827C23.1916 27.4018 23.3859 27.6915 23.6307 27.9354C23.8755 28.1792 24.1661 28.3723 24.4856 28.5036C24.8052 28.635 25.1476 28.7019 25.4931 28.7007H25.5636C26.2582 28.6982 26.9235 28.4206 27.4138 27.9287C27.9042 27.4368 28.1797 26.7706 28.18 26.0761V19.5321H39.9298V26.015C39.9298 26.7114 40.2065 27.3793 40.6989 27.8717C41.1913 28.3641 41.8592 28.6408 42.5556 28.6408C43.252 28.6408 43.9199 28.3641 44.4124 27.8717C44.9048 27.3793 45.1814 26.7114 45.1814 26.015V19.5321H45.2637C46.0296 19.514 46.7779 19.7624 47.3809 20.2349C47.984 20.7074 48.4042 21.3747 48.5697 22.1226L55.8421 59.8792C55.9308 60.3362 55.9111 60.8077 55.7846 61.2558C55.6581 61.7038 55.4283 62.116 55.1137 62.4592V62.4592Z"
    // );
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
