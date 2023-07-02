import { StateSchema } from '@/app/providers/storeProvider'

export const getCurrentExerciseId = (state: StateSchema) =>
	state.programCreationPage.currentExerciseId ?? 0
