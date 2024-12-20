import type { Meta, StoryObj } from "@storybook/react";

import Heading from "../Heading/Heading";
import Image from "../Image/Image";
import Table, { tableBodyTextSizesArray } from "./Table";
import { argsBooleanType } from "../../helpers/storybookUtils";
import { Stack } from "@chakra-ui/react";

const meta: Meta<typeof Table> = {
  title: "Components/Page Layout/Table",
  component: Table,
  argTypes: {
    columnHeaders: { control: { disable: true } },
    columnHeadersBackgroundColor: { control: { type: "color" } },
    columnHeadersTextColor: { control: { type: "color" } },
    id: { control: false },
    isScrollable: { ...argsBooleanType(), defaultValue: { summary: "false" } },
    showRowDividers: {
      ...argsBooleanType(),
      defaultValue: { summary: "false" },
    },
    showTitleText: { ...argsBooleanType(), defaultValue: { summary: "false" } },
    tableData: { control: false },
    tableTextSize: {
      options: tableBodyTextSizesArray,
      defaultValue: { summary: "body1" },
    },
    useColumnStyles: {
      control: { type: "boolean" },
      description:
        "**Only used for Storybook** – Apply custom column styles and use alternate table data",
    },
    useRowHeaders: { ...argsBooleanType(), defaultValue: { summary: "false" } },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columnHeaders = [
  "First Name",
  "Last Name",
  "Nick Name",
  "Address1",
  "City",
  "State",
  "Zipcode",
];
const tableData = [
  ["Tom", "Nook", "Tanukichi", "Main Street", "New York", "NY", "23458"],
  ["Isabelle", "-", "Shizue", "Walnut Street", "New York", "NY", "23458"],
  ["K.K.", "Slider", "Totakeke", "Niper Place", "New York", "NY", "98765"],
  [
    "Sonny",
    "Resetti",
    "Risetto san",
    "Village Road",
    "New York",
    "NY",
    "09873",
  ],
];

const columnHeadersAltBasic = ["Name", "Description", "Salary (USD)"];
const tableDataAltBasic = [
  [
    "Tom Nook",
    "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue.",
    "$225,000",
  ],
  [
    "Isabelle",
    "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    "$228,500",
  ],
  [
    "K.K. Slider",
    "Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.",
    "$157,000",
  ],
  [
    "Sonny Resetti",
    "Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    "$89,000",
  ],
];
const columnStylesBasic = [
  { minWidth: "200px", width: "15%" },
  { minWidth: "400px", width: "auto" },
  { minWidth: "200px", width: "15%", textAlign: "right" },
];

const columnStylesEmpty = [
  { minWidth: "200px", width: "15%" },
  {},
  { minWidth: "200px", width: "15%", textAlign: "right" },
];

const columnHeadersAlt = [
  "Name",
  "Nick Name",
  "Species",
  "Description",
  "Bio",
  "Salary (USD)",
];
const tableDataAlt = [
  [
    "Tom Nook",
    "Tanukichi",
    "Raccoon",
    "A businessman who manages the town shop and the player's home loan.",
    "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue.",
    "$225,000",
  ],
  [
    "Isabelle",
    "Shizue",
    "Dog",
    "A secretary and assistant to the player. Twin sister to Digby.",
    "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    "$228,500",
  ],
  [
    "K.K. Slider",
    "Totakeke",
    "Dog",
    "A traveling musician and DJ. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    "Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.",
    "$157,000",
  ],
  [
    "Sonny Resetti",
    "Risetto san",
    "Mole",
    "Lectures the player if they reset their game. Brother to Don Resetti.",
    "Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    "$89,000",
  ],
];
const columnStylesComplex = [
  { minWidth: "200px", width: "15%" },
  { minWidth: "200px", width: "15%" },
  { minWidth: "200px", width: "15%" },
  { minWidth: "500px", width: "auto" },
  { minWidth: "500px", width: "auto" },
  { minWidth: "160px", width: "15%", textAlign: "right" },
];

/**
 * Main Story for the Table component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    columnHeaders,
    columnHeadersBackgroundColor: undefined,
    columnHeadersTextColor: undefined,
    columnStyles: undefined,
    id: undefined,
    isScrollable: false,
    showRowDividers: false,
    showTitleText: false,
    tableData,
    tableTextSize: "body1",
    titleText: undefined,
    useColumnStyles: false,
    useRowHeaders: false,
  },
  render: (args: any) => (
    <Table
      {...args}
      columnHeaders={args.useColumnStyles ? columnHeadersAlt : columnHeaders}
      columnStyles={args.useColumnStyles ? columnStylesComplex : undefined}
      tableData={args.useColumnStyles ? tableDataAlt : tableData}
    ></Table>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=46780%3A27675",
    },
    jest: "Table.test.tsx",
  },
};

// The following are additional Table example Stories.
export const ShowTitleText: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeaders}
      id="table-title-text"
      tableData={tableData}
      titleText="Table with visible title"
    />
  ),
};

export const HideTitleText: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeaders}
      id="table-aria-label"
      showTitleText={false}
      tableData={tableData}
      titleText="Table with aria-label"
    />
  ),
};

export const RowDividers: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeaders}
      id="table-row-dividers"
      showTitleText={false}
      showRowDividers
      tableData={tableData}
      titleText="Table with row dividers"
    />
  ),
};

export const RowHeaders: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeaders}
      id="table-row-headers"
      showTitleText={false}
      tableData={tableData}
      titleText="Table with row headers"
      useRowHeaders
    />
  ),
};

export const CustomHeaderColors: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeaders}
      columnHeadersBackgroundColor="var(--nypl-colors-ui-link-secondary)"
      columnHeadersTextColor="var(--nypl-colors-ui-white)"
      id="table-custom-header-colors"
      showRowDividers
      showTitleText={false}
      tableData={tableData}
      titleText="Table with custom header colors"
      useRowHeaders
    />
  ),
};

export const NativeColumnStyles: Story = {
  render: () => (
    <Table
      columnHeaders={columnHeadersAltBasic}
      id="table-native-column-styles"
      showTitleText={false}
      tableData={tableDataAltBasic}
      titleText="Table using native column styles"
    />
  ),
};

export const CustomColumnStyles: Story = {
  render: () => (
    <Stack spacing="xl">
      <div>
        <Heading level="h4" size="heading6">
          Without Row Headers
        </Heading>
        <Table
          columnHeaders={columnHeadersAltBasic}
          columnStyles={columnStylesBasic}
          id="table-custom-column-styles"
          showTitleText={false}
          tableData={tableDataAltBasic}
          titleText="Table with custom column styles"
        />
      </div>
      <div>
        <Heading level="h4" size="heading6">
          With Row Headers
        </Heading>
        <Table
          columnHeaders={columnHeadersAltBasic}
          columnStyles={columnStylesBasic}
          id="table-custom-column-styles-row-headers"
          showTitleText={false}
          tableData={tableDataAltBasic}
          titleText="Table with custom column styles and row headers"
          useRowHeaders
        />
      </div>
      <div>
        <Heading level="h4" size="heading6">
          With Empty Style Object
        </Heading>
        <Table
          columnHeaders={columnHeadersAltBasic}
          columnStyles={columnStylesEmpty}
          id="table-custom-column-styles"
          showTitleText={false}
          tableData={tableDataAltBasic}
          titleText="Table with custom column styles"
        />
      </div>
    </Stack>
  ),
};

export const HorizontalScrolling: Story = {
  render: () => (
    <Stack spacing="xl">
      <div>
        <Heading level="h4" size="heading5">
          Without Row Headers
        </Heading>
        <Table
          columnHeaders={columnHeadersAlt}
          columnStyles={columnStylesComplex}
          id="table-horizontal-scrolling-wo-row-headers"
          isScrollable
          showRowDividers
          showTitleText={false}
          tableData={tableDataAlt}
          titleText="Table with horizontal scrolling and no row headers"
        />
      </div>
      <div>
        <Heading level="h4" size="heading5">
          With Row Headers
        </Heading>
        <Table
          columnHeaders={columnHeadersAlt}
          columnStyles={columnStylesComplex}
          id="table-horizontal-scrolling-w-row-headers"
          isScrollable
          showTitleText={false}
          tableData={tableDataAlt}
          titleText="Table with horizontal scrolling and row headers"
          useRowHeaders
        />
      </div>
    </Stack>
  ),
};

const characterHeaders = ["First Name", "Last Name", "Avatar"];
const charactersData = [
  [
    "Tom",
    "Nook",
    <Image
      alt="Tom Nook"
      key="image"
      size="small"
      src="https://play.nintendo.com/images/AC_Tom_FRYtwIN.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
  [
    "Isabelle",
    "-",
    <Image
      alt="Isabelle"
      key="image"
      size="small"
      src="https://play.nintendo.com/images/AC_Isabelle_7XU6aGu.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
  [
    "K.K.",
    "Slider",
    <Image
      alt="K.K Slider"
      key="image"
      size="small"
      src="https://play.nintendo.com/images/AC_KK_jh4yj5t.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png"
    />,
  ],
];
export const JSXElements: Story = {
  render: () => (
    <Table
      columnHeaders={characterHeaders}
      id="jsx-example"
      showRowDividers
      tableData={charactersData}
    />
  ),
  name: "JSX Element",
};
