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
            id="subnav-with-controls-primary-action-1"
            screenreaderOnlyText="for the NYPL Research Catalog"
            onClick={() => subNavButtonOnClick("from primary-subnav-button-1")}
          >
            Action
          </SubNavButton>
          <SubNavButton
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
            Link
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <SubNavButton
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
            Link
          </SubNavLink>
        </>
      }
    />
  ),
};

export const SelectedItem: Story = {
  render: () => (
    <SubNav
      primaryActions={
        <>
          <SubNavButton
            id="subnav-selected-babies-toddlers"
            onClick={() =>
              subNavButtonOnClick("from subnav-selected-babies-toddlers")
            }
            screenreaderOnlyText="Education for babies and toddlers"
          >
            Babies &amp; toddlers
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-selected-kids"
            screenreaderOnlyText="Education for kids"
            isSelected
          >
            Kids
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-selected-teens"
            screenreaderOnlyText="Education for teens"
          >
            Teens
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-selected-adults"
            screenreaderOnlyText="Education for adults"
          >
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
  render: () => (
    <SubNav
      primaryActions={
        <>
          <SubNavButton
            id="subnav-outlined-babies-toddlers"
            onClick={() =>
              subNavButtonOnClick("from subnav-outlined-babies-toddlers")
            }
            screenreaderOnlyText="Education for babies and toddlers"
          >
            Babies &amp; toddlers
          </SubNavButton>
          <SubNavLink
            href="#link1"
            id="subnav-outlined-kids"
            screenreaderOnlyText="Education for kids"
          >
            Kids
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-outlined-teens"
            screenreaderOnlyText="Education for teens"
          >
            Teens
          </SubNavLink>
          <SubNavLink
            href="#link2"
            id="subnav-outlined-adults"
            screenreaderOnlyText="Education for adults"
          >
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
  render: () => (
    <SubNav
      primaryActions={
        <>
          <SubNavButton
            id="subnav-icons-search"
            onClick={() => subNavButtonOnClick("from subnav-icons-search")}
            screenreaderOnlyText="the NYPL Research Catalog"
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
            screenreaderOnlyText="for NYPL.org"
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
  render: () => (
    <SubNav
      primaryActions={
        <>
          <SubNavButton
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
  render: () => (
    <>
      <SubNav
        actionBackgroundColor="brand.primary-05"
        highlightColor="brand.primary"
        id="subnav-colors"
        primaryActions={
          <>
            <SubNavButton
              id="subnav-colors-babies-toddlers"
              onClick={() =>
                subNavButtonOnClick("from subnav-colors-babies-toddlers")
              }
              screenreaderOnlyText="Education for babies and toddlers"
            >
              Babies &amp; toddlers
            </SubNavButton>
            <SubNavLink
              href="#link1"
              id="subnav-colors-kids"
              isSelected
              screenreaderOnlyText="Education for kids"
            >
              Kids
            </SubNavLink>
            <SubNavLink
              href="#link2"
              id="subnav-colors-teens"
              screenreaderOnlyText="Education for teens"
            >
              Teens
            </SubNavLink>
            <SubNavLink
              href="#link2"
              id="subnav-colors-adults"
              screenreaderOnlyText="Education for adults"
            >
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

export const HorizontalScrolling: Story = {
  render: () => (
    <>
      <SubNav
        primaryActions={
          <>
            <SubNavButton
              id="subnav-scrolling-infants"
              onClick={() =>
                subNavButtonOnClick("from subnav-scrolling-infants")
              }
              screenreaderOnlyText="Education for infants"
            >
              Infants
            </SubNavButton>
            <SubNavLink
              href="#toddlers"
              id="subnav-scrolling-toddlers"
              screenreaderOnlyText="Education for toddlers"
            >
              Toddlers
            </SubNavLink>
            <SubNavLink
              href="#kids"
              id="subnav-scrolling-kids"
              isSelected
              screenreaderOnlyText="Education for kids"
            >
              Kids
            </SubNavLink>
            <SubNavLink
              href="#tweens"
              id="subnav-scrolling-tweens"
              screenreaderOnlyText="Education for tweens"
            >
              Tweens
            </SubNavLink>
            <SubNavLink
              href="#teens"
              id="subnav-scrolling-teens"
              screenreaderOnlyText="Education for teens"
            >
              Teens
            </SubNavLink>
            <SubNavLink
              href="#young-adults"
              id="subnav-scrolling-young-adults"
              screenreaderOnlyText="Education for adults"
            >
              Young Adults
            </SubNavLink>
            <SubNavLink
              href="#adults"
              id="subnav-scrolling-adults"
              screenreaderOnlyText="Education for adults"
            >
              Adults
            </SubNavLink>
            <SubNavLink
              href="#seniors"
              id="subnav-scrolling-seniors"
              screenreaderOnlyText="Education for seniors"
            >
              Seniors
            </SubNavLink>
          </>
        }
        secondaryActions={
          <>
            <SubNavButton
              id="subnav-scrolling-logout"
              onClick={() =>
                subNavButtonOnClick("from subnav-colors-babies-toddlers")
              }
              screenreaderOnlyText="of NYPL.org"
            >
              Log out
            </SubNavButton>
            <SubNavLink
              href="#link1"
              id="subnav-scrolling-account"
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
