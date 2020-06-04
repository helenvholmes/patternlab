import "!style-loader!css-loader!sass-loader!import-glob-loader!../src/styles/style.scss";
import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

// Add all the addons when starting up.
addDecorator(withInfo);
addDecorator(withA11y);
addDecorator(withKnobs);

// automatically import all stories from node_modules/stories ending in *.stories.js
// Direct link used instead of require(module) because of Webpack's inability to resolve variables in require.context

configure(
    require.context("../src/react-components", true, /\.stories\.tsx$/),
    module
);
