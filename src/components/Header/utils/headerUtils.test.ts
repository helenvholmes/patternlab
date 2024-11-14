import {
  getCatalogURL,
  getNYPLSearchURL,
  getResearchCatalogURL,
} from "./headerUtils";

describe("Header utils", () => {
  describe("getCatalogURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the Catalog", () => {
      const searchValue = "foo bar";
      const url = getCatalogURL(searchValue);
      expect(url).toEqual(
        "https://borrow.nypl.org/search?query=foo%20bar&searchType=everything&pageSize=10&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("should return a URL for the Encore catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getCatalogURL(searchValue);
      expect(url).toEqual(
        "https://borrow.nypl.org/search?query=foo%20bar%2F%5C%3F%3D&searchType=everything&pageSize=10&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });
  });

  describe("getResearchCatalogURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the Research Catalog", () => {
      const searchValue = "foo bar";
      const url = getResearchCatalogURL(searchValue);
      expect(url).toEqual(
        "https://www.nypl.org/research/research-catalog/search?q=foo%20bar&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("should return a URL for the Research Catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getResearchCatalogURL(searchValue);
      expect(url).toEqual(
        "https://www.nypl.org/research/research-catalog/search?q=foo%20bar%2F%5C%3F%3D&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });
  });

  describe("getNYPLSearchURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the NYPL catalog", () => {
      const searchValue = "foo bar";
      const url = getNYPLSearchURL(searchValue);
      expect(url).toEqual(
        "//www.nypl.org/search/foo%20bar?searched_from=header_search&timestamp=1640995200000"
      );
    });

    it("should return a URL for the NYPL catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getNYPLSearchURL(searchValue);
      expect(url).toEqual(
        "//www.nypl.org/search/foo%20bar%2F%5C%3F%3D?searched_from=header_search&timestamp=1640995200000"
      );
    });
  });
});
