import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import SimpleGrid from "./SimpleGrid";
import Card, { CardHeading, CardContent } from "../Card/Card";
import { ImageRatios } from "../Image/ImageTypes";
import { HeadingLevels } from "../Heading/HeadingTypes";

describe("Grid Accessibility", () => {
  it("passes axe accessibility test with children components", async () => {
    const { container } = render(
      <SimpleGrid>
        <Card
          imageProps={{
            alt: "Alt text",
            aspectRatio: ImageRatios.TwoByOne,
            src: "https://placeimg.com/500/200/animals",
          }}
        >
          <CardHeading level={HeadingLevels.Two}>Card Heading</CardHeading>
          <CardContent>
            Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
            libero, a pharetra augue.
          </CardContent>
        </Card>
        <Card
          imageProps={{
            alt: "Alt text",
            aspectRatio: ImageRatios.TwoByOne,
            src: "https://placeimg.com/400/220/animals",
          }}
        >
          <CardHeading level={HeadingLevels.Three}>Card Heading</CardHeading>
          <CardContent>
            Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
            libero, a pharetra augue.
          </CardContent>
        </Card>
        <Card
          imageProps={{
            alt: "Alt text",
            aspectRatio: ImageRatios.TwoByOne,
            src: "https://placeimg.com/400/240/animals",
          }}
        >
          <CardHeading level={HeadingLevels.Three}>Card Heading</CardHeading>
          <CardContent>
            Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
            libero, a pharetra augue.
          </CardContent>
        </Card>
      </SimpleGrid>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SimpleGrid", () => {
  it("Renders the SimpleGrid UI snapshot correctly", () => {
    const tree = renderer.create(<SimpleGrid id="test-grid" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders SimpleGrid component", () => {
    const utils = render(<SimpleGrid id="test-grid-render" />);
    expect(
      utils.container.querySelector("#test-grid-render")
    ).toBeInTheDocument();
  });
});
