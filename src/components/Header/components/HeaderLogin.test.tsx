import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";

import HeaderLogin from "./HeaderLogin";

describe("HeaderLogin Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<HeaderLogin patronName="" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for mobile", async () => {
    const { container } = render(<HeaderLogin isMobile patronName="" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderLogin", () => {
  describe("Desktop", () => {
    it("renders the logged out UI if there is no `patronName` value", () => {
      render(<HeaderLogin patronName="" />);

      const links = screen.getAllByRole("link");

      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/log into the catalog/i);
      expect(links[1]).toHaveTextContent(/log into the research catalog/i);
    });

    it("renders the logged in UI if there is a `patronName` value", () => {
      render(<HeaderLogin patronName="PATRON, JANE A" />);

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
      render(<HeaderLogin isMobile patronName="" />);

      const links = screen.getAllByRole("link");

      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/log into the catalog/i);
      expect(links[1]).toHaveTextContent(/log into the research catalog/i);
    });

    it("renders the logged in UI if there is a `patronName` value", () => {
      render(<HeaderLogin isMobile patronName="PATRON, JANE A" />);

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