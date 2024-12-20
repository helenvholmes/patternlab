import type { Meta, StoryObj } from "@storybook/react";

import Heading from "../Heading/Heading";
import Link from "../Link/Link";
import VideoPlayer, {
  VideoPlayerAspectRatiosArray,
  VideoPlayerTypesArray,
} from "./VideoPlayer";
import { argsBooleanType } from "../../helpers/storybookUtils";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/Media & Icons/VideoPlayer",
  component: VideoPlayer,
  argTypes: {
    aspectRatio: {
      controls: { type: "radio" },
      options: VideoPlayerAspectRatiosArray,
      table: {
        defaultValue: { summary: "sixteenByNine" },
      },
    },
    className: { control: false },
    descriptionText: { control: "text" },
    embedCode: { control: false },
    headingText: { control: "text" },
    helperText: { control: "text" },
    id: { control: false },
    iframeTitle: { control: "text" },
    showHelperInvalidText: argsBooleanType("true"),
    videoId: { control: "text" },
    videoType: {
      controls: { type: "radio" },
      options: VideoPlayerTypesArray,
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

/**
 * Main Story for the VideoPlayer component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    aspectRatio: "sixteenByNine",
    className: undefined,
    descriptionText:
      "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    embedCode: `<iframe src="https://player.vimeo.com/video/421404144?h=5467db7edd" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`,
    headingText: "NYPL Video",
    helperText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    id: "videoPlayer-id",
    iframeTitle: undefined,
    showHelperInvalidText: true,
    videoId: undefined,
    videoType: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?type=design&node-id=36835-25314&t=AEGDRpspvTyuSWSA-4",
    },
    jest: "VideoPlayer.test.tsx",
  },
  render: (args) => (
    <VideoPlayer
      {...args}
      aspectRatio={args.aspectRatio}
      embedCode={args.embedCode}
      videoId={args.videoId}
      videoType={args.videoType}
    />
  ),
};

// The following are additional VideoPlayer example Stories.
export const WithCustomHeading: Story = {
  render: () => (
    <VideoPlayer
      headingText={<Heading level="h4">Custom H4 Heading</Heading>}
      videoId="474719268"
      videoType="vimeo"
    />
  ),
};
export const Errored: Story = {
  render: () => (
    <VideoPlayer videoId="https://vimeo.com/474719268" videoType="vimeo" />
  ),
};
export const HTMLInHelperText: Story = {
  render: () => (
    <VideoPlayer
      helperText={
        <>
          This helper text contains <b>bold text</b> and a{" "}
          <Link href="https://nypl.org">link</Link>.
        </>
      }
      videoId="474719268"
      videoType="vimeo"
    />
  ),
};
