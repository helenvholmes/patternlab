import { render, screen } from "@testing-library/react";
import * as React from "react";

import { HeaderContext, HeaderProvider } from "./headerContext";

describe("HeaderContext", () => {
  const PatronTestComponent = () => {
    const { isProduction, patronName } = React.useContext(HeaderContext);

    if (!patronName) {
      return null;
    }

    return (
      <>
        <p>The patron name is: {patronName}</p>
        <p>The environment is: {isProduction ? "production" : "development"}</p>
      </>
    );
  };

  it("returns an empty string if no value is passed", () => {
    render(
      <HeaderProvider>
        <PatronTestComponent />
      </HeaderProvider>
    );

    expect(
      screen.queryByText(/The patron name is: Tom Nook/i)
    ).not.toBeInTheDocument();
  });

  it("sets the default environment to production", () => {
    render(
      <HeaderProvider>
        <PatronTestComponent />
      </HeaderProvider>
    );

    expect(
      screen.queryByText(/The environment is: production/i)
    ).not.toBeInTheDocument();
  });

  it("passes down the patron name value down to its children", () => {
    render(
      <HeaderProvider patronName="Tom Nook">
        <PatronTestComponent />
      </HeaderProvider>
    );

    expect(
      screen.getByText(/The patron name is: Tom Nook/i)
    ).toBeInTheDocument();
  });
});
