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
    id: "sub-nav-id",
    selectedItem: undefined,
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={({ highlightColor, actionBackgroundColor }) => (
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
            isOutlined
          >
            Label Text 1
          </SubNavButton>

          <SubNavButton
            id="primary-sub-nav-button-2"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 2
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-3"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 3
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 4
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="primary-sub-nav-link-2"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 5
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="primary-sub-nav-link-3"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 6
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
      secondaryActions={({ highlightColor, actionBackgroundColor }) => (
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 3
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavButton>

          <SubNavLink
            id="sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 1
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
    />
  ),
};

export const SelectedItem: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "sub-nav-id",
    selectedItem: "primary-sub-nav-button-1",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={({
        highlightColor,
        actionBackgroundColor,
        selectedItem,
      }) => (
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
            selectedItem={selectedItem}
          >
            Label Text 1
          </SubNavButton>

          <SubNavButton
            id="primary-sub-nav-button-2"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 2
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-3"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 3
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 4
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="primary-sub-nav-link-2"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 5
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="primary-sub-nav-link-3"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 6
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
      secondaryActions={({ highlightColor, actionBackgroundColor }) => (
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 3
          </SubNavButton>

          <SubNavLink
            id="sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 1
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="sub-nav-link-2"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 2
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="sub-nav-link-3"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
          >
            Label Text 3
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
    />
  ),
};

export const Outline: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "sub-nav-id",
    selectedItem: undefined,
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={({
        highlightColor,
        actionBackgroundColor,
        selectedItem,
      }) => (
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
            selectedItem={selectedItem}
            isOutlined
            onClick={onClickHandler}
          >
            Label Text 1
          </SubNavButton>

          <SubNavButton
            id="primary-sub-nav-button-2"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
            isOutlined
          >
            Label Text 2
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-3"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
          >
            Label Text 3
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            href="#link"
          >
            Label Text 4
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
      secondaryActions={({ highlightColor, actionBackgroundColor }) => (
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            buttonType="text"
            isOutlined
          >
            Label Text 3
          </SubNavButton>

          <SubNavLink
            id="sub-nav-link-1"
            screenreaderOnlyText="of my account"
            highlightColor={highlightColor}
            actionBackgroundColor={actionBackgroundColor}
            isOutlined
          >
            Label Text 1
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      )}
    />
  ),
};

const onClickHandler = () => {};

export default meta;
type Story = StoryObj<typeof SubNav>;
