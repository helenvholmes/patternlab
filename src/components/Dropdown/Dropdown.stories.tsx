import * as React from "react";
import bem from "../../utils/bem";
import { Meta } from "@storybook/react/types-6-0";
import Dropdown from "./Dropdown";
import { withDesign } from "storybook-addon-designs";
import { ExampleCard } from "../Card/Card.stories";

export default {
  title: "Dropdown",
  component: Dropdown,
  decorators: [withDesign],
} as Meta;

// Set up the reusable template to create multiple stories for the
// Dropdown component.
const DropdownTemplate = ({ ...args }) => (
  <>
    <Dropdown {...args} id={`${args.id}`} />
    <ExampleCard />
  </>
);

export const ExampleDropdown = DropdownTemplate.bind({});

const options = [{ name: "Cats" }, { name: "Dogs" }, { name: "Rabbits" }];

// The `args` allow these props to be updated in the UI through the
// "Controls" tab.
ExampleDropdown.args = {
  dropdownLabel: "Click to expand",
  id: "exampleDropdown",
  children: (
    <form>
      <fieldset className={bem("fieldset", this.modifiers, "dropdown")}>
        {options.map(option => (
          <div key={`option-${option.name}`}>
            <input
              type="checkbox"
              id={option.name}
              className={bem("checkbox", this.modifiers, "dropdown")}
            />
            <label htmlFor={option.name}>{option.name}</label>
          </div>
        ))}
      </fieldset>
    </form>
  ),
};

ExampleDropdown.argTypes = {
  blockName: { table: { disable: true } },
  className: { table: { disable: true } },
  id: { table: { disable: true } },
  modifiers: { table: { disable: true } },
};

ExampleDropdown.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=17519%3A64445",
  },
};
