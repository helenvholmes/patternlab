import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, VStack } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import NewsletterSignup, {
  NewsletterSignupViewType,
  highlightColorTypesArray,
} from "./NewsletterSignup";
import Heading from "../Heading/Heading";
import Link from "../Link/Link";
import Text from "../Text/Text";

const meta: Meta<typeof NewsletterSignup> = {
  title: "Components/Form Elements/NewsletterSignup",
  component: NewsletterSignup,
  parameters: {
    jest: ["NewsletterSignup.test.tsx"],
  },
  argTypes: {
    className: { control: false },
    confirmationHeading: {
      control: "text",
    },
    confirmationText: {
      control: "text",
    },
    descriptionText: {
      control: "text",
    },
    errorHeading: {
      control: "text",
    },
    errorText: {
      control: "text",
    },
    formHelperText: {
      control: "text",
    },
    id: { control: false },
    highlightColor: {
      control: "select",
      options: highlightColorTypesArray,
      table: {
        type: {
          /** Overrides the imported type from the component file */
          summary: "HighlightColorTypes",
          /**  Makes the type in the description column
           a cute dropdown list of all options */
          detail: `${highlightColorTypesArray
            .map((color) => `${color}\n`)
            .join("")}`,
        },
        defaultValue: {
          summary: "ui.gray.medium",
        },
      },
    },
    onChange: { control: false, action: "onChange" },
    onSubmit: { control: false, action: "onSubmit" },
    privacyPolicyLink: {
      control: "text",
      table: {
        defaultValue: {
          summary:
            "https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy",
        },
      },
    },
    title: {
      control: false,
    },
    valueEmail: { control: false },
    view: {
      control: "select",
      options: ["form", "submitting", "confirmation", "error"],
      table: {
        defaultValue: {
          summary: "form",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSignup>;

// Declare required props to be used in all stories
const title = "Sign Up for Our Newsletter";
const descriptionText =
  "Stay connected with the latest research news from NYPL, including information about our events, programs, " +
  "exhibitions, and collections.";
const confirmationHeading = "Thank you for signing up!";
const errorHeading = "Oops! Something went wrong.";

export const WithControls: Story = {
  args: {
    className: undefined,
    confirmationHeading,
    confirmationText: undefined,
    descriptionText,
    errorHeading,
    errorText: undefined,
    formHelperText: undefined,
    id: undefined,
    isInvalidEmail: false,
    highlightColor: undefined,
    onChange: (event) => {
      action("onChange")(event.target.value);
    },
    onSubmit: (event) => {
      event.preventDefault();
      action("onSubmit")(event.target[0].value);
    },
    privacyPolicyLink: undefined,
    title: title,
    valueEmail: undefined,
    view: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=80849%3A174194&mode=dev",
    },
    jest: "NewsletterSignup.test.tsx",
  },
  render: (args) => <NewsletterSignup {...args} />,
};
/* Counter to allow the interactive example to show different states uponn submit*/
let counter = 0;

function NewsletterSignupOnSubmitExampleComponent() {
  const [view, setView]: [
    NewsletterSignupViewType,
    React.Dispatch<React.SetStateAction<NewsletterSignupViewType>>
  ] = React.useState("form");
  const [inputVal, setInputVal] = React.useState("");

  const changeView = () => {
    counter++;
    setView(counter === 1 ? "confirmation" : counter === 2 ? "error" : "form");
    setTimeout(() => {
      setView("form");
      setInputVal("");
    }, 2000);
  };

  React.useEffect(() => {
    if (counter === 3) counter = 0;
  });

  const handleChange = (event) => {
    console.log(`onChange Email Input value: ${event.target.value}`);
    setInputVal(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setView("submitting");
    console.log(`onSubmit Email Input value: ${event.target.email.value}`);
    setTimeout(changeView, 2000);
  };

  return (
    <NewsletterSignup
      id="interactive"
      view={view}
      isInvalidEmail={counter === 3}
      valueEmail={inputVal}
      onChange={handleChange}
      onSubmit={handleSubmit}
      confirmationHeading={confirmationHeading}
      descriptionText={descriptionText}
      errorHeading={errorHeading}
      title={title}
    />
  );
}

export const NewsletterSignupOnSubmitExample: Story = {
  render: () => <NewsletterSignupOnSubmitExampleComponent />,
  name: "Interactive Example",
};

export const DescriptionUsingJSXElements: Story = {
  render: () => (
    <NewsletterSignup
      id="jsx-description-text"
      view="form"
      title={title}
      errorHeading={errorHeading}
      onChange={() => {}}
      onSubmit={() => {}}
      descriptionText={
        <Text noSpace size="body2">
          If the description text needs to have <i>special</i> styling or needs
          to have a <Link href="https://corgiorgy.com/">nested link</Link>
        </Text>
      }
      confirmationHeading={confirmationHeading}
    />
  ),
};

export const CustomHeadings: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <NewsletterSignup
        id="string-title"
        view="form"
        onChange={() => {}}
        onSubmit={() => {}}
        title="String heading"
        confirmationHeading={confirmationHeading}
        errorHeading={errorHeading}
        descriptionText={descriptionText}
      />
      <NewsletterSignup
        id="custom-element-heading"
        view="form"
        confirmationHeading={confirmationHeading}
        errorHeading={errorHeading}
        onChange={() => {}}
        onSubmit={() => {}}
        title={<Heading level="h4" text="Custom h4 DS Heading" />}
        descriptionText={descriptionText}
      />
    </VStack>
  ),
};

export const ComponentStates: Story = {
  render: () => (
    <VStack align="stretch" spacing="l">
      <Box>
        <Heading level="h3" size="heading6">
          Form View (default)
        </Heading>
        <NewsletterSignup
          id="form-view"
          view="form"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          title={title}
          descriptionText={descriptionText}
          errorHeading={errorHeading}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Form View with Invalid Email
        </Heading>
        <NewsletterSignup
          id="invalid-email"
          isInvalidEmail
          view="form"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          title={title}
          descriptionText={descriptionText}
          errorHeading={errorHeading}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Submitting View (disabled inputs)
        </Heading>
        <NewsletterSignup
          id="submitting-view"
          view="submitting"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          title={title}
          descriptionText={descriptionText}
          errorHeading={errorHeading}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Confirmation View
        </Heading>
        <NewsletterSignup
          id="confirmation-view"
          view="confirmation"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          confirmationText="You can update your email subscription preferences at any time using the links at the bottom of the email."
          title={title}
          descriptionText={descriptionText}
          errorHeading={errorHeading}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Confirmation View with Custom Element Confirmation Message
        </Heading>
        <NewsletterSignup
          id="confirmation-view"
          view="confirmation"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          confirmationText={
            <Text noSpace size="body2">
              You are now receiving our Newsletter. Find out more about
              <Link href="https://www.nypl.org/spotlight/live">
                upcoming Live from NYPL events
              </Link>
              .
            </Text>
          }
          descriptionText={descriptionText}
          title={title}
          errorHeading={errorHeading}
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Error View
        </Heading>
        <NewsletterSignup
          id="error-view"
          view="error"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          title={title}
          descriptionText={descriptionText}
          errorHeading={errorHeading}
          errorText="Please refresh this page and try again."
        />
      </Box>
      <Box>
        <Heading level="h3" size="heading6">
          Error View with Custom Element Error Message
        </Heading>
        <NewsletterSignup
          id="error-view"
          view="error"
          onChange={() => {}}
          onSubmit={() => {}}
          confirmationHeading={confirmationHeading}
          descriptionText={descriptionText}
          title={title}
          errorHeading="An error has occurred."
          errorText={
            <Text noSpace size="body2">
              Please refresh this page and try again. If this error persists,{" "}
              <Link href="mailto:enews@nypl.org?subject=Please re-activate my e-mail address">
                contact our e-mail team
              </Link>
              .
            </Text>
          }
        />
      </Box>
    </VStack>
  ),
};

export const HightlightColors: Story = {
  render: () => (
    <NewsletterSignup
      id="highlight-color-education"
      view="form"
      onChange={() => {}}
      onSubmit={() => {}}
      title="Education Newsletter Color"
      highlightColor="section.education.primary"
      confirmationHeading={confirmationHeading}
      errorHeading={errorHeading}
      descriptionText={descriptionText}
    />
  ),
};

/* To fix focus issue where the page focuses on the last NewsletterSignup 
component example. 
Note: This behavior only effects the storybook doc and is caused by rendering
a list of the component in different states. This issue should not happen on a consuming app page*/
const setFocus = () => {
  const heading = document.getElementById(
    "anchor--components-form-elements-newslettersignup--with-controls"
  );
  heading.focus();
  heading.scrollIntoView({ behavior: "smooth" });
};

setTimeout(setFocus, 2000);
