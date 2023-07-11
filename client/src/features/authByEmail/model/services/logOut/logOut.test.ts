import { logOut } from './logOut'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/TestAsyncThunk'

describe('logout', () => {
	test('fulfilled operation', async () => {
		const thunk = new TestAsyncThunk(logOut)
		thunk.api.post.mockReturnValue(
			Promise.resolve({ data: { status: 'fulfilled' } })
		)
		const result = await thunk.callThunk()

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(3)
		expect(result.meta.requestStatus).toBe('fulfilled')
	})

	test('rejected operation', async () => {
		const thunk = new TestAsyncThunk(logOut)
		const err = new Error('Something went wrong')
		thunk.api.post.mockRejectedValue(err)
		const result = await thunk.callThunk()

		try {
			await thunk.callThunk()
		} catch (e) {
			expect(e).toEqual(err)
		}

		expect(thunk.api.post).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(result.meta.requestStatus).toBe('rejected')
	})
})
