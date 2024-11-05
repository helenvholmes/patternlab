import React, { forwardRef, useEffect, useState, useRef } from "react";

import {
  Box,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
  Flex,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import Link from "../Link/Link";

export const actionBackgroundColorsArray = [
  "brand.primary-05",
  "section.blogs.primary-05",
  "section.books-and-more.primary-05",
  "section.connect.primary-05",
  "section.education.primary-05",
  "section.locations.primary-05",
  "section.research.primary-05",
  "section.research-library.lpa-05",
  "section.research-library.schomburg-05",
  "section.research-library.schwarzman-05",
  "section.whats-on.primary-05",
  "dark.brand.primary-05",
  "dark.section.blogs.primary-05",
  "dark.section.books-and-more.primary-05",
  "dark.section.connect.primary-05",
  "dark.section.education.primary-05",
  "dark.section.locations.primary-05",
  "dark.section.research.secondary-05",
  "dark.section.research-library.lpa-05",
  "dark.section.research-library.schomburg-05",
  "dark.section.research-library.schwarzman-05",
  "dark.section.whats-on.primary-05",
] as const;

export type actionBackgroundColors = typeof actionBackgroundColorsArray[number];

export const highlightColorsArray = [
  "brand.primary",
  "section.blogs.primary",
  "section.books-and-more.primary",
  "section.connect.primary",
  "section.education.primary",
  "section.locations.primary",
  "section.research.primary",
  "section.research-library-lpa.primary",
  "section.research-library-schomburg.primary",
  "section.research-library-schwarzman.primary",
  "section.whats-on.primary",
  "dark.brand.primary",
  "dark.section.blogs.primary",
  "dark.section.books-and-more.primary",
  "dark.section.connect.primary",
  "dark.section.education.primary",
  "dark.section.locations.primary",
  "dark.section.research.secondary",
  "dark.section.research-library-lpa.primary",
  "dark.section.research-library-schomburg.primary",
  "dark.section.research-library-schwarzman.primary",
  "dark.section.whats-on.primary",
];
export type highlightColors = typeof highlightColorsArray[number];

export interface SubNavProps {
  /** Additional class name for the `SubNav` component. */
  className?: string;
  /**
   * Primary actions displayed on the left side of the SubNav.
   * Use SubNavButton and SubNavLink components, which mirror
   * the DS Button and Link functionalities, plus the isOutlined prop.
   */
  primaryActions: ({
    highlightColor,
    actionBackgroundColor,
    selectedItem,
  }: {
    highlightColor?: string;
    actionBackgroundColor?: string;
    selectedItem?: string;
  }) => React.ReactNode;
  /**
   * Secondary actions displayed on the right side of the SubNav.
   * Use SubNavButton and SubNavLink components, offering additional
   * contextual options related to the primary content.
   */
  secondaryActions: ({
    highlightColor,
    actionBackgroundColor,
    selectedItem,
  }: {
    highlightColor?: string;
    actionBackgroundColor?: string;
    selectedItem?: string;
  }) => React.ReactNode;
  /**
   * The background color to be applied to the hover and active states
   * of the SubNavLink and SubNavButton components.
   * This allows for customization of the action items.
   */
  actionBackgroundColor?: actionBackgroundColors;
  /**
   * Custom color for SubNavLink, SubNavButton, and icons.
   */
  highlightColor?: highlightColors;
  /**
   * Optional unique ID for accessibility, allowing other components
   * to reference this element.
   */
  id?: string;
  /** Optional string used to identify and highlight an item. The value should
   * match the id associated with one of the items.
   */
  selectedItem?: string;
}

export const SubNavButton: React.FC<React.PropsWithChildren<any>> = chakra(
  ({
    id,
    buttonType = "text",
    children,
    isOutlined,
    highlightColor,
    actionBackgroundColor,
    selectedItem,
  }) => {
    const isSelected = selectedItem === String(id);
    const styles = useMultiStyleConfig("SubNav", {
      backgroundColor: actionBackgroundColor,
      highlightColor: highlightColor,
      isOutlined: isOutlined,
    });
    return (
      <Button
        id={id}
        buttonType={buttonType}
        __css={{
          ...styles.button,
          ...styles.outLine,
          ...(isSelected ? styles.selectedItem : {}),
        }}
      >
        {children}
      </Button>
    );
  }
);

export const SubNavLink: React.FC<React.PropsWithChildren<any>> = chakra(
  ({
    id,
    type = "action",
    children,
    isOutlined,
    highlightColor,
    actionBackgroundColor,
    selectedItem,
    href,
  }) => {
    const isSelected = selectedItem === String(id);
    const styles = useMultiStyleConfig("SubNav", {
      backgroundColor: actionBackgroundColor,
      highlightColor: highlightColor,
      isOutlined: isOutlined,
    });
    return (
      <Link
        key={id}
        id={id}
        type={type}
        href={href}
        screenreaderOnlyText={id}
        __css={{
          ...styles.a,
          ...styles.outLine,
          ...(isSelected ? styles.selectedItem : {}),
        }}
      >
        {children}
      </Link>
    );
  }
);

export const SubNav: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<SubNavProps> & React.RefAttributes<HTMLDivElement>
  >,
  SubNavProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<SubNavProps>>((props) => {
    const {
      className,
      actionBackgroundColor,
      highlightColor,
      selectedItem,
      primaryActions,
      secondaryActions,
    } = props;

    const [showRightFade, setShowRightFade] = useState(false);
    const [lastScrollLeft, setLastScrollLeft] = useState(0);
    const scrollableRef = useRef(null);

    const styles = useMultiStyleConfig("SubNav", {
      backgroundColor: actionBackgroundColor,
      highlightColor: highlightColor,
    });

    if (actionBackgroundColor !== undefined && highlightColor === undefined) {
      console.warn(
        "NYPL Reservoir SubNav: The `actionBackgroundColor` prop has been passed, but the `highlightColor` prop has not been passed. Because of this, the `actionBackgroundColor` prop will be ignored."
      );
    }

    const handleScroll = () => {
      if (scrollableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;

        // Determine if we are scrolling to the left or right
        const isScrollingRight = scrollLeft > lastScrollLeft;
        setLastScrollLeft(scrollLeft); // Update last scroll position

        // Show right fade only if scrolling to the left
        if (!isScrollingRight) {
          // Show right fade only if not at the end
          const atRightEdge = scrollLeft + clientWidth >= scrollWidth;
          setShowRightFade(!atRightEdge);
        } else {
          setShowRightFade(false); // Hide when scrolling right
        }
      }
    };

    useEffect(() => {
      const refCurrent = scrollableRef.current;
      if (refCurrent) {
        refCurrent.addEventListener("scroll", handleScroll);
        // Initial check to set the right fade effect
        const { scrollWidth, clientWidth } = refCurrent;
        setShowRightFade(scrollWidth > clientWidth); // Show fade if content is wider than the visible area
      }

      return () => {
        if (refCurrent) {
          refCurrent.removeEventListener("scroll", handleScroll);
        }
      };
    }, []);

    // Function to ensure only valid CSS properties are passed
    const fadeEffectStyles = (styleObject) => {
      const { accentColor, ...validStyles } = styleObject; // Exclude non-CSS properties
      return validStyles;
    };

    return (
      <>
        <Flex alignItems="baseline" className={className} gap="1rem">
          <HStack
            sx={{ ...styles.scrollableButtons, ...styles.primaryActions }}
            ref={scrollableRef}
          >
            {primaryActions({
              highlightColor,
              actionBackgroundColor,
              selectedItem,
            })}
            {showRightFade && (
              <div style={fadeEffectStyles(styles.fadeEffect)} />
            )}
          </HStack>
          <Spacer />
          <HStack sx={{ ...styles.secondaryActions }}>
            {secondaryActions({
              highlightColor,
              actionBackgroundColor,
              selectedItem,
            })}
          </HStack>
        </Flex>
        <Box id="suv-nav-border" />
      </>
    );
  })
);

export default SubNav;
