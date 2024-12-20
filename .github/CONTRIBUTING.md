# Contributing to the Reservoir Design System

We're excited that you want to contribute to the Reservoir Design System!

The first step is to follow the [README](/README.md) to install the codebase and install the dependencies in order to be able to start the local development workflow.

Next, make sure to read the [Contributing to the React Library](https://github.com/NYPL/nypl-design-system/wiki/Contributing-to-the-React-Library) wiki page for an in-depth explanation on creating meaningful updates that follow our engineering conventions.

## React Component Guidelines

There are specific guidelines we MUST follow when creating components in order to maintain engineering principles and conventions that also expand into the wider NYPL Digital department.

### Components

When creating a new React component or updating an existing one, you MUST follow the [Anatomy of a Component](https://github.com/NYPL/nypl-design-system/wiki/Anatomy-of-a-Component) wiki page documentation. This explains all the files that make up a React component though it's possible to create or update a component without needing to create or edit a file mentioned. For example, if there is a styling error in the `Checkbox` component, it's possible you do not need to update its relevant test file.

### Documentation

When creating a new React component or updating an existing one, you MUST follow the [Anatomy of a Story](https://github.com/NYPL/nypl-design-system/wiki/Anatomy-of-a-Story) wiki page documentation. This explains the structure of an `MDX` file to create documentation for React components.

## Git Branching

There are currently two main branches named `development` and `release`.

### `development` Branch

All feature, bug, and task updates MUST first branch off the `development` branch. Make sure to include the JIRA ticket number in the branch name. For example: If there is a bug fix for JIRA ticket `DSD-101`, then the branch name should be `DSD-101/bug-fix`. If there is no JIRA ticket reference, prefix the branch with `no_ref/` such as `no_ref/typo-fix`.

Once the feature branch pull request is approved, it should be merged into the `development` branch.

End-to-end steps:

- Branch off `development` for your feature branch such as

```sh
$ git checkout -b DSD-101/bug-fix
```

- Implement your changes or bug fixes, commit, and push.

```sh
$ git add [name-of-files]
$ git commit -m "Fixing the bug"
$ git push -u origin DSD-101/bug-fix
```

- Create a PR pointing to `development` in Github.

### `release` branch

We release new features, updates, and bug fixes on a two-week schedule to keep in parallel with our two week sprints. Follow the [How to Run a Release](https://github.com/NYPL/nypl-design-system/wiki/How-to-Run-a-Release) wiki page for in-depth information on creating new DS releases.
