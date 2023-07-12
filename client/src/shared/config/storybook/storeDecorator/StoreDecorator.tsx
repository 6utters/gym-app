import { StateSchema, StoreProvider } from '@/app/providers/storeProvider'
import { StoryFn } from '@storybook/react'

export const StoreDecorator =
	(initialState: DeepPartial<StateSchema>) => (Story: StoryFn) =>
		(
			<StoreProvider initialState={initialState}>
				<Story />
			</StoreProvider>
		)
