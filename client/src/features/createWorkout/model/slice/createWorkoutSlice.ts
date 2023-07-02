import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objective } from '@/entities/Objective'
import { CreateWorkoutSchema } from '@/features/createWorkout/model/types/CreateWorkoutSchema'
import { EX_OBJECTIVES, EXERCISE_IDS } from '@/shared/consts/localStorage'
import { getFromLocalStorage } from '@/shared/lib/localStorage'

interface ChangeOrderProps {
	firstIndex: number
	secondIndex: number
}

const initialState: CreateWorkoutSchema = {
	exerciseIds: getFromLocalStorage(EXERCISE_IDS) || [],
	objectives: getFromLocalStorage(EX_OBJECTIVES) || []
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
		changeOrder: (state, action: PayloadAction<ChangeOrderProps>) => {
			const firstId = state.exerciseIds[action.payload.firstIndex]
			state.exerciseIds[action.payload.firstIndex] =
				state.exerciseIds[action.payload.secondIndex]
			state.exerciseIds[action.payload.secondIndex] = firstId
		},
		removeExercise: (state, action: PayloadAction<number>) => {
			localStorage.removeItem(EXERCISE_IDS)
			state.exerciseIds = state.exerciseIds.filter(id => id !== action.payload)
			localStorage.setItem(EXERCISE_IDS, JSON.stringify(state.exerciseIds))
		},
		clearAll: state => {
			localStorage.removeItem(EXERCISE_IDS)
			localStorage.removeItem(EX_OBJECTIVES)
			state.exerciseIds = []
		},
		addObjective: (state, action: PayloadAction<Objective>) => {
			localStorage.removeItem(EX_OBJECTIVES)
			state.objectives.push(action.payload)
			localStorage.setItem(EX_OBJECTIVES, JSON.stringify(state.objectives))
		},
		changeObjective: (state, action: PayloadAction<Objective>) => {
			localStorage.removeItem(EX_OBJECTIVES)
			state.objectives = state.objectives.map(obj =>
				obj.exercise.id === action.payload.exercise.id ? action.payload : obj
			)
			localStorage.setItem(EX_OBJECTIVES, JSON.stringify(state.objectives))
		},
		clearObjective: (state, action: PayloadAction<number>) => {
			localStorage.removeItem(EX_OBJECTIVES)
			state.objectives = state.objectives.filter(
				obj => obj.exercise.id !== action.payload
			)
			localStorage.setItem(EX_OBJECTIVES, JSON.stringify(state.objectives))
		}
	}
})

export const { reducer: createWorkoutReducer, actions: createWorkoutActions } =
	createWorkoutSlice
