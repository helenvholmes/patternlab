import { Box } from "@chakra-ui/react";
import Icon, { IconColors, IconNames } from "../Icons/Icon";
import Text from "../Text/Text";

interface NewsletterSignupResponseProps {
  focusRef: React.MutableRefObject<HTMLDivElement>;
  heading: string;
  headingColor?: string;
  iconName: IconNames;
  iconColor: IconColors;
  text?: string | JSX.Element;
}
export const NewsletterSignupResponse = ({
  focusRef,
  heading,
  headingColor,
  iconName,
  iconColor,
  text,
}: NewsletterSignupResponseProps) => {
  return (
    <Box
      className="feedback-body response"
      margin="auto"
      ref={focusRef}
      tabIndex={-1}
      width="100%"
    >
      <Box display="flex" marginBottom="xs" alignItems={{ md: "center" }}>
        <Icon color={iconColor} name={iconName} size="large" />
        <Text
          {...(headingColor && { color: headingColor })}
          size="subtitle1"
          marginStart="xs"
          marginBottom="unset"
          fontWeight="medium"
        >
          {heading}
        </Text>
      </Box>
      {text ? (
        typeof text === "string" ? (
          <Text noSpace size="body2">
            {text}
          </Text>
        ) : (
          text
        )
      ) : null}
    </Box>
  );
};
