import type { Meta, StoryObj } from "@storybook/react";

import Icon from "../Icons/Icon";
import Link from "../Link/Link";
import Notification, { notificationTypesArray } from "./Notification";
import Text from "../Text/Text";
import Heading from "../Heading/Heading";

const meta: Meta<typeof Notification> = {
  title: "Components/Feedback/Notification",
  component: Notification,
  argTypes: {
    className: { control: false },
    dismissible: {
      table: { defaultValue: { summary: "false" } },
    },
    icon: { control: false },
    id: { control: false },
    isCentered: {
      table: { defaultValue: { summary: "false" } },
    },
    noMargin: {
      table: { defaultValue: { summary: "false" } },
    },
    notificationContent: { control: false },
    notificationType: {
      control: {
        type: "radio",
      },
      options: notificationTypesArray,
      table: { defaultValue: { summary: "standard" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

/**
 * Main Story for the Notification component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    ariaLabel: "Notification label",
    className: undefined,
    dismissible: false,
    icon: undefined,
    id: "notification-id",
    isCentered: false,
    noMargin: false,
    notificationHeading: "Notification Heading",
    notificationContent: (
      <>
        Cras <a href="/">link</a> mattis consectetur purus sit amet fermentum.
        Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur
        ac, vestibulum at eros. Cum sociis natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel
        augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo
        luctus, nisi erat porttitor ligula.
      </>
    ),
    notificationType: "standard",
    showIcon: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/?node-id=10734%3A812",
    },
    jest: ["Notification.test.tsx"],
  },
  render: (args) => (
    <div style={{ border: "1px solid #ccc" }}>
      <Notification {...args} />
    </div>
  ),
};

// The following are additional Notification example Stories.
export const NotificationHeading: Story = {
  render: () => (
    <>
      <Notification
        notificationHeading="Standard Notification"
        notificationContent={
          <>
            This is a "standard" Notification with a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationType="announcement"
        notificationHeading="Announcement Notification"
        notificationContent={
          <>
            This is an "announcement" Notification with a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationType="warning"
        notificationHeading="Warning Notification"
        notificationContent={
          <>
            This is a "warning" Notification with a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationContent={
          <>
            This is a "standard" Notification without a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationType="announcement"
        notificationContent={
          <>
            This is an "announcement" Notification without a heading. Cras
            mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationType="warning"
        notificationContent={
          <>
            This is a "warning" Notification without a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
    </>
  ),
};

export const CustomNotificationHeading: Story = {
  render: () => (
    <>
      <Notification
        notificationHeading={<Heading level="h3">Custom H3 Heading</Heading>}
        notificationContent={
          <>
            This is a "standard" Notification with a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
      <Notification
        notificationHeading={<Heading level="h5">Custom H5 Heading</Heading>}
        notificationContent={
          <>
            This is a "standard" Notification with a heading. Cras mattis
            consectetur purus sit amet fermentum. Maecenas faucibus mollis
            interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </>
        }
      />
    </>
  ),
};

export const NotificationIcon: Story = {
  render: () => (
    <>
      <Notification
        notificationHeading="Notification with Icon"
        notificationContent={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
      />
      <Notification
        notificationContent={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
      />
      <Notification
        notificationHeading="Notification without Icon"
        notificationContent={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        showIcon={false}
      />
      <Notification
        notificationContent={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        showIcon={false}
      />
    </>
  ),
};
export const CustomIcon: Story = {
  render: () => (
    <Notification
      icon={<Icon name="check" color="section.research.secondary" />}
      notificationHeading="Custom Icon"
      notificationContent={
        <>
          This is a Notification with a custom icon. Cras mattis consectetur
          purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </>
      }
    />
  ),
};
export const HTMLContent: Story = {
  render: () => (
    <Notification
      notificationHeading="Standard Notification with HTML content"
      notificationContent={
        <>
          <Text>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum.
          </Text>
          <Text noSpace>
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.{" "}
            <b>
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus
            </b>
            . <Link href="#">This is a link</Link>.
          </Text>
        </>
      }
    />
  ),
};
export const Dismissible: Story = {
  render: () => (
    <Notification
      dismissible
      notificationHeading="Dismissible Notification"
      notificationContent={
        <>
          This is a dismissible Notification with an X icon. Cras mattis
          consectetur purus sit amet fermentum. Maecenas faucibus mollis
          interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
          eros. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </>
      }
      notificationType="announcement"
    />
  ),
};
