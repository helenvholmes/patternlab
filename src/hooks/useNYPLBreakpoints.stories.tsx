import { Box, Stack } from "@chakra-ui/react";
import Heading from "../components/Heading/Heading";
import List from "../components/List/List";
import Text from "../components/Text/Text";
import useNYPLBreakpoints from "./useNYPLBreakpoints";

export const BreakPointsExample = () => {
  const {
    // Chakra syntax
    isLargerThanSmall,
    isLargerThanMedium,
    isLargerThanLarge,
    isLargerThanXLarge,

    // NYPL semantic syntax
    isLargerThanSmallMobile,
    isLargerThanLargeMobile,
    isLargerThanSmallTablet,
    isLargerThanLargeTablet,
    isLargerThanMobile,
    isLargerThanTablet,
  } = useNYPLBreakpoints();
  return (
    <Stack direction="row" spacing="l" width="100%">
      <Box flexBasis="50%">
        <Heading text="Chakra Syntax" level="h3" size="heading6" />
        <Text>The windows size is currently:</Text>
        <List type="ul">
          <li>
            {isLargerThanSmall ? <strong>LARGER</strong> : "smaller"} than small
          </li>
          <li>
            {isLargerThanMedium ? <strong>LARGER</strong> : "smaller"} than
            medium
          </li>
          <li>
            {isLargerThanLarge ? <strong>LARGER</strong> : "smaller"} than large
          </li>
          <li>
            {isLargerThanXLarge ? <strong>LARGER</strong> : "smaller"} than
            extra large
          </li>
        </List>
      </Box>
      <Box flexBasis="50%">
        <Heading text="Semantic Syntax" level="h3" size="heading6" />
        <Text>The windows size is currently:</Text>
        <List type="ul">
          <li>
            {isLargerThanSmallMobile ? <strong>LARGER</strong> : "smaller"} than
            small mobile
          </li>
          <li>
            {isLargerThanLargeMobile ? <strong>LARGER</strong> : "smaller"} than
            large mobile
          </li>
          <li>
            {isLargerThanMobile ? <strong>LARGER</strong> : "smaller"} than
            mobile (small and large)
          </li>
          <li>
            {isLargerThanSmallTablet ? <strong>LARGER</strong> : "smaller"} than
            small tablet
          </li>
          <li>
            {isLargerThanLargeTablet ? <strong>LARGER</strong> : "smaller"} than
            large tablet
          </li>
          <li>
            {isLargerThanTablet ? <strong>LARGER</strong> : "smaller"} than
            tablet (small and large)
          </li>
        </List>
      </Box>
    </Stack>
  );
};
