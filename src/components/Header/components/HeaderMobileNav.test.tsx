import { render, screen, within } from "@testing-library/react";

import { axe } from "jest-axe";
import * as renderer from "react-test-renderer";

import HeaderMobileNav from "./HeaderMobileNav";


describe("HeaderMobileNav Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<HeaderMobileNav />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderMobileNav", () => {
  beforeEach(() => {
    render(<HeaderMobileNav />);
  });

  it("renders the NYPL logo", () => {
    const logo = screen.getByTitle("NYPL Header Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders a nav list", () => {
    const navList = screen.getByRole("navigation");
    const links = within(navList).getAllByRole("link");

    expect(links).toHaveLength(7);
    expect(links[0]).toHaveTextContent("Books/Music/Movies");
    expect(links[1]).toHaveTextContent("Research");
    expect(links[2]).toHaveTextContent("Education");
    expect(links[3]).toHaveTextContent("Events");
    expect(links[4]).toHaveTextContent("Connect");
    expect(links[5]).toHaveTextContent("Give");
    expect(links[6]).toHaveTextContent("Get Help");

    links.forEach((link) => link.click());
  });

  it("renders the bottom links", () => {
    const bottomGrid = screen.getByTestId("bottomLinks");
    const links = within(bottomGrid).getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links[0]).toHaveTextContent("Get A Library Card");
    expect(links[1]).toHaveTextContent("Get Email Updates");
    expect(links[2]).toHaveTextContent("Shop NYPL");
    expect(links[3]).toHaveTextContent("DONATE");

    links.forEach((link) => link.click());
  });

  it("renders the UI snapshot correctly", () => {
    const headerMobileNav = renderer.create(<HeaderMobileNav />).toJSON();

    expect(headerMobileNav).toMatchSnapshot();
  });
});
