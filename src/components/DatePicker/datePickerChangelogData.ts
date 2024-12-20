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
    date: "2024-09-19",
    version: "3.3.2",
    type: "Update",
    affects: ["Styles"],
    notes: ["Changes 'r' in '(required)' label from upper- to lowercase"],
  },
  {
    date: "2024-07-25",
    version: "3.2.0",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Exports the `CustomTextInputProps` interface."],
  },
  {
    date: "2024-07-03",
    version: "3.1.7",
    type: "Update",
    affects: ["Documentation"],
    notes: ["Adds interaction tests for the Controls story."],
  },
  {
    date: "2024-04-11",
    version: "3.1.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Reduced the spacing between the field label and the field itself.",
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
    date: "2024-02-22",
    version: "2.1.6",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Fixes the range calendar style for the month and year calendars.",
      "Fixes minor typo in the Initial Date Values section.",
    ],
  },
  {
    date: "2024-01-04",
    version: "2.1.4",
    type: "Update",
    affects: ["Functionality", "Styles"],
    notes: [
      "Fixes bug where month and year calendars were rendering vertically rather than horizontally.",
      "Updates the `initialDate` and `initialDateTo` props to accept an empty string and adds optional `placeholder` and `placeholderTo` props.",
    ],
  },
  {
    date: "2023-12-07",
    version: "2.1.3",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Adds z-index to calendar container so that helper text does not shift when calendar opens.",
    ],
  },
  {
    date: "2023-10-26",
    version: "2.1.1",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      'Updates the internal TextInput to always have an "aria-label" attribute that tells screenreader users how to access the calendar.',
    ],
  },
  {
    date: "2023-10-18",
    version: "2.1.0",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      "Updates to pass a secondaryHelperTextId to its TextInput if needed so that the aria-describedby value can be associated with all relevant helperTexts.",
      "Updates so that focus remains on input after value is changed.",
    ],
  },
  {
    date: "2023-9-28",
    version: "2.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Applied Typo2023 styles, including font size, font color, and text link patterns.",
    ],
  },
];
