module.exports = {
  // Where are the stories?
  stories: [
    "../src/docs/Intro.stories.mdx",
    "../src/components/StyleGuide/*.stories.@(tsx|mdx)",
    "../src/components/**/*.stories.@(tsx|mdx)",
  ],
  // Each addon is added here by either it's name in a string or an object
  // configuration for that addon.
  addons: [
    "storybook-addon-designs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        // This allows Storybook to read the doc style comments for
        // components and their props.
        sourceLoaderOptions: {
          parser: "typescript",
          injectStoryParameters: true,
        },
      },
    },
    "@storybook/addon-controls",
    "@storybook/addon-queryparams",
  ],
  typescript: {
    // Type-check stories during Storybook build.
    check: true,
  },
  webpackFinal: async (config, { configType }) => {
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    // Exclude svg from the default storybook file-loader.
    assetRule.exclude = /\.svg$/;

    // Add svgr loader to handle svgs.
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
