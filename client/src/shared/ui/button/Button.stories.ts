import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
	title: 'shared/Button',
	component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const NeutralBlue: Story = {
	args: {
		theme: 'neutral',
		color: 'primary',
		children: 'Neutral blue button'
	}
}

export const OutlinedBlue: Story = {
	args: {
		theme: 'outlined',
		color: 'primary',
		children: 'Outlined blue button'
	}
}

export const ClearBlue: Story = {
	args: {
		theme: 'clear',
		color: 'primary',
		children: 'Clear blue button'
	}
}

export const CircleBlue: Story = {
	args: {
		theme: 'circle',
		color: 'primary',
		children: 'Circle blue button'
	}
}

export const ButtonS: Story = {
	args: {
		size: 's',
		color: 'primary',
		children: 'Small blue button'
	}
}

export const ButtonM: Story = {
	args: {
		size: 'm',
		color: 'primary',
		children: 'Medium blue button'
	}
}

export const ButtonL: Story = {
	args: {
		size: 'l',
		color: 'primary',
		children: 'Large blue button'
	}
}
