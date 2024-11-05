import {
  Box,
  ChakraComponent,
  chakra,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Icon from "../Icons/Icon";
import { sanitizeStringForAttribute } from "../../utils/utils";

export const linkTypesArray = [
  "action",
  "backwards",
  // The "button" type is deprecated as of 1.2.x.
  "button",
  // Instead, use the following "buttonX" types.
  "buttonPrimary",
  "buttonSecondary",
  "buttonPill",
  "buttonCallout",
  "buttonNoBrand",
  "buttonDisabled",
  "default",
  "external",
  "forwards",
  "standalone",
] as const;
export type LinkTypes = typeof linkTypesArray[number];

export interface LinkProps extends ChakraLinkProps {
  /** Additional class name to render in the `Link` component. */
  className?: string;
  /** Used to include or remove visited state styles. Default is true. */
  hasVisitedState?: boolean;
  /** The `href` attribute for the anchor element. */
  href?: string;
  /** ID used for accessibility purposes. */
  id?: string;
  /** Used to explicitly set the underline style for a text link. If true, link
   * text will always be underlined; if false, link text will only show
   * underline in hover state. */
  isUnderlined?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  rel?: string;
  /** Visibly hidden text that will only be read by screenreaders. */
  screenreaderOnlyText?: string;
  /** Prop that sets the HTML attribute to target where the link should go. */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** Controls the link visuals: action, button, backwards, forwards,
   * standalone, or default. */
  type?: LinkTypes;
}

/**
 * Renders the `Link` children components with a direction arrow icon based
 * on the `"backwards"` or `"forwards"` `type` prop value.
 */
function getWithDirectionIcon(
  children: JSX.Element,
  type: LinkTypes,
  linkId: string
) {
  const linkProps: any = {
    align: undefined,
    iconRotation: undefined,
    id: `${linkId}-direction-icon`,
  };
  let icon;

  // An icon needs a position in order for it to be created and
  // rendered in the link.
  if (type === "backwards") {
    linkProps.align = "left";
    linkProps.iconRotation = "rotate90";
  } else if (type === "forwards") {
    linkProps.align = "right";
    linkProps.iconRotation = "rotate270";
  }

  icon = <Icon name="arrow" size="medium" {...linkProps} />;

  return (
    <>
      {type === "backwards" && icon}
      {children}
      {type === "forwards" && icon}
    </>
  );
}

function getExternalExtraElements(
  children: JSX.Element,
  linkId: string,
  styles: object
) {
  const iconId = `${linkId}-external-icon`;
  const extraElements = (
    <>
      <Box as="span" __css={styles}>
        This link opens in a new window
      </Box>
      <Icon
        align="right"
        id={iconId}
        name="actionLaunch"
        size="medium"
        title="External link"
      />
    </>
  );

  return (
    <>
      {children}
      {extraElements}
    </>
  );
}

function getStandaloneIcon(children: JSX.Element, linkId: string) {
  const iconId = `${linkId}-standalone-icon`;
  const extraElements = (
    <Icon
      align="right"
      iconRotation="rotate270"
      id={iconId}
      name="arrow"
      size="xsmall"
      title="Navigation arrow"
    />
  );

  return (
    <>
      {children}
      {extraElements}
    </>
  );
}

/**
 * A component that uses an `href` prop or a child anchor `<a>` element, to
 * create an anchor element with added styling and conventions.
 */
export const Link: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<LinkProps> &
      React.RefAttributes<HTMLDivElement & HTMLAnchorElement>
  >,
  React.PropsWithChildren<LinkProps>
> = chakra(
  forwardRef<
    HTMLDivElement & HTMLAnchorElement,
    React.PropsWithChildren<LinkProps>
  >((props, ref?) => {
    const {
      as = "a",
      children,
      className,
      hasVisitedState = true,
      href,
      id,
      isUnderlined = true,
      onClick,
      screenreaderOnlyText,
      target,
      type = "default",
      ...rest
    } = props;
    // Set initial underline style for certain variants
    const finalIsUnderlined =
      type === "backwards" || type === "forwards" || type === "standalone"
        ? false
        : isUnderlined;
    const rel = type === "external" ? "nofollow noopener noreferrer" : null;
    const internalTarget =
      type === "external" ? "_blank" : target ? target : null;
    // Merge the necessary props alongside any extra props for the
    // anchor element.
    const linkProps = {
      id,
      href,
      onClick,
      rel,
      ref,
      target: internalTarget,
      ...rest,
    };
    // The "default" type.
    let variant = "link";

    if (
      type === "action" ||
      type === "backwards" ||
      type === "external" ||
      type === "forwards" ||
      type === "standalone"
    ) {
      variant = "moreLink";
    } else if (type.includes("button")) {
      variant = type;
    }
    const styles = useMultiStyleConfig("Link", {
      finalIsUnderlined,
      hasVisitedState,
      variant,
    });
    const sanitizedId = id
      ? id
      : sanitizeStringForAttribute(`link-${children as string}`);
    // Render with specific direction arrows if the type is "forwards" or
    // "backwards". Or render with the launch icon if the type is "external". Or
    // render with a smaller right-arrow if the type is "standalone." Otherwise,
    // do not add an icon.
    const newChildren =
      ((type === "forwards" || type === "backwards") &&
        getWithDirectionIcon(children as JSX.Element, type, sanitizedId)) ||
      (type === "external" &&
        getExternalExtraElements(
          children as JSX.Element,
          sanitizedId,
          styles.screenreaderOnly
        )) ||
      (type === "standalone" &&
        getStandaloneIcon(children as JSX.Element, sanitizedId)) ||
      children;

    const screenReaderOnlyElement = screenreaderOnlyText ? (
      <Box as="span" __css={styles.screenreaderOnly}>
        {screenreaderOnlyText}
      </Box>
    ) : null;

    return (
      <ChakraLink
        as={as}
        className={className}
        {...linkProps}
        sx={styles.base}
        {...rest}
      >
        {newChildren}
        {screenReaderOnlyElement}
      </ChakraLink>
    );
  }),
  { shouldForwardProp: () => true }
);

export default Link;
