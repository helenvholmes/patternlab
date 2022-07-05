import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import FocusLock from "@chakra-ui/focus-lock";

import Button from "../../Button/Button";
import Icon from "../../Icons/Icon";
import Login from "./Login";
import { useCloseDropDown } from "../../../hooks/useCloseDropDown";
import { PatronContext } from "../context/patronContext";
import gaUtils from "../utils/googleAnalyticsUtils";

export interface LoginButtonProps {
  isMobile?: boolean;
}

const LoginButton = chakra(({ isMobile = false }: LoginButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const patronName = useContext(PatronContext);
  const catalogRef = useRef<HTMLAnchorElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const styles = useStyleConfig("HeaderLoginButton", {
    isOpen,
  });
  const desktopIcon = isOpen ? "close" : "arrow";
  const mobileIcon = isOpen
    ? "close"
    : patronName
    ? "utilityAccountFilled"
    : "utilityAccountUnfilled";
  const desktopButtonLabel = isOpen
    ? "Close"
    : patronName
    ? "My Account"
    : "Log In";
  const gaAction = isMobile ? "Click" : patronName ? "My Account" : "Log In";
  const gaLabelBase = isMobile
    ? patronName
      ? "clickMyAccount"
      : "clickLogIn"
    : `MyNyplButton - ${isOpen ? "Closed" : "Open"}`;
  const gaLabel = `${isMobile ? "Mobile " : ""}${gaLabelBase}`;

  useCloseDropDown(setIsOpen, wrapperRef);

  useEffect(() => {
    if (isOpen) {
      if (patronName) {
        greetingRef.current.focus();
      } else {
        catalogRef.current.focus();
      }
    }
  }, [isOpen, patronName]);

  return (
    <Box ref={wrapperRef}>
      <FocusLock isDisabled={!isOpen}>
        <Button
          aria-label={desktopButtonLabel}
          buttonType="link"
          id="loginButton"
          onClick={() => {
            gaUtils.trackEvent(gaAction, gaLabel);
            setIsOpen(!isOpen);
          }}
          __css={styles}
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
          <Login
            catalogRef={catalogRef}
            greetingRef={greetingRef}
            isMobile={isMobile}
            patronName={patronName}
          />
        )}
      </FocusLock>
    </Box>
  );
});

export default LoginButton;