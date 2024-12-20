/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Meta, StoryObj } from "@storybook/react";

import Heading from "../Heading/Heading";
import Link from "../Link/Link";
import List, { listTypesArray } from "./List";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof List> = {
  title: "Components/Typography & Styles/List",
  component: List,
  argTypes: {
    children: { table: { disable: true } },
    className: { control: false },
    id: { control: false },
    inline: argsBooleanType(),
    listItems: { control: false },
    noStyling: argsBooleanType(),
    showRowDividers: argsBooleanType("true"),
    title: { control: { type: "text" } },
    type: {
      control: { type: "radio" },
      options: listTypesArray,
      table: { defaultValue: { summary: "ul" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const animalCrossingDescriptions = [
  {
    term: "Mahi-mahi",
    description:
      'The mahi-mahi is an ocean fish known for its wide, somewhat-cute face. It can reach over six feet long. It is known by different names including "dolphinfish," even though it has no relation to dolphins. They live in only in warm, tropical waters...which perhaps explains the relaxed, happy look on their faces.',
  },
  {
    term: "Golden trout",
    description: (
      <p>
        The golden trout is a <b>beautifully</b> colored fish that can only live
        in very clean waters. They are difficult to come across since they are
        found only in high mountain streams. As a side note, I find it much
        easier to appreciate fish that aren't such prima donnas about
        everything.
      </p>
    ),
  },
  {
    term: "Rainbowfish",
    description:
      'The rainbowfish is a tropical fish known for its metallic colors and beautiful fins. There are over 50 different species, each unique and pleasing color. I must say, it does make me wish for feathers of a more exciting hue than "underbaked brownie."',
  },
  {
    term: "Suckerfish",
    description: (
      <p>
        The{" "}
        <Link href="https://animalcrossing.fandom.com/wiki/Suckerfish">
          suckerfish
        </Link>{" "}
        is a curious fish that likes to attach itself with its sucker mouth to
        larger marine animals. The benefit to the suckerfish is that it gets to
        eat smaller parasites and dead skin off the host's body. Amusingly, some
        people have used suckerfish on cords to catch large turtles with the
        fish's own suction! I imagine this practice is the cause of some awkward
        conversations between fish and turtle, eh wot?
      </p>
    ),
  },
];
const itemGroups = [
  "Art",
  "Bushes",
  "Clothing",
  "DIY Recipes",
  "Flowers",
  "Fossils",
  "Fruits",
  "Furniture",
  "Materials",
  "NPC",
  "Songs",
  "Tools",
  "Villagers",
];
const descriptions = [
  {
    term: "Balrogs",
    description:
      'Demonic creatures of fire and shadow, Balrogs were fallen Maiar, loyal to the first Dark Lord, Morgoth. They participated in the wars of the First Age of Middle-earth but were mostly destroyed during the War of Wrath which ended the Age. By the Third Age, the only remaining Balrog was "Durin\'s Bane," the Balrog of Moria, killed by Gandalf.',
  },
  {
    term: "Dwarves",
    description:
      "The race of Dwarves preferred to live in mountains and caves, settling in places such as Erebor (the Lonely Mountain), the Iron Hills, the Blue Mountains, and Moria (Khazad-dûm) in the Misty Mountains. Aulë the Smith created Dwarves; he also invented the Dwarven language, known as Khuzdul. Dwarves mined and worked precious metals throughout the mountains of Middle-earth. The seven different groups of Dwarf-folk originated in the locations where the Seven Fathers of the Dwarves first awoke before the First Age.",
  },
  {
    term: "Elves",
    description:
      'The Elves, or Firstborn, were the first of Eru\'s Children to awaken. Born under the stars before the ascension of the Moon and the Sun, they retain a special love for light and an inner spirit endowed with unique gifts. They call themselves the Quendi, or "Speakers", for they were the first to utter words; and, even now, no race understands language and song like the Firstborn. Fair and fine featured, brilliant and proud, immortal and strong, tall and agile, they are the most blessed of the Free Peoples. They can see as well under moon or starlight as a man at the height of day. They cannot become sick or scarred, but if an Elf should die, from violence or losing the will to live from grief, their spirit goes to the halls of Mandos, and as they are bound to Arda and cannot leave until the world is broken and remade. Elven skill and agility is legendary: for instance, walking atop freshly fallen snow without leaving a trace of their passing. On a clear day they can see ten miles with perfect clarity and detail up to 100 miles. These gifts come at great cost, though: they are strongly bound to Fate (see Mandos) and hated by Morgoth. No other race has been blessed and cursed more than the Quendi.',
  },
  {
    term: "Ents",
    description:
      "Ents were an ancient race of tree-like creatures, having become like the trees that they shepherd. They were created by Yavanna and given life by Ilúvatar. By the Third Age, they were a dwindling race, having long ago lost their mates, the Entwives.",
  },
  {
    term: "Hobbits",
    description:
      'Hobbits are a race of Middle-earth, also known as "halflings" on account of their short stature, roughly half the size of men. They are characterized by curly hair on their heads and leathery feet that have furry insteps, for which they did not wear shoes. Many hobbits live in the Shire as well as Bree, and they once lived in the vales of the Anduin. They are fond of an unadventurous life of farming, eating, and socializing. There were three types of Hobbits: The Harfoots were the most numerous. The Stoors had an affinity for water, boats and swimming; the Fallohides were an adventurous people. The origin of hobbits is unclear, but of all the races they have the closest affinity to men, and in the Prologue to The Lord of the Rings Tolkien calls them relatives of men.',
  },
];

/**
 * Main Story for the List component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    id: "nypl-list",
    inline: false,
    listItems: undefined,
    noStyling: false,
    showRowDividers: true,
    title: "Middle-Earth Peoples",
    type: "ul",
  },
  render: (args) => (
    <List {...args}>
      {args.type !== "dl"
        ? itemGroups.map((item, i) => <li key={i}>{item}</li>)
        : descriptions.map((item, i) => [
            <dt key={`dt_${i}`}>{item.term}</dt>,
            <dd key={`dd_${i}`}>{item.description}</dd>,
          ])}
    </List>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=16115%3A304",
    },
    jest: ["List.test.tsx"],
  },
};

// The following are additional List example Stories.
export const DescriptionList: Story = {
  args: {
    id: "nypl-list2",
    noStyling: false,
    showRowDividers: true,
    title: "Middle-Earth Peoples",
  },
  argTypes: {
    inline: { control: false },
    showRowDividers: { control: { type: "boolean" } },
    noStyling: { control: false },
    type: { control: false },
  },
  render: (args) => (
    <List {...args} type="dl">
      {descriptions.map((item, i) => [
        <dt key={`dt_${i}`}>{item.term}</dt>,
        <dd key={`dd_${i}`}>{item.description}</dd>,
      ])}
    </List>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=10734%3A5178",
    },
  },
};
export const DescriptionListWithCustomHeading: Story = {
  args: {
    id: "nypl-list3",
    noStyling: false,
    title: <Heading level="h4">Middle-Earth Peoples</Heading>,
  },
  argTypes: {
    inline: { control: false },
    noStyling: { control: false },
    type: { control: false },
  },
  render: (args) => (
    <List {...args} type="dl">
      {descriptions
        // just for a shorter example
        .slice(0, 2)
        .map((item, i) => [
          <dt key={`dt_${i}`}>{item.term}</dt>,
          <dd key={`dd_${i}`}>{item.description}</dd>,
        ])}
    </List>
  ),
};

export const DescriptionListWithLinks: Story = {
  args: {
    noStyling: false,
    title: "Details",
  },
  argTypes: {
    inline: { control: false },
    noStyling: { control: false },
    type: { table: { disable: true } },
  },
  render: (args) => (
    <List {...args} type="dl">
      <dt>Authors</dt>
      <dd>
        <a href="#">Chirwa, Ephraim Wadonda, author</a>
        <br />
        <a href="#">Dorward, Andrew, author</a>
      </dd>
      <dt>Subjects</dt>
      <dd>
        <a href="#">Ackerbau</a>
        <br />
        <a href="#">Ackerbau.</a>
        <br />
        <a href="#">Africa.</a>
        <br />
        <a href="#">Afrika.</a>
        <br />
        <a href="#">Agrarsubvention</a>
        <br />
        <a href="#">Agrarsubvention.</a>
        <br />
        <a href="#">Agricultura -- Subvencions -- Malawi.</a>
        <br />
        <a href="#">Agricultural economics New.</a>
        <br />
        <a href="#">Agricultural subsidies</a>
        <br />
        <a href="#">Agricultural subsidies -- Developing countries.</a>
        <br />
        <a href="#">Agricultural subsidies -- Malawi.</a>
        <br />
        <a href="#">Agricultural subsidies.</a>
        <br />
        <a href="#">BUSINESS &amp; ECONOMICS -- Industries</a>
        <br />
      </dd>
    </List>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=10734%3A5178",
    },
  },
};

export const ListWithDataProps: Story = {
  args: {
    listItems: animalCrossingDescriptions,
    noStyling: false,
    title: "Animal Crossing Fish",
  },
  argTypes: {
    inline: { control: false },
    noStyling: { control: false },
    type: { control: false },
  },
  render: (args) => <List {...args} type="dl" />,
};
