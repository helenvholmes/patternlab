import * as React from "react";
import bem from "../../utils/bem";
import { InputTypes } from "./InputTypes";

export interface InputProps {
    /** ID that other components can cross reference for accessibility purposes */
    id?: string;

    /** Populates the aria-label on the select */
    ariaLabel?: string;

    /** Populates the aria-labelledby on the select */
    ariaLabelledBy?: string;

    /** Will add 'aria-required: true' to input */
    required?: boolean;

    /** className you can add in addition to 'input' */
    className?: string;

    /** blockName for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
    blockName?: string;

    /** Modifiers array for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
    modifiers?: string[];

    errored?: boolean;

    /** Populates the value of the select */
    value?: string | number;

    /** Populates the placeholder of the select */
    placeholder?: string;

    /** HTML Input types as defined by MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input */
    type?: InputTypes;

    /** ID of associated label */
    labelId?: string;

    /** ID of associated HelperText */
    helperTextId?: string;
}

export default function Input(props: InputProps) {
    const {
        ariaLabel,
        ariaLabelledBy,
        blockName,
        className,
        errored,
        helperTextId,
        id,
        labelId,
        placeholder,
        required,
        type = "text",
        value,
    } = props;

    let modifiers = props.modifiers ? props.modifiers : [];

    if (errored) {
        modifiers.push("error");
    }

    let inputProps = {
        className: bem("input", modifiers, blockName, [className]),
        type: type,
        value: value,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
    };

    if (required) {
        inputProps["aria-required"] = true;
    }

    if (labelId && !helperTextId) {
        inputProps["aria-labelledby"] = labelId;
    } else if (helperTextId && !labelId) {
        inputProps["aria-labelledby"] = helperTextId;
    } else if (labelId && helperTextId) {
        inputProps["aria-labelledby"] = labelId + " " + helperTextId;
    }

    let transformedInput = (
        <input id={`input-${id}`} {...inputProps} placeholder={placeholder} />
    );

    return transformedInput;
}
