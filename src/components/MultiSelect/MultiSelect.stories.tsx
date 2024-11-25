import { HStack, Stack } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { userEvent, within, expect } from "@storybook/test";

import Heading from "../Heading/Heading";
import MultiSelect, {
  multiSelectWidthsArray,
  multiSelectListOverflowArray,
  MultiSelectProps,
} from "./MultiSelect";
import Text from "../Text/Text";
import useMultiSelect from "../../hooks/useMultiSelect";
import Button from "../Button/Button";

const withItems = [
  {
    id: "art",
    name: "Art",
  },
  {
    id: "architecture",
    name: "Architecture",
  },
  {
    id: "art_history",
    name: "Art History",
  },
  {
    id: "design",
    name: "Design",
  },
  {
    id: "business",
    name: "Business",
  },
  {
    id: "advertising",
    name: "Advertising",
  },
  {
    id: "government_and_law",
    name: "Government and Law",
  },
  {
    id: "civil_rights",
    name: "Civil Rights",
  },
  {
    id: "history",
    name: "History",
  },
  {
    id: "atlases",
    name: "Atlases",
  },
  {
    id: "cartography",
    name: "Cartography",
  },
  {
    id: "geology",
    name: "Geology",
  },
];

const withChildrenItems = [
  {
    id: "art",
    name: "Art",
  },
  {
    id: "architecture",
    name: "Architecture",
  },
  {
    id: "design",
    name: "Design",
    children: [
      {
        id: "fashion",
        name: "Fashion",
      },
      {
        id: "ux",
        name: "User Experience",
      },
      {
        id: "tecture",
        name: "Architecture",
      },
      {
        id: "home",
        name: "Home",
      },
    ],
  },
  {
    id: "business",
    name: "Business",
  },
  {
    id: "education",
    name: "Education",
  },
  {
    id: "games",
    name: "Games",
  },
];

const withDisabledItems = [
  {
    id: "art",
    name: "Art",
  },
  {
    id: "architecture",
    name: "Architecture",
    isDisabled: true,
  },
  {
    id: "art_history",
    name: "Art History",
  },
  {
    id: "design",
    name: "Design",
    children: [
      {
        id: "fashion",
        name: "Fashion",
        isDisabled: true,
      },
      {
        id: "ux",
        name: "User Experience",
        isDisabled: true,
      },
      {
        id: "tecture",
        name: "Architecture",
        isDisabled: false,
      },
      {
        id: "home",
        name: "Home",
        isDisabled: false,
      },
    ],
  },
  {
    id: "business",
    name: "Business",
  },
];

const withDisabledAllChildrenItems = [
  {
    id: "art",
    name: "Art",
  },
  {
    id: "architecture",
    name: "Architecture",
    isDisabled: true,
  },
  {
    id: "art_history",
    name: "Art History",
  },
  {
    id: "design",
    name: "Design",
    children: [
      {
        id: "fashion",
        name: "Fashion",
        isDisabled: true,
      },
      {
        id: "ux",
        name: "User Experience",
        isDisabled: true,
      },
      {
        id: "tecture",
        name: "Architecture",
        isDisabled: true,
      },
      {
        id: "home",
        name: "Home",
        isDisabled: true,
      },
    ],
  },
  {
    id: "business",
    name: "Business",
  },
];

const withItemCountItems = [
  {
    id: "art",
    name: "Art",
    itemCount: 7,
  },
  {
    id: "architecture",
    name: "Architecture",
    itemCount: 20,
  },
  {
    id: "design",
    name: "Design",
    children: [
      {
        id: "fashion",
        name: "Fashion",
        itemCount: 2,
      },
      {
        id: "ux",
        name: "User Experience",
        itemCount: 5,
      },
      {
        id: "tecture",
        name: "Architecture",
        itemCount: 3,
      },
      {
        id: "home",
        name: "Home",
        itemCount: 1,
      },
    ],
    itemCount: 11,
  },
  {
    id: "business",
    name: "Business",
    itemCount: 2,
  },
  {
    id: "education",
    name: "Education",
    itemCount: 15,
  },
  {
    id: "games",
    name: "Games",
    itemCount: 6,
  },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/Form Elements/MultiSelect",
  component: MultiSelect,
  argTypes: {
    defaultItemsVisible: {
      table: { defaultValue: { summary: "5" } },
    },
    id: {
      control: false,
    },
    closeOnBlur: {
      table: { defaultValue: { summary: "false" } },
    },
    isBlockElement: {
      table: { defaultValue: { summary: "false" } },
    },
    isDefaultOpen: {
      table: { defaultValue: { summary: "false" } },
    },
    isSearchable: {
      table: { defaultValue: { summary: "false" } },
    },
    listOverflow: {
      control: "radio",
      options: multiSelectListOverflowArray,
      table: { defaultValue: { summary: "scroll" } },
    },
    onChange: { control: false },
    onMixedStateChange: {
      control: false,
    },
    selectedItems: {
      control: false,
    },
    width: {
      description:
        'Value used to set the width for the MultiSelect component. \n\n `"full"` `"fitContent"`',
      control: "radio",
      options: multiSelectWidthsArray,
      table: { defaultValue: { summary: "full" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const withControls: Story = {
  args: {
    buttonText: "MultiSelect",
    id: "multi-select-id",
    closeOnBlur: true,
    isBlockElement: true,
    isDefaultOpen: false,
    isSearchable: true,
    items: withItems,
    listOverflow: "scroll",
    onChange: undefined,
    onMixedStateChange: undefined,
    selectedItems: undefined,
    width: "full",
  },
  render: (args) => <MultiSelectWithControlsStory {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=43593%3A24611",
    },
    jest: ["MultiSelect.test.tsx"],
  },
  play: async ({ canvasElement }) => {
    let multiselect = within(canvasElement).getByRole("button");
    await userEvent.click(multiselect);
    await expect(multiselect).toHaveAttribute("aria-expanded", "true");
    const checkbox1Label = within(canvasElement).getByText(/Architecture/);
    await userEvent.click(checkbox1Label);
    const checkbox2Label = within(canvasElement).getByText(/Cartography/);
    await userEvent.click(checkbox2Label);
    let clearMultiselect = within(canvasElement).getByTestId(
      "multi-select-close-button-testid"
    );
    await expect(clearMultiselect).toHaveAttribute(
      "aria-label",
      "remove 2 items selected from MultiSelect"
    );
    await userEvent.click(clearMultiselect);
    const searchBar = within(canvasElement).getAllByRole("textbox")[0];
    await userEvent.type(searchBar, "Design");
    await expect(checkbox2Label).not.toBeVisible();
    let checkboxes = within(canvasElement).getAllByRole("checkbox");
    expect(checkboxes.length).toBe(1);
    const checkbox3Label = within(canvasElement).getByText(/Design/);
    await expect(checkbox3Label).toBeVisible();
    await userEvent.click(checkbox3Label);
    const clearSearchBar = within(searchBar.parentElement).getAllByRole(
      "button"
    )[0];
    await userEvent.click(clearSearchBar);
    await userEvent.click(clearMultiselect);
    expect(checkboxes).not.toBeChecked;
    await userEvent.click(document.body);
    await expect(multiselect).toHaveAttribute("aria-expanded", "false");
  },
};

export const visibleListItems: Story = {
  render: () => (
    <>
      <Stack align="left" spacing="l">
        <div>
          <Heading level="h3" size="heading6" text="Default" />
          <MultiSelectStory
            id="multi-select-id-1"
            isBlockElement
            items={withItems}
            listOverflow="expand"
          />
        </div>
        <div>
          <Heading level="h3" size="heading6" text="Custom" />
          <MultiSelectStory
            defaultItemsVisible={8}
            id="multi-select-id-2"
            isBlockElement
            items={withItems}
            listOverflow="expand"
          />
        </div>
        <div>
          <Heading
            level="h3"
            size="heading6"
            text="Default with Nested Items"
          />
          <MultiSelectStory
            id="multi-select-id-3"
            isBlockElement
            items={withChildrenItems}
            listOverflow="expand"
          />
        </div>
      </Stack>
    </>
  ),
};

export const nestedListItems: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-4"
      isBlockElement
      isDefaultOpen={false}
      isSearchable={false}
      items={withChildrenItems}
    />
  ),
};

export const disabledListItems: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-5"
      isBlockElement
      isDefaultOpen={false}
      isSearchable={false}
      items={withDisabledItems}
    />
  ),
};

export const disabledListItemsAllChildren: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-6"
      isBlockElement
      isDefaultOpen={false}
      isSearchable={false}
      items={withDisabledAllChildrenItems}
    />
  ),
};

export const searchInputField: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-7"
      isBlockElement
      isDefaultOpen={false}
      isSearchable
      items={withChildrenItems}
    />
  ),
};

export const itemCountListItems: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-8"
      isBlockElement
      isDefaultOpen={false}
      isSearchable={false}
      items={withItemCountItems}
    />
  ),
};

export const isBlockElement: Story = {
  name: "isBlockElement",
  render: () => (
    <>
      <Stack align="left" spacing="l">
        <div>
          <Heading level="h3" size="heading6" text="true" />
          <Stack align="left" spacing="s">
            <Stack align="left">
              <MultiSelectStory
                id="multi-select-id-9"
                isBlockElement
                items={withItems}
                listOverflow="expand"
              />
              <MultiSelectStory
                id="multi-select-id-10"
                isBlockElement
                items={withItems}
                listOverflow="expand"
              />
            </Stack>
            <Text>
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
              consectetur. Donec sed odio dui.
            </Text>
          </Stack>
        </div>
        <div>
          <Heading
            level="h3"
            size="heading6"
            text="false (default configuration)"
          />
          <Stack align="left" spacing="s">
            <Stack direction="row" width="100%" alignContent="stretch">
              <MultiSelectStory id="multi-select-id-11" items={withItems} />
              <MultiSelectStory id="multi-select-id-12" items={withItems} />
              <MultiSelectStory id="multi-select-id-13" items={withItems} />
            </Stack>
            <Text>
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
              consectetur. Donec sed odio dui.
            </Text>
            <Text>
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
              consectetur. Donec sed odio dui.
            </Text>
            <Text>
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
              consectetur. Donec sed odio dui.
            </Text>
          </Stack>
        </div>
      </Stack>
    </>
  ),
};

export const width: Story = {
  render: () => (
    <>
      <Stack align="left" spacing="l">
        <div>
          <Heading
            level="h3"
            size="heading6"
            text="full (default configuration)"
          />
          <MultiSelectStory
            id="multi-select-id-14"
            isBlockElement
            items={withItems}
          />
        </div>
        <div>
          <Heading level="h3" size="heading6" text="fitContent" />
          <MultiSelectStory
            id="multi-select-id-15"
            isBlockElement
            items={withItems}
            width="fitContent"
          />
        </div>
      </Stack>
    </>
  ),
};

export const defaultOpenState: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-16"
      isBlockElement
      isDefaultOpen={true}
      items={withChildrenItems}
    />
  ),
};

export const closeOnBlurState: Story = {
  render: () => (
    <MultiSelectStory
      id="multi-select-id-17"
      closeOnBlur={true}
      isBlockElement
      items={withChildrenItems}
    />
  ),
};

export const InAGroup: Story = {
  render: () => <MultiSelectGroupStory items={withItems} />,
};

const MultiSelectWithControlsStory = (args) => {
  // Example with custom hook useMultiSelect.
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
  const multiSelectId = args.id;

  return (
    <MultiSelect
      {...args}
      selectedItems={selectedItems}
      onChange={(e) => {
        onChange(e.target.id, multiSelectId);
        setActionName("onChange");
      }}
      onMixedStateChange={(e) => {
        onMixedStateChange(e.target.id, multiSelectId, args.items);
        setActionName("onMixedStateChange");
      }}
      onClear={() => {
        onClear(multiSelectId);
        setActionName("onClear");
      }}
    />
  );
};

const MultiSelectStory = ({
  id,
  closeOnBlur = false,
  isBlockElement = false,
  isSearchable = false,
  isDefaultOpen,
  items,
  listOverflow = "scroll",
  width = "full",
  defaultItemsVisible = 5,
}: Partial<MultiSelectProps>) => {
  // Example with custom hook useMultiSelect.
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
    <MultiSelect
      buttonText="MultiSelect"
      closeOnBlur={closeOnBlur}
      defaultItemsVisible={defaultItemsVisible}
      id={id}
      isBlockElement={isBlockElement}
      isDefaultOpen={isDefaultOpen}
      isSearchable={isSearchable}
      items={items}
      listOverflow={listOverflow}
      selectedItems={selectedItems}
      width={width}
      onChange={(e) => {
        onChange(e.target.id, id);
        setActionName("onChange");
      }}
      onMixedStateChange={(e) => {
        onMixedStateChange(e.target.id, id, items);
        setActionName("onMixedStateChange");
      }}
      onClear={() => {
        onClear(id);
        setActionName("onClear");
      }}
    />
  );
};

// TODO: Replace with MultiSelectGroup once that component is done.
const MultiSelectGroupStory = ({ items }: Partial<MultiSelectProps>) => {
  // Example with custom hook useMultiSelect.
  const { onChange, onMixedStateChange, onClear, onClearAll, selectedItems } =
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
    <HStack minHeight="300px" alignItems="baseline">
      <MultiSelect
        buttonText="MultiSelect"
        id="ms-group-1"
        isBlockElement
        items={items}
        selectedItems={selectedItems}
        width="fitContent"
        onChange={(e) => {
          onChange(e.target.id, "ms-group-1");
          setActionName("onChange");
        }}
        onMixedStateChange={(e) => {
          onMixedStateChange(e.target.id, "ms-group-1", items);
          setActionName("onMixedStateChange");
        }}
        onClear={() => {
          onClear("ms-group-1");
          setActionName("onClear");
        }}
      />
      <MultiSelect
        buttonText="MultiSelect"
        id="ms-group-2"
        items={items}
        selectedItems={selectedItems}
        width="fitContent"
        onChange={(e) => {
          onChange(e.target.id, "ms-group-2");
          setActionName("onChange");
        }}
        onMixedStateChange={(e) => {
          onMixedStateChange(e.target.id, "ms-group-2", items);
          setActionName("onMixedStateChange");
        }}
        onClear={() => {
          onClear("ms-group-2");
          setActionName("onClear");
        }}
      />
      <MultiSelect
        buttonText="MultiSelect"
        id="ms-group-3"
        items={items}
        selectedItems={selectedItems}
        width="fitContent"
        onChange={(e) => {
          onChange(e.target.id, "ms-group-3");
          setActionName("onChange");
        }}
        onMixedStateChange={(e) => {
          onMixedStateChange(e.target.id, "ms-group-3", items);
          setActionName("onMixedStateChange");
        }}
        onClear={() => {
          onClear("ms-group-3");
          setActionName("onClear");
        }}
      />
      <Button id="clear-all" onClick={() => onClearAll()}>
        Clear All
      </Button>
    </HStack>
  );
};
