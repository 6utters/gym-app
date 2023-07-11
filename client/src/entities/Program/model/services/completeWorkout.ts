import { createAsyncThunk } from '@reduxjs/toolkit'
import { completeProgram } from '@/entities/Program/api/programApi'
import { ThunkConfig } from '@/app/providers/storeProvider'
import { ProgramDetails } from '@/pages/programDetailsPage'

export const completeWorkout = createAsyncThunk<
	ProgramDetails,
	number,
	ThunkConfig<string>
>('program/completeWorkout', async (programId, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		await dispatch(completeProgram(programId)).unwrap()
		return {
			id: programId,
			finishDate: new Date().toDateString()
		}
	} catch (e) {
		console.log(e)
		return rejectWithValue('error')
	}
})
