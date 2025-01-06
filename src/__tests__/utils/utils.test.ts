import { range, formatNumberRange } from "../../utils/utils";

describe("range", () => {
  it("returns an array of values not including the stop argument", () => {
    expect(range(1, 2)).toEqual([1]);
    expect(range(4, 7)).toEqual([4, 5, 6]);
    expect(range(2, 9)).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });

  it("returns an array of values skipping by the step argument", () => {
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
    expect(range(4, 8, 3)).toEqual([4, 7]);
    expect(range(2, 20, 2)).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
    expect(range(2, 20, 4)).toEqual([2, 6, 10, 14, 18]);
    expect(range(2, 6, 2)).toEqual([2, 4]);
    expect(range(2, 20, 5)).toEqual([2, 7, 12, 17]);
  });
});

describe("formatNumberRange", () => {
  it("returns a number with commas and handles a range of numbers", () => {
    expect(formatNumberRange(4382)).toEqual('4,382');
    expect(formatNumberRange(4276835)).toEqual('4,276,835');
    expect(formatNumberRange(4276835.879)).toEqual('4,276,835.879');
    expect(formatNumberRange(1,99)).toEqual('1–99');
    expect(formatNumberRange(141, 58)).toEqual("58–141");
    expect(formatNumberRange(100, 102)).toEqual("100–102");
    expect(formatNumberRange(10, 100)).toEqual('10–100');
  });
});
