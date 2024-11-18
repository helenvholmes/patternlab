import { Box, chakra, FocusLock, useStyleConfig } from "@chakra-ui/react";
import { useState, useRef } from "react";

import HeaderSearchForm from "./HeaderSearchForm";
import Button from "../../Button/Button";
import useCloseDropDown from "../../../hooks/useCloseDropDown";
import { Icon } from "../../Icons/Icon";

export interface HeaderSearchButtonProps {
  isMobile?: boolean;
}

/**
 * This is the button that will render the search form when it is clicked and
 * keep focus trapped within the menu.
 */
const HeaderSearchButton = chakra(
  ({ isMobile = false }: HeaderSearchButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const styles = useStyleConfig("HeaderSearchButton", { isOpen });
    const buttonText = isMobile ? null : isOpen ? "Close" : "Search";
    const labelText = isOpen ? "Close Search" : "Open Search";
    const ref = useRef<HTMLDivElement>(null);

    useCloseDropDown(setIsOpen, ref);

    return (
      <Box ref={ref}>
        <FocusLock isDisabled={!isOpen}>
          <Button
            aria-haspopup="true"
            aria-label={labelText}
            aria-expanded={isOpen ? true : null}
            buttonType="text"
            id="searchButton"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            __css={{
              ...styles,
              color: isOpen
                ? "var(--nypl-colors-ui-white) !important"
                : "ui.link.primary",
              border: "none !important",
              letterSpacing: 0,
              padding: "0px",
              paddingInlineEnd: "0px",
            }}
          >
            <span>
              {buttonText}
              <Icon
                align={isMobile ? "none" : "right"}
                name={isOpen ? "close" : "actionSearch"}
                size={isMobile ? "large" : "medium"}
                title={labelText}
              />
            </span>
          </Button>
          {isOpen && <HeaderSearchForm isMobile={isMobile} />}
        </FocusLock>
      </Box>
    );
  }
);

export default HeaderSearchButton;
