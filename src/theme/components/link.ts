import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { StyleFunctionProps } from "@chakra-ui/system";
import {
  baseButtonStyle,
  callout,
  noBrand,
  pill,
  primary,
  secondary,
} from "./button";
import { screenreaderOnly } from "./globalMixins";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["base", "screenreaderOnly"]);

interface CustomLinkStyleProps extends StyleFunctionProps {
  finalIsUnderlined: boolean;
  hasVisitedState: boolean;
}

export const linkUnderlineStyles = {
  textDecoration: "underline",
  textDecorationStyle: "dotted",
  textDecorationThickness: "1px",
};

export const baseLinkStyles = {
  color: "ui.link.primary",
  textUnderlineOffset: "2px",
  ...linkUnderlineStyles,
  _dark: {
    color: "dark.ui.link.primary",
  },
  _hover: {
    color: "ui.link.secondary",
    ...linkUnderlineStyles,
    // The dark mode hover color is not being picked up properly down stream, so
    // it is being explicitly added here.
    _dark: {
      color: "dark.ui.link.secondary",
    },
  },
};

const baseButtonLinkStyles = {
  ...baseButtonStyle,
  display: "inline-flex",
};

const moreLink = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      alignItems: "center",
      display: "inline-flex",
      whiteSpace: "nowrap",
      svg: {
        height: "s",
        width: "s",
        textDecoration: "none",
        fill: "currentColor",
      },
      _hover: {
        color: "ui.link.secondary",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
      },
      _visited: hasVisitedState
        ? {
            svg: {
              fill: "ui.link.tertiary",
            },
            _dark: {
              svg: {
                fill: "dark.ui.link.tertiary",
              },
            },
          }
        : {},
    },
  })
);
// The "button" variant is deprecated.
const button = definePartsStyle({
  base: {
    width: "100px",
    borderRadius: "sm",
    lineHeight: "1.5",
    display: "flex",
    cursor: "pointer",
    color: "ui.white",
    justifyContent: "center",
    py: "xs",
    px: "xs",
    textDecoration: "none",
    fontWeight: "button.default",
    bg: "ui.link.primary",
    _dark: {
      color: "ui.gray.xxx-dark",
      bg: "dark.ui.link.primary",
    },
    _hover: {
      color: "ui.white",
      bg: "ui.link.secondary",
      textDecoration: "underline",
      textDecorationStyle: "dotted !important",
      textDecorationThickness: "1px !important",
      _dark: {
        color: "ui.gray.xxx-dark",
        bg: "dark.ui.link.secondary",
      },
    },
    _visited: {
      color: "ui.white",
      _dark: {
        _visited: {
          color: "ui.gray.xxx-dark",
        },
      },
    },
  },
});

const buttonPrimary = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...primary({}).base,
      _hover: {
        backgroundColor: "ui.link.secondary",
        color: "ui.white",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
        // The dark mode hover color is not being picked up properly down stream, so
        // it is being explicitly added here.
        _dark: {
          color: "ui.gray.xxx-dark",
        },
      },
      _visited: hasVisitedState
        ? {
            color: "ui.white",
            _dark: {
              color: "ui.gray.xxx-dark",
            },
          }
        : {},
    },
  })
);

const buttonSecondary = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...secondary({}).base,
      _hover: {
        backgroundColor: "ui.link.primary-05",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
      },
      _visited: hasVisitedState
        ? {
            color: "ui.link.primary",
            _dark: {
              color: "dark.ui.link.primary",
            },
          }
        : {},
    },
  })
);

const buttonPill = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...pill({}).base,
      _hover: {
        color: "ui.black",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
        // The dark mode hover color is not being picked up properly down stream, so
        // it is being explicitly added here.
        _dark: {
          color: "dark.ui.typography.heading",
        },
      },
      _visited: hasVisitedState
        ? {
            color: "ui.black",
            _dark: {
              color: "ui.white",
            },
          }
        : {},
    },
  })
);

const buttonCallout = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...callout({}).base,
      _hover: {
        color: "ui.white",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
        // The dark mode hover color is not being picked up properly down stream, so
        // it is being explicitly added here.
        _dark: {
          color: "ui.white",
        },
      },
      _visited: hasVisitedState
        ? {
            color: "ui.white",
            _dark: {
              color: "ui.white",
            },
          }
        : {},
    },
  })
);

const buttonNoBrand = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...noBrand({}).base,
      _hover: {
        color: "ui.white",
        textDecoration: "underline",
        textDecorationStyle: "dotted !important",
        textDecorationThickness: "1px !important",
        // The dark mode hover color is not being picked up properly down stream, so
        // it is being explicitly added here.
        _dark: {
          color: "ui.white",
        },
      },
      _visited: hasVisitedState
        ? {
            color: "ui.white",
            _dark: {
              color: "ui.white",
            },
          }
        : {},
    },
  })
);

const buttonDisabled = definePartsStyle(
  ({ hasVisitedState }: CustomLinkStyleProps) => ({
    base: {
      ...baseButtonLinkStyles,
      ...primary({}).base,
      bg: "ui.gray.light-cool",
      color: "ui.gray.dark",
      opacity: "1",
      pointerEvents: "none",
      _visited: hasVisitedState
        ? {
            color: "ui.gray.dark",
            _dark: {
              color: "dark.ui.disabled.primary",
            },
          }
        : {},
      _dark: {
        bg: "dark.ui.disabled.secondary",
        color: "dark.ui.disabled.primary",
      },
    },
  })
);

const Link = defineMultiStyleConfig({
  baseStyle: definePartsStyle(
    ({ finalIsUnderlined = true, hasVisitedState }: CustomLinkStyleProps) => ({
      base: {
        ...baseLinkStyles,
        _visited: hasVisitedState
          ? {
              color: "ui.link.tertiary",
              _dark: {
                color: "dark.ui.link.tertiary",
              },
            }
          : {},
        textDecoration: finalIsUnderlined ? "underline" : "none",
        /** This is needed for custom anchor elements or link components
         * that are passed as children to the `Link` component. */
        a: {
          _hover: {
            color: "ui.link.secondary",
          },
        },
      },
      /** The element will handle descriptive text added to aid
       * screen readers. */
      screenreaderOnly: screenreaderOnly(),
    })
  ),
  variants: {
    button,
    buttonCallout,
    buttonDisabled,
    buttonNoBrand,
    buttonPill,
    buttonPrimary,
    buttonSecondary,
    moreLink,
  },
});

export default Link;
