import { StateSchema } from '@/app/providers/storeProvider'

export const getIsExercisesPanelOpen = (state: StateSchema) => state.programCreationPage.exercisesPanel ?? false
