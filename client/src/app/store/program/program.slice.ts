import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProgramInitialState } from '@/app/store/program/program.interface'

const initialState: IProgramInitialState = {
	exerciseIds:
		typeof window !== 'undefined' && localStorage.getItem('ex_ids')
			? JSON.parse(localStorage.getItem('ex_ids') || '')
			: []
}

export const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {
		addExercise: (state, action: PayloadAction<number>) => {
			const existing: any = localStorage.getItem('ex_ids')
			if (!existing) {
				localStorage.setItem('ex_ids', JSON.stringify([action.payload]))
				state.exerciseIds = [action.payload]
			} else {
				const exercises_ids: number[] = JSON.parse(existing || '')
				exercises_ids.push(action.payload)

				localStorage.setItem('ex_ids', JSON.stringify(exercises_ids))
				state.exerciseIds.push(action.payload)
			}
		},
		removeExercise: (state, action: PayloadAction<number>) => {
			localStorage.removeItem('ex_ids')
			state.exerciseIds = state.exerciseIds.filter(id => id !== action.payload)
			localStorage.setItem('ex_ids', JSON.stringify(state.exerciseIds))
		}
	}
})

export default programSlice.reducer
