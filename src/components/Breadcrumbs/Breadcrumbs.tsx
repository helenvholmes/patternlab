import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  chakra,
  useStyleConfig,
  ChakraComponent,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Icon from "../Icons/Icon";
import Tooltip from "../Tooltip/Tooltip";
import { truncateText } from "../../utils/utils";

export const breadcrumbTypeArray = [
  "blogs",
  "booksAndMore",
  "brand",
  "connect",
  "digitalCollections",
  "education",
  "locations",
  "research",
  "whatsOn",
] as const;
export type BreadcrumbsTypes = typeof breadcrumbTypeArray[number];
export interface BreadcrumbsDataProps {
  url: string;
  text: string | React.ReactNode;
  linkProps?: any;
}

export interface BreadcrumbProps {
  /** Breadcrumb links as an array */
  breadcrumbsData: BreadcrumbsDataProps[];
  /** Used to control how the `Hero` component will be rendered. */
  breadcrumbsType?: BreadcrumbsTypes;
  /** className you can add in addition to 'input' */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Custom Link component for apps with internal routing, defaults to BreadcrumbLink if not passed */
  customLinkComponent?: any;
}

const breadcrumbTextLength = 40;

/**
 * Truncate breadcrumb text if it is more than 40 characters in length and
 * then add ellipsis at the end.
 */
const tooltipWrapperOrText = (
  breadcrumbsData: BreadcrumbsDataProps,
  breadcrumbsID,
  customLinkComponent,
  renderIcon = false,
  isCurrentPage = false
) => {
  const textLength = (breadcrumbsData.text as string).length;
  const renderTooltip = textLength >= breadcrumbTextLength;
  // If the text is more than 40 characters in length, truncate it.
  const updatedText =
    textLength <= breadcrumbTextLength
      ? breadcrumbsData.text
      : truncateText(breadcrumbsData.text as string, breadcrumbTextLength);
  const linkWrapper = (
    <BreadcrumbLink
      as={customLinkComponent}
      href={breadcrumbsData.url}
      aria-current={isCurrentPage ? "page" : undefined}
      aria-label={renderIcon ? updatedText : ""}
      {...breadcrumbsData.linkProps}
    >
      {renderIcon && (
        <Icon
          name="arrow"
          size="small"
          iconRotation="rotate90"
          id={`${breadcrumbsID}__backarrow`}
          className="breadcrumbs-icon"
          type="breadcrumbs"
        />
      )}
      <span className="breadcrumb-label">{updatedText}</span>
    </BreadcrumbLink>
  );
  // If the text is more than 40 characters in length, we need a ToolTip
  // component wrapped *directly* around the anchor element for
  // accessibility purposes.
  const breadcrumbLink = renderTooltip ? (
    <Tooltip
      content={breadcrumbsData.text}
      id={`breadcrumb-${breadcrumbsID}-tooltip`}
    >
      {linkWrapper}
    </Tooltip>
  ) : (
    <>{linkWrapper}</>
  );

  return breadcrumbLink;
};

const getElementsFromData = (
  data: BreadcrumbsDataProps[],
  breadcrumbsID?: string,
  customLinkComponent?: any
) => {
  if (!data?.length) {
    return null;
  }

  const breadcrumbsItems = data.map((breadcrumbsData, index) => {
    // The icon renders only on mobile and it should be
    // part of the second to last element in the nav.
    const renderIcon = index === data.length - 2;
    // The current page is the last item in the breadcrumbs
    // and needs an additional aria attribute.
    const isCurrentPage = index === data.length - 1;
    return (
      <BreadcrumbItem key={index}>
        {tooltipWrapperOrText(
          breadcrumbsData,
          breadcrumbsID,
          customLinkComponent,
          renderIcon,
          isCurrentPage
        )}
      </BreadcrumbItem>
    );
  });

  return breadcrumbsItems;
};

/**
 * The `Breadcrumbs` component is a navigation element that provides a
 * breadcrumb path that reflects the site structure and allows a user to
 * navigate to any page available in the breadcrumb hierarchy.
 */

export const Breadcrumbs: ChakraComponent<
  React.ForwardRefExoticComponent<
    BreadcrumbProps & React.RefAttributes<HTMLDivElement>
  >,
  BreadcrumbProps
> = chakra(
  forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref?) => {
    const {
      breadcrumbsData,
      breadcrumbsType = "whatsOn",
      className,
      customLinkComponent,
      id,
      ...rest
    } = props;

    if (!breadcrumbsData || breadcrumbsData.length === 0) {
      throw new Error(
        "NYPL Reservoir Breadcrumbs: No data was passed to the `breadcrumbsData` prop."
      );
    }

    const styles = useStyleConfig("CustomBreadcrumb", {
      variant: breadcrumbsType,
    });
    const breadcrumbItems = getElementsFromData(
      breadcrumbsData,
      id,
      customLinkComponent
    );

    return (
      <ChakraBreadcrumb
        aria-label="Breadcrumb"
        className={className}
        id={id}
        ref={ref}
        __css={styles}
        {...rest}
      >
        {breadcrumbItems}
      </ChakraBreadcrumb>
    );
  })
);

export default Breadcrumbs;
