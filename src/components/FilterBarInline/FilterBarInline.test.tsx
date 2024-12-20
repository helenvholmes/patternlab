import { axe } from "jest-axe";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import FilterBarInline from "./FilterBarInline";
import MultiSelect from "../MultiSelect/MultiSelect";
import MultiSelectGroup from "../MultiSelectGroup/MultiSelectGroup";
import useMultiSelect from "../../hooks/useMultiSelect";

const multiSelectItems = [
  {
    id: "colors",
    name: "Colors",
    items: [
      { id: "red", name: "Red" },
      { id: "blue", name: "Blue" },
      { id: "yellow", name: "Yellow" },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    items: [
      { id: "cat", name: "Cat" },
      {
        id: "dog",
        name: "Dog",
        children: [
          { id: "corgy", name: "Corgy" },
          { id: "german-sheperd", name: "German Sheperd" },
          { id: "afghan-hound", name: "Afghan Hound" },
        ],
      },
      { id: "rat", name: "Rat" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    items: [
      { id: "hammer", name: "Hammer" },
      {
        id: "skrewdriver",
        name: "Skrewdriver",
        children: [
          { id: "slottet", name: "Slotted Skrewdriver" },
          { id: "phillips", name: "Phillips Skrewdriver" },
          { id: "allen", name: "Allen Skrewdriver" },
        ],
      },
      { id: "whisk", name: "Whisk" },
    ],
  },
];

const defaultItemsVisible = 5;

interface FilterBarTestComponentProps {
  id?: string;
  onClearFilters?: () => void;
  onSubmit?: () => void;
}
const FilterBarTestComponent = ({
  id = "filterbar-id",
  onClearFilters,
  onSubmit,
}: FilterBarTestComponentProps) => {
  const { onChange, onMixedStateChange, selectedItems, onClear, onClearAll } =
    useMultiSelect();
  return (
    <FilterBarInline
      id={id}
      heading="FilterBar"
      layout="row"
      {...(onClearFilters && { onClear: onClearAll })}
      {...(onSubmit && { onSubmit: onSubmit })}
      selectedItems={[selectedItems]}
      renderChildren={({ layout, width }) => {
        return (
          <MultiSelectGroup
            id="multiselect-group"
            key="multiselect-group-key"
            labelText="MultiSelect Group"
            layout={layout}
            multiSelectWidth={width}
            renderMultiSelect={() => {
              return multiSelectItems.map((multiSelect) => (
                <MultiSelect
                  key={multiSelect.id}
                  id={multiSelect.id}
                  items={multiSelect.items}
                  selectedItems={selectedItems}
                  isDefaultOpen={false}
                  isSearchable={false}
                  isBlockElement={false}
                  buttonText={multiSelect.name}
                  defaultItemsVisible={defaultItemsVisible}
                  onChange={(e) => {
                    onChange(e.target.id, multiSelect.id);
                  }}
                  onMixedStateChange={(e) => {
                    onMixedStateChange(
                      e.target.id,
                      multiSelect.id,
                      multiSelect.items
                    );
                  }}
                  onClear={() => {
                    onClear(multiSelect.id);
                  }}
                />
              ));
            }}
          />
        );
      }}
    />
  );
};
const MultiSelectTestGroup = ({ multiSelectItems }) => {
  return (
    <MultiSelectGroup
      id="MultiSelectGroup"
      labelText="MultiSelectGroup example"
      showLabel={true}
      multiSelectWidth="full"
      renderMultiSelect={() => {
        return (
          multiSelectItems &&
          multiSelectItems.map((multiSelectItem) => (
            <MultiSelect
              key={multiSelectItem.id}
              id={multiSelectItem.id}
              items={multiSelectItem.items}
              isDefaultOpen={false}
              isSearchable={false}
              isBlockElement={false}
              selectedItems={{}}
              buttonText="MultiSelect"
              defaultItemsVisible={defaultItemsVisible}
              onChange={() => null}
              onMixedStateChange={() => null}
              onClear={() => "onClear"}
            />
          ))
        );
      }}
    />
  );
};
describe("FilterBarInline Accessibility", () => {
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

  it("should have no axe violations on desktop", async () => {
    window.resizeTo(1024, 600);
    const { container } = render(<FilterBarTestComponent />);
    // Make sure it renders desktop components
    expect(screen.getByRole("button", { name: /colors/i })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("FilterBarInline", () => {
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event("resize"));
    };
    window.resizeTo(1024, 600);
  });
  it("should render a 'Clear all filters' button when showClearAll prop is passed", () => {
    render(
      <FilterBarTestComponent
        onClearFilters={jest.fn()}
        id="filter-bar-test-1"
      />
    );
    expect(
      screen.getByRole("button", { name: /clear all filters/i })
    ).toBeInTheDocument();
  });
  it("should render a 'Apply filters' button when onSubmit prop is passed", () => {
    render(
      <FilterBarTestComponent onSubmit={jest.fn()} id="filter-bar-test-3" />
    );
    expect(
      screen.getByRole("button", { name: /apply filters/i })
    ).toBeInTheDocument();
  });
  it("should clear the selectedItems when 'Clear all filters' button is clicked", async () => {
    render(
      <FilterBarTestComponent
        onClearFilters={jest.fn()}
        id="filter-bar-test-2"
      />
    );
    // Open menu
    userEvent.click(screen.getByRole("button", { name: /colors/i }));
    // Open menu
    userEvent.click(screen.getByRole("button", { name: /pets/i }));
    // Open menu
    userEvent.click(screen.getByRole("button", { name: /tools/i }));
    // Check item
    userEvent.click(screen.getByRole("checkbox", { name: /blue/i }));
    // Check item
    userEvent.click(screen.getByText("Dog"));
    // Check item
    userEvent.click(screen.getByRole("checkbox", { name: /hammer/i }));
    expect(screen.getAllByRole("button", { name: /selected/i }).length).toBe(6);
    // click Clear All button
    userEvent.click(screen.getByRole("button", { name: /clear all filters/i }));
    expect(
      Object.keys(screen.findAllByRole("button", { name: /selected/i })).length
    ).toBe(0);
  });
  it("should call onSubmit function when 'Apply filters' button is clicked", () => {
    const mockonSubmit = jest.fn();
    const { rerender } = render(
      <FilterBarTestComponent onSubmit={mockonSubmit} id="filter-bar-test-4" />
    );
    rerender(
      <FilterBarTestComponent onSubmit={mockonSubmit} id="filter-bar-test-4" />
    );
    // click Submit All button
    userEvent.click(screen.getByRole("button", { name: /apply filters/i }));
    expect(mockonSubmit).toBeCalledTimes(1);
  });
  it("renders the UI snapshots correctly", () => {
    const defaultFilterBarNoButtons = renderer
      .create(
        <FilterBarInline
          id="defaultFilterBarNoButtons"
          heading="FilterBar"
          selectedItems={[]}
          renderChildren={() => {
            return <MultiSelectTestGroup multiSelectItems={multiSelectItems} />;
          }}
        />
      )
      .toJSON();
    const filterBarWithClearAllButton = renderer
      .create(
        <FilterBarInline
          id="filterBarWithClearAllButton"
          heading="FilterBar"
          onClear={() => null}
          selectedItems={[]}
          renderChildren={() => {
            return <MultiSelectTestGroup multiSelectItems={multiSelectItems} />;
          }}
        />
      )
      .toJSON();
    const filterBarWithSubmitAllButton = renderer
      .create(
        <FilterBarInline
          id="filterBarWithSubmitAllButton"
          heading="FilterBar"
          onSubmit={() => null}
          selectedItems={[]}
          renderChildren={() => {
            return <MultiSelectTestGroup multiSelectItems={multiSelectItems} />;
          }}
        />
      )
      .toJSON();
    const filterBarWithButtons = renderer
      .create(
        <FilterBarInline
          id="filterBarWithButtons"
          heading="FilterBar"
          onClear={() => null}
          onSubmit={() => null}
          selectedItems={[]}
          renderChildren={() => {
            return <MultiSelectTestGroup multiSelectItems={multiSelectItems} />;
          }}
        />
      )
      .toJSON();

    expect(defaultFilterBarNoButtons).toMatchSnapshot();
    expect(filterBarWithClearAllButton).toMatchSnapshot();
    expect(filterBarWithSubmitAllButton).toMatchSnapshot();
    expect(filterBarWithButtons).toMatchSnapshot();
  });
});
