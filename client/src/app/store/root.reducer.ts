import { combineReducers } from 'redux'
import { authSlice } from '@/app/store/auth/auth.slice'
import { api } from '@/app/store/api/api'
import { programSlice } from '@/app/store/program/program.slice'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	program: programSlice.reducer
})
