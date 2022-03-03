import { NotificationTypes } from "../../components/Notification/NotificationTypes";

const Notification = {
  parts: ["container", "dismissibleButton", "icon"],
  baseStyle: ({ centered, dismissible, noMargin, notificationType }) => {
    let bg = "ui.status.primary";
    if (
      notificationType === NotificationTypes.Announcement ||
      notificationType === NotificationTypes.Warning
    ) {
      bg = "ui.gray.x-light-cool";
    }
    return {
      bg,
      display: "flex",
      fontSize: "-1", // slightly smaller than the default size
      position: "relative",
      textAlign: centered ? "center" : null,
      borderRadius: noMargin ? "0" : "4px",
      margin: noMargin ? "0" : "s",
      container: {
        margin: "auto",
        maxWidth: "var(--nypl-breakpoint-xl)",
        padding: "s",
        paddingRight: dismissible ? "l" : null,
        paddingLeft: centered && dismissible ? "l" : null,
        width: "100%",
      },
      dismissibleButton: {
        border: "none",
        bgColor: "inherit",
        alignItems: "center",
        color: "ui.black",
        display: "flex",
        height: "32px",
        width: "32px",
        minWidth: "0",
        position: "absolute",
        right: "0",
        top: "0",
        _hover: {
          bg: "inherit",
        },
      },
      icon: {
        flexShrink: "0",
        marginRight: "s",
      },
    };
  },
};

const NotificationContent = {
  parts: ["content"],
  baseStyle: ({ alignText, icon, notificationType }) => ({
    display: "flex",
    justifyContent: "center",
    content: {
      color:
        notificationType === NotificationTypes.Warning
          ? "brand.primary"
          : "currentColor",
      marginTop: icon ? "xxxs" : "0",
      paddingLeft: alignText
        ? "calc(var(--nypl-space-m) + var(--nypl-space-s))"
        : null,
      width: "100%",
      // Links should always be black and underlined.
      a: {
        color: "ui.black",
        _hover: {
          color: "ui.black",
        },
      },
    },
  }),
};

const NotificationHeading = {
  parts: ["heading"],
  baseStyle: ({ centered, icon, notificationType }) => {
    let color = "ui.black";
    if (notificationType === NotificationTypes.Announcement) {
      color = "section.research.secondary";
    } else if (notificationType === NotificationTypes.Warning) {
      color = "brand.primary";
    }
    return {
      display: "flex",
      marginBottom: "xxs",
      justifyContent: centered ? "center" : null,
      heading: {
        marginBottom: "0",
        marginTop: icon ? "xxxs" : "0",
        color,
      },
    };
  },
};

export default {
  Notification,
  NotificationContent,
  NotificationHeading,
};
