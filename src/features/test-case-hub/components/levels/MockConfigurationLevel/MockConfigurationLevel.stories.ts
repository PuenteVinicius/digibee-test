// stories/MockConfigurationLevel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MockConfigurationLevel from '@/components/features/MockConfigurationLevel/MockConfigurationLevel';
import { MockOption } from '@/hooks/UseMockApi/useMockApi';

const meta: Meta<typeof MockConfigurationLevel> = {
  title: 'Features/MockConfigurationLevel',
  component: MockConfigurationLevel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectedMockOption: {
      action: 'selectedMockOption',
      description: 'Callback when a mock option is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockConfigurationLevel>;

const mockOptions: MockOption[] = [
  { id: '1', label: 'Session Management', svgPath: 'HTTP' },
  { id: '2', label: 'Rest V2 (HTTP / APIs)', svgPath: 'DB' },
  { id: '3', label: 'Transformer (JOLT)', svgPath: 'FS' },
];

export const Default: Story = {
  args: {
    onSelectedMockOption: (option) => console.log('Selected:', option),
  },
};

export const WithMockOptions: Story = {
  args: {
    onSelectedMockOption: (option) => console.log('Selected:', option),
  },
  parameters: {
    mockData: {
      mockOptions: mockOptions,
    },
  },
};

export const LoadingState: Story = {
  args: {
    onSelectedMockOption: (option) => console.log('Selected:', option),
  },
  parameters: {
    mockData: {
      loading: true,
      mockOptions: [],
    },
  },
};

export const WithServerOptions: Story = {
  args: {
    onSelectedMockOption: (option) => console.log('Selected:', option),
  },
  parameters: {
    mockData: {
      mockOptions: mockOptions,
      serverOptions: [
        { id: '1', label: 'Mocked response #1', createdAt: new Date() },
        { id: '2', label: 'Mocked response #2', createdAt: new Date() },
      ],
    },
  },
};