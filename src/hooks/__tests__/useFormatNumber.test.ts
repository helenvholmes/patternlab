import formatNumber from "../../hooks/useFormatNumber";
const enDash = "\u2013";

describe("useFormatNumber hook", () => {
  it("returns a number with commas and handles a range of numbers", () => {
    expect(formatNumber("4382")).toEqual("4,382");
    expect(formatNumber("4382", "1234")).toEqual(`1,234${enDash}4,382`);
    expect(formatNumber("4382", "XX1234")).toEqual(null);
    expect(formatNumber("4382XXX", "1234")).toEqual(null);
    expect(formatNumber("4382XXX", "1234XXX")).toEqual(null);
    expect(formatNumber(4382)).toEqual("4,382");
    expect(formatNumber(4382)).toEqual("4,382");
    expect(formatNumber(4276835)).toEqual("4,276,835");
    expect(formatNumber(4276835.879)).toEqual("4,276,835.879");
    expect(formatNumber(1, 99)).toEqual(`1${enDash}99`);
    expect(formatNumber(141, 58)).toEqual(`58${enDash}141`);
    expect(formatNumber(100, 102)).toEqual(`100${enDash}102`);
    expect(formatNumber(10, 100)).toEqual(`10${enDash}100`);
  });
});
