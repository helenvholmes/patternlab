import { Box, chakra, useMultiStyleConfig } from "@chakra-ui/react";
import { useState } from "react";

import {
  getCatalogURL,
  getNYPLSearchURL,
  getResearchCatalogURL,
} from "../utils/headerUtils";
import Form, { FormRow, FormField } from "../../Form/Form";
import Fieldset from "../../Fieldset/Fieldset";
import TextInput from "../../TextInput/TextInput";
import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import Button from "../../Button/Button";
import Icon from "../../Icons/Icon";
import RadioGroup from "../../RadioGroup/RadioGroup";
import Radio from "../../Radio/Radio";

export interface HeaderSearchFormProps {
  isMobile?: boolean;
}

export type SearchOptionType =
  | "circulatingCatalog"
  | "researchCatalog"
  | "website";

/**
 * Displays the search form for the Header's search interface. On mobile, two
 * buttons are displayed and on desktop, two radio inputs are displayed.
 */
const HeaderSearchForm = chakra(
  ({ isMobile = false }: HeaderSearchFormProps) => {
    const defaultSearchRadioValue: SearchOptionType = "circulatingCatalog";
    const [placeholder, setPlaceholder] = useState<string>(
      "What would you like to find?"
    );
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchOption, setSearchOption] = useState<SearchOptionType>(
      defaultSearchRadioValue
    );
    const styles = useMultiStyleConfig("HeaderSearchForm", { isMobile });

    const onSubmit = (e: any) => {
      e.preventDefault();
      let requestUrl;

      // If there is a search input, make the request.
      if (searchInput) {
        if (searchOption === "circulatingCatalog") {
          requestUrl = getCatalogURL(searchInput);
        }
        if (searchOption === "researchCatalog") {
          requestUrl = getResearchCatalogURL(searchInput);
        }
        if (searchOption === "website") {
          requestUrl = getNYPLSearchURL(searchInput);
        }

        window.location.assign(requestUrl);
        return true;
      }
      // Otherwise, don't do anything and update the placeholder message.
      setPlaceholder("Please enter a search term.");
      return false;
    };

    return (
      <Box __css={styles}>
        <Form
          id="search-header"
          gap="grid.m"
          onSubmit={onSubmit}
          __css={styles.form}
        >
          <FormRow>
            <FormField gridColumn="1 / 3">
              <Fieldset
                id="fieldset-search"
                isLegendHidden
                legendText="Enter a keyword, then choose to search either the catalog or the website"
              >
                <TextInput
                  id="searchInput"
                  isRequired
                  labelText="Enter Search Keyword"
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={placeholder}
                  showRequiredLabel={false}
                  value={searchInput}
                  __css={{
                    ...styles.textInput,
                    label: {
                      ...(styles.textInput as any)?.label,
                      marginBottom: { base: "s" },
                    },
                    input: {
                      ...(styles.textInput as any)?.input,
                      _placeholder: {
                        fontSize: { base: "18px", mh: "20px" },
                        fontStyle: "normal",
                      },
                    },
                  }}
                />
              </Fieldset>
            </FormField>
            <FormField gridColumn={{ base: "3", mh: "4" }}>
              <ButtonGroup>
                <Button
                  aria-label="Search"
                  buttonType="pill"
                  id="search-btn"
                  onClick={onSubmit}
                  __css={{ ...styles.searchBtn, padding: "1px 6px !important" }}
                >
                  <Icon name="search" size="large" />
                </Button>
              </ButtonGroup>
            </FormField>
          </FormRow>
          <FormRow>
            <FormField>
              <RadioGroup
                defaultValue="circulatingCatalog"
                id="search-type"
                labelText="Type of search"
                layout={isMobile ? "column" : "row"}
                name="catalogWebsiteSearch"
                onChange={(val: SearchOptionType) => setSearchOption(val)}
                showLabel={false}
                __css={{
                  label: {
                    marginBottom: "0",
                  },
                }}
              >
                <Radio
                  id="circulatingCatalogSearch"
                  labelText="Search books, music, and movies"
                  value="circulatingCatalog"
                  __css={styles.radio}
                />
                <Radio
                  id="researchcatalogSearch"
                  labelText="Search the Research Catalog"
                  value="researchCatalog"
                  __css={styles.radio}
                />
                <Radio
                  id="websiteSearch"
                  labelText="Search the library website"
                  value="website"
                  __css={styles.radio}
                />
              </RadioGroup>
            </FormField>
          </FormRow>
        </Form>
      </Box>
    );
  }
);

export default HeaderSearchForm;
