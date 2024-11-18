/*eslint no-useless-escape: 0 */
import Cookies from "js-cookie";

export interface Alert {
  id: string;
  link: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const alertsApiUrl =
  "https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all";
const authServerBase = {
  production: "https://login.nypl.org/auth",
  development: "https://dev-login.nypl.org/auth",
};
const baseLoginLinks = {
  catalog: {
    production: "https://borrow.nypl.org/?openAccount=checkouts",
    // no dev env yet
    development: "https://borrow.nypl.org/?openAccount=checkouts",
  },
  research: {
    production: "https://catalog.nypl.org/patroninfo/top",
    development: "https://nypl-sierra-test.nypl.org/patroninfo/top",
  },
};
// Return the proper links when logged in or not. These are for the NYPL
// "Log in" or "Go to" links for the Catalog and the Research Catalog. This is
// based on the environment and logged in status.
export const getLoginLinks = (patronName = "", isProduction = true) => {
  const type = isProduction ? "production" : "development";
  const authServerDomain = authServerBase[type];
  const baseCatalogLink = baseLoginLinks.catalog[type];
  const baseResearchLink = baseLoginLinks.research[type];

  return patronName
    ? {
        catalogLink: `${authServerDomain}/login?redirect_uri=${baseCatalogLink}`,
        researchLink: `${authServerDomain}/login?redirect_uri=${baseResearchLink}`,
        logOutLink: `${authServerDomain}/logout`,
      }
    : {
        catalogLink: baseCatalogLink,
        researchLink: baseResearchLink,
        logOutLink: "",
      };
};
export const upperNavLinks = {
  locations: {
    href: "https://www.nypl.org/locations",
    text: "Locations",
  },
  libraryCard: {
    href: "https://www.nypl.org/library-card/new",
    text: "Get A Library Card",
  },
  emailUpdates: {
    href: "https://pub.email.nypl.org/subscriptioncenter",
    text: "Get Email Updates",
  },
  donate: {
    href: "https://www.nypl.org/donate-button",
    text: "Donate",
  },
  shop: {
    href: "https://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_source=nypl.org&utm_medium=referral",
    text: "Shop",
  },
};
export const siteNavLinks = [
  {
    href: "https://www.nypl.org/books-music-movies",
    text: "Books/Music/Movies",
  },
  {
    href: "https://www.nypl.org/research",
    text: "Research",
  },
  {
    href: "https://www.nypl.org/education",
    text: "Education",
  },
  {
    href: "https://www.nypl.org/events",
    text: "Events",
  },
  {
    href: "https://www.nypl.org/connect",
    text: "Connect",
  },
  {
    href: "https://www.nypl.org/give",
    text: "Give",
  },
  {
    href: "https://www.nypl.org/get-help",
    text: "Get Help",
  },
];

/**
 * Generates the queries to be added to the URL of the search pages.
 */
const generateQueriesForTracking = () => {
  // the time stamp here is for the purpose of telling when this search query is made.
  const currentTimeStamp = new Date().getTime();
  return `searched_from=header_search&timestamp=${currentTimeStamp}`;
};

/**
 * Returns the final URL for the NYPL Catalog search.
 */
export const getCatalogURL = (searchValue) => {
  const encodedSearchInput = encodeURIComponent(searchValue);
  const rootUrl = "https://borrow.nypl.org/search";
  let finalUrl;

  if (encodedSearchInput) {
    finalUrl =
      `${rootUrl}?query=${encodedSearchInput}&searchType=everything&pageSize=10&` +
      generateQueriesForTracking() +
      `&lang=eng`;
    return finalUrl;
  }
  return null;
};

/**
 * Returns the final URL for the NYPL Research Catalog search.
 */
export const getResearchCatalogURL = (searchValue) => {
  const catalogUrl = "https://www.nypl.org/research/research-catalog/search?q=";

  if (searchValue) {
    return `${catalogUrl}${encodeURIComponent(
      searchValue
    )}&${generateQueriesForTracking()}&lang=eng`;
  }
  return null;
};

/**
 * Returns the final URL for the NYPL catalog search.
 */
export const getNYPLSearchURL = (searchString) => {
  const catalogUrl = "//www.nypl.org/search/";

  if (searchString) {
    return (
      catalogUrl +
      encodeURIComponent(searchString) +
      "?" +
      generateQueriesForTracking()
    );
  }
  return null;
};

/**
 * The `alertsApiUrl` fetches NYPL alerts from the Refinery API. This API
 * returns JSONAPI-formatted data. We could use a better JSONAPI parser, but
 * this is the only endpoint we will use that is JSONAPI. Eventually, this
 * endpoint will be replaced. This function parses the JSONAPI data in a very
 * naive and quick way to get the necessary alerts data. The data is then
 * filtered to include active alerts.
 */
export const parseAlertsData = (data: any): Alert[] => {
  const today = new Date();
  if (!data?.data.length) {
    return [];
  }
  // There is an assumption in the JSONAPI data that the description text will
  // be translated into many languages. Only the English description is
  // available so we will use that.
  const alerts = data.data.map((alert) => {
    return {
      id: alert?.id,
      link: alert.links?.self,
      description: alert?.attributes["alert-text"]?.en?.text,
      startDate: alert?.attributes["display-date-start"],
      endDate: alert?.attributes["display-date-end"],
    };
  });

  // Filter alerts based on their timestamps so they are rendered
  // appropriately, no "expired" alert should be rendered.
  const filteredAlerts = alerts.filter((alert) => {
    const startDate = new Date(alert.startDate);
    const endDate = new Date(alert.endDate);
    return (
      startDate.getTime() <= today.getTime() &&
      today.getTime() <= endDate.getTime()
    );
  });

  return filteredAlerts;
};

/**
 * getCookieValue uses the js.cookie package to get the value
 * of the "nyplIdentityPatron" cookie (if it exists) and extract
 * the cookie's `access_token`.
 */
export const getCookieValue = () => {
  const cookieValue = Cookies.get("nyplIdentityPatron");
  const accessToken = cookieValue ? JSON.parse(cookieValue).access_token : "";

  return { cookieValue, accessToken };
};

export const deleteCookieValue = () => {
  Cookies.remove("nyplIdentityPatron");
};
