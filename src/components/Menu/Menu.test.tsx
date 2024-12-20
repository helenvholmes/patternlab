/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { axe } from "jest-axe";

import Menu from "./Menu";
import {
  defaultListItems,
  duplicateIdListItems,
  missingChildrenListItems,
  missingIdListItems,
  missingLabelListItems,
  missingOnClickListItems,
  missingTypeListItems,
} from "./menuTestData";

describe("Menu Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(
      <Menu labelText={"Menu"} listItemsData={defaultListItems} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Menu opens and closes", () => {
  it("renders content when it is opened", async () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);

    const openButton = screen.getByText("Menu").parentElement!;

    fireEvent.click(openButton);
    await waitFor(() => openButton.getAttribute("aria-expanded") === "true");
  });

  it("closes when menu item is selected", async () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);

    const openButton = screen.getByText("Menu").parentElement!;

    fireEvent.click(openButton);
    await waitFor(() => openButton.getAttribute("aria-expanded") === "true");

    const firstMenuItem = screen.getByText("I'm item 1");
    act(() => {
      fireEvent.focus(firstMenuItem);
      fireEvent.click(firstMenuItem);
    });

    await waitFor(() => openButton.getAttribute("aria-expanded") === "false");
  });

  it("closes with Escape key when focus is on menu list", async () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);

    const openButton = screen.getByText("Menu").parentElement!;

    fireEvent.click(openButton);
    await waitFor(() => openButton.getAttribute("aria-expanded") === "true");

    const firstMenuItem = screen.getByText("I'm item 1");
    act(() => {
      fireEvent.focus(firstMenuItem);
    });

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => openButton.getAttribute("aria-expanded") === "false");
  });

  it("closes when clicking outside of the menu", async () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);

    const openButton = screen.getByText("Menu").parentElement!;

    fireEvent.click(openButton);
    await waitFor(() => openButton.getAttribute("aria-expanded") === "true");

    fireEvent.click(document);
    await waitFor(() => openButton.getAttribute("aria-expanded") === "false");
  });
});

describe("Menu allows selection", () => {
  it("registered an item has been selected", () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);
    const openButton = screen.getByText("Menu");
    fireEvent.click(openButton);
    const button1 = screen.getByText("I'm item 1").closest("button");
    expect(button1).toBeInTheDocument();

    fireEvent.click(button1);
    expect(button1).toHaveAttribute("data-testid", "selected-item");
    expect(button1).not.toBeVisible();
  });

  it("remembers selected item", () => {
    render(<Menu labelText={"Menu"} listItemsData={defaultListItems} />);
    const openButton = screen.getByText("Menu");
    fireEvent.click(openButton);
    const button1 = screen.getByText("I'm item 1").closest("button");
    fireEvent.click(button1);
    fireEvent.click(openButton);
    expect(button1).toHaveAttribute("data-testid", "selected-item");
  });

  it("displays selected item as label", () => {
    render(
      <Menu
        showSelectionAsLabel
        labelText={"Menu"}
        listItemsData={defaultListItems}
      />
    );
    const openButton = screen.getByText("Menu");
    fireEvent.click(openButton);
    const button1 = screen.getByText("I'm item 1").closest("button");
    fireEvent.click(button1);
    fireEvent.click(openButton);
    expect(button1).toHaveAttribute("data-testid", "selected-item");
    expect(screen.getAllByText("I'm item 1")).toHaveLength(2);
  });

  it("displays selected item as label with pre-selected item", () => {
    render(
      <Menu
        showSelectionAsLabel
        selectedItem="item-title-1"
        labelText={"Menu"}
        listItemsData={defaultListItems}
      />
    );
    const openButton = screen.getAllByText("I'm item 1")[0];
    fireEvent.click(openButton);
    expect(
      screen.getAllByText("I'm item 1")[1].closest("button")
    ).toHaveAttribute("data-testid", "selected-item");
  });
});

describe("Menu logs errors when props are incorrect or missing", () => {
  it("logs an error if Menu is missing listItemsData", () => {
    const warn = jest.spyOn(console, "warn");
    // @ts-ignore: Typescript complains when a required prop is not passed, but
    // here we don't want to pass the required prop to make sure the warning appears.
    render(<Menu labelText={"Menu"} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: The `listItemsData` prop is required."
    );
  });
  it("logs an error if the selectedItem prop does not match any menu item", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Menu
        labelText={"Menu"}
        listItemsData={defaultListItems}
        selectedItem="im-not-an-id"
      />
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: The `selectedItem` prop does not match any of the menu items."
    );
  });
  it("logs an error if menu items have duplicate ids", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Menu labelText={"Menu"} listItemsData={duplicateIdListItems} />);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: The `id` values for the list items are not all unique."
    );
  });
  it("logs a warning if a menu item does not have a type", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Menu labelText={"Menu"} listItemsData={missingTypeListItems} />);

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: A `type` value is required for each list item."
    );
  });
  it("logs a warning if a menu item does not have an id", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Menu labelText={"Menu"} listItemsData={missingIdListItems} />);

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: An `id` value is required for each list item."
    );
  });
  it("logs a warning if a menu item does not have a label", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Menu labelText={"Menu"} listItemsData={missingLabelListItems} />);

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: A `label` value is required for all list actions and groups."
    );
  });
  it("logs a warning if a menu item does not have an onClick function", () => {
    const warn = jest.spyOn(console, "warn");
    render(<Menu labelText={"Menu"} listItemsData={missingOnClickListItems} />);

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: An `onClick` function is required for all actions."
    );
  });
  it("logs a warning if a group item does not have children", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      <Menu labelText={"Menu"} listItemsData={missingChildrenListItems} />
    );

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Menu: A `children` array is required for all list groups."
    );
  });
});
