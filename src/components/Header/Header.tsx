import {
  chakra,
  Box,
  HStack,
  Spacer,
  useColorModeValue,
  useMediaQuery,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

/** Internal Header-only components */
import HeaderLowerNav from "./components/HeaderLowerNav";
import HeaderMobileIconNav from "./components/HeaderMobileIconNav";
import HeaderSitewideAlerts from "./components/HeaderSitewideAlerts";
import HeaderUpperNav from "./components/HeaderUpperNav";
/** Internal Header-only utils */
import { HeaderProvider } from "./context/headerContext";
import EncoreCatalogLogOutTimer from "./utils/encoreCatalogLogOutTimer";

import useNYPLBreakpoints from "../../hooks/useNYPLBreakpoints";
import SkipNavigation from "../SkipNavigation/SkipNavigation";
import Link from "../Link/Link";
import Logo from "../Logo/Logo";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
import { headerBreakpoints } from "../../theme/foundations/breakpoints";

export interface HeaderProps {
  /** Whether to render sitewide alerts or not. True by default. */
  fetchSitewideAlerts?: boolean;
  /** Whether or not the `Header` is in production mode. True by default. */
  isProduction?: boolean;
}

/**
 * The NYPL `Header` component is the top-level component of the site. It
 * contains features for logging in, logging out, searching, and navigating
 * the NYPL.org site.
 */
export const Header = chakra(
  ({ fetchSitewideAlerts = true, isProduction = true }: HeaderProps) => {
    // isLargerThanLarge is greater than 960px
    const { isLargerThanLarge } = useNYPLBreakpoints();
    // The Header's "mobile" is 832px and below.
    const [isLargerThanMobile] = useMediaQuery([
      `(min-width: ${headerBreakpoints.mh})`,
    ]);

    const styles = useMultiStyleConfig("Header", {});
    // Create a new instance of the EncoreCatalogLogOutTimer. The timer will
    // start when the component is mounted. Even though the patron's information
    // is no longer displayed in the header, we still want to make sure that
    // they are logged out in various NYPL sites.
    const encoreCatalogLogOutTimer = new EncoreCatalogLogOutTimer(
      Date.now(),
      false
    );

    // Once the `Header` component is mounted, start a timer that will
    // log the user out of Vega and the NYPL Catalog after 30 minutes.
    useEffect(() => {
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(window.location.host);
    });

    // We also want to delete a certain log in-related cookie but should
    // actively check and delete it every 3 seconds.
    useEffect(() => {
      const interval = setInterval(() => {
        encoreCatalogLogOutTimer.removeLoggedInCookie();
      }, 3000);
      return () => clearInterval(interval);
    });

    return (
      <HeaderProvider isProduction={isProduction}>
        <Box
          __css={{
            ...styles,
            // For Vega override, this is the browser's default.
            "& > nav li": { marginBottom: "0 !important" },
            "& svg": { verticalAlign: "baseline !important" },
            "& fieldset": {
              marginBottom: "0px !important",
            },
            "& input": {
              marginBottom: "0px !important",
            },
          }}
        >
          <SkipNavigation />
          {fetchSitewideAlerts ? <HeaderSitewideAlerts /> : null}
          <header>
            <HStack __css={styles.container}>
              <Link
                aria-label="The New York Public Library"
                href="https://nypl.org"
                __css={styles.logo}
              >
                <Logo
                  aria-label="NYPL Header Logo"
                  name={
                    !isLargerThanLarge
                      ? useColorModeValue("nyplLionBlack", "nyplLionWhite")
                      : useColorModeValue("nyplFullBlack", "nyplFullWhite")
                  }
                  size={!isLargerThanMobile ? "small" : "large"}
                  title="NYPL Header Logo"
                />
              </Link>
              <Spacer />
              {!isLargerThanMobile ? (
                <HeaderMobileIconNav />
              ) : (
                <VStack alignItems="end" sx={styles.navContainer}>
                  <HeaderUpperNav />
                  <HeaderLowerNav />
                </VStack>
              )}
            </HStack>
            <HorizontalRule __css={styles.horizontalRule} />
          </header>
        </Box>
      </HeaderProvider>
    );
  }
);

export default Header;
