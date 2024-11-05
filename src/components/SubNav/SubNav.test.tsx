import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import Icon from "../Icons/Icon"
import SubNav, {
    SubNavButton,
    SubNavLink,
  } from "./SubNav";

describe("SubNav Accessibility", () => {

    it("passes axe accessibility test for primary buttons", async () => {
      const { container } = render(
        <SubNav
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
              </SubNavLink>
            </>
          )}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  
    it("passes axe accessibility test for primary links with screen reader text", async () => {
      const { container } = render(
        <SubNav
          id="sub-nav-id"
          primaryActions={({ highlightColor, actionBackgroundColor }) => (
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
              </SubNavLink>
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
              </SubNavLink>
            </>
          )}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  
    it("passes axe accessibility test for icon buttons within links", async () => {
      const { container } = render(
        <SubNav
          id="sub-nav-id"
          primaryActions={({ highlightColor, actionBackgroundColor }) => (
            <>
              <SubNavLink
                id="primary-sub-nav-link-with-icon"
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
              </SubNavLink>
            </>
          )}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
});