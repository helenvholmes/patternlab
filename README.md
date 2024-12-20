# Reservoir Design System

![Build Status](https://github.com/nypl/nypl-design-system/actions/workflows/ci.yml/badge.svg?branch=development)

[![npm version](https://badge.fury.io/js/%40nypl%2Fdesign-system-react-components.svg)](https://badge.fury.io/js/%40nypl%2Fdesign-system-react-components)

The Reservoir Design System (DS) is NYPL’s open-source extensible React library for products and experiences with the accessibility as its foundation. It ships functional, stateless components with consistent NYPL styling. You can learn more about the project and its goals [on the project's wiki](https://github.com/NYPL/nypl-design-system/wiki).

Storybook documentation

- [V3 Production - deployed to Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/welcome--docs)
- [Development/QA - deployed to Vercel](https://nypl-design-system.vercel.app/?path=/docs/welcome--docs)
- [V2 Production - deployed to Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v2)
- [V1 Production - deployed to Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v1)

| Table of Contents |                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------- |
| 1.                | [Using the Design System in Your Product](#using-the-design-system-in-your-product) |
| 2.                | [Using Chakra UI Components](#using-chakra-ui-components)                           |
| 3.                | [Storybook](#storybook)                                                             |
| 4.                | [Accessibility](#accessibility)                                                     |
| 5.                | [Contributing Quickstart](#contributing-quickstart)                                 |
| 6.                | [Local App Development](#local-app-development)                                     |
| 7.                | [Typescript Usage](#typescript-usage)                                               |
| 8.                | [Unit Testing](#unit-testing)                                                       |
| 9.                | [CDN](#cdn)                                                                         |

## Using the Design System in Your Product

The Reservoir Design System package is distributed on npm.

1. Install the package in your app's directory:

```sh
$ npm install @nypl/design-system-react-components
```

2. Import the `DSProvider` component

In order to use DS components in a consuming application, there is a necessary step that must be done for component styles to properly render. Consuming applications need to wrap all the DS components with a simple provider component. Fortunately, this only needs to be done once at the top level of the consuming application.

Once the following is completed, DS components that internally use Chakra UI will render styles properly.

```jsx
// your main application file
import { DSProvider } from "@nypl/design-system-react-components";

// ...
const ApplicationContainer = (props) => {
  // ...
  return (
    <DSProvider>
      <div className="my-app">
        // ...
        {children}
      </div>
    </DSProvider>
  );
};
```

3. Import the minified styles `@nypl/design-system-react-components/dist/styles.css` file in your app.

This file contains normalized reset CSS rules, system fonts, the `react-datepicker`'s styles, breakpoint CSS variables, and overriding styles for a few components.

Importing this file varies on the stack of the application. For Nextjs apps, the file can be imported in the `_app.tsx` file:

```tsx
// _app.tsx
@import "@nypl/design-system-react-components/dist/styles.css";

import {
  DSProvider,
  TemplateAppContainer,
} from "@nypl/design-system-react-components";
```

Otherwise, it can be imported in the app's main SCSS file:

```scss
// main.scss (for example)
@import "@nypl/design-system-react-components/dist/styles.css";

body {
  // ...
}
```

For apps using parcel, prepend the string import with `npm:` such as :

```scss
@import "npm:@nypl/design-system-react-components/dist/styles.css";
```

4. Use DS components!

Consult Storybook for the list of available components and props that they require.

Here's an example with the `Link` component:

```jsx
import { Link } from "@nypl/design-system-react-components";

function NewComponent(props) {
  return <Link href="https://www.hathitrust.org/">HathiTrust</Link>;
}
```

Sometimes you may have conflicts, perhaps with Next.js' `Link` router component. In that case, you can alias your imports:

```jsx
import { Link as DSLink } from "@nypl/design-system-react-components";
import { Link } from "next/link";

function NewComponent(props) {
  return (
    <DSLink as={Link} type="action" href="#">
      Next Page
    </DSLink>
  );
}
```

## Using Chakra UI Components

The Chakra UI component library has been integrated into the Reservoir Design System. We are still progressing towards using Chakra components and patterns to build DS components, and therefore documentation and features are expected to change. While the implementation details of DS components will use Chakra, the DS package itself will export _some_ Chakra components.

The list of re-exported Chakra components can be found in the main [index.ts](/src/index.ts) file. They include:

- `Box`, `Center`, `Circle`, `Grid`, `GridItem`, `HStack`, `Square`, `Stack`, `VStack`

Find more information about the Design System's internal use of Chakra to create and refactor components in the Storybook documentation page. The following two links have the same information but in different formats for your reading preference:

- [MDX format](/src/docs/Chakra.mdx)
- [Storybook page](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/chakra-ui--docs)

Chakra was integrated into the Design System in version `0.25.0`. For those looking to update to a version greater than or equal `0.25.0`, check out our [Chakra Migration Guide](/CHAKRA_MIGRATION_GUIDE.md).

## Storybook

The Reservoir Design System leverages Storybook to document all the React components and style guidelines. The Storybook documentation for version 3.x can be found [on Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/welcome--docs). For your convenience, the Reservoir Design System components have been organized into logical categories based on both form and function. Please refer to the COMPONENTS section in the Storybook sidebar.

### Documentation Instances

There are currently three main instances of the Reservoir Design System Storybook documentation. There are also "preview" sites that are used to quickly and easily view pull request changes.

**Production**

The production Storybook documentation for DS version 3.x is deployed to [Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/welcome--docs). This is the main instance we use to share the latest stable release of the Reservoir Design System. This documentation site is deployed through [Github Actions](/.github/workflows/gh-pages.yml) only on merges to the `release` and `gh-pages` branches.

As of July, 2021, the Github Pages production site gets deployed every two weeks on the same schedule as npm releases.

**Development**

The development Storybook documentation is deployed to [Vercel](https://nypl-design-system.vercel.app/?path=/docs/welcome--docs). This development site has all the working updates that get merged to the `development` branch. This means that this site is constantly being updated as pull requests are being merged in. This site is used to see the lastest changes during a working sprint before a production release is made.

**Version 2.x**

The Storybook documentation for DS version 2.x is deployed to [Vercel](https://nypl.github.io/nypl-design-system/reservoir/v2). If you are using a DS version less than 3.0, this is the Storybook documentation you should be referencing. While the DS team will continue to support version 2.x, we will not be adding new features or components to this version. We highly recommend updating to version 3.x for design update and bug fixes.

**Version 1.x**

The Storybook documentation for DS version 1.x is deployed to [Vercel](https://nypl.github.io/nypl-design-system/reservoir/v1). If you are using a DS version less than 2.0, this is the Storybook documentation you should be referencing. We highly recommend updating to version 3.x for design update and bug fixes.

**Preview Sites**

Preview Storybook documentation sites are deployed to Vercel on every commit push to every branch in this repository. They follow a pattern such as `nypl-design-system-[hash]-nypl.vercel.app` where `[hash]` is a random hash created by Vercel. This means that the URL varies and that those instances are eventually shut off. They are not meant to be used as long-term sites but rather for reviewing working changes within the team.

### React Component Documentation

When actively developing components or fixing bugs, make sure that the related stories are created or updated. This means updating the respective `[component-name].mdx` file. For information on how to write stories, check out the [Anatomy of a Story](https://github.com/NYPL/nypl-design-system/wiki/Anatomy-of-a-Story) wiki page.

For stand-alone document pages in Storybook, you need to:

1. create the `[page-name].mdx` file in `src/docs/`
2. add the file reference to the `.storybook/main.ts` file in the `stories` array

### React Component Versions

To help consuming application developers understand which version of the DS is required for a specific component, each component story page includes the following:

- when a component was added to the DS
- minimum version of the DS required for the latest version of a component

**Example Component Version Table**

| Component Version | DS Version |
| ----------------- | ---------- |
| Added             | `0.20.1`   |
| Latest            | `0.23.2`   |

### Static Build

_Make sure not to commit the directory created from the following process_.

There should be no need to run the static Storybook instance while actively developing -- it's used exclusively for building out the `gh-pages` environment and deploying it to [Github Pages](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/welcome--docs). In the event that you do run the static Storybook npm script, run:

```sh
$ npm run build-storybook:v3
```

You can then view `/reservoir/v3/index.html` in your browser. _Make sure not to commit this directory_.

## Accessibility

### Development and Storybook

The Reservoir Design System is built with accessibility in mind. By using Chakra UI as our foundational base, the custom DS components built with Chakra have accessibility concerns already implemented. On top of built-in accessible elements, DS components internally work to link labels with input elements, to add correct `aria-*` attributes, to visually hide text but still associate it with the correct element for titles and descriptions, and much more.

We make use of:

- `eslint-plugin-jsx-a11y` for finding accessibility errors through linting and through IDE environments.
- `jest-axe` for running [`axe-core`](https://github.com/dequelabs/axe-core) on _every_ component's unit test file. This is part of the automated tests that run in Github Actions through the `npm test` command.
- `@storybook/addon-a11y` for real-time accessibility testing in the browser through Storybook. _Every_ component has a tab that displays violations, passes, and incomplete checks performed by `axe-core`.

If applicable, DS components have section(s) on accessibility in their Storybook documentation. For example, in the `Slider`'s [Storybook file](/src/components/Slider/Slider.mdx), there are two "Accessibility" sections for each of the two `Slider` types, "single" and "range". This gives an explanation on additional changes we made to make the combination of elements in the `Slider` component accessible.

### Product Requirements

The Reservoir Design System provides accessible stories, but real data can necessitate additional accessibility requirements beyond what we're committed to in our generic, extensible components. To ensure your products' final result is accessible, please adhere to the accessibility requirements put together by NYPL's accessibility coordinator on [Metronome](http://themetronome.co/).

NYPL's Metronome instance is currently password protected. For access to Metronome, please contact NYPL's UX team or Design System team.

## Contributing Quickstart

Follow these steps to setup a local installation of the project:

1. Clone the repo

```sh
$ git clone https://github.com/NYPL/nypl-design-system.git
```

2. Install all the dependencies

```sh
$ npm install
```

3. Run the Storybook instance and view it at `http://localhost:6006`

```sh
$ npm run storybook
```

You can now edit styles or templates in the `src` directory, and they will automatically re-build and update in the Storybook instance. Adding new stories or changing story names will require a page refresh.

Information about active maintainers, how we run reviews, and more can be found in our wiki page for [Contributing to the Design System](https://github.com/NYPL/nypl-design-system/wiki/Contributing-to-the-React-Library).

Follow the [contribution document](/.github/CONTRIBUTING.md) to follow git branching convetions, component creation and update guidelines, testing methodoly, and documentation guidelines.

### Node Version

The DS uses Node version 18.x and we do not support any Node versions below 18.x. The Github Actions for linting, automated testing, deploying to Github Pages, and releasing to npm are all running on Node 18.x.

If you are using `nvm`, the local `.nvmrc` file (using `18.x`) can be use to set your local Node version with the `nvm use` command. Make sure your machine has Node version 18.x installed through `nvm` already.

### Git Branch Workflow

There are currently two main branches for the DS:

- `development` is the main and default branch for the DS. All new feature and bug fix pull requests should be made against this branch.
- `release` is the production branch used to create Github releases, tags, and npm releases.
- `gh-pages` is the branch used to deploy the static Storybook instance to Github Pages, the DS' production Storybook instance.

When a new version of the DS is ready for release, the `development` branch is merged into the `release` branch through a pull request. Once merged, Github Actions will run to deploy the static Storybook as well as publish the new version to npm. Here is a [pull request](https://github.com/NYPL/nypl-design-system/pull/1532) that follows the convention outlined in [How to Run a Release](https://github.com/NYPL/nypl-design-system/wiki/How-to-Run-a-Release).

When working on a new feature or a bug fix:

1. Create a new branch off of `development` with the following naming convention: `[ticket-number]/your-feature-or-bug-name`. For example, if the JIRA ticket is DSD-1234 and the feature is "Add more Animal Crossing examples", then potential branch names can be `DSD-1234/add-more-animal-crossing-examples`, `DSD-1234/more-ac-examples`, or `DSD-1234/animal-crossing-examples`. The ticket number in the branch name is usually more helpful than the text that follows.
2. Create a pull request that points to the `development` branch.
3. If your pull request is approved and _should_ be merged, merge it. This is indicated with the "SHIP IT" Github label. Sometimes, some features must wait and the "DO NOT MERGE" label is added to the pull request.

### Release Candidates

For new big feature updates, we typically want to QA it in the Turbine test app before the real stable release is made. In this case, we create "release candidate" npm packages. This can be based off the feature branch or the `developement` branch once the feature is merged in.

At the moment, this is a manual process. For this example, we will use version `1.5.0` as the new version that will be released.

1. Whether on the feature branch or the `development` branch, the version in the `package.json` file must be updated to include the `-rc` suffix. For example, `1.5.0` becomes `1.5.0-rc`. This is to indicate that this is a release candidate version.
2. Delete the `package-lock.json` file and the `node_modules` directory.
3. Run `npm install` to install all the dependencies and create a new `package-lock.json` file with the updated version.
4. Run `npm publish` to publish the new release candidate version to npm. Make sure you have an npm account, are logged in to npm on your machine, and have the correct permissions to publish to the `@nypl/design-system-react-components` package.

What happens if QA finds a bug in the release candidate version in the Turbine test app?

1. Update or fix the bug in a new branch.
2. Once approved, merge the pull request into the feature branch or the `development` branch.
3. Follow the same steps above to create a new release candidate version but this time the `-rc` suffix should be incremented. For example, `1.5.0-rc` becomes `1.5.0-rc1`.
4. QA the new release candidate version in the Turbine test app.

The release candidate version passed QA and is ready for production! What do we do now?

1. Celebrate.
2. Make sure all the new changes are merged into the `development` branch.
3. Remove the `-rc` suffix from the version in the `package.json` file.
4. Delete the `package-lock.json` file and the `node_modules` directory.
5. Run `npm install` to install all the dependencies and create a new `package-lock.json` file with the updated version.
6. Push the changes to Github and create a new pull request from `development` that points to the `release` branch.
7. Once approved and merged, a Github Action will run that will automatically deploy the static Storybook to Github Pages and publish the new version to npm.

## Typescript Usage

The Reservoir Design System is built with Typescript. Check out the Design System's [Typescript documentation](/TYPESCRIPT.md) for more information on why we chose to build React components in Typescript and the benefits and the gotchas we encountered.

## Unit Testing

The Reservoir Design System runs unit tests with Jest and React Testing Library.

To run all tests once:

```sh
$ npm test
```

If you're actively writing or updating tests, you can run the tests in watch mode. This will wait for any changes and run when a file is saved:

```sh
$ npm run test:watch
```

If you want to run tests on only one specific file, run:

```sh
$ npm test -- src/[path/to/file]
```

For example, to test the `Link` component, run:

```sh
$ npm test -- src/components/Link/Link.test.tsx
```

### Snapshot Testing

The NYPL DS implements snapshot testing with `react-test-renderer` and `jest`. Using React Testing Library to test our components works well to make sure that what the user sees is what the component should be rendering. There are also some behavioral tests that test user interactions. If, however, a component's DOM or SCSS styling was unintentionally updated, we can catch those bugs through snapshot testing.

The `react-test-renderer` package, will create a directory and a file to hold `.snap` files after a unit test is created. Using the `Notification` component as an example, this is the basic layout for a snapshot test:

```tsx
import renderer from "react-test-renderer";

// ...

it("Renders the UI snapshot correctly", () => {
  const tree = renderer
    .create(
      <Notification
        id="notificationID"
        notificationHeading="Notification Heading"
        notificationContent={<>Notification content.</>}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

If this is a new test and we run `npm test`, a [`/__snapshots__/Notification.test.tsx.snap`](/src/components/Notification/__snapshots__/Notification.test.tsx.snap) file is created. This holds the DOM structure as well as any inline CSS that was added.

```tsx
exports[`Notification Snapshot Renders the UI snapshot correctly 1`] = `
<aside
  className="notification notification--standard "
  id="notificationID"
>
  // Removed for brevity...
</aside>
`;
```

Now, if we unintentionally update the `Notification.tsx` component to render a `div` instead of an `aside` element, this test will fail.

If you want to update any existing snapshots, re-run the test script as:

```sh
$ npm test -- --updateSnapshot
```

Each snapshot file also includes a link to its [Jest Snapshot documentation](https://jestjs.io/docs/snapshot-testing) which is recommended to read!

### Storybook Test Addon

Through the [`@storybook/test`](https://www.npmjs.com/package/@storybook/test) plugin, we can see a component's suite of unit tests right Storybook. In the "Addons" panel, a "Test" tab will display all the tests for the current component and whether they pass or fail.

After writing new tests, run `npm run test:generate-output` to create a new JSON file that is used by Storybook. This JSON file contains all the test suites for all the components and Storybook picks this up and automatically combines a component with its relevant unit tests. Make sure to commit this file although new builds on Github Pages will recreate this file for the production Storybook instance.

## CDN

You can also use the Design System styles in your project through the `unpkg` CDN, but not that this is not recommended for production use.

```html
<link
  href="https://unpkg.com/@nypl/design-system-react-components/dist/styles.css"
/>
<script src="https://unpkg.com/@nypl/design-system-react-components/dist/design-system-react-components.cjs" />
<script src="https://unpkg.com/@nypl/design-system-react-components/dist/design-system-react-components.js" />
```
