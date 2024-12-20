import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Label from "./Label";

describe("Label Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(
      <Label id="label" htmlFor="some-input-id">
        Cupcakes
      </Label>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test with required text", async () => {
    const { container } = render(
      <Label id="label" htmlFor="some-input-id" isRequired>
        Cupcakes
      </Label>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Label", () => {
  it("renders a label element when passed text as children", () => {
    render(
      <Label id="label" htmlFor="some-input-id">
        Cupcakes
      </Label>
    );
    expect(screen.getByText("Cupcakes")).toBeInTheDocument();
  });

  it("renders a label element when passed element as children", () => {
    render(
      <Label id="label" htmlFor="some-input-id">
        <span>Cupcakes</span>
      </Label>
    );
    expect(screen.getByText("Cupcakes")).toBeInTheDocument();
  });

  it("renders the '(required)' helper text", () => {
    const { rerender } = render(
      <Label id="label" htmlFor="some-input-id">
        <span>Cupcakes</span>
      </Label>
    );
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();

    rerender(
      <Label id="label" htmlFor="some-input-id" isRequired>
        <span>Cupcakes</span>
      </Label>
    );

    expect(screen.queryByText(/required/i)).toBeInTheDocument();
  });

  it("renders a custom '(required)' helper text when provided", () => {
    const { rerender } = render(
      <Label id="label" htmlFor="some-input-id" requiredLabelText="Obligatoire">
        <span>Cupcakes</span>
      </Label>
    );

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Obligatoire/i)).not.toBeInTheDocument();

    rerender(
      <Label
        id="label"
        htmlFor="some-input-id"
        isRequired
        requiredLabelText="Obligatoire"
      >
        <span>Cupcakes</span>
      </Label>
    );

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Obligatoire/i)).toBeInTheDocument();
  });

  it("Logs a warning when there is no `id` passed", () => {
    const warn = jest.spyOn(console, "warn");
    render(
      // @ts-ignore: Typescript complains when a required prop is not passed, but
      // here we don't want to pass the required prop to make sure the warning appears.
      <Label htmlFor="some-input-id">Cupcakes</Label>
    );
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Label: This component's required `id` prop was not passed."
    );
  });

  it("Renders the UI snapshot correctly", () => {
    const simple = renderer
      .create(
        <Label id="label" htmlFor="some-input-id">
          Cupcakes
        </Label>
      )
      .toJSON();
    const required = renderer
      .create(
        <Label id="label3" htmlFor="some-input-id" isRequired>
          Cupcakes
        </Label>
      )
      .toJSON();
    const requiredLabelText = renderer
      .create(
        <Label
          id="label3"
          htmlFor="some-input-id"
          isRequired
          requiredLabelText="Obligatoire"
        >
          Cupcakes
        </Label>
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Label
          id="chakra"
          htmlFor="some-input-id"
          p="20px"
          color="ui.error.primary"
        >
          Cupcakes
        </Label>
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Label id="props" htmlFor="some-input-id" data-testid="props">
          Cupcakes
        </Label>
      )
      .toJSON();

    expect(simple).toMatchSnapshot();
    expect(required).toMatchSnapshot();
    expect(requiredLabelText).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
  });

  it("passes a ref to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement & HTMLLabelElement>();
    const { container } = render(
      <Label htmlFor="some-input-id" id="label" ref={ref}>
        Cupcakes
      </Label>
    );

    expect(container.querySelector("label")).toBe(ref.current);
  });
});
