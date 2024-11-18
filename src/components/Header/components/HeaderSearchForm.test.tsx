import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as renderer from "react-test-renderer";

import HeaderSearchForm from "./HeaderSearchForm";

describe("HeaderSearchForm Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<HeaderSearchForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for mobile view", async () => {
    const { container } = render(<HeaderSearchForm isMobile />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderSearchForm", () => {
  // We want to spy on the `window.location.assign` method so we can know
  // that the correct search URL was called. Save the real
  // `window.location.assign` method.
  const realLocation = window.location;
  // We want to always return a timestamp date since that's get added
  // to the URL on every call. If we mock it, we'll always get the same
  // timestamp which makes testing easier.
  let realDate;

  beforeAll(() => {
    // Spy on the `window.location.assign` method.
    delete window.location;
    (window as any).location = { assign: jest.fn() };
    // Override the `Date` class so we always get the same
    // timestamp when `getTime` is called.
    const currentDate = new Date("2022-01-01");
    realDate = Date;
    (global as any).Date = class extends Date {
      constructor(date) {
        super(date);
        return currentDate;
      }
    };
  });

  afterAll(() => {
    // Restore the `window.location.assign` method.
    window.location = realLocation;
    // Restore the `Date` class.
    (global as any).Date = realDate;
    // Running all pending timers and switching to real timers using Jest
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Desktop", () => {
    beforeEach(() => {
      render(<HeaderSearchForm />);
    });

    it("renders a form with an input, radio inputs, and a search button", () => {
      const form = screen.getByRole("form");
      const searchInput = screen.getByRole("textbox");
      const radioGroup = screen.getByRole("radiogroup");
      const searchBtn = screen.getByRole("button");

      expect(form).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
      expect(radioGroup).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(searchBtn).toHaveAttribute("aria-label", "Search");
    });

    it("makes a request to the catalog", async () => {
      const searchInput = screen.getByRole("textbox");
      const searchBtn = screen.getByRole("button");

      // The default value of the radio button is set to
      // "Search books, music and movies".
      userEvent.type(searchInput, "cats");
      userEvent.click(searchBtn);

      // The first call to `window.location.assign` should be...
      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "https://borrow.nypl.org/search?query=cats&searchType=everything&pageSize=10&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("makes a request to the Research Catalog", async () => {
      const searchInput = screen.getByRole("textbox");
      const researchRadio = screen.getByText("Search the Research Catalog");
      const searchBtn = screen.getByRole("button");

      userEvent.type(searchInput, "cats");
      // Select the "Search the research catalog" radio button.
      userEvent.click(researchRadio);
      userEvent.click(searchBtn);

      // The second call to `window.location.assign` should be...
      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "https://www.nypl.org/research/research-catalog/search?q=cats&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("makes a request to the web catalog", () => {
      const searchInput = screen.getByRole("textbox");
      const webRadio = screen.getByText("Search the library website");
      const searchBtn = screen.getByRole("button");

      userEvent.type(searchInput, "cats");
      // Select the "Search NYPL.org" radio button.
      userEvent.click(webRadio);
      // Run the search.
      userEvent.click(searchBtn);

      // We mock `window.location.assign` before ALL tests and restore after
      // ALL tests. So we should have two calls to `window.location.assign`.
      // The third call to `window.location.assign` should be...
      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "//www.nypl.org/search/cats?searched_from=header_search&timestamp=1640995200000"
      );
    });
  });

  describe("Mobile", () => {
    beforeEach(() => {
      render(<HeaderSearchForm isMobile />);
    });

    it("renders a form with an input and three radios on mobile", () => {
      const form = screen.getByRole("form");
      const searchInput = screen.getByRole("textbox");
      const radios = screen.getAllByRole("radio");

      expect(form).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
      expect(radios).toHaveLength(3);
      expect(
        screen.getByLabelText("Search books, music, and movies")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Search the Research Catalog")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Search the library website")
      ).toBeInTheDocument();
    });

    it.skip("makes a request to the catalog", () => {
      const searchInput = screen.getByRole("textbox");
      const circulatingCatalogRadio = screen.getAllByRole("radio")[0];

      userEvent.type(searchInput, "cats");
      // Select the books, music, and movies radio button
      userEvent.click(circulatingCatalogRadio);

      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "https://borrow.nypl.org/search?query=cats&searchType=everything&pageSize=10&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it.skip("makes a request to the Research Catalog", () => {
      const searchInput = screen.getByRole("textbox");
      const researchCatalogRadio = screen.getAllByRole("radio")[1];

      userEvent.type(searchInput, "cats");
      // Select the Research Catalog
      userEvent.click(researchCatalogRadio);

      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "https://www.nypl.org/research/research-catalog/search?q=cats&searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it.skip("makes a request to the web catalog", () => {
      const searchInput = screen.getByRole("textbox");
      const websiteRadio = screen.getAllByRole("radio")[2];

      userEvent.type(searchInput, "cats");
      // Select the Website
      userEvent.click(websiteRadio);

      expect(window.location.assign).toHaveBeenNthCalledWith(
        1,
        "//www.nypl.org/search/cats?searched_from=header_search&timestamp=1640995200000"
      );
    });
  });

  it("renders the UI snapshot correctly", () => {
    const headersearchForm = renderer.create(<HeaderSearchForm />).toJSON();
    const headersearchFormMobile = renderer
      .create(<HeaderSearchForm isMobile />)
      .toJSON();

    expect(headersearchForm).toMatchSnapshot();
    expect(headersearchFormMobile).toMatchSnapshot();
  });
});
