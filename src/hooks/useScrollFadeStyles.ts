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

        // Determine if we are scrolling to the left or right
        const isScrollingRight = scrollLeft > lastScrollLeft;
        setLastScrollLeft(scrollLeft); // Update last scroll position

        // Show right fade only if scrolling to the left
        if (!isScrollingRight) {
          // Show right fade only if not at the end
          const atRightEdge = scrollLeft + clientWidth >= scrollWidth;
          setShowRightFade(!atRightEdge);
        } else {
          setShowRightFade(false); // Hide when scrolling right
        }
      }
    };

    const refCurrent = scrollableRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll);

      // Initial check to set the right fade effect based on the initial scroll state
      const { scrollWidth, clientWidth, scrollLeft } = refCurrent;
      const atRightEdge = scrollLeft + clientWidth >= scrollWidth;

      // Set the right fade effect if content is scrollable and not at the right edge
      setShowRightFade(!atRightEdge);

      // If the scrollable area is already at the end, hide the right fade initially
      if (scrollWidth <= clientWidth) {
        setShowRightFade(false); // If the content fits in the viewport, no need for a fade
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
