import {
  Box,
  chakra,
  ChakraComponent,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";

import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Form, { FormField } from "../Form/Form";
import Icon from "../Icons/Icon";
import Link from "../Link/Link";
import Notification from "../Notification/Notification";
import Radio from "../Radio/Radio";
import RadioGroup from "../RadioGroup/RadioGroup";
import Text from "../Text/Text";
import TextInput, { TextInputRefType } from "../TextInput/TextInput";
import useStateWithDependencies from "../../hooks/useStateWithDependencies";
import useNYPLBreakpoints from "../../hooks/useNYPLBreakpoints";
import useFeedbackBoxReducer from "./useFeedbackBoxReducer";

export const feedbackBoxViewTypeArray = [
  "form",
  "confirmation",
  "error",
] as const;
export type FeedbackBoxViewType = typeof feedbackBoxViewTypeArray[number];

export interface FeedbackBoxProps {
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
  /** Toggles the invalid state for the comment field. */
  isInvalidComment?: boolean;
  /** Toggles the invalid state for the email field. */
  isInvalidEmail?: boolean;
  /** Only used for internal purposes. */
  isOpen?: boolean;
  /** Used to add a notification above the description in the
   * initial/form view.*/
  notificationText?: string | JSX.Element;
  /** Only used for internal purposes. */
  onClose?: any;
  /** Only used for internal purposes. */
  onOpen?: any;
  /** Callback function that will be invoked when the form is submitted.
   * The returned data object contains key/value pairs including the
   * values from the `hiddenFields` prop.
   */
  onSubmit: (values: { [key: string]: string }) => any;
  /** Toggles the category radio group field. */
  showCategoryField?: boolean;
  /** Toggles the email input field. When set to `true`, an additional
   * confirmation message will be rendered. */
  showEmailField?: boolean;
  /** Used to populate the label on the open button and the `Drawer`'s
   * header title. */
  title: string;
  /** Used to specify what screen should be displayed. */
  view?: FeedbackBoxViewType;
}

/**
 * The `FeedbackBox` component renders a fixed-positioned button on the bottom
 * right corner of a page that opens a Chakra `Drawer` popup component. Inside
 * of the popup, a form is rendered with fields that allows users to provide
 * feedback. The `FeedbackBox` component does *not* call any API with the
 * submitted data; that feature is the responsibility of the consuming
 * application.
 */
export const FeedbackBox: ChakraComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithChildren<FeedbackBoxProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  FeedbackBoxProps
> = chakra(
  forwardRef<HTMLDivElement, FeedbackBoxProps>(
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
        isOpen,
        onOpen,
        onClose,
        ...rest
      },
      ref?
    ) => {
      // We want to keep internal state for the view but also
      // update if the consuming app updates it, based on API
      // success and failure responses.
      const [viewType, setViewType] = useStateWithDependencies(view);
      const [finalIsInvalidComment, setFinalIsInvalidComment] =
        useStateWithDependencies(isInvalidComment);
      const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
      // Helps keep track of form field state values.
      const { state, setCategory, setComment, setEmail, clearValues } =
        useFeedbackBoxReducer();
      // Hook into NYPL breakpoint
      const { isLargerThanMobile } = useNYPLBreakpoints();
      // Chakra's hook to control Drawer's actions.
      const disclosure = useDisclosure();
      const finalIsOpen = isOpen ? isOpen : disclosure.isOpen;
      const finalOnOpen = onOpen ? onOpen : disclosure.onOpen;
      const finalOnClose = onClose ? onClose : disclosure.onClose;
      const focusRef = useRef<HTMLDivElement>();
      const openButtonRef = useRef<HTMLButtonElement>();
      const commentInputRef = useRef<TextInputRefType>();
      const styles = useMultiStyleConfig("FeedbackBox", {});
      const isFormView = viewType === "form";
      const isConfirmationView = viewType === "confirmation";
      const isErrorView = viewType === "error";
      const confirmationTimeout = 3000;
      const maxCommentCharacters = 500;
      const initMinHeight = 165;
      const initTemplateRows = "auto 1fr";
      const iconColor = useColorModeValue(null, "dark.ui.typography.body");
      const minHeightWithCategory = 235;
      const minHeightWithEmail = 275;
      const minHeightWithCategoryAndEmail = 345;
      const notificationHeightAdjustment = 37;
      const descriptionHeightAdjustment = 24;
      let drawerMinHeight = initMinHeight;
      const closeAndResetForm = () => {
        finalOnClose();
        setViewType("form");
        clearValues();
        setFinalIsInvalidComment(false);

        // Leave some time after closing before focusing on the open button.
        setTimeout(() => {
          openButtonRef?.current?.focus();
        }, 250);
      };
      const internalOnSubmit = (e) => {
        e.preventDefault();
        let submittedValues = { ...state };
        if (hiddenFields) {
          submittedValues = { ...submittedValues, ...hiddenFields };
        }

        // Set the invalid state if the comment text field is empty.
        if (submittedValues.comment.length === 0) {
          commentInputRef?.current?.focus();
          setFinalIsInvalidComment(true);
          return;
        }

        onSubmit && onSubmit(submittedValues);
        setFinalIsInvalidComment(false);
        setIsSubmitted(true);
      };
      const notificationElement =
        isFormView && notificationText ? (
          <Notification
            isCentered
            noMargin
            notificationContent={notificationText}
            showIcon={false}
            p="0"
            sx={{
              // The padding of the Notification is smaller than
              // the initial one.
              "> div": {
                py: "xs",
              },
            }}
            width="100%"
          />
        ) : undefined;
      const descriptionColor = useColorModeValue(
        "ui.typography.heading",
        "dark.ui.typography.heading"
      );
      const descriptionElement =
        isFormView && descriptionText ? (
          <Text color={descriptionColor} fontWeight="medium" noSpace>
            {descriptionText}
          </Text>
        ) : undefined;
      const privacyPolicyField = (
        <FormField>
          <Link
            href="https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy"
            type="external"
            fontSize="text.tag"
            isUnderlined={false}
            width="fit-content"
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
          }, confirmationTimeout);

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

      // Delay focusing on the confirmation or error message
      // because it's an element that dynamically gets rendered,
      // so it is not always available in the DOM.
      useEffect(() => {
        let timer;
        if (viewType === "error" || viewType === "confirmation") {
          timer = setTimeout(() => {
            focusRef?.current?.focus();
          }, 250);
        }
        return () => clearTimeout(timer);
      }, [focusRef, viewType]);
      if (showCategoryField) {
        drawerMinHeight = minHeightWithCategory;
      }
      if (showEmailField) {
        drawerMinHeight = minHeightWithEmail;
      }
      if (showCategoryField && showEmailField) {
        drawerMinHeight = minHeightWithCategoryAndEmail;
      }
      if (notificationText) {
        drawerMinHeight += notificationHeightAdjustment;
      }
      if (descriptionText) {
        drawerMinHeight += descriptionHeightAdjustment;
      }
      if (notificationText && descriptionText) {
        drawerMinHeight += 16;
      }
      let finalDrawerMinHeight = drawerMinHeight + "px";

      return (
        <Box className={className} id={id} ref={ref} sx={styles} {...rest}>
          <Button
            id="open"
            onClick={finalOnOpen}
            sx={styles.openButton}
            ref={openButtonRef}
          >
            {title}
          </Button>

          <Drawer
            blockScrollOnMount={false}
            isOpen={finalIsOpen}
            onClose={closeAndResetForm}
            placement="bottom"
          >
            {/* Adds the opaque background. */}
            <DrawerOverlay />

            <DrawerContent sx={styles.drawerContent}>
              <Button
                buttonType="text"
                id="close-btn"
                onClick={closeAndResetForm}
                sx={styles.closeButton}
              >
                <Icon color="ui.black" name="minus" size="medium" />
                <span>Close {title}</span>
              </Button>
              <DrawerHeader sx={styles.drawerHeader}>
                <Text data-testid="title">{title}</Text>
              </DrawerHeader>

              <DrawerBody sx={styles.drawerBody}>
                <Form
                  gap="grid.s"
                  id="feedback-form"
                  onSubmit={internalOnSubmit}
                  sx={{
                    ".feedback-body": {
                      alignItems: "flex-start",
                      minHeight: finalDrawerMinHeight,
                      gridTemplateRows: initTemplateRows,
                    },
                    ".feedback-body.response": {
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    },
                  }}
                >
                  {/* Initial form Screen */}
                  {isFormView && (
                    <>
                      <VStack className="feedback-body" spacing="s">
                        {(notificationElement || descriptionElement) && (
                          <>
                            {notificationElement}
                            {descriptionElement}
                          </>
                        )}
                        {showCategoryField && (
                          <FormField>
                            <RadioGroup
                              defaultValue={state.category}
                              id={`${id}-category`}
                              isDisabled={isSubmitted}
                              labelText="What is your feedback about?"
                              layout={isLargerThanMobile ? "row" : "column"}
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
                        <FormField width="100%">
                          <TextInput
                            defaultValue={state.comment}
                            helperText={`${
                              maxCommentCharacters - state.comment.length
                            } characters remaining`}
                            id={`${id}-comment`}
                            invalidText="There was a problem. Please fill out this field."
                            isDisabled={isSubmitted}
                            isInvalid={finalIsInvalidComment}
                            labelText="Comment (required)"
                            maxLength={maxCommentCharacters}
                            name={`${id}-comment`}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your question or feedback here"
                            ref={commentInputRef}
                            type="textarea"
                          />
                        </FormField>
                        {showEmailField && (
                          <FormField width="100%">
                            <TextInput
                              id={`${id}-email`}
                              invalidText="There was a problem. Please enter a valid email address."
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
                      </VStack>
                      {privacyPolicyField}
                      <FormField>
                        <ButtonGroup buttonWidth="full" id="submit-cancel">
                          <Button
                            buttonType="secondary"
                            id="cancel"
                            isDisabled={isSubmitted}
                            key="cancel"
                            onClick={closeAndResetForm}
                          >
                            Cancel
                          </Button>
                          <Button
                            id="submit"
                            isDisabled={isSubmitted}
                            key="submit"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </ButtonGroup>
                      </FormField>
                    </>
                  )}

                  {/* Confirmation Screen */}
                  {isConfirmationView && (
                    <>
                      <Box
                        className="feedback-body response"
                        key="confirmationWrapper"
                        margin="auto"
                        tabIndex={-1}
                        textAlign="center"
                        ref={focusRef}
                      >
                        <Icon
                          color={iconColor}
                          name="actionCheckCircleFilled"
                          size="large"
                        />
                        <Text fontWeight="medium">
                          Thank you for submitting your feedback.
                        </Text>
                        {showEmailField && (
                          <Text>
                            If you provided an email address and require a
                            response, our service staff will reach out to you
                            via email.
                          </Text>
                        )}
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
                      <Box
                        className="feedback-body response"
                        color="ui.error.primary"
                        key="errorWrapper"
                        margin="auto"
                        tabIndex={-1}
                        textAlign="center"
                        ref={focusRef}
                      >
                        <Icon
                          color="ui.error.primary"
                          name="errorFilled"
                          size="large"
                        />
                        <Text fontWeight="medium">
                          Oops! Something went wrong. An error occured while
                          processing your feedback.
                        </Text>
                      </Box>
                      {privacyPolicyField}
                      <FormField>
                        <ButtonGroup buttonWidth="full" id="submit-cancel">
                          <Button
                            id="return-browsing2"
                            key="return-browsing2"
                            buttonType="secondary"
                            onClick={closeAndResetForm}
                          >
                            Return to Browsing
                          </Button>
                          <Button
                            id="try-again"
                            key="try-again"
                            onClick={() => setViewType("form")}
                          >
                            Try Again
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

export function useFeedbackBox(): any {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const InternalFeedbackBox = chakra((props) => {
    return (
      <FeedbackBox
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        {...props}
      />
    );
  });

  return { isOpen, onClose, onOpen, FeedbackBox: InternalFeedbackBox };
}

export default FeedbackBox;
