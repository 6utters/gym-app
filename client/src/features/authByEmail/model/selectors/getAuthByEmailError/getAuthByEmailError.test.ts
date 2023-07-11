import { StateSchema } from '@/app/providers/storeProvider'
import { getAuthByEmailError } from './getAuthByEmailError'

describe('getAuthByEmailError', () => {
	test('should return error', () => {
		const state: DeepPartial<StateSchema> = {
			authByEmail: {
				error: 'Invalid email ror password'
			}
		}
		expect(getAuthByEmailError(state as StateSchema)).toEqual(
			'Invalid email ror password'
		)
	})
	test('should return undefined', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getAuthByEmailError(state as StateSchema)).toEqual(undefined)
	})
})
