// OH-31 Header with Search
import * as React from "react";
import SearchBar from "../../02-molecules/SearchBar/SearchBar";
import bem from "../../../utils/bem";
import RNSectionTitle from "../../01-atoms/Text/Headings/RNSectionTitle";


export interface RNHeaderWithSearchProps {
  modifiers?: [];
  searchBarId: string;
  searchButtonId: string;
  searchBarAriaLabel: string;
  dropdownId: string;
  sectionTitle: JSX.Element;
  textFieldAriaLabel: string;
  hasError?: boolean;
  // To make into jsx.element (eg: if error has link)
  // must first handle the placehodlerText=errorMessage in ResearchNow's Search Header
  errorMessage?: string;
  searchDropdownOptions: string[];
  advancedSearchElem: JSX.Element;
  selectChangeHandler: (event: React.FormEvent) => void;
  selectBlurHandler: (event: React.FormEvent) => void;
  searchSubmitHandler: (event: React.MouseEvent) => void;
  textChangeHandler?: (event: React.FormEvent) => void;
}

export default function RNHeaderWithSearch(props: React.PropsWithChildren<RNHeaderWithSearchProps>) {

  const { sectionTitle, searchBarId, searchBarAriaLabel,
    searchButtonId, hasError, errorMessage,
    dropdownId, searchDropdownOptions,
    textFieldAriaLabel, advancedSearchElem,
    selectChangeHandler, selectBlurHandler, searchSubmitHandler, textChangeHandler } = props;
  const base_class = "search-header";

  return (
    <div className={bem(base_class)}>
      <div className={bem("content", [], base_class)}>
        <RNSectionTitle>
          {sectionTitle}
        </RNSectionTitle>
        <SearchBar
          searchBarId={searchBarId}
          searchBarAriaLabel={searchBarAriaLabel}
          blockName={base_class}
          buttonId={searchButtonId}
          dropdownId={dropdownId}
          dropdownAriaLabel="Filter Search"
          textFieldAriaLabel={textFieldAriaLabel}
          dropdownOptions={searchDropdownOptions}
          helperVariant="ResearchNow"
          hasError={hasError}
          errorMessage={errorMessage}
          selectBlurHandler={selectBlurHandler}
          selectChangeHandler={selectChangeHandler}
          searchSubmitHandler={searchSubmitHandler}
          searchChangeHandler={textChangeHandler} />
        <div className={bem("promo-text", [], base_class)}>
          {React.cloneElement(advancedSearchElem, { modifiers: ["dark-background"] })}
        </div>
      </div>
    </div>
  );
}

