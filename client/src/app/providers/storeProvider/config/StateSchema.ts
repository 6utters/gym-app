import { $rtkApi } from '@/shared/api'
import { AxiosInstance } from 'axios'
import { UserSchema } from '@/entities/User'
import { AuthByEmailSchema } from '@/features/authByEmail'

export interface StateSchema {
	//entities:
	user: UserSchema
	//features:
	authByEmail: AuthByEmailSchema

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