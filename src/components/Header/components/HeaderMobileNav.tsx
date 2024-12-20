import {
  Box,
  chakra,
  Flex,
  Spacer,
  useMultiStyleConfig,
} from "@chakra-ui/react";

import { siteNavLinks, upperNavLinks } from "../utils/headerUtils";
import Link from "../../Link/Link";
import Logo from "../../Logo/Logo";
import List from "../../List/List";
import SimpleGrid from "../../Grid/SimpleGrid";
import { Icon } from "../../Icons/Icon";

/**
 * This component renders the navigational list of links used to navigate
 * NYPL.org for mobile devices.
 */
const HeaderMobileNav = chakra(() => {
  const styles = useMultiStyleConfig("HeaderMobileNav", {});
  const listItems = siteNavLinks.map(({ href, text }) => (
    <Link href={href} key={text}>
      {text}
    </Link>
  ));

  return (
    <Box __css={styles}>
      <Flex>
        <Box>
          <Logo
            aria-label="NYPL Header Logo"
            decorative={false}
            name="nyplTextWhite"
            size="xsmall"
            title="NYPL Header Logo"
            __css={styles.logo}
          />
        </Box>
        <Spacer />
        <nav aria-label="Header mobile links">
          <List
            id="header-mobile-nav"
            listItems={listItems}
            noStyling
            type="ul"
            __css={{
              ...styles.sideNav,
              li: { marginBottom: "unset !important" },
            }}
          />
        </nav>
      </Flex>
      <SimpleGrid data-testid="bottomLinks" __css={styles.bottomLinks}>
        <Link
          href={upperNavLinks.libraryCard.href}
          borderTop="1px solid rgb(54, 54, 54)"
          borderRight="1px solid rgb(54, 54, 54)"
          gridColumn="1 / span 1"
        >
          <Icon
            align="left"
            color="ui.white"
            name="decorativeLibraryCard"
            size="large"
          />
          {upperNavLinks.libraryCard.text}
        </Link>
        <Link
          href={upperNavLinks.emailUpdates.href}
          borderTop="1px solid rgb(54, 54, 54)"
          gridColumn="2 / span 1"
        >
          <Icon
            align="left"
            color="ui.white"
            name="decorativeEnvelope"
            size="large"
          />
          {upperNavLinks.emailUpdates.text}
        </Link>
        <Link
          href={upperNavLinks.shop.href}
          borderTop="1px solid rgb(54, 54, 54)"
          gridColumn="1 / span 2"
        >
          <Icon
            align="left"
            color="ui.white"
            name="decorativeShoppingBag"
            size="large"
          />
          {upperNavLinks.shop.text} NYPL
        </Link>
        <Link href={upperNavLinks.donate.href} gridColumn="1 / span 2">
          {upperNavLinks.donate.text.toUpperCase()}
        </Link>
      </SimpleGrid>
    </Box>
  );
});

export default HeaderMobileNav;
