import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Image from "../Image/Image";
import Table from "./Table";

export const columnHeaders = [
  "First Name",
  "Last Name",
  "Nick Name",
  "Address1",
  "City",
  "Zipcode",
  "State",
];
export const columnHeadersUneven = [
  "First Name",
  "Last Name",
  "Nick Name",
  "Address1",
  "City",
  "Zipcode",
];
export const tableData = [
  ["Tom", "Nook", "Tanukichi", "Main Street", "New York", "23458", "NY"],
  ["Isabelle", "-", "Shizue", "Walnut Street", "New York", "23458", "NY"],
  ["K.K.", "Slider", "Totakeke", "Niper Place", "New York", "98765", "NY"],
  [
    "Sonny",
    "Resetti",
    "Risetto san",
    "Village Road",
    "New York",
    "09873",
    "NY",
  ],
];
export const tableDataUneven = [
  ["Tom", "Nook", "Tanukichi", "Main Street", "New York", "23458", "NY"],
  ["Isabelle", "-", "Shizue", "Walnut Street", "New York", "23458", "NY"],
  ["K.K.", "Slider", "Totakeke", "Niper Place", "New York", "98765", "NY"],
  ["Sonny", "Resetti", "Risetto san", "Village Road", "New York", "09873"],
];
export const characterHeaders = ["First Name", "Last Name", "Avatar"];
export const charactersData = [
  [
    "Tom",
    "Nook",
    <Image
      alt="Tom Nook"
      key="tom"
      size="small"
      src="https://play.nintendo.com/images/AC_Tom_FRYtwIN.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
  [
    "Isabelle",
    "-",
    ,
    <Image
      alt="Isabelle"
      key="isa"
      size="small"
      src="https://play.nintendo.com/images/AC_Isabelle_7XU6aGu.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
  [
    "K.K.",
    "Slider",
    ,
    <Image
      alt="K.K Slider"
      key="kk"
      size="small"
      src="https://play.nintendo.com/images/AC_KK_jh4yj5t.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
];

describe("Table Accessibility", () => {
  it("passes axe accessibility test with the columnHeaders and tableData prop", async () => {
    const { container } = render(
      <Table columnHeaders={columnHeaders} tableData={tableData} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with tableData prop", async () => {
    const { container } = render(
      <Table columnHeaders={columnHeaders} tableData={tableData} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Table", () => {
  it("renders a caption", () => {
    render(
      <Table
        columnHeaders={columnHeaders}
        tableData={tableData}
        titleText="this is the caption"
      />
    );
    expect(screen.getByText("this is the caption")).toBeInTheDocument();
  });

  it("renders an aria-label attribute", () => {
    render(
      <Table
        columnHeaders={columnHeaders}
        showTitleText={false}
        tableData={tableData}
        titleText="this is the aria-label"
      />
    );
    expect(screen.getByRole("table")).toHaveAttribute(
      "aria-label",
      "this is the aria-label"
    );
  });

  it("renders a table header", () => {
    render(
      <Table
        columnHeaders={columnHeaders}
        tableData={tableData}
        titleText="this is the caption"
      />
    );

    // The `Table` renders two set of headers, but the second set
    // in the body is hidden on desktop and visible on mobile.
    // For this test, we only want to check the first set of headers.
    expect(screen.getAllByText("First Name")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Last Name")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Nick Name")[0]).toBeInTheDocument();
  });

  it("renders table data", () => {
    render(<Table tableData={tableData} columnHeaders={columnHeaders} />);

    expect(screen.getByText("Tom")).toBeInTheDocument();
    expect(screen.getByText("Nook")).toBeInTheDocument();
    expect(screen.getByText("Village Road")).toBeInTheDocument();
  });

  it("logs a warning when the `columnHeaders` prop is an empty array", async () => {
    const warn = jest.spyOn(console, "warn");
    render(<Table columnHeaders={[]} tableData={tableData} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Table: Column headers have not been set. For improved accessibility, " +
        "column headers are required."
    );
  });

  it("logs a warning when the `tableData` prop is an empty array", async () => {
    const warn = jest.spyOn(console, "warn");
    render(<Table columnHeaders={columnHeaders} tableData={[]} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Table: Data in the `tableData` prop must be a two dimensional array."
    );
  });

  it("logs a warning when the columns in each `tableData` row are not identical", async () => {
    const warn = jest.spyOn(console, "warn");
    render(<Table tableData={tableDataUneven} columnHeaders={columnHeaders} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Table: The number of columns in each row of the data table are not identical. " +
        "The `Table` component may not render properly."
    );
  });

  it("logs a warning when the column headers `columnHeaders` is not equal the number of columns in the data table", async () => {
    const warn = jest.spyOn(console, "warn");
    render(<Table tableData={tableData} columnHeaders={columnHeadersUneven} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Table: The number of column headers in the `columnHeaders` prop is not equal " +
        "to the number of columns in the data table. " +
        "The `Table` component may not render properly."
    );
  });

  it("renders JSX elements from the data array", () => {
    render(
      <Table
        columnHeaders={characterHeaders}
        id="jsx-example"
        tableData={charactersData}
      />
    );

    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("renders the UI snapshot correctly", () => {
    const basic = renderer
      .create(
        <Table columnHeaders={columnHeaders} id="basic" tableData={tableData} />
      )
      .toJSON();
    const withCaption = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="withCaption"
          tableData={tableData}
          titleText="this is the caption"
        />
      )
      .toJSON();
    const withAriaLabel = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="withCaption"
          showTitleText={false}
          tableData={tableData}
          titleText="this is the caption"
        />
      )
      .toJSON();
    const withHeaders = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="withHeaders"
          tableData={tableData}
          titleText="this is the caption"
        />
      )
      .toJSON();
    const withRowHeaders = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="withHeaders"
          tableData={tableData}
          titleText="this is the caption"
          useRowHeaders
        />
      )
      .toJSON();
    const withCustomHeaderColors = renderer
      .create(
        <Table
          columnHeadersBackgroundColor="var(--nypl-colors-ui-link-primary)"
          columnHeadersTextColor="var(--nypl-colors-ui-white)"
          columnHeaders={columnHeaders}
          id="withHeaders"
          tableData={tableData}
          titleText="this is the caption"
          useRowHeaders
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="chakra"
          tableData={tableData}
          p="20px"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Table
          columnHeaders={columnHeaders}
          id="props"
          tableData={tableData}
          data-testid="props"
        />
      )
      .toJSON();
    const withJSXData = renderer
      .create(
        <Table
          columnHeaders={characterHeaders}
          id="jsx-example"
          tableData={charactersData}
        />
      )
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(withCaption).toMatchSnapshot();
    expect(withAriaLabel).toMatchSnapshot();
    expect(withHeaders).toMatchSnapshot();
    expect(withRowHeaders).toMatchSnapshot();
    expect(withCustomHeaderColors).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
    expect(withJSXData).toMatchSnapshot();
  });

  it("passes a ref to the table element", () => {
    const ref = React.createRef<HTMLTableElement>();
    const { container } = render(
      <Table columnHeaders={columnHeaders} tableData={tableData} ref={ref} />
    );

    expect(container.querySelector("table")).toBe(ref.current);
  });
});
