import { StateSchema } from '@/app/providers/storeProvider'

export const getCompleteWorkoutError = (state: StateSchema) =>
	state.programDetailsPage.error ?? ''
