import React, { useState, forwardRef, useRef } from "react";
import {
  Box,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import Accordion from "./../Accordion/Accordion";
import Button from "./../Button/Button";
import CheckboxGroup from "./../CheckboxGroup/CheckboxGroup";
import Checkbox from "./../Checkbox/Checkbox";
import MultiSelectItemsCountButton from "./MultiSelectItemsCountButton";
import TextInput from "../TextInput/TextInput";

export interface MultiSelectItem {
  id: string;
  name: string;
  isDisabled?: boolean;
  children?: MultiSelectItem[];
}
export const multiSelectWidthsArray = ["fitContent", "full"] as const;
export type MultiSelectWidths = typeof multiSelectWidthsArray[number];
export const multiSelectListOverflowArray = ["scroll", "expand"] as const;
export type MultiSelectListOverflowTypes =
  typeof multiSelectListOverflowArray[number];
export interface SelectedItems {
  [name: string]: { items: string[] };
}

export interface MultiSelectProps {
  /** The button text rendered within the MultiSelect. */
  buttonText: string;
  /** The number of items that will be visible in the list when the component first loads. */
  defaultItemsVisible?: number;
  /** The action to perform for clear/reset button of MultiSelect. */
  onClear?: () => void;
  /** The action to perform on the checkbox's onChange function. */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The action to perform for a mixed state checkbox (parent checkbox). */
  onMixedStateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** An ID string that other components can cross reference for accessibility purposes. */
  id: string;
  /** Boolean value used to control how the MultiSelect component will render within the page
   * and interact with other DOM elements.
   * The default value is false. */
  isBlockElement?: boolean;
  /** Set the default open or closed state of the Multiselect. */
  isDefaultOpen?: boolean;
  /** Boolean value used to enable the component's search functionality
   * The default value is false. */
  isSearchable?: boolean;
  /** The items to be rendered in the Multiselect as checkbox options. */
  items: MultiSelectItem[];
  /** listOverflow is a property indicating how the list should handle overflow, with options limited to either "scroll" or "expand." */
  listOverflow?: MultiSelectListOverflowTypes;
  /** The selected items state (items that were checked by user). */
  selectedItems: SelectedItems;
  /** Value used to set the width for the MultiSelect component. */
  width?: MultiSelectWidths;
}

/**
  The MultiSelect component is a customizable form input that supports multiple configurations,
  including search functionality, checkbox options, and hierarchical structure,
  with a parent checkbox toggling all children and dynamic styling through Chakra UI.
*/

export const MultiSelect: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<MultiSelectProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<MultiSelectProps>
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<MultiSelectProps>>(
    (props, _ref?) => {
      const {
        id,
        isBlockElement = false,
        isDefaultOpen = false,
        isSearchable = false,
        defaultItemsVisible = 5,
        items,
        listOverflow = "scroll",
        buttonText,
        onChange,
        onClear,
        onMixedStateChange,
        selectedItems,
        width = "full",
        ...rest
      } = props;

      // Create a ref to hold a reference to the accordian button, enabling us to programmatically focus it.
      const accordianButtonRef: React.RefObject<HTMLDivElement> =
        useRef<HTMLDivElement>();

      const MINIMUM_ITEMS_LIST_HEIGHT = "215px";
      const MAXIMUM_ITEMS_LIST_HEIGHT = "270px";
      const listHeight =
        listOverflow === "expand"
          ? "unset"
          : isSearchable
          ? MAXIMUM_ITEMS_LIST_HEIGHT
          : MINIMUM_ITEMS_LIST_HEIGHT;

      const isOverflowExpand =
        items.length > defaultItemsVisible && listOverflow === "expand";
      const defaultItemsList = isOverflowExpand
        ? items.slice(0, defaultItemsVisible)
        : items;
      const [itemsList, setItemsList] = useState(defaultItemsList);
      const [isExpandable, setIsExpandable] = useState(true);

      const selectedItemsCount: number = selectedItems[id]?.items.length || 0;

      const selectedItemsString = `item${selectedItemsCount === 1 ? "" : "s"}`;
      const ariaLabelValue = `${buttonText}, ${selectedItemsCount} ${selectedItemsString} currently selected`;

      // Get the styles for the component
      const styles = useMultiStyleConfig("MultiSelect", {
        isBlockElement,
        width,
      });

      const isChecked = (multiSelectId: string, itemId: string): boolean => {
        if (selectedItems[multiSelectId]) {
          return !!selectedItems[multiSelectId].items.find(
            (selectedItemId: string) => selectedItemId === itemId
          );
        }
        return false;
      };

      // isAllChecked defines the isChecked status of parent checkboxes. If all child items are selected, it will turn true, otherwise it returns false.
      // This prop is only passed to parent options.
      const isAllChecked = (
        multiSelectId: string,
        item: MultiSelectItem
      ): boolean => {
        let childIds: string[] = item.children.map((childItem) => childItem.id);
        if (selectedItems[multiSelectId] !== undefined) {
          return childIds.every(
            (childItem) =>
              selectedItems[multiSelectId].items.includes(childItem) &&
              !item.children.find((c) => c.id === childItem)?.isDisabled
          );
        }
        return false;
      };

      // isInteterminate will return true if some child items of the parent item are selected. This prop is only passed to parent options.
      const isIndeterminate = (
        multiSelectId: string,
        item: MultiSelectItem
      ): boolean => {
        let childIds: string[] = item.children.map((childItem) => childItem.id);
        if (
          selectedItems[multiSelectId] !== undefined &&
          childIds.length > 0 &&
          childIds.some(
            (childItem) =>
              selectedItems[multiSelectId].items.includes(childItem) &&
              !item.children.find((c) => c.id === childItem)?.isDisabled
          )
        ) {
          return !isAllChecked(multiSelectId, item);
        }
        return false;
      };

      const isAllDisabled = (item: MultiSelectItem): boolean => {
        // Check if all child items are disabled, and update the parent accordingly
        if (item.children.every((childItem) => childItem.isDisabled)) {
          item.isDisabled = true;
        } else {
          item.isDisabled = false;
        }
        // Return the updated isDisabled state for the parent item
        return item.isDisabled;
      };

      // Additional components for isSearchable
      const NoSearchResults = (): JSX.Element => {
        return (
          <Box id="items-not-found-text-id" marginTop="xs">
            No options found
          </Box>
        );
      };

      const onChangeSearch = (event) => {
        const value = event.target.value.trim().toLowerCase();
        if (!value) {
          isExpandable ? setItemsList(defaultItemsList) : setItemsList(items);
          return;
        }

        const filteredItems = items.filter((item) => {
          if (item.children) {
            if (item.name.toLowerCase().includes(value)) {
              return true;
            }

            return item.children.some((childItem) =>
              childItem.name.toLowerCase().includes(value)
            );
          }

          return item.name.toLowerCase().includes(value);
        });

        setItemsList(filteredItems);
      };
      /** If the TextInput is cleard using the "x" button,
       * display the default options list depending on the isExpandable boolean
       * (isExpandable is taking an account the listOverflow type and the state of
       * the ExpandToggleButton if applicable)
       */

      const clearSearchKeyword = () => {
        isExpandable ? setItemsList(defaultItemsList) : setItemsList(items);
      };

      /** Toggle for listOverflow = "expand" */
      const toggleItemsList = () => {
        setIsExpandable((prevProp) => !prevProp);
      };

      React.useEffect(() => {
        setItemsList(isExpandable ? defaultItemsList : items);
      }, [isExpandable, defaultItemsList, items]);

      const ExpandToggleButton = (): JSX.Element => {
        return (
          <Button
            buttonType="text"
            fontSize="desktop.button.default"
            id="view-all-text-btn"
            onClick={toggleItemsList}
            __css={styles.viewAllButton}
          >
            {isExpandable ? "View all" : "View less"}
          </Button>
        );
      };

      /** Generate Checkbox components based on the provided MultiSelectItem. */
      const getMultiSelectCheckboxItem = (
        item: MultiSelectItem
      ): JSX.Element[] => {
        if (item.children) {
          return [
            <Checkbox
              id={item.id}
              key={item.id}
              labelText={item.name}
              name={item.name}
              {...(onMixedStateChange !== undefined
                ? {
                    isChecked: isAllChecked(id, item),
                    isIndeterminate: isIndeterminate(id, item),
                    onChange: onMixedStateChange,
                    isDisabled: isAllDisabled(item),
                  }
                : {
                    isChecked: isChecked(id, item.id),
                    isDisabled: isAllDisabled(item),
                    onChange: onChange,
                  })}
            />,
            ...item.children.map((childItem) => (
              <Checkbox
                key={childItem.id}
                marginInlineStart="0"
                __css={styles.menuChildren}
                id={childItem.id}
                labelText={childItem.name}
                name={childItem.name}
                isDisabled={childItem.isDisabled}
                isChecked={isChecked(id, childItem.id)}
                onChange={onChange}
              />
            )),
          ];
        } else {
          return [
            <Checkbox
              id={item.id}
              labelText={item.name}
              name={item.name}
              isDisabled={item.isDisabled}
              isChecked={isChecked(id, item.id)}
              onChange={onChange}
              key={item.id}
            />,
          ];
        }
      };

      /** Components for accordionData */
      const accordionLabel = (
        <Box
          __css={selectedItemsCount > 0 ? styles.buttonTextLabel : null}
          title={buttonText}
        >
          {buttonText}
        </Box>
      );

      const accordionPanel = (
        <Box>
          {isSearchable && (
            <TextInput
              id="multi-select-text-input-id"
              labelText={`Search ${buttonText}`}
              isClearable={true}
              isClearableCallback={clearSearchKeyword}
              placeholder={`Search for options`}
              onChange={onChangeSearch}
              showLabel={false}
              showRequiredLabel={false}
              type="text"
              __css={styles.menuSearchInputBox}
              marginBottom="s"
            />
          )}
          {itemsList.length === 0 ? (
            <NoSearchResults />
          ) : (
            <>
              <CheckboxGroup
                id="multi-select-checkbox-group"
                layout="column"
                isFullWidth
                isRequired={false}
                labelText="Multi select checkbox group label"
                showLabel={false}
                name="multi-select-checkbox-group"
              >
                {itemsList.map((item: MultiSelectItem) =>
                  getMultiSelectCheckboxItem(item)
                )}
              </CheckboxGroup>
              {isOverflowExpand && <ExpandToggleButton />}
            </>
          )}
        </Box>
      );

      return (
        <Box id={id} __css={styles.base} {...rest}>
          <Accordion
            accordionData={[
              {
                accordionType: "default",
                // Pass the ref for interaction with the accordion button.
                buttonInteractionRef: accordianButtonRef,
                label: accordionLabel,
                panel: accordionPanel,
              },
            ]}
            ariaLabel={ariaLabelValue}
            id="multi-select-accordion-id"
            isDefaultOpen={isDefaultOpen}
            isAlwaysRendered
            panelMaxHeight={listHeight}
            sx={{
              ...styles.accordionStyles,
            }}
          />
          {selectedItemsCount > 0 && (
            <MultiSelectItemsCountButton
              id={`ms-${id}-menu-button`}
              multiSelectId={id}
              multiSelectLabelText={buttonText}
              isOpen={isDefaultOpen}
              selectedItemsString={selectedItemsString}
              selectedItemsCount={selectedItemsCount}
              onClear={onClear}
              accordianButtonRef={accordianButtonRef}
            />
          )}
        </Box>
      );
    }
  ),
  // Pass all custom props to Chakra and override, for width prop.
  { shouldForwardProp: () => true }
);

export default MultiSelect;
