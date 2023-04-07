import { StateSchema } from '@/app/providers/storeProvider'

export const getAuthByEmailIsLoading = (state: StateSchema) =>
	state.authByEmail.isLoading || false
