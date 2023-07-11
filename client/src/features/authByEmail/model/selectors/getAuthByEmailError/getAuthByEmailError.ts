import { StateSchema } from '@/app/providers/storeProvider'

export const getAuthByEmailError = (state: StateSchema) =>
	state.authByEmail?.error
