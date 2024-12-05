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
} from "./Template";
import Placeholder from "../Placeholder/Placeholder";

const breakout = <Placeholder variant="short">Breakout</Placeholder>;
const sidebar = "left";
const contentTop = <Placeholder>Content Top</Placeholder>;
const contentSidebar = <Placeholder>Left Sidebar</Placeholder>;
const contentMain = (
  <>
    <Placeholder>Main Content</Placeholder>
    <Placeholder variant="short">More Content</Placeholder>
  </>
);
const contentBottom = <Placeholder variant="short">Content Bottom</Placeholder>;

const templateChildren = (
  <Template sidebar={sidebar}>
    <TemplateBreakout>{breakout}</TemplateBreakout>
    <TemplateTop>{contentTop}</TemplateTop>
    <TemplateSidebar>{contentSidebar}</TemplateSidebar>
    <TemplateMain>{contentMain}</TemplateMain>
    <TemplateBottom>{contentBottom}</TemplateBottom>
  </Template>
);

describe("Template components accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<>{templateChildren}</>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Template components", () => {
  it("renders each section", () => {
    render(<>{templateChildren}</>);

    expect(screen.getByText("Breakout")).toBeInTheDocument();
    expect(screen.getByText("Content Top")).toBeInTheDocument();
    expect(screen.getByText("Left Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByText("More Content")).toBeInTheDocument();
    expect(screen.getByText("Content Bottom")).toBeInTheDocument();
  });

  it("renders a #mainContent id in the TemplateContent component", () => {
    const { container } = render(<>{templateChildren}</>);

    expect(container.querySelector("#mainContent")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "mainContent");
  });

  it("renders the UI snapshot correctly", () => {
    const templateComponents = renderer
      .create(
        <Template sidebar={sidebar}>
          <TemplateBreakout>{breakout}</TemplateBreakout>
          <TemplateTop>{contentTop}</TemplateTop>
          <TemplateSidebar>{contentSidebar}</TemplateSidebar>
          <TemplateMain>{contentMain}</TemplateMain>
          <TemplateBottom>{contentBottom}</TemplateBottom>
        </Template>
      )
      .toJSON();

    expect(templateComponents).toMatchSnapshot();
  });
});
