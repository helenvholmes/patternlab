import { Box, chakra, FocusLock, useStyleConfig } from "@chakra-ui/react";
// import {
//   Button,
//   Icon,
//   useCloseDropDown,
// } from "@nypl/design-system-react-components";
import { useState, useRef } from "react";

import HeaderMobileNav from "./HeaderMobileNav";
import useCloseDropDown from "../../../hooks/useCloseDropDown";
import Button from "../../Button/Button";
import Icon from "../../Icons/Icon";

/**
 * This is the button that will render the navigational list of links
 * when it is clicked and keep focus trapped within the menu.
 */
const HeaderMobileNavButton = chakra(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = useStyleConfig("HeaderMobileNavButton", { isOpen });
  const ref = useRef<HTMLDivElement>(null);

  useCloseDropDown(setIsOpen, ref);

  return (
    <Box ref={ref}>
      <FocusLock isDisabled={!isOpen}>
        <Button
          aria-haspopup="true"
          aria-label={isOpen ? "Close Navigation" : "Open Navigation"}
          aria-expanded={isOpen ? true : null}
          buttonType="text"
          id="mobileNav-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          __css={{ ...styles, padding: "1px 6px !important" }}
        >
          <Icon name={isOpen ? "close" : "utilityHamburger"} size="large" />
        </Button>
        {isOpen && <HeaderMobileNav />}
      </FocusLock>
    </Box>
  );
});

export default HeaderMobileNavButton;
