import type { Meta, StoryObj } from "@storybook/react";

import Tabs, { TabList, Tab, TabPanels, TabPanel } from "./Tabs";
import { argsBooleanType } from "../../helpers/storybookUtils";

const animalCrossingData = [
  {
    label: "Tom Nook",
    content: (
      <p>
        Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional character
        in the Animal Crossing series who operates the village store.
      </p>
    ),
  },
  {
    label: "Isabelle",
    content:
      "Isabelle, known as Shizue in Japan, is a fictional character " +
      "from the Animal Crossing series of video games. She is a kindly Shih " +
      "Tzu that debuted in the 2012 release Animal Crossing: New Leaf, where " +
      "she serves as the secretary to the player character.",
  },
  {
    label: "K.K. Slider",
    content:
      "<p>Totakeke, more commonly known as <b>K.K. Slider or K.K.</b>, is a " +
      "fictional character within the Animal Crossing franchise. One of the " +
      "franchise's most popular characters, he debuted in the title Animal " +
      "Crossing, and has appeared in every installment since.</p>",
  },
  {
    label: "Mr. Resetti",
    content:
      "<strong>Mr. Resetti</strong>, full name Sonny Resetti, is a fictional " +
      "character from the Animal Crossing series of video games by Nintendo. " +
      "His first appearance was in the Nintendo 64 game Dōbutsu no Mori, " +
      "released in Europe and North America on the GameCube as Animal Crossing.",
  },
  {
    label: "Zucker",
    content:
      "<strong>Zucker</strong> is a lazy octopus villager who first appeared " +
      "in New Leaf. His Japanese name and general appearance refers to the " +
      "Japanese snack takoyaki, which is a fried ball of dough commonly " +
      "filled with minced octopus. His catchphrase is a reference to how he " +
      "is an underwater animal. He has the same initial phrase as Bertha. He " +
      "has the nature hobby.",
  },
];

const extraACData = [
  {
    label: "Filbert",
    content:
      "<strong>Filbert</strong> is a lazy squirrel villager in the Animal Crossing " +
      "series. His name, like most of his species, comes from a type of nut. In " +
      "this case, his name comes from an edible type of hazelnut. He has made an " +
      "appearance in every Animal Crossing game to date. He is the only lazy " +
      "squirrel villager in the series so far. His initial catchphrase could be " +
      "based on the fact that squirrels usually appear to have buck teeth. He " +
      "has the nature hobby.",
  },
  {
    label: "Timmy and Tommy",
    content:
      "<strong>Timothy</strong> (better known as Timmy) and <strong>Thomas</strong> " +
      "(more often known as Tommy) are the twin apprentices of Tom Nook, the tanuki " +
      "who runs the town's store. Their last names are said to be Nook.",
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Overlays & Switchers/Tabs",
  component: Tabs,
  argTypes: {
    children: { table: { disable: true } },
    defaultIndex: {
      table: { defaultValue: { summary: "0" } },
    },
    id: { control: false },
    onChange: { control: false },
    tabsData: { control: false },
    useHash: argsBooleanType(),
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Main Story for the Tabs component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    tabsData: animalCrossingData,
    defaultIndex: 0,
    id: "tabs-id",
    onChange: undefined,
    useHash: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=36835%3A26464",
    },
    jest: ["Tabs.test.tsx"],
  },
};

// The following are additional Tabs example Stories.
const onChange = (value) => {
  window.alert(`Tab index selected was ${value}`);
};

export const ExtendedTabSetExample: Story = {
  render: () => <Tabs tabsData={[...animalCrossingData, ...extraACData]} />,
};

export const CallbackEventFunction: Story = {
  render: () => <Tabs tabsData={animalCrossingData} onChange={onChange} />,
};

export const URLHashOption: Story = {
  render: () => <Tabs tabsData={animalCrossingData} useHash={true} />,
};

export const ChildrenComponents: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Tom Nook</Tab>
        <Tab>Isabelle</Tab>
        <Tab>K.K. Slider</Tab>
        <Tab>Mr. Resetti</Tab>
        <Tab>Zucker</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>
            Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional
            character in the Animal Crossing series who operates the village
            store.
          </p>
        </TabPanel>
        <TabPanel>
          Isabelle, known as Shizue in Japan, is a fictional character from the
          Animal Crossing series of video games. She is a kindly Shih Tzu that
          debuted in the 2012 release Animal Crossing: New Leaf, where she
          serves as the secretary to the player character.
        </TabPanel>
        <TabPanel>
          <p>
            Totakeke, more commonly known as <b>K.K. Slider or K.K.</b>, is a
            fictional character within the Animal Crossing franchise. One of the
            franchise's most popular characters, he debuted in the title Animal
            Crossing, and has appeared in every installment since.
          </p>
        </TabPanel>
        <TabPanel>
          <strong>Mr. Resetti</strong>, full name Sonny Resetti, is a fictional
          character from the Animal Crossing series of video games by Nintendo.
          His first appearance was in the Nintendo 64 game Dōbutsu no Mori,
          released in Europe and North America on the GameCube as Animal
          Crossing.
        </TabPanel>
        <TabPanel>
          <strong>Zucker</strong> is a lazy octopus villager who first appeared
          in New Leaf. His Japanese name and general appearance refers to the
          Japanese snack takoyaki, which is a fried ball of dough commonly
          filled with minced octopus. His catchphrase is a reference to how he
          is an underwater animal. He has the same initial phrase as Bertha. He
          has the nature hobby.
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
