import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../Icons/Icon";
import Text from "../Text/Text";

import SubNav, {
  SubNavButton,
  SubNavLink,
  actionBackgroundColorsArray,
  highlightColorsArray,
} from "./SubNav";

const meta: Meta<typeof SubNav> = {
  title: "Components/Navigation/SubNav",
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

const subNavButtonOnClick = (msg: string = "the button was clicked") => {
  console.log(`SubNav button click message: ${msg}`);
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
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="primary-sub-nav-button-1"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-1")}
          >
            Label Text
          </SubNavButton>
          <SubNavButton
            buttonType="text"
            id="primary-sub-nav-button-2"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-2")}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-3"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link3"
          >
            Label Text
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="sub-nav-button-3"
            onClick={() => subNavButtonOnClick("from sub-nav-button-3")}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="sub-nav-link-1"
            isOutlined
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Label Text
            <Icon
              align="right"
              className="right"
              name="legacyAccountFilled"
              size="small"
            />
          </SubNavLink>
        </>
      }
    />
  ),
};

export const SelectedItem: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "sub-nav-id",
    selectedItem: "primary-sub-nav-link-1",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="primary-sub-nav-button-1"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-1")}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Label Text
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="primary-sub-nav-link-2"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Label Text
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="sub-nav-button-3"
            onClick={() => subNavButtonOnClick("from sub-nav-button-3")}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="sub-nav-link-1"
            isOutlined
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Label Text
            <Icon
              align="right"
              className="right"
              name="legacyAccountFilled"
              size="small"
            />
          </SubNavLink>
        </>
      }
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
      primaryActions={
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            buttonType="text"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-1")}
          >
            Label Text
          </SubNavButton>

          <SubNavButton
            id="primary-sub-nav-button-2"
            buttonType="text"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-2")}
          >
            Label Text
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-3"
            buttonType="text"
            onClick={() => subNavButtonOnClick("from primary-sub-nav-button-3")}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link1"
          >
            Label Text
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            buttonType="text"
            onClick={() => subNavButtonOnClick("from sub-nav-button-3")}
            isOutlined
          >
            Label Text
          </SubNavButton>

          <SubNavLink
            id="sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            isOutlined
          >
            Label Text
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
        </>
      }
    />
  ),
};

export const CustomColors: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: "brand.primary-05",
    highlightColor: "brand.primary",
    id: "sub-nav-id",
    selectedItem: "primary-sub-nav-button-1",
  },

  render: (args: any) => (
    <>
      <Text>Blah</Text>
      <SubNav
        {...args}
        primaryActions={
          <>
            <SubNavButton
              buttonType="text"
              id="primary-sub-nav-button-1"
              isOutlined
              onClick={() =>
                subNavButtonOnClick("from primary-sub-nav-button-1")
              }
            >
              Label Text
            </SubNavButton>
            <SubNavButton
              buttonType="text"
              id="primary-sub-nav-button-2"
              onClick={() =>
                subNavButtonOnClick("from primary-sub-nav-button-2")
              }
            >
              Label Text
              <Icon
                name="legacyAccountFilled"
                size="small"
                className="right"
                align="right"
              />
            </SubNavButton>
            <SubNavLink
              href="#link"
              id="primary-link-1"
              isOutlined
              screenreaderOnlyText="for the NYPL Research Catalog"
            >
              Label Text
              <Icon
                name="legacyAccountFilled"
                size="small"
                className="right"
                align="right"
              />
            </SubNavLink>
          </>
        }
        secondaryActions={
          <>
            <SubNavButton
              buttonType="text"
              id="sub-nav-button-3"
              onClick={() => subNavButtonOnClick("from sub-nav-button-3")}
            >
              Label Text
            </SubNavButton>
            <SubNavLink
              href="#link"
              id="sub-nav-link-1"
              isOutlined
              screenreaderOnlyText="for the NYPL Research Catalog"
            >
              Label Text
              <Icon
                name="legacyAccountFilled"
                size="small"
                className="right"
                align="right"
              />
            </SubNavLink>
          </>
        }
      />
    </>
  ),
};

export default meta;
type Story = StoryObj<typeof SubNav>;
