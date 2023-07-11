import {
  activeFocus,
  checkboxRadioLabelStyles,
  checkboxRadioControlSize,
  checkboxRadioHelperErrorTextStyle,
  screenreaderOnly,
  checkboxRadioHoverStyles,
} from "./global";

// Style object for the Radio's "control" or visual icon.
const baseStyleControl = {
  verticalAlign: "middle",
  transitionProperty: "box-shadow",
  transitionDuration: "normal",
  border: "2px solid",
  borderRadius: "round",
  borderColor: "ui.gray.dark",
  backgroundColor: "ui.gray.xx-light-cool",
  color: "ui.white",
  outline: "none",
  _checked: {
    bg: "ui.gray.xx-light-cool",
    borderColor: "ui.focus",
    color: "ui.white",
    _disabled: {
      borderColor: "ui.disabled.primary",
      bg: "ui.gray.xx-light-cool",
      _before: {
        bg: "ui.disabled.primary",
      },
    },
    _invalid: {
      _hover: {
        borderColor: "ui.error.primary",
      },
      _before: {
        borderColor: "ui.error.primary",
        bg: "ui.error.primary",
      },
    },
    _hover: {
      bg: "ui.gray.xx-light-cool",
    },
    _before: {
      content: `""`,
      display: "block",
      w: "3",
      h: "3",
      borderRadius: "round",
      bg: "ui.focus",
    },
  },
  _disabled: {
    borderColor: "ui.disabled.primary",
    bg: "ui.gray.xx-light-cool",
  },
  _focus: {
    ...activeFocus(),
    boxShadow: "outline",
    borderColor: "ui.focus",
  },
  _invalid: {
    borderColor: "ui.error.primary",
  },
  _dark: {
    borderColor: "dark.ui.border.default",
    backgroundColor: "dark.ui.bg.default",

    _checked: {
      borderColor: "dark.ui.focus",

      _disabled: {
        borderColor: "dark.ui.disabled.secondary",
        _before: {
          bg: "dark.ui.disabled.secondary",
        },
      },

      _invalid: {
        borderColor: "dark.ui.error.primary",
        _before: {
          borderColor: "dark.ui.error.primary",
          bg: "dark.ui.error.primary",
        },
      },
    },

    _disabled: {
      borderColor: "dark.ui.disabled.secondary",
      _before: {
        bg: "dark.ui.disabled.secondary",
      },
    },

    _focus: {
      boxShadow: "none",
      outlineColor: "dark.ui.focus",
    },

    _invalid: {
      borderColor: "dark.ui.error.primary",
    },
    _before: {
      bg: "dark.ui.focus",
    },
  },
};

// Style object for the Radio's label
const baseStyleLabel = checkboxRadioLabelStyles;

// Style object for the Radio's helper text
const baseStyleHelperErrorText = checkboxRadioHelperErrorTextStyle;

const baseStyle = {
  // Chakra-inserted elements in the Chakra Radio component
  control: baseStyleControl,
  label: baseStyleLabel,
  // Custom element in the DS Radio component.
  helperErrorText: baseStyleHelperErrorText,
  hiddenLabel: screenreaderOnly(),
};

// Sticking to "md" for the default size.
const sizes = {
  md: {
    control: {
      ...checkboxRadioControlSize,
    },
    label: { fontSize: "desktop.label.label1" },
  },
};

const Radio = {
  parts: ["control", "helperErrorText", "hiddenLabel", "label"],
  baseStyle,
  sizes,
  // Default values
  defaultProps: {
    size: "md",
  },
};

// Target the Radio's ComponentWrapper parent to be able to
// style the hover styles when the label is hovered.
export const RadioWrapper = {
  baseStyle: {
    label: {
      ...checkboxRadioHoverStyles,
    },
  },
};

export default Radio;
