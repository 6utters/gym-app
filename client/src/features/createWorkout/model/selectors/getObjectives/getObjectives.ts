import { StateSchema } from '@/app/providers/storeProvider'

export const getObjectives = (state: StateSchema) =>
	state.createWorkout.objectives || []
