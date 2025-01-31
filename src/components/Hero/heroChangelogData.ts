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
    notes: [
      "Updates the `primary` variant of the `Hero` component to have appropriate padding for desktop and mobile, and `max-width` of 860px",
      "Updates the `campaign` variant of the `Hero component to have consistent padding.",
    ],
  },
  {
    date: "2024-10-24",
    version: "3.4.1",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Updates `imageProps` to accept custom image component."],
  },
  {
    date: "2024-05-09",
    version: "3.1.2",
    type: "Update",
    affects: ["Functionality", "Accessibility"],
    notes: ["Adds `id` prop."],
  },
  {
    date: "2024-04-25",
    version: "3.1.1",
    type: "Update",
    affects: ["Functionality", "Styles"],
    notes: [
      "Added the `isDarkText` prop.",
      "Added conditional logic to handle how the `foregroundColor` and `isDarkText` props are used.",
      "Added the `fallbackSrc` and `onError` properties to the `imageProps` prop for the internal `Image` component.",
      "Adds workaround to fix Chakra bug that causes certain image URLs to not render through the `background-image` CSS property.",
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
    affects: ["Styles"],
    notes: [
      'Updated the "campaign" variant to improve the spacing around the component.',
      "Added the `isDarkBackgroundImage` prop.",
    ],
  },
  {
    date: "2023-11-09",
    version: "2.1.2",
    type: "Update",
    affects: ["Styles"],
    notes: [
      'Updated the layout for the "campaign" variant to have consistent padding on its left and right sides.',
    ],
  },
  {
    date: "2023-10-26",
    version: "2.1.1",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: [
      'Deprecated the "secondary" and "fiftyFifty" variants.',
      'Fixed a bug where custom background colors were not rendering properly in dark mode for the "campaign" and "tertiary" variants.',
    ],
  },
  {
    date: "2023-10-18",
    version: "2.1.0",
    type: "Bug Fix",
    affects: ["Functionality"],
    notes: [
      "Fixed an issue with `backgroundColor` and `foregroundColor` props not prioritizing the passed design token values for the `Hero` component.",
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
