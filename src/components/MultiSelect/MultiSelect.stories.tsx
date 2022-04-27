import React, { useState } from "react";
import MultiSelect, { MultiSelectProps } from "./MultiSelect";
import { MultiSelectItem } from "./MultiSelectTypes";
import { Story } from "@storybook/react/types-6-0";

// @TODO export this, so FilterBar story can use it.
const items = [
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
    children: [
      {
        id: "fashion",
        name: "Fashion",
      },
      {
        id: "ux",
        name: "User Experience",
      },
    ],
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

export const MultiSelectStory: Story<MultiSelectProps> = (args) => {
  const [selectedItems, setSelectedItems] = useState({});

  function handleChange(multiSelectId: string, itemId: string) {
    let itemIds;
    // Check if the id already exists in the state
    if (selectedItems[multiSelectId] !== undefined) {
      let itemIdExists =
        selectedItems[multiSelectId].items.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[multiSelectId].items.slice();
      // If id exists, remove it from the array.
      if (itemIdExists) {
        itemIds = itemIds.filter((id) => id !== itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    setSelectedItems({
      ...selectedItems,
      [multiSelectId]: {
        items: itemIds,
      },
    });
  }

  return (
    <>
      <MultiSelect
        {...args}
        //variant="listbox"
        items={items}
        selectedItems={selectedItems}
        onChange={(selectedItem) => {
          handleChange(args.id, selectedItem.id);
        }}
        onClear={() => setSelectedItems({})}
      />
      <div>
        If you already have props as an object, and you want to pass it in JSX,
        you can use ... as a “spread” operator to pass the whole props object.
        These two components are equivalent:
      </div>
    </>
  );
};

export const MultiSelectDialogStory: Story<MultiSelectProps> = (args) => {
  const [selectedItems, setSelectedItems] = useState({});

  function handleChange(multiSelectId: string, itemId: string) {
    let itemIds;
    // Check if the id already exists in the state
    if (selectedItems[multiSelectId] !== undefined) {
      let itemIdExists =
        selectedItems[multiSelectId].items.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[multiSelectId].items.slice();
      // If termId exists, remove it from the array.
      if (itemIdExists) {
        itemIds = itemIds.filter((id) => id !== itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    setSelectedItems({
      ...selectedItems,
      [multiSelectId]: {
        items: itemIds,
      },
    });
  }

  function handleMixedStateChange(parentId: string) {
    const multiSelectId = args.id;
    // Build an array of child items.
    let childItems = [];
    items.map((item) => {
      if (item.id === parentId) {
        item.children.map((childItem: MultiSelectItem) => {
          childItems.push(childItem.id);
        });
      }
    });

    let newItems;
    // Some selected items for group already exist in state.
    if (selectedItems[multiSelectId] !== undefined) {
      //
      if (
        childItems.every((childItem) =>
          selectedItems[multiSelectId].items.includes(childItem)
        )
      ) {
        newItems = selectedItems[multiSelectId].items.filter(
          (stateItem) => !childItems.includes(stateItem)
        );
      } else {
        // Merge all child items.
        newItems = [...childItems, ...selectedItems[multiSelectId].items];
      }
    } else {
      newItems = childItems;
    }
    setSelectedItems({
      ...selectedItems,
      [multiSelectId]: {
        items: newItems,
      },
    });
  }

  return (
    <>
      <MultiSelect
        {...args}
        variant="dialog"
        items={items}
        defaultIsOpen={false}
        selectedItems={selectedItems}
        onChange={(e) => handleChange(args.id, e.target.id)}
        onMixedStateChange={(e) => {
          handleMixedStateChange(e.target.id);
        }}
        onApply={() => {
          console.log("onApply from consuming!");
        }}
        onClear={() => {
          setSelectedItems({});
        }}
      />
      <div>
        If you already have props as an object, and you want to pass it in JSX,
        you can use ... as a “spread” operator to pass the whole props object.
        These two components are equivalent:
      </div>
    </>
  );
};
