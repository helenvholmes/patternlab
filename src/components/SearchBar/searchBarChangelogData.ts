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
    date: "2024-10-24",
    version: "3.4.1",
    type: "Update",
    affects: ["Styles"],
    notes: ["Updates the styles to allow more room for the label text."],
  },
  {
    date: "2024-10-02",
    version: "3.4.0",
    type: "Update",
    affects: ["Functionality"],
    notes: [
      "Updates invalid text in the SearchBar component to include 'There was a problem. ' prefix",
    ],
  },
  {
    date: "2024-09-19",
    version: "3.3.2",
    type: "Update",
    affects: ["Styles"],
    notes: ["Changes 'r' in '(required)' label from upper- to lowercase"],
  },
  {
    date: "2024-08-29",
    version: "3.3.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Updates styles on mobile breakpoints, adds span element to text for CSS targeting.",
    ],
  },
  {
    date: "2024-06-20",
    version: "3.1.6",
    type: "Update",
    affects: ["Styles"],
    notes: ["Adds interaction tests for the Controls story."],
  },
  {
    date: "2024-05-23",
    version: "3.1.4",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      "Updates the internal `TextInput` component's aria-describedby value to include the `SearchBar`'s helper text ID.",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
  {
    date: "2023-12-07",
    version: "2.1.3",
    type: "Update",
    affects: ["Accessibility", "Documentation", "Styles"],
    notes: [
      "Updated the `headingText` prop to allow JSX to render custom heading elements for accessible heading hierarchy.",
      "Added a z-index on hover to the select icon so it no longer disappears.",
    ],
  },
];
