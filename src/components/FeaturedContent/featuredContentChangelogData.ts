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
    notes: ["Updates styles with container queries to be more responsive."],
  },
  {
    date: "2024-08-29",
    version: "3.3.0",
    type: "Update",
    affects: ["Documentation"],
    notes: [
      "Removes `imageProps.alt` missing warning message as the prop is not always required.",
    ],
  },
  {
    date: "2024-07-25",
    version: "3.2.0",
    type: "Update",
    affects: ["Functionality"],
    notes: [
      "Exports the `FeaturedContentWidthType` and `FeaturedContentPositionType` types and the `FeaturedContentImageProps` interface.",
    ],
  },
  {
    date: "2024-04-25",
    version: "3.1.1",
    type: "Update",
    affects: ["Functionality"],
    notes: [
      "Adds workaround to fix Chakra bug that causes certain image URLs to not render through the `background-image` CSS property.",
    ],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: [
      "Chakra 2.8 update.",
      "Fixed the responsive styles related to the image.",
    ],
  },
  {
    date: "2023-12-07",
    version: "2.1.3",
    type: "Update",
    affects: ["Styles"],
    notes: [
      'Updated the spacing in the "fullScreen" variant to better align the component text content with the page text content.',
    ],
  },
  {
    date: "2023-10-18",
    version: "2.1.0",
    type: "New Feature",
    affects: ["Accessibility", "Documentation", "Functionality", "Styles"],
    notes: ["Adds FeaturedContent component."],
  },
];
