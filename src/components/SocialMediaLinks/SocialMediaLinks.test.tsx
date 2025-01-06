import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";
import SocialMediaLinks, { SocialMediaLinkDataProps } from "./SocialMediaLinks";

const dataArray: SocialMediaLinkDataProps[] = [
  {
    labelText: "Teachers Blog",
    icon: "fileTypeGenericDoc",
    url: "https://www.nypl.org/blog/all?channel=732",
  },
  {
    labelText: "Teens Instagram",
    icon: "socialInstagram",
    url: "https://www.instagram.com/nyplteens/?hl=en",
  },
];

describe("SocialMediaLinks Accessibility", () => {
  describe("Labels", () => {
    it("passes axe accessibility test without visible labels", async () => {
      const { container } = render(<SocialMediaLinks linksData={dataArray} />);
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test with labels set to true", async () => {
      const { container } = render(
        <SocialMediaLinks linksData={dataArray} showLabels={true} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
  describe("Colors", () => {
    it("passes axe accessibility test with link color & labels", async () => {
      const { container } = render(
        <SocialMediaLinks
          linksData={dataArray}
          showLabels={true}
          color={"link"}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test with textInverse color & labels", async () => {
      const { container } = render(
        <SocialMediaLinks
          linksData={dataArray}
          showLabels={true}
          color={"textInverse"}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
  describe("Borders", () => {
    it("passes axe accessibility test with straight borders & labels", async () => {
      const { container } = render(
        <SocialMediaLinks
          linksData={dataArray}
          showLabels={true}
          border={"straight"}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
    it("passes axe accessibility test with circular borders", async () => {
      const { container } = render(
        <SocialMediaLinks linksData={dataArray} border={"circular"} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe("SocialMediaLinks", () => {
  it("Renders default", () => {
    render(<SocialMediaLinks linksData={dataArray} />);

    const links = screen.getAllByRole("link");

    // All the types in SocialMediaDataMap.ts should be there.
    expect(links).toHaveLength(2);

    // Spot tests.

    // Links.
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.nypl.org/blog/all?channel=732"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://www.instagram.com/nyplteens/?hl=en"
    );

    // Labels.
    expect(screen.getByText("Teachers Blog")).toBeInTheDocument();
    expect(screen.getByText("Teens Instagram")).toBeInTheDocument();

    // Icons.
    expect(screen.getByTitle("Teachers Blog")).toBeInTheDocument();
    expect(screen.getByTitle("Teens Instagram")).toBeInTheDocument();
  });

  it("Renders selected icon", () => {
    render(
      <SocialMediaLinks
        layout={"column"}
        linksData={[
          {
            labelText: "Alt Twitter",
            icon: "socialTwitter",
            url: "https://twitter.com/elsewhere",
          },
          {
            labelText: "NYPL Facebook",
            icon: "socialFacebook",
            url: "https://facebook.com/nypl",
          },
        ]}
      />
    );

    const links = screen.getAllByRole("link");

    // There should be two links.
    expect(links).toHaveLength(2);

    // The links should be what we assigned and in the same order.
    expect(links[0]).toHaveAttribute("href", "https://twitter.com/elsewhere");
    expect(links[1]).toHaveAttribute("href", "https://facebook.com/nypl");

    // The label text we desire should be in the document.
    expect(screen.getByText("Alt Twitter")).toBeInTheDocument();
    expect(screen.getByText("NYPL Facebook")).toBeInTheDocument();

    // The icons should appear.
    expect(screen.getByTitle("NYPL Facebook")).toBeInTheDocument();
    expect(screen.getByTitle("Alt Twitter")).toBeInTheDocument();

    // The icon mocks should transform the correct icon file.
    expect(screen.getByTitle("NYPL Facebook")).toHaveAttribute(
      "data-file-name",
      "SvgSocialFacebook"
    );
    expect(screen.getByTitle("Alt Twitter")).toHaveAttribute(
      "data-file-name",
      "SvgSocialTwitter"
    );
  });
});

describe("SocialMediaLinks Snapshot", () => {
  it("Renders the UI snapshot correctly when the layout is in a row.", () => {
    const socialMediaLinksSnapshot = renderer
      .create(
        <SocialMediaLinks linksData={dataArray} id="socialmedialinks-test" />
      )
      .toJSON();
    const socialMediaLinksVariantLinksColor = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"link"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantLinksColorWithLabels = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"link"}
          showLabels={true}
        />
      )
      .toJSON();
    const socialMediaLinksVariantLinksColorStraightBorders = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"link"}
          borders={"straight"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantLinksColorCircularBorders = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"link"}
          borders={"circular"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantLinksColorWithLabelsStraightBorders = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"link"}
          showLabels={true}
          borders={"straight"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantTextInverseColor = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"textInverse"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantTextInverseColorWithLabels = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"textInverse"}
          showLabels={true}
        />
      )
      .toJSON();
    const socialMediaLinksVariantTextInverseColorStraightBorders = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"textInverse"}
          borders={"straight"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantTextInverseColorCircularBorders = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          color={"textInverse"}
          borders={"circular"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantTextInverseColorWithLabelsStraightBorders =
      renderer
        .create(
          <SocialMediaLinks
            linksData={dataArray}
            id="socialmedialinks-test"
            color={"textInverse"}
            showLabels={true}
            borders={"straight"}
          />
        )
        .toJSON();
    const socialMediaLinksVariantWithLabels = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          showLabels={true}
        />
      )
      .toJSON();
    const socialMediaLinksVariantStraightBorder = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          borders={"straight"}
        />
      )
      .toJSON();
    const socialMediaLinksVariantWithLabelsStraightBorder = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          borders={"straight"}
          showLabels={true}
        />
      )
      .toJSON();
    const socialMediaLinksVariantCircularBorder = renderer
      .create(
        <SocialMediaLinks
          linksData={dataArray}
          id="socialmedialinks-test"
          borders={"circular"}
        />
      )
      .toJSON();

    expect(socialMediaLinksSnapshot).toMatchSnapshot();
    expect(socialMediaLinksVariantLinksColor).toMatchSnapshot();
    expect(socialMediaLinksVariantLinksColorWithLabels).toMatchSnapshot();
    expect(socialMediaLinksVariantLinksColorStraightBorders).toMatchSnapshot();
    expect(socialMediaLinksVariantLinksColorCircularBorders).toMatchSnapshot();
    expect(
      socialMediaLinksVariantLinksColorWithLabelsStraightBorders
    ).toMatchSnapshot();
    expect(socialMediaLinksVariantTextInverseColor).toMatchSnapshot();
    expect(socialMediaLinksVariantTextInverseColorWithLabels).toMatchSnapshot();
    expect(
      socialMediaLinksVariantTextInverseColorStraightBorders
    ).toMatchSnapshot();
    expect(
      socialMediaLinksVariantTextInverseColorCircularBorders
    ).toMatchSnapshot();
    expect(
      socialMediaLinksVariantTextInverseColorWithLabelsStraightBorders
    ).toMatchSnapshot();
    expect(socialMediaLinksVariantWithLabels).toMatchSnapshot();
    expect(socialMediaLinksVariantStraightBorder).toMatchSnapshot();
    expect(socialMediaLinksVariantWithLabelsStraightBorder).toMatchSnapshot();
    expect(socialMediaLinksVariantCircularBorder).toMatchSnapshot();
  });
});
