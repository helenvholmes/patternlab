import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import renderer from "react-test-renderer";

import Accordion from "./Accordion";
import Card, { CardContent, CardHeading } from "../Card/Card";

describe("Accordion Accessibility", () => {
  it("passes axe accessibility test for one item", async () => {
    const { container } = render(
      <Accordion
        accordionData={[
          {
            label: "Tom Nook",
            panel: (
              <p>
                Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional
                character in the Animal Crossing series who operates the village
                store.
              </p>
            ),
          },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for one item when it is always rendered", async () => {
    const { container } = render(
      <Accordion
        accordionData={[
          {
            label: "Tom Nook",
            panel: (
              <p>
                Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional
                character in the Animal Crossing series who operates the village
                store.
              </p>
            ),
          },
        ]}
        isAlwaysRendered
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("passes axe accessibility test for multiple items", async () => {
    const { container } = render(
      <Accordion
        accordionData={[
          {
            label: "Tom Nook",
            panel: (
              <p>
                Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional
                character in the Animal Crossing series who operates the village
                store.
              </p>
            ),
          },
          {
            label: "Isabelle",
            panel:
              "Isabelle, known as Shizue in Japan, is a fictional character " +
              "from the Animal Crossing series of video games. She is a kindly Shih " +
              "Tzu that debuted in the 2012 release Animal Crossing: New Leaf, where " +
              "she serves as the secretary to the player character.",
          },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

export const accordionData = [
  {
    label: "Tom Nook",
    panel: (
      <p>
        Tom Nook,
        <b>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          known in <a href="#">Japan</a> as Tanukichi
        </b>
        , is a fictional character in the Animal Crossing series who operates
        the village store.
      </p>
    ),
  },
  {
    label: "Isabelle",
    panel:
      "Isabelle, known as Shizue in Japan, is a fictional character " +
      "from the Animal Crossing series of video games. She is a kindly Shih " +
      "Tzu that debuted in the 2012 release Animal Crossing: New Leaf, where " +
      "she serves as the secretary to the player character.",
  },
  {
    label: "K.K. Slider",
    panel:
      "<p>Totakeke, more commonly known as <b>K.K. Slider or K.K.</b>, is a " +
      "fictional character within the Animal Crossing franchise. One of the " +
      "franchise's most popular characters, he debuted in the title Animal " +
      "Crossing, and has appeared in every installment since.</p>",
  },
];

export const accordionDataWithAriaLabel = [
  {
    ariaLabel: "Tom Nook, known in Japan as Tanukichi",
    label: "Tom Nook",
    panel: (
      <p>
        Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional character
        in the Animal Crossing series who operates the village store.
      </p>
    ),
  },
];

describe("Accordion", () => {
  it("renders a visible button with a label to click on", () => {
    render(<Accordion accordionData={[accordionData[0]]} />);
    const accordionLabel = screen.getByRole("button", { name: "Tom Nook" });

    expect(accordionLabel).toBeInTheDocument();
    // Closed by default.
    expect(accordionLabel).toHaveAttribute("aria-expanded", "false");
    // The panel's content should not be in the DOM unless the Accordion is open.
    expect(
      screen.queryByText(/known in Japan as Tanukichi/i)
    ).not.toBeInTheDocument();
  });

  it("opens the panel by default with isDefaultOpen passed", () => {
    render(<Accordion isDefaultOpen accordionData={[accordionData[0]]} />);
    const accordionLabel = screen.getByRole("button", { name: "Tom Nook" });

    expect(accordionLabel).toBeInTheDocument();
    expect(accordionLabel).toHaveAttribute("aria-expanded", "true");
  });

  it("opens the accordion when the label is clicked", () => {
    render(<Accordion accordionData={[accordionData[0]]} />);

    const accordionLabel = screen.getByRole("button", { name: "Tom Nook" });
    let accordionPanelContent = screen.queryByText(
      /operates the village store/i
    );
    expect(accordionLabel).toHaveAttribute("aria-expanded", "false");
    // The panel's content should not be in the DOM unless the Accordion is open.
    expect(accordionPanelContent).not.toBeInTheDocument();
    expect(screen.getByTitle("plus icon")).toBeInTheDocument();
    expect(screen.getByTitle("plus icon")).toHaveAttribute(
      "data-file-name",
      "SvgPlus"
    );

    userEvent.click(accordionLabel);

    accordionPanelContent = screen.queryByText(/operates the village store/i);
    expect(accordionLabel).toHaveAttribute("aria-expanded", "true");
    expect(accordionPanelContent).toBeInTheDocument();
    expect(screen.getByTitle("minus icon")).toBeInTheDocument();
    expect(screen.getByTitle("minus icon")).toHaveAttribute(
      "data-file-name",
      "SvgMinus"
    );
  });

  it("closes the accordion when the button is in focus and the 'esc' key is pressed", async () => {
    render(<Accordion accordionData={[accordionData[0]]} />);

    const accordionButton = screen.getByRole("button");

    await userEvent.click(accordionButton);

    expect(accordionButton.getAttribute("aria-expanded")).toEqual("true");

    await userEvent.keyboard("[Escape]");

    expect(accordionButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the accordion when an element in the panel is focused and the 'esc' key is pressed", async () => {
    render(<Accordion accordionData={[accordionData[0]]} />);

    const accordionButton = screen.getByRole("button");

    await userEvent.click(accordionButton);

    expect(accordionButton.getAttribute("aria-expanded")).toEqual("true");

    const linkInPanel = screen.getByRole("link");

    await userEvent.type(linkInPanel, "[Escape]");

    expect(accordionButton).toHaveAttribute("aria-expanded", "false");
  });

  it("always renders its content when isAlwaysRendered is true", () => {
    render(<Accordion accordionData={[accordionData[0]]} isAlwaysRendered />);

    const accordionLabel = screen.getByRole("button", { name: "Tom Nook" });
    let accordionPanelContent = screen.queryByText(
      /operates the village store/i
    );
    expect(accordionLabel).toHaveAttribute("aria-expanded", "false");
    expect(accordionPanelContent).toBeInTheDocument();
  });

  it("renders multiple accordion items grouped together", () => {
    render(<Accordion accordionData={accordionData} />);

    const accordion1 = screen.getByRole("button", { name: "Tom Nook" });
    const accordion2 = screen.getByRole("button", { name: "Isabelle" });
    const accordion3 = screen.getByRole("button", { name: "K.K. Slider" });

    expect(accordion1).toHaveAttribute("aria-expanded", "false");
    expect(accordion2).toHaveAttribute("aria-expanded", "false");
    expect(accordion3).toHaveAttribute("aria-expanded", "false");
  });

  it("opens each accordion item independently of each other", () => {
    render(<Accordion accordionData={accordionData} />);

    const accordion1 = screen.getByRole("button", { name: "Tom Nook" });
    const accordion2 = screen.getByRole("button", { name: "Isabelle" });
    const accordion3 = screen.getByRole("button", { name: "K.K. Slider" });

    expect(accordion1).toHaveAttribute("aria-expanded", "false");
    expect(accordion2).toHaveAttribute("aria-expanded", "false");
    expect(accordion3).toHaveAttribute("aria-expanded", "false");

    userEvent.click(accordion1);
    expect(accordion1).toHaveAttribute("aria-expanded", "true");
    expect(accordion2).toHaveAttribute("aria-expanded", "false");
    expect(accordion3).toHaveAttribute("aria-expanded", "false");

    userEvent.click(accordion2);
    expect(accordion1).toHaveAttribute("aria-expanded", "true");
    expect(accordion2).toHaveAttribute("aria-expanded", "true");
    expect(accordion3).toHaveAttribute("aria-expanded", "false");

    userEvent.click(accordion3);
    userEvent.click(accordion1);
    expect(accordion1).toHaveAttribute("aria-expanded", "false");
    expect(accordion2).toHaveAttribute("aria-expanded", "true");
    expect(accordion3).toHaveAttribute("aria-expanded", "true");
  });

  it("closes only the focused accordion when there are multiple accordions and the 'esc' key is pressed", async () => {
    render(<Accordion accordionData={accordionData} />);

    const accordion1 = screen.getByRole("button", { name: "Tom Nook" });
    const accordion3 = screen.getByRole("button", { name: "K.K. Slider" });

    expect(accordion1).toHaveAttribute("aria-expanded", "false");
    expect(accordion3).toHaveAttribute("aria-expanded", "false");

    userEvent.click(accordion1);
    userEvent.click(accordion3);

    expect(accordion1).toHaveAttribute("aria-expanded", "true");
    expect(accordion3).toHaveAttribute("aria-expanded", "true");

    const linkInPanel1 = screen.getByRole("link");

    userEvent.type(linkInPanel1, "[Escape]");

    expect(accordion1).toHaveAttribute("aria-expanded", "false");
    expect(accordion3).toHaveAttribute("aria-expanded", "true");
  });

  describe("Check aria-label values", () => {
    it("renders with attribute generated from component prop", () => {
      render(
        <Accordion
          accordionData={[accordionData[0]]}
          ariaLabel="Tom Nook, an Animal Crossing character"
        />
      );
      const accordionPropLabel = screen.getByRole("button", {
        name: "Tom Nook, an Animal Crossing character",
      });
      expect(accordionPropLabel).toBeInTheDocument();
      expect(accordionPropLabel).toHaveAttribute(
        "aria-label",
        "Tom Nook, an Animal Crossing character"
      );
    });

    it("renders with attribute generated from accordionData", () => {
      render(<Accordion accordionData={[accordionDataWithAriaLabel[0]]} />);
      const accordionDataLabel = screen.getByRole("button", {
        name: "Tom Nook, known in Japan as Tanukichi",
      });
      expect(accordionDataLabel).toBeInTheDocument();
      expect(accordionDataLabel).toHaveAttribute(
        "aria-label",
        "Tom Nook, known in Japan as Tanukichi"
      );
    });

    it("accordionData value overrides component prop value", () => {
      render(
        <Accordion
          accordionData={[accordionDataWithAriaLabel[0]]}
          ariaLabel="Tom Nook, an Animal Crossing character"
        />
      );

      // value from data is used
      const accordionDataLabel = screen.getByRole("button", {
        name: "Tom Nook, known in Japan as Tanukichi",
      });
      expect(accordionDataLabel).toBeInTheDocument();
      expect(accordionDataLabel).toHaveAttribute(
        "aria-label",
        "Tom Nook, known in Japan as Tanukichi"
      );

      // value from prop is not used
      const accordionPropLabel = screen.queryByText(
        "Tom Nook, an Animal Crossing character"
      );
      expect(accordionPropLabel).not.toBeInTheDocument();
    });

    it("generates warning when ariaLabel is set twice", () => {
      render(
        <Accordion
          accordionData={[accordionDataWithAriaLabel[0]]}
          ariaLabel="Tom Nook, an Animal Crossing character"
        />
      );
      const warn = jest.spyOn(console, "warn");
      expect(warn).toHaveBeenCalledWith(
        "NYPL Reservoir Accordion: An ariaLabel value has been passed for the " +
          "overall component and as part of the accordionData prop. Both can not " +
          "be used, so the value in the accordionData prop will be used."
      );
    });
  });

  it("Renders the UI snapshot correctly", () => {
    const accordionData = [
      {
        label: "Gerry Kellman",
        panel: (
          <Card
            id="card"
            imageProps={{
              alt: "Alt text",
              aspectRatio: "twoByOne",
              src: "https://cdn.onebauer.media/one/media/6176/76fd/405b/ab5f/f20f/2d52/gerri-1500-1.jpg?format=jpg&quality=80&width=850&ratio=1-1&resize=aspectfit",
            }}
            isCentered
            layout="row"
          >
            <CardHeading id="heading1" level="h4">
              Gerry Kellman
            </CardHeading>
            <CardContent>
              Gerri is <b>one of Logan's most trusted confidantes</b>, one who
              serves many roles within the company. She's one of the most
              powerful people at Waystar Royco outside of the family itself.
            </CardContent>
          </Card>
        ),
      },
    ];

    const primary = renderer
      .create(<Accordion accordionData={accordionData} id="accordian" />)
      .toJSON();
    const defaultOpen = renderer
      .create(
        <Accordion accordionData={accordionData} id="accordian" isDefaultOpen />
      )
      .toJSON();
    const withError = renderer
      .create(
        <Accordion
          accordionData={[{ ...accordionData[0], accordionType: "error" }]}
          id="accordian"
          isDefaultOpen
        />
      )
      .toJSON();
    const withWarning = renderer
      .create(
        <Accordion
          accordionData={[{ ...accordionData[0], accordionType: "warning" }]}
          id="accordian"
          isDefaultOpen
        />
      )
      .toJSON();
    const withPanelMaxHeight = renderer
      .create(
        <Accordion
          accordionData={accordionData}
          id="accordian"
          panelMaxHeight="100px"
        />
      )
      .toJSON();
    const withChakraProps = renderer
      .create(
        <Accordion
          accordionData={accordionData}
          id="accordian"
          p="s"
          color="ui.error.primary"
        />
      )
      .toJSON();
    const withOtherProps = renderer
      .create(
        <Accordion
          accordionData={accordionData}
          id="accordian"
          data-testid="testid"
        />
      )
      .toJSON();

    expect(primary).toMatchSnapshot();
    expect(defaultOpen).toMatchSnapshot();
    expect(withChakraProps).toMatchSnapshot();
    expect(withOtherProps).toMatchSnapshot();
    expect(withPanelMaxHeight).toMatchSnapshot();
    expect(withError).toMatchSnapshot();
    expect(withWarning).toMatchSnapshot();
  });

  it("passes a ref to the div wrapper element", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Accordion accordionData={accordionData} ref={ref} />
    );

    expect(container.querySelectorAll("div")[0]).toBe(ref.current);
  });
});
