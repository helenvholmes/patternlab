import { Box, useStyleConfig } from "@chakra-ui/react";

const TemplateNew: React.FC<any> = ({ children, sidebar = "none" }) => {
  console.log("side -->", sidebar);
  const styles = useStyleConfig("TemplateNew", { variant: sidebar });

  return <Box __css={styles}>{children}</Box>;
};

const TemplateNewBreakout: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewBreakout", {});

  return <Box __css={styles}>{children}</Box>;
};

const TemplateNewTop: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewTop", {});

  return <Box __css={styles}>{children}</Box>;
};

const TemplateNewMain: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewMain", {});

  return <Box __css={styles}>{children}</Box>;
};

const TemplateNewSidebar: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewSidebar", {});

  return <Box __css={styles}>{children}</Box>;
};

const TemplateNewBottom: React.FC<any> = ({ children }) => {
  const styles = useStyleConfig("TemplateNewBottom", {});

  return <Box __css={styles}>{children}</Box>;
};

export {
  TemplateNew,
  TemplateNewBreakout,
  TemplateNewTop,
  TemplateNewMain,
  TemplateNewSidebar,
  TemplateNewBottom,
};
