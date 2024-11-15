import React, { useEffect, useState, useRef } from "react";

/**
 * The `useScrollFadeStyles` hook manages the visibility of a right-side fade effect
 * based on horizontal scrolling. It tracks scroll events and shows the fade effect
 * when scrolling to the left and more content is available to the right, hiding it
 * when scrolling right or when at the right edge of the scrollable container.
 */
export default function useScrollFadeStyles() {
  const [showRightFade, setShowRightFade] = useState(false);
  const [lastScrollLeft, setLastScrollLeft] = useState(0);
  const scrollableRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;

        // If content fits exactly or only has a small amount of extra space, hide the fade
        if (scrollWidth <= clientWidth || scrollLeft + clientWidth >= scrollWidth) {
          setShowRightFade(false);
          return;
        }

        // Determine if we are scrolling to the left or right
        const isScrollingRight = scrollLeft > lastScrollLeft;
        setLastScrollLeft(scrollLeft); // Update last scroll position

        // Show right fade only if scrolling to the left and not at the end
        const atRightEdge = scrollLeft + clientWidth >= scrollWidth - 1; // Buffer to prevent flickering
        if (!isScrollingRight && !atRightEdge) {
          setShowRightFade(true);
        } else {
          setShowRightFade(false); // Hide when scrolling right or when near the right edge
        }
      }
    };

    const refCurrent = scrollableRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll);

      // Initial check to set the right fade effect based on the initial scroll state
      const { scrollWidth, clientWidth, scrollLeft } = refCurrent;
      const atRightEdge = scrollLeft + clientWidth >= scrollWidth - 1; // Buffer to prevent flickering

      // Set the right fade effect if content is scrollable and not at the right edge
      if (scrollWidth > clientWidth && !atRightEdge) {
        setShowRightFade(true);
      } else {
        setShowRightFade(false);
      }
    }

    // Cleanup event listener on component unmount
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollLeft]); // Only depend on `lastScrollLeft`

  return {
    scrollableRef,
    showRightFade,
  };
}