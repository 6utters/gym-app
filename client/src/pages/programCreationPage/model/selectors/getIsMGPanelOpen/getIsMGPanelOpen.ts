import { StateSchema } from '@/app/providers/storeProvider'

export const getIsMGPanelOpen = (state: StateSchema) => state.programCreationPage.muscleGroupsPanel ?? false
