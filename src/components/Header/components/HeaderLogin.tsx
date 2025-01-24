import React, { useContext } from "react";
import { chakra, useMultiStyleConfig, VStack } from "@chakra-ui/react";

import { getLoginLinks } from "../utils/headerUtils";
import { HeaderContext } from "../context/headerContext";
import List from "../../List/List";
import Link from "../../Link/Link";
import { Icon } from "../../Icons/Icon";

export interface HeaderLoginProps {
  catalogRef?: React.RefObject<HTMLDivElement & HTMLAnchorElement>;
  isMobile?: boolean;
}

/**
 * The content of the login dropdown menu. Initially, this renders links to log
 * in and log out. When the patron is logged in, it will also display the patron's
 * name, links to the catalogs, and a log out link.
 */
const HeaderLogin = chakra(({ catalogRef, isMobile }: HeaderLoginProps) => {
  const { isProduction } = useContext(HeaderContext);
  const { catalogLink, researchLink } = getLoginLinks("", isProduction);
  const styles = useMultiStyleConfig("HeaderLogin", {
    patronName: "",
  });

  return (
    <VStack __css={styles}>
      <List
        listItems={[
          <Link
            href={catalogLink}
            key="logInCatalog"
            ref={catalogRef}
            type="button"
          >
            <Icon
              align="left"
              color="ui.white"
              name="actionIdentity"
              size={isMobile ? "xlarge" : "large"}
              title="Go to the Catalog"
              sx={isMobile ? { height: "1.6rem", width: "1.6rem" } : {}}
            />
            <span>Go To The Catalog</span>
          </Link>,
          <Link href={researchLink} key="logInResearch" type="button">
            <Icon
              align="left"
              color="ui.white"
              name="building"
              size={isMobile ? "xlarge" : "medium"}
              title="Go to the Research Catalog"
              sx={isMobile ? {} : { width: "1.6rem", height: "1.6rem" }}
            />
            <span>Go To The Research Catalog</span>
          </Link>,
        ]}
        noStyling
        type="ul"
      />
    </VStack>
  );
});

export default HeaderLogin;
