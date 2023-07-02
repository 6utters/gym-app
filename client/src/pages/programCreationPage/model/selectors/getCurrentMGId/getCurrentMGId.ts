import { StateSchema } from '@/app/providers/storeProvider'

export const getCurrentMGId = (state: StateSchema) =>
	state.programCreationPage.currentMuscleGroupId ?? 0
