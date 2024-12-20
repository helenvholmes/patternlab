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
    date: "2024-11-07",
    version: "3.4.2",
    type: "Update",
    affects: ["Functionality"],
    notes: ["Added the `contentFilterList` and `socialX` icons."],
  },
  {
    date: "2024-10-24",
    version: "3.4.1",
    type: "Update",
    affects: ["Functionality"],
    notes: [
      "Added the `decorativeBookBroken` icon.",
      "Added the `xxxxlarge` and `xxxxxlarge` sizes.",
      "Added the `2xlarge`, `3xlarge`, `4xlarge`, and `5xlarge` sustainable size options.",
    ],
  },
  {
    date: "2024-04-11",
    version: "3.1.0",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: ["Added the actionLightbulb icon."],
  },
  {
    date: "2024-03-28",
    version: "3.0.1",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: ["Added the editorMode (pencil) icon."],
  },
  {
    date: "2024-03-14",
    version: "3.0.0",
    type: "Update",
    affects: ["Styles"],
    notes: ["Chakra 2.8 update."],
  },
  {
    date: "2024-02-05",
    version: "2.1.5",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: ["Added the navigationMoreVert (vertical ellipsis) icon."],
  },
  {
    date: "2024-01-24",
    version: "2.1.4",
    type: "Update",
    affects: ["Documentation", "Functionality"],
    notes: [
      "Added the actionDelete, actionHome, actionLockClosed, actionPayment, communicationCall, communicationChatBubble, and communicationEmail icons.",
    ],
  },
];
