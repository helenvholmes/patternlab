import { chakra } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import List from "../../List/List";
import Notification from "../../Notification/Notification";
import { Alert, alertsApiUrl, parseAlertsData } from "../headerUtils";

/**
 * The SitewideAlerts component makes an API request to an NYPL API endpoint
 * to fetch NYPL sitewide alerts. While this component can be used in
 * isolation, it is already rendered in the DS Header component.
 */
export const SitewideAlerts = chakra(() => {
  const fetchErrorMessage =
    "NYPL Reservoir SitewideAlerts: There was an error fetching NYPL sitewide alerts.";
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Make a request to the NYPL API endpoint for sitewide alerts, parse
  // the data, and set it to the local state.
  useEffect(() => {
    fetch(alertsApiUrl)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(fetchErrorMessage);
        }
      })
      .then((data) => {
        const parsedData: Alert[] = parseAlertsData(data);
        setAlerts(parsedData);
      })
      .catch((_error) => {
        // Override any error message with our own.
        console.warn(fetchErrorMessage);
      });
  }, []);

  // Great, we have NYPL alerts data. Each alert is rendered as a list
  // item in an unordered list. Note that the alert description may
  // contain HTML which is rendered as-is.
  const getAlertsElems = (data: Alert[]) => {
    return (
      <List
        noStyling
        type="ul"
        __css={{
          marginBottom: "0",
          // Target any anchor and paragraph HTML passed in from
          // the API response in `alert.description`.
          a: {
            textDecoration: "underline",
          },
          p: {
            marginBottom: "0",
          },
        }}
      >
        {data.map((alert: Alert) => (
          <li
            key={alert.id}
            dangerouslySetInnerHTML={{ __html: alert.description }}
          />
        ))}
      </List>
    );
  };

  return alerts.length > 0 ? (
    <Notification
      aria-label="Sitewide alerts"
      id="above-SitewideAlerts-notification"
      isCentered
      noMargin
      notificationContent={getAlertsElems(alerts)}
      showIcon={false}
    />
  ) : null;
});

export default SitewideAlerts;
