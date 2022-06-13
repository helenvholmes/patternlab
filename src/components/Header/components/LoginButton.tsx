import React, { useEffect, useRef } from "react";
import {
  Box,
  chakra,
  useMultiStyleConfig,
  useOutsideClick,
} from "@chakra-ui/react";
import FocusLock from "@chakra-ui/focus-lock";

import Button from "../../Button/Button";
import Icon from "../../Icons/Icon";
import Login from "./Login";
import { LoginProps } from "./UpperNav";

const LoginButton = chakra(
  ({
    isMobile,
    isLoginOpen = false,
    patronName,
    setIsLoginOpen,
  }: LoginProps) => {
    const desktopIcon = isLoginOpen ? "close" : "arrow";
    const mobileIcon = isLoginOpen
      ? "close"
      : patronName
      ? "utilityAccountFilled"
      : "utilityAccountUnfilled";
    const desktopButtonLabel = isLoginOpen
      ? "Close"
      : patronName
      ? "My Account"
      : "Log In";
    const greetingRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const styles = useMultiStyleConfig("HeaderLoginButton", {
      isMobile,
      isLoginOpen,
    });

    useEffect(() => {
      if (patronName && isLoginOpen) {
        greetingRef.current.focus();
      }
    }, [isLoginOpen, patronName]);

    useOutsideClick({
      ref,
      handler: () => setIsLoginOpen(false),
    });

    return (
      <Box ref={ref}>
        <FocusLock isDisabled={!isLoginOpen}>
          <Button
            aria-label={desktopButtonLabel}
            buttonType="link"
            id="loginButton"
            onClick={() => setIsLoginOpen(!isLoginOpen)}
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
          {isLoginOpen && (
            <Login
              greetingRef={greetingRef}
              isMobile={isMobile}
              patronName={patronName}
            />
          )}
        </FocusLock>
      </Box>
    );
  }
);

export default LoginButton;
