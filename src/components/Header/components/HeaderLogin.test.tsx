import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";

import HeaderLogin from "./HeaderLogin";
import { HeaderProvider } from "../context/headerContext";

describe("HeaderLogin Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(
      <HeaderProvider>
        <HeaderLogin />
      </HeaderProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for mobile", async () => {
    const { container } = render(
      <HeaderProvider>
        <HeaderLogin isMobile />
      </HeaderProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderLogin", () => {
  describe("Desktop", () => {
    it("renders the logged out UI if there is no `patronName` value", () => {
      render(
        <HeaderProvider>
          <HeaderLogin />
        </HeaderProvider>
      );

      const links = screen.getAllByRole("link");

      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
    });

    // Skipping because this feature is temporarily removed.
    it.skip("renders the logged in UI if there is a `patronName` value", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLogin />
        </HeaderProvider>
      );

      const greetingContainer = screen.getByTestId("patronGreeting");
      const links = screen.getAllByRole("link");

      expect(greetingContainer).toBeInTheDocument();
      expect(
        within(greetingContainer).getByText(/you are logged in/i)
      ).toBeInTheDocument();
      expect(
        within(greetingContainer).getByText(/patron, jane a/i)
      ).toBeInTheDocument();
      expect(links.length).toEqual(3);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
      expect(links[2]).toHaveTextContent(/log out/i);
    });
  });

  describe("Mobile", () => {
    it("renders the logged out UI if there is no `patronName` value", () => {
      render(
        <HeaderProvider>
          <HeaderLogin isMobile />
        </HeaderProvider>
      );

      const links = screen.getAllByRole("link");

      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
    });

    // Skipping because this feature is temporarily removed.
    it.skip("renders the logged in UI if there is a `patronName` value", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLogin isMobile />
        </HeaderProvider>
      );

      const greetingContainer = screen.getByTestId("patronGreeting");
      const links = screen.getAllByRole("link");

      expect(greetingContainer).toBeInTheDocument();
      expect(
        within(greetingContainer).getByText(/you are logged in/i)
      ).toBeInTheDocument();
      expect(
        within(greetingContainer).getByText(/patron, jane a/i)
      ).toBeInTheDocument();
      expect(links.length).toEqual(3);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
      expect(links[2]).toHaveTextContent(/log out/i);
    });
  });
});
