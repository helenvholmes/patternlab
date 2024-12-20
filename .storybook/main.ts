import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        // Storybook 7 uses MDX 2 which does not include various syntax
        // patterns we are use to. This adds `remark-gfm` which adds
        // back support for "github flavored markdown" (GFM).
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-jest",
  ],

  // This gets added automatically through react-vite,
  // but leaving it here just to point it out.
  // core: {
  //   builder: "storybook-builder-vite",
  // },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  refs: {
    "@chakra-ui/react": { disable: true },
  },

  stories: [
    "../src/docs/Welcome.mdx",
    "../src/docs/Chakra.mdx",
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.tsx",
    "../src/hooks/*.mdx",
  ],

  typescript: {
    // Type-check stories during Storybook build.
    check: true,
    // Display the compiled value options.
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Do we want to display Chakra props in Storybook? Nope.
      // They are useful but it clutters the Storybook file and the Chakra
      // docs are easy to access on their own site. DS components still
      // accept Chakra props but this makes it so that the Chakra props
      // are just hidden in Storybook.
      propFilter: (prop) => {
        /** @Info: The following code would allow for typescript `type`
         * declarations to also show up in the  argTypes table of storybook
         * (The manual workaround in the argTypl like on MultiSelect `with` or
         * SocilaMediaLinks `borders` would be redundant)
         */
        // if (
        //   !prop.parent &&
        //   prop.declarations &&
        //   prop.declarations[0].name === "TypeLiteral" &&
        //   !/node_modules/.test(prop.declarations[0].fileName)
        // ) {
        //   return true;
        // }

        /** This is a bit of a "hack" but it tells Storybook that the prop
         * is defined in a DS component. If we define it, then display it
         * in the `ArgTypes` table in a component Storybook document page.
         */
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : false;
      },
    },
  },

  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      // Customize the Vite config here:
      assetsInclude: ["/sb-preview/runtime.js"],
      resolve: {
        alias: {
          // This is to get @storybook/addon-jest working:
          path: "path-browserify",
        },
      },
    });
  },
};

export default config;
