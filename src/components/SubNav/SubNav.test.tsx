import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Icon from "../Icons/Icon";
import SubNav, { SubNavButton, SubNavLink } from "./SubNav";

describe("SubNav Accessibility", () => {
  it("passes axe accessibility test with primary actions", async () => {
    const { container } = render(
      <SubNav
        primaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="primary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
            <SubNavButton
              id="primary-sub-nav-button-2"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
            <SubNavButton
              id="primary-sub-nav-button-3"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
          </>
        )}
        secondaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavLink
              id="primary-sub-nav-link-1"
              screenreaderOnlyText="for the NYPL Research Catalog"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              href="#link1"
            >
              Label Text
            </SubNavLink>
            <SubNavLink
              id="primary-sub-nav-link-2"
              screenreaderOnlyText="for the NYPL Research Catalog"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              href="#link2"
            >
              Label Text
            </SubNavLink>
            <SubNavLink
              id="primary-sub-nav-link-3"
              screenreaderOnlyText="for the NYPL Research Catalog"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
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
        primaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="primary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
          </>
        )}
        secondaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="secondary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
            <SubNavLink
              id="secondary-sub-nav-link-1"
              screenreaderOnlyText="for the NYPL Research Catalog"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
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
        primaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="primary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
            <SubNavButton
              id="primary-sub-nav-button-2"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
          </>
        )}
        secondaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="secondary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
              Label Text
            </SubNavButton>
            <SubNavLink
              id="secondary-sub-nav-link-1"
              screenreaderOnlyText="for the NYPL Research Catalog"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
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
        primaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="primary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
              buttonType="text"
            >
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
        primaryActions={({ highlightColor, actionBackgroundColor }) => (
          <>
            <SubNavButton
              id="primary-sub-nav-button-1"
              highlightColor={highlightColor}
              actionBackgroundColor={actionBackgroundColor}
            >
              Label Text
            </SubNavButton>
          </>
        )}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
