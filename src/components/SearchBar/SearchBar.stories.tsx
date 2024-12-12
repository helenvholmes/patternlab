import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { useState } from "react";

import SearchBar from "./SearchBar";
import * as autoSuggestStories from "../Autosuggest/Autosuggest.stories-unresolved";
import Heading from "../Heading/Heading";
import { argsBooleanType } from "../../helpers/storybookUtils";
import Checkbox from "../Checkbox/Checkbox";
import { Box } from "@chakra-ui/react";

const meta: Meta<typeof SearchBar> = {
  title: "Components/Form Elements/SearchBar",
  component: SearchBar,
  argTypes: {
    action: { control: false },
    ariaLabel: { control: false },
    buttonOnClick: {
      control: false,
      table: { defaultValue: { summary: "null" } },
    },
    className: { control: false },
    id: { control: false },
    isDisabled: argsBooleanType(),
    isInvalid: argsBooleanType(),
    isRequired: argsBooleanType(),
    method: { control: false },
    onSubmit: { control: false },
    selectProps: { control: false },
    showHelperText: {
      description: "Only used for Storybook",
    },
    showSelect: {
      description: "Only used for Storybook",
    },
    textInputElement: { control: false },
    textInputProps: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const optionsGroup = [
  { text: "Art", value: "art" },
  { text: "Bushes", value: "bushes" },
  { text: "Clothing", value: "clothing" },
  { text: "Flowers", value: "flowers" },
  { text: "Fossils", value: "fossils" },
  { text: "Fruits", value: "fruits" },
  { text: "Furniture", value: "furniture" },
  { text: "Songs", value: "songs" },
  { text: "Tools", value: "tools" },
  { text: "Villagers and their beloved pets", value: "villagers" },
];

/**
 * Main Story for the SearchBar component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    action: undefined,
    buttonOnClick: undefined,
    className: undefined,
    helperText: "Search for items in Animal Crossing New Horizons",
    id: "searchBar-id",
    invalidText: "Could not find the item :(",
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    labelText: "SearchBar Label",
    method: undefined,
    noBrandButtonType: false,
    onSubmit: () => {},
    selectProps: undefined,
    showHelperText: true,
    showSelect: true,
    textInputElement: undefined,
    textInputProps: undefined,
  },
  render: (args: any) => {
    const { helperText, showHelperText, showSelect, ...rest } = args;
    return (
      <SearchBar
        {...rest}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitted!");
        }}
        selectProps={
          showSelect && {
            labelText: "Select a category",
            name: "selectName",
            optionsData: optionsGroup,
          }
        }
        textInputProps={{
          isClearable: true,
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Item Search",
        }}
        helperText={showHelperText && helperText}
      />
    );
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=11689%3A423",
    },
    jest: ["SearchBar.test.tsx"],
  },
  play: async ({ canvasElement }) => {
    const textInput = within(canvasElement).getByRole("textbox");
    await userEvent.type(textInput, "Hello World");
    await userEvent.clear(textInput);
    expect(textInput).toHaveValue("");

    await userEvent.type(textInput, "Clearing this text");
    expect(textInput).toHaveValue("Clearing this text");
    const clearButton = within(canvasElement).getAllByRole("button")[0];
    await userEvent.click(clearButton);
    expect(textInput).toHaveValue("");

    const select = within(canvasElement).getByLabelText("Select a category");
    await userEvent.selectOptions(select, "fossils");
    expect(select).toHaveValue("fossils");
    expect(select).not.toHaveValue("songs");

    await userEvent.type(textInput, "Hello World");
    await userEvent.keyboard("{Enter}");

    const searchButton = within(canvasElement).getAllByRole("button")[1];
    await userEvent.click(searchButton);
  },
};

// The following are additional Accordion example Stories.
export const isClearableExample: Story = {
  render: () => (
    <SearchBar
      descriptionText="Begin typing for the clear button to appear. Once clicked, the value in the text input field will be cleared."
      id="textInput-isClearable"
      labelText="isClearable Example"
      onSubmit={() => {}}
      textInputProps={{
        isClearable: true,
        isClearableCallback: () => {
          console.log(
            "Clear button clicked from the `isClearableCallback` prop."
          );
        },
        labelText: "Item Search",
        name: "textInputName",
        placeholder: "Item Search",
      }}
    />
  ),
  name: "isClearable and isClearableCallback",
};

export const HelperErrorTextComponentExample: Story = {
  render: () => (
    <>
      <SearchBar
        descriptionText="The helper text below contains HTML in a string."
        helperText="Search for items in <b>Animal Crossing New Horizons</b>."
        id="helper-text"
        labelText="Helper text example"
        onSubmit={() => {}}
        textInputProps={{
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Item Search",
        }}
      />
      <br />
      <SearchBar
        descriptionText="The invalid text below contains HTML in a string."
        id="invalid-text"
        isInvalid
        invalidText="Could <b>not</b> find the item <b>:(</b>"
        labelText="Invalid text example"
        onSubmit={() => {}}
        textInputProps={{
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Item Search",
        }}
      />
    </>
  ),
  name: "HelperErrorText Component",
};

export const SearchAutocomplete: Story = {
  args: {
    id: "autocomplete",
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <SearchBar
        onSubmit={() => {}}
        textInputElement={autoSuggestStories.SearchBarExample()}
        helperText="Select your home library. Start by typing the name of the library. Try 'ba'."
        {...args}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <SearchBar
      helperText="This is the helper text!"
      id="error-state"
      invalidText="Could not find the item :("
      isInvalid
      labelText="Error example"
      onSubmit={() => {}}
      textInputProps={{
        labelText: "Item Search",
        name: "textInputName",
        placeholder: "Item Search",
      }}
    />
  ),
};
export const DisabledState: Story = {
  render: () => (
    <SearchBar
      helperText="Reason for disabled state."
      id="disabled-state"
      isDisabled
      labelText="Disabled example"
      onSubmit={() => {}}
      textInputProps={{
        labelText: "Item Search",
        name: "textInputName",
        placeholder: "Item Search",
      }}
    />
  ),
};

export const WithCustomHeading: Story = {
  render: () => (
    <SearchBar
      headingText={<Heading level="h4">Custom H4 Heading</Heading>}
      id="custom-heading"
      labelText="Custom Heading example"
      onSubmit={() => {}}
      textInputProps={{
        labelText: "Item Search",
        name: "textInputName",
        placeholder: "Item Search",
      }}
    />
  ),
  name: "Heading and Description Text",
};
export const HeadingDescriptionExample: Story = {
  render: () => (
    <SearchBar
      descriptionText="This is the description for this `SearchBar` instance."
      headingText="Heading for this `SearchBar`"
      id="heading-and-description"
      labelText="Heading and Description example"
      onSubmit={() => {}}
      textInputProps={{
        labelText: "Item Search",
        name: "textInputName",
        placeholder: "Item Search",
      }}
    />
  ),
  name: "Heading and Description Text",
};

function SearchBarValueExampleComponent() {
  const [selectValue, setSelectValue] = useState("Tools");
  const selectOnChange = (event) => {
    console.log(`onChange Select value: ${event.target.value}`);
    setSelectValue(event.target.value);
  };
  const textInputOnChange = (event) => {
    console.log(`onChange TextInput value: ${event.target.value}`);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(`onSubmit Select value: ${event.target.selectName.value}`);
    console.log(`onSubmit TextInput value ${event.target.textInputName.value}`);
  };
  return (
    <SearchBar
      helperText="Search for an item"
      invalidText="Could not find the item :("
      id="example-1"
      labelText="Logging example"
      onSubmit={onSubmit}
      selectProps={{
        labelText: "Select a category",
        name: "selectName",
        onChange: selectOnChange,
        optionsData: optionsGroup,
        value: selectValue,
      }}
      textInputProps={{
        labelText: "Item Search",
        name: "textInputName",
        onChange: textInputOnChange,
        placeholder: "Item Search",
      }}
    />
  );
}

export const WithSearchElement: Story = {
  render: () => (
    <search>
      <SearchBar
        headingText={<Heading level="h4">Item search</Heading>}
        id="with-search-element"
        labelText="With search element example"
        onSubmit={() => {}}
        textInputProps={{
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Item Search",
        }}
      />
      <Box sx={{ marginTop: "s" }}>
        <Checkbox id={"public-domain"} labelText={"Only public domain"} />
      </Box>
    </search>
  ),
  name: "Search Landmark Element Example",
};

export const SearchBarValueExample: Story = {
  render: () => <SearchBarValueExampleComponent />,
  name: "TextInput and onSubmit Values",
};
