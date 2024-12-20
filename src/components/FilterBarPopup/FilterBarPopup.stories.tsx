import type { Meta, StoryObj } from "@storybook/react";

import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import FilterBarPopup from "./FilterBarPopup";
import Heading from "../Heading/Heading";
import MultiSelect from "../MultiSelect/MultiSelect";
import MultiSelectGroup from "../MultiSelectGroup/MultiSelectGroup";
import TextInput from "../TextInput/TextInput";
import useMultiSelect from "../../hooks/useMultiSelect";

const multiSelectItems = [
  {
    id: "boroughs",
    name: "Boroughs",
    items: [
      { id: "bronx", name: "Bronx" },
      { id: "manhattan", name: "Manhattan" },
      { id: "staten-island", name: "Staten Island" },
    ],
  },
  {
    id: "accessibility",
    name: "Accessibility",
    items: [
      { id: "fully", name: "Fully accessible" },
      { id: "partially", name: "Partially accessible" },
      { id: "not", name: "Not accessible" },
    ],
  },
  {
    id: "subjects",
    name: "Subjects",
    items: [
      {
        id: "art",
        name: "Art",
        children: [
          { id: "architecture", name: "Architecture" },
          { id: "art-history", name: "Art History" },
          { id: "artists-books", name: "Artists' Books" },
          { id: "photography", name: "Photography" },
          { id: "prints", name: "Prints" },
        ],
      },
      { id: "genealogy", name: "Genealogy" },
      { id: "government", name: "Government" },
      {
        id: "history",
        name: "History",
        children: [
          { id: "african-american", name: "African American History" },
          { id: "united-states", name: "United States History" },
          { id: "world", name: "World History" },
        ],
      },
    ],
  },
];
const shortMultiSelectItems = [...multiSelectItems];
shortMultiSelectItems.pop();

const meta: Meta<typeof FilterBarPopup> = {
  title: "Components/Form Elements/FilterBarPopup",
  component: FilterBarPopup,
  argTypes: {
    className: { control: false },
    heading: { control: false },
    id: { control: false },
    isOpen: { table: { disable: true } },
    onClear: {
      description:
        "Function to clear all selectedItems - needs to be provided by consuming app",
    },
    onClose: { table: { disable: true } },
    onOpen: { table: { disable: true } },
    onSubmit: {
      description:
        "Function to handle submit of all selectedItems - needs to be provided by consuming app",
    },
    selectedItems: { control: false },
    totalResults: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBarPopup>;

/**
 * Main Story for the FilterBarPopup component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    id: "filterbar-popup-id",
    heading: "FilterBarPopup",
  },
  render: (args) => <FilterBarPopupStory {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=87515-97592",
    },
    jest: ["FilterBarPopup.test.tsx"],
  },
};

// The following are additional FilterBarPopup example Stories.
export const FilterBarPopupHeading: Story = {
  render: () => <FilterBarPopupHeadingStory />,
};
export const MultipleChildren: Story = {
  render: () => <FilterBarChildrenStory />,
};
export const TotalResultsExample: Story = {
  render: () => <FilterBarTotalResultsStory />,
};

const FilterBarPopupStory = (args) => {
  const { onChange, onMixedStateChange, selectedItems, onClear, onClearAll } =
    useMultiSelect();

  const selectedFilterItems = [selectedItems];

  const renderMultiSelect = ({ isBlockElement, multiSelectWidth }) => {
    return (
      multiSelectItems &&
      multiSelectItems.map((multiSelect) => (
        <MultiSelect
          buttonText={multiSelect.name}
          key={multiSelect.id}
          id={multiSelect.id}
          items={multiSelect.items}
          selectedItems={selectedItems}
          isBlockElement={isBlockElement}
          onChange={(e) => onChange(e.target.id, multiSelect.id)}
          onMixedStateChange={(e) => {
            return onMixedStateChange(
              e.target.id,
              multiSelect.id,
              multiSelect.items
            );
          }}
          onClear={() => onClear(multiSelect.id)}
          width={multiSelectWidth}
        />
      ))
    );
  };

  const renderFilterComponents = ({ layout, width }) => {
    return (
      <MultiSelectGroup
        id="multiselect-group"
        labelText="MultiSelect Group"
        layout={layout}
        multiSelectWidth={width}
        renderMultiSelect={renderMultiSelect}
      />
    );
  };

  return (
    <FilterBarPopup
      id={args.id}
      heading={args.heading}
      onClear={onClearAll}
      onSubmit={() => console.log(selectedItems)}
      selectedItems={selectedFilterItems}
      renderChildren={renderFilterComponents}
    />
  );
};

const FilterBarPopupHeadingStory = () => {
  const { onChange, onMixedStateChange, selectedItems, onClear } =
    useMultiSelect();

  const renderMultiSelect = ({ isBlockElement, multiSelectWidth }) => {
    return (
      multiSelectItems &&
      multiSelectItems.map((multiSelect) => (
        <MultiSelect
          buttonText={multiSelect.name}
          key={multiSelect.id}
          id={multiSelect.id}
          items={multiSelect.items}
          selectedItems={selectedItems}
          isBlockElement={isBlockElement}
          onChange={(e) => onChange(e.target.id, multiSelect.id)}
          onMixedStateChange={(e) => {
            return onMixedStateChange(
              e.target.id,
              multiSelect.id,
              multiSelect.items
            );
          }}
          onClear={() => onClear(multiSelect.id)}
          width={multiSelectWidth}
        />
      ))
    );
  };

  const renderFilterComponents = ({ layout, width }) => {
    return (
      <MultiSelectGroup
        id="multiselect-group"
        labelText="MultiSelect Group"
        layout={layout}
        multiSelectWidth={width}
        renderMultiSelect={renderMultiSelect}
      />
    );
  };

  return (
    <VStack align="left">
      <Box>Custom H3 Heading</Box>
      <FilterBarPopup
        heading={<Heading level="h3">Custom H3 Heading</Heading>}
        renderChildren={renderFilterComponents}
      />
      <Box>Custom H5 Heading</Box>
      <FilterBarPopup
        heading={<Heading level="h5">Custom H5 Heading</Heading>}
        renderChildren={renderFilterComponents}
      />
      <Box>Default heading</Box>
      <FilterBarPopup renderChildren={renderFilterComponents} />
    </VStack>
  );
};

const FilterBarChildrenStory = (args) => {
  const { onChange, onMixedStateChange, selectedItems, onClear, onClearAll } =
    useMultiSelect();
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [selectedFilterItems, setSelectedFilterItems] = useState([
    selectedItems,
    selectedCheckbox,
    textValue,
  ]);

  useEffect(() => {
    setSelectedFilterItems([selectedItems, selectedCheckbox, textValue]);
  }, [selectedItems, selectedCheckbox, textValue]);

  const onClearFilterBar = () => {
    onClearAll();
    setSelectedCheckbox([]);
    setTextValue("");
  };

  const renderMultiSelect = ({ isBlockElement, multiSelectWidth }) => {
    return (
      shortMultiSelectItems &&
      shortMultiSelectItems.map((multiSelect) => (
        <MultiSelect
          buttonText={multiSelect.name}
          key={multiSelect.id}
          id={multiSelect.id}
          items={multiSelect.items}
          selectedItems={selectedItems}
          isBlockElement={isBlockElement}
          onChange={(e) => onChange(e.target.id, multiSelect.id)}
          onMixedStateChange={(e) => {
            return onMixedStateChange(
              e.target.id,
              multiSelect.id,
              multiSelect.items
            );
          }}
          onClear={() => onClear(multiSelect.id)}
          width={multiSelectWidth}
        />
      ))
    );
  };

  const renderFilterComponents = ({ layout, width }) => {
    return (
      <>
        <MultiSelectGroup
          id="multiselect-group"
          labelText="MultiSelect Group"
          layout={layout}
          multiSelectWidth={width}
          renderMultiSelect={renderMultiSelect}
        />
        <CheckboxGroup
          id="checkbox-example"
          labelText="Checkbox Group"
          name="checkboxExample"
          layout={layout}
          value={selectedCheckbox}
          onChange={(e) => {
            setSelectedCheckbox(e);
          }}
        >
          <Checkbox id="checkbox-1" value="1" labelText="Checkbox 1" />
          <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
        </CheckboxGroup>
        <TextInput
          id="textinput-example"
          isClearable
          isClearableCallback={() => setTextValue("")}
          labelText="What is your favorite color?"
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="i.e. blue, green, etc."
          value={textValue}
        />
      </>
    );
  };

  return (
    <FilterBarPopup
      id={args.id}
      heading={args.heading}
      onClear={onClearFilterBar}
      onSubmit={() => console.log(selectedFilterItems)}
      selectedItems={selectedFilterItems}
      renderChildren={renderFilterComponents}
    />
  );
};

const FilterBarTotalResultsStory = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [totalResults, setTotalResults] = useState(100);
  const [selectedFilterItems, setSelectedFilterItems] = useState([
    selectedCheckbox,
    textValue,
  ]);

  useEffect(() => {
    setSelectedFilterItems([selectedCheckbox, textValue]);
  }, [selectedCheckbox, textValue]);

  const setRandomTotalNumber = () => {
    setTotalResults(Math.floor(Math.random() * 100));
  };

  const clearFilters = () => {
    setTotalResults(100);
    setTextValue("");
    setSelectedCheckbox([]);
  };

  const renderFilterComponents = ({ layout }) => {
    return (
      <>
        <CheckboxGroup
          id="checkbox-example"
          labelText="Checkbox Group"
          name="checkboxExample"
          layout={layout}
          value={selectedCheckbox}
          onChange={(e) => {
            setSelectedCheckbox(e);
            setRandomTotalNumber();
          }}
        >
          <Checkbox id="checkbox-1" value="1" labelText="Checkbox 1" />
          <Checkbox id="checkbox-2" value="2" labelText="Checkbox 2" />
        </CheckboxGroup>
        <TextInput
          id="textinput-example"
          isClearable
          isClearableCallback={() => setTextValue("")}
          labelText="What is your favorite color?"
          onChange={(e) => {
            setTextValue(e.target.value);
            setRandomTotalNumber();
          }}
          placeholder="i.e. blue, green, etc."
          value={textValue}
        />
      </>
    );
  };

  return (
    <>
      <FilterBarPopup
        id="filterbar-with-tagset"
        onClear={clearFilters}
        selectedItems={selectedFilterItems}
        renderChildren={renderFilterComponents}
        totalResults={totalResults}
      />
    </>
  );
};
