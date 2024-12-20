import { VStack } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import MultiSelect, {
  multiSelectWidthsArray,
} from "../MultiSelect/MultiSelect";
import MultiSelectGroup from "./MultiSelectGroup";
import useMultiSelect from "../../hooks/useMultiSelect";
import { layoutTypesArray } from "../../helpers/types";

const multiSelectItems = [
  {
    id: "colors",
    name: "Colors",
    items: [
      { id: "red", name: "Red" },
      { id: "blue", name: "Blue" },
      { id: "yellow", name: "Yellow" },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    items: [
      { id: "cat", name: "Cat" },
      {
        id: "dog",
        name: "Dog",
        children: [
          { id: "corgy", name: "Corgy" },
          { id: "german-sheperd", name: "German Sheperd" },
          { id: "afghan-hound", name: "Afghan Hound" },
        ],
      },
      { id: "rat", name: "Rat" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    items: [
      { id: "hammer", name: "Hammer" },
      {
        id: "skrewdriver",
        name: "Skrewdriver",
        children: [
          { id: "slottet", name: "Slotted Skrewdriver" },
          { id: "phillips", name: "Phillips Skrewdriver" },
          { id: "allen", name: "Allen Skrewdriver" },
        ],
      },
      { id: "whisk", name: "Whisk" },
    ],
  },
];

const defaultItemsVisible = 5;

const MultiSelectGroupStory = (args) => {
  const { onChange, onMixedStateChange, onClear, selectedItems } =
    useMultiSelect();

  // Hack to get storybook's action tab to log state change when selectedItems state changes.
  const [actionName, setActionName] = useState("");

  useEffect(() => {
    if (Object.keys(selectedItems).length !== 0) {
      action(actionName)(selectedItems);
    }
    if (actionName === "onClear") {
      action(actionName)(selectedItems);
    }
  }, [actionName, selectedItems]);

  return (
    <MultiSelectGroup
      {...args}
      renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
        return (
          multiSelectItems &&
          multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              id={multiSelect.id}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={multiSelect.id}
              onChange={(e) => {
                onChange(e.target.id, multiSelect.id);
                setActionName("onChange");
              }}
              onMixedStateChange={(e) => {
                onMixedStateChange(
                  e.target.id,
                  multiSelect.id,
                  multiSelect.items
                );
                setActionName("onMixedStateChange");
              }}
              onClear={() => {
                onClear(multiSelect.id);
                setActionName("onClear");
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ))
        );
      }}
    />
  );
};

const MultiSelectGroupWithCloseOnBlurStory = (args) => {
  const { onChange, onMixedStateChange, onClear, selectedItems } =
    useMultiSelect();

  // Hack to get storybook's action tab to log state change when selectedItems state changes.
  const [actionName, setActionName] = useState("");

  useEffect(() => {
    if (Object.keys(selectedItems).length !== 0) {
      action(actionName)(selectedItems);
    }
    if (actionName === "onClear") {
      action(actionName)(selectedItems);
    }
  }, [actionName, selectedItems]);

  return (
    <MultiSelectGroup
      {...args}
      renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
        return (
          multiSelectItems &&
          multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              closeOnBlur
              defaultItemsVisible={defaultItemsVisible}
              id={multiSelect.id}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={multiSelect.id}
              onChange={(e) => {
                onChange(e.target.id, multiSelect.id);
                setActionName("onChange");
              }}
              onMixedStateChange={(e) => {
                onMixedStateChange(
                  e.target.id,
                  multiSelect.id,
                  multiSelect.items
                );
                setActionName("onMixedStateChange");
              }}
              onClear={() => {
                onClear(multiSelect.id);
                setActionName("onClear");
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ))
        );
      }}
    />
  );
};

const MultiSelectGroupLayoutStory = () => {
  const { onChange, onMixedStateChange, onClear, selectedItems } =
    useMultiSelect();

  return (
    <VStack align="stretch" spacing="s">
      <MultiSelectGroup
        id="row"
        labelText="Row (default) & multiSelectWidth='fitContent'"
        showLabel
        layout="row"
        multiSelectWidth="fitContent"
        renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
          return multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              id={multiSelect.id}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={multiSelect.id}
              onChange={(e) => {
                onChange(e.target.id, multiSelect.id);
              }}
              onMixedStateChange={(e) => {
                onMixedStateChange(
                  e.target.id,
                  multiSelect.id,
                  multiSelect.items
                );
              }}
              onClear={() => {
                onClear(multiSelect.id);
                action("onClear")({});
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ));
        }}
      />
      <MultiSelectGroup
        showLabel={true}
        id="column"
        layout="column"
        labelText="Column & multiSelectWidth='fitContent'"
        multiSelectWidth="fitContent"
        renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
          return multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              id={`${multiSelect.id}-1`}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={`${multiSelect.id}-1`}
              onChange={(e) => {
                onChange(e.target.id, `${multiSelect.id}-1`);
              }}
              onMixedStateChange={(e) => {
                onMixedStateChange(
                  e.target.id,
                  `${multiSelect.id}-1`,
                  multiSelect.items
                );
              }}
              onClear={() => {
                onClear(`${multiSelect.id}-1`);
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ));
        }}
      />
      <MultiSelectGroup
        showLabel={true}
        id="row-full"
        layout="row"
        labelText="Row (default) & multiSelectWidth='full' (default)"
        multiSelectWidth="full"
        renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
          return multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              id={`${multiSelect.id}-2`}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={`${multiSelect.id}-2`}
              onChange={(e) => {
                onChange(e.target.id, `${multiSelect.id}-2`);
              }}
              onMixedStateChange={(e) => {
                onMixedStateChange(
                  e.target.id,
                  `${multiSelect.id}-2`,
                  multiSelect.items
                );
              }}
              onClear={() => {
                onClear(`${multiSelect.id}-2`);
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ));
        }}
      />
      <MultiSelectGroup
        showLabel={true}
        id="column-full"
        layout="column"
        labelText="Column & multiSelectWidth='full' (default)"
        multiSelectWidth="full"
        renderMultiSelect={({ isBlockElement, multiSelectWidth }) => {
          return multiSelectItems.map((multiSelect) => (
            <MultiSelect
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              id={`${multiSelect.id}-3`}
              isBlockElement={isBlockElement}
              items={multiSelect.items}
              key={`${multiSelect.id}-3`}
              onChange={(e) => {
                onChange(e.target.id, `${multiSelect.id}-3`);
              }}
              onMixedStateChange={(e) => {
                return onMixedStateChange(
                  e.target.id,
                  `${multiSelect.id}-3`,
                  multiSelect.items
                );
              }}
              onClear={() => {
                onClear(`${multiSelect.id}-3`);
              }}
              selectedItems={selectedItems}
              width={multiSelectWidth}
            />
          ));
        }}
      />
    </VStack>
  );
};

const meta: Meta<typeof MultiSelectGroup> = {
  title: "Components/Form Elements/MultiSelectGroup",
  component: MultiSelectGroup,
  argTypes: {
    className: { control: false },
    id: { control: false },
    layout: {
      control: { type: "radio" },
      options: layoutTypesArray,
      table: { defaultValue: { summary: "row" } },
    },
    multiSelectWidth: {
      control: { type: "radio" },
      options: multiSelectWidthsArray,
      table: { defaultValue: { summary: "default" } },
    },
    showLabel: {
      table: { defaultValue: { summary: "true" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectGroup>;

/**
 * Main Stories for the MultiSelectGroup component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    id: "multiselect-group",
    labelText: "Label Text",
    layout: "row",
    multiSelectWidth: "fitContent",
    showLabel: true,
  },
  render: (args) => <MultiSelectGroupStory {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=43593%3A24611",
    },
    jest: ["MultiSelectGroup.test.tsx"],
  },
};

export const closeOnBlurState: Story = {
  render: () => (
    <MultiSelectGroupWithCloseOnBlurStory
      id="multiselect-group"
      labelText="Label Text"
    />
  ),
};

// The following are additional MultiSelectGroup example Stories.
export const LayoutPatterns: Story = {
  render: (_args) => <MultiSelectGroupLayoutStory />,
};
