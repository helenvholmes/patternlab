import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Fieldset from "./Fieldset";

describe("Fieldset Accessibility", () => {
  it("passes axe accessibility", async () => {
    const { container } = render(
      <Fieldset id="fieldset" legendText="Legend Text">
        <p>Some other fields</p>
      </Fieldset>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility with the legend hidden", async () => {
    const { container } = render(
      <Fieldset id="fieldset" legendText="Legend Text" isLegendHidden>
        <p>Some other fields</p>
      </Fieldset>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Fieldset", () => {
  it("renders text in a legend and fieldset along with its children", () => {
    render(
      <Fieldset id="fieldset" legendText="Legend Text">
        <p>Some other fields</p>
      </Fieldset>
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
    // `legend` has no HTML role
    expect(screen.getByText(/Legend Text/i)).toBeInTheDocument();
    expect(screen.getByText("Some other fields")).toBeInTheDocument();
  });

  it("renders '(required)' text in the legend when `isRequired` is true", () => {
    render(
      <Fieldset id="fieldset" legendText="Legend Text" isRequired>
        <p>Some other fields</p>
      </Fieldset>
    );

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it("can hide the '(required)' text in the legend but still show the main text", () => {
    const { rerender } = render(
      <Fieldset id="fieldset" legendText="Legend Text" isRequired>
        <p>Some other fields</p>
      </Fieldset>
    );

    expect(screen.getByText(/required/i)).toBeInTheDocument();

    rerender(
      <Fieldset
        id="fieldset"
        isRequired
        legendText="Legend Text"
        showRequiredLabel={false}
      >
        <p>Some other fields</p>
      </Fieldset>
    );

    expect(screen.getByText(/Legend Text/i)).toBeInTheDocument();
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it("logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <Fieldset legendText="Legend Text">
        <p>Some other fields</p>
      </Fieldset>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Fieldset: This component's required `id` prop was not passed."
    );
  });

  it("renders the UI snapshot correctly", () => {
    const basic = renderer
      .create(
        <Fieldset id="fieldset" legendText="Legend Text">
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();
    const required = renderer
      .create(
        <Fieldset id="fieldset" legendText="Legend Text" isRequired>
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();
    const hiddenHelperText = renderer
      .create(
        <Fieldset
          id="fieldset"
          legendText="Legend Text"
          isRequired
          showRequiredLabel={false}
        >
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();
    const hiddenLegend = renderer
      .create(
        <Fieldset id="fieldset" legendText="Legend Text" isLegendHidden>
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Fieldset
          id="withChakraProps"
          legendText="Legend Text"
          p="20px"
          color="ui.error.primary"
        >
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Fieldset
          id="withOtherProps"
          legendText="Legend Text"
          data-testid="props"
        >
          <p>Some other fields</p>
        </Fieldset>
      )
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(required).toMatchSnapshot();
    expect(hiddenHelperText).toMatchSnapshot();
    expect(hiddenLegend).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref to the fieldset element", () => {
    const ref = React.createRef<HTMLDivElement & HTMLFieldSetElement>();
    const { container } = render(
      <Fieldset id="ref" legendText="Legend Text" ref={ref}>
        <p>Some other fields</p>
      </Fieldset>
    );

    expect(container.querySelector("fieldset")).toBe(ref.current);
  });
});
