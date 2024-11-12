import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  CSSProperties,
} from "react";
import {
  Box,
  chakra,
  ChakraComponent,
  useMultiStyleConfig,
  Flex,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import Link from "../Link/Link";
import List from "../List/List";

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
  primaryActions: React.ReactNode;
  /**
   * Secondary actions displayed on the right side of the SubNav.
   * Use SubNavButton and SubNavLink components, offering additional
   * contextual options related to the primary content.
   */
  secondaryActions?: React.ReactNode;
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

export const SubNavButton: React.FC<React.PropsWithChildren<any>> = ({
  id,
  buttonType = "text",
  children,
  isOutlined,
  selectedItem,
}) => {
  const isSelected = selectedItem === String(id);

  // Log a warning if selectedItem does not match any id
  if (selectedItem && !isSelected) {
    console.warn(
      "NYPL Reservoir SubNav: The `selectedItem` prop does not match any of the action items."
    );
  }

  const childrenStyles = useMultiStyleConfig("SubNavChildren", {
    isOutlined: isOutlined,
  });

  return (
    <Button
      id={id}
      buttonType={buttonType}
      className={isSelected ? "selectedItem" : ""}
      sx={{ ...childrenStyles.outLine }}
    >
      {children}
    </Button>
  );
};

export const SubNavLink: React.FC<React.PropsWithChildren<any>> = ({
  id,
  type = "action",
  children,
  isOutlined,
  selectedItem,
  href,
  screenreaderOnlyText = "", // Default to empty if no screenreader text provided
}) => {
  const isSelected = selectedItem === String(id);

  // Log a warning if selectedItem does not match any id
  if (selectedItem && !isSelected) {
    console.warn(
      "NYPL Reservoir SubNav: The `selectedItem` prop does not match any of the action items."
    );
  }

  const childrenStyles = useMultiStyleConfig("SubNavChildren", {
    isOutlined: isOutlined,
  });

  return (
    <Link
      key={id}
      id={id}
      type={type}
      href={href}
      isUnderlined={false}
      screenreaderOnlyText={screenreaderOnlyText}
      className={isSelected ? "selectedItem" : ""}
      sx={{ ...childrenStyles.outLine }}
    >
      {children}
    </Link>
  );
};

export const SubNav: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<SubNavProps> & React.RefAttributes<HTMLDivElement>
  >,
  SubNavProps
> = chakra(
  forwardRef<HTMLDivElement, React.PropsWithChildren<SubNavProps>>(
    (props, _ref?) => {
      const {
        className,
        actionBackgroundColor,
        highlightColor,
        primaryActions,
        secondaryActions,
      } = props;

      const [showRightFade, setShowRightFade] = useState(false);
      const [lastScrollLeft, setLastScrollLeft] = useState(0);
      const scrollableRef = useRef(null);

      if (actionBackgroundColor !== undefined && highlightColor === undefined) {
        console.warn(
          "NYPL Reservoir SubNav: The `actionBackgroundColor` prop has been passed, but the `highlightColor` prop has not been passed. Because of this, the `actionBackgroundColor` prop will be ignored."
        );
      }

      const validateActions = (actions: React.ReactNode, propName: string) => {
        if (React.isValidElement(actions)) {
          React.Children.forEach(
            actions.props.children,
            (child: React.ReactElement) => {
              if (child.type !== SubNavButton && child.type !== SubNavLink) {
                console.warn(
                  `NYPL Reservoir SubNav: An element that is not a SubNavButton or SubNavLink component has been passed in the \`${propName}\` prop. That element will be ignored.`
                );
                return null;
              }
            }
          );
        }
      };

      // Validate primaryActions and secondaryActions
      validateActions(primaryActions, "primaryActions");
      validateActions(secondaryActions, "secondaryActions");

      const backgroundColor =
        highlightColor !== undefined ? actionBackgroundColor : undefined;

      const styles = useMultiStyleConfig("SubNav", {
        backgroundColor: backgroundColor,
        highlightColor: highlightColor,
      });

      const handleScroll = () => {
        if (scrollableRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } =
            scrollableRef.current;

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

          // Initial check to set the right fade effect based on the initial scroll state
          const { scrollWidth, clientWidth, scrollLeft } = refCurrent;
          const atRightEdge = scrollLeft + clientWidth >= scrollWidth;

          // Set the right fade effect if content is scrollable and not at the right edge
          setShowRightFade(!atRightEdge);

          // If the scrollable area is already at the end, hide the right fade initially
          if (scrollWidth <= clientWidth) {
            setShowRightFade(false); // If the content fits in the viewport, no need for a fade
          }
        }

        // Cleanup event listener on component unmount
        return () => {
          if (refCurrent) {
            refCurrent.removeEventListener("scroll", handleScroll);
          }
        };
      }, []); // Empty dependency array to run only once after the initial render

      return (
        <Box __css={styles.base}>
          <Flex
            alignItems="baseline"
            className={className}
            gap="1rem"
            justify="space-between"
          >
            <List
              type="ul"
              m="0"
              sx={{ ...styles.scrollableButtons, ...styles.primaryActions }}
              ref={scrollableRef}
              inline
              noStyling
            >
              <li id="primary-actions">{primaryActions}</li>
              {showRightFade && (
                // Explicitly cast styles.fadeEffect to CSSProperties
                <div style={styles.fadeEffect as CSSProperties} />
              )}
            </List>
            <List
              noStyling
              inline
              type="ul"
              sx={{ ...styles.secondaryActions }}
              m="0"
              width="fit-content"
            >
              <li id="secondary-actions">
                {secondaryActions ? secondaryActions : null}
              </li>
            </List>
          </Flex>
        </Box>
      );
    }
  )
);

export default SubNav;
