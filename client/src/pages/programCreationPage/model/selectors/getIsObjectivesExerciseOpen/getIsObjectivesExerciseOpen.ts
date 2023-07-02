import { StateSchema } from '@/app/providers/storeProvider'

export const getIsObjectivesExerciseOpen = (state: StateSchema) =>
	state.programCreationPage.exerciseObjectivesPanel ?? false
