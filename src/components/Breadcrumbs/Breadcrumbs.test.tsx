import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { createRef } from "react";
import renderer from "react-test-renderer";
import Link from "../Link/Link";

import Breadcrumbs from "./Breadcrumbs";

const breadcrumbsData = [
  { url: "#string1", text: "string1" },
  { url: "#string2", text: "string2" },
  { url: "#string3", text: "string3" },
];

const breadcrumbsDataLinkProps = [
  { url: "#string1", text: "string1", linkProps: { target: "_top" } },
  { url: "#string2", text: "string2" },
  { url: "#string3", text: "string3" },
];

const breadcrumbsDataLongText = [
  { url: "#string1", text: "Parent with a Long Name" },
  {
    url: "#string2",
    text: "Grandchild with an Exceptionally Long Name. Long titles shorten to 40 characters, an ellipsis will be added, and that the Tooltip is used to see the entire text characters",
  },
  {
    url: "#string3",
    text: "Great-Grandchild with the Longest Name That Will Wrap onto the Second Line of the Breadcrumb Component",
  },
];

describe("Breadcrumbs Accessibility", () => {
  const breadcrumbsData = [
    { url: "#string1", text: "string1" },
    { url: "#string2", text: "string2" },
  ];

  it("passes axe accessibility test", async () => {
    const { container } = render(
      <Breadcrumbs breadcrumbsData={breadcrumbsData} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  // This fails because there MUST only be one "breadcrumb" landmark item
  // on a page. This specifically means there should be one `<nav>` element
  // with `aria-label="Breadcrumb"`.
  // https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html
  it("does not pass axe accessibility test", async () => {
    const { container } = render(
      <>
        <Breadcrumbs breadcrumbsData={breadcrumbsData} />
        <Breadcrumbs breadcrumbsData={breadcrumbsData} />
      </>
    );
    expect(await axe(container)).not.toHaveNoViolations();
  });
});

describe("Breadcrumbs", () => {
  it("Renders a tag with custom text", () => {
    render(<Breadcrumbs breadcrumbsData={breadcrumbsData} />);

    // The last breadcrumb (the active page) is also a link.
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getAllByRole("link")[0]).toHaveTextContent("string1");
    expect(screen.getAllByRole("link")[1]).toHaveTextContent("string2");
    expect(screen.getAllByRole("link")[2]).toHaveTextContent("string3");
  });

  it("Renders icon on mobile", () => {
    const { container } = render(
      <Breadcrumbs breadcrumbsData={breadcrumbsData} />
    );
    expect(container.querySelector(".breadcrumbs-icon")).toBeInTheDocument();
  });

  it("Throws error when nothing is passed into Breadcrumb", () => {
    expect(() => render(<Breadcrumbs breadcrumbsData={[]} />)).toThrowError(
      "NYPL Reservoir Breadcrumbs: No data was passed to the `breadcrumbsData` prop."
    );
  });

  it("Truncates breadcrumbs text if it is longer than 40 characters", () => {
    render(<Breadcrumbs breadcrumbsData={breadcrumbsDataLongText} />);

    expect(screen.getAllByRole("link")[0]).toHaveTextContent(
      "Parent with a Long Name"
    );
    // Truncate breadcrumb text if beyond 40 characters then add ellipsis at the end.
    expect(screen.getAllByRole("link")[1]).toHaveTextContent(
      "Grandchild with an Exceptionally Long..."
    );
    expect(screen.getAllByRole("link")[2]).toHaveTextContent(
      /Great-Grandchild with the Longest Name.../
    );
  });

  it("replaces BreadcrumbsLink when customLinkComponent is passed", () => {
    render(
      <Breadcrumbs
        customLinkComponent={Link}
        breadcrumbsData={breadcrumbsDataLinkProps}
      />
    );
    expect(screen.getByText("string1").closest("a")).toHaveClass("chakra-link");
  });

  it("does not replace BreadcrumbsLink when no custom link is passed", () => {
    render(<Breadcrumbs breadcrumbsData={breadcrumbsDataLinkProps} />);
    expect(screen.getByText("string1").closest("a")).toHaveClass(
      "chakra-breadcrumb__link"
    );
    expect(screen.getByText("string1").closest("a")).not.toHaveClass(
      "chakra-link"
    );
  });

  it("passes linkProps to specified breadcrumbs", () => {
    render(<Breadcrumbs breadcrumbsData={breadcrumbsDataLinkProps} />);
    expect(screen.getByText("string1").closest("a")).toHaveAttribute(
      "target",
      "_top"
    );
  });

  it("passes a ref to the nav wrapper element", () => {
    // It's okay to use this type even though the rendered element is
    // a `nav` since Chakra internally generates the necessary DOM.
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Breadcrumbs breadcrumbsData={breadcrumbsData} ref={ref} />
    );

    expect(container.querySelector("nav")).toBe(ref.current);
  });
});

describe("Breadcrumbs Snapshot", () => {
  it("Renders the UI snapshot correctly", () => {
    const breadcrumbsSnapshot = renderer
      .create(
        <Breadcrumbs id="breadcrumbs-test" breadcrumbsData={breadcrumbsData} />
      )
      .toJSON();
    const breadcrumbsVariantColor = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="booksAndMore"
          id="breadcrumbs-test"
        />
      )
      .toJSON();
    const breadcrumbsBlogsVariant = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="blogs"
          id="breadcrumbs-test"
        />
      )
      .toJSON();
    const breadcrumbsLocationsVariant = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="locations"
          id="breadcrumbs-test"
        />
      )
      .toJSON();
    const breadcrumbsEducationVariant = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          breadcrumbsType="education"
          id="breadcrumbs-test"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          id="breadcrumbs-test"
          p="s"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Breadcrumbs
          breadcrumbsData={breadcrumbsData}
          id="breadcrumbs-test"
          data-testid="testid"
        />
      )
      .toJSON();

    expect(breadcrumbsSnapshot).toMatchSnapshot();
    expect(breadcrumbsVariantColor).toMatchSnapshot();
    expect(breadcrumbsBlogsVariant).toMatchSnapshot();
    expect(breadcrumbsLocationsVariant).toMatchSnapshot();
    expect(breadcrumbsEducationVariant).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });
});
