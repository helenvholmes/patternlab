import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import SubNav, { SubNavButton, SubNavLink } from "./SubNav";

describe("SubNav Accessibility", () => {
  it("passes axe accessibility test with primary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
            <SubNavButton id="primary-sub-nav-button-2" buttonType="text">
              Label Text
            </SubNavButton>
            <SubNavButton id="primary-sub-nav-button-3" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        }
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with all actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
            <SubNavButton id="primary-sub-nav-button-2" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        }
        secondaryActions={
          <>
            <SubNavButton id="secondary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
            <SubNavLink
              id="secondary-sub-nav-link-1"
              screenreaderOnlyText="for the NYPL Research Catalog"
              href="#link1"
            >
              Label Text
            </SubNavLink>
          </>
        }
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with props", async () => {
    const { container } = render(
      <SubNav
        actionBackgroundColor="brand.primary-05"
        highlightColor="brand.primary"
        id="sub-nav-id"
        primaryActions={
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        }
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SubNav Component", () => {
  it("renders with primary actions", () => {
    render(
      <SubNav
        primaryActions={
          <>
            <SubNavButton id="primary-button-1">Primary Button 1</SubNavButton>
            <SubNavButton id="primary-button-2">Primary Button 2</SubNavButton>
          </>
        }
      />
    );

    expect(screen.getByText("Primary Button 1")).toBeInTheDocument();
    expect(screen.getByText("Primary Button 2")).toBeInTheDocument();
  });

  it("renders with secondary actions", () => {
    render(
      <SubNav
        primaryActions={
          <>
            <SubNavButton id="primary-button-1">Primary Button</SubNavButton>
          </>
        }
        secondaryActions={
          <>
            <SubNavLink href="#secondary-link">Secondary Link</SubNavLink>
          </>
        }
      />
    );

    expect(screen.getByText("Primary Button")).toBeInTheDocument();
    expect(screen.getByText("Secondary Link")).toBeInTheDocument();
  });
});

describe("SubNavButton", () => {
  it("renders with default props", () => {
    render(<SubNavButton id="1">Default Button</SubNavButton>);
    const button = screen.getByText("Default Button");
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("selectedItem"); // Should not have the "selectedItem" class
  });

  it("applies selectedItem class when isSelected is true", () => {
    render(
      <SubNavButton id="sub-nav-button" isSelected>
        Selected Button
      </SubNavButton>
    );
    const button = screen.getByText("Selected Button");
    expect(button).toHaveClass("selectedItem"); // Should have "selectedItem" class
  });
});

describe("SubNavLink", () => {
  it("renders with default props", () => {
    render(<SubNavLink id="sub-nav-link">Default Link</SubNavLink>);
    const button = screen.getByText("Default Link");
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("selectedItem"); // Should not have the "selectedItem" class
  });

  it("applies selectedItem class when isSelected is true", () => {
    render(
      <SubNavLink id="sub-nav-link" isSelected>
        Selected Link
      </SubNavLink>
    );
    const button = screen.getByText("Selected Link");
    expect(button).toHaveClass("selectedItem"); // Should have "selectedItem" class
  });
});
