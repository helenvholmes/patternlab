import { HelperErrorTextType } from "../components/HelperErrorText/HelperErrorText";
import { AriaAttributes } from "./interfaces";

// Utility functions to use throughout the codebase

/**
 * range
 * Get an array of values from `start` to `stop` - 1 with an optional
 * `step` between values.
 */
export const range = (start: number, stop: number, step = 1): number[] => {
  if (!start) {
    return [];
  }

  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

/**
 * Given a pagination's pageCount, this will return (1) a page number,
 * derived from the current URL, and (2) a function that, when passed to
 * Pagination component, makes the URL change and refreshes the page.
 * @NOTE this is only used for Storybook documentation.
 */
export const getStorybookHrefProps = (pageCount: number) => {
  const urlParams = new URLSearchParams(document.location.search);
  const pageParam = urlParams.get("page");

  const getPageNumber = (page: number) => {
    return page > 0 && page <= pageCount ? page : 1;
  };
  const computedCurrentPage =
    pageParam && Number(pageParam) && getPageNumber(Number(pageParam));
  const location = window.location;
  // Passing this function into `Pagination` makes the URL to change
  // and refreshes the page.
  // NOTE: This is very flaky. It removes the `&page=[number]` from the URL
  // and replaces it with the new page number. This is not ideal, but if it is
  // not removed, the example `Pagination` won't work.
  // Not a problem in real life apps (maybe?).
  const getPageHref = (selectedPage: number) => {
    const updatedHref = location.href.replace(/&page=.*/, "");
    return `${updatedHref}&page=${selectedPage}`;
  };

  return { computedCurrentPage, getPageHref };
};

interface GetAriaAttrsProps {
  additionalAriaLabel?: string;
  footnote: HelperErrorTextType;
  id: string;
  labelText: HelperErrorTextType;
  name: string;
  additionalHelperTextIds?: string;
  showLabel: boolean;
}
/**
 * Get aria-* attributes for input components. This sets the `aria-label` and
 * `aria-describedby` attributes, based on the label and footnote values.
 */
export const getAriaAttrs = ({
  additionalAriaLabel,
  footnote,
  id,
  labelText,
  name,
  additionalHelperTextIds,
  showLabel,
}: GetAriaAttrsProps): AriaAttributes => {
  let ariaAttributes: AriaAttributes = {};

  // If both a label and an aria-label are present, screen
  // readers will only read the aria-label so we need to
  // provide all necessary details in the aria-label.
  if (additionalAriaLabel) {
    ariaAttributes["aria-label"] = `${labelText}, ${additionalAriaLabel}`;
  }

  if (!showLabel) {
    if (typeof labelText !== "string") {
      console.warn(
        `NYPL Reservoir ${name}: \`labelText\` must be a string when \`showLabel\` is false.`
      );
    }
    // If showLabel is false and we have not yet added an
    // aria-label, we need to add one with all relevant
    // details.
    if (!("aria-label" in ariaAttributes)) {
      ariaAttributes["aria-label"] = labelText as string;
    }
  }

  // Screen readers will read both the `aria-label` and the
  // `aria-describedby`. The footnote should not be added to
  // the `aria-label` because it would be read twice.
  if (footnote) {
    ariaAttributes["aria-describedby"] = `${
      additionalHelperTextIds ? additionalHelperTextIds + " " : ""
    }${id}-helperText`;
  }
  return ariaAttributes;
};

/** Convert a hex color value to an rgb or rgba value */
export const hexToRGB = (hex: string, alpha: number) => {
  const shortHex = hex.length === 4;
  const rSlice = shortHex ? hex.slice(1, 2).repeat(2) : hex.slice(1, 3),
    gSlice = shortHex ? hex.slice(2, 3).repeat(2) : hex.slice(3, 5),
    bSlice = shortHex ? hex.slice(3, 4).repeat(2) : hex.slice(5, 7);
  const r = parseInt(rSlice, 16),
    g = parseInt(gSlice, 16),
    b = parseInt(bSlice, 16);
  const rgb = `${r}, ${g}, ${b}`;
  return alpha ? `rgba(${rgb},${alpha})` : `rgb(${rgb})`;
};

/** Calculate color luminance */
export const colorLuminance = (r, g, b) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/** Calculate color contrast ratio */
export const contrastRatio = (hex1: string, hex2: string) => {
  const rgb1 = hexToRGB(hex1, null);
  const rgb2 = hexToRGB(hex2, null);
  const colorLuminance1 = colorLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const colorLuminance2 = colorLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const ratio =
    colorLuminance1 > colorLuminance2
      ? (colorLuminance2 + 0.05) / (colorLuminance1 + 0.05)
      : (colorLuminance1 + 0.05) / (colorLuminance2 + 0.05);

  return (ratio * 10).toFixed(2);
};

/** This method will truncate text by centain length. Default length is 60. */
export const truncateText = (text: string, truncateTextLength: number = 60) => {
  const updatedText = text.substring(0, truncateTextLength - 1);
  return `${updatedText.substring(0, updatedText.lastIndexOf(" "))}...`;
};

/** Prepare a string for use in an ID or class attribute */
export const sanitizeStringForAttribute = (str: string) => {
  const sanitizedStr = str.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  return sanitizedStr;
};

/** Provides a random image to use as a placeholder. */
// @TODO: once a valid larger image source is identified, add a "larger" option
export type GetPlaceholderImageProps = "smaller" | "default";
export const getPlaceholderImage = (
  size: GetPlaceholderImageProps = "default",
  index: number = undefined
) => {
  const imageArray = [
    "https://images.nypl.org/index.php?id=swope_243048",
    "https://images.nypl.org/index.php?id=swope_243025",
    "https://images.nypl.org/index.php?id=swope_244712",
    "https://images.nypl.org/index.php?id=swope_243017",
    "https://images.nypl.org/index.php?id=swope_243943",
    "https://images.nypl.org/index.php?id=swope_244705",
    "https://images.nypl.org/index.php?id=swope_1026219",
    "https://images.nypl.org/index.php?id=swope_243070",
    "https://images.nypl.org/index.php?id=swope_243044",
    "https://images.nypl.org/index.php?id=ps_prn_cd6_82",
  ];
  const t = size === "smaller" ? "r" : "w";
  const finalIndex = isNaN(index)
    ? Math.floor(Math.random() * imageArray.length)
    : index;
  const selectedImage = imageArray[finalIndex];
  const finalImage = `${selectedImage}&t=${t}`;
  return finalImage;
};

/**
 * This function formats a number with commas and handles a range of numbers.
 *
 * 1. If one number is passed, it formats that number with commas.
 * 2. If two numbers are passed, it creates a range:
 *    - Numbers are formatted with commas.
 *    - En dash (`–`) is used for the range.
 *    - Consecutive numbers (e.g., 100–101) are formatted properly.
 *    - Repeating hundreds (e.g., 100–102) are handled to avoid redundancy.
 *
 * Examples:
 *  - (4382) -> "4,382"
 *  - (4276835) -> "4,276,835"
 *  - (1, 99) -> "1–99"
 *  - (141, 58) -> "58–141"
 *  - (100, 102) -> "100–102"
 *  - (10, 100) -> "10–100"
 */

export const formatNumber = (num1: number, num2?: number): string => {
  // Helper function to format a number with commas
  const formatNumberWithCommas = (num: number): string => {
    return num.toLocaleString(); // Formats the number with commas (e.g., 4382 -> "4,382")
  };

  // Case 1: Only one number is provided
  if (num2 === undefined) {
    return formatNumberWithCommas(num1); // Simply return the formatted number
  }

  // Case 2: Two numbers are provided, create a range
  const [start, end] = num1 < num2 ? [num1, num2] : [num2, num1]; // Ensure start is smaller

  // If the numbers are the same, return one formatted number
  if (start === end) {
    return formatNumberWithCommas(start);
  }

  // If the range is between two consecutive numbers, display both
  if (end - start === 1) {
    return `${formatNumberWithCommas(start)}&ndash;${formatNumberWithCommas(
      end
    )}`; // Correct string return
  }

  // For a larger range, simply return the full formatted range with commas
  return `${formatNumberWithCommas(start)}&ndash;${formatNumberWithCommas(
    end
  )}`;
};
