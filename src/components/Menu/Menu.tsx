import {
  Box,
  chakra,
  ChakraComponent,
  Flex,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import Icon, { IconNames } from "../Icons/Icon";
import Image from "../Image/Image";
import React, { forwardRef, useRef, useState } from "react";
import { SectionTypes } from "../../helpers/types";

export interface MenuProps {
  /** Optional CSS class name that will be added to the component's parent element. */
  className?: string;
  /** Optional ID string that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Optional string used to identify and highlight an item when the menu opens. The value should
   * match the id associated with one of the items. */
  selectedItem?: string;
  /** Optional boolean value, toggles whether the label of the menu will display the text of the selected item. labelText is required for the aria-label either way. */
  showSelectionAsLabel?: boolean;
  /** Used to set the highlight color for the current item.  The values correspond with the NYPL section colors */
  highlightColor?: SectionTypes;
  /** Required string used to set the label text for the button element. If showLabel is false,
   * this value is instead used to set an aria-label attribute on the button.  The labelText prop is
   * required for accessibility compliance. */
  labelText: string;
  /** Optional string used to set the placement of the list element. */
  listAlignment?: "left" | "right";
  /** Required array of data objects used to populate the items rendered in the list.
   * The order of the array elements will determine the order of the items in the list.*/
  listItemsData: ListItemsData[];
  /** Optional boolean value used to toggle the visibility of a border around the button element.*/
  showBorder?: boolean;
  /** Optional boolean value used to toggle the visibility of the label text for the button element.
   * If false, this value will be used to set an aria-label attribute on the button element.  */
  showLabel?: boolean;
}

/**Type for the icons/images displayed inline with menu items. */
interface Media {
  type: string;
  name?: IconNames;
  src?: string;
  alt?: string;
}

/** The three types of menu items: */
export interface ActionItem {
  type: "action";
  label: string;
  id: string;
  media?: Media | null;
  onClick: (id: string) => void;
}

export interface GroupItem {
  type: "group";
  id: string;
  label: string;
  children: ListItemsData[];
}

export interface DividerItem {
  type: "divider";
  id: string;
}

/** Menu items can be one of the three types: */
export type ListItemsData = ActionItem | GroupItem | DividerItem;

export const Menu: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<MenuProps> & React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<MenuProps>
> = chakra(
  forwardRef<HTMLDivElement, MenuProps>(
    (
      {
        className,
        id,
        labelText,
        listAlignment = "left",
        selectedItem,
        showSelectionAsLabel,
        highlightColor = "blogs",
        showBorder = true,
        showLabel = true,
        listItemsData,
        ...rest
      },
      ref?
    ) => {
      const styles = useMultiStyleConfig("Menu", {
        highlightColor,
        showBorder,
        showLabel,
      });

      /**  Handle selection alongside custom onClick behavior. */
      const initialItem = listItemsData?.find(
        (item) => item.id === selectedItem
      ) as ActionItem | GroupItem;
      const [selected, setSelected] = useState<ActionItem | GroupItem | null>(
        initialItem || null
      );
      const handleSelect = (id, customHandler) => {
        if (customHandler) {
          customHandler(id);
        }
        const selectedItem = listItemsData?.find((item) => item.id === id) as
          | ActionItem
          | GroupItem;
        setSelected(selectedItem);
      };

      /**  Check props. */
      if (!listItemsData) {
        console.warn(
          "NYPL Reservoir Menu: The `listItemsData` prop is required."
        );
      } else if (
        selectedItem &&
        !listItemsData.map((item) => item.id).includes(selected?.id)
      ) {
        console.warn(
          "NYPL Reservoir Menu: The `selectedItem` prop does not match any of the menu items."
        );
      } else if (
        new Set(listItemsData.map((item) => item.id)).size !==
        listItemsData.length
      ) {
        console.warn(
          "NYPL Reservoir Menu: The `id` values for the list items are not all unique."
        );
      } else if (
        listItemsData.some(
          (item) =>
            !item.type ||
            !(
              item.type === "group" ||
              item.type === "action" ||
              item.type === "divider"
            )
        )
      ) {
        console.warn(
          "NYPL Reservoir Menu: A `type` value is required for each list item."
        );
      } else if (listItemsData.some((item) => !item.id || item.id === "")) {
        console.warn(
          "NYPL Reservoir Menu: An `id` value is required for each list item."
        );
      } else if (
        listItemsData.some(
          (item) =>
            (item.type === "action" || item.type === "group") &&
            (!item.label || item.label.trim() === "")
        )
      ) {
        console.warn(
          "NYPL Reservoir Menu: A `label` value is required for all list actions and groups."
        );
      } else if (
        listItemsData.some((item) => item.type === "action" && !item.onClick)
      ) {
        console.warn(
          "NYPL Reservoir Menu: An `onClick` function is required for all actions."
        );
      } else if (
        listItemsData.some(
          (item) =>
            item.type === "group" &&
            (!item.children || item.children.length === 0)
        )
      ) {
        console.warn(
          "NYPL Reservoir Menu: A `children` array is required for all list groups."
        );
      }

      /** Helper function that renders either an Image or an Icon for a menu item. */
      const renderMedia = (media: Media | null) => {
        if (media) {
          if (media.type === "icon") {
            return <Icon name={media.name} size="medium" />;
          } else {
            return (
              <Image
                src={media.src}
                alt={media.alt}
                size="xxxsmall"
                sx={{ borderRadius: "24px" }}
              />
            );
          }
        }
        return null;
      };

      /** Renders the trigger button for the Menu List to open or close. */
      const getButton = (isOpen) => (
        <MenuButton
          sx={styles.menuButton}
          aria-label={selected ? `${labelText}: ${selected.label}` : labelText}
          backgroundColor={isOpen ? "ui.link.primary-05 !important" : "unset"}
        >
          {showLabel && (
            <>
              <Box as="span" sx={{ paddingRight: "xs" }}>
                {showSelectionAsLabel
                  ? selected
                    ? selected.label
                    : labelText
                  : labelText}
              </Box>
              <Icon
                name="arrow"
                iconRotation={isOpen ? "rotate180" : "rotate0"}
                size="xsmall"
              />
            </>
          )}
          {!showLabel && <Icon name="navigationMoreVert" size="large" />}
        </MenuButton>
      );

      /** Renders all Menu Items to be passed to the Menu List. Flattened into a reduce() so that
       Groups of items display together. */
      const getMenuElements = (data: ListItemsData[] = []) =>
        data.reduce((lst, item) => {
          if (item.type === "divider") {
            // If item is a divider
            return [
              ...lst,
              <MenuDivider sx={styles.dividerItem} key={item.id} />,
            ];
          }
          if (item.type === "group") {
            // If item is a group: adds group label then passes children
            return [
              ...lst,
              <MenuGroup
                key={item.id}
                sx={styles.groupItem}
                title={item.label}
              />,
              ...getMenuElements(item.children),
            ];
          }
          // If item is an action item
          const isSelected = selected ? selected.id === item.id : false;
          const menuItem = (
            <MenuItem
              key={item.id}
              isFocusable={true}
              data-testid={isSelected ? "selected-item" : ""}
              onClick={() => handleSelect(item.id, item.onClick)}
              ref={isSelected ? initialRef : null}
              sx={{
                ...styles.actionItem,
                ...(isSelected && styles.selected),
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {renderMedia(item.media)}
                <span>{item.label}</span>
              </Box>
            </MenuItem>
          );

          return [...lst, menuItem];
        }, []);

      const initialRef = useRef();
      return (
        <Box ref={ref}>
          <ChakraMenu
            id={id}
            initialFocusRef={selected ? initialRef : null}
            {...rest}
          >
            {({ isOpen }) => (
              <Flex
                flexDirection={
                  listAlignment === "right" ? "row-reverse" : "row"
                }
              >
                {getButton(isOpen)}
                <MenuList data-testid="menuList" sx={styles.menuList}>
                  {getMenuElements(listItemsData)}
                </MenuList>
              </Flex>
            )}
          </ChakraMenu>
        </Box>
      );
    }
  )
);
export default Menu;
