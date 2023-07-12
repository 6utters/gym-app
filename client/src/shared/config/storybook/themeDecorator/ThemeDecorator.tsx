import { StoryFn } from '@storybook/react'

export const ThemeDecorator = () => (Story: StoryFn) =>
	(
		<div className={'light'}>
			<Story />
		</div>
	)
