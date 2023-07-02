import { StateSchema } from '@/app/providers/storeProvider'

export const getIsExerciseInfoPanelOpen = (state: StateSchema) =>
	state.programCreationPage.exerciseInfoPanel ?? false
