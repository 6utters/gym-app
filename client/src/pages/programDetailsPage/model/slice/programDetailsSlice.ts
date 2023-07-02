import { createSlice } from '@reduxjs/toolkit'
import {
	ProgramDetails,
	ProgramDetailsSchema
} from '../types/ProgramDetailsSchema'
import { FINISHED_WORKOUTS } from '@/shared/consts/localStorage'
import { completeWorkout } from '@/entities/Program/model/services/completeWorkout'

const initialState: ProgramDetailsSchema = {
	completedPrograms: [],
	error: '',
	isLoading: false
}

export const programDetailsSlice = createSlice({
	name: 'programDetails',
	initialState,
	reducers: {
		setCompletedWorkouts: state => {
			const todayDate = new Date().toDateString()
			const finishesWorkouts = JSON.parse(
				localStorage.getItem(FINISHED_WORKOUTS) || ''
			) as ProgramDetails[]

			state.completedPrograms = finishesWorkouts.filter(
				workout => workout.finishDate == todayDate
			)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(completeWorkout.pending, state => {
				state.error = ''
				state.isLoading = true
			})
			.addCase(completeWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.completedPrograms.push(action.payload)
				localStorage.setItem(
					FINISHED_WORKOUTS,
					JSON.stringify(state.completedPrograms)
				)
			})
			.addCase(completeWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const {
	reducer: programDetailsReducer,
	actions: programDetailsActions
} = programDetailsSlice
