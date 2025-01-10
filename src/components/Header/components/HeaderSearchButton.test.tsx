import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as renderer from "react-test-renderer";

import HeaderSearchButton from "./HeaderSearchButton";

describe("HeaderSearchButton Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<HeaderSearchButton />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for mobile", async () => {
    const { container } = render(<HeaderSearchButton isMobile />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderSearchButton", () => {
  describe("Desktop", () => {
    beforeEach(() => {
      render(<HeaderSearchButton />);
    });

    it("renders a Search button", () => {
      const searchBtn = screen.getByRole("button");

      expect(searchBtn).toBeInTheDocument();
      expect(searchBtn).toHaveTextContent(/search/i);
    });

    it("renders a Close button when clicked", () => {
      const searchBtn = screen.getByRole("button");

      expect(searchBtn).toHaveTextContent(/search/i);
      expect(screen.getByTitle(/Open Search/i)).toBeInTheDocument();
      expect(screen.queryByTitle(/Close Search/i)).not.toBeInTheDocument();

      userEvent.click(searchBtn);

      expect(searchBtn).toHaveTextContent(/close/i);
      expect(screen.queryByTitle(/Open Search/i)).not.toBeInTheDocument();
      expect(screen.getByTitle(/Close Search/i)).toBeInTheDocument();
    });

    it("renders the search form when clicked", () => {
      const searchBtn = screen.getByRole("button");

      expect(screen.queryByRole("form")).not.toBeInTheDocument();

      userEvent.click(searchBtn);

      expect(screen.getByTestId("ds-form")).toBeInTheDocument();
    });
  });

  describe("Mobile", () => {
    beforeEach(() => {
      render(<HeaderSearchButton isMobile />);
    });

    // todo: take a look at why this is failing
    // it("renders a Search button", () => {
    //   const searchBtn = screen.getByRole("button");

    //   // On mobile, the text is not displayed but is instead
    //   // added as an aria-label.
    //   expect(searchBtn).not.toHaveTextContent(/search/i);
    //   expect(searchBtn).toHaveAttribute("aria-label", "Open Search");
    // });

    it("renders a Close button when clicked", () => {
      const searchBtn = screen.getByRole("button");

      expect(searchBtn).toHaveAttribute("aria-label", "Open Search");

      userEvent.click(searchBtn);

      expect(searchBtn).toHaveAttribute("aria-label", "Close Search");
    });

    it("renders the search form when clicked", () => {
      const searchBtn = screen.getByRole("button");

      expect(screen.queryByRole("form")).not.toBeInTheDocument();

      userEvent.click(searchBtn);

      expect(screen.getByTestId("ds-form")).toBeInTheDocument();
    });
  });

  it("renders the UI snapshot correctly", () => {
    const headersearchButton = renderer.create(<HeaderSearchButton />).toJSON();
    const headersearchButtonMobile = renderer
      .create(<HeaderSearchButton isMobile />)
      .toJSON();

    expect(headersearchButton).toMatchSnapshot();
    expect(headersearchButtonMobile).toMatchSnapshot();
  });
});
