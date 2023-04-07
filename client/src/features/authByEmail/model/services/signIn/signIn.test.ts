import { signIn } from '@/features/authByEmail'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk'

describe('signInByEmail', () => {
	test('fulfilled operation', async () => {
		const userValue = {
			email: 'user@gmail.com',
			userName: 'user',
		}

		const thunk = new TestAsyncThunk(signIn)
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
		const result = await thunk.callThunk({
			email: 'user@gmail.com',
			password: '123456',
		})

		expect(result.payload).toEqual(userValue)
		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(signIn)
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk({
			email: 'user@gmail.com',
			password: '123123',
		})

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(2)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
