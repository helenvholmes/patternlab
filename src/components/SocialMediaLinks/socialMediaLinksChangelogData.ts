/** This data is used to populate the ComponentChangelogTable component.
 *
 * date: string (when adding new entry during development, set value as "Prerelease")
 * version: string (when adding new entry during development, set value as "Prerelease")
 * type: "Bug Fix" | "New Feature" | "Update";
 * affects: array["Accessibility" | "Documentation" | "Functionality" | "Styles"];
 * notes: array (will render as a bulleted list, add one array element for each list element)
 */
import { ChangelogData } from "../../utils/ComponentChangelogTable";

export const changelogData: ChangelogData[] = [
  {
    date: "2024-11-07",
    version: "3.4.2",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Added support for the `socialX` icon."],
  },
  {
    date: "2024-07-25",
    version: "3.2.0",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Refined the component with updated props."],
  },
  {
    date: "2024-03-28",
    version: "3.0.1",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Updated the mobile styles so that links are center-aligned in a row (when rendered without labels) and in a column (when rendered with labels)",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
];
