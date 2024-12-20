import { Box, chakra, ChakraComponent, useStyleConfig } from "@chakra-ui/react";
import React, { forwardRef } from "react";

import { checkListChildrenError } from "../List/List";

export const textSizesArray = [
  "default",
  "body1",
  "body2",
  "caption",
  "tag",
  "mini",
] as const;
export type StyledListTextSizes = typeof textSizesArray[number];

export interface StyledListProps {
  /** Any child node passed to the component. */
  children?: React.ReactNode;
  /** A class name for the StyledList parent div. */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Data to render if `li` children elements are not passed. It must be an
   * array of strings or JSX elements. */
  listItems?: (string | JSX.Element)[];
  /** The style used to render the StyledList component. For its initial release,
   * there is only one variant style which is the default, "capped". */
  style?: "capped";
  /** The font size of the `li` elements. */
  textSize?: StyledListTextSizes;
}

/**
 * The `StyledList` component renders an HTML list with styles that do not
 * adhere to traditional numbered and bulleted list styles. Unlike
 * the `List` component, `StyledList` only renders an unordered list.
 */
export const StyledList: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<StyledListProps> &
      React.RefAttributes<HTMLDivElement & HTMLUListElement>
  >,
  React.PropsWithChildren<StyledListProps>
> = chakra(
  forwardRef<HTMLDivElement & HTMLUListElement, StyledListProps>(
    (props, ref?) => {
      const {
        children,
        className,
        id,
        listItems = [],
        style = "capped",
        textSize = "default",
      } = props;
      const styles = useStyleConfig("StyledList", {
        textSize,
        variant: style,
      });
      let finalChildren;

      if (children && listItems.length > 0) {
        console.warn(
          "NYPL Reservoir StyledList: Pass in either `<li>` children or use the " +
            "`listItems` data prop. Do not use both."
        );
        return null;
      }

      // Makes sure that the passed children elements are `li` elements but
      // it is not enforced. Only a warning is logged to the console.
      checkListChildrenError(children, "ul", "StyledList");

      finalChildren =
        children || listItems.map((item, i) => <li key={i}>{item}</li>);

      return (
        <Box as="ul" className={className} id={id} ref={ref} __css={styles}>
          {finalChildren}
        </Box>
      );
    }
  )
);

export default StyledList;
