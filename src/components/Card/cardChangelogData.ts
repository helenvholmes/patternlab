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
    date: "2024-09-19",
    version: "3.3.2",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Adds `fallbackSrc` and `onError` to the `imageProps` prop."],
  },
  {
    date: "2024-05-09",
    version: "3.1.2",
    type: "Update",
    affects: ["Functionality", "Accessibility"],
    notes: ["Adds `id` to the `imageProps` prop."],
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
    affects: ["Functionality", "Documentation"],
    notes: [
      "Propagates the `imageProps.isLazy` property down to the `Card`'s internal `Image` component implementation.",
    ],
  },
];
