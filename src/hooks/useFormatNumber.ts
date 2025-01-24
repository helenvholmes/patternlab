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

const useFormatNumber = (
  num1: string | number,
  num2?: string | number
): string | null => {
  // Helper function to format a number with commas
  const formatNumberWithCommas = (num: number): string => {
    return num.toLocaleString(); // Formats the number with commas (e.g., 4382 -> "4,382")
  };

  // Helper function to validate and convert input into a valid number
  const isValidNumber = (value: any): boolean => {
    // Check if value is a valid number (either a number or a numeric string)
    return !isNaN(value) && !/[^0-9.-]/.test(value); // Ensures the value is purely numeric
  };

  const formatNumber = (num1: any, num2?: any): string | null => {
    let hasWarning = false; // Track if any warnings occurs

    // Check if num1 is valid
    if (!isValidNumber(num1)) {
      console.warn(
        `NYPL Reservoir useFormatNumber: The provided value ${num1} is not supported. Please ensure a valid value is passed.`
      );
      hasWarning = true;
    } else {
      // Convert num1 to a number if it is a valid numeric string
      num1 = typeof num1 === "string" ? parseFloat(num1) : num1;
    }

    // Check if num2 is provided and valid
    if (num2 !== undefined && !isValidNumber(num2)) {
      console.warn(
        `NYPL Reservoir useFormatNumber: The provided value ${num2} for the second argument is not supported. Please ensure a valid value is passed.`
      );
      hasWarning = true;
    } else if (num2 !== undefined) {
      // Convert num2 to a number if it is a valid numeric string
      num2 = typeof num2 === "string" ? parseFloat(num2) : num2;
    }

    // If either num1 or num2 is invalid, return null
    if (hasWarning) {
      return null;
    }

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

    const enDash = "\u2013";

    // If the range is between two consecutive numbers, display both
    if (end - start === 1) {
      return `${formatNumberWithCommas(start)}${enDash}${formatNumberWithCommas(
        end
      )}`;
    }

    // For a larger range, simply return the full formatted range with commas
    return `${formatNumberWithCommas(start)}${enDash}${formatNumberWithCommas(
      end
    )}`;
  };
  return formatNumber(num1, num2);
};

export default useFormatNumber;
