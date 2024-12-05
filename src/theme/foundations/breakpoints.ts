export const headerBreakpoints = {
  mh: "52em", // "832px",
  lh: "64em", // "1024px
};

/**
 * Breakpoints from "src/styles/base/_01-breakpoints.scss"
 * How to use Chakra responsive styles: https://chakra-ui.com/docs/features/responsive-styles
 *
 * Chakra Value |     DS Variable           | EM/PX value
 * ------------------------------------------------------
 *      sm      | --nypl-breakpoint-small   | 20em/320px
 *      md      | --nypl-breakpoint-medium  | 37.5em/600px
 *      lg      | --nypl-breakpoint-large   | 60em/960px
 *      xl      | --nypl-breakpoint-xl      | 80em/1280px
 *     2xl      |        N/A                | 96em/1536px
 *
 * @Note Chakra provides a 2xl option while the DS does not. We don't
 * recommend using this value until further notice.
 */
export default {
  sm: "20em",
  md: "37.5em",
  // Temporary and just for the header
  mh: headerBreakpoints.mh,
  lg: "60em",
  // Temporary and just for the header
  lh: headerBreakpoints.lh,
  xl: "80em",
  "2xl": "96em",
};
