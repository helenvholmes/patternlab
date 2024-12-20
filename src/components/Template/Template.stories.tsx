import type { Meta, StoryObj } from "@storybook/react";

import Accordion, { AccordionDataProps } from "../Accordion/Accordion";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Button from "../Button/Button";
import Card, { CardHeading, CardContent, CardActions } from "../Card/Card";
import FeaturedContent from "../FeaturedContent/FeaturedContent";
import Form, { FormRow, FormField } from "../Form/Form";
import Heading from "../Heading/Heading";
import Hero from "../Hero/Hero";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
import Link from "../Link/Link";
import Notification from "../Notification/Notification";
import Placeholder from "../Placeholder/Placeholder";
import SkipNavigation from "../SkipNavigation/SkipNavigation";
import Table from "../Table/Table";
import {
  Template,
  TemplateAboveHeader,
  TemplateAppContainer,
  TemplateBreakout,
  TemplateContent,
  TemplateContentBottom,
  TemplateContentPrimary,
  TemplateContentSidebar,
  TemplateContentTop,
  TemplateFooter,
  TemplateHeader,
} from "./Template";
import TextInput from "../TextInput/TextInput";
import { argsBooleanType } from "../../helpers/storybookUtils";
import { getPlaceholderImage } from "../../utils/utils";

const meta: Meta<typeof TemplateAppContainer> = {
  title: "Components/Page Layout/Template",
  component: TemplateAppContainer,
};

export default meta;
type Story = StoryObj<typeof TemplateAppContainer>;

const otherSubHeaderText =
  "With 92 locations across the Bronx, Manhattan, and Staten Island, The New York Public Library is an essential part of neighborhoods across the city. Visit us today.";
const accordionData: AccordionDataProps[] = [
  {
    accordionType: "default",
    label: "Tom Nook",
    panel: (
      <Card
        imageProps={{
          alt: "Alt text",
          aspectRatio: "twoByOne",
          src: "https://play.nintendo.com/images/AC_Tom_FRYtwIN.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png",
        }}
        isCentered
        layout="row"
      >
        <CardHeading level="h4" id="heading1">
          Tom Nook
        </CardHeading>
        <CardContent>
          Tom Nook, <b>known in Japan as Tanukichi</b>, is a fictional character
          in the Animal Crossing series who operates the village store.
        </CardContent>
      </Card>
    ),
  },
];
const faqContentData: AccordionDataProps[] = [
  ...accordionData,
  {
    accordionType: "warning",
    label: "Isabelle",
    panel: (
      <Card
        imageProps={{
          alt: "Alt text",
          aspectRatio: "twoByOne",
          src: "https://play.nintendo.com/images/AC_Isabelle_7XU6aGu.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png",
        }}
        isCentered
        layout="row"
      >
        <CardHeading level="h4" id="heading1-isabelle">
          Isabelle
        </CardHeading>
        <CardContent>
          Isabelle, known as Shizue in Japan, is a fictional character from the
          Animal Crossing series of video games. She is a kindly Shih Tzu that
          debuted in the 2012 release Animal Crossing: New Leaf, where she
          serves as the secretary to the player character.
        </CardContent>
      </Card>
    ),
  },
  {
    accordionType: "error",
    label: "K.K. Slider",
    panel: (
      <Card
        imageProps={{
          alt: "Alt text",
          aspectRatio: "twoByOne",
          src: "https://play.nintendo.com/images/AC_KK_jh4yj5t.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png",
        }}
        isCentered
        layout="row"
      >
        <CardHeading level="h4" id="heading1-kkslider">
          K.K. Slider
        </CardHeading>
        <CardContent>
          <p>
            Totakeke, more commonly known as <b>K.K. Slider or K.K.</b>, is a
            fictional character within the Animal Crossing franchise. One of the
            franchise's most popular characters, he debuted in the title Animal
            Crossing, and has appeared in every installment since.
          </p>
        </CardContent>
      </Card>
    ),
  },
];

const columnHeadersAlt = [
  "Name",
  "Nick Name",
  "Species",
  "Description",
  "Bio",
  "Salary (USD)",
];
const tableDataAlt = [
  [
    "Tom Nook",
    "Tanukichi",
    "Raccoon",
    "A businessman who manages the town shop and the player's home loan.",
    "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue.",
    "$225,000",
  ],
  [
    "Isabelle",
    "Shizue",
    "Dog",
    "A secretary and assistant to the player. Twin sister to Digby.",
    "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    "$228,500",
  ],
  [
    "K.K. Slider",
    "Totakeke",
    "Dog",
    "A traveling musician and DJ. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    "Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.",
    "$157,000",
  ],
  [
    "Sonny Resetti",
    "Risetto san",
    "Mole",
    "Lectures the player if they reset their game. Brother to Don Resetti.",
    "Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    "$89,000",
  ],
];
const columnStylesComplex = [
  { minWidth: "200px", width: "15%" },
  { minWidth: "200px", width: "15%" },
  { minWidth: "200px", width: "15%" },
  { minWidth: "500px", width: "auto" },
  { minWidth: "500px", width: "auto" },
  { minWidth: "160px", width: "15%", textAlign: "right" },
];

/**
 * Main Story for the Template component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    aboveHeader: <Placeholder variant="short">Above Header</Placeholder>,
    breakout: (
      <>
        <Placeholder variant="short">Breadcrumbs</Placeholder>
        <Placeholder>Hero</Placeholder>
      </>
    ),
    contentBottom: <Placeholder variant="short">Content Bottom</Placeholder>,
    contentId: "mainContent",
    contentPrimary: (
      <>
        <Placeholder>Main Content</Placeholder>
        <Placeholder variant="short">More Content</Placeholder>
      </>
    ),
    contentTop: <Placeholder variant="short">Content Top</Placeholder>,
    footer: <Placeholder>Footer</Placeholder>,
    header: <Placeholder variant="short">Header</Placeholder>,
    renderFooterElement: true,
    renderHeaderElement: true,
    renderSkipNavigation: false,
    sidebar: "left",
  },
  argTypes: {
    aboveHeader: { control: false },
    breakout: { control: false },
    contentBottom: { control: false },
    contentPrimary: { control: false },
    contentSidebar: { control: false },
    contentTop: { control: false },
    footer: { control: false },
    header: { control: false },
    renderSkipNavigation: argsBooleanType("true"),
    sidebar: {
      table: { defaultValue: { summary: "none" } },
    },
  },
  render: (args) => (
    <TemplateAppContainer
      {...args}
      contentSidebar={<Placeholder>Sidebar ({args.sidebar})</Placeholder>}
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=36835%3A26688",
    },
  },
};
// The following are additional Template example Stories.
export const ChildrenComponentProps: Story = {
  args: {
    sidebar: "left",
  },
  argTypes: {
    aboveHeader: { table: { disable: true } },
    breakout: { table: { disable: true } },
    contentBottom: { table: { disable: true } },
    contentId: { table: { disable: true } },
    contentPrimary: { table: { disable: true } },
    contentSidebar: { table: { disable: true } },
    contentTop: { table: { disable: true } },
    footer: { table: { disable: true } },
    header: { table: { disable: true } },
    sidebar: { description: "Only used in Storybook." },
  },
  render: (args) => (
    <>
      <SkipNavigation />
      <Template>
        <TemplateBreakout>
          <TemplateAboveHeader>
            <Placeholder variant="short">Above Header</Placeholder>
          </TemplateAboveHeader>
          <TemplateHeader>
            <Placeholder variant="short">Header</Placeholder>
            <Placeholder variant="short">Breadcrumbs</Placeholder>
            <Placeholder>Hero</Placeholder>
          </TemplateHeader>
        </TemplateBreakout>
        <TemplateContent sidebar={args.sidebar}>
          <TemplateContentTop>
            <Placeholder variant="short">Content Top</Placeholder>
          </TemplateContentTop>
          {args.sidebar === "left" && (
            <TemplateContentSidebar>
              <Placeholder>Left Sidebar</Placeholder>
            </TemplateContentSidebar>
          )}
          <TemplateContentPrimary>
            <Placeholder>Main Content</Placeholder>
            <Placeholder variant="short">More Content</Placeholder>
          </TemplateContentPrimary>
          {args.sidebar === "right" && (
            <TemplateContentSidebar>
              <Placeholder>Right Sidebar</Placeholder>
            </TemplateContentSidebar>
          )}
          <TemplateContentBottom>
            <Placeholder variant="short">Content Bottom</Placeholder>
          </TemplateContentBottom>
        </TemplateContent>
        <TemplateFooter>
          <Placeholder>Footer</Placeholder>
        </TemplateFooter>
      </Template>
    </>
  ),
};

export const FullExampleWithTemplateChildrenComponents: Story = {
  render: () => (
    <>
      <SkipNavigation />
      <Template>
        <TemplateBreakout>
          <TemplateAboveHeader>
            <Notification
              noMargin
              notificationHeading="Standard Notification"
              notificationContent={
                <>
                  This is an "announcement" Notification with a heading. Cras
                  mattis consectetur purus sit amet fermentum. Maecenas faucibus
                  mollis interdum. Morbi leo risus, porta ac consectetur ac,
                  vestibulum at eros. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor.
                </>
              }
              showIcon={false}
            />
          </TemplateAboveHeader>
          <TemplateHeader>
            <Breadcrumbs
              breadcrumbsData={[
                { url: "#", text: "Home" },
                { url: "#", text: "Research" },
                {
                  url: "#",
                  text: "Catalog",
                },
              ]}
            />
            <Hero
              backgroundImageSrc={getPlaceholderImage()}
              heroType="campaign"
              heading={<Heading level="h1" id="1" text="Hero Campaign" />}
              imageProps={{
                alt: "Image example",
                src: getPlaceholderImage("smaller"),
              }}
              isDarkBackgroundImage
              subHeaderText={otherSubHeaderText}
            />
          </TemplateHeader>
        </TemplateBreakout>
        <TemplateContent sidebar="right">
          <TemplateContentTop>
            <Banner
              content="This is an the top content area!"
              heading="Content Top"
              type="informative"
            />
          </TemplateContentTop>
          <TemplateContentPrimary>
            <p>This is the main content!</p>
            <Accordion accordionData={faqContentData} />
            <HorizontalRule />
            <p>Fill out the form!</p>
            <Form action="/end/point" id="form1">
              <FormField>
                <TextInput
                  helperText="Make sure to complete this field."
                  id="username"
                  labelText="Username"
                  isRequired
                />
              </FormField>
              <FormField>
                <TextInput
                  helperText="Make sure to complete this field."
                  id="password"
                  labelText="Password"
                  isRequired
                />
              </FormField>
              <FormRow>
                <FormField>
                  <TextInput
                    id="phone-field"
                    labelText="Phone Field"
                    type="tel"
                  />
                </FormField>
                <FormField>
                  <TextInput id="url-field" labelText="URL Field" type="url" />
                </FormField>
                <FormField>
                  <TextInput id="age-field" labelText="Age" type="number" />
                </FormField>
              </FormRow>
              <FormField>
                <Button id="submit">Submit</Button>
              </FormField>
            </Form>
            <FeaturedContent
              imageProps={{
                alt: "",
                src: getPlaceholderImage("smaller"),
                position: "end",
                width: "",
              }}
              isFullWidth
              my="l"
              textContent={
                <>
                  <Heading size="heading5">Sit Dapibus Elit</Heading>
                  Donec id elit non mi porta gravida at eget metus. Nulla vitae
                  elit libero, a pharetra augue. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Cras
                  mattis consectetur purus sit amet fermentum.
                </>
              }
            />
            <Table
              columnHeaders={columnHeadersAlt}
              columnStyles={columnStylesComplex}
              id="table-horizontal-scrolling-wo-row-headers"
              isScrollable
              showRowDividers
              showTitleText={false}
              tableData={tableDataAlt}
              titleText="Table with horizontal scrolling and no row headers"
              useRowHeaders
            />
          </TemplateContentPrimary>
          <TemplateContentSidebar>
            <p>Sidebar information in a `Card` component.</p>
            <Card
              imageProps={{
                alt: "Alt text",
                aspectRatio: "square",
                size: "default",
                src: getPlaceholderImage("smaller"),
              }}
              isCentered
            >
              <CardHeading size="heading4" subtitle="Animal info" id="heading1">
                Library Image
              </CardHeading>
              <CardContent>
                Vestibulum id ligula porta felis euismod semper. Nulla vitae
                elit libero, a pharetra augue.
              </CardContent>
            </Card>
          </TemplateContentSidebar>
          <TemplateContentBottom>
            <Banner
              content="This is an the bottom content area!"
              heading="Content Bottom"
              type="informative"
            />
          </TemplateContentBottom>
        </TemplateContent>
        <TemplateFooter>
          <Card
            id="custom-card"
            imageProps={{
              alt: "Alt text",
              aspectRatio: "sixteenByNine",
              src: "https://cdn-d8.nypl.org/s3fs-public/2020-05/NYPL_MainFacadeRev2Cam2.png",
            }}
            layout="row"
            backgroundColor="#616161"
            foregroundColor="#FFF"
          >
            <CardHeading id="heading1-footer">Footer</CardHeading>
            <CardContent>
              <p>This is an example footer using the `Card` component.</p>
              <p>
                © The New York Public Library, 2021 The New York Public Library
                is a 501(c)(3) | EIN 13-1887440
              </p>
            </CardContent>
            <CardActions>
              <Link color="#FFF" href="#" textDecoration="underline">
                Facebook
              </Link>
              ,
              <Link color="#FFF" href="#" textDecoration="underline">
                Instagram
              </Link>
              ,
              <Link color="#FFF" href="#" textDecoration="underline">
                Twitter
              </Link>
            </CardActions>
          </Card>
        </TemplateFooter>
      </Template>
    </>
  ),
};
