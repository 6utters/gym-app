import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getFromLocalStorage } from '@/shared/lib/localStorage'
import { CreateWorkoutSchema } from '@/features/createWorkout/model/types/CreateWorkoutSchema'
import { EXERCISE_IDS } from '@/shared/consts/localStorage'

const initialState: CreateWorkoutSchema = {
	exerciseIds: getFromLocalStorage(EXERCISE_IDS)
}

export const createWorkoutSlice = createSlice({
	name: 'createWorkout',
	initialState,
	reducers: {
		addExercise: (state, action: PayloadAction<number>) => {
			const ids = localStorage.getItem(EXERCISE_IDS)
			if (!ids) {
				localStorage.setItem(EXERCISE_IDS, JSON.stringify([action.payload]))
				state.exerciseIds = [action.payload]
			} else {
				const exercises_ids: number[] = JSON.parse(ids || '')
				const mentionedId = exercises_ids.find(id => id === action.payload)
				if (mentionedId) return

				exercises_ids.push(action.payload)

				localStorage.setItem(EXERCISE_IDS, JSON.stringify(exercises_ids))
				state.exerciseIds.push(action.payload)
			}
		},
		removeExercise: (state, action: PayloadAction<number>) => {
			localStorage.removeItem(EXERCISE_IDS)
			state.exerciseIds = state.exerciseIds.filter(id => id !== action.payload)
			localStorage.setItem(EXERCISE_IDS, JSON.stringify(state.exerciseIds))
		},
		clearAll: state => {
			localStorage.removeItem(EXERCISE_IDS)
			state.exerciseIds = []
		}
	}
})

export const { reducer: createWorkoutReducer, actions: createWorkoutActions } =
	createWorkoutSlice
