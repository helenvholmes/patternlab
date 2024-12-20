import { useEffect, useRef, useState } from "react";
import { Box, chakra, FocusLock, useStyleConfig } from "@chakra-ui/react";

import HeaderLogin from "./HeaderLogin";
import useCloseDropDown from "../../../hooks/useCloseDropDown";
import Button from "../../Button/Button";
import Icon from "../../Icons/Icon";

export interface HeaderLoginButtonProps {
  isMobile?: boolean;
}

/**
 * This is the button that will render the login menu when it is clicked
 * and keep focus trapped within the menu. Its display text will be "Log In"
 * when the user is not logged in and "My Account" when the user is logged in.
 */
const HeaderLoginButton = chakra(
  ({ isMobile = false }: HeaderLoginButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const catalogRef = useRef<HTMLDivElement & HTMLAnchorElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const styles = useStyleConfig("HeaderLoginButton", {
      isOpen,
    });
    const desktopIcon = isOpen ? "close" : "arrow";
    const mobileIcon = isOpen ? "close" : "actionIdentityFilled";
    const desktopButtonLabel = isOpen ? "Close" : "My Account";

    useCloseDropDown(setIsOpen, wrapperRef);

    useEffect(() => {
      if (isOpen) {
        catalogRef.current.focus();
      }
    }, [isOpen]);

    return (
      <Box ref={wrapperRef} position={{ mh: "relative" }}>
        <FocusLock isDisabled={!isOpen}>
          <Button
            aria-label={desktopButtonLabel}
            buttonType="text"
            id="loginButton"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            __css={{
              ...styles,
              border: "none !important",
              letterSpacing: 0,
              px: "xs",
              py: "0",
            }}
          >
            {isMobile ? null : desktopButtonLabel}
            <Icon
              align="right"
              name={isMobile ? mobileIcon : desktopIcon}
              size={isMobile ? "large" : "small"}
              title="Log in to your account"
            />
          </Button>
          {isOpen && (
            <HeaderLogin catalogRef={catalogRef} isMobile={isMobile} />
          )}
        </FocusLock>
      </Box>
    );
  }
);

export default HeaderLoginButton;
