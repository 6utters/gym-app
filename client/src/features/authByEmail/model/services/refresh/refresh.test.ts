import { refresh } from './refresh'
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk'

describe('refresh', () => {
	test('fulfilled operation', async () => {
		const userValue = {
			email: 'user@gmail.com',
			userName: 'user',
		}

		const thunk = new TestAsyncThunk(refresh)
		thunk.api.get.mockReturnValue(Promise.resolve({ data: userValue }))
		const result = await thunk.callThunk()

		expect(result.payload).toEqual(userValue)
		expect(thunk.api.get).toBeCalled()
		expect(thunk.dispatch).toBeCalledTimes(4)
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
