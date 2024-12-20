import List from "../components/List/List";
import Table from "../components/Table/Table";

export const affectTypesArray = [
  "Accessibility",
  "Documentation",
  "Functionality",
  "Styles",
] as const;
export type AffectTypes = typeof affectTypesArray[number];

export interface ChangelogData {
  /** Date of the release; format yyyy-mm-dd; when adding new entry during development, set value as "Prerelease" */
  date: string;
  /** Version nunber of the release; when adding new entry during development, set value as "Prerelease" */
  version: string;
  /** The type of update  */
  type: "Bug Fix" | "New Feature" | "Update";
  /** The scope of the update */
  affects: AffectTypes[];
  /** Details about the update; this array will be rendered as a bulleted list */
  notes: string[];
}

export interface ComponentChangelogTableProps {
  changelogData: ChangelogData[];
}

export const ComponentChangelogTable = (
  props: ComponentChangelogTableProps
) => {
  const { changelogData } = props;
  const tableData = changelogData.map((tableRow: ChangelogData) => {
    const { date, version, type, affects, notes } = tableRow;
    const dateFormatted =
      date === "Prerelease"
        ? date
        : new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    const affectsFormatted = affects.sort().join(", ");
    const notesItems = notes.map((item, i) => <li key={i}>{item}</li>);
    const notesList = <List type="ul">{notesItems}</List>;
    const rowData = [dateFormatted, version, type, affectsFormatted, notesList];
    return rowData;
  });

  const headersData = ["Date", "Version", "Type", "Affects", "Notes"];
  const narrowTdWidth = "9rem";
  const narrowerTdWidth = "7rem";
  const borderColor = "ui.gray.semi-medium";
  const customStyles = {
    thead: {
      th: {
        borderColor: borderColor,
        fontSize: "desktop.overline.overline2",
        pb: "xs",
        pt: "xs",
        textTransform: "uppercase",
      },
    },
    tbody: {
      th: {
        _first: {
          bgColor: "transparent",
          fontSize: "desktop.caption",
        },
      },
    },
    th: {
      borderColor: borderColor,
      fontSize: "desktop.caption",
      _first: {
        borderRight: 0,
      },
      _last: {
        borderColor: borderColor,
      },
    },
    td: {
      borderColor: borderColor,
      fontSize: "desktop.caption",
      _last: {
        borderColor: borderColor,
      },
    },
    "th:nth-child(1)": {
      width: { base: "auto", md: narrowTdWidth },
    },
    "th:nth-child(2)": {
      width: narrowerTdWidth,
    },
    "th:nth-child(3)": {
      width: narrowerTdWidth,
    },
    "th:nth-child(4)": {
      width: narrowerTdWidth,
    },
    ul: {
      m: "0",
    },
    li: {
      _notFirst: { mt: "xs" },
    },
  };

  return (
    <Table
      className="sb-unstyled"
      columnHeaders={headersData}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
      tableData={tableData}
      useRowHeaders
      sx={customStyles}
    />
  );
};

export default ComponentChangelogTable;
