import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardSize } from './Card'

const meta: Meta<typeof Card> = {
	title: 'shared/Card',
	component: Card
}

export default meta
type Story = StoryObj<typeof Card>

export const Ordinary: Story = {
	args: {
		children: 'Card'
	}
}

export const OutlinedFullWidth: Story = {
	args: {
		outlined: true,
		children: 'Card'
	}
}

export const OrdinaryS: Story = {
	args: {
		outlined: true,
		size: CardSize.S,
		children: 'Card',
		fullWith: false
	}
}

export const OrdinaryL: Story = {
	args: {
		outlined: true,
		size: CardSize.L,
		children: 'Card',
		fullWith: false
	}
}

export const OrdinaryXL: Story = {
	args: {
		outlined: true,
		size: CardSize.XL,
		children: 'Card',
		fullWith: false
	}
}
