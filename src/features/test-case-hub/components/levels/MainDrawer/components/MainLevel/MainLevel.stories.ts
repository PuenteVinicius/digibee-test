// stories/MainLevel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import MainLevel from "@/components/features/MainLevel/MainLevel";
import { MockOption } from "@/hooks/UseMockApi/useMockApi";

const meta: Meta<typeof MainLevel> = {
  title: "Features/MainLevel",
  component: MainLevel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onLevelSelect: {
      action: "levelSelected",
      description: "Callback when a level is selected",
    },
    selectedMockOptions: {
      control: "object",
      description: "Array of selected mock options",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainLevel>;

const mockSelectedOptions: MockOption[] = [
  { id: "1", label: "Session Management", svgPath: "HTTP" },
  { id: "2", label: "Rest V2 API", svgPath: "DB" },
];

export const Default: Story = {
  args: {
    onLevelSelect: (level) => console.log("Level selected:", level),
    selectedMockOptions: [],
  },
};

export const WithMockOptions: Story = {
  args: {
    onLevelSelect: (level) => console.log("Level selected:", level),
    selectedMockOptions: mockSelectedOptions,
  },
};

export const FullFlowEnabled: Story = {
  args: {
    onLevelSelect: (level) => console.log("Level selected:", level),
    selectedMockOptions: [],
  },
  parameters: {
    initialState: {
      fullFlow: true,
    },
  },
};

export const MultipleMockOptions: Story = {
  args: {
    onLevelSelect: (level) => console.log("Level selected:", level),
    selectedMockOptions: [
      ...mockSelectedOptions,
      { id: "3", label: "Transformer JOLT", svgPath: "FS" },
      { id: "4", label: "Database Query", svgPath: "DB" },
    ],
  },
};
