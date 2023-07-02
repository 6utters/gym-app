import { StateSchema } from '@/app/providers/storeProvider'

export const getCurrentObjExercise = (state: StateSchema) =>
	state.programCreationPage.currentObjectivesExerciseId ?? 0
