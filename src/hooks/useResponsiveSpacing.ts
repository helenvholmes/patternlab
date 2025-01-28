/**
 * A custom hook This hook returns responsive gap and padding values that align
 * with NYPL design standards for responsive grids and columns. The values will
 * adjust based on the width of the viewport.
 */
function useResponsiveSpacing() {
  const responsiveGap = { base: "1rem", md: "1.5rem", xl: "2rem" };

  const responsiveEdgeSpacing = { base: "1rem", md: "1.5rem", xl: "1rem" };
  const responsiveMargin = responsiveEdgeSpacing;
  const responsivePadding = responsiveEdgeSpacing;

  return {
    responsiveGap,
    responsiveMargin,
    responsivePadding,
  };
}

export default useResponsiveSpacing;
