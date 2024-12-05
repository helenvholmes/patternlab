import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";

import HeaderLoginButton from "./HeaderLoginButton";
import { HeaderProvider } from "../context/headerContext";

describe("HeaderLoginButton Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(
      <HeaderProvider>
        <HeaderLoginButton />
      </HeaderProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for mobile", async () => {
    const { container } = render(
      <HeaderProvider>
        <HeaderLoginButton isMobile />
      </HeaderProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderLoginButton", () => {
  describe("Desktop", () => {
    it("renders the logged out UI if there is no `patronName` value", () => {
      render(
        <HeaderProvider>
          <HeaderLoginButton />
        </HeaderProvider>
      );

      let dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveTextContent(/my account/i);

      userEvent.click(dropDownButton);

      const links = screen.getAllByRole("link");
      dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveTextContent(/close/i);
      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
    });

    it("focuses on the catalog link when the login is opened and there is no patron name", () => {
      render(
        <HeaderProvider>
          <HeaderLoginButton />
        </HeaderProvider>
      );

      const dropDownButton = screen.getByRole("button");

      act(() => userEvent.click(dropDownButton));

      const catalogLink = screen.getByRole("link", {
        name: /go to the catalog/i,
      });
      expect(catalogLink).toHaveFocus();
    });

    // Skipping because this feature is temporarily removed.
    it.skip("renders the logged in UI if there is a `patronName` value", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLoginButton />
        </HeaderProvider>
      );

      let dropDownButton = screen.getByRole("button");

      // When logged in, the button displays "My Account".
      expect(dropDownButton).toHaveTextContent(/my account/i);

      userEvent.click(dropDownButton);

      const greetingContainer = screen.getByTestId("patronGreeting");
      const links = screen.getAllByRole("link");
      dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveTextContent(/close/i);
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

    // Skipping because this feature is temporarily removed.
    it.skip("focuses on the greeting message when the login is opened and there is a patron", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLoginButton />
        </HeaderProvider>
      );

      const dropDownButton = screen.getByRole("button");

      userEvent.click(dropDownButton);

      const greetingContainer = screen.getByTestId("patronGreeting");
      expect(greetingContainer).toHaveFocus();
    });
  });

  describe("Mobile", () => {
    it("renders the logged out UI if there is no `patronName` value", () => {
      render(
        <HeaderProvider>
          <HeaderLoginButton isMobile />
        </HeaderProvider>
      );

      let dropDownButton = screen.getByRole("button");
      // There is no visible text on the button in the mobile view.
      expect(dropDownButton).toHaveAttribute("aria-label", "My Account");

      userEvent.click(dropDownButton);

      const links = screen.getAllByRole("link");
      dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveAttribute("aria-label", "Close");
      expect(links.length).toEqual(2);
      expect(links[0]).toHaveTextContent(/go to the catalog/i);
      expect(links[1]).toHaveTextContent(/go to the research catalog/i);
    });

    it("focuses on the catalog link when the login is opened and there is no patron name", () => {
      render(
        <HeaderProvider>
          <HeaderLoginButton isMobile />
        </HeaderProvider>
      );
      const dropDownButton = screen.getByRole("button");

      act(() => userEvent.click(dropDownButton));

      const catalogLink = screen.getByRole("link", {
        name: /go to the catalog/i,
      });
      expect(catalogLink).toHaveFocus();
    });

    // Skipping because this feature is temporarily removed.
    it.skip("renders the logged in UI if there is a `patronName` value", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLoginButton isMobile />
        </HeaderProvider>
      );

      let dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveAttribute("aria-label", "My Account");

      userEvent.click(dropDownButton);

      const greetingContainer = screen.getByTestId("patronGreeting");
      const links = screen.getAllByRole("link");
      dropDownButton = screen.getByRole("button");

      expect(dropDownButton).toHaveAttribute("aria-label", "Close");
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

    // Skipping because this feature is temporarily removed.
    it.skip("focuses on the greeting message when the login is opened and there is a patron", () => {
      render(
        <HeaderProvider patronName="PATRON, JANE A">
          <HeaderLoginButton isMobile />
        </HeaderProvider>
      );
      const dropDownButton = screen.getByRole("button");

      userEvent.click(dropDownButton);

      const greetingContainer = screen.getByTestId("patronGreeting");
      expect(greetingContainer).toHaveFocus();
    });
  });
});
