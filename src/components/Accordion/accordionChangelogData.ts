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
    affects: ["Accessibility", "Functionality"],
    notes: [
      "Adds logic to close accordion when element within panel is focused and 'esc' key is pressed",
    ],
  },
  {
    date: "2024-05-23",
    version: "3.1.4",
    type: "Update",
    affects: ["Accessibility", "Functionality"],
    notes: [
      "Adds logic to close accordion when accordion button is focused and 'esc' key is pressed",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Accessibility", "Functionality"],
    notes: [
      "Chakra 2.8 update.",
      "Added the ariaLabel and buttonInteractionRef prop.",
    ],
  },
];
