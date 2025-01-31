import { act, renderHook } from "@testing-library/react-hooks";
import useNYPLBreakpoints from "../useNYPLBreakpoints";

describe("useNYPLBreakpoints", () => {
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event("resize"));
    };
  });

  it("should report the correct media query match on window resize", () => {
    const { result } = renderHook(() => useNYPLBreakpoints());

    act(() => window.resizeTo(390, 600));
    expect(result.current).toEqual({
      isLargerThanSmall: false,
      isLargerThanMedium: false,
      isLargerThanLarge: false,
      isLargerThanXLarge: false,
      isLargerThanSmallMobile: false,
      isLargerThanLargeMobile: false,
      isLargerThanSmallTablet: false,
      isLargerThanLargeTablet: false,
      isLargerThanMobile: false,
      isLargerThanTablet: false,
    });

    act(() => window.resizeTo(480, 600));
    expect(result.current).toEqual({
      isLargerThanSmall: true,
      isLargerThanMedium: false,
      isLargerThanLarge: false,
      isLargerThanXLarge: false,
      isLargerThanSmallMobile: true,
      isLargerThanLargeMobile: false,
      isLargerThanSmallTablet: false,
      isLargerThanLargeTablet: false,
      isLargerThanMobile: false,
      isLargerThanTablet: false,
    });

    act(() => window.resizeTo(768, 600));
    expect(result.current).toEqual({
      isLargerThanSmall: true,
      isLargerThanMedium: true,
      isLargerThanLarge: false,
      isLargerThanXLarge: false,
      isLargerThanSmallMobile: true,
      isLargerThanLargeMobile: true,
      isLargerThanSmallTablet: false,
      isLargerThanLargeTablet: false,
      isLargerThanMobile: true,
      isLargerThanTablet: false,
    });

    act(() => window.resizeTo(1024, 600));
    expect(result.current).toEqual({
      isLargerThanSmall: true,
      isLargerThanMedium: true,
      isLargerThanLarge: true,
      isLargerThanXLarge: false,
      isLargerThanSmallMobile: true,
      isLargerThanLargeMobile: true,
      isLargerThanSmallTablet: true,
      isLargerThanLargeTablet: false,
      isLargerThanMobile: true,
      isLargerThanTablet: false,
    });

    act(() => window.resizeTo(1280, 600));
    expect(result.current).toEqual({
      isLargerThanSmall: true,
      isLargerThanMedium: true,
      isLargerThanLarge: true,
      isLargerThanXLarge: true,
      isLargerThanSmallMobile: true,
      isLargerThanLargeMobile: true,
      isLargerThanSmallTablet: true,
      isLargerThanLargeTablet: true,
      isLargerThanMobile: true,
      isLargerThanTablet: true,
    });
  });
});
