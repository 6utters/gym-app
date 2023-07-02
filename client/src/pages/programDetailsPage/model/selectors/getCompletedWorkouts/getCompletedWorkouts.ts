import { StateSchema } from '@/app/providers/storeProvider'

export const getCompletedWorkouts = (state: StateSchema) =>
	state.programDetailsPage.completedPrograms ?? []
