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
  });
  const [
    isLargerThanSmall,
    isLargerThanMedium,
    isLargerThanLarge,
    isLargerThanXLarge,
  ] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
    "(min-width: 1024px)",
    "(min-width: 1280px)",
  ]);

  useEffect(() => {
    setLayoutSize({
      isLargerThanSmall,
      isLargerThanMedium,
      isLargerThanLarge,
      isLargerThanXLarge,
    });
  }, [
    isLargerThanSmall,
    isLargerThanMedium,
    isLargerThanLarge,
    isLargerThanXLarge,
  ]);

  return {
    // Chakra default
    isLargerThanSmall: layoutSize.isLargerThanSmall,
    isLargerThanMedium: layoutSize.isLargerThanMedium,
    isLargerThanLarge: layoutSize.isLargerThanLarge,
    isLargerThanXLarge: layoutSize.isLargerThanXLarge,

    // NYPL semantic
    isLargerThanSmallMobile: layoutSize.isLargerThanSmall,
    isLargerThanLargeMobile: layoutSize.isLargerThanMedium,
    isLargerThanSmallTablet: layoutSize.isLargerThanLarge,
    isLargerThanLargeTablet: layoutSize.isLargerThanXLarge,

    // NYPL uses the medium 768px breakpoint to determine if the screen is in
    // the mobile view. This is the recommended boolean value to use.
    isLargerThanMobile: layoutSize.isLargerThanMedium,

    // NYPL uses the extra are 1280px breakpoint to determine if the screen is
    // in the tablet view. This is the recommended boolean value to use.
    isLargerThanTablet: layoutSize.isLargerThanXLarge,
  };
};

export default useNYPLBreakpoints;
