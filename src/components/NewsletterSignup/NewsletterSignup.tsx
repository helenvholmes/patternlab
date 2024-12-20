import {
  chakra,
  Stack,
  useColorModeValue,
  useMultiStyleConfig,
  ChakraComponent,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import Button from "../Button/Button";
import Form, { FormField } from "../Form/Form";
import Link from "../Link/Link";
import { NewsletterSignupResponse } from "./NewsletterSignupResponse";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";
import useDSHeading from "../../hooks/useDSHeading";
import useNYPLBreakpoints from "../../hooks/useNYPLBreakpoints";

export interface NewsletterSignupProps {
  /** Additional class name to add. */
  className?: string;
  /** Text displayed next to the confirmation icon after a successful email submission */
  confirmationHeading: string;
  /** Detail text for the confirmation view */
  confirmationText?: string | JSX.Element;
  /** Appears below the title to provide details about the newsletter. Accepts a string or an element. */
  descriptionText?: string | JSX.Element;
  /** Text displayed next to the error icon in case of an error in the email submission process*/
  errorHeading: string;
  /** Appears below the title to provide details about next steps in case of an error. Accepts a string or an element. */
  errorText?: string | JSX.Element;
  /** Appears below the input field's example text to provide any additional instructions. Accepts a string or
   *  an element. */
  formHelperText?: string | JSX.Element;
  /** ID that other components can cross-reference for accessibility purposes */
  id?: string;
  /** Toggles the invalid state for the email field. */
  isInvalidEmail?: boolean;
  /** Value to determine the section color highlight.
   */
  highlightColor?: HighlightColorTypes;
  /** A handler function that will be called when the form is submitted. */
  onSubmit: (event: React.FormEvent<any>) => void;
  /** A handler function that will be called when the text input changes. */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Gives option to remove the default Privacy Link if a custom one is provided
   * NOTE: A Privacy Policy link should always be included.
   */
  showPrivacyLink?: boolean;
  /** Link to the relevant privacy policy page. */
  privacyPolicyLink?: string;
  /** Sets the text for a `Heading` component, or
   * a DS Heading component that can be passed in.
   */
  title: JSX.Element | string;
  /** The value of the email text input field. */
  valueEmail?: string;
  /** Used to specify what is displayed in the component form/feedback area. */
  view?: NewsletterSignupViewType;
}

export const highlightColorTypesArray = [
  "ui.gray.medium",
  "section.blogs.secondary",
  "section.books-and-more.primary",
  "brand.primary",
  "section.connect.primary",
  "section.education.primary",
  "section.locations.primary",
  "section.research.primary",
  "section.research-library.lpa",
  "section.research-library.schomburg",
  "section.research-library.schwartzman",
  "section.whats-on.primary",
] as const;
export type HighlightColorTypes = typeof highlightColorTypesArray[number];

export type NewsletterSignupViewType =
  | "form"
  | "submitting"
  | "confirmation"
  | "error";

/**
 * The NewsletterSignup component provides a way for patrons to register for an
 * email-based newsletter distribution list.
 */
export const NewsletterSignup: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<NewsletterSignupProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  React.PropsWithChildren<NewsletterSignupProps>
> = chakra(
  forwardRef<HTMLDivElement, NewsletterSignupProps>(
    (
      {
        className,
        confirmationHeading,
        confirmationText,
        descriptionText,
        errorHeading,
        errorText,
        formHelperText,
        id,
        isInvalidEmail = false,
        highlightColor = "ui.gray.medium",
        onChange,
        onSubmit,
        showPrivacyLink = true,
        privacyPolicyLink = "https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy",
        valueEmail,
        title,
        view = "form",
        ...rest
      },
      ref?
    ) => {
      const { isLargerThanMobile } = useNYPLBreakpoints();
      const styles = useMultiStyleConfig("NewsletterSignup", {
        highlightColor,
      });
      const iconColor = useColorModeValue(null, "dark.ui.typography.body");
      const errorColor = useColorModeValue(
        "ui.error.primary",
        "dark.ui.error.primary"
      );
      const isFormView = view === "form" || view === "submitting";
      const finalTitle = useDSHeading({
        title,
        id,
        headingSize: "heading3",
        additionalStyles: {
          marginBottom: 0,
        },
      });

      // Manage focus to ensure accessibility when confirmation or error message is rendered.
      const focusRef = React.useRef<HTMLDivElement>(null);
      // When view prop changes, set focus to the confirmation or error content element.
      React.useEffect(() => {
        focusRef.current?.focus();
      }, [view]);

      return (
        <Stack
          direction={isLargerThanMobile ? "row" : "column"}
          ref={ref}
          __css={styles}
          {...rest}
        >
          <VStack
            __css={styles.pitch}
            className="newsletter-signup-appeal"
            alignItems="flex-start"
          >
            {finalTitle}
            {descriptionText ? (
              typeof descriptionText === "string" ? (
                <Text noSpace size="body2">
                  {descriptionText}
                </Text>
              ) : (
                descriptionText
              )
            ) : null}
            {showPrivacyLink && (
              <Link
                href={privacyPolicyLink}
                type="external"
                isUnderlined={false}
                __css={styles.privacy}
              >
                Privacy Policy
              </Link>
            )}
          </VStack>
          <VStack __css={styles.action} className="newsletter-signup-form">
            {isFormView && (
              <Form id="newsletter-form" onSubmit={onSubmit}>
                <FormField key="formfield-input">
                  <TextInput
                    id="email-input"
                    isDisabled={view === "submitting"}
                    isRequired
                    invalidText="There was a problem. Please enter a valid email address."
                    isInvalid={isInvalidEmail}
                    labelText="Email Address"
                    helperText={formHelperText}
                    name="email"
                    onChange={onChange}
                    placeholder="Enter your email address"
                    type="email"
                    value={valueEmail}
                  />
                </FormField>
                <FormField key="formfield-button">
                  <Button
                    id="submit"
                    isDisabled={view === "submitting"}
                    type="submit"
                  >
                    Submit
                  </Button>
                </FormField>
              </Form>
            )}
            {view === "confirmation" && (
              <NewsletterSignupResponse
                focusRef={focusRef}
                heading={confirmationHeading}
                iconName="actionCheckCircleFilled"
                iconColor={iconColor}
                text={confirmationText}
              />
            )}
            {view === "error" && (
              <NewsletterSignupResponse
                focusRef={focusRef}
                heading={errorHeading}
                headingColor={errorColor}
                iconName="errorFilled"
                iconColor={errorColor}
                text={errorText}
              />
            )}
          </VStack>
        </Stack>
      );
    }
  )
);

export default NewsletterSignup;
