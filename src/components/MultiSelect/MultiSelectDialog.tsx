import React, { useEffect, useRef, useState, forwardRef } from "react";
import { chakra } from "@chakra-ui/react";
import {
  Box,
  ListItem,
  UnorderedList,
  useMultiStyleConfig,
  useOutsideClick,
  useMergeRefs,
} from "@chakra-ui/react";
// @TODO Add "@chakra-ui/focus-lock" to package.json dependencies ?
import FocusLock from "@chakra-ui/focus-lock";

import Button from "./../Button/Button";
import ButtonGroup from "./../ButtonGroup/ButtonGroup";
import Checkbox from "./../Checkbox/Checkbox";
import { MultiSelectItem, MultiSelectProps } from "./MultiSelect";
import MultiSelectMenuButton from "./MultiSelectMenuButton";
import useWindowSize from "./../../hooks/useWindowSize";

type MultiSelectDialogProps = Omit<MultiSelectProps, "onChange"> & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Forward ref collides with the ref created within this Component for registring
// ouside element clicks to close the list
// noticed closeing is not working reliably anyways...?

export const MultiSelectDialog = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<MultiSelectDialogProps>>(
    (props, ref) => {
      const {
        id,
        label,
        items,
        isDefaultOpen = false,
        onChange,
        onMixedStateChange,
        selectedItems,
        onApply,
        onClear,
        width = "default",
        isBlockElement = false,
        ...rest
      } = props;

      // Track the window size width, to set isMobile.
      const [isMobile, setIsMobile] = useState<boolean>();
      const windowDimensions = useWindowSize();
      useEffect(() => {
        if (windowDimensions.width >= 320) {
          setIsMobile(false);
        } else {
          setIsMobile(true);
        }
      }, [windowDimensions.width]);

      // Control the open or closed state of the MultiSelect.
      const [isOpen, setIsOpen] = useState(isDefaultOpen);

      const styles = useMultiStyleConfig("MultiSelect", {
        width,
        isBlockElement,
        isOpen,
      });

      // Create a ref that we add to the element for which we want to detect outside clicks.
      const internalRef = useRef<HTMLDivElement>();
      // Closes the MultiSelect if user clicks outside.
      useOutsideClick({
        ref: internalRef,
        handler: () => setIsOpen(false),
      });
      // Merge internal ref with the ref passed through the chakra function.
      const mergedRefs = useMergeRefs(internalRef, ref);

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
          return childIds.every((childItem) =>
            selectedItems[multiSelectId].items.includes(childItem)
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
          childIds.some((childItem) =>
            selectedItems[multiSelectId].items.includes(childItem)
          )
        ) {
          return !isAllChecked(multiSelectId, item);
        }
        return false;
      };

      return (
        <Box id={id} ref={mergedRefs} __css={styles} {...rest}>
          <FocusLock isDisabled={!isOpen}>
            <MultiSelectMenuButton
              id={`ms-${id}-menu-button`}
              multiSelectId={id}
              multiSelectLabel={label}
              isOpen={isOpen}
              selectedItems={selectedItems}
              onMenuToggle={() => {
                setIsOpen(!isOpen);
              }}
              onClear={onClear}
            />
            <Box
              role="dialog"
              __css={styles.menuContainer}
              {...(isOpen && { "aria-modal": true })}
              aria-labelledby={`ms-${id}-menu-button`}
            >
              <UnorderedList
                styleType="none"
                marginInlineStart="0"
                __css={styles.menu}
              >
                {isOpen &&
                  items.map((item: MultiSelectItem) => (
                    <ListItem key={item.id} py="xxs">
                      {item.children ? (
                        <>
                          <Checkbox
                            id={item.id}
                            labelText={item.name}
                            name={item.name}
                            // If onMixedStateChange is not passed as a prop, handle
                            // the parent checkbox as a regular checkbox using onChange
                            {...(onMixedStateChange !== undefined
                              ? {
                                  isChecked: isAllChecked(id, item),
                                  isIndeterminate: isIndeterminate(id, item),
                                  onChange: onMixedStateChange,
                                }
                              : {
                                  isChecked: isChecked(id, item.id),
                                  onChange,
                                })}
                          />
                          <UnorderedList
                            styleType="none"
                            marginInlineStart="0"
                            __css={styles.menuChildren}
                          >
                            {item.children.map((childItem) => {
                              return (
                                <ListItem key={childItem.id} py="xxs">
                                  <Checkbox
                                    id={childItem.id}
                                    labelText={childItem.name}
                                    name={childItem.name}
                                    isChecked={isChecked(id, childItem.id)}
                                    onChange={onChange}
                                  />
                                </ListItem>
                              );
                            })}
                          </UnorderedList>
                        </>
                      ) : (
                        <Checkbox
                          id={item.id}
                          labelText={item.name}
                          name={item.name}
                          isChecked={isChecked(id, item.id)}
                          onChange={onChange}
                        />
                      )}
                    </ListItem>
                  ))}
              </UnorderedList>
              {isOpen && !isMobile && (
                <ButtonGroup __css={styles.actionButtons}>
                  <Button
                    id={`ms-${id}-clear`}
                    buttonType="link"
                    type="button"
                    onClick={onClear}
                  >
                    Clear
                  </Button>
                  <Button
                    id={`ms-${id}-apply`}
                    buttonType="primary"
                    type="button"
                    onClick={() => {
                      // Close the multiselect on apply.
                      setIsOpen(false);
                      // Run the onApply prop function.
                      onApply();
                    }}
                  >
                    Apply
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </FocusLock>
        </Box>
      );
    }
  )
);

export default MultiSelectDialog;
