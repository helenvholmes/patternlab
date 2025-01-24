import { chakra, Flex, useStyleConfig } from "@chakra-ui/react";

import HeaderLoginButton from "./HeaderLoginButton";
import HeaderMobileNavButton from "./HeaderMobileNavButton";
import HeaderSearchButton from "./HeaderSearchButton";
import Link from "../../Link/Link";
import Icon from "../../Icons/Icon";

/**
 * This component renders the mobile list of icon buttons for
 * logging in, searching, and navigating on NYPL.org.
 */
const HeaderMobileIconNav = chakra(() => {
  const styles = useStyleConfig("HeaderMobileIconNav");

  return (
    <Flex sx={styles}>
      <HeaderLoginButton isMobile />
      <Link
        aria-label="NYPL Locations Near Me"
        href="https://nypl.org/locations"
      >
        <Icon name="mapsPlace" size="large" title="NYPL Locator" />
      </Link>
      <HeaderSearchButton isMobile />
      <HeaderMobileNavButton />
    </Flex>
  );
});

export default HeaderMobileIconNav;
