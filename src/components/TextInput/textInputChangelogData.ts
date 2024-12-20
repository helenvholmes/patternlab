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
    type: "Bug Fix",
    affects: ["Functionality", "Accessibility"],
    notes: [
      "Fixes conflicting internal and external ref props and values for the clearable button focus management.",
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
    date: "2024-05-23",
    version: "3.1.4",
    type: "Update",
    affects: ["Accessibility"],
    notes: ["Updates how aria-describedby is set."],
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
    date: "2023-11-09",
    version: "2.1.2",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      'Added the `autoComplete` prop for setting the "autocomplete" attribute manually.',
    ],
  },
  {
    date: "2023-10-18",
    version: "2.1.0",
    type: "Bug Fix",
    affects: ["Accessibility"],
    notes: [
      "Updated so the `aria-describedby` value is not overwritten as 'undefined' when `TextInput` is part of the `DatePicker` component.",
    ],
  },
  {
    date: "2023-9-28",
    version: "2.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Applied Typo2023 styles, including font size and font color."],
  },
];
