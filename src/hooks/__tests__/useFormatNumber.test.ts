import useFormatNumber from "../useFormatNumber";

describe("useFormatNumber hook", () => {
  it("returns a number with commas and handles a range of numbers", () => {
    expect(useFormatNumber("4382")).toEqual("4,382");
    expect(useFormatNumber("4382", "1234")).toEqual("1,234&ndash;4,382");
    expect(useFormatNumber("4382", "XX1234")).toEqual(null);
    expect(useFormatNumber("4382XXX", "1234")).toEqual(null);
    expect(useFormatNumber("4382XXX", "1234XXX")).toEqual(null);
    expect(useFormatNumber(4382)).toEqual("4,382");
    expect(useFormatNumber(4382)).toEqual("4,382");
    expect(useFormatNumber(4276835)).toEqual("4,276,835");
    expect(useFormatNumber(4276835.879)).toEqual("4,276,835.879");
    expect(useFormatNumber(1, 99)).toEqual("1&ndash;99");
    expect(useFormatNumber(141, 58)).toEqual("58&ndash;141");
    expect(useFormatNumber(100, 102)).toEqual("100&ndash;102");
    expect(useFormatNumber(10, 100)).toEqual("10&ndash;100");
  });
});
