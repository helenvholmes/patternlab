import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import useNYPLTheme from "../useNYPLTheme";
import DSProvider from "../../theme/provider";

describe("useNYPLTheme", () => {
  it("returns an empty object when not used inside a DSProvider component", () => {
    const warn = jest.spyOn(console, "warn");
    const { result } = renderHook(() => useNYPLTheme());

    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir useNYPLTheme: hook must be used inside of `<DSProvider />`."
    );
    expect(result.current).toEqual({});
  });

  it("returns an object with NYPL styles", () => {
    const { result } = renderHook(() => useNYPLTheme(), {
      wrapper: ({ children }): any => <DSProvider>{children}</DSProvider>,
    });
    const allKeys = Object.keys(result.current);
    const colorsKeys = Object.keys((result.current as any).colors);

    expect(allKeys).toEqual([
      "breakpoints",
      "colors",
      "fontSizes",
      "fontWeights",
      "fonts",
      "radii",
      "space",
    ]);
    expect(colorsKeys).toEqual([
      "brand",
      "dark",
      "section",
      "transparent",
      "ui",
    ]);
  });
});
