// This is based on the Refinery API endpoint response.
const getApiResponse = (
  startDate = "2022-03-14T00:00:00-04:00",
  endDate = "2030-12-31T23:59:00-05:00"
) => ({
  data: [
    {
      attributes: {
        "alert-text": {
          en: {
            text: '<p>Masks are encouraged at all NYPL locations. <a href="https://nypl.org/reopening" rel="nofollow">Learn more and find information about our hours and services.</a></p>\n',
            type: "text-single",
          },
          type: "text-group",
        },
        "closed-reason": {
          en: {
            text: '<p>Masks are encouraged at all NYPL locations. <a href="https://nypl.org/reopening" rel="nofollow">Learn more and find information about our hours and services.</a></p>\n',
            type: "text-single",
          },
          type: "text-group",
        },
        "closing-date-end": null,
        "closing-date-start": null,
        "date-created": null,
        "date-modified": null,
        "display-date-end": endDate,
        "display-date-start": startDate,
        extended: null,
        locations: null,
        scope: "all",
        uri: { type: "uri", "full-uri": "", description: "" },
        uuid: null,
      },
      id: "966",
      links: {
        self: "https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts/966",
      },
      type: "alert",
    },
  ],
  jsonapi: { version: "1.0" },
  links: {
    self: "https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts",
  },
  meta: { count: 1 },
});
export const refineryResponse = getApiResponse();
export const expiredAlertsReponse = getApiResponse(
  "2020-03-14T00:00:00-04:00",
  "2020-12-31T23:59:00-05:00"
);
