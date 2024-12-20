import { chakra, ChakraComponent, Stack } from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { LayoutTypes } from "../../helpers/types";
import {
  MultiSelectWidths,
  SelectedItems as MultiSelectItems,
} from "../MultiSelect/MultiSelect";
import useNYPLBreakpoints from "../../hooks/useNYPLBreakpoints";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import Heading, { HeadingSizes } from "../Heading/Heading";

export type FilterBarItemsType =
  | (boolean | number | number[] | string | string[] | MultiSelectItems)[];

export interface FilterBarInlineProps {
  /** The className of the FilterBarInline. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Optional string value used to set the text for a `Heading` component, or
   * a DS Heading component that can be passed in.
   */
  heading?: string | JSX.Element;
  /** Renders the layout of the FilterBarInline child components in a row or column. */
  layout?: LayoutTypes;
  /** Function for the global `Clear Filters` button. If passed the `Clear Filters` button will render. */
  onClear?: () => void;
  /** Function for the global `Apply Filters` button. If passed the `Apply Filters` button will render. */
  onSubmit?: () => void;
  /** Render prop function used to render child components with updated props. */
  renderChildren: ({
    closeOnBlur,
    isBlockElement,
    layout,
    width,
  }: {
    closeOnBlur?: boolean;
    isBlockElement?: boolean;
    layout?: LayoutTypes;
    width?: MultiSelectWidths;
  }) => React.ReactNode;
  /** The selected items state (items that were checked by user). */
  selectedItems?: FilterBarItemsType;
}

export const FilterBarInline: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<FilterBarInlineProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  FilterBarInlineProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<FilterBarInlineProps>>(
    (props, ref?) => {
      const {
        children,
        className,
        id,
        heading,
        layout = "row",
        onClear,
        onSubmit,
        selectedItems,
        renderChildren,
        ...rest
      } = props;

      const { isLargerThanMobile } = useNYPLBreakpoints();
      const finalWidth = !isLargerThanMobile
        ? "full"
        : layout === "row"
        ? "fitContent"
        : "full";

      const generalHeadingProps = {
        size: "heading5" as HeadingSizes,
      };
      // If `heading is a string, then we want the default heading,
      // otherwise, use whatever the user passed in.
      const finalHeading = heading ? (
        typeof heading === "string" ? (
          <Heading level="h2" text={heading} {...generalHeadingProps} />
        ) : (
          React.cloneElement(heading, generalHeadingProps)
        )
      ) : null;

      return (
        <ComponentWrapper
          className={className}
          id={`filter-bar-inline-${id}`}
          headingText={finalHeading}
          ref={ref}
          {...rest}
        >
          <Stack
            alignItems={{
              base: null,
              md: layout === "row" ? "flex-end" : null,
            }}
            columnGap="l"
            direction={{ base: "column", md: layout }}
            rowGap="s"
            spacing="0"
            wrap={{
              base: null,
              md: layout === "row" ? "wrap" : null,
            }}
          >
            {renderChildren({
              isBlockElement: layout === "column",
              closeOnBlur: layout === "row",
              layout: layout,
              width: finalWidth,
            })}
            {(onSubmit || onClear) && (
              <ButtonGroup
                layout={layout}
                buttonWidth={layout === "row" ? "default" : "full"}
              >
                {onSubmit && (
                  <Button
                    buttonType="primary"
                    id={`${id}-submit-all-button`}
                    onClick={onSubmit}
                  >
                    Apply filters
                  </Button>
                )}
                {onClear && (
                  <Button
                    buttonType="text"
                    id={`${id}-clear-all-button`}
                    onClick={onClear}
                    textAlign="center"
                  >
                    Clear all filters
                  </Button>
                )}
              </ButtonGroup>
            )}
          </Stack>
        </ComponentWrapper>
      );
    }
  )
);

export default FilterBarInline;
