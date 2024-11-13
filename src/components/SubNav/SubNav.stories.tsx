import type { Meta, StoryObj } from "@storybook/react";
import Heading from "../Heading/Heading";
import Hero from "../Hero/Hero";
import Icon from "../Icons/Icon";

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
    id: "subnav-with-controls",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-with-controls-primary-action-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            onClick={() => subNavButtonOnClick("from primary-subnav-button-1")}
          >
            Action
          </SubNavButton>
          <SubNavButton
            buttonType="text"
            id="subnav-with-controls-primary-action-2"
            screenreaderOnlyText="for the NYPL Research Catalog"
            onClick={() => subNavButtonOnClick("from primary-subnav-button-2")}
          >
            Action
          </SubNavButton>
          <SubNavLink
            id="subnav-with-controls-primary-action-3"
            screenreaderOnlyText="for the NYPL Research Catalog"
            href="#link3"
          >
            Action
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-with-controls-secondary-action-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            onClick={() => subNavButtonOnClick("from subnav-button-3")}
          >
            Action
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-with-controls-secondary-action-2"
            isOutlined
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            <Icon name="actionIdentityFilled" size="medium" />
            Action
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
    id: "subnav-selected",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-selected-babies-toddlers"
            onClick={() =>
              subNavButtonOnClick("from subnav-selected-babies-toddlers")
            }
          >
            Babies &amp; Toddlers
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-selected-kids"
            screenreaderOnlyText="for the NYPL Research Catalog"
            isSelected
          >
            Kids
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-selected-teens"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Teens
          </SubNavLink>
          <SubNavLink href="#link2" id="subnav-selected-adults">
            Adults
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavLink
            href="#link1"
            id="subnav-selected-account"
            screenreaderOnlyText="for NYPL.org"
          >
            My account
          </SubNavLink>
        </>
      }
    />
  ),
};

export const OutlinedItem: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "subnav-outlined",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-outlined-babies-toddlers"
            onClick={() =>
              subNavButtonOnClick("from subnav-outlined-babies-toddlers")
            }
          >
            Babies &amp; Toddlers
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-outlined-kids"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Kids
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-outlined-teens"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            Teens
          </SubNavLink>
          <SubNavLink href="#link2" id="subnav-outlined-adults">
            Adults
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavLink
            href="#link1"
            id="subnav-outlined-logout"
            isOutlined
            screenreaderOnlyText="for NYPL.org"
          >
            My account
          </SubNavLink>
        </>
      }
    />
  ),
};

export const UsingIcons: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "subnav-icons",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-icons-search"
            onClick={() => subNavButtonOnClick("from subnav-icons-search")}
          >
            <Icon name="utilitySearch" size="medium" />
            Search
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-icons-help"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            <Icon name="actionHelpDefault" size="medium" />
            Help desk
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-icons-settings"
            screenreaderOnlyText="for the NYPL Research Catalog"
          >
            <Icon name="actionSettings" size="medium" />
            Settings
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavLink
            href="#link1"
            id="subnav-icons-account"
            isOutlined
            screenreaderOnlyText="of the NYPL website"
          >
            <Icon name="actionIdentityFilled" size="medium" />
            My account
          </SubNavLink>
        </>
      }
    />
  ),
};

export const UsingIconsMobile: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: undefined,
    highlightColor: undefined,
    id: "subnav-icons-only",
  },

  render: (args: any) => (
    <SubNav
      {...args}
      primaryActions={
        <>
          <SubNavButton
            buttonType="text"
            id="subnav-icons-only-search"
            onClick={() => subNavButtonOnClick("from subnav-icons-only-search")}
            screenreaderOnlyText="Search for books"
          >
            <Icon name="utilitySearch" size="medium" />
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-icons-only-help"
            screenreaderOnlyText="Get help from the NYPL Help Desk"
          >
            <Icon name="actionHelpDefault" size="medium" />
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-icons-only-settings"
            screenreaderOnlyText="Settings for your account"
          >
            <Icon name="actionSettings" size="medium" />
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavLink
            href="#link1"
            id="subnav-icons-only-account"
            isOutlined
            screenreaderOnlyText="My account for NYPL.org"
          >
            <Icon name="actionIdentityFilled" size="medium" />
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
    id: "subnav-colors",
  },

  render: (args: any) => (
    <>
      <SubNav
        {...args}
        primaryActions={
          <>
            <SubNavButton
              buttonType="text"
              id="subnav-colors-babies-toddlers"
              onClick={() =>
                subNavButtonOnClick("from subnav-colors-babies-toddlers")
              }
            >
              Babies &amp; Toddlers
            </SubNavButton>
            <SubNavLink
              href="#link1"
              id="subnav-colors-kids"
              isSelected
              screenreaderOnlyText="for the NYPL Research Catalog"
            >
              Kids
            </SubNavLink>
            <SubNavLink
              href="#link2"
              id="subnav-colors-teens"
              screenreaderOnlyText="for the NYPL Research Catalog"
            >
              Teens
            </SubNavLink>
            <SubNavLink href="#link2" id="subnav-colors-adults">
              Adults
            </SubNavLink>
          </>
        }
        secondaryActions={
          <>
            <SubNavLink
              href="#link1"
              id="subnav-colors-account"
              isOutlined
              screenreaderOnlyText="for NYPL.org"
            >
              <Icon name="actionIdentityFilled" size="medium" />
              My account
            </SubNavLink>
          </>
        }
      />
    </>
  ),
};

export const Placement: Story = {
  args: {
    className: undefined,
    actionBackgroundColor: "section.research.primary-05",
    highlightColor: "section.research.primary",
    id: "subnav-placement",
  },

  render: (args: any) => (
    <>
      <Hero
        backgroundColor="section.research.primary"
        heading={
          <Heading
            level="h1"
            id="tertiary-hero-rc"
            size="heading2"
            text="Research Catalog"
          />
        }
        heroType="tertiary"
      />
      <SubNav
        {...args}
        primaryActions={
          <>
            <SubNavButton
              buttonType="text"
              id="subnav-placement-search"
              onClick={() =>
                subNavButtonOnClick("from subnav-placement-search")
              }
              isSelected
            >
              Search the catalog
            </SubNavButton>
            <SubNavLink href="#browse" id="subnav-placement-browse">
              Browse the catalog
            </SubNavLink>
          </>
        }
        secondaryActions={
          <>
            <SubNavLink
              href="#logout"
              id="subnav-placement-logout"
              screenreaderOnlyText="of NYPL.org"
            >
              Log out
            </SubNavLink>
            <SubNavLink
              href="#account"
              id="subnav-placement-account"
              isOutlined
              screenreaderOnlyText="for NYPL.org"
            >
              <Icon name="actionIdentityFilled" size="medium" />
              My account
            </SubNavLink>
          </>
        }
      />
    </>
  ),
};

export default meta;
type Story = StoryObj<typeof SubNav>;
