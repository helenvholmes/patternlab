import {
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";

import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Form, { FormField } from "../Form/Form";
import Icon from "../Icons/Icon";
import Link from "../Link/Link";
import Notification from "../Notification/Notification";
import Radio from "../Radio/Radio";
import RadioGroup from "../RadioGroup/RadioGroup";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";
import useStateWithDependencies from "../../hooks/useStateWithDependencies";
import useFeedbackBoxReducer from "./useFeedbackBoxReducer";

type ViewType = "form" | "confirmation" | "error";

interface FeedbackBoxProps {
  /** Additional class name to add. */
  className?: string;
  /** Used to add additional information to the default confirmation message in
   * the confirmation view. */
  confirmationText?: string | JSX.Element;
  /** Used to add description text above the form input fields in
   * the initial/form view. */
  descriptionText?: string | JSX.Element;
  /** A data object containing key/value pairs that will be added to the form
   * field submitted data. */
  hiddenFields?: any;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Toggles the invalid state for the email field. */
  isInvalidComment?: boolean;
  /** Toggles the invalid state for the comment field. */
  isInvalidEmail?: boolean;
  /** Used to add a notification above the description in the
   * initial/form view.*/
  notificationText?: string | JSX.Element;
  /** Callback function that will be invoked when the form is submitted.
   * The returned data object contains key/value pairs including the
   * values from the `hiddenFields` prop.
   */
  onSubmit: (values: { [key: string]: string }) => any;
  /** Toggles the category radio group field. */
  showCategoryField?: boolean;
  /** Toggles the email input field. */
  showEmailField?: boolean;
  /** Used to populate the label on the open button and the `Drawer`'s
   * header title. */
  title: string;
  /** Used to specify what screen should be displayed. */
  view?: ViewType;
}

/**
 * The `FeedbackBox` component renders a fixed-positioned button on the bottom
 * right corner of a page that opens a Chakra `Drawer` popup component. Inside
 * of the popup, a form is rendered with fields that allows users to provide
 * feedback. The `FeedbackBox` component does *not* call any API with the
 * submitted data; that feature is the responsibility of the consuming
 * application.
 */
export const FeedbackBox = chakra(
  forwardRef<any, FeedbackBoxProps>(
    (
      {
        className,
        confirmationText,
        descriptionText,
        hiddenFields,
        id = "feedbackbox",
        isInvalidComment = false,
        isInvalidEmail = false,
        notificationText,
        onSubmit,
        showCategoryField = false,
        showEmailField = false,
        title,
        view = "form",
      },
      ref?
    ) => {
      // We want to keep internal state for the view but also
      // update if the consuming app updates it, based on API
      // success and failure responses.
      const [viewType, setViewType] = useStateWithDependencies(view);
      const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
      // Helps keep track of form field state values.
      const { state, setCategory, setComment, setEmail, clearValues } =
        useFeedbackBoxReducer();
      // Chakra's hook to control Drawer's actions.
      const { isOpen, onOpen, onClose } = useDisclosure();
      const isFormView = viewType === "form";
      const isConfirmationView = viewType === "confirmation";
      const isErrorView = viewType === "error";
      const styles = useMultiStyleConfig("FeedbackBox", {});
      const maxCommentCharacters = 500;
      const closeAndResetForm = () => {
        onClose();
        setViewType("form");
        clearValues();
      };
      const internalOnSubmit = (e) => {
        e.preventDefault();
        let submittedValues = { ...state };
        if (hiddenFields) {
          submittedValues = { ...submittedValues, ...hiddenFields };
        }
        onSubmit && onSubmit(submittedValues);
        setIsSubmitted(true);
      };
      const notificationElement =
        isFormView && notificationText ? (
          <Notification
            isCentered
            noMargin
            notificationContent={notificationText}
            showIcon={false}
            marginBottom="s"
          />
        ) : undefined;
      const descriptionElement =
        isFormView && descriptionText ? (
          <Text size="caption">{descriptionText}</Text>
        ) : undefined;
      const privacyPolicyField = (
        <FormField>
          <Link
            href="https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy"
            type="external"
            fontSize="text.caption"
          >
            Privacy Policy
          </Link>
        </FormField>
      );

      // When the submit button is clicked, set a timeout before displaying
      // the confirmation or error screen. This automatically goes to the
      // confirmation view after three (3) seconds, but the consuming app
      // can set the error view if there are any issues.
      useEffect(() => {
        let timer;
        if (isSubmitted) {
          // If the consuming app does not provide any updates based
          // on its API response, go to confirmation screen.
          timer = setTimeout(() => {
            setIsSubmitted(false);
            if (isErrorView) {
              setViewType("error");
            } else {
              setViewType("confirmation");
            }
            clearValues();
          }, 3000);

          // If the consuming app does pass the API response to the
          // component, then cancel the timeout above and display the
          // appropriate screen.
          if (view !== viewType) {
            setIsSubmitted(false);
            setViewType(view);
            clearTimeout(timer);
          }
        }

        return () => clearTimeout(timer);
      }, [clearValues, isErrorView, isSubmitted, setViewType, view, viewType]);

      return (
        <Box className={className} id={id} ref={ref} sx={styles}>
          <Button id="open" onClick={onOpen} sx={styles.openButton}>
            {title}
          </Button>

          <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
            {/* Adds the opaque background. */}
            <DrawerOverlay />

            <DrawerContent sx={styles.drawerContent}>
              <DrawerHeader sx={styles.drawerHeader}>
                <Text>{title}</Text>
                <Spacer />
                <Button
                  buttonType="text"
                  id="close-btn"
                  onClick={onClose}
                  sx={styles.closeButton}
                >
                  <Icon color="ui.black" name="minus" size="medium" />
                  <span>Close {title}</span>
                </Button>
              </DrawerHeader>

              <DrawerBody sx={styles.drawerBody}>
                {notificationElement}
                {descriptionElement}

                <Form
                  gap="grid.s"
                  id="feedback-form"
                  onSubmit={internalOnSubmit}
                >
                  {/* Initial form Screen */}
                  {isFormView && (
                    <>
                      {showCategoryField && (
                        <FormField>
                          <RadioGroup
                            defaultValue={state.category}
                            id={`${id}-category`}
                            isDisabled={isSubmitted}
                            labelText="What is your feedback about?"
                            layout="row"
                            name={`${id}-category`}
                            onChange={(selected) => setCategory(selected)}
                          >
                            <Radio
                              id="comment"
                              labelText="Comment"
                              value="comment"
                            />
                            <Radio
                              id="correction"
                              labelText="Correction"
                              value="correction"
                            />
                            <Radio id="bug" labelText="Bug" value="bug" />
                          </RadioGroup>
                        </FormField>
                      )}
                      <FormField>
                        <TextInput
                          helperText={`${
                            maxCommentCharacters - state.comment.length
                          } characters remaining`}
                          id={`${id}-comment`}
                          invalidText="Please fill out this field."
                          isDisabled={isSubmitted}
                          isInvalid={isInvalidComment}
                          isRequired
                          labelText="Comment"
                          maxLength={maxCommentCharacters}
                          name={`${id}-comment`}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Enter your question or feedback here"
                          type="textarea"
                          defaultValue={state.comment}
                        />
                      </FormField>
                      {showEmailField && (
                        <FormField>
                          <TextInput
                            id={`${id}-email`}
                            invalidText="Please enter a valid email address."
                            isDisabled={isSubmitted}
                            isInvalid={isInvalidEmail}
                            labelText="Email"
                            name={`${id}-email`}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address here"
                            type="email"
                            value={state.email}
                          />
                        </FormField>
                      )}
                      {privacyPolicyField}
                      <FormField>
                        <ButtonGroup buttonWidth="full" id="submit-cancel">
                          <Button
                            id="submit"
                            isDisabled={isSubmitted}
                            key="submit"
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button
                            buttonType="secondary"
                            id="cancel"
                            isDisabled={isSubmitted}
                            key="cancel"
                            onClick={closeAndResetForm}
                          >
                            Cancel
                          </Button>
                        </ButtonGroup>
                      </FormField>
                    </>
                  )}

                  {/* Confirmation Screen */}
                  {isConfirmationView && (
                    <>
                      <Box textAlign="center">
                        <Icon name="actionCheckCircleFilled" size="large" />
                        <Text isBold>
                          Thank you for submitting your feedback!
                        </Text>
                        <Text>
                          If you provided an email address and require a
                          response, our service staff will reach out to you via
                          email.
                        </Text>
                        {confirmationText ? (
                          <Text>{confirmationText}</Text>
                        ) : undefined}
                      </Box>
                      {privacyPolicyField}
                      <FormField>
                        <ButtonGroup buttonWidth="full" id="submit-cancel">
                          <Button
                            id="return-browsing"
                            buttonType="secondary"
                            onClick={closeAndResetForm}
                          >
                            Return to Browsing
                          </Button>
                        </ButtonGroup>
                      </FormField>
                    </>
                  )}

                  {/* Error Screen */}
                  {isErrorView && (
                    <>
                      <Box textAlign="center" color="ui.error.primary">
                        <Icon
                          color="ui.error.primary"
                          name="errorFilled"
                          size="large"
                        />
                        <Text isBold>
                          Oops! Something went wrong. An error occured while
                          processing your feedback.
                        </Text>
                      </Box>
                      {privacyPolicyField}
                      <FormField>
                        <ButtonGroup buttonWidth="full" id="submit-cancel">
                          <Button
                            id="try-again"
                            key="try-again"
                            onClick={() => setViewType("form")}
                          >
                            Try Again
                          </Button>
                          <Button
                            id="return-browsing2"
                            key="return-browsing2"
                            buttonType="secondary"
                            onClick={closeAndResetForm}
                          >
                            Return to Browsing
                          </Button>
                        </ButtonGroup>
                      </FormField>
                    </>
                  )}
                </Form>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    }
  )
);

export default FeedbackBox;
