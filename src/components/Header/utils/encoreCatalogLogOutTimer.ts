import Cookies from "js-cookie";

// QA url is "https://dev-login.nypl.org/auth/logout?redirect_uri="
export const catalogLogOutURL =
  "https:/login.nypl.org/auth/logout?redirect_uri=";
// Expiration time is 30 minutes set in milliseconds.
export const patLoggedInCookieExpiredTime = 1800000;

function EncoreCatalogLogOutTimer(
  currentTime = Date.now(),
  isTestMode = false
) {
  /**
   * If the patron is not logged in, forcibly log the patron out by deleting
   * the "nyplIdentityPatron" cookie and the "VALID_DOMAIN_LAST_VISITED" cookie.
   */
  this.removeLoggedInCookie = () => {
    const isLoggedIn = Cookies.get("PAT_LOGGED_IN");

    if (!isLoggedIn) {
      // The cookie "PAT_LOGGED_IN" does not exist, delete the
      // "nyplIdentityPatron" cookie to log the patron out.
      if (Cookies.get("nyplIdentityPatron")) {
        Cookies.remove("nyplIdentityPatron");
      }

      // Delete cookie "VALID_DOMAIN_LAST_VISITED" which holds the last time
      // the patron visited the valid domain.
      if (Cookies.get("VALID_DOMAIN_LAST_VISITED")) {
        Cookies.remove("VALID_DOMAIN_LAST_VISITED");
      }
    }
  };

  /**
   * This method is to set a timer to delete related cookies and completely log
   * out a patron from Encore after its expiration time. This is to keep the
   * logged in status consistent with the Encore server so the patrons don’t
   * have to log in when they are using non-account-required operations
   * such as searching items. Unfortunately, the patron will also be logged out
   * from Catalog, so we have to keep tracking the patrons' activites on
   * Catalog as well. Test Classic Catalog is used for QA.
   * The default expiration time is 30 mins.
   */
  this.setEncoreLoggedInTimer = (currentLocationHost) => {
    const domainsForExtendingLogIn = [
      // the domain of Encore's pages
      "browse.nypl.org",
      // the domain of Research Catalog's pages
      // Should this now be "www.nypl.org" since the new catalog is
      // https://www.nypl.org/research/research-catalog/ ??
      "catalog.nypl.org",
      // the domain of Test Research Catalog's pages
      "nypl-sierra-test.nypl.org",
      // new domain
      "borrow.nypl.org",
    ];
    const isOnValidDomain = domainsForExtendingLogIn.some(
      (domain) => domain === currentLocationHost
    );
    const isLoggedIn = Cookies.get("PAT_LOGGED_IN");

    this.removeLoggedInCookie();

    if (isLoggedIn) {
      // Update the "VALID_DOMAIN_LAST_VISITED" cookie in two scenarios:
      //  1. The patron is on a Sierra (Encore) hosted page, actively
      //     refresh their session.
      //  2. The "VALID_DOMAIN_LAST_VISITED" cookie doesn't exist, which will
      //     only happen if the patron logged in through a redirect, without
      //     running JS on a "valid domain".
      if (isOnValidDomain || !Cookies.get("VALID_DOMAIN_LAST_VISITED")) {
        Cookies.set("VALID_DOMAIN_LAST_VISITED", currentTime);
        this.logOutFromEncoreAndCatalogIn(patLoggedInCookieExpiredTime);
      } else {
        // The time in ms since the patron has been on the valid domain.
        const lastVisitedValidDomainTime = Cookies.get(
          "VALID_DOMAIN_LAST_VISITED"
        );
        const timeUntilLogOut = lastVisitedValidDomainTime
          ? patLoggedInCookieExpiredTime -
            (currentTime - lastVisitedValidDomainTime)
          : undefined;

        this.logOutFromEncoreAndCatalogIn(timeUntilLogOut);
      }
    }
  };

  /**
   * The timer to delete logged in related cookies and call the method to
   * completely log out from Encore and Catalog.
   */
  this.logOutFromEncoreAndCatalogIn = (time: number) => {
    let timeUntilLogOut = time > 0 ? time : 0;

    // When in test mode, set the timeout no longer than a second.
    if (isTestMode && timeUntilLogOut > 8000) {
      timeUntilLogOut = 1000;
    }

    setTimeout(() => {
      Cookies.remove("PAT_LOGGED_IN");
      Cookies.remove("VALID_DOMAIN_LAST_VISITED");
      Cookies.remove("nyplIdentityPatron");

      this.loadLogOutIframe(isTestMode);
    }, timeUntilLogOut);
  };

  /**
   * The function that loads and inserts a temporary `iframe` element into the
   * body of the current page. The `iframe` has the log out endpoint to
   * completely log out the patron from Encore and Catalog. The `iframe`
   * element is then removed.
   *
   * This is the preferred method to log out from Encore and Catalog because it
   * allows us to load the logout endpoint to bypass the CORS issue caused by
   * loading this endpoint from the client. III does not provide a real log out
   * API URI.
   */
  this.loadLogOutIframe = (isTestMode = false) => {
    const logoutIframe = document.createElement("iframe");
    const [body] = document.getElementsByTagName("body") as any;
    const iframeExistingTime = 10000;

    // Set the `iframe`'s src to the endpoint URL for logging out from Encore.
    logoutIframe.setAttribute("src", catalogLogOutURL);
    // Assign an ID for CSS usage.
    logoutIframe.setAttribute("id", "logoutIframe");
    logoutIframe.style.display = "none";

    body.appendChild(logoutIframe);

    // Remove the `iframe` after the timeout but keep it in the test mode.
    if (!isTestMode) {
      setTimeout(() => {
        body.removeChild(logoutIframe);
      }, iframeExistingTime);
    }
  };
}

export default EncoreCatalogLogOutTimer;
