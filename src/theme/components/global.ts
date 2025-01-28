/** Export "mixin" styles. */
export { screenreaderOnly, wrapperStyles } from "./globalMixins";

/** Reusable component styles. */

const customFocusColor = (focusColor, focusColorDark) => ({
  boxShadow: "none",
  outline: "2px solid",
  outlineOffset: "2px",
  outlineColor: focusColor,
  zIndex: "9999",
  _dark: {
    outlineColor: focusColorDark,
  },
});
// Used in `Select` and `TextInput`.
const activeFocus = (darkMode = false) => ({
  boxShadow: "none",
  outline: "2px solid",
  outlineOffset: "2px",
  outlineColor: darkMode ? "dark.ui.focus" : "ui.focus",
  zIndex: "9999",
  _dark: {
    outlineColor: "dark.ui.focus",
  },
});
// Used in `Checkbox` and `Radio`.
const checkboxRadioLabelStyles = {
  userSelect: "none",
  fontWeight: "text.default",
  marginBottom: "0",
  marginStart: "xs",
  width: "100%",
  _disabled: {
    color: "ui.gray.dark",
    opacity: 1,
    fontStyle: "italic",
  },
  _invalid: {
    color: "ui.error.primary",
  },
  _dark: {
    _disabled: {
      color: "dark.ui.disabled.primary",
    },
    _invalid: {
      color: "dark.ui.error.primary",
    },
  },
};
// Custom values not in the spacing theme.
// Used in `Checkbox` and `Radio`.
const checkboxRadioControlSize = {
  h: "1.375rem",
  w: "1.375rem",
};
// Used in `Checkbox` and `Radio`.
const checkboxRadioHelperErrorTextStyle = {
  marginStart: "30px", // calc(22px + var(--nypl-space-xs))
  _disabled: {
    color: "ui.gray.dark",
    fontStyle: "italic",
  },
};
// General hover styles for Checkbox and Radio
const checkboxRadioHoverStyles = {
  _hover: {
    span: {
      _first: {
        borderColor: "ui.black",
      },
      _checked: {
        borderColor: "ui.focus",
      },
      _disabled: {
        borderColor: "ui.disabled.primary",
      },
      _invalid: {
        borderColor: "ui.error.primary",
      },
    },
    _dark: {
      span: {
        _first: {
          borderColor: "dark.ui.border.hover",
        },
        _checked: {
          borderColor: "dark.ui.focus",
        },
        _disabled: {
          borderColor: "dark.ui.disabled.secondary",
        },
        _invalid: {
          borderColor: "dark.ui.error.primary",
        },
      },
    },
  },
};
const checkboxRadioGroupStyles = (isFullWidth = false) => ({
  helperErrorText: {
    marginTop: "xs",
  },
  label: {
    display: "flex",
    width: isFullWidth ? "100%" : "fit-content",
  },
});
// Default sizes used throughout the codebase.
const defaultElementSizes = {
  mobileFieldHeight: "44px",
};
// Used in `Label` and `Fieldset`.
const labelLegendText = {
  color: "ui.typography.heading",
  display: "inline-block",
  fontSize: "desktop.label.label1",
  fontWeight: "label.default",
  marginBottom: "xs",
  width: "100%",
  span: {
    fontWeight: "regular",
  },
  _dark: {
    color: "dark.ui.typography.heading",
  },
};
// Used in form inputs that require nuanced spacing.
const labelLegendTextSpecialSpacing = {
  marginBottom: "xxxs",
};

// Used for the disabled state of Select and TextInput
const selectTextInputDisabledStyles = {
  bg: "ui.disabled.secondary",
  borderColor: "ui.disabled.primary",
  color: "ui.gray.dark",
  opacity: "1",
  _dark: {
    bg: "dark.ui.bg.default",
    borderColor: "dark.ui.disabled.secondary",
    color: "dark.ui.disabled.primary",
  },
};
// Used for the focus state of Select and TextInput
const selectTextInputFocusStyles = {
  ...activeFocus(),
  borderColor: "ui.focus",
  _dark: {
    ...activeFocus(true),
    borderColor: "dark.ui.focus",
  },
};
// Used for p, ul, and ol
const textMargin = {
  margin: "0",
  marginBottom: "s",
};

export {
  activeFocus,
  checkboxRadioControlSize,
  checkboxRadioGroupStyles,
  checkboxRadioHelperErrorTextStyle,
  checkboxRadioHoverStyles,
  checkboxRadioLabelStyles,
  customFocusColor,
  defaultElementSizes,
  labelLegendText,
  labelLegendTextSpecialSpacing,
  selectTextInputDisabledStyles,
  selectTextInputFocusStyles,
  textMargin,
};
