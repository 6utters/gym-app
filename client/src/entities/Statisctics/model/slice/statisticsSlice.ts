import { DayProgress, StatisticsSchema } from '@/entities/Statisctics'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: StatisticsSchema = {
	dayProgress: {}
}

export const userSlice = createSlice({
	name: 'entities/statistics',
	initialState,
	reducers: {
		setDayProgress: (state, action: PayloadAction<DayProgress>) => {
			state.dayProgress = action.payload
		}
	}
})

export const { reducer: statisticsReducer, actions: statisticsActions } =
	userSlice
