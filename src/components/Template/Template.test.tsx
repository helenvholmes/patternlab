import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import {
  Template,
  TemplateBreakout,
  TemplateTop,
  TemplateMain,
  TemplateSidebar,
  TemplateBottom,
  SidebarPlacement,
  TemplateMainNarrow,
} from "./Template";
import Placeholder from "../Placeholder/Placeholder";
import { sidebarLabel } from "../../utils/utils";

const breakout = <Placeholder variant="short">Breakout</Placeholder>;
const contentTop = <Placeholder>Content Top</Placeholder>;
const contentMain = (
  <>
    <Placeholder>Main Content</Placeholder>
    <Placeholder variant="short">More Content</Placeholder>
  </>
);
const contentBottom = <Placeholder variant="short">Content Bottom</Placeholder>;

const templateComponents = (
  sidebar: SidebarPlacement = "none",
  useMainNarrow: boolean = false
) => (
  <Template sidebar={sidebar}>
    <TemplateBreakout>{breakout}</TemplateBreakout>
    <TemplateTop>{contentTop}</TemplateTop>
    {sidebar !== "none" && !useMainNarrow && (
      <TemplateSidebar>
        <Placeholder>{sidebarLabel(sidebar)}</Placeholder>
      </TemplateSidebar>
    )}
    {useMainNarrow ? (
      <TemplateMainNarrow>{contentMain}</TemplateMainNarrow>
    ) : (
      <TemplateMain>{contentMain}</TemplateMain>
    )}
    <TemplateBottom>{contentBottom}</TemplateBottom>
  </Template>
);

describe("Template components accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(templateComponents());
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test", async () => {
    const { container } = render(templateComponents("left"));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test", async () => {
    const { container } = render(templateComponents("right"));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test", async () => {
    const { container } = render(templateComponents("none", true));
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Template components", () => {
  it("renders each section with left sidebar", () => {
    render(templateComponents("left"));

    expect(screen.getByText("Breakout")).toBeInTheDocument();
    expect(screen.getByText("Content Top")).toBeInTheDocument();
    expect(screen.getByText("Left Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByText("More Content")).toBeInTheDocument();
    expect(screen.getByText("Content Bottom")).toBeInTheDocument();
  });

  it("renders each section with right sidebar", () => {
    render(templateComponents("right"));

    expect(screen.getByText("Breakout")).toBeInTheDocument();
    expect(screen.getByText("Content Top")).toBeInTheDocument();
    expect(screen.getByText("Right Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByText("More Content")).toBeInTheDocument();
    expect(screen.getByText("Content Bottom")).toBeInTheDocument();
  });

  it("renders a #mainContent id when using TemplateMain", () => {
    const { container } = render(templateComponents("left"));

    expect(container.querySelector("#mainContent")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "mainContent");
  });

  it("renders a #mainContent id when using TemplateMainNarrow", () => {
    const { container } = render(templateComponents("none", true));

    expect(container.querySelector("#mainContent")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "mainContent");
  });

  it("passes a ref to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Template ref={ref}>
        <TemplateMain>{contentMain}</TemplateMain>
      </Template>
    );

    expect(container.querySelectorAll("div")[0]).toBe(ref.current);
  });

  it("renders the UI snapshot correctly", () => {
    const templateComponentsLeftSidebar = renderer
      .create(templateComponents("left"))
      .toJSON();

    const templateComponentsRightSidebar = renderer
      .create(templateComponents("right"))
      .toJSON();

    const templateComponentsNoSidebar = renderer
      .create(templateComponents("none"))
      .toJSON();

    const templateComponentsMainNarrow = renderer
      .create(templateComponents("none", true))
      .toJSON();

    const templateWithChakraProps = renderer.create(
      <Template p="20px" color="ui.error.primary">
        <TemplateMain>{contentMain}</TemplateMain>
      </Template>
    );

    const templateWithOtherProps = renderer.create(
      <Template data-testid="props">
        <TemplateMain>{contentMain}</TemplateMain>
      </Template>
    );

    expect(templateComponentsLeftSidebar).toMatchSnapshot();
    expect(templateComponentsRightSidebar).toMatchSnapshot();
    expect(templateComponentsNoSidebar).toMatchSnapshot();
    expect(templateComponentsMainNarrow).toMatchSnapshot();
    expect(templateWithChakraProps).toMatchSnapshot();
    expect(templateWithOtherProps).toMatchSnapshot();
  });
});
