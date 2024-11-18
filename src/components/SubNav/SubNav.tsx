import React, { forwardRef } from "react";
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
import useScrollFadeStyles from "../../hooks/useScrollFadeStyles";

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
  /**
   * The background color to be applied to the hover and active states
   * of the SubNavLink and SubNavButton components.
   * This allows for customization of the action items.
   */
  actionBackgroundColor?: actionBackgroundColors;
  /** Additional class name for the `SubNav` component. */
  className?: string;
  /**
   * Custom color for SubNavLink, SubNavButton, and icons.
   */
  highlightColor?: highlightColors;
  /**
   * Optional unique ID for accessibility, allowing other components
   * to reference this element.
   */
  id?: string;
  /**
   * Primary actions displayed on the left side of the SubNav.
   * Use SubNavButton and SubNavLink components, which mirror
   * the DS Button and Link.
   */
  primaryActions: React.ReactNode;
  /**
   * Secondary actions displayed on the right side of the SubNav.
   * Use SubNavButton and SubNavLink components, which mirror
   * the DS Button and Link.
   */
  secondaryActions?: React.ReactNode;
}

interface SubNavItemProps {
  id: string;
  children: React.ReactNode;
  isOutlined?: boolean;
  isSelected?: boolean;
  screenreaderOnlyText?: string;
}

interface SubNavLinkProps extends SubNavItemProps {
  href: string;
}

interface SubNavButtonProps extends SubNavItemProps {
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

export const SubNavButton: React.FC<
  React.PropsWithChildren<SubNavButtonProps>
> = ({ id, children, isOutlined, isSelected, screenreaderOnlyText = "" }) => {
  const childrenStyles = useMultiStyleConfig("SubNavChildren", {
    isOutlined: isOutlined,
  });

  return (
    <li>
      <Button
        id={id}
        buttonType="text"
        className={isSelected ? "selectedItem" : ""}
        sx={childrenStyles.outLine}
        aria-current={isSelected ? "page" : null}
        screenreaderOnlyText={screenreaderOnlyText}
      >
        {children}
      </Button>
    </li>
  );
};

export const SubNavLink: React.FC<React.PropsWithChildren<SubNavLinkProps>> = ({
  id,
  children,
  isOutlined,
  isSelected,
  href,
  screenreaderOnlyText = "",
}) => {
  const childrenStyles = useMultiStyleConfig("SubNavChildren", {
    isOutlined: isOutlined,
  });

  return (
    <li>
      <Link
        key={id}
        id={id}
        type="action"
        href={href}
        isUnderlined={false}
        screenreaderOnlyText={screenreaderOnlyText}
        aria-current={isSelected ? "page" : null}
        className={isSelected ? "selectedItem" : ""}
        sx={childrenStyles.outLine}
      >
        {children}
      </Link>
    </li>
  );
};

/**
 * The `SubNav` component is a navigation element that displays a group of
 * related action items (buttons or links) in a horizontal layout.  The action
 * items in the `SubNav` component will link to children within or perform
 * actions related to the current section of a website.
 */
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

      const { scrollableRef, showRightFade } = useScrollFadeStyles();

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
                  `NYPL Reservoir SubNav: An element that is not a SubNavButton or SubNavLink component has been passed in the \`${propName}\` prop. That element may not work properly.`
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

      return (
        <Box
          as="nav"
          aria-label="Sub-navigation menu"
          className={className}
          __css={styles.base}
        >
          <Box __css={styles.container}>
            <Flex alignItems="center" gap="s" justify="space-between">
              <div style={styles.primaryList}>
                <List
                  type="ul"
                  m="0"
                  sx={{
                    ...styles.scrollableList,
                    ...styles.primaryActions,
                  }}
                  ref={scrollableRef}
                  inline
                  noStyling
                >
                  {primaryActions}
                </List>
                {showRightFade && <Box sx={styles.fadeEffect} />}
              </div>
              {secondaryActions ? (
                <List
                  noStyling
                  inline
                  type="ul"
                  sx={styles.secondaryActions}
                  m="0"
                  width="fit-content"
                >
                  {secondaryActions}
                </List>
              ) : null}
            </Flex>
          </Box>
        </Box>
      );
    }
  )
);

export default SubNav;
