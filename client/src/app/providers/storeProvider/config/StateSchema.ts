import { $rtkApi } from '@/shared/api'
import { AxiosInstance } from 'axios'

export interface StateSchema {
	//entities:

	//features:

	[$rtkApi.reducerPath]: ReturnType<typeof $rtkApi.reducer>
}

export interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunkExtraArg
	state: StateSchema
}