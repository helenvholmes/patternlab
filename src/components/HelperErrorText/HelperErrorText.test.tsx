import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import renderer from "react-test-renderer";

import HelperErrorText from "./HelperErrorText";

describe("HelperErrorText Accessibility", () => {
  it("passes axe accessibility test", async () => {
    const { container } = render(<HelperErrorText text="Text" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HelperErrorText", () => {
  it("renders the text passed", () => {
    render(<HelperErrorText text="Text" />);
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  it("renders the text passed as an HTML string", () => {
    render(<HelperErrorText text="<b>This text is bold</b>" />);
    expect(screen.getByText("This text is bold")).toBeInTheDocument();
  });

  it("renders the text passed as HTML", () => {
    render(<HelperErrorText text={<b>This text is bold</b>} />);
    expect(screen.getByText("This text is bold")).toBeInTheDocument();
  });

  it("renders the invalid state", () => {
    const utils = render(<HelperErrorText text="Text" />);

    // False by default. Note, this is a custom `data-*` attribute only used
    // for testing the invalid state.
    expect(screen.getByText("Text")).toHaveAttribute("data-isinvalid", "false");

    utils.rerender(<HelperErrorText isInvalid text="Text" />);
    expect(screen.getByText("Text")).toHaveAttribute("data-isinvalid", "true");
  });

  it("has aria-live and aria-atomic attributes when errored", () => {
    render(<HelperErrorText isInvalid text="Text" />);
    expect(screen.getByText("Text")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Text")).toHaveAttribute("aria-atomic");
  });

  it("accepts an aria-atomic value of false", () => {
    const utils = render(<HelperErrorText isInvalid text="Static Text" />);
    // The default is "true".
    expect(screen.getByText("Static Text")).toHaveAttribute("aria-atomic");

    utils.rerender(
      <HelperErrorText ariaAtomic={false} isInvalid text="Static Text" />
    );
    // But the prop accepts false in case only part of the helper text
    // should only be read instead of the whole region.
    expect(screen.getByText("Static Text")).toHaveAttribute(
      "aria-atomic",
      "false"
    );
  });

  it("Renders the UI snapshot correctly", () => {
    const basic = renderer
      .create(<HelperErrorText id="basic" text="Text" />)
      .toJSON();
    const invalid = renderer
      .create(<HelperErrorText id="invalid" isInvalid text="Text" />)
      .toJSON();
    const withHTMLString = renderer
      .create(
        <HelperErrorText
          id="invalid"
          isInvalid
          text="This helper text <b>contains HTML in the string</b>."
        />
      )
      .toJSON();
    const withHTMLElement = renderer
      .create(
        <HelperErrorText
          id="invalid"
          isInvalid
          text={
            <>
              This helper text <b>contains HTML</b>.
            </>
          }
        />
      )
      .toJSON();

    expect(basic).toMatchSnapshot();
    expect(invalid).toMatchSnapshot();
    expect(withHTMLString).toMatchSnapshot();
    expect(withHTMLElement).toMatchSnapshot();
  });
});
