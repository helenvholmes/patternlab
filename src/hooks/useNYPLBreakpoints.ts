import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/**
 * This hook is used to determine if the current screen size is larger than
 * the specific NYPL breakpoint values. The returned value is an object with
 * boolean values for each breakpoint.
 */
const useNYPLBreakpoints = () => {
  // Local state is used and updated with the `useEffect` hook so that the
  // initial breakpoint values are the same on the server and client side.
  const [layoutSize, setLayoutSize] = useState<any>({
    isLargerThanSmall: false,
    isLargerThanMedium: false,
    isLargerThanLarge: false,
    isLargerThanXLarge: false,
    isSmallerThanMedium: false,
  });
  const [
    isLargerThanSmall,
    isLargerThanMedium,
    isLargerThanLarge,
    isLargerThanXLarge,
    isSmallerThanMedium,
  ] = useMediaQuery([
    "(min-width: 320px)",
    "(min-width: 600px)",
    "(min-width: 960px)",
    "(min-width: 1280px)",
    "(max-width: 599px)",
  ]);

  useEffect(() => {
    setLayoutSize({
      isLargerThanSmall,
      isLargerThanMedium,
      isLargerThanLarge,
      isLargerThanXLarge,
      isSmallerThanMedium,
    });
  }, [
    isLargerThanSmall,
    isLargerThanMedium,
    isLargerThanLarge,
    isLargerThanXLarge,
    isSmallerThanMedium,
  ]);

  return {
    isLargerThanSmall: layoutSize.isLargerThanSmall,
    isLargerThanMedium: layoutSize.isLargerThanMedium,
    // NYPL uses the medium 600px breakpoint to determine if the screen is
    // in the mobile view. This is the recommended boolean value to use.
    isLargerThanMobile: layoutSize.isLargerThanMedium,
    isLargerThanLarge: layoutSize.isLargerThanLarge,
    isLargerThanXLarge: layoutSize.isLargerThanXLarge,
    // The values use a desktop-first approach. In an effort to mitigate the
    // flashing font size issue in the Heading responsive font sizes, the DS
    // will use a desktop-first style approach.
    isSmallerThanMedium: layoutSize.isSmallerThanMedium,
    isSmallerThanDesktop: layoutSize.isSmallerThanMedium,
  };
};

export default useNYPLBreakpoints;
