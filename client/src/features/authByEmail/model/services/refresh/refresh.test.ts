import { refresh } from './refresh'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { AuthByEmailResponse } from '@/features/authByEmail'
import { RoleTypes } from '@/entities/User/model/consts/userRoles'

describe('refresh', () => {
	test('fulfilled operation', async () => {
		const userValue: AuthByEmailResponse = {
			user: {
				id: 1,
				email: 'user@gmail.com',
				userName: 'user',
				statistics: [],
				objectives: [],
				user_info: {
					age: 20,
					gender: 'male',
					height: 180,
					weight: 75
				},
				programs: [],
				roles: [{ value: RoleTypes.USER, description: 'user' }]
			},
			accessToken: 'token'
		}

		const thunk = new TestAsyncThunk(refresh)
		thunk.api.get.mockReturnValue(Promise.resolve({ data: userValue }))
		const result = await thunk.callThunk()

		expect(result.payload).toEqual(userValue)
		expect(thunk.api.get).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(3)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(refresh)
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk()

		expect(thunk.api.get).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(2)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
