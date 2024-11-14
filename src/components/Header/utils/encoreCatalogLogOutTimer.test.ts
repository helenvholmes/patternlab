import Cookies from "js-cookie";

import EncoreCatalogLogOutTimer, {
  catalogLogOutURL,
  patLoggedInCookieExpiredTime,
} from "./encoreCatalogLogOutTimer";

describe("EncoreCatalogLogOutTimer", () => {
  const validCatalogDomain = "borrow.nypl.org";
  const validResearchCatalogDomain = "catalog.nypl.org";
  const invalidDomain = "google.com";
  // Mocks Date.now().
  const mockCurrentTime = 1657130297653;
  const isTestMode = true;
  let encoreCatalogLogOutTimer;
  let realDate;

  beforeAll(() => {
    realDate = Date;
    (global as any).Date = class extends Date {
      // Mock the Date.now() call with a random, but always the same, time.
      now() {
        return mockCurrentTime;
      }
      // Mock the Date.toUTCString() call. Called in `Cookies.remove`.
      toUTCString() {
        return "Tue, 01 Jan 2020 00:00:00 GMT";
      }
    };
    encoreCatalogLogOutTimer = new EncoreCatalogLogOutTimer(
      mockCurrentTime,
      isTestMode
    );
  });

  afterAll(() => {
    // Restore the `Date` class.
    (global as any).Date = realDate;
  });

  describe("removeLoggedInCookie()", () => {
    it("should delete the `nyplIdentityPatron` and `VALID_DOMAIN_LAST_VISITED` cookies if `PAT_LOGGED_IN` does not exist", () => {
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie does not exist.
        .mockReturnValueOnce(null)
        // The "nyplIdentityPatron" cookie mock value.
        .mockReturnValueOnce("someIdentityValue")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValueOnce(1000);
      const cookiesRemove = jest.spyOn(Cookies, "remove");

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.removeLoggedInCookie();

      // `removeLoggedInCookie` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenCalledWith("PAT_LOGGED_IN");

      // Since the "PAT_LOGGED_IN" cookie does not exist, it will attempt to
      // delete the "nyplIdentityPatron" and "VALID_DOMAIN_LAST_VISITED" cookies.
      expect(cookiesGet).toHaveBeenCalledWith("nyplIdentityPatron");
      expect(cookiesRemove).toHaveBeenCalledWith("nyplIdentityPatron");
      expect(cookiesGet).toHaveBeenCalledWith("VALID_DOMAIN_LAST_VISITED");
      expect(cookiesRemove).toHaveBeenCalledWith("VALID_DOMAIN_LAST_VISITED");

      jest.clearAllMocks();
    });
  });

  describe("The `PAT_LOGGED_IN` cookie does not exist", () => {
    it("should delete the `nyplIdentityPatron` and `VALID_DOMAIN_LAST_VISITED` cookies", () => {
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie does not exist.
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)
        // The "nyplIdentityPatron" cookie mock value.
        .mockReturnValueOnce("someIdentityValue")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValueOnce(1000);
      const cookiesRemove = jest.spyOn(Cookies, "remove");
      const logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(validCatalogDomain);

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenCalledWith("PAT_LOGGED_IN");

      // Since the "PAT_LOGGED_IN" cookie does not exist, it will attempt to
      // delete the "nyplIdentityPatron" and "VALID_DOMAIN_LAST_VISITED" cookies.
      expect(cookiesGet).toHaveBeenCalledWith("nyplIdentityPatron");
      expect(cookiesRemove).toHaveBeenCalledWith("nyplIdentityPatron");
      expect(cookiesGet).toHaveBeenCalledWith("VALID_DOMAIN_LAST_VISITED");
      expect(cookiesRemove).toHaveBeenCalledWith("VALID_DOMAIN_LAST_VISITED");

      // The actual logged out method `logOutFromEncoreAndCatalogIn`
      // is not called in this case.
      expect(logOutFromEncoreAndCatalogIn).not.toHaveBeenCalled();

      jest.clearAllMocks();
    });
  });

  describe("The `PAT_LOGGED_IN` cookie exists when visiting on Encore's domain", () => {
    let cookiesGet;
    let cookiesSet;
    // let cookiesRemove;
    let logOutFromEncoreAndCatalogIn;

    beforeEach(() => {
      cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!");
      cookiesSet = jest.spyOn(Cookies, "set");
      // cookiesRemove = jest.spyOn(Cookies, "remove");
      logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(validCatalogDomain);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should set the `VALID_DOMAIN_LAST_VISITED` cookie", () => {
      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");
      expect(cookiesSet).toHaveBeenCalledWith(
        "VALID_DOMAIN_LAST_VISITED",
        mockCurrentTime
      );
    });

    it("should call the `logOutFromEncoreAndCatalogIn` with 30 minutes timeout time", () => {
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalledWith(
        // This is 30 minutes set as 1800000 ms.
        patLoggedInCookieExpiredTime
      );
    });
  });

  describe("The `PAT_LOGGED_IN` cookie exists when visiting on Catalog's domain", () => {
    let cookiesGet;
    let cookiesSet;
    let logOutFromEncoreAndCatalogIn;

    beforeEach(() => {
      cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!");
      cookiesSet = jest.spyOn(Cookies, "set");
      logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(
        validResearchCatalogDomain
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should set the `VALID_DOMAIN_LAST_VISITED` cookie", () => {
      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");
      expect(cookiesSet).toHaveBeenCalledWith(
        "VALID_DOMAIN_LAST_VISITED",
        mockCurrentTime
      );
    });

    it("should call the `logOutFromEncoreAndCatalogIn` with 30 minutes timeout time", () => {
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalledWith(
        // This is 30 minutes set as 1800000 ms.
        patLoggedInCookieExpiredTime
      );
    });
  });

  describe("The `PAT_LOGGED_IN` cookie exists when visiting an 'invalid' domain", () => {
    it("should reset timer to the remaining time before `PAT_LOGGED_IN` is expired", () => {
      const mockedLastVisitTime = 10000;
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!")
        .mockReturnValueOnce("loggedIn!")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        // This gets called twice.
        .mockReturnValue(mockedLastVisitTime);
      const cookiesSet = jest.spyOn(Cookies, "set");
      const logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(invalidDomain);

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");

      // It then checks for the "VALID_DOMAIN_LAST_VISITED" cookie twice.
      expect(cookiesGet).toHaveBeenNthCalledWith(
        3,
        "VALID_DOMAIN_LAST_VISITED"
      );
      expect(cookiesGet).toHaveBeenNthCalledWith(
        4,
        "VALID_DOMAIN_LAST_VISITED"
      );

      // No cookies are set.
      expect(cookiesSet).not.toHaveBeenCalled();

      // The `logOutFromEncoreAndCatalogIn` method is called with a
      // new timeout time.
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalledWith(
        patLoggedInCookieExpiredTime - (mockCurrentTime - mockedLastVisitTime)
      );

      jest.clearAllMocks();
    });
  });

  describe("The `PAT_LOGGED_IN` cookie exists but `VALID_DOMAIN_LAST_VISITED` does not when visiting an 'invalid' domain", () => {
    it("should set VALID_DOMAIN_LAST_VISITED and set EncoreLoggedInTimer to the full default time", () => {
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!")
        .mockReturnValueOnce("loggedIn!")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValue(null);
      const cookiesSet = jest.spyOn(Cookies, "set");
      const logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(invalidDomain);

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");

      // It then checks for the "VALID_DOMAIN_LAST_VISITED" cookie and
      // there is no value.
      expect(cookiesGet).toHaveBeenNthCalledWith(
        3,
        "VALID_DOMAIN_LAST_VISITED"
      );

      expect(cookiesSet).toHaveBeenCalledWith(
        "VALID_DOMAIN_LAST_VISITED",
        mockCurrentTime
      );

      // The `logOutFromEncoreAndCatalogIn` method is called with
      // the default timeout time.
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalledWith(
        patLoggedInCookieExpiredTime
      );

      jest.clearAllMocks();
    });
  });

  // Specific tests for the `logOutFromEncoreAndCatalogIn` function.
  describe("logOutFromEncoreAndCatalogIn", () => {
    it("should not yet delete cookies if the timeout time has not been reached", () => {
      // Mock that 170000 milliseconds have passed.
      const mockLastVisitedTime = mockCurrentTime - 170000;
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!")
        .mockReturnValueOnce("loggedIn!")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValue(mockLastVisitedTime);
      const cookiesRemove = jest.spyOn(Cookies, "remove");
      const logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );
      const loadLogOutIframe = jest.spyOn(
        encoreCatalogLogOutTimer,
        "loadLogOutIframe"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(invalidDomain);

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");

      // The `logOutFromEncoreAndCatalogIn` method is called. This function
      // deletes the cookies when the timeout has been reached.
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalled();
      // But in this case the timeout has not been reached.
      expect(cookiesRemove).not.toHaveBeenCalledWith("PAT_LOGGED_IN");
      expect(cookiesRemove).not.toHaveBeenCalledWith(
        "VALID_DOMAIN_LAST_VISITED"
      );
      expect(loadLogOutIframe).not.toHaveBeenCalledWith("nyplIdentityPatron");
      // The iframe is not loaded.
      expect(loadLogOutIframe).not.toHaveBeenCalled();

      jest.clearAllMocks();
    });

    it("should delete cookies if the timeout time has been reached", () => {
      // The cookies are deleted in a setTimeout function inside of
      // the `logOutFromEncoreAndCatalogIn` method.
      jest.useFakeTimers();

      // Mock that 2000000 milliseconds have passed.
      const mockLastVisitedTime = mockCurrentTime - 2000000;
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValue(mockLastVisitedTime);
      const cookiesRemove = jest.spyOn(Cookies, "remove");
      const logOutFromEncoreAndCatalogIn = jest.spyOn(
        encoreCatalogLogOutTimer,
        "logOutFromEncoreAndCatalogIn"
      );
      const loadLogOutIframe = jest.spyOn(
        encoreCatalogLogOutTimer,
        "loadLogOutIframe"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(invalidDomain);
      jest.runAllTimers();

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");

      // The `logOutFromEncoreAndCatalogIn` method is called. This function
      // deletes the cookies when the timeout has been reached.
      expect(logOutFromEncoreAndCatalogIn).toHaveBeenCalled();
      // But in this case the timeout has not been reached.
      expect(cookiesRemove).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");
      expect(cookiesRemove).toHaveBeenNthCalledWith(
        2,
        "VALID_DOMAIN_LAST_VISITED"
      );
      expect(cookiesRemove).toHaveBeenNthCalledWith(3, "nyplIdentityPatron");
      // The iframe is not loaded.
      expect(loadLogOutIframe).toHaveBeenCalled();

      // Clear all the jest mocks.
      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  // Specific tests for the `loadLogOutIframe` function.
  // This is currently broken in production.
  describe.skip("loadLogOutIframe", () => {
    it("should load the iframe with the Encore logout URL", () => {
      jest.useFakeTimers();

      // Mock that 2000000 milliseconds have passed.
      const mockLastVisitedTime = mockCurrentTime - 2000000;
      const cookiesGet = jest
        .spyOn(Cookies, "get")
        // The "PAT_LOGGED_IN" cookie exists.
        .mockReturnValueOnce("loggedIn!")
        // The "VALID_DOMAIN_LAST_VISITED" cookie mock value.
        .mockReturnValue(mockLastVisitedTime);
      const loadLogOutIframe = jest.spyOn(
        encoreCatalogLogOutTimer,
        "loadLogOutIframe"
      );

      // Start the timer on a valid domain.
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(invalidDomain);
      jest.runAllTimers();

      // `setEncoreLoggedInTimer` checks for the "PAT_LOGGED_IN" cookie first.
      expect(cookiesGet).toHaveBeenNthCalledWith(1, "PAT_LOGGED_IN");

      // The iframe functino is called.
      expect(loadLogOutIframe).toHaveBeenCalled();

      const iframe = document.querySelector("iframe");

      // The iframe is loaded on the DOM.
      // For test purposes, it is not removed from the DOM.
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", catalogLogOutURL);

      // Clear all the jest mocks.
      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });
});
