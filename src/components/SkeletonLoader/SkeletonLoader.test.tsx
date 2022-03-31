import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import SkeletonLoader from "./SkeletonLoader";
import { SkeletonLoaderImageRatios } from "./SkeletonLoaderTypes";
import { LayoutTypes } from "../../helpers/enums";

describe("SkeletonLoader Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<SkeletonLoader />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SkeletonLoader", () => {
  it("renders default layout", () => {
    const { container } = render(
      <SkeletonLoader className="skeleton-loader" />
    );

    expect(container.querySelector(".skeleton-loader")).toBeInTheDocument();
  });

  it("renders in the column or row layout", () => {
    const { container, rerender } = render(
      <SkeletonLoader layout={LayoutTypes.Column} />
    );

    expect(container.querySelector(".column")).toBeInTheDocument();

    rerender(<SkeletonLoader layout={LayoutTypes.Row} />);
    expect(container.querySelector(".row")).toBeInTheDocument();
  });

  it("renders default elements", () => {
    const { container } = render(<SkeletonLoader />);

    // By default, the `SkeletonLoader` renders one image, one heading, and
    // three content elements.
    expect(container.querySelectorAll(".chakra-skeleton")).toHaveLength(5);
  });

  it("renders without image", () => {
    const { container } = render(<SkeletonLoader showImage={false} />);

    // Only one image is rendered by default.
    expect(container.querySelectorAll(".chakra-skeleton")).toHaveLength(4);
  });

  it("renders without heading", () => {
    const { container } = render(<SkeletonLoader showHeading={false} />);

    // Only one heading is rendered by default.
    expect(container.querySelectorAll(".chakra-skeleton")).toHaveLength(4);
  });

  it("renders without content", () => {
    const { container } = render(<SkeletonLoader showContent={false} />);

    // Three content placeholders are rendered by default.
    expect(container.querySelectorAll(".chakra-skeleton")).toHaveLength(2);
  });

  it("renders with button", () => {
    const { container } = render(<SkeletonLoader showButton={true} />);

    // Only one button is rendered by default.
    expect(container.querySelectorAll(".chakra-skeleton")).toHaveLength(6);
  });

  it("renders the UI snapshot correctly", () => {
    const basic = renderer.create(<SkeletonLoader />).toJSON();
    const rowLayout = renderer
      .create(<SkeletonLoader layout={LayoutTypes.Row} />)
      .toJSON();
    const columnLayout = renderer
      .create(<SkeletonLoader layout={LayoutTypes.Column} />)
      .toJSON();
    const noImage = renderer
      .create(<SkeletonLoader showImage={false} />)
      .toJSON();
    const noHeading = renderer
      .create(<SkeletonLoader showHeading={false} />)
      .toJSON();
    const noContent = renderer
      .create(<SkeletonLoader showContent={false} />)
      .toJSON();
    const withButton = renderer
      .create(<SkeletonLoader showButton={true} />)
      .toJSON();
    const landscape = renderer
      .create(
        <SkeletonLoader
          imageAspectRatio={SkeletonLoaderImageRatios.Landscape}
        />
      )
      .toJSON();
    const portrait = renderer
      .create(
        <SkeletonLoader imageAspectRatio={SkeletonLoaderImageRatios.Portrait} />
      )
      .toJSON();
    const square = renderer
      .create(
        <SkeletonLoader imageAspectRatio={SkeletonLoaderImageRatios.Square} />
      )
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(rowLayout).toMatchSnapshot();
    expect(columnLayout).toMatchSnapshot();
    expect(noImage).toMatchSnapshot();
    expect(noHeading).toMatchSnapshot();
    expect(noContent).toMatchSnapshot();
    expect(withButton).toMatchSnapshot();
    expect(landscape).toMatchSnapshot();
    expect(portrait).toMatchSnapshot();
    expect(square).toMatchSnapshot();
  });
});
