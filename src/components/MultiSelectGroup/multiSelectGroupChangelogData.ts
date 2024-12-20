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
    date: "2024-07-03",
    version: "3.1.7",
    type: "Update",
    affects: ["Documentation"],
    notes: [
      "Added an example of a `MultiSelectGroup` with the `MultiSelect`'s `closeOnBlur` set to true",
    ],
  },
  {
    date: "2024-04-11",
    version: "3.1.0",
    type: "Update",
    affects: ["Accessibility", "Documentation", "Functionality", "Styles"],
    notes: [
      "V2 refactor of the `MultiSelectGroup` component including updating to Chakra 2.8.",
    ],
  },
];
