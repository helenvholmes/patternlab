
  import React, { forwardRef, useEffect, useState, useRef } from "react";

  import {
      Box,
      chakra,
      ChakraComponent,
      useMultiStyleConfig,
      Flex, Spacer, HStack
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
  ]
  export type highlightColors = typeof highlightColorsArray[number];


  export interface SubNavProps {
    /** Additional class name for the `SubNav` component. */
    className?: string;
    actionBackgroundColor?: actionBackgroundColors;
    highlightColor?: highlightColors;
    id?: string;
    selectedItem?: string;
    secondaryActions?: React.ReactElement;
    primaryActions: React.ReactElement;
  }

  // SubNavButton child-component
  export const SubNavButton: React.FC<React.PropsWithChildren<any>> = chakra(Button);
  export const SubNavLink: React.FC<React.PropsWithChildren<any>> = chakra(Link);

  export const SubNav: ChakraComponent<
    React.ForwardRefExoticComponent<
      React.PropsWithChildren<SubNavProps> & React.RefAttributes<HTMLDivElement>
    >,
    SubNavProps
  > = chakra(
    forwardRef<HTMLDivElement, React.PropsWithChildren<SubNavProps>>(
      (props, ref?) => {
        const {
          className,
          children,
          id,
          actionBackgroundColor,
          highlightColor,
          selectedItem,
          primaryActions,
          secondaryActions,
          ...rest
        } = props;

        const [showRightFade, setShowRightFade] = useState(false);
        const [lastScrollLeft, setLastScrollLeft] = useState(0);
        const scrollableRef = useRef(null);


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
              refCurrent.addEventListener('scroll', handleScroll);
              // Initial check to set the right fade effect
              const { scrollWidth, clientWidth } = refCurrent;
              setShowRightFade(scrollWidth > clientWidth); // Show fade if content is wider than the visible area
          }
      
          return () => {
            if (refCurrent) {
                refCurrent.removeEventListener('scroll', handleScroll);
            }
          };
        }, []);
        

        const styles = useMultiStyleConfig("SubNav", {
          backgroundColor: actionBackgroundColor,
          highlightColor: highlightColor,
        });

        const processChildren = (children, isPrimary) => {
          const actionButtons = [];
          const actionLinks = [];
        
          React.Children.forEach(children, (child: React.ReactElement) => {
            if (child.type !== SubNavButton && child.type !== SubNavLink) {
                console.warn("NYPL Reservoir SubNav: An element that is not a SubNavButton or SubNavLink component has been passed. It will be ignored.");
                return;
            }
    
            const isSelected = selectedItem === String(child.props.id);
            const actionStyles = {
              border: child.props.isOutlined === "true" ? "1px solid" : "none",
              borderColor: child.props.isOutlined === "true" ? highlightColor : isPrimary ? "transparent" : "ui.typography.body",
              borderRadius: "6px",
            };
    
            const commonStyles = {
              ...(isSelected ? styles.selectedItem : {}),
            };
    
            if (child.type === SubNavButton) {
                const button = (
                    <Button
                        key={child.props.id}
                        id={child.props.id}
                        buttonType="text"
                        __css={{
                            ...styles.button,
                            ...actionStyles,
                            ...commonStyles,
                            ...(isPrimary ? {} : styles.secondaryIcons), // Apply secondary styles conditionally
                        }}
                    >
                        {child.props.children}
                    </Button>
                );
                actionButtons.push(button);
            } else if (child.type === SubNavLink) {
                const link = (
                    <Link
                        key={child.props.id}
                        href={child.props.href}
                        id={child.props.id}
                        target="_blank"
                        screenreaderOnlyText={child.props.screenreaderOnlyText}
                        type="action"
                        __css={{
                            ...styles.a,
                            ...actionStyles,
                            ...commonStyles,
                            ...(isPrimary ? {} : styles.secondaryIcons), // Apply secondary styles conditionally
                        }}
                    >
                        {child.props.children}
                    </Link>
                );
                actionLinks.push(link);
              }
          });
          return { actionButtons, actionLinks };
      };
      
      let secondaryActionButtons: JSX.Element[] = [];
      let secondaryActionLinks: JSX.Element[] = [];

      let primaryActionButtons: JSX.Element[] = [];
      let primaryActionLinks: JSX.Element[] = [];

      // Process primary actions
      if (primaryActions && primaryActions.props) {
          const { actionButtons, actionLinks } = processChildren(primaryActions.props.children, true);
          primaryActionButtons = actionButtons;
          primaryActionLinks = actionLinks;
      }

      // Process secondary actions
      if (secondaryActions && secondaryActions.props) {
        const { actionButtons, actionLinks } = processChildren(secondaryActions.props.children, false);
        secondaryActionButtons = actionButtons;
        secondaryActionLinks = actionLinks;
      }

        const borderStyles = {
          ...styles.borderLine,
        }

        return (
          <>
            <Flex alignItems="baseline">
              <HStack sx={styles.scrollableButtons} ref={scrollableRef}>
                {primaryActionButtons}
                {primaryActionLinks}
                {showRightFade && (
                  <div style={{
                      ...styles.fadeEffect,
                  }} />
                )}

              </HStack>
            <Spacer />
              <HStack sx={styles.secondaryActions}>
                {secondaryActionButtons}
                {secondaryActionLinks}
              </HStack>
            </Flex>
            <Box id="suv-nav-border" sx={borderStyles} />
          </>
        );
      }
    )
  );

  export default SubNav;