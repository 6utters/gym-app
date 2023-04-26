import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk'
import { signUp } from '@/features/authByEmail'

describe('signUpByEmail', () => {
	test('fulfilled operation', async () => {
		const userValue = {
			email: 'newUser@gmail.com',
			userName: 'newUser',
		}

		const thunk = new TestAsyncThunk(signUp)
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
		const result = await thunk.callThunk({
			email: 'newUser@gmail.com',
			password: '123456',
			userName: 'newUser',
		})

		expect(result.payload).toEqual(userValue)
		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(signUp)
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk({
			email: 'user@gmail.com',
			password: '123456',
			userName: 'user',
		})

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(2)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
