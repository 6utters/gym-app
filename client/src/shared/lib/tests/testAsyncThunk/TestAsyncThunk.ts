import { AsyncThunkAction } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/storeProvider'
import axios, { AxiosStatic } from 'axios'

type EnhancedActionCreator<Returned, Arg, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Returned, Arg, { rejectValue: RejectedValue }>

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Returned, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>
	getState: () => StateSchema
	actionCreator: EnhancedActionCreator<Returned, Arg, RejectedValue>
	api: jest.MockedFunctionDeep<AxiosStatic>

	constructor(
		actionCreator: EnhancedActionCreator<Returned, Arg, RejectedValue>,
		state?: DeepPartial<StateSchema>
	) {
		this.actionCreator = actionCreator
		this.dispatch = jest.fn()
		this.getState = jest.fn(() => state as StateSchema)
		this.api = mockedAxios
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg)
		const result = await action(this.dispatch, this.getState, {
			api: this.api
		})

		return result
	}
}
