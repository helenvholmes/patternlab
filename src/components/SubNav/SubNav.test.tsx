import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Icon from "../Icons/Icon";
import SubNav, { SubNavButton, SubNavLink } from "./SubNav";

describe("SubNav Accessibility", () => {
  it("passes axe accessibility test with primary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={() => (
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
        )}
        secondaryActions={() => (
          <>
            <SubNavLink
              id="primary-sub-nav-link-1"
              screenreaderOnlyText="for the NYPL Research Catalog"
              href="#link1"
            >
              Label Text
            </SubNavLink>
            <SubNavLink
              id="primary-sub-nav-link-2"
              screenreaderOnlyText="for the NYPL Research Catalog"
              href="#link2"
            >
              Label Text
            </SubNavLink>
            <SubNavLink
              id="primary-sub-nav-link-3"
              screenreaderOnlyText="for the NYPL Research Catalog"
              href="#link3"
            >
              Label Text
              <Icon
                name="legacyAccountFilled"
                size="small"
                className="right"
                align="right"
              />
            </SubNavLink>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with secondary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        )}
        secondaryActions={() => (
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
        )}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with all actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
            <SubNavButton id="primary-sub-nav-button-2" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        )}
        secondaryActions={() => (
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
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with props", async () => {
    const { container } = render(
      <SubNav
        actionBackgroundColor="brand.primary-05"
        highlightColor="brand.primary"
        selectedItem="primary-sub-nav-button-1"
        id="sub-nav-id"
        primaryActions={() => (
          <>
            <SubNavButton id="primary-sub-nav-button-1" buttonType="text">
              Label Text
            </SubNavButton>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SubNav Component", () => {
  it("renders with primary actions", () => {
    render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-button-1">Primary Button 1</SubNavButton>
            <SubNavButton id="primary-button-2">Primary Button 2</SubNavButton>
          </>
        )}
      />
    );

    expect(screen.getByText("Primary Button 1")).toBeInTheDocument();
    expect(screen.getByText("Primary Button 2")).toBeInTheDocument();
  });

  it("renders with secondary actions", () => {
    render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-button-1">Primary Button</SubNavButton>
          </>
        )}
        secondaryActions={() => (
          <>
            <SubNavLink href="#secondary-link">Secondary Link</SubNavLink>
          </>
        )}
      />
    );

    expect(screen.getByText("Primary Button")).toBeInTheDocument();
    expect(screen.getByText("Secondary Link")).toBeInTheDocument();
  });

  it("renders with selectedItem highlighted", async () => {
    render(
      <SubNav
        selectedItem="primary-button-1"
        primaryActions={() => (
          <>
            <SubNavButton id="primary-button-1" selectedItem="primary-button-1">
              Primary Button 1
            </SubNavButton>
            <SubNavButton id="primary-button-2">Primary Button 2</SubNavButton>
          </>
        )}
      />
    );

    const selectedButton = await screen.findByRole("button", {
      name: /Primary Button 1/i,
    });
    expect(selectedButton).toHaveTextContent("Primary Button 1");
  });

  it("passes axe accessibility test with primary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-button-1">Primary Button 1</SubNavButton>
            <SubNavButton id="primary-button-2">Primary Button 2</SubNavButton>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with secondary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={() => (
          <>
            <SubNavButton id="primary-button-1">Primary Button</SubNavButton>
          </>
        )}
        secondaryActions={() => (
          <>
            <SubNavLink href="#secondary-link">Secondary Link</SubNavLink>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with props", async () => {
    const { container } = render(
      <SubNav
        actionBackgroundColor="brand.primary-05"
        highlightColor="brand.primary"
        selectedItem="primary-sub-nav-button-1"
        id="sub-nav-id"
        primaryActions={() => (
          <>
            <SubNavButton id="primary-sub-nav-button-1">
              Label Text
            </SubNavButton>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('SubNavButton', () => {
  it('renders with default props', () => {
    render(
      <SubNavButton id="1" selectedItem={undefined}>Default Button</SubNavButton>
    );
    const button = screen.getByText('Default Button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('selectedItem'); // Should not have the "selectedItem" class
  });

  it('applies selectedItem class when selectedItem matches id', () => {
    render(
      <SubNavButton id="sub-nav-button" selectedItem="sub-nav-button">
        Selected Button
      </SubNavButton>
    );
    const button = screen.getByText('Selected Button');
    expect(button).toHaveClass('selectedItem'); // Should have "selectedItem" class
  });
});

describe('SubNavLink', () => {
  it('renders with default props', () => {
    render(
      <SubNavLink id="sub-nav-link" selectedItem={undefined}>Default Link</SubNavLink>
    );
    const button = screen.getByText('Default Link');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('selectedItem'); // Should not have the "selectedItem" class
  });

  it('applies selectedItem class when selectedItem matches id', () => {
    render(
      <SubNavLink id="sub-nav-link" selectedItem="sub-nav-link">
        Selected Link
      </SubNavLink>
    );
    const button = screen.getByText('Selected Link');
    expect(button).toHaveClass('selectedItem'); // Should have "selectedItem" class
  });
});

