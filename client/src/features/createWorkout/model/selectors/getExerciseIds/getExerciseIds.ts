import { StateSchema } from '@/app/providers/storeProvider'
import { getFromLocalStorage } from '@/shared/lib/localStorage'
import { EXERCISE_IDS } from '@/shared/consts/localStorage'

export const getExerciseIds = (state: StateSchema) =>
	state.createWorkout?.exerciseIds || getFromLocalStorage(EXERCISE_IDS) || []
