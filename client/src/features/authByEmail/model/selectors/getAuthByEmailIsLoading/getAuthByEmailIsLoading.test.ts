import { StateSchema } from '@/app/providers/storeProvider'
import { getAuthByEmailIsLoading } from './getAuthByEmailIsLoading'

describe('getAuthByEmailIsLoading', () => {
	test('isLoading equals true', () => {
		const state: DeepPartial<StateSchema> = {
			authByEmail: {
				isLoading: true,
			},
		}

		expect(getAuthByEmailIsLoading(state as StateSchema)).toBe(true)
	})
	test('isLoading equals undefined', () => {
		const state: DeepPartial<StateSchema> = {}

		expect(getAuthByEmailIsLoading(state as StateSchema)).toBe(false)
	})
})
