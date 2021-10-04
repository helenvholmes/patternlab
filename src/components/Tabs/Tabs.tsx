import * as React from "react";
import {
  Box,
  Tabs as ChakraTabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useMultiStyleConfig,
} from "@chakra-ui/react";

import generateUUID from "../../helpers/generateUUID";
import { IconNames, IconRotationTypes } from "../Icons/IconTypes";
import Icon from "../Icons/Icon";
import { ButtonTypes } from "../Button/ButtonTypes";
import Button from "../Button/Button";
import useCarouselStyles from "../../hooks/useCarouselStyles";

// The general shape of the data object for each Tab.
export interface TabsContentDataProps {
  label: string;
  content: string | React.ReactNode;
}

export interface TabsProps {
  /** Array of data to display */
  contentData?: TabsContentDataProps[];
  /** The index of the tab to display for controlled situations. */
  defaultIndex?: number;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** The callback function invoked on every tab change event. */
  onChange?: (index: number) => any;
  /** Render a hash in the url for each tab. Only available when data is
   * passed through the `data` props. */
  useHash?: boolean;
}

/**
 * An internal function used to update the hash in the URL.
 * This function is only used when `useHash` is `true`.
 */
const onClickHash = (tabHash) => {
  window.location.hash = tabHash;
};

/**
 * This returns an object with `Tab` and `TabPanel` components to rendered in
 * `TabList` and `TabPanels` components respectively.
 */
const getElementsFromContentData = (data, useHash) => {
  const tabs = [];
  const panels = [];

  if (!data?.length) {
    return {};
  }

  if (data?.length > 6) {
    console.warn(
      "We recommend to use no more than six tabs. If more than six tabs are " +
        "needed, consider other navigational patterns."
    );
  }

  data.map((tab, index) => {
    let tempPanel;
    // For URL hash enabled tabs, we need to add a custom `onClick` to handle the URL hash.
    const tempTab = (
      <Tab
        fontSize={["0", null, "1"]}
        key={index}
        onClick={useHash ? () => onClickHash(`tab${index + 1}`) : null}
      >
        {tab.label}
      </Tab>
    );
    if (typeof tab.content === "string") {
      tempPanel = (
        <TabPanel
          key={index}
          dangerouslySetInnerHTML={{ __html: tab.content }}
        />
      );
    } else {
      tempPanel = <TabPanel key={index}>{tab.content}</TabPanel>;
    }

    tabs.push(tempTab);
    panels.push(tempPanel);
  });

  return {
    tabs: <TabList>{tabs}</TabList>,
    panels: <TabPanels>{panels}</TabPanels>,
  };
};

/**
 * This returns an object with `TabList` and `TabPanels` components to help format
 * the DOM when building up the `Tabs` component using child component.
 */
const getElementsFromChildren = (children) => {
  const tabs = [];
  const panels = [];

  if (!children?.length) {
    return {};
  }

  children.map((child) => {
    if (child.type === TabList || child.props.mdxType === "TabList") {
      tabs.push(child);

      const childTabs = React.Children.count(child.props.children);
      if (childTabs > 6) {
        console.warn(
          "We recommend to use no more than six tabs. If more than six tabs are " +
            "needed, consider other navigational patterns."
        );
      }
    }

    if (child.type === TabPanels || child.props.mdxType === "TabPanels") {
      panels.push(child);
    }
  });

  return { tabs, panels };
};

/**
 * Renders Chakra's `Tab` component with specific variants, props,
 * and controlled styling.
 */
function Tabs(props: React.PropsWithChildren<TabsProps>) {
  const {
    children,
    contentData,
    defaultIndex = 0,
    id = generateUUID(),
    onChange,
    useHash = false,
  } = props;
  const styles = useMultiStyleConfig("Tabs", {});
  const { tabs, panels } = contentData
    ? getElementsFromContentData(contentData, useHash)
    : getElementsFromChildren(children);
  // `tabs` is an array for the children component approach but an object for
  // the `contentData` prop approach. We need to get the right props key value
  // to set the carousel's length.
  const tabProps = tabs[0] ? tabs[0]?.props : (tabs as any).props;
  // Just an estimate of the tab width for the mobile carousel.
  const tabWidth = 40;
  const { prevSlide, nextSlide, carouselStyle } = useCarouselStyles(
    tabProps?.children?.length,
    tabWidth
  );
  const previousButton = (
    <Button
      buttonType={ButtonTypes.Primary}
      attributes={{
        "aria-label": "Previous",
        ...styles.buttonArrows,
        left: "0",
      }}
      onClick={prevSlide}
    >
      <Icon
        name={IconNames.arrow}
        decorative={true}
        iconRotation={IconRotationTypes.rotate90}
        modifiers={["small"]}
      />
    </Button>
  );
  const nextButton = (
    <Button
      buttonType={ButtonTypes.Primary}
      attributes={{
        "aria-label": "Next",
        ...styles.buttonArrows,
        right: "0",
      }}
      onClick={nextSlide}
    >
      <Icon
        name={IconNames.arrow}
        decorative={true}
        iconRotation={IconRotationTypes.rotate270}
        modifiers={["small"]}
      />
    </Button>
  );

  if (children && contentData?.length) {
    console.warn(
      "Only pass children or data in the `data` props but not both."
    );
  }

  return (
    <ChakraTabs
      id={id}
      // The following lazy loads each panel whenever it is needed.
      isLazy
      onChange={onChange}
      defaultIndex={defaultIndex}
      variant="enclosed"
    >
      <>
        <Box
          __css={styles.tablistWrapper}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {previousButton}
          <Box __css={styles.carouselParent}>
            <Box __css={styles.carouselWrapper} {...carouselStyle}>
              {tabs}
            </Box>
          </Box>
          {nextButton}
        </Box>
        {panels}
      </>
    </ChakraTabs>
  );
}

export { Tabs, TabList, Tab, TabPanels, TabPanel };
