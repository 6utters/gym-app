import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProgramCreationSchema } from '../types/ProgramCreationSchema'

const initialState: ProgramCreationSchema = {
	exerciseObjectivesPanel: false,
	exerciseInfoPanel: false,
	exercisesPanel: false,
	muscleGroupsPanel: false,
	currentExerciseId: 0,
	currentObjectivesExerciseId: 0,
	currentMuscleGroupId: 0
}

const programCreationSlice = createSlice({
	name: 'programCreation',
	initialState,
	reducers: {
		toggleObjectivesPanel: state => {
			state.exerciseObjectivesPanel = !state.exerciseObjectivesPanel
		},
		toggleExerciseInfoPanel: state => {
			state.exerciseInfoPanel = !state.exerciseInfoPanel
		},
		toggleExercisesPanel: state => {
			state.exercisesPanel = !state.exercisesPanel
		},
		toggleMuscleGroupsPanel: state => {
			state.muscleGroupsPanel = !state.muscleGroupsPanel
		},
		closeAllPanels: state => {
			state.exerciseObjectivesPanel = false
			state.exerciseInfoPanel = false
			state.exercisesPanel = false
			state.muscleGroupsPanel = false
		},
		setMuscleGroup: (state, action: PayloadAction<number>) => {
			state.exercisesPanel = true
			state.currentMuscleGroupId = action.payload
		},
		setExercise: (state, action: PayloadAction<number>) => {
			state.exerciseInfoPanel = true
			state.currentExerciseId = action.payload
		},
		setObjectivesExercise: (state, action: PayloadAction<number>) => {
			state.exerciseObjectivesPanel = true
			state.currentObjectivesExerciseId = action.payload
		},
		reset: () => initialState
	}
})

export const {
	actions: programCreationActions,
	reducer: programCreationReducer
} = programCreationSlice
