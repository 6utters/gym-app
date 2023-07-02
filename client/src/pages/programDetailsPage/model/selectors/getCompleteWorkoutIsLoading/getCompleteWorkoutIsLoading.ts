import { StateSchema } from '@/app/providers/storeProvider'

export const getCompleteWorkoutIsLoading = (state: StateSchema) => state.programDetailsPage.isLoading ?? false
