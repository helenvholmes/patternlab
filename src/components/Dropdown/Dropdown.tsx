import * as React from "react";
import bem from "../../utils/bem";
import Icon from "../Icons/Icon";
import { IconNames } from "../Icons/IconTypes";
import Checkbox from "../Checkbox/Checkbox";

export interface DropdownProps {
  /** Inner label on the button that opens the dropdown */
  dropdownLabel?: React.ReactNode;
  /** BlockName for use with BEM. See how to work with blockNames and BEM here: http://getbem.com/introduction/ */
  blockName?: string;
  /** className you can add in addition to 'input' */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** dropdownLabel's input ID */
  inputId?: string;
  /** Modifiers array for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
  modifiers?: string[];
  /** options to populate Dropdown */
  options?: { [name: string]: string }[];
}

/** Dropdown component that shows content on toggle */
export default function Dropdown(
  props: React.PropsWithChildren<DropdownProps>
) {
  const {
    modifiers = [],
    blockName,
    id,
    className,
    inputId,
    dropdownLabel,
    options,
  } = props;

  return (
    <div id={id} className={bem("dropdown", modifiers, blockName, [className])}>
      <input
        id={`dropdown-${inputId}`}
        className={bem("input", modifiers, "dropdown")}
        type="checkbox"
      />
      <label
        htmlFor={`dropdown-${inputId}`}
        className={bem("label", modifiers, "dropdown")}
      >
        {dropdownLabel}
        <Icon
          decorative={true}
          name={IconNames.minus}
          modifiers={["small", `${IconNames.minus}`]}
        />
        <Icon
          decorative={true}
          name={IconNames.plus}
          modifiers={["small", `${IconNames.plus}`]}
        />
      </label>
      <div className={bem("content", modifiers, "dropdown")}>
        <form>
          <fieldset>
            {options.map(option => (
              <div>
                <input type="checkbox" name={option.name} />
                <label htmlFor={option.name}>{option.name}</label>
              </div>
            ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
