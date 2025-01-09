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

export default function useFormatNumber(num1: any, num2?: any) {
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
    )}`;
  }

  // For a larger range, simply return the full formatted range with commas
  return `${formatNumberWithCommas(start)}&ndash;${formatNumberWithCommas(
    end
  )}`;
}
