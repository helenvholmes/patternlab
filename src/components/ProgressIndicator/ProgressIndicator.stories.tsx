import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import ProgressIndicator, {
  progressIndicatorLabelPlacementsArray,
  progressIndicatorSizesArray,
  progressIndicatorTypesArray,
} from "./ProgressIndicator";
import SimpleGrid from "../Grid/SimpleGrid";
import { HStack } from "@chakra-ui/react";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Components/Feedback/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    darkMode: {
      control: false,
    },
    id: { control: false },
    indicatorType: {
      controls: { type: "select" },
      options: progressIndicatorTypesArray,
      table: { defaultValue: { summary: "linear" } },
    },
    isIndeterminate: {
      table: { defaultValue: { summary: "false" } },
    },
    labelPlacement: {
      control: "select",
      options: progressIndicatorLabelPlacementsArray,
      table: { defaultValue: { summary: "bottom" } },
    },
    showLabel: {
      table: { defaultValue: { summary: "true" } },
    },
    size: {
      controls: { type: "select" },
      options: progressIndicatorSizesArray,
      table: { defaultValue: { summary: "default" } },
    },
    value: {
      table: { defaultValue: { summary: "0" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

/**
 * Main Story for the ProgressIndicator component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    id: "progressIndicator-id",
    indicatorType: "linear",
    isIndeterminate: false,
    labelText: "Progress",
    showLabel: true,
    size: "default",
    value: 50,
  },
  render: (args) => <ProgressIndicator {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=37638%3A23842",
    },
    jest: ["ProgressIndicator.test.tsx"],
  },
};

export const LinearType: Story = {
  argTypes: {
    indicatorType: { table: { disable: true } },
  },
  render: () => (
    <ProgressIndicator
      id="linear"
      indicatorType="linear"
      labelText="Linear Progress Type"
      value={50}
    />
  ),
};
export const CircularType: Story = {
  argTypes: {
    indicatorType: { table: { disable: true } },
  },
  render: () => (
    <ProgressIndicator
      id="circular"
      indicatorType="circular"
      labelText="Circular Progress Type"
      value={50}
    />
  ),
};
export const LinearSizes: Story = {
  render: () => (
    <SimpleGrid columns={1} gap="grid.m">
      <ProgressIndicator
        id="default-size"
        labelText="Default 8px size"
        value={50}
      />
      <ProgressIndicator
        id="small-size"
        labelText="Small 4px size"
        size="small"
        value={50}
      />
    </SimpleGrid>
  ),
};
export const CircularSizes: Story = {
  render: () => (
    <SimpleGrid columns={1} gap="grid.m">
      <ProgressIndicator
        id="default-size"
        indicatorType="circular"
        labelText="Default 48px size"
        value={50}
      />
      <ProgressIndicator
        id="small-size"
        indicatorType="circular"
        labelText="Small 24px size"
        size="small"
        value={50}
      />
    </SimpleGrid>
  ),
};

export const Labels: Story = {
  render: () => (
    <SimpleGrid columns={1} gap="grid.m">
      <ProgressIndicator
        id="label"
        labelText="This label will be added through aria-label"
        showLabel={false}
        value={50}
      />
      <ProgressIndicator
        id="label-hidden"
        indicatorType="circular"
        labelText="This label will be added through aria-label"
        showLabel={false}
        value={50}
      />
    </SimpleGrid>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <SimpleGrid columns={1} gap="grid.xl">
      <HStack spacing="l">
        <ProgressIndicator
          id="default-label-bottom"
          indicatorType="circular"
          labelText="Bottom label (default size)"
          value={50}
        />
        <ProgressIndicator
          id="default-label-top"
          indicatorType="circular"
          labelPlacement="top"
          labelText="Top label (default size)"
          value={50}
        />
        <ProgressIndicator
          id="default-label-left"
          indicatorType="circular"
          labelPlacement="left"
          labelText="Left label (default size)"
          value={50}
        />
        <ProgressIndicator
          id="default-label-right"
          indicatorType="circular"
          labelPlacement="right"
          labelText="Right label (default size)"
          value={50}
        />
      </HStack>
      <HStack spacing="l">
        <ProgressIndicator
          id="small-label-bottom"
          indicatorType="circular"
          labelPlacement="bottom"
          labelText="Bottom label (small size)"
          size="small"
          value={50}
        />
        <ProgressIndicator
          id="small-label-right"
          indicatorType="circular"
          labelPlacement="top"
          labelText="Top label (small size)"
          size="small"
          value={50}
        />
        <ProgressIndicator
          id="small-label-left"
          indicatorType="circular"
          labelPlacement="left"
          labelText="Left label (small size)"
          size="small"
          value={50}
        />
        <ProgressIndicator
          id="small-label-right"
          indicatorType="circular"
          labelPlacement="right"
          labelText="Right label (small size)"
          size="small"
          value={50}
        />
      </HStack>
    </SimpleGrid>
  ),
};

export const IndeterminateState: Story = {
  render: () => (
    <SimpleGrid columns={1} gap="grid.m">
      <ProgressIndicator
        id="indeterminate"
        isIndeterminate
        labelText="Indeterminate state"
        value={50}
      />
      <ProgressIndicator
        id="indeterminate-circular"
        indicatorType="circular"
        isIndeterminate
        labelText="Indeterminate state"
        value={50}
      />
    </SimpleGrid>
  ),
};

function ProgressIndicatorExample() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => (value === 100 ? 0 : value + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SimpleGrid columns={1} gap="grid.m">
      <ProgressIndicator
        id="example"
        labelText="Progress example"
        value={value}
      />
      <ProgressIndicator
        id="example-circular"
        indicatorType="circular"
        labelText="Progress example"
        value={value}
      />
    </SimpleGrid>
  );
}

export const WorkingExample: Story = {
  render: () => <ProgressIndicatorExample />,
  name: "Get Input Values",
};
