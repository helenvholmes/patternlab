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
    affects: ["Styles"],
    notes: ["Updates arrow to be center aligned vertically."],
  },
  {
    date: "Prerelease",
    version: "Prerelease",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      "Adds screenreaderOnly styles to span inside breadcrumb so link has descriptive text on mobile.",
    ],
  },
  {
    date: "2024-08-29",
    version: "3.3.0",
    type: "Update",
    affects: ["Functionality"],
    notes: [
      "Adds `customLinkComponent` and `linkProps` props to allow clientside routing.",
    ],
  },
  {
    date: "2024-07-03",
    version: "3.1.7",
    type: "Update",
    affects: ["Styles"],
    notes: ["Adds `digitalCollections` color variant."],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
  {
    date: "2024-02-22",
    version: "2.1.6",
    type: "Update",
    affects: ["Styles"],
    notes: ["Updates focus ring color to match color of text."],
  },
];
