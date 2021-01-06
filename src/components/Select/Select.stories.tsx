import * as React from "react";

import Select from "./Select";
import Label from "../Label/Label";
import { action } from "@storybook/addon-actions";
import { text, boolean, select } from "@storybook/addon-knobs";
import HelperErrorText from "../HelperErrorText/HelperErrorText";

export default {
  title: "Select",
  component: Select,
};

const optionsGroup = ["Apples", "Pears", "Oranges", "Peaches", "Coconuts"];

let showLabel, showHelperText;

export const selectWithOptionalLabel = () => (
  <>
    {boolean("Show Label", true) ? (showLabel = true) : (showLabel = false)}
    {showLabel && (
      <Label
        htmlFor="select"
        optReqFlag={select(
          "Optional/Required Flag",
          ["Required", "Optional", ""],
          "Required"
        )}
        id={"label"}
      >
        {text("Select Label", "Fruit on your island: ")}
      </Label>
    )}
    <Select
      name="optionalLabelSelect"
      id={"select"}
      isRequired={false}
      ariaLabel="Select Label"
      labelId={"label"}
      helperTextId={"helperText"}
      selectedOption={select(
        "Initial Selected Option",
        optionsGroup,
        optionsGroup[3]
      )}
      onBlur={action("blur")}
      onChange={action("changed")}
      modifiers={boolean("Errored", false) ? ["error"] : null}
      disabled={boolean("Disabled", false)}
    >
      <option aria-selected={true}>
        {text("Option One", optionsGroup[0])}
      </option>
      <option aria-selected={false}>
        {text("Option Two", optionsGroup[1])}
      </option>
      <option aria-selected={false}>
        {text("Option Three", optionsGroup[2])}
      </option>
      <option aria-selected={false}>
        {text("Option Four", optionsGroup[3])}
      </option>
      <option aria-selected={false}>
        {text("Option Five", optionsGroup[4])}
      </option>
    </Select>
    {boolean("Show Helper Text", true)
      ? (showHelperText = true)
      : (showHelperText = false)}
    {showHelperText && (
      <HelperErrorText isError={boolean("Is Errored", false)} id={"helperText"}>
        {text(
          "Helper Text Content",
          "Once you pick a fruit for your island it cannot be changed, so choose wisely!"
        )}
      </HelperErrorText>
    )}
  </>
);

selectWithOptionalLabel.storyName = "Select";
selectWithOptionalLabel.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Master?node-id=11895%3A549",
  },
};
