import React, { useState } from "react";

import bem from "../../utils/bem";
import Button from "../Button/Button";
import { ButtonTypes } from "../Button/ButtonTypes";
import Heading from "../Heading/Heading";
import { HeadingLevels } from "../Heading/HeadingTypes";
import Icon from "../Icons/Icon";
import { IconColors, IconNames, IconSizes } from "../Icons/IconTypes";
import { NotificationTypes } from "./NotificationTypes";

export interface NotificationProps {
  /** BlockName for use with BEM. See how to work with blockNames and BEM here: http://getbem.com/introduction/ */
  blockName?: string;
  /** Optional prop to control horizontal alignment of the `Notification` content */
  centered?: boolean;
  /** Optional `className` that appears in addition to "notification" */
  className?: string;
  /** Optional prop to control whether a `Notification` can be dismissed (closed) by a user */
  dismissible?: boolean;
  /** Optional custom `Icon` that will override the default `Icon` */
  icon?: React.ReactNode;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Optional prop to control the margin around the `Notification` component */
  noMargin?: boolean;
  /** Optional prop to control the coloring of notification text and the visibility of an applicable icon */
  notificationType?: NotificationTypes;
  /** Modifiers array for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
  modifiers?: string[];
}

// NotificationHeading child-component
export function NotificationHeading(props) {
  const { children, className } = props;
  return (
    <Heading
      level={HeadingLevels.Four}
      className={bem("notification-heading", [], "", [className])}
    >
      {children}
    </Heading>
  );
}

// NotificationContent child-component
export function NotificationContent(props) {
  const { children, className } = props;
  return (
    <div className={bem("notification-content", [], "", [className])}>
      {children}
    </div>
  );
}

export default function Notification(
  props: React.PropsWithChildren<NotificationProps>
) {
  const {
    blockName,
    centered,
    children,
    className,
    dismissible = false,
    noMargin = false,
    icon,
    id,
    modifiers = [],
    notificationType = "standard",
  } = props;

  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => setIsOpen(false);

  const baseClass = "notification";

  const notificationModifiers = modifiers ? modifiers : [];

  notificationModifiers.push(notificationType);

  if (centered) notificationModifiers.push("centered");

  if (noMargin) notificationModifiers.push("no-margin");

  const iconElement = () => {
    if (icon) return icon;
    switch (notificationType) {
      case "announcement":
        return (
          <Icon
            decorative={false}
            className="notification-icon icon"
            name={IconNames.SpeakerNotes}
            color={IconColors.SectionResearchSecondary}
            size={IconSizes.Large}
          />
        );
      case "warning":
        return (
          <Icon
            decorative={false}
            className="notification-icon icon"
            name={IconNames.ErrorFilled}
            color={IconColors.BrandPrimary}
            size={IconSizes.Large}
          />
        );
      default:
        return null;
    }
  };

  let childHeading;
  let childContent;
  let headingCount = 0;
  let contentCount = 0;

  React.Children.map(children, (child: React.ReactElement) => {
    if (
      child.type === NotificationHeading ||
      child.props.mdxType === "NotificationHeading"
    ) {
      childHeading = child;
      headingCount++;
    }

    if (
      child.type === NotificationContent ||
      child.props.mdxType === "NotificationContent"
    ) {
      childContent = child;
      contentCount++;
    }
  });

  if (headingCount > 1) {
    console.error(
      `Only one NotificationHeading child component may be passed to Notification.`
    );
    childHeading =
      "Error: Only one NotificationHeading child component may be passed to Notification.";
  }

  if (contentCount > 1) {
    console.error(
      `Only one NotificationContent child component may be passed to Notification.`
    );
    childContent =
      "Error: Only one NotificationContent child component may be passed to Notification.";
  }

  if (
    headingCount &&
    (icon ||
      ((notificationType === NotificationTypes.Announcement ||
        notificationType === NotificationTypes.Warning) &&
        !centered))
  ) {
    notificationModifiers.push("align-text");
  }

  return (
    <aside
      className={bem(baseClass, notificationModifiers, blockName, [className])}
      id={id}
    >
      <div className={bem("container", [], baseClass)}>
        {headingCount ? (
          <header>
            {iconElement()}
            {childHeading}
          </header>
        ) : null}
        {contentCount ? (
          <div className="content__container">
            {!headingCount ? iconElement() : null}
            {childContent}
          </div>
        ) : null}
      </div>
      {dismissible ? (
        <Button
          buttonType={ButtonTypes.Link}
          className="dismissible-button"
          onClick={handleClose}
        >
          <Icon
            decorative={false}
            name={IconNames.Close}
            size={IconSizes.Large}
          />
        </Button>
      ) : null}
    </aside>
  );
}
