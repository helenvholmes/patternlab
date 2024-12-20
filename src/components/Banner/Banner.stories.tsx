import { VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import Banner, {
  bannerBgColorsArray,
  bannerHighlightColorsArray,
  bannerTypesArray,
} from "./Banner";
import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Heading from "../Heading/Heading";
import Icon from "../Icons/Icon";
import Link from "../Link/Link";
import Table from "../Table/Table";
import Text from "../Text/Text";

const meta: Meta<typeof Banner> = {
  title: "Components/Feedback/Banner",
  component: Banner,
  argTypes: {
    ariaLabel: { control: { type: "text" } },
    backgroundColor: {
      control: { type: "select" },
      options: bannerBgColorsArray,
    },
    className: { control: false },
    content: { control: false },
    heading: { control: false },
    highlightColor: {
      control: { type: "select" },
      options: bannerHighlightColorsArray,
    },
    icon: { control: false },
    id: { control: false },
    isDismissible: { control: { type: "boolean" } },
    type: {
      control: { type: "select" },
      options: bannerTypesArray,
      table: { defaultValue: { summary: "neutral" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

/**
 * Main Story for the Banner component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    ariaLabel: "Banner label",
    backgroundColor: undefined,
    className: undefined,
    content: `Cras mattis consectetur purus sit amet fermentum. Maecenas
      faucibus mollis interdum. Morbileo risus, porta ac consectetur ac,
      vestibulum at eros. Cum sociis natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet
      rutrum faucibus dolor auctor.`,
    heading: "Heading text",
    highlightColor: undefined,
    icon: undefined,
    id: undefined,
    isDismissible: false,
    type: "neutral",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?type=design&node-id=86601-97661&mode=design&t=wZy1nqVOOZ4Dzuu2-11",
    },
    jest: ["Banner.test.tsx"],
  },
  render: (args) => <Banner {...args} />,
};

// The following are additional Banner example Stories.
export const TypeVariants: Story = {
  render: () => (
    <Table
      columnHeaders={["Variant", "Purpose"]}
      tableData={[
        [
          <>
            <Banner
              content={
                <>
                  This is a "neutral" Banner with a heading. Cras mattis
                  consectetur purus sit amet fermentum. Maecenas faucibus mollis
                  interdum. Morbi leo risus, porta ac consectetur ac, vestibulum
                  at eros. Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Vivamus sagittis lacus vel
                  augue laoreet rutrum faucibus dolor auctor.{" "}
                  <Link href="#">This is a link</Link>.
                </>
              }
              heading="Neutral Banner"
            />
          </>,
          "Indicates a general, non-critical status update.",
        ],
        [
          <>
            <Banner
              content={`
              This is an "informative" Banner with a heading. Cras mattis consectetur
              purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi
              leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor.
              `}
              heading="Informative Banner"
              type="informative"
            />
          </>,
          "Communicates helpful information or an important attribute.",
        ],
        [
          <>
            <Banner
              content={`
              This is a "positive" Banner with a heading. Cras mattis consectetur
              purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi
              leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor.
              `}
              heading="Positive Banner"
              type="positive"
            />
          </>,
          "Indicates a constructive or successful state.",
        ],
        [
          <>
            <Banner
              content={
                <>
                  This is a "negative" Banner with a heading. Cras mattis
                  consectetur purus sit amet fermentum. Maecenas faucibus mollis
                  interdum. Morbi leo risus, porta ac consectetur ac, vestibulum
                  at eros. Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Vivamus sagittis lacus vel
                  augue laoreet rutrum faucibus dolor auctor.{" "}
                  <Link href="#">This is a link</Link>.
                </>
              }
              heading="Negative Banner"
              type="negative"
            />
          </>,
          "Informs users of problems or errors that require potential action to correct.",
        ],
        [
          <>
            <Banner
              content={`
              This is a "warning" Banner with a heading. Cras mattis consectetur
              purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi
              leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor.
              `}
              heading="Warning Banner"
              type="warning"
            />
          </>,
          "Communicates cautionary or time-sensitive information.",
        ],
        [
          <>
            <Banner
              content={`
              This is a "recommendation" Banner with a heading. Cras mattis consectetur
              purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi
              leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor.
              `}
              heading="Recommendation Banner"
              type="recommendation"
            />
          </>,
          "Highlights a suggestion that will improve the experience and achieve better results.",
        ],
      ]}
    />
  ),
};

export const BannerHeading: Story = {
  render: () => (
    <VStack>
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor.
          </>
        }
        heading={<Heading level="h3">Custom H3 Heading</Heading>}
      />
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor.
          </>
        }
        heading={<Heading level="h5">Custom H5 Heading</Heading>}
        type="positive"
      />
      <Banner
        content={
          <>
            This example has no heading. Cras mattis consectetur purus sit amet
            fermentum. Maecenas faucibus mollis interdum. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Vivamus
            sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </>
        }
        type="warning"
      />
    </VStack>
  ),
};

export const CustomBannerIcon: Story = {
  render: () => (
    <VStack>
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        heading="Banner with Custom Icon"
        icon={
          <Icon
            name="actionLightbulb"
            title="Banner with custom icon"
            size="large"
            marginTop="xxxs"
          />
        }
        type="informative"
      />
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        heading="Banner with Custom Icon"
        icon={
          <Icon
            name="actionLightbulb"
            title="Banner with custom icon"
            size="large"
            marginTop="xxxs"
          />
        }
        type="positive"
      />
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        heading="Banner with Custom Icon"
        icon={
          <Icon
            name="alertWarningOutline"
            title="Banner with custom icon"
            size="large"
            marginTop="xxxs"
          />
        }
        type="negative"
      />
      <Banner
        content={
          <>
            Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
            mollis interdum. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </>
        }
        heading="Banner with Custom Icon"
        icon={
          <Icon
            name="check"
            title="Banner with custom icon"
            size="large"
            marginTop="xxxs"
          />
        }
      />
    </VStack>
  ),
};
export const HTMLContent: Story = {
  render: () => (
    <VStack>
      <Banner
        heading="Standard Banner with HTML content"
        content={
          <>
            <Text>
              Cras mattis consectetur purus sit amet fermentum. Maecenas
              faucibus mollis interdum.
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
      <Banner
        heading="Standard Banner with Buttons"
        content={
          <>
            <Text>
              Cras mattis consectetur purus sit amet fermentum. Maecenas
              faucibus mollis interdum.
            </Text>
            <ButtonGroup>
              <Button buttonType="secondary" id="group-1">
                Button
              </Button>
              <Button id="group-2">Submit</Button>
            </ButtonGroup>
          </>
        }
      />
    </VStack>
  ),
};
export const CustomColors: Story = {
  render: () => (
    <Banner
      backgroundColor="section.research-library.schomburg-05"
      content={`
        Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus
        mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum
        at eros. Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      `}
      heading="Custom Color Banner"
      highlightColor="brand.primary"
    />
  ),
};
export const Dismissible: Story = {
  render: () => (
    <Banner
      content={
        <>
          This is a dismissible Banner with an X icon. Cras mattis consectetur
          purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </>
      }
      heading="Dismissible Banner"
      isDismissible
      type="neutral"
    />
  ),
};
export const StringContentWithHTML: Story = {
  render: () => (
    <Banner
      content={
        "<p>Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum.</p><p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. <b>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus</b>. <a href='#'>This is a link</a>.</p>"
      }
      heading="String content with HTML"
      type="neutral"
    />
  ),
};
