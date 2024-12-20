import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { userEvent, expect, screen } from "@storybook/test";

import FeedbackBox, { feedbackBoxViewTypeArray } from "./FeedbackBox";
import Heading from "../Heading/Heading";
import useStateWithDependencies from "../../hooks/useStateWithDependencies";

const meta: Meta<typeof FeedbackBox> = {
  title: "Components/Form Elements/FeedbackBox",
  component: FeedbackBox,
  parameters: {
    jest: ["FeedbackBox.test.tsx"],
  },
  argTypes: {
    className: { control: false },
    hiddenFields: { control: false },
    id: { control: false },
    isInvalidComment: { table: { defaultValue: { summary: "false" } } },
    isInvalidEmail: { table: { defaultValue: { summary: "false" } } },
    isOpen: { table: { disable: true } },
    notificationText: { control: false },
    onClose: { table: { disable: true } },
    onOpen: { table: { disable: true } },
    onSubmit: { control: false },
    showCategoryField: { table: { defaultValue: { summary: "false" } } },
    showEmailField: { table: { defaultValue: { summary: "true" } } },
    view: {
      control: { type: "select" },
      options: feedbackBoxViewTypeArray,
      table: { defaultValue: { summary: "form" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackBox>;

const FeedbackBoxWithControls = (args) => {
  // This hook is used because the `view` prop can be controlled
  // by Storybook controls.
  const [internalView, setInternalView] = useStateWithDependencies(args.view);
  const [count, setCount] = useState(0);
  // Example hidden field values.
  const hiddenFields = {
    "hidden-field-1": "hidden-field-value-1",
    "hidden-field-2": "hidden-field-value-2",
  };
  // For the purposes of the Storybook example, the confirmation and
  // error screens display on alternate form submissions.
  const onSubmit = (values) => {
    setCount((prev) => prev + 1);
    setInternalView(count % 2 === 0 ? "confirmation" : "error");
    console.log("Submitted values:", values);
  };
  return (
    <Box maxHeight="200px" overflowY="auto">
      <Box height="400px" bgColor="ui.white" width="100%">
        <Heading level="h3" m="s">
          ui.white
        </Heading>
      </Box>
      <Box height="400px" bgColor="ui.bg.default" width="100%">
        <Heading level="h3" m="s">
          ui.bg.default
        </Heading>
      </Box>
      <Box height="400px" bgColor="dark.ui.bg.default" width="100%">
        <Heading level="h3" m="s" color="ui.white">
          dark.ui.bg.default
        </Heading>
      </Box>
      <Box height="400px" bgColor="dark.ui.bg.page" width="100%">
        <Heading level="h3" m="s" color="ui.white">
          dark.ui.bg.page
        </Heading>
      </Box>
      <FeedbackBox
        {...args}
        hiddenFields={hiddenFields}
        notificationText={
          <span>
            <b>Call Number:</b> JFE 95-8555
          </span>
        }
        onSubmit={onSubmit}
        view={internalView}
      />
    </Box>
  );
};

/**
 * Main Story for the FeedbackBox component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    confirmationText: "",
    descriptionText: "Please share your question or feedback.",
    hiddenFields: undefined,
    id: "feedbackBox-id",
    isInvalidComment: false,
    isInvalidEmail: true,
    isOpen: undefined,
    notificationText: undefined,
    onClose: undefined,
    onOpen: undefined,
    onSubmit: undefined,
    showCategoryField: true,
    showEmailField: true,
    title: "Help and Feedback",
    view: "form",
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
    jest: "FeedbackBox.test.tsx",
  },
  play: async () => {
    expect(
      screen.queryByRole("textbox", { name: /comment/i })
    ).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Help and Feedback" });
    await userEvent.click(button);
    expect(screen.getByLabelText("Correction")).not.toBeChecked();
    await userEvent.click(screen.getByLabelText("Correction"));
    expect(screen.getByLabelText("Correction")).toBeChecked();
    expect(
      screen.getByRole("textbox", { name: /comment/i })
    ).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submit);
    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    await userEvent.type(
      screen.getByRole("textbox", { name: /comment/i }),
      "Hello"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "not valid"
    );
    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    await userEvent.clear(screen.getByRole("textbox", { name: /email/i }));
    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "a@b.com"
    );
    await userEvent.click(submit);
    expect(
      screen.getByText(/thank you for submitting your feedback/i)
    ).toBeInTheDocument();
  },
  render: (args) => <FeedbackBoxWithControls {...args} />,
};
