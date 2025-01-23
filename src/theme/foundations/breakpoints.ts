export const headerBreakpoints = {
  mh: "52em", // "832px",
  lh: "64em", // "1024px
};

/**
 * How to use Chakra responsive styles: https://chakra-ui.com/docs/features/responsive-styles
 *
 * Chakra Value |     DS Variable                 | EM/PX value    | NYPL reference
 * --------------------------------------------------------------------------
 *      sm      | --nypl-breakpoint-small         | 30em / 480px   | small mobile
 *      md      | --nypl-breakpoint-medium        | 48em / 768px   | large mobile
 *      lg      | --nypl-breakpoint-large         | 64em / 1024px  | small tablet
 *      xl      | --nypl-breakpoint-xl            | 80em / 1280px  | large tablet
 *     2xl      | n/a                             | 96em / 1536px  | n/a
 *
 * @Note Chakra provides a 2xl option while the DS does not. We don't
 * recommend using this value until further notice.
 *
 * ------------ | ------------------------------- | -------------- | --------------
 * smallMobile  | --nypl-breakpoint-smallMobile   | 30em / 480px   | small mobile
 * largeMobile  | --nypl-breakpoint-largeMobile   | 48em / 768px   | large mobile
 * smallTablet  | --nypl-breakpoint-smallTablet   | 64em / 1024px  | small tablet
 * largeTablet  | --nypl-breakpoint-xlargeTablet  | 80em / 1280px  | large tablet
 */
export default {
  sm: "30em",
  md: "48em",
  // Temporary and just for the header
  mh: headerBreakpoints.mh,
  lg: "64em",
  // Temporary and just for the header
  lh: headerBreakpoints.lh,
  xl: "80em",
  "2xl": "96em",

  // NYPL semantic keys
  smallMobile: "30em",
  largeMobile: "48em",
  smallTablet: "64em",
  largeTablet: "80em",
};
