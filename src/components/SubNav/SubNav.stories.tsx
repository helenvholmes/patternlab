import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../Icons/Icon";

import SubNav, {
  SubNavButton,
  SubNavLink,
  actionBackgroundColorsArray,
  highlightColorsArray,
} from "./SubNav";

const meta: Meta<typeof SubNav> = {
  title: "Components/Page Layout/SubNav",
  component: SubNav,
  argTypes: {
    className: { control: false },
    actionBackgroundColor: {
      control: "select",
      options: actionBackgroundColorsArray,
      defaultValue: { summary: "blogs" },
    },
    highlightColor: {
      control: "select",
      options: highlightColorsArray,
      defaultValue: { summary: "blogs" },
    },
    id: { control: false },
    selectedItem: { description: "Set item id to be selected." },
    secondaryActions: {},
    primaryActions: {},
  },
};

export const WithControls: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "SubNav-id",
    selectedItem: "",
    primaryActions: (
      <>
        <SubNavButton id="sub-nav-button1" buttonType="secondary">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button2" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-link1" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="search" size="small" className="right" align="right" />
        </SubNavLink>
        <SubNavLink id="sub-nav-link2" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="legacyAccountFilled" size="small" className="right" align="right" />
        </SubNavLink>
        <SubNavButton id="sub-nav-button3" buttonType="text">
          Label Text
          <Icon name="legacyAccountFilled" size="small" className="right" align="right"/>
        </SubNavButton>
        <SubNavButton id="sub-nav-button4" buttonType="text">
          Label Text
        </SubNavButton>
      </>
    ),
    secondaryActions: (
      <>
        <SubNavButton id="sub-nav-button-1" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-button1">
          <Icon name="headset" size="small" className="right" align="right" />
          Label Text
        </SubNavLink>
        <SubNavLink id="sub-nav-button">
          <Icon name="headset" size="small" className="right" align="right" />
          Label Text
        </SubNavLink>
      </>
    ),
  },

  render: (args: any) => (
    <SubNav {...args}>
      <SubNavButton id="sub-nav-button1" buttonType="text">
        Label Text
      </SubNavButton>
      <SubNavButton id="sub-nav-button" buttonType="text">
        Label Text
      </SubNavButton>
    </SubNav>
  ),
  argTypes: {
    primaryActions: { control: false },
    secondaryActions: { control: false },
  },
};

export const WithSelectedItem: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "SubNav-id",
    selectedItem: "sub-nav-button2",
    primaryActions: (
      <>
        <SubNavButton id="sub-nav-button1" buttonType="secondary">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button2" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-link1" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="search" align="left" size="small" />
        </SubNavLink>
        <SubNavLink id="sub-nav-link2" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="legacyAccountFilled" align="left" size="small" />
        </SubNavLink>
        <SubNavButton id="sub-nav-button3" buttonType="text">
          Label Text
          <Icon name="legacyAccountFilled" align="left" size="small" />
        </SubNavButton>
        <SubNavButton id="sub-nav-button4" buttonType="text">
          Label Text
        </SubNavButton>
      </>
    ),
    secondaryActions: (
      <>
        <SubNavButton id="sub-nav-button-1" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-button1">
          <Icon name="headset" align="left" size="small" />
          Label Text
        </SubNavLink>
        <SubNavLink id="sub-nav-button">
          <Icon name="headset" align="left" size="small" />
          Label Text
        </SubNavLink>
      </>
    ),
  },

  render: (args: any) => (
    <SubNav {...args}>
      <SubNavButton id="sub-nav-button1" buttonType="text">
        Label Text
      </SubNavButton>
      <SubNavButton id="sub-nav-button" buttonType="text">
        Label Text
      </SubNavButton>
    </SubNav>
  ),
  argTypes: {
    primaryActions: { control: false },
    secondaryActions: { control: false },
  },
};

export const WithBorderLine: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "SubNav-id",
    selectedItem: "sub-nav-button2",
    primaryActions: (
      <>
        <SubNavButton id="sub-nav-button1" buttonType="secondary" isOutlined="true">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button2" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-link1" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="search" align="left" size="small" />
        </SubNavLink>
        <SubNavLink id="sub-nav-link2" screenreaderOnlyText="of my account">
          Label Text
          <Icon name="legacyAccountFilled" align="left" size="small" />
        </SubNavLink>
        <SubNavButton id="sub-nav-button3" buttonType="text">
          Label Text
          <Icon name="legacyAccountFilled" align="left" size="small" />
        </SubNavButton>
        <SubNavButton id="sub-nav-button4" buttonType="text">
          Label Text
        </SubNavButton>
      </>
    ),
    secondaryActions: (
      <>
        <SubNavButton id="sub-nav-button-1" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavButton id="sub-nav-button" buttonType="text">
          Label Text
        </SubNavButton>
        <SubNavLink id="sub-nav-button1" isOutlined="true">
          <Icon name="headset" align="left" size="small" />
          Label Text
        </SubNavLink>
        <SubNavLink id="sub-nav-button" isOutlined="true">
          <Icon name="headset" align="left" size="small" />
          Label Text
        </SubNavLink>
      </>
    ),
  },

  render: (args: any) => (
    <SubNav {...args}>
      <SubNavButton id="sub-nav-button1" buttonType="text">
        Label Text
      </SubNavButton>
      <SubNavButton id="sub-nav-button" buttonType="text">
        Label Text
      </SubNavButton>
    </SubNav>
  ),
  argTypes: {
    primaryActions: { control: false },
    secondaryActions: { control: false },
  },
};


export default meta;
type Story = StoryObj<typeof SubNav>;
