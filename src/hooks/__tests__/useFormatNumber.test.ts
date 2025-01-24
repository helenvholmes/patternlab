import formatNumber from "../../hooks/useFormatNumber";
const enDash = "\u2013";

describe("useFormatNumber hook", () => {
  it("returns a formatted number with commas for valid numeric strings", () => {
    expect(formatNumber("4382")).toEqual("4,382");
  });

  it("returns a formatted range of numbers with en dash for valid inputs", () => {
    expect(formatNumber("4382", "1234")).toEqual(`1,234${enDash}4,382`);
    expect(formatNumber(1, 99)).toEqual(`1${enDash}99`);
    expect(formatNumber(141, 58)).toEqual(`58${enDash}141`);
    expect(formatNumber(100, 102)).toEqual(`100${enDash}102`);
    expect(formatNumber(10, 100)).toEqual(`10${enDash}100`);
  });

  it("returns null and console warning when invalid numeric strings are passed", () => {
    const warn = jest.spyOn(console, "warn");

    expect(formatNumber("4382XXX", "1234")).toEqual(null);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir useFormatNumber: The provided value 4382XXX is not supported. Please ensure a valid value is passed."
    );

    expect(formatNumber("4382", "XX1234")).toEqual(null);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir useFormatNumber: The provided value XX1234 for the second argument is not supported. Please ensure a valid value is passed."
    );

    expect(formatNumber("4382XXX", "1234XXX")).toEqual(null);
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir useFormatNumber: The provided value 4382XXX is not supported. Please ensure a valid value is passed."
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir useFormatNumber: The provided value 1234XXX for the second argument is not supported. Please ensure a valid value is passed."
    );

  });

  it("handles valid numeric inputs with commas", () => {
    expect(formatNumber(4382)).toEqual("4,382");
    expect(formatNumber(4276835)).toEqual("4,276,835");
  });

  it("handles valid floating-point numbers", () => {
    expect(formatNumber(4276835.879)).toEqual("4,276,835.879");
  });
});




