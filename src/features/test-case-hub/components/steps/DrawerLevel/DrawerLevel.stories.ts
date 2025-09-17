import type { Meta, StoryObj } from '@storybook/react';
import { DrawerLevel } from './DrawerLevel';

const meta: Meta<typeof DrawerLevel> = {
  title: 'Components/DrawerLevel',
  component: DrawerLevel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DrawerLevel>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    title: 'Test Drawer Level',
    level: 1,
    children: <div>Drawer content goes here</div>,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Close clicked'),
    title: 'Closed Drawer',
    level: 1,
    children: <div>This content should not be visible</div>,
  },
};