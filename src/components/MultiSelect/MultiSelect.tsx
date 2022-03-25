import React from "react";
import {
  Box,
  ListItem,
  UnorderedList,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import Checkbox from "./../Checkbox/Checkbox";
import {
  MultiSelectItem,
  SelectedItems,
  MultiSelectWidths,
} from "./MultiSelectTypes";
import MultiSelectMenuButton from "./MultiSelectMenuButton";
import { useSelect } from "downshift";

export interface MultiSelectProps {
  /** The id of the multiSelect. */
  id: string;
  /** The label of the multiSelect. */
  label: string;
  /** The items to be rendered in the multiselect as options. */
  items: MultiSelectItem[];
  /** The action to perform for downshift's onSelectedItemChange function. */
  onChange: (selectedItem: MultiSelectItem, id: string) => void;
  /** The selected items (items that were checked by user). */
  selectedItems: SelectedItems;
  /** The action to perform for clear/reset button of multiselect. */
  onClear?: () => void;
  /** Enum value used to set the width for the MultiSelect component. */
  width?: MultiSelectWidths;
}

function MultiSelect({
  id,
  label,
  items,
  onChange,
  selectedItems,
  onClear,
  width = MultiSelectWidths.Small,
}: MultiSelectProps) {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    // Downshift's internal state for handling keyboard and mouse events.
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // Keep menu open after selection.
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
    // @ts-ignore
    selectedItem: selectedItems,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem, id);
    },
  });

  const styles = useMultiStyleConfig("MultiSelect", { width });

  return (
    <Box id={id} __css={styles}>
      <MultiSelectMenuButton
        multiSelectId={id}
        label={label}
        isOpen={isOpen}
        selectedItems={selectedItems}
        {...getToggleButtonProps()}
        onClear={onClear}
      />
      <Box __css={styles.menuContainer} {...(!isOpen && { display: "none" })}>
        <UnorderedList
          styleType="none"
          marginInlineStart="0"
          {...getMenuProps()}
          // @FIX This prevents the menu from closing when checkbox or label is clicked.
          onClick={(e) => e.preventDefault()}
          __css={styles.menu}
        >
          {isOpen &&
            items.map((item: MultiSelectItem, index: number) => (
              <ListItem
                py={1}
                // @TODO fix this, we want to pass the key prop as part of ...getItemProps but get
                // error  Missing "key" prop for element in iterator  react/jsx-key
                key={item.id}
                {...getItemProps({
                  key: item.id,
                  item,
                  index,
                })}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
              >
                <Checkbox
                  id={item.id}
                  labelText={item.name}
                  showLabel={true}
                  name={item.name}
                  isChecked={
                    selectedItems[id]?.items.find(
                      // @ts-ignore
                      (selectedItemId: string) => selectedItemId === item.id
                    )
                      ? true
                      : false
                  }
                  onChange={() => null}
                />
              </ListItem>
            ))}
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default MultiSelect;
