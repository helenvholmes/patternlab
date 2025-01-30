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
    date: "2025-01-30",
    version: "3.5.3",
    type: "Update",
    affects: ["Styles"],
    notes: ["Updates the text and size styles for the search input field."],
  },
  {
    date: "2024-12-05",
    version: "3.5.0",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: [
      "Updates the `items` prop to include `itemCount` as a data property to render the item count for an option.",
    ],
  },
  {
    date: "2024-10-02",
    version: "3.4.0",
    type: "Update",
    affects: ["Documentation"],
    notes: ["Adds interaction tests for the Controls story."],
  },
  {
    date: "2024-08-29",
    version: "3.3.0",
    type: "New Feature",
    affects: ["Accessibility"],
    notes: [
      "Renders the `buttonText` prop as the `CheckboxGroup`'s legend for more meaningful context.",
    ],
  },
  {
    date: "2024-07-03",
    version: "3.1.7",
    type: "New Feature",
    affects: ["Functionality"],
    notes: [
      "Adds `closeOnBlur` prop which, when set to true, closes the component if it loses focus.",
    ],
  },
  {
    date: "2024-05-23",
    version: "3.1.4",
    type: "Bug Fix",
    affects: ["Styles"],
    notes: ["Fixes the z-index value in the small selected items button."],
  },
  {
    date: "2024-04-25",
    version: "3.1.1",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Updated the placeholder value for the search field."],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Accessibility", "Documentation", "Functionality", "Styles"],
    notes: ["Chakra 2.8 update.", "Refactors the `MultiSelect` component."],
  },
];
