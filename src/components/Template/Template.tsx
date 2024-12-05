import { Box, useStyleConfig } from "@chakra-ui/react";

const Template: React.FC<any> = ({ children, sidebar = "none" }) => {
  const styles = useStyleConfig("TemplateNew", { variant: sidebar });

  return <Box __css={styles}>{children}</Box>;
};

const TemplateBreakout: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewBreakout", {});

  return (
    <Box gridArea="breakout" __css={styles}>
      {children}
    </Box>
  );
};

const TemplateTop: React.FC<any> = ({ children }) => (
  <Box gridArea="top">{children}</Box>
);

const TemplateMain: React.FC<any> = ({ children, id = "mainContent" }) => (
  <Box as="main" id={id} gridArea="main">
    {children}
  </Box>
);

const TemplateMainNarrow: React.FC<any> = ({
  children,
  id = "mainContent",
}) => {
  const styles = useStyleConfig("TemplateNewMainNarrow");

  return (
    <Box as="main" id={id} gridArea="main" __css={styles}>
      {children}
    </Box>
  );
};

const TemplateSidebar: React.FC<any> = ({ children }) => (
  <Box gridArea="sidebar">{children}</Box>
);

const TemplateBottom: React.FC<any> = ({ children }) => (
  <Box gridArea="bottom">{children}</Box>
);

export {
  Template,
  TemplateBreakout,
  TemplateTop,
  TemplateMain,
  TemplateMainNarrow,
  TemplateSidebar,
  TemplateBottom,
};
