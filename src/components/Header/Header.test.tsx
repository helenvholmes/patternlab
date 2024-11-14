import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as renderer from "react-test-renderer";

import Header from "./Header";
import { mockLoginCookie } from "./utils/authApiMockResponse";
import { refineryResponse } from "./utils/sitewideAlertsMocks";

jest.mock("js-cookie", () => ({
  get: () => mockLoginCookie,
  remove: jest.fn(),
}));

describe("Header Accessibility", () => {
  it("passes axe accessibility test", async () => {
    // Mock the fetch API call in `SitewideAlerts`.
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(refineryResponse),
      })
    ) as jest.Mock;

    const { container } = await waitFor(() =>
      render(<Header isProduction={false} />)
    );
    expect(await axe(container)).toHaveNoViolations();

    jest.clearAllMocks();
  });
});

// TODO: These tests do not currently test the mobile web view.
// We need to determine a way of doing this for all responsive
// components, and will add this in at a later date.
describe.skip("Header", () => {
  beforeEach(async () => {
    // Mock the fetch API call in `SitewideAlerts`.
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(refineryResponse),
      })
    ) as jest.Mock;

    // Mocks matchMedia so that the desktop view renders rather than mobile.
    global.matchMedia = jest.fn(() => ({
      addListener: () => {},
      removeListener: () => {},
      matches: true,
    })) as jest.Mock;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders a skip navigation", () => {
    const skipNavigation = screen.getAllByRole("navigation")[0];
    const { getByRole } = within(skipNavigation);

    expect(skipNavigation).toBeInTheDocument();
    expect(skipNavigation).toHaveAttribute("aria-label", "Skip Navigation");
    expect(getByRole("list")).toBeInTheDocument();
  });

  it("renders a notification", () => {
    const notification = screen.getByRole("complementary");
    const { getByText } = within(notification);

    expect(notification).toBeInTheDocument();
    expect(getByText(/masks are encouraged/i)).toBeInTheDocument();
  });

  it("renders the NYPL logo", () => {
    const nyplLink = screen.getAllByRole("link", {
      name: "The New York Public Library",
    })[0];

    const logo = within(nyplLink).getByRole("img");

    expect(logo).toHaveAttribute("aria-label", "NYPL Header Logo");
  });

  it("renders the upper links", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The first list is the skip navigation.
    // The second list is the list of alerts in the `SitewideAlerts` component.
    // The third list is the upper navigation.

    const upperList = screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");

    expect(upperLinks.length).toEqual(6);
    expect(upperLinks[0]).toHaveTextContent(/log in/i);
    expect(upperLinks[5]).toHaveTextContent(/shop/i);
  });

  it("renders the lower links", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The first list is the skip navigation.
    // The second list is the list of alerts in the `SitewideAlerts` component.
    // The third list is the upper navigation.
    // The fourth list is the lower navigation.
    const lowerList = screen.getAllByRole("list")[3];
    const lowerLinks = within(lowerList).getAllByRole("listitem");

    expect(lowerLinks.length).toEqual(8);
    expect(lowerLinks[0]).toHaveTextContent(/books/i);
    expect(lowerLinks[7]).toHaveTextContent(/search/i);
  });

  it("opens the login menu", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The third list is the upper navigation links.
    let upperList = screen.getAllByRole("list")[2];
    let upperLinks = within(upperList).getAllByRole("listitem");

    expect(upperLinks.length).toEqual(6);

    const myAccountButton = within(upperLinks[0]).getByRole("button");
    expect(upperLinks[0]).toHaveTextContent(/my account/i);
    expect(upperLinks[1]).toHaveTextContent(/locations/i);

    userEvent.click(myAccountButton);

    upperList = screen.getAllByRole("list")[2];
    upperLinks = within(upperList).getAllByRole("listitem");

    // Login menu opens, revealing two additional list items.
    expect(upperLinks.length).toEqual(8);
    expect(upperLinks[0]).toHaveTextContent(/close/i);
    expect(upperLinks[1]).toHaveTextContent(/go to the catalog/i);
  });

  it("renders the horizontal rule", () => {
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders the UI snapshot correctly", () => {
    const header = renderer.create(<Header isProduction={false} />).toJSON();

    expect(header).toMatchSnapshot();
  });
});
