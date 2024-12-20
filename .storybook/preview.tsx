// Add the DS styles.
import "../src/styles.scss";

import { MDXProvider } from "@mdx-js/react";
import { withTests } from "@storybook/addon-jest";
import { DocsContainer } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";

import { DSProvider, List, Text, useColorMode } from "../src/index";
import nyplTheme from "../src/theme";
import results from "../.jest-test-results.json";

// Custom viewport options
const customViewports = {
  sm: {
    name: "sm - small mobile (less than 480)",
    styles: {
      width: "390px",
      height: "667px",
    },
  },
  md: {
    name: "md - large mobile (less than 768) ",
    styles: {
      width: "600px",
      height: "715px",
    },
  },
  lg: {
    name: "lg - small tablet (less than 1024)",
    styles: {
      width: "960px",
      height: "1024px",
    },
  },
  xl: {
    name: "xl - large tablet (less than 1280)",
    styles: {
      width: "1200px",
      height: "1024px",
    },
  },
  "2xl": {
    name: "desktop (greater than or equal to 1280)",
    styles: {
      width: "1280px",
      height: "1024px",
    },
  },
};

/**
 * This allows Storybook document pages to use DS specific components
 * and styles. We need to explicitly set each one, however.
 */
const MyDocsContainer = (props) => (
  <MDXProvider
    components={{
      p: Text as any,
      // TODO: Make this monospacing font
      code: ({ children }) => <code>{children}</code>,
      ul: List as any,
    }}
  >
    <DSProvider>
      <DocsContainer {...props} />
    </DSProvider>
  </MDXProvider>
);

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    values: [
      { name: "Light mode page background", value: "#FFFFFF" },
      { name: "Light mode default background", value: "#F5F5F5" },
      { name: "Light mode hover background", value: "#E9E9E9" },
      { name: "Light mode active background", value: "#BDBDBD" },
      { name: "Dark mode page background", value: "#191919" },
      { name: "Dark mode default background", value: "#252525" },
      { name: "Dark mode hover background", value: "#2E2E2E" },
      { name: "Dark mode active background", value: "#424242" },
    ],
  },
  // Load the Reservoir's Chakra-based theme.
  chakra: {
    theme: nyplTheme,
  },
  // Allows all props' descriptions and default values to show in
  // Storybook's canvas addon bar.
  controls: { expanded: true },
  // Sets custom viewport options for testing under the Canvas view
  viewport: { viewports: customViewports },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Welcome",
        "Chakra UI",
        "Development Guide",
        "Style Guide",
        "Accessibility Guide",
        "Components",
        "Hooks",
      ],
    },
  },
  docs: {
    container: MyDocsContainer,
  },
};

interface ColorModeProps {
  colorMode: "light" | "dark";
  children: JSX.Element;
}
/**
 * Small component that adds a light/dark mode switch in the
 * Storybook toolbar.
 */
function ColorMode({ children, colorMode }: ColorModeProps) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(colorMode);
  }, [colorMode]);

  return children;
}

/**
 * The main config object for Storybook. This wraps all components
 * in a `DSProvider` so they render appropriately, adds Jest test results
 * in the addon toolbar, and adds the light/dark mode switch in the
 * top toolbar.
 */
const preview: Preview = {
  decorators: [
    withTests({ results }),
    (Story, context) => (
      <DSProvider>
        <ColorMode colorMode={context.globals.colorMode}>
          <Story />
        </ColorMode>
      </DSProvider>
    ),
  ],
  globalTypes: {
    colorMode: {
      title: "Color Mode",
      defaultValue: "light",
      toolbar: {
        items: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters,
};

export default preview;
