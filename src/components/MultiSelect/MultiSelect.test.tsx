import { axe } from "jest-axe";
import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import MultiSelect from "./MultiSelect";
import useMultiSelect from "../../hooks/useMultiSelect";

const items = [
  { id: "dogs", name: "Dogs", isDisabled: false },
  { id: "cats", name: "Cats", isDisabled: false },
  { id: "cars", name: "Cars", isDisabled: true },
  {
    id: "colors",
    name: "Colors",
    isDisabled: false,
    children: [
      { id: "red", name: "Red", isDisabled: false },
      { id: "blue", name: "Blue", isDisabled: false },
    ],
  },
  { id: "plants", name: "Plants", isDisabled: false },
  { id: "furniture", name: "Furniture", isDisabled: false },
];

const disabledItems = [
  { id: "dogs", name: "Dogs", isDisabled: false },
  { id: "cats", name: "Cats", isDisabled: false },
  { id: "cars", name: "Cars", isDisabled: true },
  {
    id: "colors",
    name: "Colors",
    isDisabled: false,
    children: [
      { id: "red", name: "Red", isDisabled: true },
      { id: "blue", name: "Blue", isDisabled: true },
    ],
  },
  { id: "plants", name: "Plants", isDisabled: false },
  { id: "furniture", name: "Furniture", isDisabled: false },
];

const itemsWithCount = [
  { id: "dogs", name: "Dogs", itemCount: 5 },
  { id: "cats", name: "Cats", itemCount: 11 },
  { id: "cars", name: "Cars", itemCount: 7 },
  {
    id: "colors",
    name: "Colors",
    itemCount: 9,
    children: [
      { id: "red", name: "Red", itemCount: 8 },
      { id: "blue", name: "Blue", itemCount: 1 },
    ],
  },
  { id: "plants", name: "Plants", itemCount: 4 },
  { id: "furniture", name: "Furniture", itemCount: 6 },
];

const defaultItemsVisible = 5;

const MultiSelectTestComponent = ({
  multiSelectId,
  initialSelectedItems = {},
}) => {
  const {
    onChange,
    onMixedStateChange,
    selectedItems,
    setSelectedItems,
    onClear,
  } = useMultiSelect();

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MultiSelect
      id={multiSelectId}
      buttonText="multiselect-button-text"
      defaultItemsVisible={defaultItemsVisible}
      isDefaultOpen={false}
      isSearchable={false}
      isBlockElement={false}
      items={items}
      selectedItems={selectedItems}
      onChange={(e) => onChange(e.target.id, multiSelectId)}
      onMixedStateChange={(e) => {
        onMixedStateChange(e.target.id, multiSelectId, items);
      }}
      onClear={() => onClear(multiSelectId)}
    />
  );
};

describe("MultiSelect Accessibility", () => {
  let selectedTestItems;
  beforeEach(() => (selectedTestItems = {}));

  it("should have no axe violations for the 'multi-select' component", async () => {
    const { container } = render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("MultiSelect", () => {
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event("resize"));
    };
  });

  let selectedTestItems;
  beforeEach(() => (selectedTestItems = {}));

  it("should initially render with provided id", () => {
    const { container } = render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(container.querySelector("#multiselect-test-id")).toBeInTheDocument();
  });

  it("should initially render with a given button text", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(
      screen.getByRole("button", { name: /Multiselect button text/ })
    ).toBeInTheDocument();
  });

  it("the CheckboxGroup legend should have the same button text", () => {
    const { container } = render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(container.querySelector("legend")).toHaveTextContent(
      "Multiselect button text"
    );
  });

  it("should initially render with a closed menu when the isDefaultOpen is omitted or set to false", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("should initially render with open menu and disabled items", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={true}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={disabledItems}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByLabelText("Cats")).not.toBeDisabled();
    expect(screen.getByLabelText("Dogs")).not.toBeDisabled();
    expect(screen.getByLabelText("Cars")).toBeDisabled();
    expect(screen.getByLabelText("Red")).toBeDisabled();
    expect(screen.getByLabelText("Blue")).toBeDisabled();
  });

  it("should initially render with open menu and items with item count", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={true}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={itemsWithCount}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByLabelText("Dogs5")).toBeInTheDocument();
    expect(screen.getByLabelText("Cats11")).toBeInTheDocument();
    expect(screen.getByLabelText("Cars7")).toBeInTheDocument();
    expect(screen.getByLabelText("Red8")).toBeInTheDocument();
  });

  it("should initially render with open menu if isDefaultOpen prop is true", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={true}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
  });

  it("should initially render with open menu if isDefaultOpen prop is true and when items are selected", () => {
    selectedTestItems = { "multiselect-test-id": { items: ["red", "blue"] } };
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        isDefaultOpen={true}
        isSearchable={false}
        isBlockElement={false}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByLabelText("Red")).toBeChecked();
    expect(screen.getByLabelText("Blue")).toBeChecked();
    expect(
      screen.getByTestId("multi-select-close-button-testid")
    ).toBeInTheDocument();
  });

  it("should initially render with open menu if isDefaultOpen prop is true and when selected items are empty", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isSearchable={false}
        isBlockElement={false}
        isDefaultOpen={true}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(
      screen.queryByTestId("multi-select-close-button-testid")
    ).not.toBeInTheDocument();
  });

  it("should close the multiselect when the component loses focus, if `closeOnBlur` is true", async () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        closeOnBlur={true}
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={true}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );

    const multiSelectButton = screen.getByRole("button");
    expect(multiSelectButton.getAttribute("aria-expanded")).toEqual("true");

    await userEvent.click(document.body);

    await waitFor(() =>
      expect(multiSelectButton).toHaveAttribute("aria-expanded", "false")
    );
  });

  it("should close the multiselect when the 'esc' key is pressed", async () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={true}
        isSearchable={false}
        isBlockElement={false}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );

    const multiSelectButton = screen.getByRole("button");
    const multiSelectCheckbox = screen.getByRole("checkbox", { name: /dogs/i });

    expect(multiSelectButton.getAttribute("aria-expanded")).toEqual("true");

    await userEvent.click(multiSelectCheckbox);

    await userEvent.keyboard("[Escape]");

    expect(multiSelectButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should allow user to toggle menu by clicking menu button or use the 'Enter'/'Spacebar' key", () => {
    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        selectedItems={selectedTestItems}
        onChange={() => null}
        onClear={() => null}
      />
    );

    // Initially closed
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "false"
    );
    expect(screen.queryByRole("checkbox")).toBeNull();

    // Open multiselect.
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );

    // Close multiselect.
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "false"
    );

    // TESTING FOR ENTER KEY
    // Open multiselect using ENTER key.
    userEvent.keyboard("[Enter]");
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );

    // Close multiselect using ENTER key.
    userEvent.keyboard("[Enter]");
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "false"
    );

    // TESTING FOR SPACEBAR KEY
    // Open multiselect using SPACEBAR key.
    userEvent.keyboard("[Space]");
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );

    // Close multiselect using SPACEBAR key.
    userEvent.keyboard("[Space]");
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "false"
    );
  });

  it("should call onChange when an item without child items or a child item is selected/unselected", () => {
    const onChangeMock = jest.fn();
    const onMixedStateChangeMock = jest.fn();

    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        items={items}
        selectedItems={selectedTestItems}
        onChange={onChangeMock}
        onMixedStateChange={onMixedStateChangeMock}
        onClear={() => null}
      />
    );
    // Open multiselect menu.
    userEvent.click(screen.queryByRole("button"));
    expect(screen.queryByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );

    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        selectedItems={selectedTestItems}
        onChange={onChangeMock}
        onMixedStateChange={onMixedStateChangeMock}
        onClear={() => null}
      />
    );
    userEvent.click(screen.queryByRole("checkbox", { name: /dogs/i }));
    expect(onMixedStateChangeMock).not.toBeCalled();
    expect(onChangeMock).toBeCalledTimes(1);

    userEvent.click(screen.queryByRole("checkbox", { name: /blue/i }));
    userEvent.click(screen.queryByRole("checkbox", { name: /plants/i }));
    expect(onMixedStateChangeMock).not.toBeCalled();
    expect(onChangeMock).toBeCalledTimes(3);

    userEvent.click(screen.queryByRole("checkbox", { name: /blue/i }));
    expect(onMixedStateChangeMock).not.toBeCalled();
    expect(onChangeMock).toBeCalledTimes(4);
  });

  it("should call onMixedStateChange when a parent item is selected/unselected", () => {
    const onChangeMock = jest.fn();
    const onMixedStateChangeMock = jest.fn();
    const { rerender } = render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        selectedItems={selectedTestItems}
        onChange={onChangeMock}
        onMixedStateChange={onMixedStateChangeMock}
        onClear={() => null}
      />
    );

    // Open menu
    userEvent.click(screen.queryByRole("button"));
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );
    rerender(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isDefaultOpen={false}
        isSearchable={false}
        isBlockElement={false}
        selectedItems={selectedTestItems}
        onChange={onChangeMock}
        onMixedStateChange={onMixedStateChangeMock}
        onClear={() => null}
      />
    );
    expect(screen.queryAllByRole("checkbox")).toHaveLength(8);
    expect(
      screen.queryByRole("checkbox", { name: /colors/i })
    ).toBeInTheDocument();
    userEvent.click(screen.queryByRole("checkbox", { name: /colors/i }));
    expect(onMixedStateChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).not.toBeCalled();

    userEvent.click(screen.queryByRole("checkbox", { name: /colors/i }));
    expect(onMixedStateChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).not.toBeCalled();
  });

  it("should have indeterminate state for parent item if not all child items are checked", () => {
    const { rerender } = render(
      <MultiSelectTestComponent multiSelectId="multiselect-test-id" />
    );
    // Open menu
    userEvent.click(screen.queryByRole("button"));
    expect(screen.queryByRole("button").getAttribute("aria-expanded")).toEqual(
      "true"
    );
    rerender(<MultiSelectTestComponent multiSelectId="multiselect-test-id" />);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(8);
    // Check the child
    userEvent.click(screen.getByText("Red"));
    // Child is checked
    expect(screen.getByLabelText("Red")).toBeChecked();
    // Parent is indeterminated
    expect(screen.getByLabelText("Colors")).toBePartiallyChecked();
  });

  it("should check all child items if parent is checked", () => {
    const { rerender } = render(
      <MultiSelectTestComponent multiSelectId="multiselect-test-id" />
    );
    // Open menu
    userEvent.click(screen.queryByRole("button"));
    rerender(<MultiSelectTestComponent multiSelectId="multiselect-test-id" />);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(8);
    // Check the parent item
    userEvent.click(screen.getByText("Colors"));
    // Parent is checked
    expect(screen.getByLabelText("Colors")).toBeChecked();
    // Children are checked
    expect(screen.getByLabelText("Red")).toBeChecked();
    expect(screen.getByLabelText("Blue")).toBeChecked();
  });

  it("should check parent item if all child items are checked", () => {
    selectedTestItems = {
      "multiselect-test-id": { items: ["red", "blue"] },
    };

    render(
      <MultiSelect
        id="multiselect-test-id"
        buttonText="Multiselect button text"
        defaultItemsVisible={defaultItemsVisible}
        items={items}
        isSearchable={false}
        isBlockElement={false}
        isDefaultOpen={true}
        selectedItems={selectedTestItems}
        onMixedStateChange={() => null}
        onChange={() => null}
        onClear={() => null}
      />
    );
    expect(screen.getByLabelText("Colors")).toBeChecked();
  });

  it("should render a count button with the correct count, should clear the selectedItems on click ", () => {
    const { rerender } = render(
      <MultiSelectTestComponent multiSelectId="multiselect-test-id" />
    );
    expect(
      screen.queryByTestId("multi-select-close-button-testid")
    ).not.toBeInTheDocument();

    // Open menu
    userEvent.click(screen.queryByRole("button"));

    rerender(<MultiSelectTestComponent multiSelectId="multiselect-test-id" />);
    // Check on item
    userEvent.click(screen.queryByRole("checkbox", { name: /dogs/i }));
    const countButton = screen.queryByTestId(
      "multi-select-close-button-testid"
    );

    // Check for the selectedItems count button to be present and reflect the count of selectedItems
    expect(countButton).toBeInTheDocument();
    expect(countButton).toHaveTextContent("1");

    // Check the parent item with two child item
    userEvent.click(screen.queryByRole("checkbox", { name: /colors/i }));
    // Check for the count of selectedItems
    expect(countButton).toHaveTextContent("3");

    // Close menu
    userEvent.click(screen.queryByTestId("multi-select-close-button-testid"));
    // Count button is still present
    expect(countButton).toHaveTextContent("3");
    // Click count button
    userEvent.click(countButton);
    // Count button disapeared
    expect(countButton).not.toBeInTheDocument();
  });

  it("should render the UI snapshot correctly", () => {
    const defaultComponent = renderer
      .create(
        <MultiSelect
          id="multiselect-test-id"
          buttonText="multiselect-button-text"
          defaultItemsVisible={defaultItemsVisible}
          items={items}
          isDefaultOpen={false}
          isSearchable={false}
          isBlockElement={false}
          selectedItems={selectedTestItems}
          onChange={() => null}
          onClear={() => null}
        />
      )
      .toJSON();

    const isOpen = renderer
      .create(
        <MultiSelect
          id="multiselect-test-id"
          buttonText="multiselect-button-text"
          defaultItemsVisible={defaultItemsVisible}
          items={items}
          isSearchable={false}
          isBlockElement={false}
          isDefaultOpen={true}
          selectedItems={selectedTestItems}
          onChange={() => null}
          onClear={() => null}
        />
      )
      .toJSON();

    selectedTestItems = { "multiselect-test-id": { items: ["red"] } };
    const mixedState = renderer
      .create(
        <MultiSelect
          id="multiselect-test-id"
          buttonText="multiselect-button-text"
          defaultItemsVisible={defaultItemsVisible}
          items={items}
          isDefaultOpen={true}
          isSearchable={false}
          isBlockElement={false}
          selectedItems={selectedTestItems}
          onMixedStateChange={() => null}
          onChange={() => null}
          onClear={() => null}
        />
      )
      .toJSON();

    selectedTestItems = {
      "multiselect-test-id": { items: ["red", "blue"] },
    };
    const allChecked = renderer
      .create(
        <MultiSelect
          id="multiselect-test-id"
          buttonText="multiselect-button-text"
          defaultItemsVisible={defaultItemsVisible}
          items={items}
          isDefaultOpen={false}
          isSearchable={false}
          isBlockElement={false}
          selectedItems={selectedTestItems}
          onMixedStateChange={() => null}
          onChange={() => null}
          onClear={() => null}
        />
      )
      .toJSON();

    expect(defaultComponent).toMatchSnapshot();
    expect(isOpen).toMatchSnapshot();
    expect(mixedState).toMatchSnapshot();
    expect(allChecked).toMatchSnapshot();
  });
});
