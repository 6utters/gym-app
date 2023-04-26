import { StateSchema } from '@/app/providers/storeProvider'
import { getAuthByEmailError } from './getAuthByEmailError'

describe('getAuthByEmailError', () => {
	test('error exists', () => {
		const state: DeepPartial<StateSchema> = {
			authByEmail: {
				error: 'Something went wrong',
			},
		}

		expect(getAuthByEmailError(state as StateSchema)).toBe(
			'Something went wrong',
		)
	})
	test('isLoading equals undefined', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getAuthByEmailError(state as StateSchema)).toBe('')
	})
})
