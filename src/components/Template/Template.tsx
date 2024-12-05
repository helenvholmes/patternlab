import { Box, ChakraComponent, useStyleConfig } from "@chakra-ui/react";

export interface TemplateProps {
  /** ID that other components can cross reference for accessibility purposes. */
  id?: string;
  /** Renders the `TemplateSidebar` component either on the left or
   * right side of the `TemplateMain` component. */
  sidebar?: "none" | "left" | "right";
}

export interface TemplateMainProps {
  /** ID used for the `main` HTML element. Defaults to "mainContent". Useful
   * anchor for the application skip navigation. */
  id?: string;
}

/**
 * The main top-level parent component that wraps all template-related
 * components.
 */
const Template: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<TemplateProps> & React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<TemplateProps>
> = ({ children, sidebar = "none" }) => {
  const styles = useStyleConfig("TemplateNew", { variant: sidebar });

  return <Box __css={styles}>{children}</Box>;
};

/**
 * This optional component renders its children above the main content
 * and spans edge-to-edge. It is most useful for `Breadcrumbs`, `Hero`,
 * or other banner-like components.
 */
const TemplateBreakout: React.FC<any> = (
  props: React.PropsWithChildren<TemplateProps>
) => {
  const styles = useStyleConfig("TemplateNewBreakout", {});

  return (
    <Box gridArea="breakout" __css={styles}>
      {props.children}
    </Box>
  );
};

/**
 * This optional component renders content at a max width of 1280px and
 * will render below `TemplateBreakout` (if being used) and above the
 * main content and sidebar (if one exists).
 */
const TemplateTop: React.FC<any> = (
  props: React.PropsWithChildren<TemplateProps>
) => <Box gridArea="top">{props.children}</Box>;

/**
 * This component renders an HTML `<main>` element with an id of "mainContent".
 * The "mainContent" id should be used as the consuming application's skip
 * navigation link. The component should not be used in conjunction with
 * `TemplateMainNarrow`.
 */
const TemplateMain: React.FC<any> = (
  props: React.PropsWithChildren<TemplateMainProps>
) => {
  const { children, id = "mainContent" } = props;

  return (
    <Box as="main" id={id} gridArea="main">
      {children}
    </Box>
  );
};

/**
 * This component renders an HTML `<main>` element with an id of "mainContent".
 * The "mainContent" id should be used as the consuming application's skip
 * navigation link. It provides a narrower container for better readability if
 * the main content includes long text. This component is meant to be used in
 * lieu of `TemplateMain`, and should not be used in conjunction with
 * `TemplateSidebar`.
 */
const TemplateMainNarrow: React.FC<any> = (
  props: React.PropsWithChildren<TemplateMainProps>
) => {
  const { children, id = "mainContent" } = props;
  const styles = useStyleConfig("TemplateNewMainNarrow");

  return (
    <Box as="main" id={id} gridArea="main" __css={styles}>
      {children}
    </Box>
  );
};

/**
 * This optional component is used to render content in a sidebar column.
 * It must be paired with the `TemplateMain` component. An optional `sidebar`
 * prop value of "left" or "right" must be passed to the `Template` wrapper
 * to render the correct CSS styles.
 */
const TemplateSidebar: React.FC<any> = (
  props: React.PropsWithChildren<TemplateProps>
) => <Box gridArea="sidebar">{props.children}</Box>;

/**
 * This optional component renders content at a max width of 1280px and
 * will always render below the main content and sidebar (if one exists).
 */
const TemplateBottom: React.FC<any> = (
  props: React.PropsWithChildren<TemplateProps>
) => <Box gridArea="bottom">{props.children}</Box>;

export {
  Template,
  TemplateBreakout,
  TemplateTop,
  TemplateMain,
  TemplateMainNarrow,
  TemplateSidebar,
  TemplateBottom,
};
