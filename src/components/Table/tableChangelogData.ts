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
    affects: ["Styles"],
    notes: ["Fixes spacing issues and dark mode color styles."],
  },
  {
    date: "2024-10-02",
    version: "3.4.0",
    type: "Update",
    affects: ["Accessibility", "Documentation", "Functionality", "Styles"],
    notes: [
      "Added the `isScrollable` prop to enable horizontal scrolling.",
      "Added the `columnStyles` prop to allow for custom column styles (i.e. width, text alignment, etc.).",
      "Added the `tableTextSize` prop to set the size of the text within the table.",
      "Added the `titleText` and `showTitleText` props to control the <caption> element and arial-label attribute.",
    ],
  },
  {
    date: "2024-05-09",
    version: "3.1.2",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Adds inline responsive styles and removes the use of the useWindowSize hook.",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
];
