# Legacy Chakra Migration Guide

**IMPORTANT**: If you are using a DS version greater than 1.0, this guide does not apply.

The first Reservoir Design System (DS) version that includes the Chakra UI library is version `0.25.0`. This guide is meant for those who are using a version less than `0.25.0` and want to migrate to a version greater than or equal to `0.25.0`.

If you would rather read documentation on the Design System's internal use of Chakra, check the Storybook documentation page. The following two links have the same information but in different formats for your reading preference:

- [MDX format](/src/docs/Chakra.mdx)
- [Storybook page](https://nypl.github.io/nypl-design-system/reservoir/v3/?path=/docs/chakra-ui--docs)

| Table of Contents |                                                       |
| ----------------- | ----------------------------------------------------- |
| 1.                | [Phase 1 - version 0.25.0](#phase-1---version-0.25.0) |
| 2.                | [Phase 2 - version 0.25.1](#phase-2---version-0.25.1) |
| 3.                | [Version 0.25.2](#version-0.25.2)                     |

## Phase 1 - version 0.25.0

The DS first included the Chakra UI library in version `0.25.0` and we call this the "Phase 1" release. This version includes the Chakra integration, re-exported Chakra components, and the first refactor of DS components to use Chakra internally.

### DS Components with Chakra

The following is a list of DS components in this version that internally use Chakra. They also stopped using BEM for styling.

- Button
- Tabs
- Checkbox
- Radio
- RadioGroup
- Heading

### Re-exported Chakra Components

The full list of re-exported Chakra components can be found in the main [index.ts](/src/index.ts) file. This version includes:

- `Box`, `Center`, `Circle`, `HStack`, `Square`, `Stack`, `VStack`

### Design System Initialization

In previous iterations, components could be used by importing them directly into your Javascript or Typescript file such as:

```tsx
import { Button } from "@nypl/design-system-react-components";
```

Starting with the "Phase 1" release, the NYPL DS theme needs to be initialized in your application in order for styles to be rendered correctly. At the root level of your application, import the `DSProvider` wrapper component and render your application inside of it.

```tsx
import { DSProvider } from "@nypl/design-system-react-components";
// ...
const ApplicationComponent = (props) => {
  // ...
  return (
    <DSProvider>
      <header>...</header>
      <div className="my-app">
        // ...
        {children}
      </div>
      <footer>...</footer>
    </DSProvider>
  );
};
```

DS components rendered outside of the DSProvider wrapper component will not pick up the NYPL theme and not render their styling properly.

### Styling

All components have their own styles which you should not need to modify or update. If your application has designs that can’t be rendered with DS components, please reach out to the NYPL UX/DS team. It’s possible a component variant has not been implemented or the design needs to be updated.

For older DS components that do not use Chakra, the existing DS SCSS files are still necessary. The main and minified `styles.css` file can be imported just as before in your main SCSS or CSS file:

```scss
import "~@nypl/design-system-react-components/dist/styles.css";
```

The unminifed `resources.scss` file can be imported just as before:

```scss
import "~@nypl/design-system-react-components/dist/resources.scss";
```

NOTE: the above is assuming your application is using webpack. If another bundler is used, you may need to remove the tilde at the beginning of the string import.

### Prop names

As we implemented Chakra in the Design System, we decided to use Chakra’s convention for prop names. This mostly affects prop names that change the component’s state. These prop name changes predominantly impact, but are not limited to, `form` components:

| Old Prop Name | New Prop Name |
| ------------- | ------------- |
| disabled      | isDisabled    |
| errored       | isInvalid     |
| required      | isRequired    |
| errorText     | invalidText   |
| checked       | isChecked     |

Another significant update for Chakra-based components is the removal of `aria-*` props. Components are still accessible. The difference is that now, the DS components handle creating and adding the appropriate `aria-*` props to the HTML elements.

## Phase 2 - version 0.25.1

The DS version `0.25.1` is the "Phase 2" release. This further converts DS components to internally use Chakra components and styling. Make sure to follow the guide for [Phase 1 - version 0.25.0](#phase-1---version-0.25.0) for this version as well.

### DS Components with Chakra

The following is a list of DS components in this version that internally use Chakra. They also stopped using BEM for styling.

- Accordion
- Breadcrumbs
- CheckboxGroup
- Form
- Hero
- Icon
- Label
- Link
- SearchBar
- Select
- SimpleGrid
- StatusBadge
- "Template" components which includes:
  - Template, TemplateHeader, TemplateBreakout, TemplateContent, TemplateContentTop, TemplateContentPrimary, TemplateContentSidebar, TemplateFooter
- TemplateAppContainer
- Text
- TextInput

### Re-exported Chakra Components

The full list of re-exported Chakra components can be found in the main [index.ts](/src/index.ts) file. This version includes:

- `Grid`, `GridItem`

## Version 0.25.2

After version `0.25.1` or the "Phase 2" release, we are dropping the "Phase" naming convention since using Chakra is no longer "new" and the general patterns and convention for creating new components and refactoring existing components are defined. This version includes fewer components but more documentation. We are also working towards building patterns for more complicated components, especially components that are made up of multiple DS components. Examples include the `Card` and `DatePicker` components which will be released in the subsequent release.

### DS Components with Chakra

The following is a list of DS components in this version that internally use Chakra. They also stopped using BEM for styling.

- HelperErrorText
- HorizontalRule
- List
- Notification
- VideoPlayer

### DS Components with big updates

- SearchBar - updated so that the invalid text in the Select and TextInput components are hidden
- Tabs - is now complete with the mobile carousel feature
