import { logOut } from './logOut'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk'

describe('logout', () => {
	test('fulfilled operation', async () => {
		const thunk = new TestAsyncThunk(logOut)
		thunk.api.post.mockReturnValue(
			Promise.resolve({ data: { status: 'fulfilled' } }),
		)
		const result = await thunk.callThunk()

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(logOut)
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk()

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(2)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
