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
    date: "Prerelease",
    version: "Prerelease",
    type: "Update",
    affects: ["Functionality", "Styles"],
    notes: [
      "Major update to component and styles based on the [Template TAD](https://docs.google.com/document/d/1vZJX7Y-DnEM44-iWw5qoXGdxqavHEN6prhr-YDTNr0o/edit?pli=1&tab=t.0).",
    ],
  },
  {
    date: "2024-10-02",
    version: "3.4.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Updates the styles to better accommodate the horizontal scrolling in the `Table` component.",
    ],
  },
  {
    date: "2024-05-09",
    version: "3.1.2",
    type: "Update",
    affects: ["Functionality", "Accessibility"],
    notes: ["Adds `id` prop."],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
];
