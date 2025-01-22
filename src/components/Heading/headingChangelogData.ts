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
    notes: ["Adds `line-height` styles for mobile."],
  },
  {
    date: "2024-11-07",
    version: "3.4.2",
    type: "Update",
    affects: ["Styles"],
    notes: ["Adds the `heading7` and `heading8` options for the `size` prop."],
  },
  {
    date: "2024-06-20",
    version: "3.1.6",
    type: "Update",
    affects: ["Styles"],
    notes: ["Updates the styles for links within the heading."],
  },
  {
    date: "2024-05-09",
    version: "3.1.2",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Extends prop type to allow heading HTML attributes."],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Chakra 2.8 update.",
      "Updates the component's theme file to use native Chakra responsive styles of the font sizes and removed the conditional logic that handled that previously.",
    ],
  },
  {
    date: "2024-02-22",
    version: "2.1.6",
    type: "Bug Fix",
    affects: ["Styles"],
    notes: ['Fixed the desktop font size for the "heading5" variant.'],
  },
  {
    date: "2024-02-05",
    version: "2.1.5",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Updated to use a custom `@media query` method to handle the responsive `font-size` styles.",
    ],
  },
  {
    date: "2023-12-07",
    version: "2.1.3",
    type: "Update",
    affects: ["Styles"],
    notes: [
      'Updates the `font-weight` to "regular" for the `subtitle1` and `subtitle2` text styles.',
    ],
  },
  {
    date: "2023-10-26",
    version: "2.1.1",
    type: "Update",
    affects: ["Accessibility"],
    notes: [
      'Updated the `aria-roledescription` value to "subtitle" (a more familiar and recognizable term) for the `overline` element.',
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
