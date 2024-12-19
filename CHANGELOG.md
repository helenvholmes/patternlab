# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Currently, this repo is in Prerelease. When it is released, this project will adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
========

## Prerelease

## 3.5.1 (December 19, 2024)

### Adds

- Adds `jest-transformer-svg` to mock SVGs more accurately in our tests

### Fixes

- Fixes `TextInput`'s conflicting internal and external ref values for the clearable button focus management.

## 3.5.0 (December 5, 2024)

### Adds

- Adds the `"SubNav"`component.
- Adds the `useScrollFadeStyles` hook.

### Updates

- Updates the `MultiSelect` component to add `itemCount` as a data property to the `items` prop to render the item count for an option.

### Fixes

- Fixes issue where focus indicator was being cut off in places in the `Template` component.

## 3.4.4 (November 20, 2024)

### Adds

- Fixes a styling issue in the `Header`'s list to make it stricter.

## 3.4.3 (November 18, 2024)

### Adds

- Adds the NYPL Header as a DS component as a temporary solution for a specific application. It's only meant to be used internally and teams are still encouraged to use the `nypl-header-app`.

## 3.4.2 (November 7, 2024)

### Adds

- Adds the `"contentFilterRelease"` option to the `Icon` component.
- Adds the `"socialX"` option to the `Icon` component.
- Adds the `heading7` and `heading8` to the font size design tokens.
- Adds the `heading7` and `heading8` options for the `size` prop in the `Heading` component.

### Updates

- Updates Storybook and related dependencies to version 8.3.6.
- Updates the `Link` component to prevent line breaks.
- Updates the `SocialMediaLinks` component to support the `"socialX"` icon.

## Fixes

- Fixes spacing issues and dark mode color styles in the `Table` component.

## 3.4.1 (October 24, 2024)

### Adds

- Adds the `"decorativeBookBroken"` option (for error pages) to the `Icon` component.
- Adds the `"xxxxlarge"` and `"xxxxxlarge"` size options for the `Icon` component.
- Adds the `"2xlarge"`, `"3xlarge"`, `"4xlarge"`, and `"5xlarge"` sustainable size options for the `Icon` component.

### Updates

- Updates `Select` in the `SearchBar` component to allow long option titles before truncation.
- Updates the `ProgressIndicator` component to add the `labelPlacement` prop to allow for custom placement of a label for circular indicators.
- Updates image props in the `Hero` component to allow custom image components.
- Updates Vite from `5.2.8` to `5.2.14` to fix a security vulnerability.

### Removes

- Removes unused dependencies, two of which were causing npm vulnerabilities.

## 3.4.0 (October 2, 2024)

### Updates

- Updates invalid text in the `SearchBar` component to include "There was a problem. " prefix.
- Updates the `MultiSelect` component to add interaction tests.
- Increases the z-index of the `FeedbackBox`'s `Drawer` component so it displays above all other elements on a page.
- Updates the `Table` component to add the `isScrollable` prop to enable horizontal scrolling.
- Updates the `Table` component to add the `columnStyles` prop to allow for custom column styles (i.e. width, text alignment, etc.).
- Updates the `Table` component to add the `tableTextSize` prop to set the size of the text within the table.
- Updates the `Table` component to add the `titleText` and `showTitleText` props to control the `<caption>` element and `aria-label` attribute.
- Updates the styles for the `Template` component to better accommodate the horizontal scrolling in the `Table` component.

## 3.3.2 (September 19, 2024)

### Updates

- Lowercases the 'r' of '(required)' in labels and placeholders where necessary in order to align with sentence case guidelines.
- Updates the `CheckboxGroup`, `DatePicker`, `FeedbackBox`, `Label`, `RadioGroup`, `SearchBar`, `Select`, `Slider`, and `TextInput` component to use a lowercase 'r' for '(required)' in labels and placeholders in order to align with sentence case typography guidelines.

### Fixes

- Passes the `fallbackSrc` and `onError` properties to the `Card`'s `imageProps` prop object.
- Fixes issue with `HelperErrorText` where, if text value was not a string, necessary styles weren't applied.

## 3.3.1 (September 5, 2024)

### Updates

- Updates `Tooltip` component with `placement` and `offset` props for custom positioning.

### Fixes

- Fixes a duplicate `id` issue in the `Image` component. This happened when an aspect ratio value rendered a wrapper div with the same `id` as the `img` element. This was not picked up by internal accessibility tests but in a consuming application.

## 3.3.0 (August 29, 2024)

### Adds

- Adds development guide for Conditional Viewport
- Adds the `FilterBarPopup` compoonent and `useFilterBarPopup` hook.

### Updates

- Updates the `FilterBarInline` component to apply `closeOnBlur` to `MultiSelect` components when `layout="row"`.
- Updates the `Breadcrumbs` component props to include `customLinkComponent` and `linkProps`.
- Updates the `Banner` component to allow for HTML content in the `content` prop when passed as a string.
- Updates the `SearchBar` component styles for mobile viewports.
- Updates the `Select` component to accept a `defaultValue` prop to set initial value of uncontrolled components.
- Updates the legend in the `MultiSelect`'s `CheckboxGroup` to use the `buttonText` prop value for better accessibility context.
- Updates the `Menu` component to add the `showSelectionAsLabel` prop and improve the `aria-label` values.
- Updates the `Image` component to default the `alt` attribute to an empty string if no value is passed.

### Removes

- Removes `imageProps.alt` missing warning message from `FeaturedContent` as the prop is not always required.

## 3.2.0 (July 25, 2024)

### Adds

- Adds the `FilterBarInline` component.
- Adds refined `NewsletterSignup` component with updated props.
- Adds refined `SocialMediaLinks` component with updated props

### Updates

- Updates Storybook and related npm packages to version `8.1.11`. Does not affect any DS component.
- Updates `Menu` component with new `showSelectionAsLabel` prop and `aria-label` behavior.
- Updates the `Banner`, `Button`, `ButtonGroup`, `DatePicker`, `FeaturedContent`, `FeedbackBox`, `Fieldset`, `HelperErrorText`, `Label`, `SkipNavigation`, and `StyledList` components to export all types and prop interfaces.

## 3.1.7 (July 3, 2024)

### Adds

- Adds Storybook interaction tests for the `CheckboxGroup`, `DatePicker`, `FeedbackBox`, and `Slider` components.
- Adds `digitalCollections` color variant to the `Breadcrumbs` component.
- Adds `closeOnBlur` prop to the `MultiSelect` component which, when set to true, closes the component if it loses focus.

### Updates

- Updates base font stack to only `system-ui` and `sans-serif`.
- Updates the `Accordion` component to close panel when element within panel is focused and "esc" key is pressed.

## 3.1.6 (June 20, 2024)

### Adds

- Adds Storybook interaction tests for `Searchbar`, `Select`, and `Radiogroup` components.

### Updates

- Updates how links are styled within the `Heading` component.
- Updates `jest` related npm packages for security patches.

### Fixes

- Fixes broken Github Action for release tags.

## 3.1.5 (June 6, 2024)

### Adds

- Adds the following npm packages: `jest-transformer-svg`, `@storybook/addon-designs`, and `@storybook/test`.
- Adds Storybook interaction tests for `Select`.
- Adds Storybook interaction tests for `RadioGroup`.

### Updates

- Updates the following packages:
  - Storybook main package and related libraries to `8.0.8`.
  - `remark-gfm` to `4.0.0`.
  - `vite` to `5.2.8`, `@vitejs/plugin-react` to `4.2.1`, and `vite-plugin-svgr` to `4.2.0`.
- Updates how SVGs are imported into `LogoSvgs.tsx` and `IconSvgs.tsx`.
- Updates Storybook internal link and heading styles and enables the hash heading URL linking.

### Removals

- Removes the following packages: `downshift`, `tough-cookie`, `@storybook/testing-library`, `storybook-addon-designs`, and `@svgr/webpack`.

### Updates

- Exports `useMediaQuery` and `chakra` from Chakra UI.
- Updates the `TextInput` and `SearchBar` components to better associate the input element to the entire component's helper text.

## 3.1.4 (May 23, 2024)

### Adds

- Adds `showRowDividers` prop to show/hide row dividers for the `List` `"dl"` variant.

### Updates

- Updates the `Accordion` component to close focused panel when "esc" key is pressed.

### Fixes

- Fixes the z-index issue in the `MultiSelect` component's selected item button.
- Fixes the `Checkbox` positioning so it is visible when it is focused in a scrollable container.
- Fixes a `Breadcrumbs` snapshot test that was duplicated and now has the appropriate `"locations"` variant.

## 3.1.3 (May 15, 2024)

### Adds

- Adds new `type` prop to the `Modal` component with `"default"` and `"confirmation"` variants.

### Fixes

- Fixes the desktop styling flicker in the `ButtonGroup` component.

## 3.1.2 (May 9, 2024)

### Adds

- Adds the `id` prop to the `Hero`, `HorizontalRule`, `SkeletonLoader`, `TemplateAppContainer`, and `Text` components.
- Adds the `id` property to the `imageProps` prop object in the `Card` component.

### Updates

- Updates the `Heading` component to allow more HTML attributes as props.

### Fixes

- Fixes an issue with the `Table` component where it rendered the headings twice until the component loaded and applied the desktop styles. This was done by adding inline responsive styles and removing the use of the `useWindowSize` hook.

## 3.1.1 (April 25, 2024)

### Adds

- Adds docs for `"Visited State Patterns"` to the `Link` component story page.
- Adds the `ui.warning.tertiary` color token in order to have a light mode `"warning"` color option that meets the WCAG 2.1 AA color contrast standard.
- Adds `fallbackSrc` and `onError` props to the `Image` component.
- Adds the `fallbackSrc` and `onError` properties to the `imageProps` prop for the `Hero` component.
- Adds the `isDarkText` prop to the `Hero` component.

### Updates

- Updates the placeholder value for the search field within the `MultiSelect` component.
- Updates the background colors for the `"noBrand"` variant of the `Button` component.
- Updates the hex values for the `ui.warning.primary` and `ui.warning.secondary` color tokens.
- Updates the `Banner` and `StatusBadge` components to use the `ui.warning.tertiary` color for bertter accessibility in the `"warning"` variant.
- Updates the styles for the UI colors, text treatment and `Clear all` button in the `TagSet` component.
- Updates the component category for the `TagSet` component to `"Content Display"`.
- Updates placeholder images on story pages and tests to use the `getPlaceholderImage` utility function which provides NYPL images.

### Fixes

- Adds workaround to `Hero` and `FeaturedContent` to fix Chakra bug that causes certain image URLs to not render through the `background-image` CSS property.

## 3.1.0 (April 11, 2024)

### Adds

- Adds the `"actionLightbulb"` option to the `Icon` component.
- Adds the `Banner` component.
- Adds the `MultiSelectGroup` v2 component.

### Updates

- Updates the `DatePicker`, `Select`, `Slider`, and `TextInput` components to reduce the spacing between the field label and the field itself from `"8px"` to `"2px"`.
- Updates the `Hero` component with conditional logic to handle how the `foregroundColor` and `isDarkText` props are used.

## 3.0.1 (March 28, 2024)

### Adds

- Adds the `"editorMode"` option (pencil) to the `Icon` component.
- Updates the `ul` bullet color in the `List` component.
- Adds the `Errors` page to the `Accessibility Guide` section of Storybook.
- Adds the `@storyook/addon-interactions` addon to Storybook and `@storybook/test` for writing interaction tests.

### Updates

- Updates default heading size to `heading4` on `Modal` component.
- Updates mobile styles for the `SocialMediaLinks` component

## 3.0.0 (March 14, 2024) React 18 / Chakra 2.8

### Adds

- Adds `5%` and `10%` opacities for the semantic colors in the color pallette.
- Adds the `Menu` component.
- Adds the `MultiSelect` v2 component.
- Adds the `useMultiSelect` hook.

### Updates

- Updates the repo to use Node 18.
- Updates to React 18 and Chakra 2.8.
- Updates the `StatusBadge` component to add the `type` prop.
- Updates the `StatusBadge` component to change the UI styles.
- Updates the base `Modal` component to use the `useDSHeading` hook internally to render a DS Heading for the `headingText` prop.
- Updates the `Heading` component to use native Chakra responsive styles to handle the font sizes of the component's internal `heading`, `overline` and `subtitle` elements. This also resolves the flashing font size bug that is most noticeable on slower internet connections.
- Updates the `Text` component to use native Chakra responsive styles for the font sizes of the `subtitle1` and `subtitle2` variants.
- Updates the `NewsletterSignup` component to follow NYPL recommendations and use more direct language for the email field error message.
- Updates the default export to include `FocusLock`, `useStyleConfig`, and `useMultiStyleConfig` from Chakra UI.
- Updates the default export to include the test helper "MatchMedia".
- Updates the `Accordion` component to include the `ariaLabel` and `buttonInteractionRef` props.
- Updates the `Tabs` component to use horizontal scrolling and arrow buttons step through tabs in mobile view.

### Fixes

- Removes console warnings from the `CheckboxGroup` component when a non-`Checkbox` component is passed as a child.
- Fixes the responsive styles related to the image in the `FeaturedContent` component.

### Breaking Changes

- Removes the `NewsletterSignup` and `SocialMediaLinks` components.
- Updates the `TagSet` component to allow for more properties in the tag data object. The `onClick` function now returns the entire data object in the callback argument instead of just the tag label.
- Updates the `Link` component to follow Chakra's patterns for usage with application framework routing systems, as well as a general refactor. Usage with Next.js has been updated.

## 2.1.6 (February 22, 2024)

### Updates

- Updates focus ring color in `Notification` and `Breadcrumbs` to match color of text.
- Updates the `StatusBadge` styles so that if an icon is passed, the icon and text line up with one another

### Fixes

- Fixes a styling issue on the range `DatePicker` for the month and year types
  where the in-range selected date values did not have the correct DS colors.
- Fixes the desktop font size for the `"heading5"` variant in the `Heading` component.

## 2.1.5 (February 5, 2024)

### Adds

- Adds the `"navigationMoreVert"` option (vertical ellipsis) to the `Icon` component.

### Updates

- Updates `Tabs` to be scrollable when the width of the tab set is greater than the viewport.
- Updates the required comment field so it cannot be submitted when empty for the `FeedbackBox` component.
- Updates the `Heading` component to use a custom `@media query` method to handle the responsive `font-size` styles.
- Updates the `Text` component to use native Chakra responsive styles for the font sizes of the `subtitle1` and `subtitle2` variants.

### Fixes

- Fixes the focus ring style for the open button in the `FeedbackBox` component.
- Forcibly focuses on the open button when the `FeedbackBox` form is closed to ensure focus is not lost.

## 2.1.4 (January 4, 2024)

### Adds

- Adds optional `placeholder` and `placeholderTo` props to the `DatePicker` component.
- Adds the `"actionDelete"`, `"actionHome"`, `"actionLockClosed"`,
  `"actionPayment"`, `"communicationCall"`, `"communicationChatBubble"`, and `"communicationEmail"` options to the `Icon` component.

### Updates

- Updates the `DatePicker`'s `initialDate` and `initialDateTo` props to accept an empty string.

### Fixes

- Fixes bug where month and year `Datepicker` calendars were rendering vertically rather than horizontally.

## 2.1.3 (December 7, 2023)

### Adds

- Adds the `hasVisitedStyles` prop to `Link` which is used to include or omit the visited state styles. Default value is true.
- Adds the `useDSHeading` hook to render a default H2 heading or a custom heading element.
- Adds the `sizeBasedOn` prop to the `Image` component.
- Adds the `isDarkBackgroundImage` prop to the `Hero` component.

### Updates

- Removes `disabled` variant from `Link` theme file, as it isn't being used.
- Updates the `font-weight` to `"regular"` for the `subtitle1` and `subtitle2` text styles.
- Updates the `"digitalCollectionsBlack"` variant of the `Logo` component to use NYPL color design tokens.
- Updates the following components to accept `JSX.Element` type values into their `"title"` prop: `List`, `NewsletterSignup`,
- Updates the following components to accept `JSX.Element` type values into their `"headingText"` prop: `AlphabetFilter`, `AudioPlayer`, `ComponentWrapper`, `SearchBar`, `VideoPlayer`
- Updates the `Notification` component to accept `JSX.Element` type values into its `"notificationHeading"` prop.
- Updates the `StructuredContent` component to accept `JSX.Element` type values into its `"headingText"` and `"calloutText"` props.
- Updates the `FeaturedContent` component by adjusting the spacing in the `"fullScreen"` variant to better align the component text content with the page text content.
- Updates the `"campaign"` variant of the `Hero` component to improve the spacing around the component.
- Updates the `Card` component so that it accepts the `imageProps.isLazy` prop and passes it to its internal `Image` component.

## Fixes

- Adds z-index on hover to the `SearchBar`'s select icon so it no longer disappears.
- Adds z-index to the `DatePicker`'s calendar container so that the helper text does not shift when the calendar opens.

## 2.1.2 (November 9, 2023)

### Adds

- Adds the `sizeBasedOn` prop to the `Logo` component.
- Added the `autoComplete` prop to the `TextInput` component for setting the "autocomplete" attribute manually.

### Updates

- Updates max version for Chakra UI to `1.8.9` for minor bug fixes.
- Updates the layout for the `"campaign"` variant of the `Hero` component to have consistent padding on its left and right sides.
- Updates the `getSectionColors` function to also return dark mode color variants.
- Updates the `NewsletterSignup` component's `newsletterSignupType` prop to render proper dark mode variant colors.

## 2.1.1 (October 26, 2023)

### Adds

- Adds a changelog to the story pages for the `Heading` component.

### Updates

- Updates the `Heading` component to set the `aria-roledescription` value as `"subtitle"` (a more familiar and recognizable value) for the `overline` element.
- Updates the `FeedbackBox` and `NewsletterSignup` components to set the `tabindex` on the internal elements to `"-1"`.
- Updates `DatePicker`'s `TextInput` to always have an `aria-label` attribute that tells screen reader users how to access the calendar.
- Updates Storybook to `v7.5.1`.

### Fixes

- Fixes a bug in the `Hero` component where custom background colors were not rendering properly in dark mode for the `"campaign"` and `"tertiary"` variants.

### Deprecates

- Deprecates the `"secondary"` and `"fiftyFifty"` variants of the `Hero` component.

## 2.1.0 (October 18, 2023)

### Adds

- Adds the `ComponentChangelogTable` component.
- Adds a changelog to the story pages for the `DatePicker`, `FeedbackBox`, `Hero`, `Slider`, and `TextInput` components.
- Adds the `FeaturedContent` component.
- Adds the `NewsletterSignup` component.

### Updates

- Temporarily renaming `FilterBar`, `MultiSelect`, `MultiSelectGroup`, `useMultiSelect`, and `useFilterBar` Storybook page files so they don't show up in the Storybook sidebar.
- Updates the `Slider` component to use appropriate `aria-label` values for the slider thumbs and text input fields.
- Updates `TextInput` so it no longer incorrectly overwrites the `aria-describedby` value to undefined when part of the `DatePicker` component.
- Updates `DatePicker` so that focus remains on input after value is changed.
- Updates the `FeedbackBox` component to remove the underline on the component's `Privacy Policy` link.
- Updates `DatePicker` to pass a `additionalHelperTextIds` to its `TextInput` if needed so that the `aria-describedby` value can be associated with all relevant `helperText`s.

### Fixes

- Fixes an issue with `backgroundColor` and `foregroundColor` props not prioritizing the passed design token values for the `Hero` component.

## 2.0.1 (September 28, 2023)

_NOTE_: Version number `2.0.0` was previously released in 2019 and is marked as deprecated in npm. The first stable relase for Reservoir v2 is `2.0.1`.

## 2.0.0 (September 28, 2023)

### Breaking Changes

- This update introduces a number of visual breaking changes related to typography styles.
- Removes the `FilterBar` and `MultiSelect` components.
- Removes the `useFilterBar` and `useMultiSelect` hooks.

### Adds

- Adds the `isUnderlined` prop to the `Link` component.
- Adds the `"standalone"` variant to the `Link` component.
- Adds `NYPL Patterns` to the `Links Accessibility Guide`.
- Adds the `SocialMediaLinks` component.

### Updates

- Updates underline styles of the `Link` component.
- Updates the hex value for the `Link Primary` color style.
- Updates the `Link` component so that non-button variants change color once visited.
- Updates the `Link` component to explicitly assign the text color for the `"buttonPrimary"` variant `hover` state.
- Updates all components that render text to use the `Typo2023` color scheme.
- Updates the base styles to use the `Typo2023` styles.
- Updates all components to implement the `Typo2023` styles.
- Updates the `Breadcrumbs`, `Card`, `Heading`, `Pagination`, and `SkipNavigation` components to implement the `Typo2023` link patterns.

## 1.7.3 (September 13, 2023)

### Updates

- Updates the `Logo` component to include variants for `NYC Public Schools`.
- Updates the `Icon` component to include variants for `"sunFull"` and `"moonCrescent"`.
- Updates `Breadcrumbs` default design token to support apps using both newer and older DS versions.

## 1.7.2 (August 31 , 2023)

### Adds

- Adds the `"actionIdentity"`, `"actionIdentityFilled"`, `"actionSearch"`, `"mapsPlace"`, `"socialSpotify"`, and `"socialVimeo"` options to the `Icon` component.

### Updates

- Updates `List` styling so the bottom border on description lists matches other borders.
- Updates type `IconRotationTypes` to `IconRotations`.`IconRotationTypes` will still work for now, but is deprecated and will be removed in a later version.
- Updates `Modal` component documentation.

## 1.7.1 (August 17, 2023)

### Adds

- Adds the `"TikTok"` option to the `Icon` component.
- Adds the `role` prop to the `Text` component.
- Adds the `backdropBackgroundColor` prop to the `Hero` component for the `"campaign"` `heroType` variant.

### Updates

- Updates the ARIA attributes for the `overline` and `subtitle` elements in the `Heading` component.
- Updates the docs for the `Text` component and the `Typography Style Guide` to include more information about the `Typography 2023` updates.

## 1.7.0 (July 20, 2023)

### Adds

- Adds the `screenreaderOnlyText` prop to the `Button` and `Link` components.

### Updates

- Updates the existing `heading` typography styles to add new default styles options for native heading elements, including `h1` thru `h6`.
- Updates the existing `heading` typography styles to add new size options, including `display1` and `heading1` thru `heading6`.
- Updates the existing `text` typography styles to add `overline` and `subtitle` options.
- Updates the `Heading` component to include the new `heading` typography styles.
- Updates the `Text` component to include the new `text` typography styles.
- Updates the `Typography` docs to include the new options added to the `heading` and `text` typography styles.
- Updates the `Design Tokens` docs to include the new tokens added to the `heading` and `text` typography styles.
- Updates the `Heading` component to include `overline` and `subtitle` elements.
- Updates the spacing gap between main content in the `TemplateAppContainer` component.
- Updates the background color of the "clear" button in Dark Mode for the `TextInput` component. This also affects the `SearchBar` component when a clear button is present in the `TextInput` component.
- Updates the spacing of the text in the `HelperErrorText` component.
- Updates the `ComponentWrapper` component to conditionally render the `HelperErrorText` component.
- Updates the version of the `react-datepicker` npm package.
- Updates the right-to-left visual display for the `Accordion` component.

## 1.6.1 (June 22, 2023)

### Adds

- Adds `"xxxsmall"` size (32px width) to the `Image` component.
- Adds the `"connect"` section hues to the light and dark color palettes.
- Adds the `"connect"` color variant to the `Breadcrumbs` component.
- Adds internal `ChakraProvider` component to be able to conditionally include CSS styles through the `resetCSS` and `disableGlobalStyle` props.
- Adds a `theme` prop to the `DSProvider` to merge in an additional theme file if necessary; this is to support to the `Header` and `Footer` components in the NYPL Header App.
- Adds `Managing Focus` page to the `Accessibility Guide` in Storybook.

### Updates

- Updates the `Button` component to increase the internal spacing between the button text and an icon.
- Updates placeholder images to come from placekitten, rather than placeimg, which is being deprecated.

## 1.6.0 (June 8, 2023)

### Vite Foundation Update

This updates replaces TSDX with Vite for the build tool. This allows the Reservoir DS library to be easily maintained and allow individual npm packages to be updated for security patches and general bug fixes. At the same time, the local and production build process are now much faster. Specific updates and changes:

- Node 16 is the recommended version to use and it is set in the `.nvmrc` file.
- Github Actions are updated to use Node 16. The Typecheck workflow is removed since that's covered by the build script. Using Node 16 also allows the Vercel deployments to work without the the added `NODE_OPTIONS` flag in the npm build script.
- Vite is used to build the library and start a development build.
- Rollup plugins are removed in favor of Vite plugins.
- Gulp and the `resources.scss` file are removed. Other related `.scss` files were also removed since they are not used (in the library or in consuming applications).
- ESLint packages are updated.
- Jest is updated along with its config file. `jest-environment-jsom` and `ts-jest` are used now. Snapshot test output files have _slightly_ different rendered HTML syntax.
- The build is _still_ outputting CommonJS and ES module dist files, but the final name is slightly different. This does not affect how the DS is imported into any application.
- Due to moving to ESM as the default for the repo, types are exported separated from components in the main `/src/index.ts` file. This doesn't affect the final build but just how components, interfaces, and types are exported.
- Storybook is updated to 7.0.18 which is a major version.
- All Storybook component documentation have been updated to use the Storybook 7 CSF format, along with MDX for the custom documentation pages.

### Adds

- Adds the `target` prop to the `Link` component.

### Removals

- Removes the `Header` and `Footer` components from the DS. These components will be moved and maintained in the [nypl-header-app](https://github.com/NYPL/nypl-header-app).

## 1.5.4 (May 4, 2023)

### Updates

- Updates the `Select` component to use a set text color value.

### Fixes

- Fixes the focus rectangle around the `TextInput` clear button so it is centered on both desktop and mobile views.

## 1.5.3 (April 28, 2023)

### Adds

- Adds `ui.gray.semi-medium` and `ui.gray.semi-dark` to the color palette.
- Adds `Audio and Video` page to the `Accessibility Guide` section of Storybook.
- Adds "Pinterest" and "SoundCloud" options to the `Icon` component.

### Updates

- Updates the `Link` component to include the rel attributes "noopener" and "noreferrer" on the "external" variant.
- Updates the `dark.ui.border.default` design token to use `ui.gray.semi-dark` as its base.
- Updates the `dark.ui.border.hover` design token to use `ui.gray.semi-medium` as its base.
- Updates the `dark.ui.disabled.primary` design token to use `ui.gray.dark` as its base.
- Updates the `dark.ui.disabled.secondary` design token to use `ui.gray.x-dark` as its base.
- Updates the `Toggle` component to use `ui.gray.semi-dark` color for its background color.
- Updates the `List` and `StyledList` components to use `ui.gray.semi-dark` for the bullet color in the "ul" variant.
- Updates the `Slider` component to use `ui.bg.active` for the color of the track bar in the "disabled" state.
- Updates the `Breadcrumbs` component so that the last breadcrumb item is now a link. If the link text is too long, it will get truncated and the DS `Tooltip` component will be used to display the full text in a tooltip when the text is hovered.

### Fixes

- Fixes a `border-radius` formatting issues on the hover state of the search field for the dark mode version of the `Header` component.
- Fixes a `color` issue on the hover state of the links for the dark mode version of the `Footer` component.
- Fixes a `border-color` issue for the dark mode version of the `FeedbackBox` component.
- Fixes a bug in `TextInput` that prevented the external clearing of `value`.

## 1.5.2 (April 6, 2023)

### Updates

- Updates the `aria-label` and `title` props in the `Tabs` component's button and icon elements to be more descriptive.
- Updates `useCloseDropDown` hook to be exported for nypl-header-app.
- Updates the `Logo` component to include "black" and "white" variants for `NYCDOE`.

## 1.5.1 (March 23, 2023)

### Updates

- Updates the `Button` component to use a transparent background for the default state of the "secondary" variant.
- Updates the `Hero` component so that the height of the image in the "campaign" and "fiftyFifty" variants will grow and shrink based on the text content.
- Updates the `SearchBar` component to include `defaultValue` as a prop in `textInputProps`.

### Removes

- Removes the `Color Mode` docs page from Storybook due to the addition of the `Supporting Dark Mode` docs page.

### Fixes

- Removes the `Slider` component's internal state update function (`setCurrentValue`) from Chakra's own `RangeSlider` component's `onChangeEnd` prop function. This fixes an issue where both Chakra's `onChange` and `onChangeEnd` prop functions were being called regardless of whether they were passed to the DS `Slider` component or not. Since Chakra's `onChange` function will always be called, the internal state function is kept. This ensures that there is no multiple calls or loop of state update calls when using keyboard controls to change the range slider's value.

## 1.5.0 (March 16, 2023)

### Adds

- Adds `brand` as a `breadcrumbsType` to the `Breadcrumbs` component.
- Adds `dark` color mode support for `background-color` and `color` global styles.
- Adds `dark` color mode support for the `HelperErrorText` and `StatusBadge` components.
- Adds `dark` color mode support for the `Button`, `Checkbox`, `DatePicker`, `ProgressIndicator`, `Radio`, `SearchBar`, `Select`, `Slider` and `Toggle` components.
- Adds `dark` color mode support for the `Card` and `Hero` components.
- Adds `dark` color mode support for the `Heading` and `List` components.
- Adds `dark` color mode support for the `Footer`, `Header`, `HorizontalRule` and `Table` components.
- Adds `dark` color mode support for the `Notification`, `ProgressIndicator`, and `SkeletonLoader` components.
- Adds `dark` color mode support for the `Breadcrumbs`, `Link Types`, and `Pagination` components.
- Adds `dark` color mode support for the `Accordion`, `Modal`, `Tabs`, and `Tooltip` components.
- Adds `dark` color mode support for the `AlphabetFilter`, `AudioPlayer`, and `TagSet` components.
- Adds `dark` color mode support for the `FeedbackBox` and `StyledList` components.
- Adds `dark` color mode support for the `FilterBar` and `MultiSelect` components.
- Adds `Supporting Dark Mode` under the `Development Guide`.

### Updates

- Updates background color values available in Storybook.
- Updates the hex value for `dark.ui.error.primary`.
- Updates the `Design Tokens Style Guide` to include more detailed information about the available tokens.

### Deprecates

- Deprecates the `darkMode` prop in the `ProgressIndicator` component.

## 1.4.2 (March 2, 2023)

### Updates

- Updates the `Logo` component to include "black" and "white" variants for `Digital Collections`.

### Fixes

- Updates the `Slider` component's `currentValue` state to use the `useStateWithDependencies` hook.

## 1.4.1 (February 9, 2023)

### Adds

- Adds the `pattern` prop to the `TextInput` component.
- Adds documentation page "Dynamic Content" to the `Accessibility Guide`.
- Adds the `isRenderedText` prop to the `HelperErrorText` component.

### Updates

- Adds a third radio button to the `Header` component, separating search options between the Circulating Catalog, Research Catalog, and the NYPL.org website.
- Temporarily removes the "log in" state from the `Header` component, the feature to read auth cookies, and the patron's name when logged in, and the log out link.
- Truncate breadcrumb text if beyond 40 characters then add ellipsis at the end. If the breadcrumb text is truncated, the DS `Tooltip` component is used to display the full text in a tooltip when the text is hovered.
- Updates the `SearchBar`'s `textInputProps` prop to include the following props to pass to the `TextInput` component: `isClearableCallback`, `max`, `maxLength`, `min`, and `pattern`.
- Updates how the `CheckboxGroup`, `ComponentWrapper`, `DatePicker`, and `RadioGroup` components internally render the `HelperErrorText` component. The update in the `ComponentWrapper` component affects the `AudioPlayer`, `Checkbox`, `Radio`, `SearchBar`, `Select`, `Slider`, `TextInput`, `Toggle`, and `VideoPlayer` DS components, each of which render helper or error text.
- Updates the `MultiSelect` component so it closes when the "escape" key is pressed.
- Updates where the focus is set in the `MultiSelect` "dialog" variant after the "Apply" button is clicked.
- Updates where the focus is set in the `MultiSelect` component after the selected items count button is clicked.

## 1.4.0 (January 26, 2023)

### Adds

- Adds the `MultiSelect`, `MultiSelectGroup`, `FilterBar` component.
- Adds the `useMultiSelect`, `useFilterBar` hook.
- Adds the `onChangeEnd` prop in the `Slider` component.
- Adds `autocomplete` attribute to `TextInput`s with type `"tel"`, `"email"`,
  and `"url"`.
- Adds docs for `Links` and `Repetitive Actions` to the `Accessibility Guide`.

### Updates

- Updates the hex value for `ui.gray.xx-dark`, `ui.gray.xxx-dark`,
  `ui.gray.xxxx-dark`, `dark.ui.bg.page`, `dark.ui.bg.hover`, `dark.ui.bg.active`,
  `dark.ui.disabled.secondary`, `dark.ui.error.primary`, `dark.ui.error.secondary`,
  `dark.ui.focus`, `dark.ui.link.primary`, `dark.ui.link.secondary`,
  `dark.ui.status.primary`, `dark.ui.status.secondary`, `dark.ui.success.primary`,
  `dark.ui.success.secondary`, `dark.ui.warning.primary`
  and `dark.ui.warning.secondary`.
- Updates the layout of the category `RadioGroup` to `column` for the mobile
  view of the `FeedbackBox` component.
- Updates the background color for the `"iconOnly"` and `"text"` variants of
  the `Button` component.
- Updates the DOM in the header of the `FeedbackBox` component to improve
  accessibility.
- Updates the `Link` component to include descriptive text for screen readers
  in the component's `"external"` variant.
- Updates the `HelperErrorText` component to set the `ariaLive` default value
  to `"polite"`.
- Updates the `Accessibility` details for the `Notification` component.
- Better docs for the `onSubmit` prop in the `FeedbackBox` component.

### Fixes

- Fixes spacing and alignment issues in the `FeedbackBox` component.
- Fixes the width of the Privacy Policy link in the `FeedbackBox` component.
- Fixes issue where `aria-describedby` attribute was not being added to
  some `TextInput`s.

### Removes

- Removes the `Link` component warning about the deprecated `button` variant.
  This change is temporary and will be reverted once teams are able to update
  their `Link`s appropriately.
- Removes the `arial-label` attribute from the `CheckboxGroup` and `RadioGroup`
  components for improved accessibility. Using the attribute is redundant with
  the existing "screen reader only" `<legend>` element.

## 1.3.1 (December 15, 2022)

### Adds

- Adds the optional `isClearableCallback` prop to the `TextInput` component. This prop works with the `isClearable` prop and the passed function is invoked when the "clear" button is clicked. This is most helpful for controlled `TextInput` component implementations.

### Updates

- Updates the background color for the `hover` state in the `secondary` variant of the `Button` component.

### Fixes

- Fixes the z-index value of the SVG icon in the `Select` component so it does not render above other elements on a consuming application's page.

## 1.3.0 (December 8, 2022)

This release is exactly the same as the `1.3.0-rc` release candidate published on December 2, 2022. The `rc` release was reviewed and validated.

## 1.3.0-rc (Release Candidate December 2, 2022)

### Adds

- Adds additional color options to `Icon` component.
- Adds reusable iconColors and iconNames arrays/types for DRYer, easier-to-update code.
- Adds the following color options to the color theme object: `ui.bg.page`, `ui.typography.inverse.body`, `ui.typography.inverse.heading`, `dark.ui.typography.inverse.body`, and `dark.ui.typography.inverse.heading`.
- Adds the `StyledList` component.
- Adds the `FeedbackBox` component, `useFeedbackBox` component hook, and `useStateWithDependencies` helper hook.

### Updates

- Updates the data displayed on the Colors Style Guide to expand the contrast details for the `ui` and `dark.ui` color.
- Updates the `md` breakpoint to `"37.5em"`, which is equal to `"600px"`.

### Fixes

- Adds Node environment variable to npm script that Vercel uses to build the site. This patches an error from webpack not building correctly.

## 1.2.2 (November 10, 2022)

### Adds

- Adds an `isClearable` prop to the `TextInput` component. When set to `true`, a close `Button` component will render on top of the input element. Once clicked, any text value in the input field will be cleared and focus will return to the input element.
- Adds the `isClearable` property to the `textInputProps` prop object in the `SearchBar` component. This allows the `isClearable` prop to be passed to the `TextInput` component to render the close `Button` component.

### Updates

- Updates the `Icon` and `Logo` documentation to include size values in px.
- Updates the spacing within the `tertiary` variant of the `Hero` component.
- Updates the `Buttons Style Guide` to extend the information about button sizes.
- Updates the `viewport` options in Storybook to align with the Reservoir breakpoints.

### Fixes

- Fixes an invalid TOC link on the `Card` component Storybook page.
- Fixes the sizing of the `errorFilled` and `errorOutline` icons in the `Icon` component.
- Adds new props to Chakra's `ToolTip` to more forcefully close the DS `ToolTip`. New props include `closeDelay`, `closeOnClick`, `closeOnEsc`, and `closeOnMouseDown`.

### Removes

- Removes the `Button` component warning about the deprecated `link` variant. This change is temporary and will be reverted once teams are able to update their `Button`s appropriately.

## 1.2.1 (October 27, 2022)

### Adds

- Adds the `"buttonPrimary"`, `"buttonSecondary"`, `"buttonPill"`, `"buttonCallout"`, `"buttonNoBrand"`, `"buttonDisabled"` variants for the the `Link` component, set through the `type` prop.

### Deprecates

- Deprecates the `"button"` `type` variant for the `Link` component. Use any of the new `"buttonX"` variants instead.

### Updates

- Updates the `AlphabetFilter` component by adding `aria-label=“Filter by letter"` attribute
  and removing the `role` attribute on the `<nav>` element.
- Updates `AlphabetFilter` border color for the `active letter` indicator from
  `ui.gray.medium` to `ui.gray.dark`.
- Updates background styles for `Hero` component's `primary` and `campaign` variants.
- Updates the hover styles for the `Checkbox` and `Radio` components.
- Improves `TagSet` `"filter"` type accessibility by adding an `aria-label` that includes `"click to remove filter"`, when `isDismissible` is true.

### Fixes

- Updates Storybook npm packages to fix copying documentation and table of contents heading linking.

## 1.2.0 (October 17, 2022)

### Adds

- Adds a variant for `NYCDOE` to the `Logo` component.
- Adds the `TagSet` component.
- Adds the `AlphabetFilter` component.
- Adds the `AudioPlayer` component.
- Adds the `requiredLabelText` prop to the `TextInput` and `Label` component.
  This allows customizing the "(Required)" text for other languages.

### Updates

- Updates the `hamburger` SVG for the `Icon` component to allow for color assignments.
- Updates `ComponentWrapper` prop `descriptionText` type to `string | JSX.Element`.

## 1.1.2 (September 29, 2022)

### Adds

- Adds the `size` prop to the `Button` component. The accepted values are "small",
  "medium", and "large". The default size value is "medium".
- Adds the `value` prop to the `Slider` component to programmatically update the
  values of the `Slider` component.
- Adds the `value` prop to the `CheckboxGroup` component to programmatically
  update the values of the `Checkbox`es within it.

### Updates

- Updates the colors for the `secondary` and `iconOnly` variants of the `Button` component.
- Updates the `Tooltip` component to remove the dropshadow effect.
- Updates whether the content inside of an `Accordion` is always rendered through the `isAlwaysRendered` prop.
- Updates the spacing of the icon and text in the `Notification` component.
- Updates the padding and placement of the links in the `Footer` component.
- Updates how content in the `Table` component is aligned.
- Updates the `Button` styles in the `Header`, `Notification`, `SearchBar`, and
  `Tabs` components based on the new `size` prop.
- Updates the `content` prop of the `Tooltip` component to accept number values.

### Removals

- Removed the `data-testid` attribute from the `Button` component.

## 1.1.1 (September 19, 2022)

### Adds

- Adds the `text` variant in the `Button` component.

### Fixes

- Fixes a bug where the `defaultValue` for a `TextInput` component was not being passed correctly to the Chakra input element.

### Deprecates

- Deprecates the `link` variant in the `Button` component.

## 1.1.0 (August 30, 2022)

This release is exactly the same as the `1.1.0-rc5` release candidate which was published and reviewed. Minor bug fixes, listed below, were made.

### Fixes

- Fixes how the "footer" area is rendered in the `TemplateAppContainer`.
- Fixes ARIA labels in the `Footer`.

## 1.1.0-rc5 (Release Candidate August 14, 2022)

### Header Feature

- Adds static `Header` component with login dropdown (functionality to be added later).
- Implements focus lock in `Login` component in the `Header`'s internal `Login` component.
- Adds the `SkipNavigation` to the `Header` component.
- Adds the `SitewideAlerts` component used internally in the `Header` component. This component dynamically fetches and renders NYPL sitewide alerts.
- Adds login functionality, which includes reading cookie values with new package, js-cookie, making an API call for patron details, and showing a different UI to logged in users.
- Adds refresh login functionality, which is used when a cookie's accessToken has expired and the server responds to a request for patron details with a 401. It attempts to refresh the token and, if successful, refetches the patron's details.
- Adds the desktop search form to the `Header` component with the `SearchButton` and `SearchForm` components.
- Refactors `SearchButton` and `SearchForm` to implement the mobile search form.
- Adds the mobile navigation menu for the `Header` component with `MobileNav` and `MobileNavButton` components.
- Adds the mobile login menu for the `Header` component.
- Adds React context for the `Header`'s patron state data through `HeaderContext` and `HeaderProvider`.
- Better namespacing for Header-only components.
- Sets Header Auth links for production and development environments.
- Adds the `EncoreCatalogLogOutTimer` function to keep track of the patron's current site and when they should be logged out of Encore/Catalog after a timeout period.
- Uses legacy SVG icons for parity with the existing `Header` component.

### Adds

- Adds `Tooltip` component.
- Adds the basic `Footer` React component and documentation. Uses "legacy" SVG icons in the `Footer` component for social media icons.
- Adds @chakra-ui/focus-lock packages to dependencies and peerDependencies.
- Adds the `useCloseDropDown` hook to manage closing dropdown-like components through clicks outside of it and by pressing the escape key.
- Adds the `react-ga` package to send Google Analytics events in the `Header` component.

### Updates

- Updates the `onClick` event type for the `Pagination` links `onClick` function.
- Updates the `Link` component's `onClick` event type.
- Makes small, clarifying update to `Color Mode` story in Storybook.

### Fixes

- Fixes the styling for the `Image` component in the `Hero` "secondary" variant.

## 1.0.8 (August 11, 2022)

### Adds

- Adds new color values under ui:
  - `bg.default`, `bg.hover`, `bg.active`, `border.default`, `border.hover`, `typography.heading`, and `typography.body`.
- Adds new colors values under ui.gray:
  - `xxxx-dark` and `xxx-dark`.
- Adds UI fills colors for dark mode in the codebase and also exported in the `useNYPLTheme` hook.
- Adds an optional `panelMaxHeight` prop to the `Accordion` component that determines the height of the panel and displays a scrollbar if content exceeds it.

### Updates

- Updates color value for `xx-dark`.
- Updates the style of the TOC on the `Style Guide` pages to match the style of the TOC on the component pages.
- Updates the `Template` components to use CSS grid instead of flexbox.
- Updates the `Template` documentation with the new pattern for using individual `Template` components that go above the main `TemplateContent` component.
- Updates the `Placeholder` component's CSS to better display in the `Template` components.
- Updates how HTML attributes are passed down in the `Image` component to the HTML `img` element.
- Updates the `Accordion` so that its panel content only renders when the `Accordion` is open.

## 1.0.7 (July 29, 2022)

### Updates

- Updates border color in the `Description` variant of the `List` component.
- Updates how options are passed to the `SearchBar` component for its internal `Select` component.
- Updates how style props are passed to the `Link` component when using with third-party libraries, such as React Router.
- Updates the layout of the `Image` in the `Hero` "secondary" and "fiftyFifty" variants for mobile and desktop.

## 1.0.6 (July 21, 2022)

### Adds

- Adds the `isLazy` prop to the `Image` component which is set to `false` by default.

### Updates

- Updates the following components to use React's `forwardRef` wrapper function to pass along refs to the correct DOM element. This is for third-party packages and components such as Chakra's `Tooltip` to work correctly.
  - `Accordion`, `Breadcrumbs`, `Button`, `ButtonGroup`, `Card`, `ComponentWrapper`, `FieldSet`, `Form`, `SimpleGrid`, `Heading`, `HelperErrorText`, `Hero`, `HorizontalRule`, `Icon`, `Image`, `Label`, `List`, `Logo`, `Modal`, `Notification`, `Pagination`, `ProgressIndicator`, `SearchBar`, `SkeletonLoader`, `SkipNavigation`, `Slider`, `StatusBadge`, `StructuredContent`, `Table`, `Tabs`, `Template`, `TemplateAppContainer`, `Text`, `VideoPlayer`.
- Updates `padding-left` and `padding-right` style properties to `padding-start` and `padding-end`, respectively. Updates `margin-left` and `margin-right` style properties to `margin-start` and `margin-end`, respectively. These changes apply to inline CSS, shorthand Chakra style prop syntax, and Chakra theme file syntax. Note that `margin-start/end` and `padding-start/end` get converted to `margin-inline-start/end` and `padding-inline-start/end` respectively by Chakra UI.
- Updates the `Icon` component to include variants for legacy versions of `Account` (filled and unfilled), `Facebook`, `Instagram`, `Twitter` and `YouTube`.
- Updates the `Icon` component to include variants for `Warning` (filled and oultine).

### Removes

- Removes the packages `@mdx-js/react` and `babel-loader` since they are not needed by Storybook.

## 1.0.5 (July 7, 2022)

### Adds

- Exports `ColorCard`.

### Updates

- Updates the `Icon` component to include variants for `actionCheckCircleFilled`, `actionRegistration`, `decorativeEnvelope`, `decorativeLibraryCard` and `decorativeShoppingBag`.
- Updates the docs for the `Colors` Style Guide to include additional data related to contrast and WCAG compliance.
- Updates the `Checkbox` and `Radio` components to use `ui.gray.dark` for the default border color.
- Updates Storybook packages.

### Fixes

- Fixes `useNYPLBreakpoints` hook so it internally controls its own state. This eliminates server/client rendering issues on its initial load.

## 1.0.4 (June 23, 2022)

### Adds

- Adds the `useNYPLBreakpoints` hook. This hook internally uses Chakra's `useMediaQuery` hook to get the current responsive media query breakpoint.
- Adds `ui.gray.xx-dark` to the color palette.
- Adds npm packages useful for lazy loading images in the `Image` component.
- Adds text case styles for `Text` component.
- Exports `ColorModeScript`, `cookieStorageManager`, `localStorageManager`, `useColorMode`, and `useColorModeValue` from Chakra UI for consuming application usage.
- Adds a "Color Mode" documentation page in Storybook.
- Adds `ui.white` as default background color to `Checkbox` and `Radio` components.
- Adds text case styles for `Heading` component

### Updates

- Updates the `Logo` component to include a variant for `MLN Color`.
- Updates the `Icon` component to include variants for `Facebook`, `Instagram`, `Tumblr`, `Twitter` and `YouTube`.
- Updates the `Icon` component to include variants for `Building`, `Exit`, `Locator`, `Power` and `Settings`.
- Updates to Storybook version 6.5.
- Explicitly sets the default color mode value to `"light"`.
- Updates how the `styles.scss` and `resources.scss` files are organized and compiled so that they can be imported in any tech stack.
- Updates the docs for the `Table` commponent to remove the example that does not include column headers.
- Updates the `Button`, `Select` and `TextInput` components to use NYPL standard minimum height in mobile viewport.
- Updates the `SearchBar` component to change how the width of the internal `Select` component is handled.

### Fixes

- Fixes the styles for the sub-labels in the `DatePicker` component.

## 1.0.3 (June 9, 2022)

### Adds

- Adds prop validation for the `TextInput` "number" type for the `min` and `max` props.
- Adds `min` and `max` prop value validation for the `Slider` component, including in the "range" mode.

### Updates

- Updates the `TemplateAppContainer`'s responsive styles for its sidebar component.
- Updates how the `Radio`'s label is hidden when the `showLabel` prop is set to "false" to fix the "no label" accessibility issue.
- Updates the `Logo` component to include new variants for `NYPL Text Only`.
- Updates the `Card`'s full-click functionality styling for its wrapper element.
- Updates how the `Card`'s `Image` component is displayed in the mobile view; sizes and aspect ratios are maintained instead of always displaying as 100% width.
- Updates hover style to add right border color on hover for `Select` element.
- Updates the `Table` component to be responsive for a mobile viewport.
- Updates the `Table` component to make the `columnHeaders` prop required.

### Fixes

- Fixes the border color for the `Accordion` button.
- Fixes a false warning message logged from the `Table` component.
- Fixes the background color for the `Toggle` button.

## 1.0.2 (June 1, 2022)

### Adds

- Adds `noSpace` prop to the `Heading` component.
- Adds validation for equal headers and data column to the `Table` component.
- Adds `className`, `helperTextStyles`, and `showHelperInvalidText` props to the `ComponentWrapper` component.

### Updates

- Updates the `fontSize` and `padding` attributes in the single variant of the `Accordion` component.
- Updates all QA urls from Tugboat QA to Vercel.
- Updates the `Logo` component to include new variants for `Apple App Store`, `Clever Badge` and `Google Play`.
- Pins the Chakra UI "react" and "system" packages to a certain range since Chakra v2 uses React 18 and creates backwards compatibility issues.
- Updates buttons setup as icon only to get the same hover styles as `secondary` button in the `Button` component.
- Updates and refactors the `Checkbox`, `Radio`, `Select`, `Slider`, `TextInput` and `Toggle` components to use the `ComponentWrapper` component for similar DOM structure.
- Updates how `CheckboxGroup` and `RadioGroup` handle `Checkbox` and `Radio` components when `isFullWidth` is true and there is JSX as labels.

### Fixes

- Fixes how `Image`s are rendered with a non-default `aspectRatio` value and with a `caption` value or a `credit` value or both.
- Fixes the extra margin added by the `SkipNavigation` component.
- Updates various component implementations in Storybook documentation pages to remove inadvertent console errors and warnings.
- Fixes sizing in the `Card` component for the "body" and "right" sections when the `isAlignedRightActions` prop is set to `true`.
- Allows `Button`s in the `ButtonGroup` to manage their own `isDisabled` state.
- Fixes how the `onChange` prop is set in `Checkbox` so it only gets called once per rendering.

## 1.0.1 (May 31, 2022)

_NOTE_: This version number was previously released in 2019 and is marked as deprecated in npm. The next version bump from `1.0.0` is `1.0.2`.

## 1.0.0 (May 12, 2022)

This is the first stable release of the NYPL Reservoir Design System! We've been looking forward to this moment for over two years.

### Updates

- Updates all links throughout the documentation to point to the new production URLs.

## 0.28.0 (May 9, 2022)

### Adds

- Adds `max`, `maxLength`, `min`, and `onClick` props to the `TextInput` component.
- Adds the `SkipNavigation` component and adds this component inside the `TemplateAppContainer` component. The `SkipNavigation` component renders accessible links to the main content of a page and accessibility information on NYPL.org.
- Adds the `ButtonGroup` component for `Button` layout.

### Updates

- Updates how styles are passed down to internal components in `Card`, `Checkbox`, `CheckboxGroup`, `ComponentWrapper`, `DatePicker`, `Hero`, `Notification`, `Pagination`, `Radio`, `RadioGroup`, `SearchBar`, and `Slider`. This is based on removing the `additionalStyles` prop and passing down styles to the `__css` prop.
- Updates how the `id` is passed in the `DatePicker`'s custom `TextInput` component.
- Updates how some prop values are passed. Instead of using a Typescript enum object, a Typescript type with the string literal values is used. This still restricts the accepted values for certain props. The enum to string literal type conversion includes the following variables: `AccordionType`, `BreadcrumbsTypes`, `ButtonTypes`, `DatePickerTypes`, `FormGaps` (deleted), `GridGaps`, `HeadingSizes`, `HeadingLevels`, `HeroTypes`, `IconAlign`, `IconTypes`, `IconRotationTypes`, `IconColors`, `IconSizes`, `IconNames`, `LinkTypes`, `ListTypes`, `LogoColors`, `LogoSizes`, `LogoNames`, `NotificationTypes`, `SelectTypes`, `LabelPositions`, `SkeletonLoaderImageRatios`, `StatusBadgeTypes`, `StructuredContentImagePosition`, `TextSizes`, `TextInputTypes`, `TextInputFormats`, `TextInputVariants`, `ToggleSizes`, `VideoPlayerTypes`, `VideoPlayerAspectRatios`, and `LayoutTypes`.
- Updates the spacing for caption and credit text from `margin-bottom` to `margin-top` in `Image` component
- Updates how the `DatePicker` and `Slider` components internally use `TextInput`.
- Updates how the `Pagination` component internally uses `Link`.
- Updates how the `Tabs` component internally uses `Button`.
- Updates how images are passed to the `Hero` component. Instead of `imageAlt` and `imageSrc` props, now an object must be passed to the `imageProps` prop.
- Updates the values for the `name` prop for the `Icon` and `Logo` components.
- Updates the `Table` component to allow JSX elements to be rendered in the data cells.

### Removals

- Removes the `additionalStyles` attributes from the `Breadcrumbs`, `Button`, `Heading`, `HelperErrorText`, `Icon`, `Link`, `List`, `Logo`, `Select`, `TextInput`, and `Toggle` components.
- Removes `getVariant` and `getStorybookEnumValues` helper functions.
- Removes all Typescript enum objects in favor of string literal types.
- Remove the bottom margin attribute that is applied to the parent element for the `Select` component.
- Removes the `attributes` prop from: `Button`, `Link`, and `TextInput` components.

## 0.27.0 (April 27, 2022)

### Adds

- Adds two patterns for rendering the updated `Modal` component. This is still an ongoing work-in-progress as the `Modal` gets finalized but it is now using Chakra under-the-hood.
- Adds `@chakra-ui/storybook-addon` so stories automatically pick up the Chakra-based NYPL theme.

### Updates

- Updates React and React DOM to version 17.
- Updates Chakra packages `@chakra-ui/react` and `@chakra-ui/system`.
- Updates the `HelperErrorText` styling to correctly display when used with a `Select` element with a `labelPosition` of inline.

### Removals

- Removes the following packages: `@storybook/addon-queryparams` and `react-router-dom`.

## 0.26.1 (April 22, 2022)

### Updates

- Updates storybook URL from /reservoir/v0_26 to /reservoir/v0.]
- Updates the `Header`'s bottom navigation links to be underlined and red when hovered.

### Fixes

- Adds updated package-lock file to fix bad installations.

## 0.26.0 (April 22, 2022)

### Adds

- Exports the `useCarouselStyles` and `useWindowSize` hooks and adds documentation for all hooks in Storybook.
- Adds additional semantic design tokens from `fontWeights` and `fontSizes` to the `useNYPLTheme` hook.
- Adds a warning if a required `id` prop is not passed to one of the "Form Elements": `Button`, `Checkbox`, `CheckboxGroup`, `DatePicker`, `Fieldset`, `Form`, `Label`, `ProgressIndicator`, `Radio`, `RadioGroup`, `SearchBar`, `Select`, `Slider`, `TextInput`, `Toggle`.
- Adds the `isRequired` prop to the `Label` component.
- Adds the `labelPosition` prop to the `Select` component, so that the label can be styled inline with the select input.
- Adds Chakra's "Style Props" functionality to every Reservoir component. For composed components, such as the `SearchBar` component, these style props are passed to wrapper element. This update also updates the snapshot tests for every component.
- Adds the functionality to pass all valid HTML attributes to a Reservoir component, such as `data-*` props.
- Adds semantic design tokens for `spacing` theme object.
- Adds the `isAlignedRightActions` prop to the `Card` component to render `CardActions` components to the right of the main content area. This only works for the `Card`'s row layout.
- Adds styles to target native HTML basic elements inside the `StructuredContent` component.
- Adds `Reservoir` branding to Storybook.

### Changes

- Updates the hex color value for `ui.gray.light-cool`, `ui.disabled.primary` and `section.blogs.primary`.
- Updates the default background color used in the `Accordion` component.
- Updates the default background color used in the `Hero` component.
- Updates the background color used in the `SkeletonLoader` component.
- Updates the background color used in the `VideoPlayer` component.
- Updates the background colors used in the `Tabs` component.
- Updates the colors for "secondary" and "pill" variants of the `Button` component.
- Updates the color values used in the `disabled` state for the `Checkbox`, `Radio`, `Select`, `Slider`, `TextInput` and `Toggle` components.
- Updates the `Checkbox` component to use "3px" for the border radius.
- Makes the id prop required for all "Form Elements".
- Updates how the `Required` text in the `Label` and `Fieldset` components is displayed. Instead of floating to the right of the label and legend elements, it is now displayed inlined as `(Required)`.
- Renames the `optReqFlag` prop to `showRequiredLabel` in the `CheckboxGroup`, `Fieldset`, `RadioGroup`, and `Slider` components.
- Renames the `showOptReqLabel` prop to `showRequiredLabel` in the `DatePicker`, `Select`, and `TextInput` components.
- Uses the design token "text.caption" variable for the `Notification`'s font size.
- Updates the styling for the `HelperErrorText` to be consistent for all components that use it
- Refactors the `Checkbox`, `CheckboxGroup`, `ComponentWrapper`, `DatePicker`, `Fieldset`, `Label`, `Radio`, `RadioGroup`, `Select`, `Slider`, `TextInput`, and `Toggle` to better use the updated `HelperErrorText` styling.
- Renames the `Card`'s `center` prop to `isCentered` and `border` prop to `isBordered`.
- Renames the `SkeletonLoader` component's `border` prop to `isBordered`.
- Refactors the DS `RadioGroup` component so it internally implements Chakra's `RadioGroup` component rather than the `useRadioGroup` hook. The "uncontrolled" version of Chakra's `RadioGroup` is not working and will be investigated in the future. It is recommended to use the controlled component pattern.
- Updates the `Fieldset` component to render the "Optional"/"Required" text in the `legend` element as pseudo CSS in the `::after` rule.
- Passes the `isRequired` prop in the `RadioGroup` and `CheckboxGroup` to the `Fieldset` wrapper component.
- Updates the `focus` styles for the `Radio`, `Select` and `TextInput` components.
- Updates the references of the `<dl>` element from "Definition" to "Description", as that's the official name in HTML5. This affects the `List` element and its `ListTypes.Description` enum value.
- Updates styles for `React Datepicker`'s calendar popup in the `DatePicker` component.
- Updates storybook URL from /storybook-static/ to /reservoir/v0_26.
- Updates all references to "design system" in the Storybook documentation to include "Reservoir" in the name of the design system.
- Updates language on the `Welcome` page.

### Removals

- Removes the default `Optional` text displayed in the `Label` and `Fieldset` components.
- Removes the `optReqFlag` prop in the `Label` component.
- Removes the default autogenerated id for all components, as well as the `uuid` package.
- Removes the `HorizontalRule`'s `height` and `width` props from its prop interface in favor of Chakra's style props; the default values are still set for `height` and `width`.

### Fixes

- Fixes how the `Button` component gets rendered inside the `Form` and `FormField` component layout.
- Fixes how the `Select` component is controlled in the `SearchBar` component.

## 0.25.13 (April 1, 2022)

### Adds

- Adds a `contentId` prop to the `TemplateAppContainer` component and adds an `id` prop to the `TemplateContent` component. The default value of these `id`s are both set to "mainContent" and it will render as an attribute on the `main` HTML element. This is used as the target for the skip navigation link in consuming applications.
- Adds an `Accessibility Guide` section to Storybook with a "Skip Navigation" page.
- Adds the `isFullWidth` prop to the `CheckboxGroup` and `RadioGroup` components. This sets the wrapper element to be full width for labels that need to span its container.
- Adds an optional key – `accordionType` to the `Accordion`'s `contentData` prop, which allows users to switch the background color of the `Accordion`'s button.
- Created new `LayoutTypes` enum for row and column layouts.
- Adds the value "Default" to the `IconSizes` enum.

### Changes

- Updates Storybook's sidebar categories and documentation.
- Updates the `Image`'s caption font size to "12px" (`text.tag`).
- Updates the `Checkbox`'s and `Radio`'s `labelText` prop to accept strings and JSX Elements.
- Updates the `Toggle`'s internal styling for the default and small sizes.
- Updates the `Accordion` button's background color when expanded, adds a border color when hovered over, and adjusts the padding.
- Updates the `CardImage`'s margin bottom in the row and column layouts for mobile to be the same.
- Updates the `CardImage` to have width 100% on mobile regardless of size.
- Updates all the console warnings with consistent NYPL branding prefix label.
- Renames the `Accordion` prop `contentData` to `accordionData`.
- Renames the `Breadcrumbs` prop `colorVariant` to `breadcrumbsType`.
- Renames the `Card` prop `center` to `isCentered`.
- Updates the `Card` prop `layout` to use the `LayoutTypes` enum instead of `CardLayouts`.
- Updates the `CheckboxGroup` prop `layout` to use the `LayoutTypes` enum instead of `CheckboxGroupLayoutTypes`.
- Renames the `Heading` prop `displaySize` to `size.
- Renames the `HeadingDisplaySizes` enum to `HeadingSizes.
- Renames the `Hero` prop `image` to `imageComponent`.
- Renames the `Image` prop `imageSize` to `size`.
- Renames the `Notification` prop `centered` to `isCentered`.
- Updates the `RadioGroup` prop `layout` to use the `LayoutTypes` enum instead of `RadioGroupLayoutTypes`.
- Internal updates to the `SearchBar` component based on updates from the `Select` and `TextInput` components.
- Renames the `Select` prop `type` to `selectType`.
- Updates the `SkeletonLoader` prop `layout` to use the `LayoutTypes` enum instead of `SkeletonLoaderLayouts`.
- Renames the `StructuredContentImage` prop `imageSize` to `size` (this component is based on the `Image` component).
- Internal updates to the `StructuredContent` component based on updates from the `Image` and `Heading` components.
- Renames the `Tabs` prop `contentData` to `tabsData`.
- Renames the `Text` prop `displaySize` to `size`.
- Renames the `TextInput` prop `variant` to `textInputType`.
- Updates the `Card` image-related props into one main prop named `imageProps`. This new prop contains the following properties: alt, aspectRatio, caption, component, credit, isAtEnd, size, and src.
- Updates the `Hero` prop `image` to `imageAlt` and `imageSrc`. Internally, an `Image` component is created.
- Renames the `Image` component props `imageAspectRatio` to `aspectRatio`, `imageCaption` to `caption`, and `imageCredit` to `credit`.
- Updates the `StructuredContent` image-related props into one main prop named `imageProps`. This new prop contains the following properties: alt, aspectRatio, caption, component, credit, position, size, and src.
- Renames the `ToggleSizes.tsx` file to `ToggleTypes.tsx`. Updates the values from `Large` and `Small` to `Default` and `Small`.
- Minor update to the logic for the `ProgressIndicator` sizing prop and styles.

### Fixes

- Fixes bug where the Next button in `Pagination` would navigate to the previous page.
- Fixes the alignment of the first link in the `Pagination` component.
- Fixes the `Breadcrumbs`' SVG arrow icon fill color for the "Blogs" variant.
- Fixes the margin right value for list items in the `List` component for the inline style.
- Fixes bug in the `Select` component where the SVG arrow hides when the component is focused.
- Fixes the extra bottom spacing in the `HeroTypes.Campaign` `Hero` variant for the mobile view.
- Fixes the `Slider` component so it doesn't cause a stack overflow client-side issue when updating the slider thumbs through the keyboard arrows. The values are now returned through Chakra's `onChange` callback instead of the `onChangeEnd` callback.

### Removals

- Removes the `CardLayouts`, `CheckboxGroupLayoutTypes`, `RadioGroupLayoutTypes`, and `SkeletonLoaderLayouts` enums.
- Removes the `CardTypes.tsx`,` CheckboxGroupLayoutTypes.tsx`, and `RadioGroupLayoutTypes.tsx` files.

## 0.25.12 (March 18, 2022)

### Adds

- Adds `Education` section colors to the color palette theme object.
- Adds a `currentPage` prop to the `Pagination` component, a value that updates the selected page programmatically without the user explicitly requesting it.

### Changes

- Removes the margin from the global `.nypl p` CSS rule.
- Updates the top and bottom margin of the `List`'s `Unordered` and `Ordered` types.
- Updates the `Notification`'s icons to be decorative by default.
- Updates the default placeholder value for the `SearchBar`'s `TextInput` component.
- Updates the `SearchBar`'s `textInputProps` prop object to not require the `placeholder` property.
- Updates the `Logo` component to include new variants for `FirstBook` and `Open eBooks`.
- Updates the border and text styles for the `Select` component.
- Updates the `Breadcrumbs` component to inlcude an `Education` color variant.
- Updates the `Icon` component to include the `Education` color values.
- Updates the default font stack to fix a typo that was disabling `sans-serif` in the stack.
- Removes the `.nypl-ds` CSS class from the base SCSS file, from the `TemplateAppContainer` component, from the Storybook configuration, and from the entire repo.
- Moves the base styles from the SCSS global file to the Chakra theme global JS object.
- Updates the label font size for the `Radio` and `Checkbox` components to be "label.default".

### Fixes

- Fixes the styles for the `Slider` to better accomodate the slider thumbs and the width of the container.
- Updates the alignment of the `Notifications`'s dismissible icon.
- Fixes the border and padding from the `fieldset` HTML element by removing it.
- Fixes alignment for long labels in the `Checkbox` and `Radio` components.
- Fixes the line height for long labels in the `Toggle` component.

## 0.25.11 (March 3, 2022)

### Updates

- Updates the `Logo` component to include new variants for `BPL`, `Clever`, `LPA`, `MLN`, `QPL`, `Schomburg`, `SimplyE` and `Treasures`.
- Updates font size to "12px" and top margin to "4px" for `HelperErrorText` component.
- Updates font size to "14px" for `TextInput` component.
- Adds an `aria-label` attribute to the `Notification` component to use with its `aside` HTML landmark element. Added an "Accessibility" section in the `Notification` Storybook page to note that this component should not be used within a `header` or `footer` HTML landmark element.
- Updates the `Notification` component to handle link color inside the content area, better styling for centering and the dismissible variation, and updated background color for the "Announcement" and "Warning" types.
- Updates a log message in the `Icon` component to be more descriptive.
- Updates the mobile styles for the image in the `StructuredContent` component.
- Updates the prop type for the "Definition" `List` type so DOM elements can be passed in the definition.

### Fixes

- Updates the bottom margin of the `Select` in the `SearchBar` so that the helper text has standard gap between the main form components and itself.
- Updates how `TabList` and `TabPanels` are returned in the `Tabs` component so no false log messages are consoled.
- Updates `List` component styling for inline.

## 0.25.10 (February 22, 2022)

### Adds

- Exports Chakra's `Flex` and `Spacer` components.
- Adds `TemplateAboveHeader` component in the set of "template" components.
- Adds the `aboveHeader` prop to the `TemplateAppContainer` component to render a `TemplateAboveHeader` component immediately before the `TemplateHeader` component.
- Adds the `additionalStyles` prop to the `Select` component.

### Breaking Changes

- Renames the `Form` component's `"spacing"` prop to `"gap"` to be consistent with the `FormRow` and `FormField` components.
- Renames the `FormSpacing` enum to `FormGaps`.

### Changes

- Passes an `onChange` prop to the `Select` component inside the `SearchBar` through its `selectProps` prop.
- Adds snapshot tests for the `Tabs` component and better checks to warn the user that the `Tabs` is missing data if data wasn't passed as props or children.
- Updates the `Form` component to warn developers when a child component in the `FormRow` component _is not_ a `FormField`.
- Adds an `onSubmit` prop to the `Form` component.
- Adds the `renderHeaderElement` prop to the `TemplateAppContainer` component. This prop is used to control whether the `TemplateAppContainer` component should render its own `<header>` HTML element through its `header` prop, or let the user pass in their own component that renders the `<header>` HTML element.
- Updates the `Fieldset` and `RadioGroup` so the `children` prop is declared through `React.PropsWithChildren` rather than in their respective prop interfaces.
- Adds snapshot tests for the `Accordion` component, as well as `id` props to the components within the `Accordion` so snapshot tests pass.
- Passes an `id` to the `Icon` in the `Select` component.
- Adds snapshot tests for the `Select` component.

### Fixes

- Fixes `id` propagation issues in the `SearchBar` component and its children DS components.
- Fixing `Breadcrumbs` related logging issue with a CSS pseudo-selector and setting the `aria-label` to "Breadcrumbs". Adding an accessibility test that should fail when more than one `Breadcrumbs` component is rendered on a page since that landmark should only be rendered once on a web page.
- Exports the `FullDateType` interface related to the `DatePicker` component.
- Fixes and removes bad console logs from the `Pagination` and `List` components.
- Fixes auto-generated `id`s in the `Tabs` component.
- Fixes the Figma link for the `Hero` component.
- Fixes `Card` component bug for passing styles to the `CardHeading` correctly.
- Fixes the `Table` component so that a custom header text color of white does not visually hide row headers on a white background.

### Updates

- Updates the following packages: multiple `@storybook/...` packages, `autoprefixer`, `eslint-plugin-storybook`, `husky`, `lint-staged`, `semantic-release-slack-bot`, `storybook-addon-designs`.
- Removed the following packages: `postcss`, `pretty-quick`.
- Added `@chakra-ui/react`, `@chakra-ui/system`, `@emotion/react`, `@emotion/styled`, and `framer-motion` as "peerDependencies".
- Updates the node version in Github Action workflows from Node v12 to Node v14.
- Updates how `/dist/resources.scss` is created through gulp.

## 0.25.9 (February 3, 2022)

### Adds

- Adds the `Logo` component.
- Adds the `noBrandButtonType` boolean prop to the `SearchBar` component to render the `NoBrand` `Button` variant style.
- Adds element-specific design tokens for `fontSizes` and `fontWeights`.
- Adds the `StructuredContent` component.
- Adds the `additionalImageStyles` and `additionalFigureStyles` props to the `Image` component to specifically target the `img` element's style and the `figure` HTML elements.
- Adds the `Table` component.

### Breaking Changes

- Completely removes the `CardEdition` and `Input` components and related files and references.
- Removes all references of the `BEM` CSS pattern.
- Removes all references to logos from the `Icon` component.
- Removes passing in text to the `HelperErrorText` component as children. Now, the `text` prop is used to render its text.
- Renames the `SearchBar`'s `helperErrorText` prop to `helperText` to be consistent with other components.

### Changes

- Updates the `Form`, `HorizontalRule`, `Image` component by removing the native HTML attributes as props. This sets the props allowed to the list of props declared in their own files.
- Minor change to the `Notification`'s heading component so it adds a proper id to `NotificationHeading`.
- Updates the `Heading` component to use the DS `Link` component rather than Chakra's `Link` component.
- Updates the style of links rendered in the `Heading` component so they are styled as standard links. The only exception is for links used in the `Card` component for the _full-click functionality_ feature. Otherwise, links in `Card` headings are styled as standard links.
- Updates the `SearchBar` component to now be implemented with the `ComponentWrapper` component.
- Removes the `ButtonTypes.SearchBar` variant style for the `Button` component. The style object is now set and passed directly to the `Button` component in the `SearchBar` component through the `additionalStyles` prop.
- Renames `additionalStyles` prop to `additionalWrapperStyles` in the `Image` Component.
- Updates the label text style in the disabled state of the `Toggle` component.
- Updates the `Card` component so it gives a bottom margin to the `Image` component when the `imageAspectRatio` prop is set to `ImageRatios.Original`.
- Updates the `TextInput` component to use a white background for `static`, `error` and `focus` states.
- Updates `Select` component to use a white background for `static`, `error` and `focus` states.
- Updates the `Template` component to use `s` (16px) spacing on the left and right sides of the main content area.
- Updates the `HelperErrorText` component to allow HTML to be passed in as a string or HTML.
- Updates how the `HelperErrorText` component renders text in the following components: `Checkbox`, `CheckboxGroup`, `ComponentWrapper`, `DatePicker`, `Radio`, `RadioGroup`, `SearchBar`, `Select`, `Slider`, `TextInput`, `Toggle`, `VideoPlayer`.
- Updates the `HorizontalRule` component to use "100%" as the default value for the `width` prop.

### Fixes

- Fixes the styling of custom anchor elements when passed as a child in the `Link` component.
- Allows the `TemplateAppContainer` and `TemplateFooter` components to use the `renderFooterElement` prop. This is `true` by default so it renders an HTML `footer` element. If a custom footer component that renders its own HTML `<footer>` must be used, then setting `renderFooterElement` to false will not render two nested `footer` elements.
- Fixes the Storybook `level` prop value for the `Heading` component so it updates the component.
- Removes wrapper divs around custom image elements used in the `Card` component. Also passes the aspect ratio as `ImageRatios.Original` when the custom image element is passed to the `Card` component.

## 0.25.8 (January 6, 2022)

### Adds

- Adds `embedCode` prop to `VideoPlayer` component.
- Adds export statements for `ProgressIndicatorSizes` and `ProgressIndicatorTypes` enums to `index.ts`.
- Adds `ExtraSmall` and `ExtraExtraSmall` size variants to the `Image` component.
- Adds `ExtraSmall` and `ExtraExtraSmall` size variants for `CardImage` in the `Card` component.
- Adds `AlertNotificationImportant` icon to `Icon` component.
- Adds `Toggle` component.
- Adds `xxxs` (2px) spacing option to DS design tokens.
- Adds `external` variant to `Link` component.

### Changes

- Changes category for `Table` component from `Basic Elements` to `Page Layout`.
- Updates the background color for the `Locations` variant in the `Breadcrumbs` component from `section.locations.secondary` to `section.locations.primary`.
- Updates the `Notification` component to show the `AlertNotificationImportant` icon for the `Standard` variant.
- Reduces the bottom margin on labels and legends for form components from "16px" to "8px", or "s" to "sx" in Chakra-theme variables.
- Updates docs for Chakra `Grid` component to use theme object values rather than CSS variables.
- Updates the spacing in the `Notification` component to improve the alignment of the icon and text elements.
- Updates the `Notification` component to optionally display/hide the `Icon` in the heading or content area.
- Updates the `ComponentWrapper` component to allow the internal `HelperErrorText` component to get set in the invalid state. Also added tests for this component.

### Fixes

- Fixes two bugs in the `Slider`: (1) unable to call the `onChange` function when it is not passed, and (2) fixing the default array value for the range slider so it mounts properly.
- Updates the `Select` component's controlled state so that an initial empty `value` prop is acceptable.

## 0.25.7 (December 20, 2021)

### Fixes

- Removes `<=12.22` from node engine in `package.json` to reduce installation issues.

## 0.25.6 (December 16, 2021)

### Adds

- Adds export statements for `ProgressIndicator` and `Slider` components to `index.ts`.
- Adds `Blogs` variant to `Breadcrumbs` component.
- Adds the `placeholder` prop to the `Select` component.

### Changes

- Adds "(Required)" text to the placeholder in the `SearchBar` component when `isRequired` is true.

## 0.25.5 (December 9, 2021)

### Fixes

- Updates the Github Action for the Github Pages deployment to use node 12 instead of the default node 16. This caused issues since we now set the node engine to `<=12.22`.

## 0.25.4 (December 9, 2021)

### Adds

- Adds the `ProgressIndicator` component.
- Adds documentation for using `NYPL Design Tokens`.
- Adds the `ActionHelpDefault`, `ActionHelpOutline` and `ActionLaunch` icons to the `Icon` component.
- Adds the DS `Slider` component based on the Chakra `Slider` and `RangeSlider` components.
- Adds the `ButtonTypes.NoBrand` variant to the `Button` component.
- Adds the `additionalStyles` prop to the `Breadcrumbs` component.

### Changes

- Updates the organization of SCSS files by deleting some files and combining others.
- Updates `@chakra-ui/react` to version 1.7.1 and `@chakra-ui/system` to version 1.8.1.
- Updates the `TextInput` component to now have `defaultValue` and `step` props.
- Updates `Latest Version` number for `Image`, `Notification` and `Pagination` components.
- Removes the Storybook "Knobs" addon.
- Updates the margin for labels in the `DatePicker` component when it is in the "date range" state.
- Updates the `DatePicker` component to have proper form spacing when in the "date range" state.
- Updates the `Tabs` component to comply with linting rules -- no functional or visual changes were made.
- Removes the `alignText` prop from the `Notification` component. Storybook was incorrectly displaying `alignText` as an available prop.

### Fixes

- Exports components and variables that were initially missed when they were added: `ColorVariants`, `Fieldset`, `IconAlign`, `StatusBadgeTypes`,
- Fixes `SearchBar` by passing necessary props down to its `TextInput` through the `textInputProps` prop.
- Fixes `DatePicker` component unit tests.
- Removes the `showLabel` prop from the `SearchBar` component to prevent confusion. Labels for the `Select` and `TextInput` components are never shown but are added through the `aria-label` attribute.

### Breaking Changes

- Updates the breakpoint CSS variable names by adding the `--nypl` prefix and the SCSS variables by adding the `$nypl` prefix. Updates references throughout the codebase.
- Changes the `Button`'s `disabled` prop to `isDisabled`.
- Updates npm packages in `package.json`. Removes `cpy-cli`, `react-uid`, `react-is`, `stylelint` and related packages, and `ts-loader` (already added through TSDX). Updates other packages such as `sass-loader`, `prettier`, `jest`, `jest-axe`, and the majority of Storybook addon packages.

### Deprecates

- Deprecates the `Input` component. The `Input` component will be removed from the NYPL Design System React Library in the first release of January 2022.
- Deprecates the `CardEdition` component. The `CardEdition` component will be removed from the NYPL Design System React Library in the first release of January 2022.

## 0.25.3 (November 18, 2021)

### Adds

- Adds the `ImageRatios`, `ImageSizes`, and `ImageTypes` enums.
- Composes the DS `Fieldset` component with Chakra. This always renders a `legend` element as its first child but it can be optionally hidden from the screen.
- Adds the ability to make an entire `Card` component clickable with Chakra's `LinkBox` and `LinkOverlay` components. Links in the `CardActions` component can still be accessed in this state by clicking with the mouse or tabbing and pressing "enter".
- Adds new file type SVG files to use in the `Icon` component: Audio, Doc, GenericDoc, Image, PDF, Spreadsheet, Video.
- Adds `ActionCheckCircle` SVG file to use in the `Icon` component.

### Changes

- Updates the Github Action for the changelog reminder.
- Updates the `Checkbox` component with an "indeterminate" state through the `isIndeterminate` prop.
- Updates the `CheckboxGroup` component story with an "indeterminate" state example.
- Updates the `CheckboxGroup` and `RadioGroup` components to use the `Fieldset` component.
- Updates the `HelperErrorText` and `TextInput` components with added `additionalStyles` prop.
- Updates the `Button` Style Guide documentation.
- Updates the `Iconography` Style Guide story documentation.
- Updates the `Button` font weight to "regular".

### Fixes

- Fixes nondeterministic unit test in the `DatePicker` component.
- Version of latest `List` component release in its storybook page.
- Adds validation to the `height` prop in the `HorizontalRule` so percentage values are not used. If a percentage value is used, the default "2px" value is set.
- Fixes styling issues for the `Notification` dismissible button.
- Fixes `SearchBar` mobile styling for the `Select`, `TextInput`, and `Button` components.
- Fixes `SearchBar` focus flicker when the `Select` component is selected.

### Breaking Changes

- Updates the `Notification` component to fix the custom icon alignment.
- Adds the `title` prop to the `Icon` component to render a `title` HTML element for accessible SVG icons.
- Updates the default font size of the `Button` component to `"-1"` (14px) for all variants except the `Link` variant. Removes the `bem` function from internal use and makes it clearer that the `ButtonGroup` Chakra component is exported in the Design System.
- Updates the `errorText` prop to `invalidText` for the `Checkbox` component.
- Composes the DS `Pagination` component with Chakra. Removes the BEM-related props and updates the `currentPage` prop to `initialPage`. The current selected page is now kept in state inside the `Pagination` component and returned to the user through `getPageHref` or `onPageChange`. This also adds better aria attributes to the list inside the `Pagination` component.
- Composes the DS `Image` component with Chakra styling and updates all `Image` references in other DS components. The `attributes` prop and the BEM related props `blockname` and `modifiers` have been removed. Adds the following new props: `additionalStyles`, `component`, `imageAspectRatio`, `imageSize`, `imageType`.
- Composes the DS `Card` component with Chakra. BEM related props `modifiers` and `blockname` have been removed. Replaces the `CardImageRatios` with `ImageRatios`. Removes the `CardImageSizes` enum.
- Composes the DS `DatePicker` component with Chakra. Adds more tests, documentation, and examples. This component now uses the `Fieldset` component for the date range type, and better `Form` components for layout. Prop name changes: `dateRange` is now `isDateRange` and `required` is now `isRequired`. BEM related props `modifiers` and `blockname` have been removed. The "Required"/"Optional" text in the date range legend can now be hidden with the `showOptReqLabel` prop.
- Composes the DS `SkeletonLoader` with Chakra's `Skeleton` component. BEM related prop `modifiers` has been removed. Chakra's default `Skeleton` styles have been updated with NYPL's theme.
- Removes deprecated CSS variables. Now the DS repo only uses the CSS variables exposed by Chakra that contain the `--nypl` prefix.

## 0.25.2 (October 28, 2021)

### Adds

- Adds custom `useCarouselStyles` hook for the `Tabs` mobile carousel functionality.
- Adds custom NYPL-theme radii values to use within Chakra, mostly for border radius values.
- Adds the `showHelperInvalidText` prop to form components to control displaying or hiding the content in the `HelperErrorText` component.
- Adds `useNYPLTheme` hook for consuming applications to use NYPL DS values.
- Adds the DS `ComponentWrapper` helper component for internal use.
- Adds `useWindowSize` hook for responsive styles and functionality.
- Adds Chakra Migration Guide for version `0.25.0` and greater.

### Changes

- Updates the CSS vars name prefix to use `nypl`.
- Updates documentation in the README and updates the issue contribution template.
- Updates the following components to use the `showHelperInvalidText` prop: `Checkbox`, `CheckboxGroup`, `DatePicker`, `Radio`, `RadioGroup`, `SearchBar`, `Select`, `TextInput`, `VideoPlayer`.

### Breaking Changes

- Composes the DS `Notification` component with Chakra components. Removes the `NotificationHeading` and `NotificationContent` components as exports and are only used internally in `Notification`. Instead of children component, `Notification` accepts the heading and content values through the `notificationHeading` and `notificationContent` props, respectively.
- Composes the DS `HelperErrorText` component with Chakra. BEM related props `modifiers` and `blockname` have been removed. The `isError` prop has been renamed to `isInvalid`.
- Composes the DS `VideoPlayer` component with Chakra. BEM related prop `modifiers` has been removed.
- Composes the DS `HorizontalRule` component with Chakra. BEM related prop `modifiers` has been removed, as well as the `attributes` prop.
- Composes the DS `List` component with Chakra. BEM related props `modifiers` and `blockname` have been removed. The `noStyling` prop is now used for the no list style variant style.

## 0.25.1 (October 14, 2021)

### Adds

- Updates the `Accordion` component to internally use Chakra components.
- Adds DS `SimpleGrid` component composed from Chakra's `Simplegrid` component.
- Adds DS `Text` component composed from Chakra's `Text` component.
- Update the NYPL Colors with updated color names and values.
- Composes the DS `TextInput` component from Chakra's `Input` and `Textarea` components.
- Composes the DS `Select` component from Chakra's `Select` component.
- Composes the DS `Hero` component from Chakra's component.
- Composes the DS `CheckboxGroup` component from Chakra's `CheckboxGroup` component.
- Composes the DS "Template" components (`Template`, `TemplateHeader`, `TemplateBreakout`, `TemplateContent`, `TemplateContentPrimary`, `TemplateContentSidebar`, `TemplateFooter`) from Chakra's `Box` component for page layouts through children components.
- Composes the DS `TemplateAppContainer` component from Chakra's `Box` component for page layouts through props.
- Composes the DS `Link` component with Chakra component and fixes the `Button` type.
- Exports Chakra's `Grid` and `GridItem` components.
- Composes the DS `Label` component with Chakra component and updates the font size.
- Composes the DS `StatusBadge` component from Chakra's component.
- Composes the DS `Forms` component using DS and Chakra components.
- Composes the DS `Icon` component with Chakra's `Icon` component. Added new props for `Icon` sizing, alignment, name, and rotation.
- Composes the DS `SearchBar` component from DS `Select`, `TextInput`, `Button`, and `HelperErrorText` components.
- Composes the DS `Breadcrumbs` component from Chakra's `Breadcumb`, `BreadcrumbItem` and `BreadcrumbLink` components.

### Changes

- Updates spacing values to use NYPL spacing rather than "em"s.
- Updates the `SkeletonLoaderLayouts` enum values from `Horizontal` and `Vertical` to `Row` and `Column`, respectively.
- Updates the `CardLayouts` enum values from `Horizontal` and `Vertical` to `Row` and `Column`, respectively.
- Updates font size of the `legend` element used in `CheckboxGroup`, `DatePicker` and `RadioGroup`.
- Updates the radius values through Chakra's theme object.

## 0.25.0 (September 30, 2021)

### Breaking Changes

- Renames `HeadingDisplaySizes.tsx` to `HeadingTypes.tsx`.

### Adds

- Integrates Chakra-UI into the codebase.
- Moved SCSS and CSS variable styles into a custom NYPL theme to extend Chakra's base theme.
- Adds `DSProvider` component to use the NYPL theme in consuming applications.
- Exports Chakra's `Box`, `Center`, `Circle`, `Square`, `Stack`, `HStack`, and `VStack` components.
- Composes the DS `Button` component from Chakra's `Button` component.
- Composes the DS `Heading` component from Chakra's `Heading` component.
- Composes the DS `Tabs` component from Chakra's `Tabs`, `TabList`, `Tab`, `TabPanels`, and `TabPanel` components.
- Composes the DS `Radio` component from Chakra's `Radio` component.
- Composes the DS `RadioGroup` component from Chakra's `RadioGroup` component.
- Composes the DS `Checkbox` component from Chakra's `Checkbox` component.
- Updates the `errorText` prop name to `invalidText`.

### Removes

- Removes the `color-classes` SCSS mixin.

### Changes

- Updates the development preview URL from the Netlify link to the Tugboat QA link.

## 0.24.1

### Adds

- Adds `FormSpacing` enum to DS exports.
- Adds `utility_account_filled`, `utility_account_unfilled`, `utility_hamburger` and `utility_search` icons to `Icon` component.

### Changes

- Updates `General Guidelines` for `Buttons Style Guide`.

### Fixes

- Fixes left padding on `Card` when `imageAtEnd` and `border` are both `true`.

## 0.24.0

### Breaking Changes

- Renames original `Card` components to be `CardEdition`.

### Adds

- Adds the `DatePicker` component.
- Adds new `Card` component.
- Adds `spacing` prop to `Form` component to allow for spacing variations.
- Adds Style Guide `Forms`

### Changes

- Exports `VideoPlayerAspectRatios`.
- Adds additional props for the `DatePicker` component based on its TAD Addendum section.
- Adds Tugboat QA configuration for PR preview deployments to replace Netlify.
- Updates the `DatePicker`, `TextInput`, `Select`, and `Label` components to pass an optional `showOptReqLabel` prop to conditionally render "Required"/"Optional" in the label text.

### Fixes

- Fixes Accordion FAQ Storybook example rendering bug.

## 0.23.4

### Adds

- Adds TSDX as the bootstrapping tool to add opinionated configurations.
- Adds an `/example/` directory through TSDX with an small playground app.
- Snapshot testing through `react-test-renderer` and Jest.
- Typescript documentation file to be use as a development guide.
- Typescript documentation for `enum` variables in the TYPESCRIPT file.
- Adds `SkeletonLoaderLayouts` and `SkeletonLoaderImageRatios` enums to DS exports.
- Adds heading, description and helper text to `VideoPlayer` component.
- Adds `@storybook/addons-jest` plugin to display Jest/React Testing Library unit tests in a Storybook tab.

### Changes

- Updates Style Guide `Spacing`.
- Updates `Hero` component to include `Campaign` variant.
- Updates `Hero` stories to use MDX format.
- Updated warnings for too few or too many option children for the `Select` component.
- Updates the README to include information on the production, development, and "preview" Storybook documentation instances.
- Removes a custom SCSS breakpoint in `_Breadcrumbs.scss` in favor of mobile-first style rules.
- Replaces Mocha, Chai, Sinon, and Enzyme for Jest and React Testing Library for unit testing.
- Replaces webpack with rollup through TSDX.
- Updates npm scripts to use TSDX for internal commands.
- Replaces lodash with own functions.
- Minor updates to Github Actions.
- Adds PostCSS/autoprefixer to Rollup workflow instead of the default scss minifier.

### Fixes

- Fixes the `bem` utility function so that it doesn't crash Storybook whenever the `modifiers` Controls prop option is empty.

## 0.23.3

### Fixes

- Removes the `storybook-static` directory from `.gitignore` so that the Github Actions deploy job can work properly.

## 0.23.2

### Adds

- Adds `Form` component.
- Adds `Notification` component.
- Adds Style Guide `Buttons`.
- Adds `VideoPlayer` component.
- Adds the ability to render a `textarea` element from the `TextInput` component.

### Changes

- Updates stories for the `List` component to use MDX format.
- Updates stories for the `Pagination` component to use MDX format.
- Updates how children are rendered in the `List` component. Direct children `li`, `dt`, and `dd` elements can still be passed, but specific data structures can be passed to the `listItems` prop to render the appropriate children element.
- Updates to the contributing documentation, pull request template, and the README.
- Changes `DisplaySizes` to `HeadingDisplaySizes`.
- Changes `Skeleton Loader` to be configurable via props.
- Changes `Button` to use `16px` for left/right padding for buttons with text; icon only buttons still use `8px` left/right padding.
- Changes `TextInput` label text to `font-weight: 500`.

## 0.23.1

### Adds

- Adds CSS vars for `font-weight`
- Adds `displaySize` prop to `Heading`
- Adds Style Guide `Iconography`
- Adds new SVGs to be used with the `Icon` component. Among the new SVGs are: Error solid, Error outlined, Speaker Notes.
- Adds ability to change the color of an SVG icon with classes such as: `ui-black` (default), `ui-white`, `brand-primary` (red), `section-research-secondary` (turquoise).
- Adds `helperText` and `errorText` props to `Checkbox`
- Adds `helperText` and `errorText` props to `Radio`
- Adds `errorText`, `helperText`, `labelText`, `required` and `showLabel` props to `Select`

### Changes

- Updates content in Style Guide `Typography`
- Updates content in Style Guide `Breakpoints`
- Changes `Link` story from `.tsx` to `.mdx`.

### Deprecates

- Deprecates `ariaLabel`, `helperTextId`, `isRequired` and `labelId` props in `Select`

## 0.23.0

### Breaking Changes

- Removes `breakout` CSS from `Breadcrumbs`. To retain previous behavior, `Breadcrumbs` component should be a child of a `.content-header` element.
- Removes `breakout` CSS from `Hero Secondary`. To retain previous behavior, `Hero` component should be a child of a `.content-header` element.

### Adds

- Adds `HorizontalRule` component
- Adds new `short` class for `Placeholder`
- Adds `Style Guide` category to Storybook sidebar

### Changes

- Changes `Breadcrumbs` story from `.tsx` to `.mdx`
- Changes `Heading` story from `.tsx` to `.mdx`
- Changes suggested DOM structure in `Template` Story

## 0.22.2

### Changes

- Adds documentation on layout bidirectionality
- Changes `Pagination` to hide pagination UI when there are 0 or 1 pages.

## 0.22.1

### Changes

- Removes `color-classes` and `css-vars` mixins from `_03-mixins.scss`
- Adds `color-classes` and `css-vars` mixins to `styles.scss`
- Changes order of CSS `@import` rules in `styles.scss`
- Adds quotes around `black` and `white` in `$colors` object in `_colors-utility.scss`

## 0.22.0

### Breaking Changes

- Removes `--ui-success` CSS variable and adds `--ui-success-primary` and `--ui-success-secondary`
- Removes `checkboxId` prop from `Checkbox` component and employs `id` in its place.
- Removes `defaultChecked` prop from `Checkbox` component.
- Removed `labelOptions` prop from `Checkbox` component and employs `labelText` in its place.

### Changes

- Added: Definition List component.
- Changed: Separate Checkbox into its own component.
- Changed: Separate Radio button into its own component.
- Adds `Tertiary` state to Hero component
- Changes `Brand` and `Utility` color values to match Figma main file
- Changes `Radio` styles to use SASS vars in place of CSS vars
- Adds `TextInput` component to handle email, hidden, number, password, text, textarea, tel and url input types
- Adds default width and padding to `StatusBadge` component.
- Hides pagination when there are 0 or 1 pages.

### BugFixes

- Fixed layout bug for layouts that include a right sidebar column and DOM structure.

## 0.21.2

### Changes

- Adds `getPageHref` to `Pagination`

## 0.21.1

### Changes

- `Accordion`: Adds `fixed-height` modifier and `defaultOpen` prop
- `List` defaults to grey bullets instead of black
- Adds margins inside the default columns of `Card`

### BugFixes

- Breadcrumbs now show up in light colours
- Template reflow and breakpoints now happen at the same time
- Fixes release github action

## 0.21.0

### Breaking Changes

- Removes `statusBadgeText` prop in StatusBadge to allow text to be inside component

### Changes

- Add `method` and `action` to `SearchBar` `<form>`

### Bugfixes

- Add the `attributes` property to the `SearchBar` `<form>`
- Adds focus outline to the `Accordion` component so it appears when it is tabbed.

## 0.20.2

### Changes

- Exports mixins in a `resources.scss` file that can be used by consumers.

### Bugfixes

- `Link` with class `button` has white text color

## 0.20.1

### Bugfixes

- Fixes `Pagination` when there are fewer than 4 pages
- Adds `StatusBadge` component to `design-system-react-components` package

## 0.20.0

### Changes

- `Select`: selectedOption holds the selected value, instead of just the default.
- `Hero`: `Hero.Secondary` now changes background color based on NYPL site section
- `Hero`: All props are now optional
- `Input`: added onChange prop to explicitly allow it to be used as a controlled component
- Uses stricter linters and more Prettier configs.

### Breaking Changes

- Removed `SectionTitle`
- Scopes all element selects to the `.nypl-ds` class

## 0.19.1

### Breaking Changes

- Accordion: Accordion input styling affects only direct children
- Checkbox: Allows checkbox to be used as a controlled component or uncontrolled component.

## 0.19.0

### Breaking Changes

- Updates `Pagination` component to match new design.

## 0.18.7

### Changes

- Adds actual `StatusBadge` component with props for setting levels [RENO-1882](https://jira.nypl.org/browse/RENO-1882)

## 0.18.6

### Changes

- Updates `Hero`'s primary option to have a larger top/bottom padding on the inner content via [Reno-1670](https://jira.nypl.org/browse/RENO-1670)

## 0.18.5

### Changes

- Converts the Accordion component to open and close through CSS rather than through Javascript.

## 0.18.4

### Changes

- Updates the `Input` component to conditionally render an `id` attribute if an `id` prop value is passed to it.

## 0.18.3

### Changes

- Add `overflow: hidden` to `.no-scroll` styling on `<body>` for modal to prevent scroll element for content behind modal being displayed

## 0.18.2

### Changes

- Updates Accordion sets so that first item in list doesn't have `-1px` top margin

## 0.18.1

### Breaking Changes

- For `Input` components that use the `.input-group` class, on mobile those input elements are now stacked on top of each other rather than side-to-side.

### Updates

- Updates the `Input` component to allow it to render a "hidden" input type.

## 0.18.0

### Breaking Changes

- Removes type, color, and line-height declarations from `body` tags and moves them to the `.nypl-ds` namespace

## 0.17.4

### Changes

- Moves footer outside of `.nypl-ds` namespace on Template story

## 0.17.3

### Adds

- `SkeletonLoader` component for loading screens

## 0.17.2

### Adds

- `selectedOption` to `Pagination` story

## 0.17.1

### Adds

- `FiftyFifty` Hero type styling

## 0.17.0

### Breaking Changes

- Sets up the default `font-size` value in the `.nypl-ds` namespace.

## 0.16.1

### Adds

- Styling for `Accordion` sets

### Changes

- `className`s within `Accordion` for content
- Hover stylings for `Accordion`

## 0.16.0

### Breaking Changes

- Removes the padding on the `breakout` mixin
- Removes the padding on the `wrapper` mixin at the `xl` breakpoint

## 0.15.1

### Removes

- `arrow_xsmall` and `search_small` icons

## 0.15.0

### Breaking Changes

- Fixes a bug in which content was not centered within `Button` when button was made larger than the text content

### Removes

- Additional `Button` CSS that was no longer used after Button API refactor in 0.13.0
- Deprecates `SearchResultItem`

## 0.14.0

### Breaking Changes

- `Image` now has an `alt` prop instead of an `altText` prop
- Removes `isDecorative` property in favor of an empty `alt`

### Adds

- Adds HTML `<img>` props to the `Image` component

## 0.13.0

### Breaking Changes

- Removes all icon props from `Button`. Button now uses `Icon` as a child
- Removes `ButtonIconPositions`

### Changes

- Makes `Button`'s `onClick` property optional

## 0.12.0

### Breaking Changes

- Moves box-sizing declarations to a `.nypl-ds` namespace. All future "global" CSS settings will move to exist under this namespace.

### Adds

- Universal focus styling

## 0.11.5

### Changes

- Updates the margin on action-links from `xxs` to `xs`

## 0.11.4

### Changes

- Removes the `description` tag from the `<span>` element wrapping svg icons (#360)

## 0.11.3

### Changes

- `Icon` now accepts children for custom icons

## 0.11.2

### Adds

- Status Badge component as stories

## 0.11.1

### Changes

- DS bundle is now compiled for es5 instead of es6 to accommodate for IE11 and the arrow functions we're using in DS

## 0.11.0

## Breaking Changes

- Removes options from the `Pagination` component

## 0.10.4

### Changes

- Updates the `Link` component's `linkType` prop to `type`, implements `React.forwardRef` to use with other libraries, and updates the stories.

## 0.10.3

### Changes

- Updates the `Icon` component's `name` prop to allow for `LogoNames` enum types.

### Adds

- Adds a "negative" NYPL logo to be used on non-white backgrounds.

## 0.10.2

### Changes

- Updates the formatting of svg file names to use underscores

## 0.10.1

### Changes

- Updates the `Input` element to allow props and attributes to be able to render input elements of type "radio".

## 0.10.0

### Removes

- Deprecates `SectionName` in favor of the stories under `Colors—Brand`

## 0.9.3

### Adds

- SVGs for NYPL full logo lockup, Queens Public Library Logo, and Brooklyn Public Library Logo

## 0.9.2

### Adds

- CSS to style [React Autosuggest](https://github.com/moroshko/react-autosuggest/)

## 0.9.1

### Changes

- `Breadcrumbs`'s background color now reflects the app's globally applied section modifier, such as `.nypl--locations`. It recognizes these for `--locations`, `--whats-on`, `--research`, and `--books-and-more`.

## 0.9.0

### Breaking Changes

- Removes `$color-spotlight`, `$color-your-interests`, `$color-support`, and `$color-help`
- Removes all `$nypl-` prefixed Sass variables
- `$color-success` is now `--ui-success`.
- Breakpoint variables are now prefixed with `breakpoint`.
- Type sizing variables are now prefixed with `font-size`.
- Typeface variables are now prefixed with `typeface`.
- Removes `--font-size-1p5`, which was originally added as certain designs call out `20px` for headings and others at `18px`. Figma documentation refers to `18px` only as of [0.1.1](https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=10975%3A16).

### Adds

- Exposes color and typography constants as CSS variables
- Adds Section colors for `--section-research-library-lpa`, `--section-research-library-schomburg`, and `--section-research-library-schwartzman`

### Removes

- Letterspacing property on all body copy

## 0.8.0

### Removes

- `width: 100%` on svgs

## 0.7.2

### Adds

- Adds icons for `accessibility_full`, `accessibility_partial`, `clock`, `check`, and `close`

### Changes

- Updates the `download` icon to Google Material Design's icon.

## 0.7.1

### Changes

- Updated the Select component to take in a ref using ForwardRef and also a `name` prop.

## 0.7.0

### Breaking Changes

- `FormDropDown` and `Dropdown` are now `Select`
- `Textfield` has been retired in favor of `Input`
- `Input` type is now controlled via an enum defined in `InputTypes` instead of a string
- Changes `referenceId` to `htmlFor` on `Label`
- Deprecates `DateRangeForm`, `BodyText`, `SearchPromo`, `Container`, and `RNHeaderWithSearch`
- `Button` now accepts an `onClick` instead of a `callback`
- In the `ButtonTypes` enum, `Filled` and `Outline` have been changed to `Primary` and `Secondary`, respectively
- `Accordion` now accepts `accordionLabel` and `labelId` instead of `buttonOpts` properties
- Removes project-specific styles for now deprecated `EditionCard`
- Removes project-specific styles of `.search-results-list` and `.form-item--radios`
- `UnorderedList` is now `List`, with an enum to control whether is it ordered or unordered
- `Input` `id` is no longer prepended with `input-`
- `Button` `id` is no longer prepended with `btn-`
- `SearchBar` no longer has props for `selectChangeHandler`, `selectBlurHandler`, or `searchChangeHandler`.
- `Input` offers `ariaLabel` and `ariaLabelledby` props in favor of `labelId` and `helperTextId`
- Removes `headingAttributes?: {}` from `SectionTitle`

### Adds

- Adds `aria-live` and `aria-atomic` to `HelperErrorText` in its errored state
- Adds "Optional", "Required", or empty string inside `Label` for forms
- Adds `IconNames` enum to make `allSVGs` array globally accessible
- Adds `width: 100%` globally to SVGs
- `Card` now constrains items in its `image` column to the column width
- Adds the `forwardRef` implementation to the `Input` component
- Adds `disabled` prop to `Input` and `Button` components
- Adds `disabled` styling to `Button.Primary`
- Adds `className?: string;` as additional props to all components
- Adds `attributes?: { [key: string]: string }; ` to `Input`, `Button`, `Select`, `Link`, and `Image`
- Adds `justify-content: center` for `Button` with icon to adjust for mobile

### Changes

- Fixes bug in former `FormDropdown` (now `Select`) where the select value would not change if `selectedOption` were passed
- `Link`'s scss now references `$ui-link-primary` instead of `$nypl-blue-regular`
- Changes `Select`'s SCSS to use the updated styling from Filament Group
- `Image` is wrapped in `figure` when `imageCaption` or `imageCredit` is passed to `Image`
- Adds `viewport` properties to any SVG files that were missing it

### Removes

- Removes `HelperErrorTextOptions`

## 0.6.0

### Breaking Changes

- Removes `RNSectionTitle`

### Changes

- Updates `$nypl-blue-regular` from #0071ce to #0576d3
- `$nypl-blue-regular` is now extended with `$ui-link-primary`

## [0.5.0]

### Breaking Changes

- `EditionCard` is now `Card`
- Buttons from black by default to blue

### Adds

- Icon for audiobook
- Changes the line-height values on some of the heading mixins

## [0.4.1]

### Changes

- Makes all IDs optional

## [0.4.0]

### Breaking Changes

- Concatenates `BasicLink`, `UnderlineLink`, and `IconLink` into `Link` with `LinkTypes` enum
- Moves styles into their corresponding component folders
- Moves base styles into the react-components package
- Deprecates `@nypl/design-system-styles`

### Changes

- Moves tests into their corresponding component folders
- Flattens component structure to export as one package.
- Exports `Icon`

## [0.3.7]

- Fixed `dist` script so it clears the folder
- Added `viewBox` to `arrow` icon

## [0.3.6]

- added `Template` stories
- fixed `Accordion` buttons
- added `viewBox` to `arrow-xsmall` icon

## [0.3.5]

- Move `Placeholder`, `Modal`, `SectionName` and `Container` from `/00-base` into top-level `/components`
- Fix Storybook errors for Headings with Bold and Headings with Link.
- Move `Headings/*` from `/02-molecules` into top-level `/components`
- Inlined icons inside `react-components`
- No longer publishing `@nypl/design-system-icons` package

## [0.3.4]

- Exported `searchValue` and `selectedField` in `RNHeaderWithSearch`

## [0.3.3]

- Added `blockName` handling to `DateRangeForm`

## [0.3.1]

- Exports `SectionName` and `Image`

## [0.3.0]

### Breaking Changes

- Edition Card no longer accepts strings for links and descriptions

### Changed

- Added `iconName` as an optional prop in `IconLink`

## [0.2.1] - 2020-04-23

### Removed

- `HeaderWithImageRight` component and corresponding story

## [0.2.0] - 2020-04-13

### Changed

- Reworks `HeaderWithImageRight` into `Hero`, which accepts values from an enum to display different kinds of heros based on [this documentation page](https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=10968%3A5314)

## [0.1.1]

### Changed

- `Textfield` id is no longer duplicated
- `Dropdown` now applies `bem` `blockName`
- `Pagination` now passes in `blockName` into `Dropdown`

## [0.1.0]

### Breaking Changes

- Large classes now have `Opts` inteface that allows for the component to be built over multiple steps. This affects:
  - `HelperErrorText`
  - `Label`
  - `TextField`
  - `Button`
- Deprecated `SearchResultsList`, `IconLinkList` and `EditionsList` in favor of `UnorderedList`
- `type` in `Button` now corresponds to html button types. `buttonType` in button corresponds to the visual categories of buttons (eg: `filled`, `outline`)
- `subtitle` in `SearchResultsItem` changed to `subtitleContent` to take a JSX
- `Label` and `Button` only accept children when called directly

### Added:

- `Checkbox`
- `DateRangeForm`
- `Input`
- `Accordion`
- `UnorderedList`
- # `Modal`

## [0.0.17] - 2020-03-17

- Changelog update

## [0.0.16]

- `HeaderImgRight` accepts elements

## [0.0.15] - 2020-03-3

### Changed

- `Button` component accepts content to render from its `content` prop or its `children` prop.

## [0.0.14] - 2020-02-18

### Changed

- `EditionCard` `EditionInfo` fields accept elements
- `EditionCard` `ReadOnline` and `Download` fields accept elements

### [0.0.14] - 2020-02-18

- added `noLinkElement` to `EditionCard` to receive an element

## [0.0.11] — 2020-01-23

### Added

- `EditionsList`

## [0.0.10] - 2020-01-14

### Added

- `Dropdown` which controls `FormDropdown` and its corresponding `Label`
- `Label`
- `HelperErrorText`
- `Pagination`
- `EditionCard` component
- `SearchResultItem` component that uses `EditionCard`
- `RN Header With Search`
- a story for `RN Section Title`, which is just a collection of styles
- `SearchResultsList` component

### Changed

- added `iconModifiers` to `Button`
- `buttonId` in `Button` is now required
- refactored `FormDropdown` to not include its own `label`
- `RN Header With Search`
- a story for `RN Section Title`, which is just a collection of styles
- `Link` -> `BasicLink` for clarity
- Bugfixes in `UnderlineLink` and `IconLink`
- Added stories for `BasicLink`
- `Link` missing URL error message
- Consolidated `Heading` and `PageTitle`
- `Heading` now only takes a single span
- Added ResearchNow specific `SearchBar` error state
- A11Y changes for `SearchBar` and `HeaderWithSearch`
- Added stories for AT-79, AT-264 and AT-3
- `selectedOption` added to `FormDropdown` stores selected state

## [0.0.7] - 2020-01-03

### Added

- A webpack file in order to build and distribute a compiled version of the react components. Does not replace the /lib folder usage, but the main file is now pointing to `/dist/design-system-react-components.min.js`.

## [0.0.6] - 2019-12-31

### Added

- `Image` for 2:1 ratio
- `PageTitle`
- `Header with Image Right`
- `FormDropdown`
- `SearchPromo`

### Changed

- Moved heading-related atoms from `01-atoms/Text` into `01-atoms/Text/Heading`
- Updated `Searchbar` component to include Parameters
- Changed `Breadcrumb` export from `Breadcrumbs`

## [0.0.5] - 2019-12-06

### Changed

- `Icon` import

## [0.0.4] - 2019-12-06

### Added

- `Body text` component for plain-text elements
- `UnderlineLink` and `IconLink` for links
- `Icon` component that uses the `design-system-icons` package.
- `SectionTitle` and `Heading` for heading components
- `IconLink-List`for the list of subject links
- `Button` and `TextField` for the searchbar
- `SearchBar` component

### Changed

- `Breadcrumb` now shows icon in mobile view

## [0.0.3] - 2019-11-15

### Changed

- Changed `Breadcrumb` to `Breadcrumbs` to match Twig
- Changed the Breadcrumbs props to accept components

## [0.0.2] - 2019-11-13

### Added

- Started a change log
- Added the Breadcrumb React Component

### Changed

- Changed folder structure to match Twig

## [0.0.1] - 2019-11-13

- Published as a test
