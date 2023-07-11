import { StateSchema } from '@/app/providers/storeProvider'
import { getAuthByEmailIsLoading } from './getAuthByEmailIsLoading'

describe('getAuthByEmailIsLoading', () => {
	test('should return true', () => {
		const state: DeepPartial<StateSchema> = {
			authByEmail: {
				isLoading: true
			}
		}
		expect(getAuthByEmailIsLoading(state as StateSchema)).toEqual(true)
	})
	test('should return false if the state is empty', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getAuthByEmailIsLoading(state as StateSchema)).toEqual(false)
	})
})
