// stories/Drawer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Drawer, { DrawerProps } from '@/components/shared/Drawer/Drawer';
import { Plus, ArrowLeft, X } from 'iconoir-react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is open',
    },
    title: {
      control: 'text',
      description: 'Title of the drawer',
    },
    description: {
      control: 'text',
      description: 'Description of the drawer',
    },
    mainStep: {
      control: 'boolean',
      description: 'Whether this is the main step',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const Template: Story = {
  render: (args) => (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Drawer {...args}>
        <div style={{ padding: '20px' }}>
          <h3>Drawer Content</h3>
          <p>This is the main content area of the drawer.</p>
        </div>
      </Drawer>
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    isOpen: true,
    title: 'Drawer Title',
    description: 'This is a drawer description',
    mainStep: true,
    leftIcon: <ArrowLeft />,
    rightIcon: <X />,
    onLeftButtonClick: () => console.log('Left button clicked'),
    onRightButtonClick: () => console.log('Right button clicked'),
    onCancelButtonClick: () => console.log('Cancel clicked'),
    onSave: () => console.log('Save clicked'),
    onApply: () => console.log('Apply clicked'),
  },
};

export const WithoutIcons: Story = {
  ...Template,
  args: {
    isOpen: true,
    title: 'Drawer without Icons',
    description: 'This drawer has no icons in the header',
    mainStep: false,
    onApply: () => console.log('Apply clicked'),
  },
};

export const WithLongContent: Story = {
  ...Template,
  args: {
    isOpen: true,
    title: 'Drawer with very long title that might wrap',
    description: 'This is a very long description that should demonstrate how the drawer handles text overflow and wrapping in different scenarios.',
    mainStep: true,
    leftIcon: <ArrowLeft />,
  },
};