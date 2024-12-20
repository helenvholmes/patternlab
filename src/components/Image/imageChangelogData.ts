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
    date: "2024-09-05",
    version: "3.3.1",
    type: "Bug Fix",
    affects: ["Accessibility"],
    notes: [
      "Fixes an issue where the `id` prop was being duplicated in the aspect ratio's wrapper div.",
    ],
  },
  {
    date: "2024-08-29",
    version: "3.3.0",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      "Defaults the `alt` attribute to an empty string if no value is passed.",
    ],
  },
  {
    date: "2024-04-25",
    version: "3.1.1",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Adds `fallbackSrc` and `onError` props."],
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
    affects: ["Documentation", "Functionality", "Styles"],
    notes: ["Adds `sizeBasedOn` prop to the `Logo` component."],
  },
];
