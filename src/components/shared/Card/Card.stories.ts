// stories/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Card, { CardProps } from '@/components/shared/Card/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the card',
    },
    description: {
      control: 'text',
      description: 'Description of the card',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a card description',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Card without Description',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    description: 'Click me to see an action',
    onClick: () => console.log('Card clicked!'),
  },
};

export const LongContent: Story = {
  args: {
    title: 'Card with very long title that might wrap to multiple lines',
    description: 'This is a very long description that should demonstrate how the card handles text overflow and wrapping in different scenarios with multiple lines of text.',
  },
};