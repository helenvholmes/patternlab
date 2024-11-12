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
      primaryActions={() => (
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            buttonType="text"
            isOutlined
          >
            Label Text
          </SubNavButton>
          <SubNavButton id="primary-sub-nav-button-2" buttonType="text">
            Label Text
          </SubNavButton>
          <SubNavButton id="primary-sub-nav-button-3" buttonType="text">
            Label Text
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link1"
          >
            Label Text
          </SubNavLink>
          <SubNavLink
            id="primary-sub-nav-link-2"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link2"
          >
            Label Text
          </SubNavLink>
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
      )}
      secondaryActions={() => (
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            buttonType="text"
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
            id="sub-nav-link-1"
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
      primaryActions={
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            buttonType="text"
            selectedItem="primary-sub-nav-button-1"
          >
            Label Text
          </SubNavButton>
          <SubNavButton id="primary-sub-nav-button-2" buttonType="text">
            Label Text
          </SubNavButton>
          <SubNavButton id="primary-sub-nav-button-3" buttonType="text">
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
          <SubNavLink
            id="primary-sub-nav-link-2"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link2"
          >
            Label Text
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
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
            id="sub-nav-button-3" // Unique ID
            buttonType="text"
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            id="sub-nav-link-1"
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
          <SubNavLink
            id="sub-nav-link-2"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link2"
          >
            Label Text
            <Icon
              name="legacyAccountFilled"
              size="small"
              className="right"
              align="right"
            />
          </SubNavLink>
          <SubNavLink
            id="sub-nav-link-3"
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
            onClick={onClickHandler}
          >
            Label Text
          </SubNavButton>

          <SubNavButton
            id="primary-sub-nav-button-2"
            buttonType="text"
            onClick={onClickHandler}
          >
            Label Text
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-3"
            buttonType="text"
            onClick={onClickHandler}
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            id="primary-sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link1"
            onClick={onClickHandler}
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
            onClick={onClickHandler}
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

export const HighlightColor: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: "brand.primary-05",
    highlightColor: "brand.primary",
    id: "sub-nav-id",
    selectedItem: "primary-sub-nav-button-1",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            id="primary-sub-nav-button-1"
            buttonType="text"
            selectedItem="primary-sub-nav-button-1"
            onClick={onClickHandler}
          >
            Label Text
          </SubNavButton>
          <SubNavButton
            id="primary-sub-nav-button-2"
            highlightColor="brand.primary"
            actionBackgroundColor="brand.primary-05"
            buttonType="text"
            onClick={onClickHandler}
            isOutlined
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
            id="primary-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            highlightColor="brand.primary"
            actionBackgroundColor="brand.primary-05"
            href="#link"
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
      secondaryActions={
        <>
          <SubNavButton
            id="sub-nav-button-3" // Unique ID
            highlightColor="brand.primary"
            actionBackgroundColor="brand.primary-05"
            buttonType="text"
            onClick={onClickHandler}
            isOutlined
          >
            Label Text
          </SubNavButton>
          <SubNavLink
            id="sub-nav-link-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            highlightColor="brand.primary"
            actionBackgroundColor="brand.primary-05"
            href="#link"
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

const onClickHandler = () => {
  console.log("Button clicked");
};

export default meta;
type Story = StoryObj<typeof SubNav>;
