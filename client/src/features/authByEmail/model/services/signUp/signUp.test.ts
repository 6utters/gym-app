import { signUp } from './signUp'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { AuthByEmailResponse } from '../../types/AuthByEmailSchema'
import { RoleTypes } from '@/entities/User/model/consts/userRoles'

describe('signInByEmail', () => {
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

		const thunk = new TestAsyncThunk(signUp)
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
		const result = await thunk.callThunk({
			email: 'user@gmail.com',
			password: '123456',
			userName: 'user'
		})

		expect(result.payload).toEqual(userValue)
		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(3)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(signUp)
		const err = new Error('Invalid email, password or username')
		thunk.api.post.mockRejectedValue(err)
		const result = await thunk.callThunk({
			email: 'random@gmail.com',
			password: '123123',
			userName: '123123'
		})

		try {
			await thunk.callThunk({
				email: 'random@gmail.com',
				password: '123123',
				userName: '123123'
			})
		} catch (e) {
			expect(e).toEqual(err)
		}

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
