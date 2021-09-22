import * as React from "react";
import { SimpleGrid as ChakraSimpleGrid } from "@chakra-ui/react";
import { GridGaps } from "./GridTypes";

import generateUUID from "../../helpers/generateUUID";

export interface GridProps {
  /** Additional class name. */
  className?: string;
  /** Optional numeric value to override the default column count; the default column count is 3 */
  columnCount?: number;
  /** Optional gap size; if omitted, the default `large` (2rem / 32px) spacing will be used; ```IMPORTANT: for general grid layout, this prop should not be used``` */
  gap?: GridGaps;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
}

//  * Map the ButtonType to the Button Chakra theme variant object. If a wrong
//  * value is passed (typically in non-Typescript scenarios), then the default
//  * is the "primary" variant.
// const getVariant = (variant, collection) => {
//   // Used to map between enum values and Chakra variant options.
//   const variantMap = {};
//   for (const type in collection) {
//     variantMap[collection[type]] = collection[type];
//   }
//   return variantMap[variant] || collection.Default;
// };

function Grid(props: React.PropsWithChildren<GridProps>) {
  const {
    children,
    columnCount = 3,
    className,
    gap = GridGaps.Large,
    id = generateUUID(),
  } = props;

  // const variant = gap ? getVariant(gap, GridGaps) : null;
  // const styles = useStyleConfig("Grid", { variant });
  // console.log(`variant == ${variant}`);

  // const colConfig = `repeat(${columnCount}, 1fr)`;

  return (
    <ChakraSimpleGrid
      columns={{ base: 1, md: columnCount }}
      gap={gap}
      id={id}
      className={className}
    >
      {children}
    </ChakraSimpleGrid>
  );
}

export default Grid;
