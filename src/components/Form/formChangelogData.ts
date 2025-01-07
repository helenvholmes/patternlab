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
    affects: ["Accessibility"],
    notes: [
      "Removes the hard-coded `aria-label` attribute since it's redundant. The prop is still available for custom descriptive values.",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Documentation"],
    notes: ["Updates the component's type definition to be more specific."],
  },
];
